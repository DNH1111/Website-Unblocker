$(document).ready(function() {
    regionRatingOrgs = { "en-us" : "ESRB", "en-au" : "COB-AU", "en-hk" : "IARC", "en-in" : "PEGI", "en-nz" : "OFLC-NZ", "en-sg" : "IARC", "ja-jp" : "CERO", "ko-kr" : "GRB", "zh-hk" : "IARC", "zh-tw" : "CSRR", "ar-ae" : "IARC", "ar-sa" : "IARC", "cs-cz" : "PEGI", "da-dk" : "PEGI", "de-at" : "USK", "de-ch" : "USK", "de-de" : "USK", "el-gr" : "PEGI", "en-gb" : "PEGI", "en-ie" : "PEGI", "en-za" : "FPB", "fi-fi" : "PEGI", "fr-be" : "PEGI", "fr-ch" : "PEGI", "fr-fr" : "PEGI", "he-il" : "PEGI", "hu-hu" : "PEGI", "it-it" : "PEGI", "nb-no" : "PEGI", "nl-be" : "PEGI", "nl-nl" : "PEGI", "pl-pl" : "PEGI", "pt-pt" : "PEGI", "ru-ru" : "PCBP", "sk-sk" : "PEGI", "sv-se" : "PEGI", "tr-tr" : "PEGI", "en-ca" : "ESRB", "fr-ca" : "ESRB", "es-ar" : "IARC", "es-cl" : "IARC", "es-co" : "IARC", "es-es" : "PEGI", "es-mx" : "ESRB", "pt-br": "DJCTQ" };
    //overrides
    fullcarouselimages = ["9PGSCB1X2P7G", "BRKX5CRMRTC2", "BZGJRJC1FGF3", "BPL68T0XK96W", "BV0NSD4NN4V4", "BPQ955FQFPH6", "BZRK5C951KK7", "BWPKGQV97N7N", "BPJ686W6S0NH", "9PDV8FKWP3B4", "BNG91PT95LQN", "C0QN5M9ZTC38", "C0GWTPD0S8S1", "C40860J5R2MP", "BR7X7MVBBQKM", "C4LLMHFQ1BXQ", "9NDDH3R9DF40", "BS36XT3Z5ZKL", "C17SFN1NXZ37", "BVFDTJ1XF6CS", "C4VLMWJWM7BG", "C57L9GR0HHB7", "BX4RTV7M28VS", "BS37BWWP2PZ1", "BW2XDRNSCCPZ", "BSZM480TSWGP", "BRGPD72KHM3Q", "C3KLDKZBHNCZ", "C3HQKX3B35PD", "C2N9CS4FS1QR", "C0X2HNVH08FB", "9NBLGGH51QT4", "BPBC39LH0Q9B", "BVV8LHVGPBS3", "BWC95BZPFBS7", "BXL4538LK4DK", "BQMVWCMB8P59", "C2BTFXNW3TTT", "9P4WKZXWP1QW", "BRJGPRMBV1NT"]
    omitimages = ["https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcB7WVDn.f4Uli2dyqvJAR1iMrHLquSMr6CthfgctOtrvg54xKrmjYXQ1BkhiG4i6RT1HzvxN47vdGKnWcFR1BrIpKbs257dc4YHkUyePffX5a.c3Z9hfO6bkguMWKak4QJZyll1iBDl8IFZ12EEgxVXSW2Bh6iGMM6qEszDFtB80-&w=980&format=jpg"]
    //omitgames = ["9PNQKHFLD2WQ"];
    swapgames = { "9PNQKHFLD2WQ": "9PNJXVCVWD4K"}
    //end overrides
    pageloadfocus = 0;
  
    var urlRegion = document.URL.split("/")[3].toLowerCase().slice(0,5);
    var ratingorg = regionRatingOrgs[urlRegion];
    var clickname = "www>games>xbox-one>GAMETITLE>click";
    var regionContent = globalContent.locales[urlRegion]; //change back to urlRegion once JSON localized
  
    var xgpGuidArray = ["FreePlayDays",];
    var pcarrays = [];
    var xgplistUrl = "https://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/CATEGORY?itemTypes=Game&DeviceFamily=Windows.Xbox&market=US&language=LANG&count=200";
    var xgplistUrlPC = "https://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/CATEGORY?itemTypes=Devices&DeviceFamily=Windows.Desktop&market=US&language=LANG&count=200";
  
    xgplistUrl = xgplistUrl.replace("US", urlRegion.split("-")[1].toUpperCase()).replace("LANG", urlRegion.split("-")[0].toUpperCase());
  
    fullGameArray = [];
  
    function noFpdGames() {
      $(".fpdYes").removeClass("active").addClass("inactive");
      $(".fpdNo").removeClass("inactive").addClass("active");
    }
  
    function replacepcwithcon(pcbid, conbid) {
      pcarrays.forEach(function(p) {
        var replaceind = p.indexOf(pcbid);
        p[replaceind] = conbid;
      })
    }
  
    for (var i = 0; i < xgpGuidArray.length; i++) {
      if (pcarrays.indexOf(xgpGuidArray[i]) === -1) {
        var catUrl = xgplistUrl.replace("CATEGORY", xgpGuidArray[i]);  
      } else {
        var catUrl = xgplistUrlPC.replace("CATEGORY", xgpGuidArray[i]);
      }
      
      (function() {
        xgpLists(catUrl, i, xgpGuidArray[i]);
      })(i);
    }
    function xgpLists(url, index, arrayname) {
      $.get(url)
          .done(function(responseData) {
            listData = responseData;
            var idlength = listData.Items.length
            var idArray = [];
            for (var j = 0; j < idlength; j++) {
              if (swapgames[listData.Items[j].Id] !== undefined) {
                if (idArray.indexOf(swapgames[listData.Items[j].Id]) === -1) {
                  idArray.push(swapgames[listData.Items[j].Id])
                }
              } else {
                if (idArray.indexOf(listData.Items[j].Id) === -1) {
                  idArray.push(listData.Items[j].Id)
                }
              }
            }
            gameIdArrays[arrayname] = [];
            gameIdArrays[arrayname] = idArray;
            //gameIdArrays[arrayname] = gameIdArrays[arrayname].filter(function(v) { return omitgames.indexOf(v) === -1});
            for (var a = 0; a < idArray.length; a++) {
              // if (fullGameArray.indexOf(idArray[a]) === -1 && omitgames.indexOf(idArray[a]) === -1) {
              if (fullGameArray.indexOf(idArray[a]) === -1) {
                fullGameArray.push(idArray[a])
              }
            }
            if (fullGameArray.length > 0) {
              chunktotal = Math.ceil(fullGameArray.length / 20)
              GUID_pop(fullGameArray);
            } else {
              noFpdGames();
            }
            
            
          })
    } 
  
    function GUID_pop(rawGuids) {
      var countryCode = urlRegion.split("-")[1].toUpperCase();
      var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
  
      var first12 = rawGuids.slice(0,12)
      rawGuids = rawGuids.slice(12)
  
      var firstToUrl = first12.join(",");
      guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
      $.get(guidUrl)
          .done(function(responseData) {
            var apiData = responseData;
            populate(apiData, 0, firstToUrl);
            guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
            restPop();
          })
  
      function restPop() {
        var m,n,temparray,chunk = 20;
        var arrayCount = 1
        for (m=0,n=rawGuids.length; m<n; m+=chunk) {
          (function(m,n) {
          temparray = rawGuids.slice(m,m+chunk);
          var guidsToUrl = temparray.join(",");
          guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)
  
          $.get(guidUrl)
            .done(function(responseData) {
              var apiData = responseData;
              populate(apiData, arrayCount, guidsToUrl);
              arrayCount++
            })
          guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
        })(m,n);
        }
      }
  
      var gamehtml = '';
      var popcounter = 0;
      var bigidUrls = biUrls.items.urls;
      var biuArray = Object.keys(bigidUrls);
      allGames = {};
      gameIdArrays["exclusives"] = [];
      gameIdArrays["newreleases"] = [];
      gameIdArrays["multiplayer"] = [];
      gameIdArrays["upcoming"] = [];
      gameIdArrays["kidsfamily"] = [];
      gameIdArrays["onsale"] = [];
      gameIdArrays["enhanced"] = gameIdArrays["enhanced"].filter(function(v) { return fullGameArray.indexOf(v) !== -1});
      gameIdArrays["360games"] = [];
  
      //get 360 object ready
      // var x360tempids = Object.keys(all360Games);
      // var x360length = x360tempids.length;
  
      // for (var x=0; x < x360length; x++) {
      //   if (all360Games[x360tempids[x]].excludes.toLowerCase().indexOf(urlRegion) !== -1) {
      //     delete all360Games[x360tempids[x]]
      //   } else if (all360Games[x360tempids[x]].includes.length > 3 && all360Games[x360tempids[x]].includes.toLowerCase().indexOf(urlRegion) === -1) {
      //     delete all360Games[x360tempids[x]]
      //   }
      // }
      // gameIdArrays["360games"] = Object.keys(all360Games);
  
  
      selectedGames = [];
      prunedGames = [];
      shownGames = [];
  
      var nowdate = new Date();
      var nowmonthsdate = new Date();
      var monthsagofilterdate = new Date(nowmonthsdate.setMonth(nowmonthsdate.getMonth() - 2));
      var locgamesremoved = 0;
  
      function populate(data, count, bigidsgiven) {
        // var now = new Date();
        // var monthsago = new Date(now.setMonth(now.getMonth() - 9));
        var productQuantity = data.Products.length;
  
        bigidsgiven = bigidsgiven.split(",");
        var allprodids = [];
        for (var s = 0; s < productQuantity; s++) {
          allprodids.push(data.Products[s].ProductId);
        }
        var eliminated = [];
        eliminated = bigidsgiven.filter(function(v) { return allprodids.indexOf(v) === -1});
  
        var giakeys = Object.keys(gameIdArrays);
  
        for (var w = 0; w < eliminated.length; w++) {
          locgamesremoved++
          var idind = fullGameArray.indexOf(eliminated[w]);
          if (idind !== -1) { fullGameArray.splice(idind, 1); }
  
          // remove from each gameidarray list
          for (var g = 0; g < giakeys.length; g++) {
            var idgind = gameIdArrays[giakeys[g]].indexOf(eliminated[w]);
            if (idgind !== -1) { gameIdArrays[giakeys[g]].splice(idgind, 1); }
          }
  
        }
  
        for (var t = 0; t < allprodids.length; t++) {
          var excludetest = false;
         // if (allprodids.indexOf(bigidsgiven[t]) !== -1) {
            var producttest = data.Products[t];
            var excludeit404 = 0;
            var excludeitpurch = 0;
            producttest.DisplaySkuAvailabilities.forEach(function(d) {
              d.Availabilities.forEach(function(av) {
                if (av.Actions.indexOf("Purchase") !== -1) {
                  excludeit404+= 1;
                  excludeitpurch+= 1;
                }
                if (av.Actions.indexOf("Details") !== -1) {
                  excludeit404+= 1;
                } 
              })
            })
            if (excludeit404 === 0 && excludeitpurch === 0) {
              excludetest = true;
            }
          //}
          
          if (excludetest === true) {
            console.log("NOTE: BigID " + allprodids[t] + " unavailable to buy in this locale. Removing from game lists.");
            locgamesremoved++
            popcounter--
            var idind = fullGameArray.indexOf(allprodids[t]);
            if (idind !== -1) { fullGameArray.splice(idind, 1); }
            
            // remove from each gameidarray list
            for (var g = 0; g < giakeys.length; g++) {
              var idgind = gameIdArrays[giakeys[g]].indexOf(eliminated[w]);
              if (idgind !== -1) { gameIdArrays[giakeys[g]].splice(idgind, 1); }
            }
          }
        }
        
        for (var i = 0; i < productQuantity; i++) {
          var itemId = data.Products[i].ProductId.toUpperCase();
  
          var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle;
          if (itemTitle === undefined) {
            itemTitle = "";
          }
          var titleClickname = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi,'');
          if (titleClickname === "") {
            titleClickname = "-";
          }
  
          var shortdesc = data.Products[i].LocalizedProperties[0].ShortDescription;
          if (shortdesc === "") {
            shortdesc = data.Products[i].LocalizedProperties[0].ProductDescription;
          }
          if (shortdesc === undefined || shortdesc === null) {
            shortdesc = "";
          }
  
          // determine physical or download
          if (gameIdArrays["physical"].indexOf(itemId) !== -1) {
            var phys = "true";
          } else {
            var phys = "false";
          }
  
          // get boxshot
          if (phys === "false" && data.Products[i].LocalizedProperties[0].Images !== undefined) {
            var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
            var imageInd = 1;
            for (var j = 0; j < imagesNum; j++) {
              if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") {
                imageInd = j;
                break;
              }
            }
            if (data.Products[i].LocalizedProperties[0].Images[imageInd]) {
              var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri.replace("http:", "https:");
              var itemBoxshotSmall;
            } else {
              var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
              var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
            if (itemBoxshot.indexOf("xboxlive.com") !== -1) {
              itemBoxshotSmall = itemBoxshot + "&w=140&format=jpg";
              itemBoxshot = itemBoxshot + "&w=200&format=jpg"; 
            } else {
              itemBoxshotSmall = itemBoxshot;
            }
          } else if (phys === "true" && data.Products[i].LocalizedProperties[0].Images !== undefined) {
              var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
              var imageInd = 999;
              for (var j = 0; j < imagesNum; j++) {
                if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") {
                  imageInd = j;
                  break;
                }
              }
              if (data.Products[i].LocalizedProperties[0].Images[imageInd]) {
                var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri.replace("http:", "https:");
                var itemBoxshotSmall;
              } else {
                if (data.Products[i].LocalizedProperties[0].Images[0]) {
                  if (data.Products[i].LocalizedProperties[0].Images[0].Uri.toLowerCase().indexOf("s-microsoft") === -1) {
                    var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[0].Uri.replace("http:", "https:") + "&w=231&h=197&q=90&m=6&b=%23FFFFFFFF&o=f";
                  } else {
                    var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[0].Uri.replace("http:", "https:")
                  }
                  var itemBoxshotSmall = itemBoxshot;
                } else {
                  var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
                  var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
                }
              } 
            } else {
              var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
              var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
  
          // get screenshot
          if (phys === "false" && data.Products[i].LocalizedProperties[0].Images !== undefined) {
            var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
            var imageInd = 1;
            for (var j = 0; j < imagesNum; j++) {
              var im = data.Products[i].LocalizedProperties[0].Images[j];
              if ((im.ImagePurpose === "ImageGallery" || im.ImagePurpose === "Screenshot") && (im.Height < im.Width)) {
                imageInd = j;
                break;
              }
            }
            if (data.Products[i].LocalizedProperties[0].Images[imageInd]) {
              var itemScreenshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri.replace("http:", "https:");
            } else {
              var itemScreenshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
            if (itemScreenshot.indexOf("xboxlive.com") !== -1) {
              itemScreenshot = itemScreenshot + "&w=480&format=jpg"; 
            }
          } else {
            if (data.Products[i].LocalizedProperties[0].Images !== undefined && data.Products[i].LocalizedProperties[0].Images[0]) {
              var itemScreenshot = data.Products[i].LocalizedProperties[0].Images[0].Uri.replace("http:", "https:") + "&w=231&h=197&q=90&m=6&b=%23FFFFFFFF&o=f";
            } else {
              var itemScreenshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
          }
  
          // get screenshot array
          var ssarray = [];
          if (phys === "false" && data.Products[i].LocalizedProperties[0].Images !== undefined) {
            var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
            var sslimit = 5;
            var imageInd = 1;
            for (var j = 0; j < imagesNum; j++) {
              var im = data.Products[i].LocalizedProperties[0].Images[j];
              if ((im.ImagePurpose.toLowerCase() === "imagegallery" || im.ImagePurpose.toLowerCase() === "screenshot") && (im.Height < im.Width)) {
                if (im.Uri.indexOf("xboxlive.com") !== -1) {
                  var ssimg = im.Uri.replace("http:", "https:") + "&w=980&format=jpg";
                } else {
                  var ssimg = im.Uri.replace("http:", "https:");
                }
                if (ssarray.length < sslimit) {
                  if (ssarray.indexOf(ssimg) === -1 && omitimages.indexOf(ssimg) === -1) {
                    ssarray.push(ssimg);
                  }
                } else {
                  break;
                } 
              }
            }
          }
          
          
          var releaseDate = data.Products[i].MarketProperties[0].OriginalReleaseDate;
          if (releaseDate === undefined) {
            releaseDate = 0;
          }
          var modDate = data.Products[i].DisplaySkuAvailabilities[0].Availabilities[0].LastModifiedDate;
          if (modDate === undefined) {
            modDate = 0;
          } 
          var msproduct = data.Products[i].IsMicrosoftProduct;
          var multiplayer = "false";
          var coop = "false";
          var mptest = data.Products[i].Properties;
          if (mptest.Attributes) {
            for (var n = 0; n < mptest.Attributes.length; n++) {
              if (mptest.Attributes[n].Name.toLowerCase().indexOf("multiplayer") !== -1) {
                multiplayer = "true";
              }
              if (mptest.Attributes[n].Name.toLowerCase().indexOf("coop") !== -1) {
                coop = "true";
              }
            }
          }
  
          //get prices
          var listprice;
          var msrpprice;
          var currencycode;
          var onsale = "false";
          var gwg = "false";
          var golddiscount = "false"; // deals with gold ... and gold member sale prices?
          var goldandsilversale = "false";
          var goldandsilversalegoldprice = 100000000;
          var specialprice = 100000000;
          var eaaccessgame = "false";
          var gamepassgame = "false";
          var purchasable = "false";
          var tempea = "false"
          var tempgs = "false";
          var goldaffids = [];
          var silversaleperc = "0%";
          var goldandsilversalegoldperc = "0%";
          var platxbox = "false";
          var platpc = "false";
          var licensekeys = [];
  
          if (phys === "false") {
            if (data.Products[i].LocalizedProperties[0].EligibilityProperties !== null && data.Products[i].LocalizedProperties[0].EligibilityProperties !== undefined && 
                data.Products[i].LocalizedProperties[0].EligibilityProperties !== "undefined") {
              if (data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.length > 0) {
                data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.forEach(function(aff) {
                  if (aff.Description.toLowerCase().indexOf("ea access") !== -1) {
                    tempea = "true";
                  }
                  if (aff.Description.toLowerCase().indexOf("game pass") !== -1) {
                    gamepassgame = "true";
                  }
                  if (aff.Description.toLowerCase().indexOf("gold") !== -1) {
                    tempgs = "true";
                    goldaffids.push(aff.AffirmationProductId);
                  }
                })
              }
            }
            data.Products[i].DisplaySkuAvailabilities.forEach(function(sku) {
              var purchnum = 0;
              sku.Availabilities.forEach(function(av, ind) {
                if (av.Actions.indexOf("Purchase") !== -1) {
                  purchasable = "true";
                  purchnum++;
                  if (purchnum > 1 && tempgs === "true" && av.RemediationRequired === true && goldaffids.indexOf(av.Remediations[0].BigId) !== -1) {
                    goldandsilversale = "true";
                  }
                  // get platform info
                  av.Conditions.ClientConditions.AllowedPlatforms.forEach(function(plat) {
                    if (plat.PlatformName === "Windows.Xbox") {
                      platxbox = "true";
                    } 
                    if (plat.PlatformName === "Windows.Desktop") {
                      platpc = "true";
                    } 
                  })
                }
                if (av.Actions.indexOf("Purchase") !== -1 && (av.OrderManagementData.Price.MSRP !== 0 || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && 
                    sku.Sku.Properties.IsTrial === false) {
                  if ((av.OrderManagementData.Price.ListPrice !== av.OrderManagementData.Price.MSRP || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && ind !== 0) {
                    specialprice = av.OrderManagementData.Price.ListPrice;
                  } else {
                    listprice = av.OrderManagementData.Price.ListPrice;
                  }
                  if (ind === 0) {
                    msrpprice = av.OrderManagementData.Price.MSRP;
                  }
                  currencycode = av.OrderManagementData.Price.CurrencyCode;
                  if (av.Properties.MerchandisingTags !== undefined) {
                    if (av.Properties.MerchandisingTags.indexOf("LegacyGamesWithGold") !== -1) {
                      gwg = "true";
                      specialprice = listprice;
                      listprice = msrpprice;
                    }
                    if (av.Properties.MerchandisingTags.indexOf("LegacyDiscountGold") !== -1) {
                      golddiscount = "true";
  
                    }
                  }
                  if (goldandsilversale === "true" && av.DisplayRank === 1) {
                    goldandsilversalegoldprice = av.OrderManagementData.Price.ListPrice;
                    var golddiff = msrpprice - goldandsilversalegoldprice;
                    goldandsilversalegoldperc = Math.round(golddiff / msrpprice * 100).toString() + "%";
                  }
                  if (tempea === "true" && av.Actions.length === 2) {
                    eaaccessgame = "true";
                  }
                  if (listprice < msrpprice) { 
                    onsale = "true";
                    var listdiff = msrpprice - listprice;
                    silversaleperc = Math.round(listdiff / msrpprice * 100).toString() + "%";
                    if (gameIdArrays["onsale"].indexOf(itemId) === -1) {
                      gameIdArrays["onsale"].push(itemId); 
                    }
                  }
                }
                // replace pc copies of console games, part 1 get connected copies
                // if (av.Actions.indexOf("License") !== -1 && av.LicensingData) {
                //   av.LicensingData.SatisfyingEntitlementKeys.forEach(function(se) {
                //     se.EntitlementKeys.forEach(function(kk) {
                //       var enkey = kk.split(":")[1];
                //       if (enkey.length === 12 && licensekeys.indexOf(enkey) === -1) {
                //         licensekeys.push(enkey)
                //       }
                //     })
                //   })
                // }
              })
            })
  
          } else {
            data.Products[i].DisplaySkuAvailabilities.forEach(function(sku) {
              sku.Availabilities.forEach(function(av) {
                if (av.Actions.indexOf("Purchase") !== -1 && av.Actions.indexOf("Browse") !== -1 && (av.OrderManagementData.Price.MSRP !== 0 || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && av.Actions.length > 2) {
                  listprice = av.OrderManagementData.Price.ListPrice;
                  msrpprice = av.OrderManagementData.Price.MSRP;
                  currencycode = av.OrderManagementData.Price.CurrencyCode;
                  if (listprice < msrpprice) { 
                    onsale = "true";
                    if (gameIdArrays["onsale"].indexOf(itemId) === -1) {
                      gameIdArrays["onsale"].push(itemId); 
                    }
                  };
                }
              })
            })
          }
          
          if (platpc === "false" && platxbox === "false") {
            platxbox = "true";
          }
  
  
          if (listprice === undefined) {
            console.log("NOTE: BigID " + itemId + " has no price information.");
            listprice = 100000000;
            msrpprice = 100000000;
            currencycode = "USD";
          }
  
          var rating = "none";
          var ratingcode = "";
          var ratingage  = 99;
          var ratingsystem = "none";
          var kidfamilyratings = ["ESRB:T", "ESRB:E10", "ESRB:E", "ESRB:EC", "ESRB:RPEveryone", "ESRB:RPTeen", "PEGI:3", "PEGI:7", "PEGI:12", "COB-AU:G", "COB-AU:PG", "COB-AU:CTC", "OFLC-NZ:G", 
                                  "OFLC-NZ:PG", "OFLC-NZ:R13", "OFLC-NZ:R13", "USK:Everyone", "USK:6", "USK:12", "IARC:3", "IARC:7", "IARC:12", "CERO:A", "CERO:B", "USK:6", "USK:Everyone", "USK:6",
                                  "PCBP:0", "PCBP:6", "PCBP:12", "DJCTQ:L", "DJCTQ:10", "DJCTQ:12", "DJCTQ:14", "CSRR:G", "CSRR:PG12", "CSRR:PG15"]
          var rawdescriptors = "none";
          var cr = 99;
          var cresrb = 0;
          if (data.Products[i].MarketProperties[0].ContentRatings !== undefined && data.Products[i].MarketProperties[0].ContentRatings !== null && data.Products[i].MarketProperties[0].ContentRatings.length > 0) {
            for (var c = 0; c < data.Products[i].MarketProperties[0].ContentRatings.length; c++) {
              if (data.Products[i].MarketProperties[0].ContentRatings[c].RatingSystem === "ESRB") {
                cresrb = c;
              }
              if (data.Products[i].MarketProperties[0].ContentRatings[c].RatingSystem === ratingorg) {
                cr = c;
              }
            }
            if (cr === 99) { cr = cresrb } // if region's rating system is not found, use esrb
            ratingcode = data.Products[i].MarketProperties[0].ContentRatings[cr].RatingId;
  
  
            ratingsystem = data.Products[i].MarketProperties[0].ContentRatings[cr].RatingSystem;
            if (kidfamilyratings.indexOf(rating) !== -1) {
              gameIdArrays["kidsfamily"].push(itemId);
            }
            rawdescriptors = data.Products[i].MarketProperties[0].ContentRatings[cr].RatingDescriptors.join(", ");
          } 
          if (urlRegion === "ja-jp" || urlRegion === "ko-kr") {
            $(".c-label[data-game='kids and family']").remove()
          }
  
          if (biuArray.indexOf(itemId) === -1 || bigidUrls[itemId].toLowerCase().indexOf(urlRegion) !== -1) {
            var itemhref = 'https://www.microsoft.com/' + urlRegion + '/store/p/' + titleClickname + '/' + itemId;
          } else {
            var itemhref = bigidUrls[itemId].split("<exc>")[0];
            var splitHref = itemhref.split("/");
            splitHref.splice(3, 0, urlRegion);
            itemhref = splitHref.join("/");
          }
  
          var avgstars = 0;
          var ratingcount = 0;
          if (data.Products[i].MarketProperties[0].UsageData) {
            //avgstars = data.Products[i].MarketProperties[0].UsageData[0].AverageRating;
            //ratingcount = data.Products[i].MarketProperties[0].UsageData[0].RatingCount;
          } 
  
  
          if (itemId === "9NCLP4LV5K7Z") {
            itemBoxshot =  "https://store-images.s-microsoft.com/image/apps.28362.67453348098260763.a9f96429-c651-425e-97d2-e8861561f15f.f7b26f7f-73d8-4f53-9f3b-4d9e4e4d23f0";
            itemBoxshotSmall =  "https://store-images.s-microsoft.com/image/apps.28362.67453348098260763.a9f96429-c651-425e-97d2-e8861561f15f.f7b26f7f-73d8-4f53-9f3b-4d9e4e4d23f0";
          }
          // if (itemId === "BZFK7WNK7R4M") {
          //   itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
          //   itemBoxshotSmall = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
          // }    
  
          // genres
          if (data.Products[i].Properties.Categories !== undefined && data.Products[i].Properties.Categories !== null) {
            var gamegenres = data.Products[i].Properties.Categories.join(", ").toLowerCase();
          } else {
            var gamegenres = "unlisted";
          }
  
          allGames[itemId] = {releasedate: releaseDate, msproduct: msproduct, multiplayer: multiplayer, coop: coop, rating: rating, ratingage: ratingage, ratingsystem: ratingsystem, 
                              gameurl : itemhref, titleclickname : titleClickname, boxshot : itemBoxshot, boxshotsmall : itemBoxshotSmall, title : itemTitle, msrpprice: msrpprice, 
                              listprice: listprice, currencycode: currencycode, onsale: onsale, upcoming: "false", newrelease: "false", physical: phys, genres: gamegenres, 
                              screenshot: itemScreenshot, descriptors: rawdescriptors, stars: avgstars, starcount: ratingcount, screenarray: ssarray, description: shortdesc, 
                              gameswithgold: gwg, golddiscount: golddiscount, goldandsilversale: goldandsilversale, goldandsilversalegoldprice: goldandsilversalegoldprice, 
                              specialprice: specialprice, eaaccessgame: eaaccessgame, gamepassgame: gamepassgame, purchasable: purchasable, silversaleperc: silversaleperc,
                              goldandsilversalegoldperc: goldandsilversalegoldperc, x360game: "false", includes: "", excludes: "", playson: "false", moddate: modDate, 
                              platformxbox: platxbox, platformpc: platpc, licensekeys: licensekeys};
  
          // add ampt list info
          for (var g = 0; g < giakeys.length; g++) {
            if (giakeys[g] !== "multiplayer") {
              allGames[itemId][giakeys[g]] = "false";
              if (gameIdArrays[giakeys[g]].indexOf(itemId) !== -1) {
                allGames[itemId][giakeys[g]] = "true";
              }
            }
          }
  
          //make API-provided lists        
          if (msproduct === true) {
            gameIdArrays["exclusives"].push(itemId);
          }
          if (multiplayer === "true") {
            gameIdArrays["multiplayer"].push(itemId);
          }
          var reldate = new Date(releaseDate);
          if (reldate > nowdate) {
            gameIdArrays["upcoming"].push(itemId);
            allGames[itemId]["upcoming"] = "true";
          }
          if (reldate < nowdate && monthsagofilterdate < reldate) {
            gameIdArrays["newreleases"].push(itemId);
            allGames[itemId]["newrelease"] = "true";
          }
  
          popcounter++;
          
          //console.log("itemId:" + itemId + "  " + i + ":" + (productQuantity -1) + "   " + popcounter + ":" + (fullGameArray.length) + "  locagamesremoved:" + locgamesremoved + "   " + count + ":" + chunktotal)
          
          if ((i === (productQuantity - 1)) && count === chunktotal - 1) {
            var activecheck = setInterval(function() {
                                var activeAjax = $.active;
                                if (activeAjax === 0) {
                                  ajaxdone();
                                  clearInterval(activecheck);
                                }
                              }, 500);
  
            function ajaxdone() {
              // Object.assign(allGames, all360Games);
              // delete all360Games
  
              // replace pc bids with cons bids part 2
              // for (var i = 0; i < pcarrays.length; i++) {
              //   for (var j = 0; j < gameIdArrays[pcarrays[i]].length; j++) {
              //     for (var k = 0; k < allGames[gameIdArrays[pcarrays[i]][j]].licensekeys.length; k++) {
              //       if (gameIdArrays["SubsXGPAllGames"].indexOf(allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]) > -1 && 
              //           gameIdArrays[pcarrays[i]][j] !== allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]) {
              //         console.log("replacing pc list " + gameIdArrays[pcarrays[i]][j] + " with " + allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]);
              //         replacepcwithcon(gameIdArrays[pcarrays[i]][j], allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]);
              //       }
              //     }
              //   }
              // }
  
              if (fullGameArray.length === 0) {
                noFpdGames();
              } else {
                var gamehtml = '';
  
                for (var i = 0; i < fullGameArray.length; i++) {
                  var theid = fullGameArray[i];
                  gamehtml += '<section class="m-product-placement-item f-size-medium context-game gameDiv" itemscope="" itemtype="http://schema.org/Product" data-bigid="' + theid + '">' +
                                 '<a class="ignoreContStore" href="' + allGames[theid].gameurl + '" data-retailer="ms store" target="_blank">' + 
                                   '<picture class="containerIMG"><img class="c-image x-hidden-focus" aria-hidden="true" srcset="" src="' + allGames[theid].boxshot + 
                                     '" alt="' + allGames[theid].title + ' boxshot"></picture>' + 
                                     '<h3 class="c-heading x1GameName" itemprop="product name">' + allGames[theid].title + '</h3></a></section>'
                }
  
                $(".fpdGames").append(gamehtml);
  
                          $(".gameDiv[data-bigid=" + itemId + "] a").attr("aria-label", "");
              }            
  
            }
          }
        }    
      }
    } 
  
    
  });
  
  