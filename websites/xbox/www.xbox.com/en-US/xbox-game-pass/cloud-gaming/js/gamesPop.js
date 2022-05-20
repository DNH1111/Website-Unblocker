$(document).ready(function() {

    var urlRegion = document.URL.split("/")[3].toLowerCase();

    var xgpcloudlistUrl = "https://catalog.gamepass.com/sigls/v2?id=44a55037-770f-4bbf-bde5-a9fa27dba1da&language=LANG&market=MARK";

    xgpcloudlistUrl = xgpcloudlistUrl.replace("LANG", urlRegion).replace("MARK", urlRegion.split("-")[1].toUpperCase());

    var recentCloudArray = [];

    // Get GUIDS
    $.get(xgpcloudlistUrl)
        .done(function(responseData) {

            var listData = responseData;
            var listDataLength = listData.length;

            for (j = 1; j < listDataLength; j++) {
                recentCloudArray.push(listData[j].id)
                if (j === 10) {
                    break;
                }
            }

            var recentCloudGuids = recentCloudArray.join(",")
            gamesPop(recentCloudGuids);

            console.log(recentCloudArray)
        })

        


    function gamesPop(recentCloud) {

        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var guidUrlRecentCloud = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'

        guidUrlRecentCloud = guidUrlRecentCloud.replace("GAMEIDS", recentCloud);

        $.get(guidUrlRecentCloud)
            .done(function(responseData) {
                var bestRatedData = responseData;
                populateOne(bestRatedData);
            })
    }


    function populateOne(data) {

        var locStrings = globalLocStrings.locales[urlRegion];
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

            $(".recentCloud" + " ul").append('<li>' +
                '<section class="m-product-placement-item f-size-large context-device f-clean" data-prodid="' + itemId + '">' +
                '<a class="ignoreContStore" target="blank" href="' + itemhref + '" data-retailer="MS Store" aria-label="' + locStrings["keyLearnmoregamearia"] + itemTitle + '">' +
                '<picture>' +
                '<source srcset="' + itemBoxshot + '" media="(min-width:0)">' +
                '<img class="c-image" srcset="' + itemBoxshot + '" src="' + itemBoxshot + '" ' +
                'alt="' + itemTitle + ' boxshot">' +
                '</picture>' +
                '<div>' +
                '<h3 class="c-heading">' + itemTitle + '</h3>' +
                '</div>' +
                '</a>' +
                '</section>' +
                '</li>');

        }

    }

    // Adding last tile
    var activecheck = setInterval(function() {
        var check = $(".recentCloud .m-product-placement-item").length
        var activeAjax = $(".recentCloud .m-product-placement-item").length > 9;
        console.log(activeAjax,check)
        if (activeAjax === true) {

            var locStrings = globalLocStrings.locales[urlRegion];

            $(".recentCloud").find("ul").append('<li>' +
                '<section class="m-product-placement-item f-size-large context-device f-clean">' +
                '<a target="_blank" href="https://www.xbox.com/xbox-game-pass/games#cloud" data-cta="learn" aria-label="' + locStrings["keyExploreallaria"] + '">' +
                '<picture>' +
                '<source srcset="https://compass-ssl.xbox.com/assets/b5/a2/b5a2e31b-90a0-458d-82b3-f6d405069ade.jpg?n=XGP_Image-0_Boxshot-Standard_XGP-Catalog_720x1080.jpg" media="(min-width:0)">' +
                '<img class="c-image" srcset="https://compass-ssl.xbox.com/assets/b5/a2/b5a2e31b-90a0-458d-82b3-f6d405069ade.jpg?n=XGP_Image-0_Boxshot-Standard_XGP-Catalog_720x1080.jpg" src="https://compass-ssl.xbox.com/assets/b5/a2/b5a2e31b-90a0-458d-82b3-f6d405069ade.jpg?n=XGP_Image-0_Boxshot-Standard_XGP-Catalog_720x1080.jpg" alt="explore all games image">' +
                '</picture>' +
                '<div>' +
                '<h3 class="c-heading">' + locStrings["keyExploreall"].toUpperCase() + '</h3>' +
                '</div>' +
                '</a>' +
                '</section>' +
                '</li>');
                clearInterval(activecheck);
        }
    }, 100)


    // var items = $(".recentCloud .m-product-placement-item").length
    // console.log(items)

        

    
   




globalLocStrings = {
  "locales": {
    "en-us": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "ar-ae": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "ar-sa": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "cs-cz": {
        "keyExploreall": "Procházet hry",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "da-dk": {
        "keyExploreall": "Udforsk spil",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "de-at": {
        "keyExploreall": "Spiele erkunden",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "de-ch": {
        "keyExploreall": "Spiele erkunden",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "de-de": {
        "keyExploreall": "Spiele erkunden",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "el-gr": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-au": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-ca": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-gb": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-hk": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-ie": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-in": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-nz": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-sg": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "en-za": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "es-ar": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "es-cl": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "es-co": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "es-es": {
        "keyExploreall": "Explorar los juegos",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "es-mx": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "fi-fi": {
        "keyExploreall": "Selaa pelejä",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "fr-be": {
        "keyExploreall": "Explorer les jeux",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "fr-ca": {
        "keyExploreall": "Découvrez les jeux",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "fr-ch": {
        "keyExploreall": "Explorer les jeux",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "fr-fr": {
        "keyExploreall": "Explorer les jeux",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "he-il": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "hu-hu": {
        "keyExploreall": "Játékok felfedezése",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "it-it": {
        "keyExploreall": "Esplora i giochi",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "ja-jp": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "ko-kr": {
        "keyExploreall": "게임 살펴보기",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "nb-no": {
        "keyExploreall": "Utforsk spill",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "nl-be": {
        "keyExploreall": "Gamen op een hoger niveau",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "nl-nl": {
        "keyExploreall": "Gamen op een hoger niveau",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "pl-pl": {
        "keyExploreall": "Ulepsz swoją grę",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "pt-br": {
        "keyExploreall": "Eleva o teu jogo",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "pt-pt": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "ru-ru": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "sk-sk": {
        "keyExploreall": "Nová úroveň hrania",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "sv-se": {
        "keyExploreall": "Förstärk spelkänslan",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "tr-tr": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "zh-hk": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    },
    "zh-tw": {
        "keyExploreall": "Explore all games",
        "keyExploreallaria": "Explore all Xbox Game Pass Cloud Games",
        "keyLearnmoregamearia": "Learn more about "
    }
  }
}

});