$(document).ready(function() {

    var urlRegion = document.URL.split("/")[3].toLowerCase();

    var bestRatedListUrl = "https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/BestRated?Market=" + urlRegion.split("-")[1] + "&Language=" + urlRegion.split("-")[0] + "&ItemTypes=Game&deviceFamily=Windows.Xbox&count=15&skipitems=0";
    var mostPlayedListUrl = "https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/MostPlayed?Market=" + urlRegion.split("-")[1] + "&Language=" + urlRegion.split("-")[0] + "&ItemTypes=Game&deviceFamily=Windows.Xbox&count=15&skipitems=0";

    var bestRatedArray = [];
    var mostPlayedListArray = []

    // Get GUIDS
    $.get(bestRatedListUrl)
        .done(function(responseData) {
            responseData.Items.forEach(function(e) {
                bestRatedArray.push(e.Id)
            })

            var bestRatedGuids = bestRatedArray.join(",")

            $.get(mostPlayedListUrl)
                .done(function(responseData) {
                    responseData.Items.forEach(function(e) {
                        mostPlayedListArray.push(e.Id)
                    })

                    var mostPlayedGuids = mostPlayedListArray.join(",")

                    gamesPop(bestRatedGuids, mostPlayedGuids);

                })
        })



    function gamesPop(bestRated, mostPlayed) {

        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var guidUrlBestRated = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
        var guidUrlMostPlayed = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'

        guidUrlBestRated = guidUrlBestRated.replace("GAMEIDS", bestRated);
        guidUrlMostPlayed = guidUrlMostPlayed.replace("GAMEIDS", mostPlayed);

        $.get(guidUrlBestRated)
            .done(function(responseData) {
                var bestRatedData = responseData;
                populateOne(bestRatedData);
            })

        $.get(guidUrlMostPlayed)
            .done(function(responseData) {
                var mostPlayedData = responseData;
                populateTwo(mostPlayedData);
            })
    }


    function populateOne(data) {

        var bigidUrls = biUrls.items.urls;
        var biuArray = Object.keys(bigidUrls);

        var productQuantity = data.Products.length;

        for (var x = 0; x < productQuantity; x++) {
            // Item Id/Title
            var itemId = data.Products[x].ProductId.toUpperCase();
            var itemTitle = data.Products[x].LocalizedProperties[0].ProductTitle;
            if (itemTitle === undefined) {
                itemTitle = "";
            }
            var itemUrlName = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi, "");
            if (itemUrlName === "") {
                itemUrlName = "-"
            }

            var shortDesc = data.Products[x].LocalizedProperties[0].ShortDescription;
            if (shortDesc === "") {
                shortDesc = data.Products[x].LocalizedProperties[0].ProductDescription;
            }
            if (shortDesc === undefined) {
                shortDesc = "";
            }

            var imagesNum = data.Products[x].LocalizedProperties[0].Images.length;
            var imgEnd = 999;

            for (var j = 0; j < imagesNum; j++) {
                if (data.Products[x].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") {
                    imgEnd = j;
                    break;
                }
            }

            if (imgEnd === 999) {
                for (var j = 0; j < imagesNum; j++) {
                    if (data.Products[x].LocalizedProperties[0].Images[j].Width < data.Products[x].LocalizedProperties[0].Images[j].Height) {
                        imgEnd = j;
                        break
                    }
                }
            }

            if (imgEnd === 999) {
                imgEnd = 1;
            }

            // Grabbing Image Path
            if (data.Products[x].LocalizedProperties[0].Images[imgEnd]) {
                var itemBoxshot = data.Products[x].LocalizedProperties[0].Images[imgEnd].Uri.replace("http:", "https:");
                var itemBoxshotSmall;
            } else {
                var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
                var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
            if (itemBoxshot.indexOf("xboxlive.com") !== -1) {
                itemBoxshotSmall = itemBoxshot + "&w=140&format=jpg";
                itemBoxshot = itemBoxshot + "&h=300&w=200&format=jpg";
            } else {
                itemBoxshotSmall = itemBoxshot;
            }

            // URL
            if (biuArray.indexOf(itemId) === -1 || bigidUrls[itemId].toLowerCase().indexOf(urlRegion) !== -1) {
                var itemhref = 'https://www.xbox.com/' + urlRegion + '/games/store/' + itemUrlName + '/' + itemId;
            } else {
                var itemhref = bigidUrls[itemId].split("<exc>")[0];
                var splitHref = itemhref.split("/");
                splitHref.splice(3, 0, urlRegion);
                itemhref = splitHref.join("/");
            }



            $(".bestRated" + " ul").append('<li>' +
                '<section class="m-product-placement-item f-size-large context-device f-clean" data-prodid="' + itemId + '">' +
                '<a target="blank" href="' + itemhref + '" data-retailer="MS Store" aria-label="Learn more about ' + itemTitle + '">' +
                '<picture>' +
                '<source srcset="' + itemBoxshot + '" media="(min-width:0)">' +
                '<img class="c-image" srcset="' + itemBoxshot + '" src="' + itemBoxshot + '" ' +
                'alt="' + itemTitle + ' boxshot">' +
                '</picture>' +
                '<div>' +
                '<h4 class="c-heading">' + itemTitle + '</h4>' +
                '</div>' +
                '</a>' +
                '</section>' +
                '</li>')

        }


    }

    function populateTwo(data) {

        var bigidUrls = biUrls.items.urls;
        var biuArray = Object.keys(bigidUrls);

        var productQuantity = data.Products.length;

        for (var x = 0; x < productQuantity; x++) {
            // Item Id/Title
            var itemId = data.Products[x].ProductId.toUpperCase();
            var itemTitle = data.Products[x].LocalizedProperties[0].ProductTitle;
            if (itemTitle === undefined) {
                itemTitle = "";
            }
            var itemUrlName = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi, "");
            if (itemUrlName === "") {
                itemUrlName = "-"
            }

            var shortDesc = data.Products[x].LocalizedProperties[0].ShortDescription;
            if (shortDesc === "") {
                shortDesc = data.Products[x].LocalizedProperties[0].ProductDescription;
            }
            if (shortDesc === undefined) {
                shortDesc = "";
            }

            var publisherName = data.Products[x].LocalizedProperties[0].PublisherName;

            var imagesNum = data.Products[x].LocalizedProperties[0].Images.length;
            var imgEnd = 999;

            for (var j = 0; j < imagesNum; j++) {
                if (data.Products[x].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") {
                    imgEnd = j;
                    break;
                }
            }

            if (imgEnd === 999) {
                for (var j = 0; j < imagesNum; j++) {
                    if (data.Products[x].LocalizedProperties[0].Images[j].Width < data.Products[x].LocalizedProperties[0].Images[j].Height) {
                        imgEnd = j;
                        break
                    }
                }
            }

            if (imgEnd === 999) {
                imgEnd = 1;
            }

            // Grabbing Image Path
            if (data.Products[x].LocalizedProperties[0].Images[imgEnd]) {
                var itemBoxshot = data.Products[x].LocalizedProperties[0].Images[imgEnd].Uri.replace("http:", "https:");
                var itemBoxshotSmall;
            } else {
                var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
                var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
            if (itemBoxshot.indexOf("xboxlive.com") !== -1) {
                itemBoxshotSmall = itemBoxshot + "&w=140&format=jpg";
                itemBoxshot = itemBoxshot + "&h=300&w=200&format=jpg";
            } else {
                itemBoxshotSmall = itemBoxshot;
            }

            // URL
            if (biuArray.indexOf(itemId) === -1 || bigidUrls[itemId].toLowerCase().indexOf(urlRegion) !== -1) {
                var itemhref = 'https://www.xbox.com/' + urlRegion + '/games/store/' + itemUrlName + '/' + itemId;
            } else {
                var itemhref = bigidUrls[itemId].split("<exc>")[0];
                var splitHref = itemhref.split("/");
                splitHref.splice(3, 0, urlRegion);
                itemhref = splitHref.join("/");
            }


            if (publisherName.toLowerCase().indexOf("activision") === -1) {
              $(".mostPlayed" + " ul").append('<li>' +
                  '<section class="m-product-placement-item f-size-large context-device f-clean" data-prodid="' + itemId + '">' +
                  '<a target="blank" href="' + itemhref + '" data-retailer="MS Store" aria-label="Learn more about ' + itemTitle + '">' +
                  '<picture>' +
                  '<source srcset="' + itemBoxshot + '" media="(min-width:0)">' +
                  '<img class="c-image" srcset="' + itemBoxshot + '" src="' + itemBoxshot + '" ' +
                  'alt="' + itemTitle + ' boxshot">' +
                  '</picture>' +
                  '<div>' +
                  '<h4 class="c-heading">' + itemTitle + '</h4>' +
                  '</div>' +
                  '</a>' +
                  '</section>' +
                  '</li>')
            }

        }


    }

});