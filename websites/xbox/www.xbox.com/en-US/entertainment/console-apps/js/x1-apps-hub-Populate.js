document.domain = "xbox.com";
$(document).ready(function() {
  var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
  if (urlRegion === "en-ae") {
    urlRegion = "ar-ae";
  } else if (urlRegion === "en-sa") {
    urlRegion = "ar-sa";
  } else if (urlRegion === "en-il") {
    urlRegion = "he-il";
  }
  

  var catGuidArray = ["FeaturedApps", "GamerApps", "EntertainmentApps", "NewApps", "MusicApps"];
  var catClassArray = ["catFeatured", "catPopular", "catEnt", "catNews", "catMusic",];
  var listUrl = "http://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/CATEGORY?itemTypes=Game&DeviceFamily=Windows.Xbox&market=US&count=200";
  


  popLists();

  function popLists() {
    //var showMoreLoc = showMore.locales[urlRegion]
    for (var j = 0; j < Object.keys(globalContent["locales"][urlRegion].gameIdArrays).length; j++) {
      if (globalContent["locales"][urlRegion].gameIdArrays[catGuidArray[j]].length !== 0) {
        GUID_pop(globalContent["locales"][urlRegion].gameIdArrays[catGuidArray[j]], catClassArray[j]);
      } else {
        $("." + catClassArray[j]).prev("h3").remove();
        $("." + catClassArray[j]).remove();
      }
      
      // if (j === 0) {
      //   $(".gpList").after('<div class="gameSection gs' + catClassArray[j] + '"><div class="gameDivsWrapper ' + catClassArray[j] + ' ignoreSeeMore" data-grid="container"></div></div>');
      // } else {
      //   $(".gameSection").last().after('<div class="gameSection gs' + catClassArray[j] + '"><div class="gameDivsWrapper ' + catClassArray[j] + '" data-grid="container"></div>' +
      //       '<div class="gameDivCTA">' +
      //          '<button name="button" class="c-button svg-container showMore">' + showMoreLoc.keyShowmoregames + ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMinYMin meet"><polygon points="843.8 437.5 531.3 437.5 531.3 125 468.8 125 468.8 437.5 156.3 437.5 156.3 500 468.8 500 468.8 812.5 531.3 812.5 531.3 500 843.8 500 "/></svg></button>' +
      //          '<button name="button" class="c-button svg-container showLess hide">' + showMoreLoc.keyShowlessgames + ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMinYMin meet"><rect x="156.3" y="437.5" width="687.5" height="62.5"/></svg></button>'+
      //     '</div></div>');
      // }
    }
  }

  function GUID_pop(rawGuids, sectionClass) {

    var countryCode = urlRegion.split("-")[1].toUpperCase();
    var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
    // var rawGuids = []
    // $(".xboxOneItem .gameDiv").each(function() {
    //   var biRaw = $(this).attr("data-bigid")
    //   rawGuids.push(biRaw)
    // });

    var first12 = rawGuids.slice(0,12)
    rawGuids = rawGuids.slice(12)

    // var apiData

    var firstToUrl = first12.join(",");
    guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
    $.get(guidUrl)
        .done(function(responseData) {
          var apiData = responseData;
          populate(apiData, 0, sectionClass);
          guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
          restPop();
        })

    function restPop() {
      var m,n,temparray,chunk = 20;
      var arrayCount = 1
      for (m=0,n=rawGuids.length; m<n; m+=chunk) {
        temparray = rawGuids.slice(m,m+chunk);
        var guidsToUrl = temparray.join(",");
        guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)

        $.get(guidUrl)
          .done(function(responseData) {
            var apiData = responseData;
            populate(apiData, arrayCount, sectionClass);
            arrayCount++
          })
        guidUrl = 'http://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
      }
    }

    

    function populate(data, count, sectionClass) {
      var productQuantity = data.Products.length
      for (var i = 0; i < productQuantity; i ++) {
        var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle
        var titleClickname = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi,'');
        // get boxshot
        var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
        var imageInd = 1;
        for (var j = 0; j < imagesNum; j++) {
          if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Logo" && data.Products[i].LocalizedProperties[0].Images[j].Width === 300 && data.Products[i].LocalizedProperties[0].Images[j].Height === 300) {
            imageInd = j;
            break;
          } 
          if ((data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Tile" || data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "tile") 
            && data.Products[i].LocalizedProperties[0].Images[j].Width === 300 && data.Products[i].LocalizedProperties[0].Images[j].Height === 300) {
            imageInd = j;
            break;
          } 
          if ((data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Tile" || data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "tile") 
            && data.Products[i].LocalizedProperties[0].Images[j].Width === 150 && data.Products[i].LocalizedProperties[0].Images[j].Height === 150) {
            imageInd = j;
            break;
          } 
          if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "FeaturePromotionalSquareArt") {
            imageInd = j;
            break
          }
        }
        // var desc = data.Products[i].LocalizedProperties[0].ProductDescription || "";
        
        // if (data.Products[i].LocalizedProperties[0].ShortDescription !== "" && data.Products[i].LocalizedProperties[0].ShortDescription !== null) {
        //   desc = data.Products[i].LocalizedProperties[0].ShortDescription;
        // }
        // if (desc.indexOf(".") !== -1) {desc = desc.split(".")[0] + ".";} // cut the description to one sentence

        var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri;
        var boxbgColor = data.Products[i].LocalizedProperties[0].Images[imageInd].BackgroundColor;
        if (itemBoxshot.indexOf("xboxlive.com") !== -1) {itemBoxshot = itemBoxshot + "&w=300&format=jpg"; }
        var itemId = data.Products[i].ProductId.toUpperCase();

        if (itemId === "9NBLGGH43D8W") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/3f/63/3f638e2b-32e1-46bd-b508-c443b7d7f76b.jpg?n=X1-App-Hub_Logo-0_Rooster-Teeth_300x300.jpg";
        }
        if (itemId === "9PGQ6G1K5QD7") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/86/3b/863b1dd7-e12f-469f-8a23-6c8a446bbb6e.jpg?n=X1-App-Hub_Logo-0_Ubisoft-Connect_300x300.jpg";
        }
        if (itemId === "9NDJSB7LP64D") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/82/5a/825a58f0-a255-4958-98ae-d168acc52050.png?n=MS_300x300_CTV.png";
        }
        if (itemId === "9NJQFHG3FJB7") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/73/9d/739d9089-9e08-4f3e-a416-4818229dd2b3.png?n=MS_300x300_TSN.png";
        }
        if (itemId === "9NX1X6TH2GRT") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/f2/1a/f21ae7bc-b675-4bb5-ae2d-b8b64895ab9a.png?n=MS_300x300_Crave.png";
        }
        if (itemId === "9MW0ZWQFH0M2") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/88/b6/88b65cad-b080-43b9-8f22-8113f56389d9.png?n=AppleTV_logo.png";
        }
        if (itemId === "BZFK7WNK7R4M") {
          itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-";
        }  
        if (itemId === "9NFQ49H668TB") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/61/62/616235bd-ce06-4c10-9859-d3d0de5dda87.png?n=App-Hub_App-Logo_Spotify_240x240.png";
        }  
        if (itemId === "9WZDNCRFJ3Q2") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/3a/33/3a33b90e-c3d5-4101-8417-8299279e7b69.png?n=App-Hub_App-Logo_MSN-Weather_240x240.png";
        }  
        if (itemId === "9PJJ1K9DZMRS") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/68/4f/684f41eb-7603-43ab-98be-add9178342d7.png?n=X1-HBOMax-AppIcon-1x1-M-284x284-P-01.png";
          itemTitle = "HBO Max"
        } 
        if (itemId === "9NXQXXLFST89") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/d6/fb/d6fb3f0c-1e4d-4b7f-ba63-5368c74dd036.jpg?n=DisneyPlus_App.jpg";
        }  
        if (itemId === "9NCPJ3XP3FN8") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/72/b3/72b3176e-3c9b-4013-94ef-ef66a086d135.png?n=YouTube_TV-App.png";
        }  
        if (itemId === "9N0866FS04W8") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/f5/56/f556a336-846d-4c5b-a3b3-1bf930c0f6e3.jpg?n=X1-App-Hub_Logo-0_Dolby_300x300.jpg";
        }  
        if (itemId === "9P1BNLC6DD69") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/c1/ef/c1ef7f28-0cc2-4a67-87f2-1b9f9cd56d76.png?n=Facebook-Watch-App-Logo-300x300.png";
        }
        if (itemId === "9NBCJX3ZVWVN") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/bf/d9/bfd9d05e-ab18-4446-b9d7-e5ae95461c70.png?n=Animal-Planet-Go-App-Icon.png";
        } 
        if (itemId === "9MV42N00241D") {
          itemBoxshot = "https://compass-ssl.xbox.com/assets/cd/ec/cdecf662-9d83-4c6e-9d89-7cee49d550d4.jpg?n=Amazon-Music-App-Logo-300x300.jpg";
        }  
        if (itemId === "9PN94D9BDFZM") {
          boxbgColor = "grey";
        }
        if (itemId === "9WZDNCRFJ3P2" || itemId === "9WZDNCRFJ1XX") {
          boxbgColor = "blue";
        }   
        if (itemId === "9WZDNCRDNKFB") {
          boxbgColor = "blue";
        }
        if (itemId === "9NBLGGH1ZJ3R") {
          boxbgColor = "blue";
        }
        if (itemId === "9NBLGGH58P0W") {
          boxbgColor = "blue";
        }




        var thishref = ""
        if (entUrls[itemId] !== undefined) {
          thishref = entUrls[itemId];
        } else {
          thishref = 'https://www.microsoft.com/store/p/' + titleClickname + '/' + itemId;
        }
        var datatrack = 'data-retailer="ms store"'
        if (thishref.toLowerCase().indexOf("xbox.com") !== -1) {
          datatrack = 'data-cta="learn"'
        }

        $("." + sectionClass + " ul").append('<li>' +
                                              '<section class="m-product-placement-item context-app f-size-medium gameDiv" itemscope itemtype="http://schema.org/Product" data-bigid="' + itemId + '">' +
                                                '<a target="_blank" href="' + thishref + '" data-clickname="www>entertainment>xbox-one>live-apps-hub>' + titleClickname + '>click" ' + datatrack + '>' +
                                                  '<picture style="background-color: ' + boxbgColor + '">' +
                                                    '<source srcset="' + itemBoxshot + '" media="(min-width:0)">' +
                                                    '<img class="c-image" srcset="' + itemBoxshot + '" src="' + itemBoxshot + '" ' +
                                                         'alt="' + itemTitle + ' logo">' +
                                                  '</picture>' +
                                                  '<div>' +
                                                    '<h4 class="c-subheading-4" itemprop="product name">' + itemTitle + '</h4>' +
                                                    //'<p class="c-paragraph-4">' + desc + '</p>' +
                                                  '</div>' +
                                                '</a>' +
                                              '</section>' +
                                            '</li>') 

        if (i === productQuantity - 1) {
          // post pop changes
          $("[data-bigid='9WZDNCRFJ3TJ'] picture").css("background-color", "white");
          $("[data-bigid='9WZDNCRFJ3TJ'] img").css("border", "1px solid lightgrey");
          $("[data-bigid='9NFQ49H668TB'] picture").addClass("high-contrast-svg-black");
        }
      }

      //if (count === 2) {
       // setTimeout(function() {
        //  GAMEBOXSHOT_SHOWHIDE.init()
        //}, 2500)
     // }
    
    }
    //$(".gameDivsWrapper").append()
  }


  var x1RegionPop = (function() {
    $(".gameDiv a").each(function() {
      var rawHref = $(this).attr("href")
      var splitHref = rawHref.split("/")
      splitHref.splice(3, 0, urlRegion)
      var newHref = splitHref.join("/")
      $(this).attr("href", newHref)
    })
  })();

  // setTimeout(function() {
  //   var durl = document.URL.toLowerCase();
  //   if (durl.indexOf("recent") !== -1) {
  //     $("#selectRecent").click();
  //     var topofgames = $("#selectRecent").offset().top - 140;
  //     $(document).scrollTop(topofgames);
  //   }
  // }, 2500)

});

