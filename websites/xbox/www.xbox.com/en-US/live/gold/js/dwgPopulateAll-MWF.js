$(document).ready(function() {
    var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
    if (urlRegion === "en-ae") {
      urlRegion = "ar-ae";
    } else if (urlRegion === "en-sa") {
      urlRegion = "ar-sa";
    } else if (urlRegion === "en-il") {
      urlRegion = "he-il";
    }
    var clickname = "www>live>deals-with-gold>GAMETITLE>click";
  
    var popJSON = (function() {
      var regionContent = globalContent.locales[urlRegion];
      var allKeys = Object.keys(regionContent)
      var keysLength = allKeys.length
      for (var i = 0; i < keysLength; i++) {
        if (allKeys[i].indexOf("keyCopy") !== -1) {
          $("[data-loc-copy=" + allKeys[i] + "]").text(regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyImage") !== -1) {
          $("source[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]);
          $("img[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]).attr("srcset", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyAlt") !== -1) {
          $("[data-loc-alt=" + allKeys[i] + "]").attr("alt", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyLink") !== -1) {
          $("[data-loc-link=" + allKeys[i] + "]").attr("href", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyClickname") !== -1) {
          $("[data-loc-clickname=" + allKeys[i] + "]").attr("data-clickname", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyRetailer") !== -1) {
          $("[data-loc-retailer=" + allKeys[i] + "]").attr("data-retailer", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyAria") !== -1) {
          $("[data-loc-aria=" + allKeys[i] + "]").attr("aria-label", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyInclude") !== -1) {
          $("[data-loc-include=" + allKeys[i] + "]").attr("data-region-include", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyExclude") !== -1) {
          $("[data-loc-exclude=" + allKeys[i] + "]").attr("data-region-exclude", regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyPlayson") !== -1) {
          $("[data-loc-playson=" + allKeys[i] + "]").attr("data-playson", regionContent[allKeys[i]].toLowerCase());
        } else if (allKeys[i].indexOf("keyYoutube") !== -1) {
          $("[data-loc-youtube=" + allKeys[i] + "]").attr("data-raven-youtubeid", regionContent[allKeys[i]]);
        }
      }
     //fix for IE  hero
      // window resizing
      var userAgentString = navigator.userAgent;
      if (userAgentString.indexOf("Trident") >= 0) { //only IE browsers
        var winWidth = $(document).width();
        if (winWidth < 767) {
          $(".m-hero-item .ieFix img").attr("src", $(".m-hero-item .ieFix source").eq(2).attr("srcset"))
          $(".m-hero-item .ieFix2 img").attr("src", $(".m-hero-item .ieFix2 source").eq(0).attr("srcset"))
          $(".goldUpsell picture img").attr("src", $(".goldUpsell picture source").eq(2).attr("srcset"))
        } else if (winWidth >= 768 && winWidth < 1083) {
          $(".m-hero-item picture img").attr("src", $(".m-hero-item picture source").eq(1).attr("srcset"))
          $(".m-hero-item .ieFix2 img").attr("src", $(".m-hero-item .ieFix2 source").eq(0).attr("srcset"))
          $(".goldUpsell picture img").attr("src", $(".goldUpsell picture source").eq(1).attr("srcset"))
        } else if (winWidth >= 1084) {
          $(".m-hero-item .ieFix img").attr("src", $(".m-hero-item .ieFix source").eq(0).attr("srcset"))
          $(".m-hero-item .ieFix2 img").attr("src", $(".m-hero-item .ieFix2 source").eq(0).attr("srcset"))
          $(".goldUpsell picture img").attr("src", $(".goldUpsell picture source").eq(0).attr("srcset"))
        }
        var windowresized = (function () {
          var timers = {};
          return function (callback, ms, uniqueId) {
            if (!uniqueId) {
              uniqueId = "Fires only once.";
            }
            if (timers[uniqueId]) {
              clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
          };
        })();
  
        $(window).resize(function () {
           windowresized(function(){
            var newWidth = $(document).width();
            if (newWidth < 767) {
              $(".m-hero-item picture img").attr("src", $(".m-hero-item picture source").eq(2).attr("srcset"))
              $(".m-hero-item .ieFix2 img").attr("src", $(".m-hero-item .ieFix2 source").eq(0).attr("srcset"))
              $(".goldUpsell picture img").attr("src", $(".goldUpsell picture source").eq(2).attr("srcset"))
            } else if (newWidth >= 768 && newWidth < 1083) {
                $(".m-hero-item picture img").attr("src", $(".m-hero-item picture source").eq(1).attr("srcset"))
                $(".m-hero-item .ieFix2 img").attr("src", $(".m-hero-item .ieFix2 source").eq(0).attr("srcset"))
                $(".goldUpsell picture img").attr("src", $(".goldUpsell picture source").eq(1).attr("srcset"))
            } else if (newWidth >= 1084) {
                $(".m-hero-item picture img").attr("src", $(".m-hero-item picture source").eq(0).attr("srcset"))
                $(".m-hero-item .ieFix2 img").attr("src", $(".m-hero-item .ieFix2 source").eq(0).attr("srcset"))
                $(".goldUpsell picture img").attr("src", $(".goldUpsell picture source").eq(0).attr("srcset"))
            }
           }, 200, "pageresize");
        }); 
      } 
    })();
  
    var popGames = (function() {
      var regionContent = globalContent.locales[urlRegion]
      for (var i = 0; i < regionContent["keyXboxonenumber"]; i++) {
        $(".gameDivsWrapper.deals-with-gold").append('<section class="m-product-placement-item f-size-medium context-game gameDiv x1games" itemscope="" data-region-include="' + regionContent["keyX1gameinclude" + (i + 1)] + '" data-region-exclude="' +
                              regionContent["keyX1gameexclude" + (i + 1)] + '" itemtype="http://schema.org/Product" data-bigid="' + regionContent["keyX1gamebigid" + (i + 1)].toUpperCase() + '">' +
                                 '<a href="#" class="ignoreContStore" data-clickname="" data-retailer="ms store" target="_blank">' +
                                  '<picture class="containerIMG">' +
                                     '<img class="c-image" aria-hidden="true" srcset="" src="" alt="">' +
                                  '</picture>' +
                                  '<div>' +
                                    '<h3 class="c-heading x1GameName" itemprop="product name"></h3>' +
                                    '<span class="c-badge f-small f-highlight x1GamePrice">' + regionContent["keyCopyoffertext"].replace("<PLACEHOLDER>", regionContent["keyX1gameofftext" + (i + 1)]) + '</span>' +
                                  '</div>' +
                                 '</a>' +
                                '</section>')
      }
  
      for (var i = 0; i < regionContent["keyXbox360number"]; i++) {
        var boximage = regionContent["keyX360gameboxshot" + (i + 1)];
        var gameTitle = regionContent["keyX360gamename" + (i + 1)];
        var clicktitle = gameTitle.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi,'');
        var boxalt = gameTitle + " boxshot";
  
        $(".gameDivsWrapper.deals-with-gold").append('<section class="m-product-placement-item f-size-medium context-game gameDiv x360Games" itemscope="" data-region-include="' + regionContent["keyX360gameinclude" + (i + 1)] + 
                                '" data-region-exclude="' + regionContent["keyX360gameexclude" + (i + 1)] + '" itemtype="http://schema.org/Product">' +
                                 '<a href="' + regionContent["keyX360gameurl" + (i + 1)] + '" data-clickname="www>live>deals-with-gold>' + clicktitle + '>click" target="_blank" data-retailer="ms store"  class="ignoreContStore">' +
                                  '<picture class="containerIMG">' +
                                     '<img class="c-image" aria-hidden="true" srcset="" src="' + boximage + '" alt="' + boxalt + '">' +
                                  '</picture>' +
                                  '<div>' +
                                    '<h3 class="c-heading x1GameName" itemprop="product name">' + gameTitle + '</h3>' +
                                    '<span class="c-badge f-small f-highlight x1GamePrice">' + regionContent["keyCopyoffertext"].replace("<PLACEHOLDER>", regionContent["keyX360gameofftext" + (i + 1)]) + '</span>' +
                                  '</div>' +
                                 '</a>' +
                                '</section>')
  
        if (i === regionContent["keyXbox360number"] - 1) {
          incExc();
        }
      }
    })();
  
    var GUID_pop = (function() {
      var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
      if (urlRegion === "en-ae") {
        urlRegion = "ar-ae";
      } else if (urlRegion === "en-sa") {
        urlRegion = "ar-sa";
      } else if (urlRegion === "en-il") {
        urlRegion = "he-il";
      }
      var countryCode = urlRegion.split("-")[1].toUpperCase();
      var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
      var rawGuids = []
      $(".gameDiv[data-bigid]").each(function() {
        var biRaw = $(this).attr("data-bigid")
        rawGuids.push(biRaw)
      });
  
      var first12 = rawGuids.slice(0,12)
      rawGuids = rawGuids.slice(12)
  
      // var data
  
      var firstToUrl = first12.join(",");
      guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
      $.get(guidUrl)
          .done(function(responseData) {
            var data = responseData;
            populate(data, 0);
            guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
            restPop();
          })
  
      var restPop = function() {
        var m,n,temparray,chunk = 20;
        var arrayCount = 1
        for (m=0,n=rawGuids.length; m<n; m+=chunk) {
          temparray = rawGuids.slice(m,m+chunk);
          var guidsToUrl = temparray.join(",");
          guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)
  
          $.get(guidUrl)
            .done(function(responseData) {
              var data = responseData;
              populate(data, arrayCount);
              arrayCount++
            })
          guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
        }
      }
  
      
  
      var populate = function(data, count) {
        var productQuantity = data.Products.length
        var currencyCode;
        for (var i = 0; i < productQuantity; i++) {
          var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle.replace(" (Game Preview)", "").replace(" Technical Alpha", "");
          // get boxshot
          var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
          var imageInd = 0;
          for (var j = 0; j < imagesNum; j++) {
            if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") {
              imageInd = j;
              break;
            }
          }
          var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri
          var itemId = data.Products[i].ProductId.toUpperCase();
  
          var clicktitle = itemTitle.replace(/\s/g, "-").replace(/[^a-z0-9-]/gi,'');
         if (clicktitle === "") {clicktitle="-"}
          $(".gameDiv[data-bigid=" + itemId + "] .x1GameName").text(itemTitle);
          $(".gameDiv[data-bigid=" + itemId + "] a").attr("href", "https://www.microsoft.com/store/p/" + clicktitle + "/" + itemId);
          $(".gameDiv[data-bigid=" + itemId + "] a").attr("data-clickname", clickname.replace("GAMETITLE", clicktitle));
          $(".gameDiv[data-bigid=" + itemId + "] a").attr("aria-label", "");
          $(".gameDiv[data-bigid=" + itemId + "] .containerIMG img.c-image").attr("src", itemBoxshot);
          $(".gameDiv[data-bigid=" + itemId + "] .containerIMG img.c-image").attr("alt", itemTitle + " boxshot");
          
          var depregions = "de-at, de-ch, de-de, fi-fi, nl-be, nl-nl, tr-tr, es-ar, es-cl, es-co, es-mx, es-es, fr-be, fr-ca,fr-ch, fr-fr, pl-pl, pt-br, pt-pt, ru-ru";
          if (depregions.indexOf(urlRegion) !== -1 && itemId === "C1ZJGF2JXSHM") {
           $(".gameDiv[data-bigid=C1ZJGF2JXSHM] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.59417.65705053504536370.c1188f69-0976-4a1d-8e43-1bcdcb951ccc.f5e04149-1833-47fe-8711-618562d2585a");
         } 
  // Area for changing boxshots
         if (itemId === "9NV34NLCLG81") {
           $(".gameDiv[data-bigid=9NV34NLCLG81] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.47693.14406663268321390.1152921504738175112.81013f50-fcb3-4fc2-a043-39ecf20b4ec9");
         }
       // Elite Dangerous Deluxe
         if (itemId === "9NWH0HM3W6SN") {
           $(".gameDiv[data-bigid=9NWH0HM3W6SN] .containerIMG img").eq(0).attr("src", "https://compass-ssl.xbox.com/assets/3d/ab/3dabfb67-bad3-49c3-a38f-bd96ddc1d999.jpg?n=XLG-2020_Boxshot_Elite-Dangerous-Deluxe-Edition_584x800.jpg");
         }
       // The Surge Content Pack
         if (itemId === "9MTTX5X723LP") {
           $(".gameDiv[data-bigid=9MTTX5X723LP] .containerIMG img").eq(0).attr("src", "https://compass-ssl.xbox.com/assets/36/ef/36ef229f-7075-41f0-816b-ae0635fb6229.jpg?n=XLG-2020_Boxshot_The-Surge-Good-Bad-Augmented_584x800.jpg");
         }
       // Yonder Cloud
         if (itemId === "9N6HCRMGZ7NG") {
           $(".gameDiv[data-bigid=9N6HCRMGZ7NG] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.46216.14014046547920957.06f83eb7-8a71-4d19-a6de-7429629cecd6.643b1c57-f2ec-4c3f-933f-3439d2f9788e");
         }
       // Tree Farm Bundle
         if (itemId === "9NGL28XXTF85") {
           $(".gameDiv[data-bigid=9NGL28XXTF85] .containerIMG img").eq(0).attr("src", "https://compass-ssl.xbox.com/assets/5b/c7/5bc74c94-1a48-43ac-bdf1-f7d1e8e358ec.jpg?n=XLG-2020_Boxshot_Woodle-Tree-Bundle_584x800.jpg");
         }
         if (itemId === "9N89NQHWRF34") {
           $(".gameDiv[data-bigid=9N89NQHWRF34] .containerIMG img").eq(0).attr("src", "https://compass-ssl.xbox.com/assets/db/a1/dba1cdf1-1d69-4ed6-a57e-03bc2bc408ae.jpg?n=XLG-2021_Boxshot_Mosaic_720x1080.jpg");
         }
         if (itemId === "C0N22P73QZ60") {
           $(".gameDiv[data-bigid=C0N22P73QZ60] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.5904.64366672042187759.2f5f517f-8428-4588-b1d0-15143f158d57.21e910ae-28ed-4903-946e-0bf54118e4ab");
         }
         if (itemId === "9NVVSHQ771WG") {
           $(".gameDiv[data-bigid=9NVVSHQ771WG] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.57154.14206288516140383.9abb7b51-66f2-454d-8490-76521abe2483.3f8e9e2f-f515-4316-a7d4-32507d1a6a0c");
         }
         if (itemId === "9NTRS771L8HL") {
           $(".gameDiv[data-bigid=9NTRS771L8HL] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.39372.14408364206805299.40b2a513-7cef-4e75-8752-fd34ccd32aee.5311087f-37bc-45fd-ade6-86a3ad0274b7?q=90&w=177&h=265");
         }
         if (urlRegion === "ja-jp") {
            if (itemId === "9P99V6KS0PW2") {
                $(".gameDiv[data-bigid=9P99V6KS0PW2] .containerIMG img").eq(0).attr("src", "https://store-images.s-microsoft.com/image/apps.11345.14075973498345607.6b5d4b0d-4c1c-466b-85b5-c0fdc6aed83f.1cd43821-42a2-4e8f-87ad-6cdaa7ead037?q=90&w=177&h=265");
              }
         }

          // if (i === (productQuantity - 1)) {
          //   $(".gameDiv").last().after('<script type="text/javascript" src="/en-US/global-resources/templates/MWF/JS/MWF-Aria-Boxshots-loc.js"></s' + 'cript>')
          // }
        }
      
      }
      
    })();
  
    // var regionLinks = (function() {
    //   var urlRegion = document.URL.split("/")[3].toLowerCase();
    //   $(".gameDiv a").each(function() {
    //     var rawHref = $(this).attr("href")
    //     var splitHref = rawHref.split("/")
    //     splitHref.splice(3, 0, urlRegion)
    //     var newHref = splitHref.join("/")
    //     $(this).attr("href", newHref)
    //   })
    // })();
  
    function incExc() {
      // set up 
      var itemContainer = ".gameDiv";
      // end set up
  
      // DWG CTAs
      var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
      if (urlRegion === "en-ae") {
        urlRegion = "ar-ae";
      } else if (urlRegion === "en-sa") {
        urlRegion = "ar-sa";
      } else if (urlRegion === "en-il") {
        urlRegion = "he-il";
      }
  
      $(itemContainer).each(function() {
        var theItem = $(this);
        var includedArr = theItem.attr("data-region-include").toLowerCase().replace(/\s/g, "").split(",");
        var excludedArr = theItem.attr("data-region-exclude").toLowerCase().replace(/\s/g, "").split(",");
        if (includedArr[0].length > 0) {
          theItem.hide();
          var includedLen = includedArr.length;
          for (var i = 0; i < includedLen; i++) {
            if (urlRegion === includedArr[i]) {
              theItem.css("display", "inline-block");
            } 
          }
        } else if (excludedArr[0].length > 0) {
          var excludedLen = excludedArr.length;
          for (var i = 0; i < excludedLen; i++) {
            if (urlRegion === excludedArr[i]) {
              theItem.remove();
            }
          }
        }
      })
 
  
      $('.gameDiv a[href*="/store"]').attr("data-retailer", "ms store")
    }
  });