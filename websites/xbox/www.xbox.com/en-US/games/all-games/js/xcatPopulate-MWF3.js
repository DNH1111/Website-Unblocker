$(document).ready(function() {
    
    if ($(".CatAnnounce").length === 0) {
        $("body").append('<div style="width:0;height:0;font-size:0;" class="CatAnnounce" aria-live="assertive"></div>');
      }
    $(".icon-redeem a").removeAttr("data-retailer");
    regionContent = globalContent.locales[urlRegion];
    paginateclick = 0;
    // Games Per Page Filter 
    var userAgentString = navigator.userAgent;
    if (userAgentString.indexOf("Trident") >= 0) { //only IE browsers

        $('.filterMenu select option').text(regionContent["keyGpptext"]);

        $('.filterMenu select option').eq(0).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "20 "))
        $('.filterMenu select option').eq(1).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "50 "))
        $('.filterMenu select option').eq(2).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "100 "))
        $('.filterMenu select option').eq(3).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "200 "))

        var amountGamesShown = $('.filterMenu select');
        var amountGames = $('.pag-50').data('gamesmax');

        amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", amountGames + ' '));

        $(document).on("click", ".paginateDropdown li", function() {
            var gppnumber = $(this).data('gamesmax');
            $('.filterMenu button').attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
            amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
        });
    } else {
        $('.filterMenu select option').text(regionContent["keyGpptext"]);

        $('.filterMenu select option').eq(0).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "20 "))
        $('.filterMenu select option').eq(1).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "50 "))
        $('.filterMenu select option').eq(2).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "100 "))
        $('.filterMenu select option').eq(3).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "200 "))

        var amountGamesShown = $('.filterMenu select');
        var amountGames = $('.pag-50').data('gamesmax');

        amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", amountGames + ' '));

        $(document).on("click", ".paginateDropdown li", function() {
            var gppnumber = $(this).data('gamesmax');
            $('.filterMenu button').attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
            amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
        });
    }
    var win10user = false;
    if (navigator.userAgent.indexOf("Windows NT 10") > -1) { win10user = true; }
    if (win10user === false) {
      $(".win10ban").remove();
    } else {
      $(".nonwin10ban").remove();
    }

    // temp remove exclusives category
    $("a[data-col='exclusives']").remove();

    //Remove Back Compat & other filter buttons 9/11/20
    $("a[data-col='backcompat']").remove();


    if (urlRegion === "en-ae") {
        urlRegion = "ar-ae";
    } else if (urlRegion === "en-sa") {
        urlRegion = "ar-sa";
    } else if (urlRegion === "en-il") {
        urlRegion = "he-il";
    }

    function tabzero() {
        $("a.c-refine-item").attr("tabindex", "0");
        $("a.c-refine-item.ratingchoice").attr("tabindex", "0");
        $(".paginateDropdown span").attr("tabindex", "0");
    }

    var listArray = ["TopPaid:toppaid", "New:newreleases", "BestRated:bestrated", "ComingSoon:upcoming", "Deal:onsale", "TopFree:topfree", "MostPlayed:mostplayed"];
    var capArray = ["&gamecapabilities=capabilityxboxenhanced:enhanced", "&gamecapabilities=capability4k:fourk", "&gamecapabilities=capabilityhdr:HDRGaming",
        "&NumberOfPlayers=SinglePlayer:singleplayer", "&NumberOfPlayers=OnlineMultiplayerWithGold:multionline", "&NumberOfPlayers=LocalMultiplayer:multilocal",
        "&NumberOfPlayers=CoopSupportOnline:cooponline", "&NumberOfPlayers=CoopSupportLocal:cooplocal", "&gamecapabilities=XPA:xpa", "&gamecapabilities=gamestreaming:cloud",
        "&gamecapabilities=consolecrossgen:cross", "&gamecapabilities=ConsoleGen9Optimized:genNine"
    ]

    var grabLists = (function() {
        var recoUrl = "https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/LIST?Market=US&Language=EN&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=0"
        recoUrl = recoUrl.replace("US", urlRegion.split("-")[1]).replace("EN", urlRegion.split("-")[0]);

        var capUrls = ["https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=" + urlRegion.split("-")[1] +
            "&Language=" + urlRegion.split("-")[0] + "&ItemTypes=Game&deviceFamily=Windows.XboxCAPABILITY&count=2000&skipitems=0",
            "https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopFree?Market=" + urlRegion.split("-")[1] +
            "&Language=" + urlRegion.split("-")[0] + "&ItemTypes=Game&deviceFamily=Windows.XboxCAPABILITY&count=2000&skipitems=0",
            "https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/New?Market=" + urlRegion.split("-")[1] +
            "&Language=" + urlRegion.split("-")[0] + "&ItemTypes=Game&deviceFamily=Windows.XboxCAPABILITY&count=2000&skipitems=0",
            "https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/ComingSoon?Market=" + urlRegion.split("-")[1] +
            "&Language=" + urlRegion.split("-")[0] + "&ItemTypes=Game&deviceFamily=Windows.XboxCAPABILITY&count=2000&skipitems=0"
        ]

        // grab indie reco list
        gameIdArrays["indie"] = [];
        var indieUrl = "https://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/XboxIndieGames?itemTypes=Game&DeviceFamily=Windows.Xbox&market=" +
            urlRegion.split("-")[1] + "&count=200&skipItems=0";
        forcedGames = fullGameArray;
        fullGameArray = [];
        excludebids = [];
        bothpcandxbox = [];
        $.get(indieUrl)
            .done(function(listData) {
                listData.Items.forEach(function(b) {
                    gameIdArrays["indie"].push(b.Id);
                    if (fullGameArray.indexOf(b.Id) === -1) {
                      fullGameArray.push(b.Id);
                    }
                })
            })

        xgpGuidArray = ["f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e", "b8900d09-a491-44cc-916e-32b5acae621b",
                        "a884932a-f02b-40c8-a903-a008c23b1df1", "79fe89cf-f6a3-48d4-af6c-de4482cf4a51", 
                        "1d33fbb9-b895-4732-a8ca-a55c8b99fa2c", "609d944c-d395-4c0a-9ea4-e9f39b52c1ad" ];
        var xgplistUrl = "https://catalog.gamepass.com/sigls/v2?id=CATEGORY&language=LANG&market=MARK";
      
        guidAmpt = {"f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e" : "allGamePassConsole",
                    "b8900d09-a491-44cc-916e-32b5acae621b" : "allEaPlayConsole",
                    "a884932a-f02b-40c8-a903-a008c23b1df1" : "popularPC",
                    "79fe89cf-f6a3-48d4-af6c-de4482cf4a51" : "bethesdaPC",
                    "1d33fbb9-b895-4732-a8ca-a55c8b99fa2c" : "eaplayPC",
                    "609d944c-d395-4c0a-9ea4-e9f39b52c1ad" : "pcGames",              
        }
        gameIdArrays["pcSale"] = [];
      
        xgplistUrl = xgplistUrl.replace("LANG", urlRegion).replace("MARK", urlRegion.split("-")[1].toUpperCase());
      
        for (var i = 0; i < xgpGuidArray.length; i++) {
          var catUrl = xgplistUrl.replace("CATEGORY", xgpGuidArray[i]);  
         
          (function() {
            xgpLists(catUrl, i, guidAmpt[xgpGuidArray[i]]);
          })(i);
        }
        function xgpLists(url, index, arrayname) {
          $.get(url)
            .done(function(responseData) {
              listData = responseData;
              var idlength = listData.length
              var idArray = [];
              for (var j = 1; j < idlength; j++) {
                if (idArray.indexOf(listData[j].id) === -1) {
                  idArray.push(listData[j].id)
                }
                if (fullGameArray.indexOf(listData[j].id) === -1) {
                  fullGameArray.push(listData[j].id)
                }
              }
              gameIdArrays[arrayname] = [];
              gameIdArrays[arrayname] = idArray;
              
              if (arrayname === "pcGames") {
                var activecheck1 = setInterval(function() {
                                  var activeAjax = $.active;
                                  if (activeAjax === 0) {
                                    chunktotal = Math.ceil(fullGameArray.length / 20)
                                    // for (var k = 0; k < fullGameArray.length; k++) {
                                    //   if (gameIdArrays["pcGames"].indexOf(fullGameArray[k]) === -1) {
                                    //     gameIdArrays["pcGames"].push(fullGameArray[k]);
                                    //   }
                                    // }
                                    cloudList();
                                    clearInterval(activecheck1);
                                  }
                                }, 500);
              }
            })
        } 

        function cloudList() {
          if (gameIdArrays["cloud"] === undefined) { gameIdArrays["cloud"] = []; }
          // grab cloud sigl list
          var cloudUrl = "https://catalog.gamepass.com/sigls/v2?id=29a81209-df6f-41fd-a528-2ae6b91f719c&language=" + urlRegion.split("-")[0] + "&market=" + urlRegion.split("-")[1];
          $.get(cloudUrl)
              .done(function(listData) {
                  listData.forEach(function(b) {
                      if (gameIdArrays["cloud"].indexOf(b.id) === -1 && b.id !== undefined) {
                          gameIdArrays["cloud"].push(b.id);
                      }
                      if (fullGameArray.indexOf(b.id) === -1 && b.id !== undefined) {
                        fullGameArray.push(b.id);
                        // if (gameIdArrays["pcGames"].indexOf(b.id) !== -1 && bothpcandxbox.indexOf(b.id) === -1) {
                        //   bothpcandxbox.push(b.id);
                        // }
                      }
                  })
                  mainLists();
              })
        }


        // main list arrays
        function mainLists() {
            for (var i = 0; i < listArray.length; i++) {
                (function(i) {
                    var listreplace = listArray[i].split(":")[0];
                    var arrayname = listArray[i].split(":")[1];
                    gameIdArrays[arrayname] = [];
                    var listUrl = recoUrl.replace("LIST", listreplace);
                    $.get(listUrl)
                        .done(function(responseData) {
                            var totalitems = responseData.PagingInfo.TotalItems;
                            responseData.Items.forEach(function(e) {
                                if (excludebids.indexOf(e.Id) === -1) {
                                    gameIdArrays[arrayname].push(e.Id);
                                }
                                if (fullGameArray.indexOf(e.Id) === -1 && excludebids.indexOf(e.Id) === -1) {
                                    fullGameArray.push(e.Id);
                                    if (gameIdArrays["pcGames"].indexOf(e.Id) !== -1 && bothpcandxbox.indexOf(e.Id) === -1) {
                                      bothpcandxbox.push(e.Id);
                                    }
                                }
                            })
                            if (totalitems > 200) {
                                var chunks = Math.ceil(totalitems / 200)
                                largeList(listUrl, arrayname, chunks);
                            }
                            if (i === listArray.length - 1) {
                                var recoactivecheck = setInterval(function() {
                                    var recoactiveAjax = $.active;
                                    if (recoactiveAjax === 0) {
                                      // make sure toppaid is first
                                      fullGameArray = fullGameArray.filter(function(v) { return gameIdArrays["toppaid"].indexOf(v) === -1 });
                                      var tpcount = gameIdArrays["toppaid"].length;
                                      for (var f = tpcount - 1; f >= 0; f--) {
                                        fullGameArray.unshift(gameIdArrays["toppaid"][f]);
                                      }
                                      capLists();
                                      clearInterval(recoactivecheck);
                                    }
                                }, 500);
                            }
                        })
                })(i);
            }
        }

        // capability list arrays
        function capLists() {
          for (var i = 0; i < capArray.length; i++) {
              var arrayname = capArray[i].split(":")[1];
              gameIdArrays[arrayname] = [];
          }
          for (var i = 0; i < capUrls.length; i++) {
              (function(i) {
                  for (var j = 0; j < capArray.length; j++) {
                      (function(j) {
                          var listreplace = capArray[j].split(":")[0];
                          var arrayname = capArray[j].split(":")[1];
                          var listUrl = capUrls[i].replace("CAPABILITY", listreplace);
                          $.get(listUrl)
                              .done(function(responseData) {
                                  var totalitems = responseData.PagingInfo.TotalItems;
                                  responseData.Items.forEach(function(e) {
                                      if (gameIdArrays[arrayname].indexOf(e.Id) === -1 && excludebids.indexOf(e.Id) === -1) {
                                          gameIdArrays[arrayname].push(e.Id);
                                          if (gameIdArrays["pcGames"].indexOf(e.Id) !== -1 && bothpcandxbox.indexOf(e.Id) === -1) {
                                            bothpcandxbox.push(e.Id);
                                          }
                                      }
                                  })
                                  if (totalitems > 200) {
                                      var chunks = Math.ceil(totalitems / 200)
                                      largeList(listUrl, arrayname, chunks, true);
                                  }
                                  if (i === capUrls.length - 1 && j === capArray.length - 1) {
                                    var capactivecheck = setInterval(function() {
                                        var capactiveAjax = $.active;
                                        if (capactiveAjax === 0) {
                                          recodone();
                                          clearInterval(capactivecheck);
                                        }
                                    }, 500);
                                }
                              })
                      })(j);
                  }
              })(i);
          }
        }

        function largeList(url, arrayname, chunks, cap) {
            for (var i = 1; i < chunks; i++) {
                (function(i) {
                    var skipnum = 200 * i;
                    var largeUrl = url.replace("skipitems=0", "skipitems=" + skipnum);
                    $.get(largeUrl)
                        .done(function(responseData) {
                            responseData.Items.forEach(function(e) {
                                if (cap === true) {
                                    if (gameIdArrays[arrayname].indexOf(e.Id) === -1 && excludebids.indexOf(e.Id) === -1) {
                                        gameIdArrays[arrayname].push(e.Id);
                                        if (gameIdArrays["pcGames"].indexOf(e.Id) !== -1 && bothpcandxbox.indexOf(e.Id) === -1) {
                                          bothpcandxbox.push(e.Id);
                                        }
                                    }
                                } else {
                                    if (excludebids.indexOf(e.Id) === -1) {
                                        gameIdArrays[arrayname].push(e.Id);
                                    }
                                    if (fullGameArray.indexOf(e.Id) === -1 && excludebids.indexOf(e.Id) === -1) {
                                        fullGameArray.push(e.Id);
                                        if (gameIdArrays["pcGames"].indexOf(e.Id) !== -1 && bothpcandxbox.indexOf(e.Id) === -1) {
                                          bothpcandxbox.push(e.Id);
                                        }
                                    }
                                }
                            })
                        })
                })(i);
            }
        }

        function recodone() {
            //fullGameArray = []; grabbing from xcat-bi-urls2
            for (var i = 0; i < listArray.length; i++) {
                var arrayname = listArray[i].split(":")[1];
                //fullGameArray = fullGameArray.concat(gameIdArrays[arrayname]);
                //fullGameArray = removedups(fullGameArray);
                for (var j = 0; j < gameIdArrays[arrayname].length; j++) {
                    if (fullGameArray.indexOf(gameIdArrays[arrayname][j]) === -1 && excludebids.indexOf(gameIdArrays[arrayname][j]) === -1) {
                        fullGameArray.push(gameIdArrays[arrayname][j])
                        if (gameIdArrays["pcGames"].indexOf(gameIdArrays[arrayname][j]) !== -1 && bothpcandxbox.indexOf(gameIdArrays[arrayname][j]) === -1) {
                          bothpcandxbox.push(gameIdArrays[arrayname][j]);
                        }
                    }
                }
            }
            for (var j = 0; j < gameIdArrays["cloud"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["cloud"][j]) === -1 && excludebids.indexOf(gameIdArrays["cloud"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["cloud"][j])
                    if (gameIdArrays["pcGames"].indexOf(gameIdArrays["cloud"][j]) !== -1 && bothpcandxbox.indexOf(gameIdArrays["cloud"][j]) === -1) {
                      bothpcandxbox.push(gameIdArrays["cloud"][j]);
                    }
                }
            }
            for (var k = 0; k < forcedGames.length; k++) {
              if (fullGameArray.indexOf(forcedGames[k]) === -1 && excludebids.indexOf(forcedGames[k]) === -1) {
                fullGameArray.push(forcedGames[k])
                if (gameIdArrays["pcGames"].indexOf(forcedGames[k]) !== -1 && bothpcandxbox.indexOf(forcedGames[k]) === -1) {
                  bothpcandxbox.push(forcedGames[k]);
                }
              }
            }
            
            gameIdArrays["allXbox"] = [];
            var pctoremove = gameIdArrays["pcGames"].filter(function(v) { return bothpcandxbox.indexOf(v) === -1})
            gameIdArrays["allXbox"] = fullGameArray.filter(function(v) { return pctoremove.indexOf(v) === -1 })
            popJSON();
        }

    })();

    function popJSON() {
      regionRatingOrgs = { "en-us" : "ESRB", "en-au" : "COB-AU", "en-hk" : "IARC", "en-in" : "PEGI", "en-nz" : "OFLC-NZ", "en-sg" : "IARC", "ja-jp" : "CERO", "ko-kr" : "GRB", "zh-hk" : "IARC", "zh-tw" : "CSRR", "ar-ae" : "IARC", "ar-sa" : "IARC", "cs-cz" : "PEGI", "da-dk" : "PEGI", "de-at" : "USK", "de-ch" : "USK", "de-de" : "USK", "el-gr" : "PEGI", "en-gb" : "PEGI", "en-ie" : "PEGI", "en-za" : "FPB", "fi-fi" : "PEGI", "fr-be" : "PEGI", "fr-ch" : "PEGI", "fr-fr" : "PEGI", "he-il" : "PEGI", "hu-hu" : "PEGI", "it-it" : "PEGI", "nb-no" : "PEGI", "nl-be" : "PEGI", "nl-nl" : "PEGI", "pl-pl" : "PEGI", "pt-pt" : "PEGI", "ru-ru" : "PCBP", "sk-sk" : "PEGI", "sv-se" : "PEGI", "tr-tr" : "PEGI", "en-ca" : "ESRB", "fr-ca" : "ESRB", "es-ar" : "IARC", "es-cl" : "IARC", "es-co" : "IARC", "es-es" : "PEGI", "es-mx" : "ESRB", "pt-br": "DJCTQ" };
        //overrides
        fullcarouselimages = ["9PGSCB1X2P7G", "BRKX5CRMRTC2", "BZGJRJC1FGF3", "BPL68T0XK96W", "BV0NSD4NN4V4", "BPQ955FQFPH6", "BZRK5C951KK7", "BWPKGQV97N7N", "BPJ686W6S0NH", "9PDV8FKWP3B4", "BNG91PT95LQN", "C0QN5M9ZTC38", "C0GWTPD0S8S1", "C40860J5R2MP", "BR7X7MVBBQKM", "C4LLMHFQ1BXQ", "9NDDH3R9DF40", "BS36XT3Z5ZKL", "C17SFN1NXZ37", "BVFDTJ1XF6CS", "C4VLMWJWM7BG", "C57L9GR0HHB7", "BX4RTV7M28VS", "BS37BWWP2PZ1", "BW2XDRNSCCPZ", "BSZM480TSWGP", "BRGPD72KHM3Q", "C3KLDKZBHNCZ", "C3HQKX3B35PD", "C2N9CS4FS1QR", "C0X2HNVH08FB", "9NBLGGH51QT4", "BPBC39LH0Q9B", "BVV8LHVGPBS3", "BWC95BZPFBS7", "BXL4538LK4DK", "BQMVWCMB8P59", "C2BTFXNW3TTT", "9P4WKZXWP1QW", "BRJGPRMBV1NT"]
        omitimages = ["https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcB7WVDn.f4Uli2dyqvJAR1iMrHLquSMr6CthfgctOtrvg54xKrmjYXQ1BkhiG4i6RT1HzvxN47vdGKnWcFR1BrIpKbs257dc4YHkUyePffX5a.c3Z9hfO6bkguMWKak4QJZyll1iBDl8IFZ12EEgxVXSW2Bh6iGMM6qEszDFtB80-&w=980&format=jpg"]
        specialexclusives = ["9P5SL4LDLMG3"];
        // games excluded in particular locale
        locExclusions = ["9NT4X7P8B9NB:ja-jp", "9PDV8FKWP3B4:ja-jp", "BZJH12CJ6N3R:ja-jp", "C3FXTTH4NFQN:ja-jp", "BRXK34KJJXH8:ja-jp", "C1TBCX541JW7:ja-jp", "BSD19LV8DMRN:ja-jp"];
        for (var i = 0; i < locExclusions.length; i++) {
            var thegame = locExclusions[i].split(":")[0];
            var theloc = locExclusions[i].split(":")[1];
            if (urlRegion === theloc) {
                fullGameArray = fullGameArray.filter(function(v) { return v !== thegame });
            }
        }
        // games only included in particular locale
        var locInclusions = ["9NLM45C6729Z:ja-jp"];
        for (var i = 0; i < locInclusions.length; i++) {
            var thegame = locInclusions[i].split(":")[0];
            var theloc = locInclusions[i].split(":")[1];
            if (urlRegion !== theloc) {
                fullGameArray = fullGameArray.filter(function(v) { return v !== thegame });
            }
        }
        //end overrides
        pageloadfocus = 0;
        entrycat = false;

        var urlRegion = document.URL.split("/")[3].toLowerCase().slice(0,5);
        ratingorg = regionRatingOrgs[urlRegion];
        clickname = "www>games>xbox-one>GAMETITLE>click";
        regionContent = globalContent.locales[urlRegion];

        var allKeys = Object.keys(regionContent)
        var keysLength = allKeys.length

        setTimeout(function() {
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
                }
            }
            GUID_pop(fullGameArray);
            ieFix();
        }, 650);
        // special needs for page


        $(".xghsearch input").attr("placeholder", regionContent["keyAriasearchplaceholder"]);

        if ($("[data-loc-copy='keyCopylinks3title']").text().indexOf("####") !== -1) {
            $("[data-loc-copy='keyCopylinks3title']").closest("div[data-grid='col-6']").remove();
            $('.pagelinks [data-grid="col-6 pad-12x"]').removeAttr("data-grid");
            $('.pagelinks [data-grid="col-6"]').attr("data-grid", "col-4").css("padding", "0 12px");
        }

        //fix for IE  hero
        // window resizing
        function ieFix() {
            var userAgentString = navigator.userAgent;
            if (userAgentString.indexOf("Trident") >= 0) { //only IE browsers
                $(".m-content-placement-item.f-size-large").each(function() {
                    $(this).find("img").attr("src", $(this).find("img").attr("srcset"))
                })
                var winWidth = $(document).width();
                if (winWidth < 767) {
                    $(".c-image").each(function() {
                        if ($(this).find("source").length === 3) {
                            $(this).find("img").attr("src", $(this).find("source").eq(2).attr("srcset"));
                        } else if ($(this).find("source").length === 2) {
                            $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                        } else {
                            $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                        }
                    });
                } else if (winWidth >= 768 && winWidth < 1083) {
                    $(".c-image").each(function() {
                        if ($(this).find("source").length === 3) {
                            $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                        } else {
                            $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                        }
                    });
                } else if (winWidth >= 1084) {
                    $(".c-image").each(function() {
                        $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                    });
                }

                var windowresized = (function() {
                    var timers = {};
                    return function(callback, ms, uniqueId) {
                        if (!uniqueId) {
                            uniqueId = "Fires only once.";
                        }
                        if (timers[uniqueId]) {
                            clearTimeout(timers[uniqueId]);
                        }
                        timers[uniqueId] = setTimeout(callback, ms);
                    };
                })();

                $(window).resize(function() {
                    windowresized(function() {
                        $(".m-content-placement-item.f-size-large").each(function() {
                            $(this).find("img").attr("src", $(this).find("img").attr("srcset"))
                        })
                        var newWidth = $(document).width();
                        if (newWidth < 767) {
                            $(".c-image").each(function() {
                                if ($(this).find("source").length === 3) {
                                    $(this).find("img").attr("src", $(this).find("source").eq(2).attr("srcset"));
                                } else if ($(this).find("source").length === 2) {
                                    $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                                } else {
                                    $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                                }
                            });
                        } else if (newWidth >= 768 && newWidth < 1083) {
                            $(".c-image").each(function() {
                                if ($(this).find("source").length === 3) {
                                    $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                                } else {
                                    $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                                }
                            });
                        } else if (newWidth >= 1084) {
                            $(".c-image").each(function() {
                                $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                            });
                        }
                    }, 200, "pageresize");
                });
            }
        }

    }

    function GUID_pop(rawGuids) {
        var chunktotal = Math.ceil(fullGameArray.length / 20)
        console.log("running guid_pop: " + fullGameArray.length)
        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'

        var first12 = rawGuids.slice(0, 12)
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
            var m, n, temparray, chunk = 20;
            var arrayCount = 1
            for (m = 0, n = rawGuids.length; m < n; m += chunk) {
                (function(m, n) {
                    temparray = rawGuids.slice(m, m + chunk);
                    var guidsToUrl = temparray.join(",");
                    guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)

                    $.get(guidUrl)
                        .done(function(responseData) {
                            var apiData = responseData;
                            populate(apiData, arrayCount, guidsToUrl);
                            arrayCount++
                        })
                    guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                })(m, n);
            }
        }

        var gamehtml = '';
        var popcounter = 0;
        var bigidUrls = biUrls.items.urls;
        var biuArray = Object.keys(bigidUrls);
        allGames = {};
        allGamesExcludes = [];
        gameIdArrays["exclusives"] = [];
        //gameIdArrays["newreleases"] = [];
        gameIdArrays["multiplayer"] = [];
        //gameIdArrays["upcoming"] = [];
        gameIdArrays["kidsfamily"] = [];
        //gameIdArrays["onsale"] = [];

        selectedGames = [];
        prunedGames = [];
        shownGames = [];

        var nowdate = new Date();
        var nowmonthsdate = new Date();
        var monthsagofilterdate = new Date(nowmonthsdate.setMonth(nowmonthsdate.getMonth() - 2));
        var locgamesremoved = 0;

        nonPurchForced = nonPurchBigIds;
        

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
            eliminated = bigidsgiven.filter(function(v) { return allprodids.indexOf(v) === -1 });

            for (var w = 0; w < eliminated.length; w++) {
                locgamesremoved++
                var idind = fullGameArray.indexOf(eliminated[w]);
                if (idind !== -1) { fullGameArray.splice(idind, 1); }
                var idind1 = gameIdArrays["HDRGaming"].indexOf(eliminated[w]);
                if (idind1 !== -1) { gameIdArrays["HDRGaming"].splice(idind1, 1); }
                var idind2 = gameIdArrays["topfree"].indexOf(eliminated[w]);
                if (idind2 !== -1) { gameIdArrays["topfree"].splice(idind2, 1); }
                var idind3 = gameIdArrays["enhanced"].indexOf(eliminated[w]);
                if (idind3 !== -1) { gameIdArrays["enhanced"].splice(idind3, 1); }
                var idind4 = gameIdArrays["fourk"].indexOf(eliminated[w]);
                if (idind4 !== -1) { gameIdArrays["fourk"].splice(idind4, 1); }
                var idind5 = gameIdArrays["xpa"].indexOf(eliminated[w]);
                if (idind5 !== -1) { gameIdArrays["xpa"].splice(idind5, 1); }
                var idind6 = gameIdArrays["exclusives"].indexOf(eliminated[w]);
                if (idind6 !== -1) { gameIdArrays["exclusives"].splice(idind6, 1); }
                var idind7 = gameIdArrays["kidsfamily"].indexOf(eliminated[w]);
                if (idind7 !== -1) { gameIdArrays["kidsfamily"].splice(idind7, 1); }
                var idind8 = gameIdArrays["newreleases"].indexOf(eliminated[w]);
                if (idind8 !== -1) { gameIdArrays["newreleases"].splice(idind8, 1); }
                var idind9 = gameIdArrays["multiplayer"].indexOf(eliminated[w]);
                if (idind9 !== -1) { gameIdArrays["multiplayer"].splice(idind9, 1); }
                var idind10 = gameIdArrays["upcoming"].indexOf(eliminated[w]);
                if (idind10 !== -1) { gameIdArrays["upcoming"].splice(idind10, 1); }
                var idind11 = gameIdArrays["cloud"].indexOf(eliminated[w]);
                if (idind11 !== -1) { gameIdArrays["cloud"].splice(idind11, 1); }
                var idind12 = gameIdArrays["onsale"].indexOf(eliminated[w]);
                if (idind12 !== -1) { gameIdArrays["onsale"].splice(idind12, 1); }
                // var idind13 = gameIdArrays["physical"].indexOf(eliminated[w]);
                // if (idind13 !== -1) { gameIdArrays["physical"].splice(idind13, 1); }
                var idind14 = gameIdArrays["mostplayed"].indexOf(eliminated[w]);
                if (idind14 !== -1) { gameIdArrays["mostplayed"].splice(idind14, 1); }
                var idind15 = gameIdArrays["allXbox"].indexOf(eliminated[w]);
                if (idind15 !== -1) { gameIdArrays["allXbox"].splice(idind15, 1); }
                var idind16 = gameIdArrays["pcGames"].indexOf(eliminated[w]);
                if (idind16 !== -1) { gameIdArrays["pcGames"].splice(idind16, 1); }
                var idind17 = gameIdArrays["popularPC"].indexOf(eliminated[w]);
                if (idind17 !== -1) { gameIdArrays["popularPC"].splice(idind17, 1); }
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
                                excludeit404 += 1;
                                excludeitpurch += 1;
                            }
                            if (av.Actions.indexOf("Details") !== -1) {
                                excludeit404 += 1;
                                nonPurchForced.forEach(function(e) {
                                    if (d.Sku.ProductId.indexOf(e) !== -1) {
                                        excludeitpurch += 1;
                                    }
                                })
                            }
                        })
                    })
                    // if (excludeit404 === 0 && excludeitpurch === 0) {
                    //   excludetest = true;
                    // }
                if (excludeitpurch === 0 && gameIdArrays["eaplayPC"].indexOf(allprodids[t]) === -1) {
                    excludetest = true;
                }
                // de-duping
                //   producttest.MarketProperties[0].RelatedProducts.forEach(function(rp) {
                //     if (rp.RelationshipType === "Extends" && fullGameArray.indexOf(rp.RelatedProductId) !== -1) {
                //       var keeprelated = ["9PNJXVCVWD4K"]
                //       if (excludetest === false && keeprelated.indexOf(allprodids[t]) !== -1) {
                //         excludetest = false;
                //       } else {
                //         excludetest = true;
                //       }
                //     }
                //   })
                //}

                if (excludetest === true) {
                    allGamesExcludes.push(allprodids[t]);
                    console.log("NOTE: BigID " + allprodids[t] + " unavailable to buy in this locale. Removing from game lists.");
                    locgamesremoved++
                    popcounter--
                    var idind = fullGameArray.indexOf(allprodids[t]);
                    if (idind !== -1) { fullGameArray.splice(idind, 1); }
                    var idind1 = gameIdArrays["HDRGaming"].indexOf(allprodids[t]);
                    if (idind1 !== -1) { gameIdArrays["HDRGaming"].splice(idind1, 1); }
                    var idind2 = gameIdArrays["topfree"].indexOf(allprodids[t]);
                    if (idind2 !== -1) { gameIdArrays["topfree"].splice(idind2, 1); }
                    var idind3 = gameIdArrays["enhanced"].indexOf(allprodids[t]);
                    if (idind3 !== -1) { gameIdArrays["enhanced"].splice(idind3, 1); }
                    var idind4 = gameIdArrays["fourk"].indexOf(allprodids[t]);
                    if (idind4 !== -1) { gameIdArrays["fourk"].splice(idind4, 1); }
                    var idind5 = gameIdArrays["xpa"].indexOf(allprodids[t]);
                    if (idind5 !== -1) { gameIdArrays["xpa"].splice(idind5, 1); }
                    var idind6 = gameIdArrays["exclusives"].indexOf(allprodids[t]);
                    if (idind6 !== -1) { gameIdArrays["exclusives"].splice(idind6, 1); }
                    var idind7 = gameIdArrays["kidsfamily"].indexOf(allprodids[t]);
                    if (idind7 !== -1) { gameIdArrays["kidsfamily"].splice(idind7, 1); }
                    var idind8 = gameIdArrays["newreleases"].indexOf(allprodids[t]);
                    if (idind8 !== -1) { gameIdArrays["newreleases"].splice(idind8, 1); }
                    var idind9 = gameIdArrays["multiplayer"].indexOf(allprodids[t]);
                    if (idind9 !== -1) { gameIdArrays["multiplayer"].splice(idind9, 1); }
                    var idind10 = gameIdArrays["upcoming"].indexOf(allprodids[t]);
                    if (idind10 !== -1) { gameIdArrays["upcoming"].splice(idind10, 1); }
                    var idind11 = gameIdArrays["cloud"].indexOf(allprodids[t]);
                    if (idind11 !== -1) { gameIdArrays["cloud"].splice(idind11, 1); }
                    var idind12 = gameIdArrays["onsale"].indexOf(allprodids[t]);
                    if (idind12 !== -1) { gameIdArrays["onsale"].splice(idind12, 1); }
                    // var idind13 = gameIdArrays["physical"].indexOf(allprodids[t]);
                    // if (idind13 !== -1) { gameIdArrays["physical"].splice(idind13, 1); }
                    var idind14 = gameIdArrays["mostplayed"].indexOf(allprodids[t]);
                    if (idind14 !== -1) { gameIdArrays["mostplayed"].splice(idind14, 1); }
                    var idind15 = gameIdArrays["allXbox"].indexOf(allprodids[t]);
                    if (idind15 !== -1) { gameIdArrays["allXbox"].splice(idind15, 1); }
                    var idind16 = gameIdArrays["pcGames"].indexOf(allprodids[t]);
                    if (idind16 !== -1) { gameIdArrays["pcGames"].splice(idind16, 1); }
                    var idind17 = gameIdArrays["popularPC"].indexOf(allprodids[t]);
                    if (idind17 !== -1) { gameIdArrays["popularPC"].splice(idind17, 1); }
                }
            }

            for (var i = 0; i < productQuantity; i++) {
                var itemId = data.Products[i].ProductId.toUpperCase();
                var descriptionSizeLimit = 300;

                var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle;
                if (itemTitle === undefined) {
                    itemTitle = "";
                }
                var titleClickname = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi, '');
                if (titleClickname === "") {
                    titleClickname = "-";
                }

                var shortdesc = data.Products[i].LocalizedProperties[0].ShortDescription;
                if (shortdesc === "") {
                    shortdesc = data.Products[i].LocalizedProperties[0].ProductDescription;
                }
                if (shortdesc === undefined) {
                    shortdesc = "";
                }

                if (shortdesc && (shortdesc.length > descriptionSizeLimit)) { // This should trim the description to prevent overflow
                    for (var j = descriptionSizeLimit; j > 0; j--) {
                        var curChar = shortdesc.charAt(j);
                        if (curChar == '.' || curChar == '?' || curChar == "!") {
                            shortdesc = shortdesc.substring(0, j + 1);
                            break;
                        }
                    }
                }

                var searchterms = "";
                if (data.Products[i].LocalizedProperties[0].SearchTitles !== undefined && data.Products[i].LocalizedProperties[0].SearchTitles.length > 0) {
                  data.Products[i].LocalizedProperties[0].SearchTitles.forEach(function(st) {
                    searchterms += st.SearchTitleString.toLowerCase() + " "
                  })
                }


                // determine physical or download
                // if (gameIdArrays["physical"].indexOf(itemId) !== -1) {
                //   var phys = "true";
                // } else {
                var phys = "false";
                // }

                // get boxshot
                if (phys === "false" && data.Products[i].LocalizedProperties[0].Images !== undefined) {
                    var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
                    var imageInd = 999;
                    for (var j = 0; j < imagesNum; j++) {
                        if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") { // boxshots BrandedKeyArt
                            imageInd = j;
                            break;
                        }
                    }
                    if (imageInd === 999) {
                        for (var j = 0; j < imagesNum; j++) {
                            if (data.Products[i].LocalizedProperties[0].Images[j].Width < data.Products[i].LocalizedProperties[0].Images[j].Height) {
                                imageInd = j;
                                break;
                            }
                        }
                    }
                    if (imageInd === 999) {
                        imageInd = 1
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
                        itemBoxshot = itemBoxshot + "&h=300&w=200&format=jpg";
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
                var superheroart = "";
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
                        } else if (im.ImagePurpose.toLowerCase() === "superheroart") {
                            if (im.Uri.indexOf("xboxlive.com") !== -1) {
                                var shimg = im.Uri.replace("http:", "https:") + "&w=980&format=jpg";
                            } else {
                                var shimg = im.Uri.replace("http:", "https:");
                            }
                            //console.log("keyart = " + kaimg);
                            superheroart = shimg;
                    }
                }
            }


                var releaseDate = data.Products[i].MarketProperties[0].OriginalReleaseDate;
                if (releaseDate === undefined) {
                    releaseDate = 0;
                }
                var msproduct = data.Products[i].IsMicrosoftProduct;
                if (specialexclusives.indexOf(itemId) !== -1) {
                    msproduct = true;
                }
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
                var onsalepc = "false";
                var gwg = "false";
                var golddiscount = "false"; // deals with gold ... and gold member sale prices?
                var goldandsilversale = "false";
                var goldandsilversalegoldprice = 100000000;
                var specialprice = 100000000;
                var eaaccessgame = "false";
                var gamepassgame = "false";
                var eaplaygame = "false";
                var gamepassprice = 0;
                var eaplayprice = 0;
                var purchasable = "false";
                var tempea = "false"
                var tempgs = "false";
                var goldaffids = [];
                var platxbox = "false";
                var platpc = "false";
                var platxo = "false";
                var platxsx = "false";

                if (phys === "false") {
                    if (data.Products[i].LocalizedProperties[0].EligibilityProperties !== null && data.Products[i].LocalizedProperties[0].EligibilityProperties !== undefined &&
                        data.Products[i].LocalizedProperties[0].EligibilityProperties !== "undefined") {
                        if (data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.length > 0) {
                            data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.forEach(function(aff) {
                                // if (aff.Description.toLowerCase().indexOf("ea access") !== -1) {
                                //     tempea = "true";
                                //     gamepassgame = "true";
                                // }
                                // if (aff.Description.toLowerCase().indexOf("game pass") !== -1) {
                                //     gamepassgame = "true";
                                // }
                                // if (aff.Description.toLowerCase().indexOf("ea play") !== -1) {
                                //     eaplaygame = "true";
                                //     gamepassgame = "true";
                                // }
                                if (aff.Description.toLowerCase().indexOf("gold") !== -1) {
                                    tempgs = "true";
                                    goldaffids.push(aff.AffirmationProductId);
                                }
                            })
                        }
                        if (data.Products[i].LocalizedProperties[0].EligibilityProperties.Remediations.length > 0) {
                            data.Products[i].LocalizedProperties[0].EligibilityProperties.Remediations.forEach(function (re) {
                                // if (re.Description.toLowerCase().indexOf("ea access") !== -1) {
                                //     tempea = "true";
                                //     gamepassgame = "true";
                                // }
                                // if (re.Description.toLowerCase().indexOf("game pass") !== -1 && 
                                //     gameIdArrays["upcoming"].indexOf(itemId) !== -1) {
                                //     gamepassgame = "true";
                                // }
                                // if (re.Description.toLowerCase().indexOf("ea play") !== -1) {
                                //     eaplaygame = "true";
                                //     gamepassgame = "true";
                                // }
                                // if (re.Description.toLowerCase().indexOf("gold") !== -1) {
                                //     tempgs = "true";
                                //     goldaffids.push(aff.AffirmationProductId);
                                // }
                            })
                        }
                    }

                    if (gameIdArrays["allEaPlayConsole"].indexOf(itemId) !== -1 || gameIdArrays["eaplayPC"].indexOf(itemId) !== -1) {
                      eaplaygame = "true";
                    }
                    if (gameIdArrays["allGamePassConsole"].indexOf(itemId) !== -1 || gameIdArrays["pcGames"].indexOf(itemId) !== -1) {
                      gamepassgame = "true";
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
                                        if (gameIdArrays["allXbox"].indexOf(itemId) === -1) {
                                          gameIdArrays["allXbox"].push(itemId);
                                        }
                                    }
                                    if (plat.PlatformName === "Windows.Desktop") {
                                        platpc = "true";
                                    }
                                })
                                if (gamepassgame === "true") {
                                  if (av.RemediationRequired === true) {
                                    av.Remediations.forEach(function(rm) {
                                      if (rm.BigId === "CFQ7TTC0K6L8") {
                                        gamepassprice = av.OrderManagementData.Price.ListPrice;
                                      }
                                    })
                                  }
                                }
                                if (eaplaygame === "true") {
                                  if (av.RemediationRequired === true && av.OrderManagementData.Price.MSRP) {
                                    av.Remediations.forEach(function(rm) {
                                      if (rm.BigId === "CFQ7TTC0K5DH") {
                                        eaplayprice = av.OrderManagementData.Price.ListPrice;
                                      }
                                    })
                                  }
                                }
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
                                }
                                if (tempea === "true" && av.Actions.length === 2) {
                                    eaaccessgame = "true";
                                }
                                if (gameIdArrays["onsale"].indexOf(itemId) !== -1) {
                                    onsale = "true";
                                }
                                if (gameIdArrays["pcGames"].indexOf(itemId) !== -1) {
                                  if (listprice < msrpprice) { 
                                    onsalepc = "true";
                                    if (gameIdArrays["pcSale"].indexOf(itemId) === -1) {
                                      gameIdArrays["pcSale"].push(itemId);
                                    }
                                  }
                                }
                            }
                        })
                    })

                    if (gameIdArrays["pcGames"].indexOf(data.Products[i].ProductId) !== -1) {
                      platpc = "true";
                    }

                    if (platpc === "false") {
                      if (data.Products[i].Properties.XboxConsoleGenCompatible === null) {
                        platxo = "true";
                        platxsx = "true";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible === undefined) {
                          platxo = "true";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible.length === 2) {
                          platxo = "true";
                          platxsx = "true";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible[0] === "ConsoleGen8" && data.Products[i].Properties.XboxConsoleGenCompatible.length === 1) {
                          platxo = "true";
                          platxsx = "false";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible[0] === "ConsoleGen9" && data.Products[i].Properties.XboxConsoleGenCompatible.length === 1) {
                          platxsx = "true";
                          platxo = "false";
                      }
                    } else if (platpc === "true" && gameIdArrays["allXbox"].indexOf(data.Products[i].ProductId) !== -1){
                      if (data.Products[i].Properties.XboxConsoleGenCompatible === null) {
                        platxo = "true";
                        platxsx = "true";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible === undefined) {
                          platxo = "true";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible.length === 2) {
                          platxo = "true";
                          platxsx = "true";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible[0] === "ConsoleGen8" && data.Products[i].Properties.XboxConsoleGenCompatible.length === 1) {
                          platxo = "true";
                          platxsx = "false";
                      } else if (data.Products[i].Properties.XboxConsoleGenCompatible[0] === "ConsoleGen9" && data.Products[i].Properties.XboxConsoleGenCompatible.length === 1) {
                          platxsx = "true";
                          platxo = "false";
                      }
                    } else {
                      platxo = "false";
                      platxsx = "false";
                    }
                    

                } else {
                    data.Products[i].DisplaySkuAvailabilities.forEach(function(sku) {
                        sku.Availabilities.forEach(function(av) {
                            if (av.Actions.indexOf("Purchase") !== -1 && av.Actions.indexOf("Browse") !== -1 && (av.OrderManagementData.Price.MSRP !== 0 || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && av.Actions.length > 2) {
                                listprice = av.OrderManagementData.Price.ListPrice;
                                msrpprice = av.OrderManagementData.Price.MSRP;
                                currencycode = av.OrderManagementData.Price.CurrencyCode;
                                if (gameIdArrays["pcGames"].indexOf(itemId) !== -1) {
                                  if (listprice < msrpprice) { 
                                    onsalepc = "true";
                                    if (gameIdArrays["pcSale"].indexOf(itemId) === -1) {
                                      gameIdArrays["pcSale"].push(itemId);
                                    }
                                  }
                                }
                                if (gameIdArrays["onsale"].indexOf(itemId) !== -1) {
                                    onsale = "true";
                                }
                            }
                        })
                    })
                }


                if (listprice === undefined) {
                    console.log("NOTE: BigID " + itemId + " has no price information.");
                    listprice = 100000000;
                    msrpprice = 100000000;
                    currencycode = "USD";
                }

                var thesystems = { "ar-ae": "PEGI", "ar-sa": "PEGI", "cs-cz": "PEGI", "da-dk": "PEGI", "de-at": "PEGI", "de-ch": "PEGI", "de-de": "USK", "el-gr": "PEGI", "en-au": "OFLC-AU", "en-ca": "ESRB", "en-gb": "PEGI", "en-hk": "Microsoft", "en-ie": "PEGI", "en-in": "Microsoft", "en-nz": "OFLC-NZ", "en-sg": "Microsoft", "en-us": "ESRB", "en-za": "PEGI", "es-ar": "Microsoft", "es-cl": "ESRB", "es-co": "ESRB", "es-es": "ESRB", "es-mx": "ESRB", "fi-fi": "PEGI", "fr-be": "PEGI", "fr-ca": "ESRB", "fr-ch": "PEGI", "fr-fr": "PEGI", "he-il": "PEGI", "hu-hu": "PEGI", "it-it": "PEGI", "ja-jp": "CERO", "ko-kr": "GRB", "nb-no": "PEGI", "nl-be": "PEGI", "nl-nl": "PEGI", "pl-pl": "DJCTQ", "pt-br": "DJCTQ", "pt-pt": "PEGI", "ru-ru": "RUSSIA", "sk-sk": "PEGI", "sv-se": "PEGI", "tr-tr": "PEGI", "zh-tw": "CSSR", "zh-hk": "Microsoft" };
                var rating = "none";
                var ratingcode = "";
                var ratingage = 99;
                var ratingsystem = "none";
                var kidfamilyratings = ["ESRB:T", "ESRB:E10", "ESRB:E", "PEGI:3", "PEGI:7", "PEGI:12", "COB-AU:G", "COB-AU:PG", "OFLC-NZ:G", "OFLC-NZ:PG", "OFLC-NZ:R13", "USK:Everyone", "USK:6", "USK:12",
                    "PCBP:0", "PCBP:6", "PCBP:12", "DJCTQ:L", "DJCTQ:10", "DJCTQ:12", "DJCTQ:14", "CSRR:G", "CSRR:PG12", "CSRR:PG15"
                ]
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

                      if (osgratings.displayData[ratingcode] !== undefined) {
                          var ratimage = osgratings.displayData[ratingcode]["unlisted"].logoUrl;
                      } else {
                          var ratimage = "https://compass-secure.xbox.com/assets/84/37/84377d06-b16a-4248-a1c1-adb2c8e705ca.png?n=image_small_40x40_blank.png";
                      }
                    if (ratingcode.indexOf(":RP") === -1) {
                        ratingage = osgratings["ageRatings"][ratingcode];
                    }
                    if (osgratings["displayData"][ratingcode] !== undefined && osgratings["displayData"][ratingcode][urlRegion] !== undefined) {
                        var osgregion = urlRegion;
                    } else {
                        var osgregion = "en-us";
                    }
                    if (osgratings["displayData"][ratingcode] !== undefined && osgratings["displayData"][ratingcode][osgregion] !== undefined) {
                        rating = osgratings["displayData"][ratingcode][osgregion].longName;
                    }
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
                    var itemhref = 'https://www.xbox.com/' + urlRegion + '/games/store/' + titleClickname + '/' + itemId;
                } else {
                    var itemhref = bigidUrls[itemId].split("<exc>")[0];
                    var splitHref = itemhref.split("/");
                    splitHref.splice(3, 0, urlRegion);
                    itemhref = splitHref.join("/");
                }

                var avgstars = 0;
                var ratingcount = 0;
                if (data.Products[i].MarketProperties[0].UsageData[0]) {
                    avgstars = data.Products[i].MarketProperties[0].UsageData[0].AverageRating;
                    ratingcount = data.Products[i].MarketProperties[0].UsageData[0].RatingCount;
                }

                // custom boxshots
                if (itemId === "9NBLGGH1Z6FQ") {
                    itemBoxshot = "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
                    itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
                }
                if (itemId === "BZFK7WNK7R4M") {
                    itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
                    itemBoxshotSmall = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
                }
                if (itemId === "C2320MJQP0MS") {
                    itemBoxshot = "https://compass-ssl.xbox.com/assets/34/5f/345f7fde-2407-475a-9a16-5fac1ad986ab.jpg?n=DwG_Boxshot-digital-X1_Plants-Vs-Zombies-Deluxe_584x800.jpg";
                    itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/34/5f/345f7fde-2407-475a-9a16-5fac1ad986ab.jpg?n=DwG_Boxshot-digital-X1_Plants-Vs-Zombies-Deluxe_584x800.jpg";
                }

                // genres
                if (data.Products[i].Properties.Categories !== undefined && data.Products[i].Properties.Categories !== null) {
                    var gamegenres = data.Products[i].Properties.Categories.join(", ").toLowerCase();
                } else if (data.Products[i].Properties.Category !== undefined && data.Products[i].Properties.Category !== null) {
                    var gamegenres = data.Products[i].Properties.Category.toLowerCase();
                } else {
                    var gamegenres = "unlisted";
                }

                allGames[itemId] = {
                    releasedate: releaseDate,
                    msproduct: msproduct,
                    multiplayer: multiplayer,
                    coop: coop,
                    rating: rating,
                    ratimage: ratimage,
                    ratingage: ratingage,
                    ratingsystem: ratingsystem,
                    gameurl: itemhref,
                    titleclickname: titleClickname,
                    boxshot: itemBoxshot,
                    boxshotsmall: itemBoxshotSmall,
                    title: itemTitle,
                    msrpprice: msrpprice,
                    listprice: listprice,
                    currencycode: currencycode,
                    onsale: onsale,
                    onsalepc: onsalepc,
                    upcoming: "false",
                    newrelease: "false",
                    physical: phys,
                    genres: gamegenres,
                    screenshot: itemScreenshot,
                    descriptors: rawdescriptors,
                    stars: avgstars,
                    starcount: ratingcount,
                    screenarray: ssarray,
                    superheroart: superheroart,
                    description: shortdesc,
                    gameswithgold: gwg,
                    golddiscount: golddiscount,
                    goldandsilversale: goldandsilversale,
                    goldandsilversalegoldprice: goldandsilversalegoldprice,
                    specialprice: specialprice,
                    eaaccessgame: eaaccessgame,
                    gamepassgame: gamepassgame,
                    eaplaygame: eaplaygame,
                    purchasable: purchasable,
                    platformxbox: platxbox,
                    platformpc: platpc,
                    platformxo: platxo,
                    platformxsx: platxsx,
                    searchterms: searchterms, 
                    gamepassprice: gamepassprice, 
                    eaplayprice: eaplayprice
                };

                //make API-provided lists  
                if (allGamesExcludes.indexOf(itemId) === -1) {
                    if (msproduct === true) {
                        gameIdArrays["exclusives"].push(itemId);
                    }
                    if (multiplayer === "true") {
                        gameIdArrays["multiplayer"].push(itemId);
                    }
                    var reldate = new Date(releaseDate);
                    // if (reldate > nowdate && itemId !== "9NBLGGH51QT4") {
                    //   gameIdArrays["upcoming"].push(itemId);
                    //   allGames[itemId]["upcoming"] = "true";
                    // }
                    if (gameIdArrays["upcoming"].indexOf(itemId) !== -1) {
                        allGames[itemId]["upcoming"] = "true";
                    }
                    // if (gameIdArrays["newreleases"].indexOf(itemId) !== -1) {
                    //   allGames[itemId]["newrelease"] = "true";
                    // }
                    if (reldate < nowdate && monthsagofilterdate < reldate) { // only show as new release based on release date, not list
                        allGames[itemId]["newrelease"] = "true";
                    }
                    if (new Date(allGames[itemId]["releasedate"]).getFullYear() > 2025) {
                        allGames[itemId]["releasedate"] = 0;
                    }
                }

                popcounter++;

                //console.log("itemId:" + itemId + "  " + i + ":" + (productQuantity -1) + "   " + popcounter + ":" + (fullGameArray.length) + "  locagamesremoved:" + locgamesremoved + "   " + count + ":" + chunktotal)
                //console.log("i: " + i + " and product quantity: " + productQuantity + " and count: " + count + " and chunktotal: " + chunktotal)
                if ((i === (productQuantity - 1)) && count === chunktotal - 1) {
                    var activecheck = setInterval(function() {
                        var activeAjax = $.active;
                        if (activeAjax === 0) {
                            ajaxdone();
                            clearInterval(activecheck);
                        }
                    }, 500);


                    function ajaxdone() {

                        // Banners for Filters
                        regionStrings = allBannerStrings.locales[urlRegion];

                        var optimizedImage = regionStrings["keyOptimizedbannerimg"];
                        var cloudImage = regionStrings["keyCloudbannerimg"];
                        var smartDeliveryImage = regionStrings["keySmartdeliverybannerimg"];

                        $(".gameDivsWrapper").append('<div class="theme-light specialBanner smartDelivery" style="display: none;">' +
                            '<div data-grid="col-12 stack-2" class="theme-light">' +
                            '<div data-grid="col-2">' +
                            '<img class="" src="' + smartDeliveryImage + '" alt="">' +
                            '</div>' +
                            '<div data-grid="col-10">' +
                            '<h3 class="c-heading-4 zpt"></h3>' +
                            '<p class="c-paragraph"></p>' +
                            '<a href="" class="c-call-to-action c-glyph f-lightweight" data-cta="learn" aria-label="">' +
                            '<span></span>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>')

                        $(".smartDelivery h3").html(regionStrings["keySmartdeliverybannerheadline"]);
                        $(".smartDelivery p").html(regionStrings["keySmartdeliverybannerparagraph"]);
                        $(".smartDelivery a span").text(regionStrings["keySmartdeliverybannercta"]);
                        $(".smartDelivery a").attr("href", regionStrings["keySmartdeliverybannerurl"]);
                        $(".smartDelivery a").attr("aria-label", regionStrings["keySmartdeliverybanneraria"]);
                        $(".smartDelivery img").attr("alt", regionStrings["keySmartdeliverybannerimgalt"]);


                        var cloudstrings = cloudLocStrings.locales[urlRegion];

                        $(".gameDivsWrapper").append('<div class="theme-light specialBanner cloudEnabled" style="display: none;">' +
                            '<div data-grid="col-12 stack-2" class="theme-light">' +
                            '<div data-grid="col-2">' +
                            '<img class="" src="' + cloudImage + '" alt="">' +
                            '</div>' +
                            '<div data-grid="col-10">' +
                            '<h3 class="c-heading-4 zpt">Cloud-gaming (Beta) with Xbox Game Pass Ultimate</h3>' +
                            '<p class="c-paragraph">Play games with your Android mobile phone or tablet from the cloud with Xbox Game Pass Ultimate</p>' +
                            '<a href="" class="c-call-to-action c-glyph f-lightweight" aria-label="">' +
                            '<span></span>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>')

                        $(".cloudEnabled h3").html(cloudstrings["keyCloudbannerheadline"]);
                        $(".cloudEnabled p").html(cloudstrings["keyCloudbannerparagraph"]);
                        $(".cloudEnabled a span").text(regionStrings["keyCloudbannercta"]);
                        $(".cloudEnabled a").attr("href", regionStrings["keyCloudbannerurl"]);
                        $(".cloudEnabled a").attr("aria-label", regionStrings["keyCloudbanneraria"]);
                        $(".cloudEnabled img").attr("alt", regionStrings["keyCloudbannerimgalt"]);

                        $(".gameDivsWrapper").append('<div class="theme-light specialBanner optimizedGames" style="display: none;">' +
                            '<div data-grid="col-12 stack-2" class="theme-light">' +
                            '<div data-grid="col-2">' +
                            '<img class="" src="' + optimizedImage + '" alt="">' +
                            '</div>' +
                            '<div data-grid="col-10">' +
                            '<h3 class="c-heading-4 zpt">Optimized for Xbox Series X|S</h3>' +
                            '<p class="c-paragraph">Games that are optimized for Xbox Series X|S will showcase unparalleled load-times, heightened visuals, and steadier framerates at up to 120FPS.</p>' +
                            '<a href="" class="c-call-to-action c-glyph f-lightweight" aria-label="">' +
                            '<span></span>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>')

                        $(".optimizedGames h3").html(regionStrings["keyCloudbannerheadline"]);
                        $(".optimizedGames p").html(regionStrings["keyOptimizedbannerparagraph"]);
                        $(".optimizedGames a span").text(regionStrings["keyOptimizedbannercta"]);
                        $(".optimizedGames a").attr("href", regionStrings["keyOptimizedbannerurl"]);
                        $(".optimizedGames a").attr("aria-label", regionStrings["keyArialabel1"]);
                        $(".optimizedGames img").attr("alt", regionStrings["keyOptimizedbannerimgalt"]);




                        for (var r = 0; r < allGamesExcludes.length; r++) {
                            delete allGames[allGamesExcludes[r]];
                        }
                        // $(".gameDiv").last().after('<script type="text/javascript" src="/en-US/global-shares/templates/MWF/JS/MWF-Aria-Boxshots-loc.js"></s' + 'cript>');
                        //$(".gameDivsWrapper").append(gamehtml);
                        var x1RegionPop = (function() {
                            $(".gameDiv a.gameDivLink").each(function() {
                                var rawHref = $(this).attr("href")
                                var splitHref = rawHref.split("/")
                                splitHref.splice(3, 0, urlRegion)
                                var newHref = splitHref.join("/")
                                $(this).attr("href", newHref)
                            })
                        })();

                        $("a[data-sorting='release']").eq(2).remove()
                            //$(".generalSort li a").eq(0).attr("aria-checked", "true");
                        var durl = document.URL.toLowerCase();
                        if (durl.indexOf("enhanced") !== -1) {
                            beginningState("enhanced");
                            listGames(gameIdArrays["enhanced"], "avail-download", "featured");
                            filtersort();
                            // } else if (durl.indexOf("exclusives") !== -1) {
                            //   beginningState("exclusives");
                            //   listGames(gameIdArrays["exclusives"], "avail-download", "release");
                            //   filtersort();
                            // } else if (durl.indexOf("editorschoice") !== -1) {
                            //   beginningState("editors");
                            //   listGames(gameIdArrays["editors"], "avail-download", "featured");
                            //   filtersort();
                        } else if (durl.indexOf("newreleases") !== -1) {
                            beginningState("newreleases");
                            listGames(gameIdArrays["newreleases"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("onsale") !== -1) {
                            beginningState("onsale");
                            listGames(gameIdArrays["onsale"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("freetoplay") !== -1) {
                            beginningState("freetoplay");
                            listGames(gameIdArrays["topfree"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("upcoming") !== -1) {
                            beginningState("upcoming");
                            listGames(gameIdArrays["upcoming"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("mostplayed") !== -1) {
                            beginningState("mostplayed");
                            listGames(gameIdArrays["mostplayed"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("pcgames") !== -1) {
                            beginningState("pcGames", "pc");
                            listGames(gameIdArrays["pcGames"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("popularpc") !== -1) {
                            beginningState("popularPC", "pc");
                            listGames(gameIdArrays["popularPC"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("bethesdapc") !== -1) {
                            beginningState("bethesdaPC", "pc");
                            listGames(gameIdArrays["bethesdaPC"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("eaplaypc") !== -1) {
                            beginningState("eaplayPC", "pc");
                            listGames("eaplayPC", "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("pcsale") !== -1) {
                            beginningState("pcSale", "pc");
                            listGames(gameIdArrays["pcSale"], "avail-download", "featured");
                            filtersort();
                        } else {
                            beginningState("all");
                            listGames(gameIdArrays["allXbox"], "avail-download", "featured", "nochange");
                            filtersort();
                            var genmap = {
                                "actionadventure": "genre-action & adventure",
                                "fighting": "genre-fighting",
                                "indie": "genre-indie",
                                "familykids": "genre-family & kids",
                                "racingflying": "genre-racing & flying",
                                "roleplaying": "genre-role playing",
                                "shooter": "genre-shooter",
                                "sports": "genre-sports",
                                "strategy": "genre-strategy"
                            };
                            var gmarray = Object.keys(genmap);
                            for (var g = 0; g < gmarray.length; g++) {
                                if (durl.indexOf(gmarray[g]) !== -1) {
                                    $("#filter-genre button").click();
                                    var gentoclick = genmap[gmarray[g]];
                                    $("#genreSelect a[data-cat='" + gentoclick + "']")[0].click();
                                    entrycat = true;
                                }
                            }
                            var featmap = { "multiplayer": "feature-multiplayer", "onlinecoop": "feature-coop" };
                            var featarray = Object.keys(featmap);
                            for (var g = 0; g < featarray.length; g++) {
                                if (durl.indexOf(featarray[g]) !== -1) {
                                    $("#filter-features button").click();
                                    var feattoclick = featmap[featarray[g]];
                                    $("#featureSelect a[data-cat='" + feattoclick + "']")[0].click();
                                    entrycat = true;
                                }
                            }
                        }

                        function beginningState(collection, platform) {
                          if (platform === "pc") {
                            $(".platxb").removeClass("platselected");
                            $(".platpc").addClass("platselected");
                            $(".collections-xbox").addClass("hidden");
                            $(".collections-pc").removeClass("hidden");
                            $(".platformselection").attr("data-platselected", "pc");
                          }
                          $(".coloption").removeClass("col-selected");
                          $(".coloption[data-col='" + collection + "']").addClass("col-selected");
                          var colTitle = $(".col-selected span").text();
                          $(".catalogTitle").text(colTitle);
                          $(".gamesFilters .c-refine-item").each(function() {
                              if ($(this).hasClass("f-selected")) {
                                  var seltext = $(this).find("span").text();
                                  var selcat = $(this).attr("data-cat");
                                  $(".filterSelections").append('<li class="c-choice-summary" data-catselected="' + selcat + '">' +
                                      '<a class="c-action-trigger c-glyph glyph-cancel" href="#" aria-label="' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", seltext) + '">' +
                                      '<span class="x-screen-reader">' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", seltext) + '</span>' +
                                      '</a>' +
                                      '<span>' + seltext + '</span></li>')
                              }
                          })
                          $(".gamesCollections").attr("data-colselected", collection);
                        }
                    }
                }
            }
        }
    }


    function listGames(cat, filt, sort, changeurl) {
        function changeurlbar(thecategory) {
            if (changeurl !== "nochange") {
                var currenturl = window.location.href;
                var newurl = window.location.origin + "/" + urlRegion + "/games/all-games?cat=" + thecategory;
                window.history.replaceState(currenturl, "Xbox One Games Catalog", newurl);
            }
        }
        setTimeout(function() {
            $(".enhancedlink").addClass("hide");
            $(".looklogo").addClass("hide");
            $(".eappcBanner").addClass("hide");
            if (cat === "all") {
                cat = gameIdArrays["allXbox"];
                if (entrycat === false) {
                    changeurlbar("all");
                }
            } else if (cat === "exclusives") {
                cat = gameIdArrays["exclusives"];
                changeurlbar("exclusives");
            } else if (cat === "kidsfamily") {
                cat = gameIdArrays["kidsfamily"];
                changeurlbar("kidsfamily");
            } else if (cat === "newreleases") {
                cat = gameIdArrays["newreleases"];
                changeurlbar("newreleases");
            } else if (cat === "fourk") {
                cat = gameIdArrays["fourk"];
                changeurlbar("fourk");
            } else if (cat === "hdr") {
                cat = gameIdArrays["HDRGaming"];
                changeurlbar("hdr");
            } else if (cat === "enhanced") {
                cat = gameIdArrays["enhanced"];
                $(".enhancedlink").removeClass("hide");
                $(".looklogo").removeClass("hide");
                changeurlbar("enhanced");
            } else if (cat === "xpa") {
                cat = gameIdArrays["xpa"];
                changeurlbar("xpa");
            } else if (cat === "multiplayer") {
                cat = gameIdArrays["multiplayer"];
                changeurlbar("multiplayer");
            } else if (cat === "freetoplay") {
                cat = gameIdArrays["topfree"];
                changeurlbar("freetoplay");
            } else if (cat === "upcoming") {
                cat = gameIdArrays["upcoming"];
                changeurlbar("upcoming");
            } else if (cat === "mostplayed") {
                cat = gameIdArrays["mostplayed"];
                changeurlbar("mostplayed");
            } else if (cat === "cloud") {
                cat = gameIdArrays["cloud"];
                changeurlbar("cloud");
            } else if (cat === "cross") {
                cat = gameIdArrays["cross"];
                changeurlbar("cross");
            } else if (cat === "genNine") {
                cat = gameIdArrays["genNine"];
                changeurlbar("genNine");
            } else if (cat === "onsale") {
                cat = gameIdArrays["onsale"];
                changeurlbar("onsale");
            } else if (cat === "pcGames") {
                cat = gameIdArrays["pcGames"];
                changeurlbar("pcgames");
            } else if (cat === "popularPC") {
                cat = gameIdArrays["popularPC"];
                changeurlbar("popularpc");
            } else if (cat === "bethesdaPC") {
                cat = gameIdArrays["bethesdaPC"];
                changeurlbar("bethesdapc");
            } else if (cat === "eaplayPC") {
                cat = gameIdArrays["eaplayPC"];
                $(".eappcBanner").removeClass("hide");
                changeurlbar("eaplaypc");
            } else if (cat === "pcSale") {
                cat = gameIdArrays["pcSale"];
                changeurlbar("pcsale");
            } else if (cat === "search") {
                cat = searchArray;
            }

            $(".nogamesfound").hide();

            // filters
            selectedGames = cat;
            //remove based on ratings
            prunedGames = [];
            var ratarrlen = selectedGames.length;
            // if (filt !== "all") {
            //   for (var i = 0; i < ratarrlen; i++) {
            //     if (allGames[selectedGames[i]]["rating"] === filt) {
            //       prunedGames.push(selectedGames[i]);
            //     }
            //   }
            // } else {
            //prunedGames = selectedGames;
            //}

            var filterarray = filt.split(",");
            if (filterarray.indexOf("avail-download") === -1) { // when there are no other availabilities
                filterarray.push("avail-download");
            }

            if (filterarray.length > 1) {
                for (var i = 0; i < ratarrlen; i++) {
                    var availset, platset, genreset, featureset, ratingset;
                    availset = platset = genreset = featureset = ratingset = 0;
                    var filtsettotal;

                    // avail filter
                    if (filterarray.indexOf("avail-download") !== -1 && allGames[selectedGames[i]]["physical"] === "false") {
                        availset = 1;
                    } else if (filterarray.indexOf("avail-physical") !== -1 && allGames[selectedGames[i]]["physical"] === "true") {
                        availset = 1;
                    } else {
                        availset = 0;
                    }

                    // plat filter
                    if (filt.indexOf("plat-") !== -1) {
                        if (filt.indexOf("plat-xsx") !== -1 && allGames[selectedGames[i]]["platformxsx"] === "true") {
                            platset = 1;
                        } else if (filt.indexOf("plat-xo") !== -1 && allGames[selectedGames[i]]["platformxo"] === "true") {
                            platset = 1;
                        }
                    } else {
                        platset = 1;
                    }

                    // genre filter
                    if (filt.indexOf("genre-") !== -1) {
                        if (filt.indexOf("genre-indie") !== -1) {
                            for (var h = 0; h < gameIdArrays["indie"].length; h++) {
                                if (selectedGames[i] === gameIdArrays["indie"][h]) {
                                    genreset = 1;
                                    break;
                                }
                            }
                        }
                        var genfilters = [];
                        filterarray.forEach(function(fa) {
                            if (fa.indexOf("genre-") !== -1) {
                                fa = fa.replace("genre-", "");
                                genfilters.push(fa);
                            }
                        })
                        genfilters.forEach(function(gf) {
                            if (allGames[selectedGames[i]]["genres"].indexOf(gf) !== -1) {
                                genreset = 1;
                            }
                        })
                    } else {
                        genreset = 1;
                    }

                    // feature filter
                    if (filt.indexOf("feature-") !== -1) {
                        var allfeats = []
                        filterarray.forEach(function(fa) {
                            if (fa.indexOf("feature-") !== -1) {
                                allfeats.push(fa);
                            }
                        })
                        var featcount = 0;
                        for (var f = 0; f < allfeats.length; f++) {
                            if (allfeats[f] === "feature-4k") {
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["fourk"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-hdr") {
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["HDRGaming"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-singleplayer") {
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["singleplayer"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-multiplayer") {
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["multionline"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-multiplayerlocal") {
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["multilocal"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-coop") {
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["cooponline"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-cloudenabled") {
                                $(".cloudEnabled").show();
                                $(".smartDelivery").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["cloud"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-smartdelivery") {
                                $(".smartDelivery").show();
                                $(".cloudEnabled").hide();
                                $(".optimizedGames").hide();
                                if (gameIdArrays["cross"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-genNine") {
                                $(".optimizedGames").show();
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                if (gameIdArrays["genNine"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-cooplocal") {
                                $(".optimizedGames").hide();
                                $(".smartDelivery").hide();
                                $(".cloudEnabled").hide();
                                if (gameIdArrays["cooplocal"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            }
                        }
                        if (featcount === allfeats.length) { featureset = 1 }
                    } else {
                        featureset = 1;
                    }

                    // rating filter
                    if (filt.indexOf("rating-") !== -1) {
                        var allrats = []
                        filterarray.forEach(function(fa) {
                            if (fa.indexOf("rating-") !== -1) {
                                allrats.push(fa.replace("rating-", ""));
                            }
                        })
                        for (var f = 0; f < allrats.length; f++) {
                            if (allGames[selectedGames[i]]["rating"] === allrats[f]) {
                                ratingset = 1;
                            }
                        }
                    } else {
                        ratingset = 1;
                    }

                    filtsettotal = availset + platset + genreset + featureset + ratingset;
                    if (filtsettotal === 5) { // game passes all 5 filters
                        prunedGames.push(selectedGames[i]);
                    }
                }
            } else {
                if (filterarray.indexOf("avail-download") !== -1) {
                    for (var p = 0; p < ratarrlen; p++) {
                        if (allGamesExcludes.indexOf(selectedGames[p]) === -1 && allGames[selectedGames[p]] && allGames[selectedGames[p]]["physical"] === "false") {
                            prunedGames.push(selectedGames[p]);
                        }
                    }
                } else if (filterarray.indexOf("avail-physical") !== -1) {
                    for (var p = 0; p < ratarrlen; p++) {
                        if (allGames[selectedGames[p]]["physical"] === "true") {
                            prunedGames.push(selectedGames[p]);
                        }
                    }
                }
            }

            //sort based on sort
            if (sort === "featured") {
                if (cat === gameIdArrays["mostplayed"]) {
                    prunedGames = prunedGames.sort(asc_sort);

                    function asc_sort(a, b) {
                        return (gameIdArrays["mostplayed"].indexOf(b) < gameIdArrays["mostplayed"].indexOf(a)) ? 1 : -1;
                    }
                } else {
                    prunedGames = prunedGames.sort(asc_sort);

                    function asc_sort(a, b) {
                        return (fullGameArray.indexOf(b) < fullGameArray.indexOf(a)) ? 1 : -1;
                    }
                }
            } else if (sort === "release") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (new Date(allGames[a]["releasedate"])) < (new Date(allGames[b]["releasedate"])) ? 1 : -1;
                }
            } else if (sort === "az") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (allGames[b]["title"].toLowerCase().trim().replace("ō", "o").replace("®", "").replace("é", "e")) < (allGames[a]["title"].toLowerCase().trim().replace("ō", "o").replace("®", "").replace("é", "e")) ? 1 : -1;
                }
            } else if (sort === "za") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (allGames[a]["title"].toLowerCase().trim().replace("ō", "o").replace("®", "").replace("é", "e")) < (allGames[b]["title"].toLowerCase().trim().replace("ō", "o").replace("®", "").replace("é", "e")) ? 1 : -1;
                }
            }

            paginateSetup(prunedGames);

            //filtersort();
            $(".c-progress.f-indeterminate-local.f-progress-large").hide();
            $(".gameDivsWrapper").removeClass("gdSorting");
            if ($(".gameDiv").length === 0) {
                $(".nogamesfound").show();
                $(".resultsText").hide();
            }

            var platview = $(".platformselection").attr("data-platselected");
            if (platview === "pc") {
              $(".filtConsoleOnly").hide();
              $(".winPC").show();
              $(".spBanner").hide();
            } else {
              $(".filtConsoleOnly").show();
              $(".winPC").hide();
              $(".spBanner").show();
            }
        }, 10);
    }



    gamesperpage = 50;
    $(document).on("click", ".paginateDropdown li", function(e) {
        e.preventDefault();
        //var newmax = parseInt($(this).attr("data-gamesmax"));
        var newmax = parseInt($(".paginateDropdown button").text())
            //$(".pagcontroltitle").text(newmax);
        gamesperpage = newmax;
        paginateSetup(prunedGames);
        paginateclick = 0;
        // var btttop = $(".spinnerHold").offset().top;
        // $("HTML, BODY").animate({
        //     scrollTop: btttop
        // }, 500);
        $(".CatAnnounce").text("games per page now " + newmax);
    });

    // pagination accessibility
    $(".m-pagination").wrap('<nav aria-label="Pagination for game catalog"></nav>');

    function paginateSetup(array) {
        $(".paginateprevious").removeClass("pag-disabled");
        $(".paginatenext").removeClass("pag-disabled");
        $(document).off("keypress", ".paginateprevious a");
        $(document).off("keypress", ".paginatenext a");
        $(document).off("keypress", ".paginateprevious a");
        $(".paginatenext a").attr("tabindex", "0");
        $(".paginateprevious a").attr("tabindex", "0");
        $(".paginatenum a").attr("tabindex", "0");
        var gamenum = array.length;
        // gamesperpage = gamesperpage || 50;
        var gamesperpage = parseInt($(".paginateDropdown button").text()) || 50;
        var pagenum = Math.ceil(gamenum / gamesperpage);
        if (pagenum < 2) {
            $(".m-pagination-group").hide();
            $(".resultsText").text(regionContent["keyAllresults"].replace("<NUMBER>", gamenum));
            $(".resultsText").show();
            $(".gameDivsWrapper").removeAttr("style");
        } else {
            $(".paginatenum").remove();
            for (var i = 1; i <= pagenum; i++) {
                $(".paginatenext").before('<li data-label="' + regionContent.keyCurrentlyon + ' ' + i + '" class="paginatenum" data-topage="' + i +
                    '"><a href="#" aria-label="' + regionContent.keyPage + ' ' + i + '">' + i + '</a></li>')
            }
            $(".paginatenum").eq(0).closest("li").addClass("f-active");
            $(".m-pagination-group").show();
        }
        paginate(array, 0);
        //ratings pop
        var systems = {};
        var currentgameslength = selectedGames.length;
        for (var i = 0; i < currentgameslength; i++) {
            if (allGames[selectedGames[i]]) {
                var rs = allGames[selectedGames[i]]["ratingsystem"];
                if (!systems[rs]) {
                    systems[rs] = 1
                } else {
                    systems[rs]++
                }
            }
        }
        var bigsystemnum = 0;
        var bigsystem;
        for (var g = 0; g < Object.keys(systems).length; g++) {
            if (systems[Object.keys(systems)[g]] > bigsystemnum) {
                bigsystemnum = systems[Object.keys(systems)[g]]
                bigsystem = Object.keys(systems)[g].toString();
            }
        }

        // $("#ratingSelect li.dynRatingItem").remove(); // to dynamically populate ratings, but MWF can't handle 
        if (pageloadfocus < 2) {
          for (var i = 0; i < fullGameArray.length; i++) {
              if (allGames[fullGameArray[i]]) {
                  if (allGames[fullGameArray[i]]["ratingsystem"] !== bigsystem) {
                      allGames[fullGameArray[i]]["rating"] = "none";
                  } else {
                      var gamerating = "rating-" + allGames[fullGameArray[i]]["rating"];
                      if ($(".ratingchoice[data-cat='" + gamerating + "']").length === 0 && allGames[fullGameArray[i]]["rating"] !== "none") {
                          $("#ratingSelect").append('<li class="dynRatingItem" data-ratingage="' + allGames[fullGameArray[i]]["ratingage"] + '">' +
                              '<a class="c-refine-item ratingchoice" href="#" tabindex="0" aria-label="Refine by ' + allGames[fullGameArray[i]]["rating"] + ' games" data-cat="' + gamerating + '">' +
                              '<span aria-hidden="true">' + allGames[fullGameArray[i]]["rating"] + '</span>' +
                              '</a></li>');
                      }
                  }
              }
              if (i === currentgameslength - 1) {
                  setTimeout(function() {
                      var $alphadivs = $(".dynRatingItem");
                      var alphaRat = $alphadivs.sort(function(a, b) {
                          return $(a).data("ratingage") > $(b).data("ratingage") ? 1 : -1;
                      });
                      $("#ratingSelect").html(alphaRat);

                      if (pageloadfocus === 1) {
                          var durl = document.URL.toLowerCase();
                              if (durl.indexOf("maturityrating") !== -1) {
                                  $("#filter-ratings button").click();
                                      var rating = $("#filter-ratings").offset().top;
                                      $("HTML, BODY").animate({
                                          scrollTop: rating
                                      }, 300);
                          }
                      }
                  }, 250)
              }
          }
        }

        $(".m-pagination li").first().css("display", "inline-block").addClass("paginateprevious");
        $(".paginateprevious").addClass("pag-disabled");

        // paginate handling
        function totop() {
            var searchtop = $(".searchgroup").offset().top;
            $("HTML, BODY").animate({
                scrollTop: searchtop
            }, 300);
        }
        $(".paginatenum a").on("click", function(e) {
            paginateclick = 1;
            e.preventDefault();
            e.stopPropagation();
            var wrapheight = $(".gameDivsWrapper").height();
            //$(".gameDivsWrapper").css("min-height", wrapheight + "px");
            $(".gameDivsWrapper").css("min-height", "32vw");
            var gotopage = parseInt($(this).closest("li").attr("data-topage")) - 1;
            var lastpage = parseInt($(".paginatenum").last().attr("data-topage")) - 1;
            if ($(this).closest("li").hasClass("f-active")) {
                return false;
            }
            $(".paginatenum").closest("li").removeClass("f-active");
            $(this).closest("li").addClass("f-active");
            if (gotopage === 0) {
                $(".paginateprevious").addClass("pag-disabled");
                $(".paginatenext").removeClass("pag-disabled");
            } else if (gotopage === lastpage) {
                $(".paginatenext").addClass("pag-disabled");
                $(".paginateprevious").removeClass("pag-disabled");
            } else {
                $(".paginateprevious").removeClass("pag-disabled");
                $(".paginatenext").removeClass("pag-disabled");
            }
            totop();
            paginate(prunedGames, gotopage)
        })
        $(".paginateprevious").off("click");
        $(".paginateprevious").on("click", function(e) {
            paginateclick = 1;
            e.preventDefault();
            e.stopPropagation();
            var wrapheight = $(".gameDivsWrapper").height();
            //$(".gameDivsWrapper").css("min-height", wrapheight + "px");
            $(".gameDivsWrapper").css("min-height", "32vw");
            var currentpage = parseInt($(".paginatenum.f-active").attr("data-topage")) - 1;
            var gotopage = currentpage - 1;
            $(".paginatenum.f-active").prev(".paginatenum").addClass("f-active");
            $(".paginatenum.f-active").last().removeClass("f-active");
            if (gotopage === 0) {
                $(".paginateprevious").addClass("pag-disabled");
                $(".paginatenext").removeClass("pag-disabled");
            } else {
                $(".paginateprevious").removeClass("pag-disabled");
                $(".paginatenext").removeClass("pag-disabled");
            }
            totop();
            paginate(prunedGames, gotopage)
        })
        $(".paginatenext").off("click");
        $(".paginatenext").on("click", function(e) {
            paginateclick = 1;
            e.preventDefault();
            e.stopPropagation();
            var wrapheight = $(".gameDivsWrapper").height();
            //$(".gameDivsWrapper").css("min-height", wrapheight + "px");
            $(".gameDivsWrapper").css("min-height", "32vw");
            var currentpage = parseInt($(".paginatenum.f-active").attr("data-topage")) - 1;
            var gotopage = currentpage + 1;
            var lastpage = parseInt($(".paginatenum").last().attr("data-topage")) - 1;
            $(".paginatenum.f-active").next(".paginatenum").addClass("f-active");
            $(".paginatenum.f-active").first().removeClass("f-active");
            if (gotopage === lastpage) {
                $(".paginatenext").addClass("pag-disabled");
                $(".paginateprevious").removeClass("pag-disabled");
            } else {
                $(".paginatenext").removeClass("pag-disabled");
                $(".paginateprevious").removeClass("pag-disabled");
            }
            totop();
            paginate(prunedGames, gotopage)
        })
        $(".pag-disabled a").attr("tabindex", "-1");
        $(".paginatenum.f-active a").attr("tabindex", "-1");





        $(document).on("keypress", ".paginatenum a", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                $(this).click();
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
            }
        })
        $(document).on("keypress", ".paginatenext a", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                $(this).click();
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
            }
        })
        $(document).on("keypress", ".paginateprevious a", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                $(this).click();
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
            }
        })
        $(document).on("keydown", ".c-select-menu li", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                $(this).click();
            }
        })
        $(document).on("keydown", ".c-drawer button", function(event) {
            if (event.keyCode == 27 && $(this).attr("aria-expanded") === "true") {
                $(this).click();
            }
        })
        $(document).on("keydown", ".c-drawer .c-refine-item", function(event) {
            if (event.keyCode == 27 && $(this).closest(".c-drawer").find("button").attr("aria-expanded") === "true") {
                $(this).closest(".c-drawer").find("button").click();
                $(this).closest(".c-drawer").find("button").focus();
            }
        })

    }

    function paginate(array, page) {
        docwidth = $(document).width();
        var currregion;
        var startgame = page * gamesperpage;
        shownGames = array.slice(startgame, startgame + gamesperpage);
        $(".gameDivsWrapper .gameDiv").remove();
        gamehtml = '';
        var catarrlen = shownGames.length;
        if (array.length > gamesperpage) {
            var firstnum = (page * gamesperpage) + 1;
            var secnum = firstnum + gamesperpage - 1;
            if (secnum > array.length) { secnum = array.length }
            var viewing = firstnum + "-" + secnum;
            $(".resultsText").text(regionContent["keySomeresults"].replace("<NUMBER1>", viewing).replace("<NUMBER2>", array.length));
            $(".resultsText").show();
        }
        for (var i = 0; i < catarrlen; i++) {
            var thebigid = shownGames[i];
            if (urlRegion !== "ar-sa" && urlRegion !== "ar-ae") {
                var msrpshown = allGames[thebigid]["msrpprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                var listshown = allGames[thebigid]["listprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
            } else {
                if (urlRegion === "ar-sa") {
                    currregion = "en-us";
                } else {
                    currregion = "en-ca";
                }
                var msrpshown = allGames[thebigid]["msrpprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                var listshown = allGames[thebigid]["listprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
            }

            if (allGames[thebigid]["listprice"] !== 100000000) {
                if (allGames[thebigid]["msrpprice"] !== allGames[thebigid]["listprice"] && allGames[thebigid]["gameswithgold"] === "false") {
                    var priceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                        //'<s aria-label="' + regionContent["keyFullprice"].replace("<PLACEHOLDER>", msrpshown) + '">' + msrpshown + '</s>' +
                        '<s><span class="x-screen-reader">' + regionContent["keyFullprice"] + '</span> ' + msrpshown + '</s>' +
                        '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
                        '<span class="x-screen-reader">' + regionContent["keyNewprice"] + '</span>' + '<span class="textpricenew x-hidden-focus" itemprop="price">' + listshown + '</span>' +
                        '</div>';
                } else {
                    var priceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                        '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
                        '<span class="textpricenew x-hidden-focus" itemprop="price">' + msrpshown + '</span>' +
                        '</div>';
                }
            } else {
                var priceshown = "";
            }

            var pricestartingat = "";
            if (gameIdArrays["startingat"].indexOf(thebigid) !== -1) {
                pricestartingat = '<div class="startingattext">' + regionContent["keyStartingat"] + '</div>';
            }

            badges = '';
            if (allGames[thebigid]["gameswithgold"] === "true") {
                badges += '<span class="c-badge f-small f-highlight">' + regionContent["keyBadgegwg"] + '</span>'
            } else if (allGames[thebigid]["onsale"] === "true" || allGames[thebigid]["onsalepc"] === "true" ) {
                badges += '<span class="c-badge f-small f-highlight">' + regionContent["keyBadgeonsale"] + '</span>'
            }
            if (allGames[thebigid]["newrelease"] === "true") {
                badges += '<span class="c-badge f-small badge-silver">' + regionContent["keyBadgenewrelease"] + '</span>'
            }
            if (allGames[thebigid]["upcoming"] === "true" && allGames[thebigid]["purchasable"] === "false") {
                badges += '<span class="c-badge f-small badge-silver">' + regionContent["keyBadgecomingsoon"] + '</span>'
            }
            if (allGames[thebigid]["title"].toLowerCase().indexOf("preview") !== -1 || (allGames[thebigid]["description"] !== null && allGames[thebigid]["description"].toLowerCase().indexOf("game preview") !== -1) ||
                (allGames[thebigid]["description"] !== null && allGames[thebigid]["description"].toLowerCase().indexOf("gamepreview") !== -1)) {
                badges += ''
            } else if (allGames[thebigid]["upcoming"] === "true" && allGames[thebigid]["purchasable"] === "true" && allGames[thebigid]["title"].toLowerCase().indexOf("game preview") === -1) {
                badges += '<span class="c-badge f-small badge-silver">' + regionContent["keyBadgepreorder"] + '</span>'
            }

            if (docwidth < 768) {
                var theboxshot = allGames[thebigid]["boxshotsmall"]
            } else {
                var theboxshot = allGames[thebigid]["boxshot"]
            }

            var disprelease = "-"
            if (allGames[thebigid]["releasedate"] !== 0) {
                var d = new Date(allGames[thebigid]["releasedate"]);
                if (d.getFullYear() < 2027) {
                    disprelease = d.toLocaleDateString(urlRegion, { year: 'numeric', month: 'long', day: 'numeric' });
                }
            }

            var thestars = '';
            if (allGames[thebigid]["starcount"] > 4) {
                var totalratings = allGames[thebigid]["starcount"];
                var avgrating = allGames[thebigid]["stars"];
                var percentfilled = (avgrating / 5) * 100;
                var offset;
                if (percentfilled <= 20) {
                    offset = 0;
                } else if (percentfilled > 20 && percentfilled <= 40) {
                    offset = 12;
                } else if (percentfilled > 40 && percentfilled <= 60) {
                    offset = 24;
                } else if (percentfilled > 60 && percentfilled <= 80) {
                    offset = 36;
                } else if (percentfilled > 80 && percentfilled <= 100) {
                    offset = 48;
                }
                var starsfilled = ((percentfilled / 100) * 90) + offset;
                thestars = '<div class="ratingstars" data-starpercent="' + starsfilled + '"><div class="c-rating f-individual emptystars" data-value="' + avgrating +
                    '" data-max="5" itemscope itemtype="https://schema.org/Rating">' +
                    '<p class="x-screen-reader">User rating:' +
                    '<span itemprop="ratingValue">' + avgrating + '</span>/' +
                    '<span itemprop="bestRating">5</span>' +
                    '</p>' +
                    // '</div>' + 
                    '<div class="c-rating f-individual filledstars" data-value="5" data-max="5" itemscope itemtype="https://schema.org/Rating">' +
                    '<p class="x-screen-reader">' +
                    '<span itemprop="ratingValue">5</span>/' +
                    '<span itemprop="bestRating">5</span>' +
                    '</p>' +
                    '<div></div>' +
                    '</div></div></div><span class="reviewtotal">' + allGames[thebigid]["starcount"] + '</span>'
                    // $("body").append('<style>.c-rating[data-value].f-individual div {height: 30px;width: 138px;}.ratingstars {position:relative;display: inline-block;vertical-align: middle;}.emptystars {position: absolute;left: 0;right: 0;}' +
                    //     '.filledstars.c-rating[data-value].f-individual div:after, .filledstars.c-rating[data-value].f-individual div:before {width:' + starsfilled + 'px; overflow:hidden;}' +
                    //     '.startotalratings{display: inline-block;font-size: 16px;margin-left: 12px;}');
            }

            var thedescriptors = '';
            var rawdesc = allGames[thebigid]["descriptors"];
            var rdarray = rawdesc.split(", ");
            var rdtext = [];
            for (var r = 0; r < rdarray.length; r++) {
                // if (ratingDescriptors[rdarray[r]] !== undefined) {
                //   rdtext.push(ratingDescriptors[rdarray[r]]);
                // } else {
                rdtext.push(rdarray[r]);
                // }
            }
            thedescriptors = rdtext.join(", ");

            var popiconRating, popiconEnhanced, popiconsXpa, popicon4k, popiconHdr;
            popiconRating = popiconEnhanced = popiconXpa = popicon4k = popiconHdr = '';

            var previousExists = false;

            if (allGames[thebigid]["rating"] === "none") {
                popiconRating = '';
                // } else if (ratingImages[allGames[thebigid]["rating"]] !== undefined) {
                //   popiconRating = '<span class="popicon piRating"><img src="' + ratingImages[allGames[thebigid]["rating"]] + '"></span>';
            } else {
                popiconRating = '<span class="popicon piRating">' + allGames[thebigid]["rating"] + '</span>';
            }

            if (gameIdArrays["genNine"].indexOf(thebigid) !== -1) {
                popiconEnhanced = '<span class="c-paragraph-3"> ' + quickLookLocStrings.locales[urlRegion]["keyOptimizedforxboxseriesxs"] + ' </span>';
                previousExists = true;
            }

            if (gameIdArrays["cross"].indexOf(thebigid) !== -1) {
                if (previousExists) {
                    popiconXpa = '<span class="featureCircle"> ● </span>'
                }
                popiconXpa += '<span class="c-paragraph-3"> ' + quickLookLocStrings.locales[urlRegion]["keySmartdelivery"] + ' </span>';
                previousExists = true;
            }

            if (gameIdArrays["cloud"].indexOf(thebigid) !== -1) {
                if (previousExists) {
                    popiconXpa += '<span class="featureCircle"> ● </span>'
                }
                popiconXpa += '<span class="c-paragraph-3"> ' + quickLookLocStrings.locales[urlRegion]["keyCloudenabled"] + ' </span>';
                previousExists = true;
            }

            /*if (gameIdArrays["fourk"].indexOf(thebigid) !== -1) {
                if (previousExists) {
                    popicon4k = '<span class="featureCircle"> ● </span>'
                }
                popicon4k += '<span class="c-paragraph-3"> 4K Ultra HD </span>';
                previousExists = true;
            }

            if (gameIdArrays["HDRGaming"].indexOf(thebigid) !== -1) {
                if (previousExists) {
                    popiconHdr = '<span class="featureCircle"> ● </span>'
                }
                popiconHdr += '<span class="c-paragraph-3"> HDR </span>';
            }*/

            var popbadges = '';
            var popgoldprice = '';
            if (allGames[thebigid]["msrpprice"] !== allGames[thebigid]["listprice"]) {
                var listdiff = allGames[thebigid]["msrpprice"] - allGames[thebigid]["listprice"];
                var listperc = Math.round(listdiff / allGames[thebigid]["msrpprice"] * 100).toString() + "%";
                popbadges += '<span class="c-badge f-small badge-silver">' + regionContent["keyPopbadgepercent"].replace("<PLACEHOLDER>", listperc) + '</span>'
            }

            if (allGames[thebigid]["goldandsilversale"] === "true") {
                popbadges += '<span class="c-badge f-small f-highlight">' + regionContent["keyPopgolddiscount"] + '</span>';
                if (urlRegion !== "ar-sa" && urlRegion !== "ar-ae") {
                    var specialshown = allGames[thebigid]["goldandsilversalegoldprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                } else {
                    if (urlRegion === "ar-sa") {
                        currregion = "en-us";
                    } else {
                        currregion = "en-ca";
                    }
                    var specialshown = allGames[thebigid]["goldandsilversalegoldprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                }

                popgoldprice += '<div class="popgoldarea"><div class="c-price popgoldprice" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                    '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
                    '<span class="textpricenew x-hidden-focus" itemprop="price">' + specialshown + '</span>' +
                    '</div>' +
                    '<img class="popgoldlogo" src="https://compass-ssl.xbox.com/assets/93/ca/93ca0eec-39bc-4db8-a0ca-e0ee603047b7.svg?n=X1-Games-Catalog_0_Gold-Logo_64x23.svg"></div>';
            } else if (allGames[thebigid]["golddiscount"] === "true" || allGames[thebigid]["gameswithgold"] === "true") {
                popbadges += '<span class="c-badge f-small f-highlight">' + regionContent["keyPopgolddiscount"] + '</span>';
                if (urlRegion !== "ar-sa" && urlRegion !== "ar-ae") {
                    var specialshown = allGames[thebigid]["specialprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                } else {
                    if (urlRegion === "ar-sa") {
                        currregion = "en-us";
                    } else {
                        currregion = "en-ca";
                    }
                    var specialshown = allGames[thebigid]["specialprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                }
                popgoldprice += '<div class="popgoldarea"><div class="c-price popgoldprice" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                    '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
                    '<span class="textpricenew x-hidden-focus" itemprop="price">' + specialshown + '</span>' +
                    '</div>' +
                    '<img class="popgoldlogo" src="https://compass-ssl.xbox.com/assets/93/ca/93ca0eec-39bc-4db8-a0ca-e0ee603047b7.svg?n=X1-Games-Catalog_0_Gold-Logo_64x23.svg"></div>';
            }

            var popservices = '';
            if (allGames[thebigid]["gamepassgame"] === "true" && allGames[thebigid]["specialprice"] === 0) {
                popservices += '<div class="servicesarea"><p>' + regionContent["keyPopgpgame"] + '</p></div>';
            }

            gpspecialprice = '';
            if (allGames[thebigid]["gamepassgame"] === "true" && allGames[thebigid]["specialprice"] !== 0 && 
                allGames[thebigid]["specialprice"] !== 100000000) {
                if (urlRegion !== "ar-sa" && urlRegion !== "ar-ae") {
                    var gpprice = allGames[thebigid]["specialprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                } else {
                    if (urlRegion === "ar-sa") {
                        currregion = "en-us";
                    } else {
                        currregion = "en-ca";
                    }
                    var gpprice = allGames[thebigid]["specialprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                }
                gpspecialprice = '<div class="servicesarea"><p>' + eaplaystrings.locales[urlRegion].keyWithxgp.replace("<<PLACEHOLDER>>", gpprice) + '</p></div>';
            }
            if (allGames[thebigid]["eaplaygame"] === "true" && allGames[thebigid]["specialprice"] !== 0 && 
                allGames[thebigid]["specialprice"] !== 100000000) {
                if (urlRegion !== "ar-sa" && urlRegion !== "ar-ae") {
                    var gpprice = allGames[thebigid]["specialprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                } else {
                    if (urlRegion === "ar-sa") {
                        currregion = "en-us";
                    } else {
                        currregion = "en-ca";
                    }
                    var gpprice = allGames[thebigid]["specialprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                }
                gpspecialprice = '<div class="servicesarea"><p>' + eaplaystrings.locales[urlRegion].keyWitheaplay.replace("<<PLACEHOLDER>>", gpprice) + '</p></div>';
            }

            if (allGames[thebigid]["eaaccessgame"] === "true" && allGames[thebigid]["specialprice"] !== 100000000) {
                if (urlRegion !== "ar-sa" && urlRegion !== "ar-ae") {
                    var eaprice = allGames[thebigid]["specialprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                } else {
                    if (urlRegion === "ar-sa") {
                        currregion = "en-us";
                    } else {
                        currregion = "en-ca";
                    }
                    var eaprice = allGames[thebigid]["specialprice"].toLocaleString(currregion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                }

                popservices += '<div class="servicesarea"><p>' + regionContent["keyPopeagame"].replace("<PLACEHOLDER>", eaprice) + '</p></div>';
            }

            var popbuytext = regionContent["keyBuynow"];
            if (allGames[thebigid]["title"].toLowerCase().indexOf("preview") !== -1 || (allGames[thebigid]["description"] !== null && allGames[thebigid]["description"].toLowerCase().indexOf("game preview") !== -1) ||
                (allGames[thebigid]["description"] !== null && allGames[thebigid]["description"].toLowerCase().indexOf("gamepreview") !== -1)) {
                var popbuytext = regionContent["keyBuynow"];
            } else if (gameIdArrays["upcoming"].indexOf(thebigid) !== -1 && allGames[thebigid]["purchasable"] === "true") {
                popbuytext = regionContent["keyPreordernow"];
            }

            var datatrack = 'data-retailer="ms store"'
            if (allGames[thebigid]["gameurl"].toLowerCase().indexOf("xbox.com") !== -1) {
                datatrack = 'data-cta="learn"'
            }

            if (allGames[thebigid]["gameurl"].toLowerCase().indexOf("xbox.com") === -1) {
                priceButtons = '<a href="' + allGames[thebigid]["gameurl"] + '" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                    '>buy-now>click" class="c-call-to-action c-glyph popbuynow poplastbutton f-lightweight" target="_blank" ' + datatrack +
                    ' aria-label="' + regionContent["keyLearnmore"] + ", " + allGames[thebigid]["title"] + '">' +
                    '<span>' + regionContent["keyLearnmore"] + '</span>' +
                    '</a>'
            } else {
                priceButtons = //'<a href="https://www.microsoft.com/store/p/' + allGames[thebigid]["titleclickname"] + '/' + thebigid + '" data-clickname="www>games>xbox-one>' + // buy now to store
                    //'<a href="' + allGames[thebigid]["gameurl"] + '#purchaseoptions" data-clickname="www>games>xbox-one>' +
                    //allGames[thebigid]["titleclickname"] + '>buy-now>click" class="c-call-to-action c-glyph popbuynow" target="_blank" ' + datatrack +
                    //' aria-label="' + popbuytext + ", " + allGames[thebigid]["title"] + '">' +
                    //'<span>' + popbuytext + '</span>' +
                    '</a>' +
                    '<a href="' + allGames[thebigid]["gameurl"] + '" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                    '>learn-more>click" class="c-call-to-action f-lightweight c-glyph poplastbutton" target="_blank" ' + datatrack + '>' +
                    '<span>' + regionContent["keyLearnmore"] + '</span>' +
                    '</a>'

            }
            if (gameIdArrays["upcoming"].indexOf(thebigid) !== -1 && allGames[thebigid]["purchasable"] === "false") {
                popbadges = '';
                priceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                    '<span class="textpricenew soontextprice x-hidden-focus" itemprop="price">' + regionContent["keyBadgecomingsoonlower"] + '</span>' +
                    '</div>';
                popgoldprice = '';
                popservices = '';
                priceButtons = '<a href="' + allGames[thebigid]["gameurl"] + '" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                    '>learn-more>click" class="c-call-to-action f-lightweight c-glyph poplastbutton" target="_blank">' +
                    '<span>' + regionContent["keyLearnmore"] + '</span>' +
                    '</a>'
            }

            // 24 hours hide price
            var tempreldate = new Date(allGames[thebigid]["releasedate"]);
            var tempnowdate = new Date();
            var hoursaway = new Date(tempreldate.toGMTString()) - new Date(tempnowdate.toGMTString());
            hoursaway = hoursaway / 1000 / 60 / 60; // gives hours

            if (gameIdArrays["upcoming"].indexOf(thebigid) !== -1 && hoursaway > 0 && hoursaway < 24) {
                priceshown = '';
                popprice = ''
            } else if (nonPurchForced.indexOf(thebigid) !== -1) {
                priceshown = '';
                popprice = ''
            } else {
                popprice = '<div class="popprice">'
            }

            var plxb = '';
            var plpc = '';
            var plxsx = '';
            var plmo = '';


            if (allGames[thebigid]["platformxsx"] === "true") {
                plxsx = '<div class="c-tag">' +
                    // '<span class="c-glyph svg-xbox-series-x" role="img" aria-label=""><svg class="high-contrast-svg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="20" height="20"><path d="M832 384q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM512 0h1024v2048H512V0zm896 1920V128H640v1792h128v-896h128v896h512z" alt=""></path></svg></span>' +
                    'Xbox Series X|S' +
                    '</div>';
            }

            if (allGames[thebigid]["platformxo"] === "true") {
                plxb = '<div class="c-tag">' +
                    // '<span class="c-glyph glyph-xbox-one-console" role="img" aria-label=""></span>' +
                    'Xbox One' +
                    '</div>';
            }
            if (allGames[thebigid]["platformpc"] === "true") {
                plpc = '<div class="c-tag">' +
                    // '<span class="c-glyph glyph-pc1"></span>' +
                    quickLookLocStrings.locales[urlRegion]["keyPc"] +
                    '</div>';
            }
            if (gameIdArrays["cloud"].indexOf(thebigid) !== -1) {
                plmo = '<div class="c-tag">' +
                    // '<span class="c-glyph glyph-mobile-tablet"></span>' +
                    quickLookLocStrings.locales[urlRegion]["keyMobile"] +
                    '</div>';
            }

            var qlbutclass = '';
            if (allGames[thebigid]["physical"] === "true") { qlbutclass = ' physgame' }

            var eachGameClass = '';
            if (docwidth > 1083 && navigator.userAgent.indexOf("iPad") === -1) { // Added check -EL 11/23/20
                eachGameClass = 'm-product-placement-item f-size-medium context-game gameDiv';
            } else {
                eachGameClass = 'm-product-placement-item f-size-medium context-game gameDiv qlButtonFuncDISABLE';
            }

            var gpicon = '';
            if (allGames[thebigid]["gamepassgame"] === "true") {
              gpicon = '<img class="gamepassicon" alt="game pass icon" src="https://assets.xboxservices.com/assets/d8/47/d8473982-ed8d-4522-9c03-3723bec48fc6.svg?n=Games-Catalog_Image-0_Game-Pass-Glyph_1000x625.svg">';
            }

            var eachgameA = '<div class="' + eachGameClass + qlbutclass + '" itemscope="" itemtype="http://schema.org/Product" data-bigid="' + thebigid + '" ' +
                'data-releasedate="' + allGames[thebigid]["releasedate"] + '" data-msproduct="' + allGames[thebigid]["msproduct"] + '" data-multiplayer="' + allGames[thebigid]["multiplayer"] +
                '" data-rating="' + allGames[thebigid]["rating"] + '" data-ratingsystem="' + allGames[thebigid]["ratingsystem"] + '" data-listprice="' + allGames[thebigid]["listprice"] + '">' +
                '<a class="gameDivLink" href="' + allGames[thebigid]["gameurl"] + '" target="_blank" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                '>click" ' + datatrack + '>' +
                '<picture class="containerIMG">' +
                '<img class="c-image" aria-hidden="true" alt="' + boxshotlocstrings.locales[urlRegion]["keyPlaceholderboxshot"].replace("<PLACEHOLDER>", allGames[thebigid]["title"]) +
                '" srcset="" src="' + theboxshot + '">' +
                gpicon +
                '</picture>' +
                badges +
                '<div>' +
                '<h3 class="c-subheading-4 x1GameName" itemprop="product name">' + allGames[thebigid]["title"] + '</h3>' +
                priceshown +
                '</div>' +
                '</a>';


            var quickLookButton = '<div class="qlButton">' +
                '<a class="c-call-to-action c-glyph black-c" role="button" tabindex="0" aria-label="' + regionContent["keyQuickaria"] + '">' + regionContent["keyQuicklook"] + '</a>' +
                '</div>';

                if (gameIdArrays["eaplayPC"].indexOf(thebigid) !== -1 && win10user === true) {
                  priceButtons = $(".win10link").html();
                }
                if (gameIdArrays["eaplayPC"].indexOf(thebigid) !== -1 && win10user === false) {
                  priceButtons = $(".nonwin10link").html();
                }

                var eachgamePopup = '<div class="gameMoreInfo" data-gameRating="' + '" role="dialog" aria-label="dialog window with ' + allGames[thebigid]["title"] + ' information">' +
                '<button tabindex="0" class="qclosebutton" aria-label="close button for dialog window">' +
                '<img src="https://compass-ssl.xbox.com/assets/b7/fc/b7fc0278-f0ed-4918-8d05-98fea426a597.svg?n=Games-Catalog_Image-0_X-Button_230x120.svg" alt="close button">' +
                '</button>' +
                '<div class="poprotator">' +
                //therotator +
                '<div class="c-age-rating"><img class="c-image" src="' + allGames[thebigid]["ratimage"] + '" alt=""></div>' +
                '</div>' +
                '<div class="popinfo">' +
                '<div class="poptitle">' +
                '<h3 class="c-heading" itemprop="product name">' + allGames[thebigid]["title"] + '</h3>' +
                thestars +
                '</div>' +
                '<div class="popicons">' +
                // popiconRating + 
                popiconEnhanced + popiconXpa + popicon4k + popiconHdr +
                '</div>' +
                '<div class="popdescription">' +
                '<div class="furtherrelease"><span class="furthheading">' + regionContent["keyDescription"] +
                ': </span><span class="furthcontent">' + allGames[thebigid]["description"] + '</span></div>' +
                '</div>' +
                '<div class="platformdescription"><div class="furtherplatform">' + plxsx + plxb + plpc + plmo + '</div></div>' +
                '<div class="popbottom">' +
                popprice +
                //badges + 
                popbadges +
                pricestartingat +
                priceshown +
                popgoldprice +
                popservices +
                gpspecialprice +
                '</div>' +
                '<div class="popButton">' +
                priceButtons +
                '</div>' +

                '</div>' +

                '</div>' +

                '</div>';

            var eachgameB = '</div>';

            if (docwidth > 1083) {
                gamehtml += eachgameA + quickLookButton + eachgamePopup + eachgameB;
            } else {
                gamehtml += eachgameA + eachgamePopup + eachgameB;
            }
        }

        $(".gameDivsWrapper").append(gamehtml);
        // mwf.ComponentFactory.create([
        //      {component: mwf.MultiSlideCarousel,
        //      eventToBind: mwf.DOMContentLoaded}
        // ]);
        if (page === 0 && array.length > gamesperpage) {
            setTimeout(function() {
                // var wrapheight = $(".gameDivsWrapper").height();
                // $(".gameDivsWrapper").css("min-height", wrapheight + "px");
                $(".gameDivsWrapper").css("min-height", "32vw");
            }, 2000)
        }
        paginateClean();
        setTimeout(function() {
            tabzero();
        }, 1500)
    }

    // tab only in popups
    setTimeout(function() { // with second close button
        /*redirect last tab to first input*/
        $(document).on("keydown", function(e) {
            if (e.keyCode === 9 && !e.shiftKey) {
                if ($(".gameMoreInfo.popupShow .poplastbutton")[0] === document.activeElement) {
                    e.preventDefault();
                    $(".gameMoreInfo.popupShow .qclosebutton").focus()
                }
            }
            if ((e.keyCode === 13 || e.keyCode === 32) && ($(".gameMoreInfo.popupShow .qclosebutton")[0] === document.activeElement)) {
                e.preventDefault();
                $(".gameMoreInfo.popupShow .qclosebutton").click();
            }
            if ((e.keyCode === 27) && ($(".gameMoreInfo.popupShow").length !== 0)) {
                $(".gameMoreInfo.popupShow .qclosebutton").click();
            }
        })

        /*redirect first shift+tab to last input*/
        $(document).on('keydown', ".gameMoreInfo.popupShow .qclosebutton", function(e) {
            if ((e.keyCode === 9 && e.shiftKey)) {
                e.preventDefault();
                $(".gameMoreInfo.popupShow .poplastbutton").focus()
                if ($(".gameMoreInfo.popupShow .qclosebutton")[0] === document.activeElement) {
                    $(".gameMoreInfo.popupShow .poplastbutton").focus()
                }
            }
        });


    }, 250)

    // shift tab to focus on quick look
    $(document).on('keydown', function (e) {
        if ((e.keyCode === 9 && e.shiftKey)) {
            if (document.activeElement.classList.contains('gameDivLink') && $(".gameDivLink").eq(0)[0] !== document.activeElement) {
                //e.preventDefault();
                setTimeout(function() {
                    var theactive = document.activeElement;
                    if ($(theactive)[0].nodeName !== "BUTTON") {
                        $(".qlButton a").closest(".gameDiv").prev(".gameDiv").find(".qlButton a").focus();
                    }
                }, 10)
            }
        }
    });

    function paginateClean() {
        $(".paginatenext a").attr("tabindex", "0");
        $(".paginateprevious a").attr("tabindex", "0");
        $(".paginatenum a").attr("tabindex", "0");
        var screenwidth = $(document).width();
        if (screenwidth > 768) {
            var pagnummax = 9;
        } else {
            var pagnummax = 3;
        }
        $(".paginatenum").show();
        $(".pagskipstart").remove();
        $(".pagskipend").remove();
        var pagnumber = $(".paginatenum").length;
        if (pagnumber > pagnummax) {
            // trim following
            var pagnumprev = $(".paginatenum.f-active").prevAll().length;
            if (pagnumprev <= Math.floor(pagnummax / 2)) {
                var totrimnext = pagnummax - pagnumprev - 1;
                $(".paginatenum.f-active").nextAll(".paginatenum:gt(" + totrimnext + ")").hide();
            } else {
                $(".paginatenum.f-active").nextAll(".paginatenum:gt(" + (Math.floor(pagnummax / 2) - 1) + ")").hide();
            }
            if (pagnumprev > Math.floor(pagnummax / 2) + 2) {

                $(".paginatenum").first().after('<li class="pagskipstart" style="display: inline-block;">...</li>');
            }
            // trim before
            var pagnumnext = $(".paginatenum.f-active").nextAll().length;
            if (pagnumnext <= Math.floor(pagnummax / 2)) {
                var totrimprev = pagnummax - pagnumnext - 1;
                $(".paginatenum.f-active").prevAll(".paginatenum:gt(" + totrimprev + ")").hide();
            } else {
                $(".paginatenum.f-active").prevAll(".paginatenum:gt(" + (Math.floor(pagnummax / 2) - 1) + ")").hide();
            }
            if (pagnumnext > Math.floor(pagnummax / 2) + 2) {

                $(".paginatenum").last().before('<li class="pagskipend" style="display: inline-block;">...</li>');
            }
            $(".paginatenum").first().show();
            $(".paginatenum").last().show();
        }
        $(".pag-disabled a").attr("tabindex", "-1");
        $(".paginatenum.f-active a").attr("tabindex", "-1");

        var currentwidth = $(window).width();
        pageloadfocus++
        if (navigator.userAgent.match(/iPad/i) === null && pageloadfocus > 1) {
            if ($(".gameDiv").not(".pagHide").not(".catHide").length === 0) {
                setTimeout(function() {
                    $(".nogamesfound h3").eq(0).focus();
                }, 600)
            } else {
                if (paginateclick === 1) {
                $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find(".gameDivLink").focus();
                paginateclick = 0;
            }
        }
    }
}

    function filtersort() {
        setTimeout(function() {
            $(".gameSort li").eq(0).attr("data-sorting", "featured");
            $(".gameSort li").eq(1).attr("data-sorting", "release");
            $(".gameSort li").eq(2).attr("data-sorting", "az");
            $(".gameSort li").eq(3).attr("data-sorting", "za");
            $(document).on("keypress", ".gameSort li", function(event) {
                if ((event.keyCode == 13) || (event.keyCode == 32)) {
                    event.preventDefault();
                    $(this).click();
                }
            })
        }, 500)
        $(".paginateDropdown li").eq(0).attr("data-gamesmax", "20");
        $(".paginateDropdown li").eq(1).attr("data-gamesmax", "50");
        $(".paginateDropdown li").eq(2).attr("data-gamesmax", "100");
        $(".paginateDropdown li").eq(3).attr("data-gamesmax", "200");
        $(document).on("click", ".gameSort li", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            var menutext = $(this).text();
            $(".ratingtitle").text(menutext);
            //e.preventDefault();
            var nothide = $(this).attr("data-rating");
            $("#ratings-list").attr("data-rate", nothide);
            getFilterStatus();
        });

        $(document).on("click", ".platformselection a", function(e) {
          e.preventDefault();
          $(".platformselection a").removeClass("platselected");
          $(this).addClass("platselected")
          $(".colgroup").addClass("hidden");
          var newplat = $(".platselected").attr("data-theplat");
          $(".collections-" + newplat).removeClass("hidden");
          $(".collections-" + newplat).find("a").eq(0).click();
          $(".platformselection").attr("data-platselected", newplat);
          $(".platformselection").attr("data-platclicked", "true");
          $(".CatAnnounce").text($(".platselected span").text() + " selected");
          setTimeout(function() {
            $(".platformselection").attr("data-platclicked", "false");
          }, 500)
          getFilterStatus();
        });

        $(".sorting-list .c-menu-item a").removeAttr("href");
        $(document).on("click", ".gameSort li", function() {
            $(".gameDivsWrapper").addClass("gdSorting");
            // if ($("[data-boxcat^='multiplayer']").prop("checked") == true || $("[data-boxcat^='multiplayer']").prop("checked") == "checked" ||
            //   $("[data-boxcat^='all']").prop("checked") == true || $("[data-boxcat^='all']").prop("checked") == "checked") {
            //   $(".c-progress.f-indeterminate-local.f-progress-large").show();
            // }
            var menutext = $(this).text();
            var sorttype = $(this).attr("data-sorting");
            $(".gameSort").attr("data-sort", sorttype);
            $(".CatAnnounce").text("games sorted by " + menutext);
            getFilterStatus();
        });

        $(document).on("click", "#availSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if ($(this).hasClass("f-selected")) {
                $("#availSelect a").addClass("f-selected");
                $(this).removeClass("f-selected")
            } else {
                $("#availSelect a").removeClass("f-selected");
                $(this).addClass("f-selected")
            }
            getFilterStatus();
        });

        $(document).on("click", "#genreSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            getFilterStatus("nochange");
        });

        $(document).on("click", "#platSelect a", function(e) {
            e.preventDefault();
            if ($("#platSelect .f-selected").length === 0) {
                $("#platSelect .f-selected").removeClass("f-selected");
            } else {
                $("#platSelect a").removeClass("f-selected");
                $(this).addClass("f-selected");
            }
            $(".gameDivsWrapper").addClass("gdSorting");
            getFilterStatus("nochange");
        });

        $(document).on("click", "#featureSelect a", function(e) {
            e.preventDefault();
            var catremove = $(".gamesFilters").attr("data-filtersselected");
            if (catremove.indexOf("") > -1) { $(".cloudEnabled").hide(); }
            if (catremove.indexOf("feature-smartdelivery") > -1) { $(".smartDelivery").hide(); }
            if (catremove === "") {
                $(".smartDelivery").hide();
                $(".cloudEnabled").hide();
            }
            $(".gameDivsWrapper").addClass("gdSorting");
            getFilterStatus();
        });

        $(document).on("click", "#ratingSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            getFilterStatus();
        });

        // collection select
        $(document).on("click", ".coloption", function(e) {
            e.preventDefault();
            var closingwidth = $(window).width();
            if (closingwidth < 768) {
                $(".filterClose a").click();
            }
            $(".coloption").removeClass("col-selected");
            $(this).addClass("col-selected");
            var colTitle = $(".col-selected span").text();
            $(".catalogTitle").text(colTitle);
            $(".gameDivsWrapper").addClass("gdSorting");
            var clickCol = $(this).attr("data-col");
            $(".gamesCollections").attr("data-colselected", clickCol);
            getFilterStatus()
        })

        $(document).on("click", ".filterSelections a", function(e) {
            e.preventDefault();
            var catremove = $(this).closest("li").attr("data-catselected");
            if (catremove === "feature-cloudenabled") { $(".cloudEnabled").hide(); }
            if (catremove === "feature-smartdelivery") { $(".smartDelivery").hide(); }
            $("[data-cat='" + catremove + "']").removeClass("f-selected");
            $(this).closest("li").remove();
            if ($(".filterSelections li").length === 0 || catremove === "avail-physical") {
                $("[data-cat='avail-download']").addClass("f-selected");
            } else if (catremove === "avail-download") {
                $("[data-cat='avail-physical']").addClass("f-selected");
            }
            if ($(this).hasClass("searchcat")) {
              if ($(".platformselection").attr("data-platselected") === "xbox") {
                $("[data-col='all']").click();
              } else {
                $("[data-col='pcGames']").click();
              }
            }

            var updPhrase = $(this).next("span").text() + " filter removed";
            $(".CatAnnounce").text(updPhrase);

            getFilterStatus();
        })

        $(document).on("click", ".clearall", function(e) {
            e.preventDefault();
            $(".smartDelivery").hide();
            $(".cloudEnabled").hide();
            $("#genreSelect a").removeClass("f-selected");
            $("#featureSelect a").removeClass("f-selected");
            $("#ratingSelect a").removeClass("f-selected");
            $("#platSelect a").removeClass("f-selected");
            $(".filterSelections li:gt(0)").remove();
            $(".xghsearch input").val("");
            if ($(".gameSelector").attr("data-colselected") === "search") {
                if ($(".platformselection").attr("data-platselected") === "xbox") {
                  $(".gameSelector").attr("data-colselected", "all");
                } else {
                  $(".gameSelector").attr("data-colselected", "pcGames");
                }
            }

            if ($(".CatAnnounce").text().indexOf("all filters") === -1) {
                var updPhrase = "every filter removed";
              } else {
                var updPhrase = "all filters removed";
              }
              $(".CatAnnounce").text(updPhrase);

            getFilterStatus();
        })

        function getFilterStatus(urlchange) {
          if ($(".gameSelector").attr("data-colselected") === "search") {
            $(".filterSelections a").not(".searchcat").each(function() {
              $(this).closest("li").remove()
            })
          } else {
            $(".filterSelections li").remove();
          }
          
            // $(".filterSelections li").remove();
            var thefilters = [];
            $(".gamesFilters a.c-refine-item").each(function() {
                if ($(this).hasClass("f-selected")) {
                    var refinetext = $(this).find("span").text();
                    var refinecat = $(this).attr("data-cat");
                    addSummary(refinetext, refinecat);
                    thefilters.push(refinecat)
                }
            })
            thefilters.join(",");
            $(".gamesFilters").attr("data-filtersselected", thefilters);

            $(".c-progress.f-indeterminate-local.f-progress-large").show();
            var coltosend = $(".gamesCollections").attr("data-colselected");
            var filterstosend = $(".gamesFilters").attr("data-filtersselected") || "avail-download";
            var sorttosend = $(".gameSort").attr("data-sort") || "featured";

            listGames(coltosend, filterstosend, sorttosend, urlchange);
        }

    }

    //mwf select handling
    setTimeout(function() {
        var mySelectHtmlElement = document.querySelector('.gameSort .c-select');
        var mwfSelectComp;
        mwf.ComponentFactory.create([{
            c: mwf.Select,
            elements: [mySelectHtmlElement],
            callback: function callback(results) {
                if (results && results.length) {
                    mwfSelectComp = results[0];
                }
            },
            eventToBind: 'DOMContentLoaded'
        }]);

        if (mwfSelectComp.selectMenu) {
            // subscribe to the mwfSelectComp onSelectionChanged event
            mwfSelectComp.selectMenu.subscribe({
                onSelectionChanged: function(e) {
                    $(".gameSort .c-menu-item p:contains('" + e.id + "')").closest(".c-menu-item").click();
                }
            });
        }

        //mwf pag select handling
        var mySelectHtmlElement2 = document.querySelector('.paginateDropdown .c-select');
        var mwfSelectComp2;
        mwf.ComponentFactory.create([{
            c: mwf.Select,
            elements: [mySelectHtmlElement2],
            callback: function callback(results) {
                if (results && results.length) {
                    mwfSelectComp2 = results[0];
                }
            },
            eventToBind: 'DOMContentLoaded'
        }]);

        if (mwfSelectComp2.selectMenu) {
            mwfSelectComp2.selectMenu.subscribe({
                onSelectionChanged: function(e) {
                    $(".paginateDropdown .c-menu-item p:contains('" + e.id + "')").closest(".c-menu-item").click();
                }
            });
        }
    }, 3000)

    // Fixing Tab Index on Refine Elements
    setTimeout(function() {
        tabzero();
    }, 1000)
    setTimeout(function() {
        tabzero();
    }, 5000)
    setTimeout(function() {
        tabzero();
    }, 10000)
    setTimeout(function() {
        tabzero();
    }, 15000)

    function addSummary(text, data) {
        $(".filterSelections").append('<li class="c-choice-summary" data-catselected="' + data + '">' +
            '<a class="c-action-trigger c-glyph glyph-cancel" href="#" aria-label="' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", text) + '">' +
            '<span class="x-screen-reader">' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", text) + '</span>' +
            '</a>' +
            '<span>' + text + '</span></li>')
    }

    $(".xghsearch button").on("click", function(e) {
        e.preventDefault();
        gameSearch();
    })

    function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {  
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

    function gameSearch() {
      var isexact = 0;

      var searchplatform = $(".platformselection").attr("data-platselected");

      var fullSearchArray = gameIdArrays["allXbox"];
      if (searchplatform === "pc") { 
        fullSearchArray = gameIdArrays["pcGames"]; 
        $(".coloption[data-col='pcGames']")[0].click();
        $(".coloption[data-col='pcGames']").addClass("col-selected");
      } else {
        $(".coloption[data-col='all']")[0].click();
        $(".coloption[data-col='all']").addClass("col-selected");
      }

        if ($(".filterSelections a").length > 0) {
          $(".filterSelections li").remove(); 
        }
        // var queryraw = encodeURI($(".xghsearch input").val().trim().replace("<", "")).replace(/[!'()*]/g).replace(/%20/g, " ");
        // var query = encodeURI($(".xghsearch input").val().trim().replace(/\s+/g, ' ').replace("<", "").toLowerCase()).replace(/[!'()*]/g).replace(/%20/g, " ");
        var queryraw = $(".xghsearch input").val().trim().replace(/</g, "");
        var query = $(".xghsearch input").val().trim().replace(/\s+/g, ' ').replace(/</g, "").toLowerCase();
        if (query.length < 3) {
            $(".searcherrormessage").text(regionContent["keySearchlengtherror"]);
            // $(".CatAnnounce").text(regionContent["keySearchlengthe rror"]); 
            return false;
        } else if (query.length > 50) {
            $(".searcherrormessage").text(regionContent["keySearchlengthlongerror"]);
            // $(".CatAnnounce").text(regionContent["keySearchlengthlongerror"]); 
            return false;
        } else {
            $(".searcherrormessage").text("");
        }
        queryraw = queryraw.replace(/"/g, '&quot;')
        query = query.replace(/"/g, '&quot;')
        queryraw = queryraw.replace(/'/g, '')
        query = query.replace(/'/g, '')
        searchArray = [];
        searchObj = {};

        var smallwords = ["the", "a", "an", "of", "for", "and", "or", "it", "in", "on", "with", "as", "at", "be", "but", "by", "from", "had", "has", "how", "if", "its", "so", "than", "that",
            "to", "too", "was"
        ]; // "stop words"
        var allgameslength = fullSearchArray.length;
        // straight simple search
        // for (var i = 0; i < allgameslength; i++) {
        //   var titlesch = allGames[fullGameArray[i]]["title"].replace(/\s+/g, ' ').toLowerCase();
        //   if (titlesch.indexOf(query) !== -1) {
        //     searchArray.push(fullGameArray[i])
        //   }
        // }

        var queryarr = query.split(" ");
        // remove stop words
        var tempquery = [];
        for (var i = 0; i < queryarr.length; i++) {
            if (smallwords.indexOf(queryarr[i]) === -1) {
                tempquery.push(queryarr[i]);
            }
        }
        
        queryarr = tempquery;
        for (var i = 0; i < allgameslength; i++) {
            var titlesch = allGames[fullSearchArray[i]]["title"].replace(/\s+/g, ' ').toLowerCase();
            var titlearr = titlesch.split(" ");

            var shsch = allGames[fullSearchArray[i]]["searchterms"].replace(/\s+/g, ' ');
            var sharr = shsch.split(" ");
            for (var u = 0; u < sharr.length; u++) {
              if (titlearr.indexOf(sharr[u]) === -1 && sharr[u] !== "" && sharr[u] !== "&") {
                titlearr.push(sharr[u])
              }
            }

            var gensch = allGames[fullSearchArray[i]]["genres"].replace(/\s+/g, ' ').toLowerCase();
            var genarr = gensch.split(" ");
            for (var u = 0; u < genarr.length; u++) {
              if (titlearr.indexOf(genarr[u]) === -1 && genarr[u] !== "" && genarr[u] !== "&") {
                titlearr.push(genarr[u].trim())
              }
            }

            var wordmatches = 0;
            for (var k = 0; k < queryarr.length; k++) {
              var queryword = queryarr[k];
              for (var m = 0; m < titlearr.length; m++) {
                var titleword = titlearr[m];
                if (queryword.length === titleword.length) {
                  var lettermatches = 0;
                  for (var n = 0; n < queryword.length; n++) {
                    if (queryword[n] === titleword[n]) {
                        lettermatches++;
                    }
                  }
                  if (lettermatches / queryword.length === 1) {
                    if (typeof searchObj[fullSearchArray[i]] === "undefined") {
                        searchObj[fullSearchArray[i]] = {};
                        searchObj[fullSearchArray[i]].exacts = 1;
                    } else {
                        searchObj[fullSearchArray[i]].exacts++;
                    }

                  } else if (lettermatches / queryword.length >= .75) {
                    // wordmatches++;
                    if (typeof searchObj[fullSearchArray[i]] === "undefined") {
                        searchObj[fullSearchArray[i]] = {};
                        searchObj[fullSearchArray[i]].exacts = 0;
                    }
                  }
                }
              }
  
            }


            // last straight matches
            var titleprepped = titlesch.toLowerCase().replace("®", "").replace("™", "").replace("'", "");
            if (titleprepped.indexOf(query) !== -1) { // && typeof searchObj[fullSearchArray[i]] === "undefined"
              isexact = 1;
              var lengthdif = titleprepped.length - query.length;
              var diffval = 100000;
              var diffadjust = diffval / 2; 
              if (titleprepped.indexOf(query + " ") !== -1 ||   titleprepped.indexOf(" " + query) !== -1) {
                diffadjust = 0;
              }
              if (lengthdif > 0) { diffval = diffval - lengthdif - diffadjust}
              searchObj[fullSearchArray[i]] = {};
              searchObj[fullSearchArray[i]].exacts = diffval;
            } 
            // if (wordmatches > 0) {
            //   searchArray.push(fullSearchArray[i])
            // }
        }  
        searchArray = Object.keys(searchObj);
  
        searchArray = searchArray.sort(asc_sortbi);

        function asc_sortbi(a, b) {
            return (new Date(searchObj[a]["exacts"])) < (new Date(searchObj[b]["exacts"])) ? 1 : -1;
        }

        if (isexact === 0) {
          searchArray = searchArray.sort(asc_sortclose);

          function asc_sortclose(a, b) {
              return (similarity(allGames[a].title, query)) < (similarity(allGames[b].title, query)) ? 1 : -1;
          }
        }

        $(".gamesCollections").attr("data-colselected", "search");
        // $(".coloption").removeClass("col-selected");
        // $(".coloption[data-col='all']").addClass("col-selected");
        $("#genreSelect a").removeClass("f-selected");
        $("#featureSelect a").removeClass("f-selected");
        $("#ratingSelect a").removeClass("f-selected");
        $("#platSelect a").removeClass("f-selected");
        $(".filterSelections li:gt(0)").remove();
        if ($("#availSelect a").eq(0).hasClass("f-selected")) {
            var availtype = "avail-physical";
        } else {
            var availtype = "avail-download";
        }
        $(".gamesFilters").attr("data-filtersselected", availtype);
        $(".CatAnnounce").text("games filtered by search string " + queryraw);
        listGames(searchArray, availtype, "search");
        $(".filterSelections").append('<li class="c-choice-summary" data-catselected="searchcat">' +
            '<a class="c-action-trigger c-glyph glyph-cancel searchcat" href="#" aria-label="' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", queryraw) + '">' +
            '<span class="x-screen-reader">' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", queryraw) + '</span>' +
            '</a>' +
            '<span>' + queryraw + '</span></li>')
    }

    // popup
    $(document).on("mouseenter", ".gameDiv a.gameDivLink", function(e) {
        $(e.target).off("mouseleave");
        var buttontoshow = $(e.target).closest(".gameDiv").find(".qlButton");
        $(".popupShow").removeClass("popupShow");
        $(buttontoshow).addClass("popupShow");
    })

    $(document).on("focus", ".gameDiv a.gameDivLink", function(e) {
        $(".qlButton").removeClass("popupShow");
        var buttontoshow = $(e.target).closest(".gameDiv").find(".qlButton");
        $(".popupShow").removeClass("popupShow");
        $(buttontoshow).addClass("popupShow");
    })

    $(document).on("click", ".qlButton a", function(e) {
        e.preventDefault();
        var poptoopen = $(this).closest(".gameDiv").find(".gameMoreInfo");
        var starperc = $(poptoopen).find(".ratingstars").attr("data-starpercent") || "0";
        $(poptoopen).find(".c-rating[data-value].f-individual.filledstars div").css("width", starperc + "px");
        $(poptoopen).addClass("popupShow");
        // var rightside = $(".gameMoreInfo.popupShow").offset().left + $(".gameMoreInfo.popupShow").width();
        // if (rightside > $(window).width()) {
        //   var dif = (rightside - $(window).width()) + 50;
        //   $(poptoopen).css("margin-left", "-" + dif + "px");
        // }
        $(poptoopen).find(".qclosebutton").focus();
        //$(poptoopen).find("h3").eq(0).focus();

        // populate rotator
        var thebigid = $(this).closest(".gameDiv").attr("data-bigid");
        if (allGames[thebigid]["physical"] === "true") {
            therotator = '<img class="physScreenshot" src="' + allGames[thebigid]["screenshot"] + '">';
        } else {
            var buttonhtml = '';
            var screenhtml = '';

            if (allGames[thebigid]["screenarray"].length > 0) {
                for (var s = 0; s < allGames[thebigid]["screenarray"].length; s++) {
                    if (s === 0) {
                        var humannum = s + 1;
                        buttonhtml += '<button role="tab" aria-selected="true" aria-label="View slide ' + humannum + '" aria-controls="' + allGames[thebigid]["titleclickname"] + s + '"></button>';
                        screenhtml += '<li id="' + allGames[thebigid]["titleclickname"] + s + '" class="f-active" role="tabpanel" data-f-theme="dark" >' +
                            '<section class="m-hero-item f-x-center f-y-center context-device theme-dark" itemscope itemtype="http://schema.org/Product">' +
                            '<picture class="c-image">' +
                            '<source srcset="' + allGames[thebigid]["screenarray"][s] + '" media="(min-width:0)">' +
                            '<img srcset="' + allGames[thebigid]["screenarray"][s] + '" src="' + allGames[thebigid]["screenarray"][s] + '" alt="' + allGames[thebigid]["title"] + ' ' + quickLookLocStrings.locales[urlRegion]["keyScreenshot"] + '">' +
                            '</picture>' +
                            '</section>' +
                            '</li>';
                    } else {
                        var humannum = s + 1;
                        buttonhtml += '<button role="tab" aria-selected="false" aria-label="View slide ' + humannum + '" aria-controls="' + allGames[thebigid]["titleclickname"] + s + '"></button>';
                        screenhtml += '<li id="' + allGames[thebigid]["titleclickname"] + s + '" role="tabpanel" data-f-theme="dark" >' +
                            '<section class="m-hero-item f-x-center f-y-center context-device theme-dark" itemscope itemtype="http://schema.org/Product">' +
                            '<picture class="c-image">' +
                            '<source srcset="' + allGames[thebigid]["screenarray"][s] + '" media="(min-width:0)">' +
                            '<img srcset="' + allGames[thebigid]["screenarray"][s] + '" src="' + allGames[thebigid]["screenarray"][s] + '" alt="' + allGames[thebigid]["title"] + ' ' + quickLookLocStrings.locales[urlRegion]["keyScreenshot"] + '">' +
                            '</picture>' +
                            '</section>' +
                            '</li>';
                    }
                }
            } else if (allGames[thebigid]["superheroart"]) { // Using keyart if there are no screenshots, fall back solution Finish this!!!!
                screenhtml += '<li id="' + allGames[thebigid]["titleclickname"] + s + '" role="tabpanel" data-f-theme="dark" >' +
                    '<section class="m-hero-item f-x-center f-y-center context-device theme-dark" itemscope itemtype="http://schema.org/Product">' +
                    '<picture class="c-image">' +
                    '<source srcset="' + allGames[thebigid]["superheroart"] + '" media="(min-width:0)">' +
                    '<img srcset="' + allGames[thebigid]["superheroart"] + '" src="' + allGames[thebigid]["superheroart"] + '" alt="' + boxshotlocstrings.locales[urlRegion]["keyPlaceholderboxshot"].replace("<PLACEHOLDER>", allGames[thebigid]["title"]) + '">' +
                    '</picture>' +
                    '</section>' +
                    '</li>';
            } else {
                console.log(allGames[thebigid]["superheroart"]);
            }


            if (fullcarouselimages.indexOf(thebigid) !== -1) {
                //var fullimageclass = " carfullimage"; // this was in to resize images to satisfy stakeholders. -EL 11/4/20
                var fullimageclass = "";
            } else {
                var fullimageclass = "";
            }

            var randchars = makerand10();

            therotator = '<div class="c-carousel f-multi-slide f-auto-play' + fullimageclass + '" data-js-interval="6000">' +
                '<div class="c-group">' +
                '<div class="c-sequence-indicator" role="tablist">' +
                buttonhtml +
                '</div>' +
                '<button class="c-action-toggle c-glyph glyph-play f-toggle high-contrast" data-toggled-label="Pause" data-toggled-glyph="glyph-pause" aria-label="Play" ' +
                'aria-describedby="tooltip' + randchars + '" data-toggle="tooltip">' +
                '<span id="tooltip' + randchars + '" class="c-tooltip" role="tooltip" aria-hidden="true">Play or pause this rotator</span>' +
                '</button>' +
                '</div>' +
                '<button class="c-flipper f-previous" aria-hidden="true" tabindex="-1"></button>' +
                '<button class="c-flipper f-next" aria-hidden="true" tabindex="-1"></button>' +
                '<div itemscope itemtype="http://schema.org/ItemList">' +
                '<ul>' +
                screenhtml +
                '</ul>' +
                '</div>' +
                '</div>'
        }

        if ($(this).closest(".gameDiv").find(".poprotator .c-carousel").length === 0 && allGames[thebigid]["physical"] === "false") {
            $(this).closest(".gameDiv").find(".poprotator").prepend(therotator);
            mwf.ComponentFactory.create([
                { component: mwf.MultiSlideCarousel }
            ]);
        } else if ($(this).closest(".gameDiv").find(".poprotator img").length === 0 && allGames[thebigid]["physical"] === "true") {
            $(this).closest(".gameDiv").find(".poprotator").css("border-bottom", "1px grey solid").prepend(therotator);
        }
        // open popup dark background
        $("body").append('<div id="page-cover"></div>');
        $('body').addClass('stop-scrolling')

    })

    $(document).on("click", ".qlButtonFunc>a", function(e) {
        e.preventDefault();
        var poptoopen = $(this).closest(".gameDiv").find(".gameMoreInfo");
        var starperc = $(poptoopen).find(".ratingstars").attr("data-starpercent") || "0";
        $(poptoopen).find(".c-rating[data-value].f-individual.filledstars div").css("width", starperc + "px");
        $(poptoopen).addClass("popupShow");
        // var rightside = $(".gameMoreInfo.popupShow").offset().left + $(".gameMoreInfo.popupShow").width();
        // if (rightside > $(window).width()) {
        //   var dif = (rightside - $(window).width()) + 50;
        //   $(poptoopen).css("margin-left", "-" + dif + "px");
        // }
        $(poptoopen).find(".qclosebutton").focus();
        //$(poptoopen).find("h3").eq(0).focus();

        // populate rotator
        var thebigid = $(this).closest(".gameDiv").attr("data-bigid");
        if (allGames[thebigid]["physical"] === "true") {
            therotator = '<img class="physScreenshot" src="' + allGames[thebigid]["screenshot"] + '">';
        } else {
            var buttonhtml = '';
            var screenhtml = '';

            if (allGames[thebigid]["screenarray"].length > 0) {
                for (var s = 0; s < allGames[thebigid]["screenarray"].length; s++) {
                    if (s === 0) {
                        var humannum = s + 1;
                        buttonhtml += '<button role="tab" aria-selected="true" aria-label="View slide ' + humannum + '" aria-controls="' + allGames[thebigid]["titleclickname"] + s + '" title="Slide ' +
                            humannum + '"></button>';
                        screenhtml += '<li id="' + allGames[thebigid]["titleclickname"] + s + '" class="f-active" role="tabpanel" data-f-theme="dark" >' +
                            '<section class="m-hero-item f-x-center f-y-center context-device theme-dark" itemscope itemtype="http://schema.org/Product">' +
                            '<picture class="c-image">' +
                            '<source srcset="' + allGames[thebigid]["screenarray"][s] + '" media="(min-width:0)">' +
                            '<img srcset="' + allGames[thebigid]["screenarray"][s] + '" src="' + allGames[thebigid]["screenarray"][s] + '" alt="' + allGames[thebigid]["title"] + ' ' + quickLookLocStrings.locales[urlRegion]["keyScreenshot"] + '">' +
                            '</picture>' +
                            '</section>' +
                            '</li>';
                    } else {
                        var humannum = s + 1;
                        buttonhtml += '<button role="tab" aria-selected="false" aria-label="View slide ' + humannum + '" aria-controls="' + allGames[thebigid]["titleclickname"] + s + '" title="Slide ' +
                            humannum + '"></button>';
                        screenhtml += '<li id="' + allGames[thebigid]["titleclickname"] + s + '" role="tabpanel" data-f-theme="dark" >' +
                            '<section class="m-hero-item f-x-center f-y-center context-device theme-dark" itemscope itemtype="http://schema.org/Product">' +
                            '<picture class="c-image">' +
                            '<source srcset="' + allGames[thebigid]["screenarray"][s] + '" media="(min-width:0)">' +
                            '<img srcset="' + allGames[thebigid]["screenarray"][s] + '" src="' + allGames[thebigid]["screenarray"][s] + '" alt="' + allGames[thebigid]["title"] + ' ' + quickLookLocStrings.locales[urlRegion]["keyScreenshot"] + '">' +
                            '</picture>' +
                            '</section>' +
                            '</li>';
                    }
                }
            } else if (allGames[thebigid]["superheroart"]) { // Using keyart if there are no screenshots, fall back solution Finish this!!!!
                screenhtml += '<li id="' + allGames[thebigid]["titleclickname"] + s + '" role="tabpanel" data-f-theme="dark" >' +
                    '<section class="m-hero-item f-x-center f-y-center context-device theme-dark" itemscope itemtype="http://schema.org/Product">' +
                    '<picture class="c-image">' +
                    '<source srcset="' + allGames[thebigid]["superheroart"] + '" media="(min-width:0)">' +
                    '<img srcset="' + allGames[thebigid]["superheroart"] + '" src="' + allGames[thebigid]["superheroart"] + '" alt="' + boxshotlocstrings.locales[urlRegion]["keyPlaceholderboxshot"].replace("<PLACEHOLDER>", allGames[thebigid]["title"]) + '">' +
                    '</picture>' +
                    '</section>' +
                    '</li>';
            } else {
                console.log(allGames[thebigid]["superheroart"]);
            }

            if (fullcarouselimages.indexOf(thebigid) !== -1) {
                //var fullimageclass = " carfullimage"; // this was in to resize images to satisfy stakeholders. -EL 11/4/20
                var fullimageclass = "";
            } else {
                var fullimageclass = "";
            }

            var randchars = makerand10();

            therotator = '<div class="c-carousel f-multi-slide f-auto-play' + fullimageclass + '" role="region" aria-label="Autoplay carousel" data-js-interval="6000">' +
                '<div class="c-group">' +
                '<div class="c-sequence-indicator" role="tablist">' +
                buttonhtml +
                '</div>' +
                '<button class="c-action-toggle c-glyph glyph-play f-toggle high-contrast" data-toggled-label="Pause" data-toggled-glyph="glyph-pause" aria-label="Play" ' +
                'aria-describedby="tooltip' + randchars + '" data-toggle="tooltip">' +
                '<span id="tooltip' + randchars + '" class="c-tooltip" role="tooltip" aria-hidden="true">Play or pause this rotator</span>' +
                '</button>' +
                '</div>' +
                '<button class="c-flipper f-previous" aria-hidden="true" tabindex="-1"></button>' +
                '<button class="c-flipper f-next" aria-hidden="true" tabindex="-1"></button>' +
                '<div itemscope itemtype="http://schema.org/ItemList">' +
                '<ul>' +
                screenhtml +
                '</ul>' +
                '</div>' +
                '</div>'
        }

        if ($(this).closest(".gameDiv").find(".poprotator .c-carousel").length === 0 && allGames[thebigid]["physical"] === "false") {
            $(this).closest(".gameDiv").find(".poprotator").prepend(therotator);
            mwf.ComponentFactory.create([
                { component: mwf.MultiSlideCarousel }
            ]);
        } else if ($(this).closest(".gameDiv").find(".poprotator img").length === 0 && allGames[thebigid]["physical"] === "true") {
            $(this).closest(".gameDiv").find(".poprotator").css("border-bottom", "1px grey solid").prepend(therotator);
        }
        // open popup dark background
        $("body").append('<div id="page-cover"></div>');
        $('body').addClass('stop-scrolling')

    })

    $(document).on("keypress", ".qlButton a", function(event) {
        if ((event.keyCode == 13) || (event.keyCode == 32)) {
            event.preventDefault();
            $(this).click();
        }
    })
    $(document).on("keypress", ".qlButtonFunc a", function(event) {
        if ((event.keyCode == 13) || (event.keyCode == 32)) {
            event.preventDefault();
            $(this).click();
        }
    })

    $(document).on("click", "#page-cover", function() {
        $(".gameMoreInfo.popupShow .qclosebutton").click();
        $("#page-cover").remove();
        $('body').removeClass('stop-scrolling')

    })

    $(document).on("click", ".qclosebutton", function(e) {
        e.preventDefault();
        $(".gameMoreInfo.popupShow").closest(".gameDiv").find(".gameDivLink").eq(0).focus();
        $(".gameMoreInfo").removeClass("popupShow");
        $("#page-cover").remove();
        $('body').removeClass('stop-scrolling')

    })

    $(document).on("keypress", ".qclosebutton", function(event) {
        if ((event.keyCode == 32) || (event.keyCode == 13)) {
            event.preventDefault();
            $(this).click();
        }
    })

    // Escape Key for Filter
    setTimeout(function() {
        $(".genretext").attr("data-bi-bhvr", "REDUCE");
        $(".featurestext").attr("data-bi-bhvr", "REDUCE");
        $(".maturitytext").attr("data-bi-bhvr", "REDUCE");
    }, 600);

    $(document).on("keydown", "#genreSelect .c-refine-item", function(event) {
        if (event.keyCode == 27) {
            $(".genretext").attr("data-bi-bhvr", "REDUCE");
            $(".genretext").attr("aria-live", "soft");
            $(".genretext").focus();
            setTimeout(function() {
                $(".genretext").click();
            }, 1);
        }
    })

    $(document).on("keydown", "#featureSelect .c-refine-item", function(event) {
        if (event.keyCode == 27) {
            $(".featurestext").attr("data-bi-bhvr", "REDUCE");
            $(".featurestext").attr("aria-live", "soft");
            $(".featurestext").focus();
            setTimeout(function() {
                $(".featurestext").click();
            }, 1);
        }
    })

    $(document).on("keydown", "#ratingSelect .c-refine-item", function(event) {
        if (event.keyCode == 27) {
            $(".maturitytext").attr("data-bi-bhvr", "REDUCE");
            $(".maturitytext").attr("aria-live", "soft");
            $(".maturitytext").focus();
            setTimeout(function() {
                $(".maturitytext").click();
            }, 1);
        }
    })

    // $(document).on("click", "#ratingSelect .c-refine-item", function(event) {
    //   var ratingtargetli = $(this).closest("li").data("ratingage").toString();
    //   setTimeout(function() {
    //     $('[data-ratingage="' + ratingtargetli + '"]').find("a")[0].focus();
    //   }, 1000);
    // })

    // menu button in mobile
    $(".mobileMenuToggle button").on("click", function() {
        $(".gameSelectors").slideToggle();
        if ($(this).attr("aria-expanded") === "false") {
            $(this).attr("aria-expanded", "true");
        } else {
            $(this).attr("aria-expanded", "false");
            var btttop = $("#searchcontainer").position().top;
            $("HTML, BODY").animate({
                scrollTop: btttop
            }, 500);
        }
    })
    $(".filterClose a").on("click", function(e) {
        e.preventDefault();
        $(".gameSelectors").slideToggle();
        if ($(".mobileMenuToggle button").attr("aria-expanded") === "false") {
            $(".mobileMenuToggle button").attr("aria-expanded", "true");
        } else {
            $(".mobileMenuToggle button").attr("aria-expanded", "false");
            var btttop = $("#searchcontainer").position().top;
            $("HTML, BODY").animate({
                scrollTop: btttop
            }, 500);
        }
    })

    $('#bttbutton').click(function(e) {
        var btttop = $("#searchcontainer").position().top;
        $("HTML, BODY").animate({
            scrollTop: btttop
        }, 500);
        $(".searchgroup input").eq(0).focus()
    });

    $(".c-select-menu li").click(function() {
        $(".gameDivLink").first().eq(0).focus();
    })

    $(document).on("mouseenter", ".c-glyph.f-toggle", function() {
        var idtoshow = "#" + $(this).attr("aria-describedby");
        setTimeout(function() {
            $(idtoshow).show();
        }, 500)
    })
    $(document).on("mouseleave", ".c-glyph.f-toggle", function() {
        var idtoshow = "#" + $(this).attr("aria-describedby");
        setTimeout(function() {
            $(idtoshow).hide();
        }, 510)
    })

    function makerand10() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    // jQuery slideToggle inserts inline styles that break stuff >767. This removes those styles.
    var resizeInterval = false;

    function resizeCheck() {
        if (window.innerWidth > 767) {
            $(".gameSelectors").attr("style", "");
        }
        clearInterval(resizeInterval);
        resizeInterval = false;
    }

    window.onresize = function() {
        if (!resizeInterval) {
            resizeInterval = setInterval(resizeCheck, 200);
        }
    }


});

quickLookLocStrings = {
    "locales": {
        "keys": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimized for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-us": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimized for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "ar-ae": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "ar-sa": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "cs-cz": {
            "keyAddtowishlist": "Přidat do seznamu přání",
            "keyOptimizedforxboxseriesxs": "Optimalizováno pro Xbox Series X|S",
            "keySmartdelivery": "Inteligentní doručení",
            "keyCloudenabled": "Cloudové",
            "keyPc": "PC",
            "keyMobile": "Mobilní zařízení",
            "keyGetitnow": "POŘIĎTE SI JI JEŠTĚ DNES",
            "keyPreordernow": "PŘEDOBJEDNAT",
            "keyScreenshot": "snímek obrazovky"
        },
        "da-dk": {
            "keyAddtowishlist": "Føj til ønskeliste",
            "keyOptimizedforxboxseriesxs": "Optimeret til Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloudaktiveret",
            "keyPc": "Pc",
            "keyMobile": "Mobil",
            "keyGetitnow": "FÅ DET NU",
            "keyPreordernow": "FORUDBESTIL NU",
            "keyScreenshot": "skærmbillede"
        },
        "de-at": {
            "keyAddtowishlist": "Zur Wunschliste hinzufügen",
            "keyOptimizedforxboxseriesxs": "Optimiert für Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloudfähig",
            "keyPc": "PC",
            "keyMobile": "Handy",
            "keyGetitnow": "JETZT KAUFEN",
            "keyPreordernow": "JETZT VORBESTELLEN",
            "keyScreenshot": "Screenshot"
        },
        "de-ch": {
            "keyAddtowishlist": "Zur Wunschliste hinzufügen",
            "keyOptimizedforxboxseriesxs": "Optimiert für Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloudfähig",
            "keyPc": "PC",
            "keyMobile": "Handy",
            "keyGetitnow": "JETZT KAUFEN",
            "keyPreordernow": "JETZT VORBESTELLEN",
            "keyScreenshot": "Screenshot"
        },
        "de-de": {
            "keyAddtowishlist": "Zur Wunschliste hinzufügen",
            "keyOptimizedforxboxseriesxs": "Optimiert für Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloudfähig",
            "keyPc": "PC",
            "keyMobile": "Handy",
            "keyGetitnow": "JETZT KAUFEN",
            "keyPreordernow": "JETZT VORBESTELLEN",
            "keyScreenshot": "Screenshot"
        },
        "el-gr": {
            "keyAddtowishlist": "Προσθήκη στη λίστα επιθυμιών",
            "keyOptimizedforxboxseriesxs": "Βελτιστοποιημένο για Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Με δυνατότητα cloud",
            "keyPc": "PC",
            "keyMobile": "Κινητό",
            "keyGetitnow": "ΑΠΟΚΤΗΣΤΕ ΤΟ ΤΩΡΑ",
            "keyPreordernow": "ΠΡΟ-ΠΑΡΑΓΓΕΛΙΑ ΤΩΡΑ",
            "keyScreenshot": "στιγμιότυπο"
        },
        "en-au": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-ca": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimized for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-gb": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-hk": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-ie": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-in": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-nz": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-sg": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "en-za": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "es-ar": {
            "keyAddtowishlist": "Añadir a la lista de deseos",
            "keyOptimizedforxboxseriesxs": "Optimizado para Xbox Series X|S",
            "keySmartdelivery": "Entrega inteligente",
            "keyCloudenabled": "Habilitados para la nube",
            "keyPc": "PC",
            "keyMobile": "Dispositivos móviles",
            "keyGetitnow": "CONSÍGUELO AHORA",
            "keyPreordernow": "RESERVA AHORA",
            "keyScreenshot": "captura de pantalla"
        },
        "es-cl": {
            "keyAddtowishlist": "Añadir a la lista de deseos",
            "keyOptimizedforxboxseriesxs": "Optimizado para Xbox Series X|S",
            "keySmartdelivery": "Entrega inteligente",
            "keyCloudenabled": "Habilitados para la nube",
            "keyPc": "PC",
            "keyMobile": "Dispositivos móviles",
            "keyGetitnow": "CONSÍGUELO AHORA",
            "keyPreordernow": "RESERVA AHORA",
            "keyScreenshot": "captura de pantalla"
        },
        "es-co": {
            "keyAddtowishlist": "Añadir a la lista de deseos",
            "keyOptimizedforxboxseriesxs": "Optimizado para Xbox Series X|S",
            "keySmartdelivery": "Entrega inteligente",
            "keyCloudenabled": "Habilitados para la nube",
            "keyPc": "PC",
            "keyMobile": "Dispositivos móviles",
            "keyGetitnow": "CONSÍGUELO AHORA",
            "keyPreordernow": "RESERVA AHORA",
            "keyScreenshot": "captura de pantalla"
        },
        "es-es": {
            "keyAddtowishlist": "Añadir a la lista de deseos",
            "keyOptimizedforxboxseriesxs": "Optimizado para Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Habilitados para la nube",
            "keyPc": "PC",
            "keyMobile": "Dispositivos móviles",
            "keyGetitnow": "CONSÍGUELO HOY",
            "keyPreordernow": "RESERVAR AHORA",
            "keyScreenshot": "captura de pantalla"
        },
        "es-mx": {
            "keyAddtowishlist": "Añadir a la lista de deseos",
            "keyOptimizedforxboxseriesxs": "Optimizado para Xbox Series X|S",
            "keySmartdelivery": "Entrega inteligente",
            "keyCloudenabled": "Habilitados para la nube",
            "keyPc": "PC",
            "keyMobile": "Dispositivos móviles",
            "keyGetitnow": "CONSÍGUELO AHORA",
            "keyPreordernow": "RESERVA AHORA",
            "keyScreenshot": "captura de pantalla"
        },
        "fi-fi": {
            "keyAddtowishlist": "Lisää toivomusluetteloon",
            "keyOptimizedforxboxseriesxs": "Optimoitu Xbox Series X|S:lle",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Pilvipohjainen",
            "keyPc": "PC:LLE",
            "keyMobile": "Mobiili",
            "keyGetitnow": "HANKI SE NYT",
            "keyPreordernow": "TILAA ENNAKKOON NYT",
            "keyScreenshot": "näyttökuva"
        },
        "fr-be": {
            "keyAddtowishlist": "Ajouter à la liste de souhaits",
            "keyOptimizedforxboxseriesxs": "Optimisé pour Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Compatible avec le cloud",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "ACHETEZ-LE DÈS MAINTENANT",
            "keyPreordernow": "PRÉCOMMANDER MAINTENANT",
            "keyScreenshot": "capture d’écran"
        },
        "fr-ca": {
            "keyAddtowishlist": "Ajouter à la liste de souhaits",
            "keyOptimizedforxboxseriesxs": "Optimisé pour la Xbox Series X|S",
            "keySmartdelivery": "Livraison intelligente",
            "keyCloudenabled": "Compatible avec le jeu en nuage",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "OBTENEZ-LE MAINTENANT",
            "keyPreordernow": "PRÉCOMMANDER MAINTENANT",
            "keyScreenshot": "capture d’écran"
        },
        "fr-ch": {
            "keyAddtowishlist": "Ajouter à la liste de souhaits",
            "keyOptimizedforxboxseriesxs": "Optimisé pour Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Compatible avec le cloud",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "ACHETEZ-LE DÈS MAINTENANT",
            "keyPreordernow": "PRÉCOMMANDER MAINTENANT",
            "keyScreenshot": "capture d’écran"
        },
        "fr-fr": {
            "keyAddtowishlist": "Ajouter à la liste de souhaits",
            "keyOptimizedforxboxseriesxs": "Optimisé pour Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Compatible avec le cloud",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "ACHETEZ-LE DÈS MAINTENANT",
            "keyPreordernow": "PRÉCOMMANDER MAINTENANT",
            "keyScreenshot": "capture d’écran"
        },
        "he-il": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimised for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot"
        },
        "hu-hu": {
            "keyAddtowishlist": "Hozzáadás a kívánságlistához",
            "keyOptimizedforxboxseriesxs": "Xbox Series X|S konzolra optimalizálva",
            "keySmartdelivery": "Intelligens játékletöltés",
            "keyCloudenabled": "Felhőkompatibilis",
            "keyPc": "PC",
            "keyMobile": "Mobil",
            "keyGetitnow": "SZEREZD BE MÉG MA!",
            "keyPreordernow": "RENDELD ELŐ MOST!",
            "keyScreenshot": "képernyőfelvétel"
        },
        "it-it": {
            "keyAddtowishlist": "Aggiungi all'elenco preferenze",
            "keyOptimizedforxboxseriesxs": "Ottimizzato per Xbox Series X|S",
            "keySmartdelivery": "Consegna intelligente",
            "keyCloudenabled": "Utilizzabili via cloud",
            "keyPc": "PC",
            "keyMobile": "Dispositivi mobili",
            "keyGetitnow": "ACQUISTA ORA",
            "keyPreordernow": "PREORDINA ORA",
            "keyScreenshot": "screenshot"
        },
        "ja-jp": {
            "keyAddtowishlist": "欲しい物リストに追加",
            "keyOptimizedforxboxseriesxs": "Optimized for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "クラウド対応",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "今すぐ購入",
            "keyPreordernow": "今すぐ予約する",
            "keyScreenshot": "スクリーンショット"
        },
        "ko-kr": {
            "keyAddtowishlist": "위시 리스트에 추가",
            "keyOptimizedforxboxseriesxs": "Xbox Series X|S 최적화",
            "keySmartdelivery": "스마트 딜리버리",
            "keyCloudenabled": "클라우드 활성화",
            "keyPc": "PC",
            "keyMobile": "모바일",
            "keyGetitnow": "지금 구매하세요",
            "keyPreordernow": "지금 예약 주문하기",
            "keyScreenshot": "스크린샷"
        },
        "nb-no": {
            "keyAddtowishlist": "Legg til ønskeliste",
            "keyOptimizedforxboxseriesxs": "Optimalisert for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Sky-aktivert",
            "keyPc": "PC",
            "keyMobile": "Mobil",
            "keyGetitnow": "SKAFF DEG DET NÅ",
            "keyPreordernow": "FORHÅNDSBESTILL NÅ",
            "keyScreenshot": "skjermbilde"
        },
        "nl-be": {
            "keyAddtowishlist": "Toevoegen aan verlanglijstje",
            "keyOptimizedforxboxseriesxs": "Geoptimaliseerd voor Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-geschikt",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "KOOP NU",
            "keyPreordernow": "PRE-ORDER NU",
            "keyScreenshot": "screenshot"
        },
        "nl-nl": {
            "keyAddtowishlist": "Toevoegen aan verlanglijstje",
            "keyOptimizedforxboxseriesxs": "Geoptimaliseerd voor Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-geschikt",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "KOOP NU",
            "keyPreordernow": "PRE-ORDER NU",
            "keyScreenshot": "screenshot"
        },
        "pl-pl": {
            "keyAddtowishlist": "Dodaj do listy życzeń",
            "keyOptimizedforxboxseriesxs": "Zoptymalizowane dla Xbox Series X|S",
            "keySmartdelivery": "Inteligentne pobieranie",
            "keyCloudenabled": "Z możliwością grania w chmurze",
            "keyPc": "KOMPUTER",
            "keyMobile": "Telefon komórkowy",
            "keyGetitnow": "KUP JUŻ TERAZ",
            "keyPreordernow": "ZAMÓW W PRZEDSPRZEDAŻY",
            "keyScreenshot": "zdjęcie z gry"
        },
        "pt-br": {
            "keyAddtowishlist": "Adicionar à lista de desejos",
            "keyOptimizedforxboxseriesxs": "Otimizado para Xbox Series X|S",
            "keySmartdelivery": "Entrega Inteligente",
            "keyCloudenabled": "Pronto para a nuvem",
            "keyPc": "PC",
            "keyMobile": "Dispositivos móveis",
            "keyGetitnow": "ADQUIRA AGORA",
            "keyPreordernow": "RESERVE AGORA",
            "keyScreenshot": "captura de tela"
        },
        "pt-pt": {
            "keyAddtowishlist": "Adicionar à lista de desejos",
            "keyOptimizedforxboxseriesxs": "Otimizado para a Xbox Series X|S",
            "keySmartdelivery": "Entrega Inteligente",
            "keyCloudenabled": "Preparado para a cloud",
            "keyPc": "PC",
            "keyMobile": "Dispositivos Móveis",
            "keyGetitnow": "OBTER AGORA",
            "keyPreordernow": "PRÉ-ENCOMENDAR AGORA",
            "keyScreenshot": "captura de ecrã"
        },
        "ru-ru": {
            "keyAddtowishlist": "Добавить в список желаний",
            "keyOptimizedforxboxseriesxs": "Оптимизировано для Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Поддержка облачного сервиса",
            "keyPc": "ПК",
            "keyMobile": "Мобильное устройство",
            "keyGetitnow": "ПОЛУЧИТЬ СЕЙЧАС",
            "keyPreordernow": "ОФОРМИТЬ ПРЕДЗАКАЗ",
            "keyScreenshot": "снимок экрана"
        },
        "sk-sk": {
            "keyAddtowishlist": "Pridať do zoznamu prianí",
            "keyOptimizedforxboxseriesxs": "Optimalizované pre Xbox Series X|S",
            "keySmartdelivery": "Inteligentné doručenie",
            "keyCloudenabled": "Cloudové hranie",
            "keyPc": "PC",
            "keyMobile": "Mobilné zariadenie",
            "keyGetitnow": "ZÍSKAJTE JU EŠTE DNES",
            "keyPreordernow": "PREDOBJEDNAŤ",
            "keyScreenshot": "snímka obrazovky"
        },
        "sv-se": {
            "keyAddtowishlist": "Lägg till i önskelista",
            "keyOptimizedforxboxseriesxs": "Optimerad för Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Molnaktiverat",
            "keyPc": "PC",
            "keyMobile": "Mobil",
            "keyGetitnow": "SKAFFA DET I DAG",
            "keyPreordernow": "FÖRBESTÄLL NU",
            "keyScreenshot": "skärmbild"
        },
        "tr-tr": {
            "keyAddtowishlist": "İstek listenize ekleyin",
            "keyOptimizedforxboxseriesxs": "Xbox Series X|S için Optimize Edildi",
            "keySmartdelivery": "Akıllı Teslimat",
            "keyCloudenabled": "Bulut özellikli",
            "keyPc": "BİLGİSAYAR",
            "keyMobile": "Mobil",
            "keyGetitnow": "ŞİMDİ EDİNİN",
            "keyPreordernow": "ŞİMDİ ÖN SİPARİŞ VERİN",
            "keyScreenshot": "ekran görüntüsü"
        },
        "zh-hk": {
            "keyAddtowishlist": "新增至願望清單",
            "keyOptimizedforxboxseriesxs": "Xbox Series X|S 性能最佳化",
            "keySmartdelivery": "智慧分發",
            "keyCloudenabled": "具有雲端功能",
            "keyPc": "電腦",
            "keyMobile": "行動裝置",
            "keyGetitnow": "立即購買",
            "keyPreordernow": "立即預購",
            "keyScreenshot": "畫面截圖"
        },
        "zh-tw": {
            "keyAddtowishlist": "加入願望清單",
            "keyOptimizedforxboxseriesxs": "Xbox Series X|S 性能強化",
            "keySmartdelivery": "智慧分發",
            "keyCloudenabled": "具有雲端功能",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "馬上購買",
            "keyPreordernow": "立即預購",
            "keyScreenshot": "螢幕擷取畫面"
        }
    }
}

boxshotlocstrings = {
    "locales": {
        "en-us": {
            "keyPlaceholderboxshot": "box shot of <PLACEHOLDER>"
        },
        "en-ca": {
            "keyPlaceholderboxshot": "box shot of <PLACEHOLDER>"
        },
        "de-at": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> – Verpackung"
        },
        "tr-tr": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> kutu resmi"
        },
        "en-nz": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "de-de": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> – Verpackung"
        },
        "el-gr": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "nl-nl": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> - boxshot"
        },
        "en-za": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "en-sg": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "en-gb": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "es-ar": {
            "keyPlaceholderboxshot": "Imagen de la caja de <PLACEHOLDER>"
        },
        "es-mx": {
            "keyPlaceholderboxshot": "Imagen de la caja de <PLACEHOLDER>"
        },
        "en-au": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "nb-no": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> coverbilde"
        },
        "ar-ae": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "ar-sa": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "de-ch": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> – Verpackung"
        },
        "ja-jp": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> パッケージショット"
        },
        "ko-kr": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> 박스샷"
        },
        "fr-ca": {
            "keyPlaceholderboxshot": "Image de la boîte de <PLACEHOLDER>"
        },
        "he-il": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "fi-fi": {
            "keyPlaceholderboxshot": "Pakkauksen kansi: <PLACEHOLDER>"
        },
        "pt-br": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> imagem da caixa"
        },
        "zh-hk": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> 包裝圖"
        },
        "zh-tw": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> 包裝圖"
        },
        "ru-ru": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> — обложка"
        },
        "da-dk": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> billede af æsken"
        },
        "cs-cz": {
            "keyPlaceholderboxshot": "Obrázek krabice <PLACEHOLDER>"
        },
        "es-cl": {
            "keyPlaceholderboxshot": "Imagen de la caja de <PLACEHOLDER>"
        },
        "zh-cn": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> 包装盒"
        },
        "sv-se": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> bild på förpackning"
        },
        "en-ie": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "it-it": {
            "keyPlaceholderboxshot": "Immagine della confezione di <PLACEHOLDER>"
        },
        "es-es": {
            "keyPlaceholderboxshot": "Imagen de la caja de <PLACEHOLDER>"
        },
        "fr-fr": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> image de la boîte"
        },
        "fr-be": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> image de la boîte"
        },
        "es-co": {
            "keyPlaceholderboxshot": "Imagen de la caja de <PLACEHOLDER>"
        },
        "en-hk": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "fr-ch": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> image de la boîte"
        },
        "pl-pl": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> – zdjęcie opakowania"
        },
        "hu-hu": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> dobozának képe"
        },
        "en-in": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> boxshot"
        },
        "nl-be": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> - boxshot"
        },
        "pt-pt": {
            "keyPlaceholderboxshot": "Imagem da caixa de <PLACEHOLDER>"
        },
        "sk-sk": {
            "keyPlaceholderboxshot": "<PLACEHOLDER> – obrázok balenia"
        }
    }
}

cloudLocStrings = {
  "locales": {
    "en-us": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "ar-ae": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "ar-sa": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "cs-cz": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Hrajte více než 100 vysoce kvalitních konzolových her v zařízeních, které již máte, pomocí předplatného Xbox Game Pass Ultimate."
    },
    "da-dk": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Spil over 100 kvalitetsspil til konsol på de enheder, du allerede har, med Xbox Game Pass Ultimate."
    },
    "de-at": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Spiele mit Xbox Game Pass Ultimate über 100 großartige Konsolenspiele auf den Geräten, die du bereits besitzt."
    },
    "de-ch": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Spiele mit Xbox Game Pass Ultimate über 100 großartige Konsolenspiele auf den Geräten, die du bereits besitzt."
    },
    "de-de": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Spiele mit Xbox Game Pass Ultimate über 100 großartige Konsolenspiele auf den Geräten, die du bereits besitzt."
    },
    "el-gr": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Παίξτε περισσότερα από 100 παιχνίδια υψηλής ποιότητας για κονσόλα, στις συσκευές που ήδη έχετε με το Xbox Game Pass Ultimate."
    },
    "en-au": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-ca": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-gb": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-hk": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-ie": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-in": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-nz": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-sg": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "en-za": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "es-ar": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Juega más de 100 títulos de consola de alta calidad en los dispositivos que ya tienes con Xbox Game Pass Ultimate."
    },
    "es-cl": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Juega más de 100 títulos de consola de alta calidad en los dispositivos que ya tienes con Xbox Game Pass Ultimate."
    },
    "es-co": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Juega más de 100 títulos de consola de alta calidad en los dispositivos que ya tienes con Xbox Game Pass Ultimate."
    },
    "es-es": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Disfruta de más de 100 juegos de alta calidad en los dispositivos que ya tienes con Xbox Game Pass Ultimate."
    },
    "es-mx": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Juega más de 100 títulos de consola de alta calidad en los dispositivos que ya tienes con Xbox Game Pass Ultimate."
    },
    "fi-fi": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Pelaa yli 100 korkealaatuista konsolipeliä jo olemassa olevissa laitteissa Xbox Game Pass Ultimaten avulla."
    },
    "fr-be": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Jouez à plus de 100 titres console exceptionnels sur les appareils que vous possédez déjà avec le Xbox Game Pass Ultimate."
    },
    "fr-ca": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Jouez à plus de 100 jeux de console de grande qualité sur les appareils que vous possédez déjà avec Xbox Game Pass Ultimate."
    },
    "fr-ch": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Jouez à plus de 100 titres console exceptionnels sur les appareils que vous possédez déjà avec le Xbox Game Pass Ultimate."
    },
    "fr-fr": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Jouez à plus de 100 titres console exceptionnels sur les appareils que vous possédez déjà avec le Xbox Game Pass Ultimate."
    },
    "he-il": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Play 100+ high-quality console games on the devices you already have with Xbox Game Pass Ultimate."
    },
    "hu-hu": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Játssz több mint 100 kiváló minőségű játékkal a már meglévő eszközeiden az Xbox Game Pass Ultimate előfizetéseddel."
    },
    "it-it": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Gioca a più di 100 titoli di grande qualità sui dispositivi che già possiedi con Xbox Game Pass Ultimate."
    },
    "ja-jp": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Xbox Game Pass Ultimate では、100種類以上のハイクオリティなコンソール ゲームを、お手持ちのデバイスでお楽しみいただけます。"
    },
    "ko-kr": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Xbox Game Pass 얼티밋으로 이미 가지고 있는 디바이스에서 다양한 고품질 콘솔 게임을 플레이하세요."
    },
    "nb-no": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Spill over 100 høykvalitetsspill på konsoll på enhetene du allerede har, med Xbox Game Pass Ultimate."
    },
    "nl-be": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Speel meer dan 100 geweldige consolegames op de apparaten die je al hebt met Xbox Game Pass Ultimate."
    },
    "nl-nl": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Speel meer dan 100 geweldige consolegames op de apparaten die je al hebt met Xbox Game Pass Ultimate."
    },
    "pl-pl": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Graj w ponad 100 wysokiej jakości gier na urządzeniach, które już masz w ramach subskrypcji Xbox Game Pass Ultimate."
    },
    "pt-br": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Jogue mais de 100 jogos de console de alta qualidade nos dispositivos que você já possui com o Xbox Game Pass Ultimate."
    },
    "pt-pt": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Joga mais de 100 jogos de consola de alta qualidade nos dispositivos que já tens com o Xbox Game Pass Ultimate."
    },
    "ru-ru": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Играйте более чем в 100 высококачественных консольных игр на устройствах, которые у вас уже есть, с помощью Xbox Game Pass Ultimate."
    },
    "sk-sk": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Hrajte viac ako 100 vysokokvalitných hier pre konzolu na zariadeniach, ktoré už máte, s predplatným Xbox Game Pass Ultimate."
    },
    "sv-se": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "Spela fler än 100 högkvalitativa konsolspel på de enheter som du redan har med Xbox Game Pass Ultimate."
    },
    "tr-tr": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "100'ün üzerinde yüksek kaliteli konsol oyununu Xbox Game Pass Ultimate ile halihazırda sahip olduğunuz cihazlarda oynayın."
    },
    "zh-hk": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "使用 Xbox Game Pass Ultimate 在您已經擁有的裝置上，暢玩超過 100 款高品質主機遊戲。"
    },
    "zh-tw": {
      "keyCloudbannerheadline": "Xbox Cloud Gaming (Beta)",
      "keyCloudbannerparagraph": "在您的裝置上透過 Xbox Game Pass Ultimate 遊玩 100 多款高品質主機遊戲。"
    }
  }
}

eaplaystrings = {
  "locales": {
    "en-us": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "ar-ae": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "ar-sa": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "cs-cz": {
      "keyWitheaplay": "<<PLACEHOLDER>> NA SLUŽBĚ EA PLAY S PŘEDPLATNÝM XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> S PŘEDPLATNÝM XBOX GAME PASS"
    },
    "da-dk": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY MED XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MED XBOX GAME PASS"
    },
    "de-at": {
      "keyWitheaplay": "<<PLACEHOLDER>> ÜBER EA PLAY MIT XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MIT XBOX GAME PASS"
    },
    "de-ch": {
      "keyWitheaplay": "<<PLACEHOLDER>> ÜBER EA PLAY MIT XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MIT XBOX GAME PASS"
    },
    "de-de": {
      "keyWitheaplay": "<<PLACEHOLDER>> ÜBER EA PLAY MIT XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MIT XBOX GAME PASS"
    },
    "el-gr": {
      "keyWitheaplay": "<<PLACEHOLDER>> ΜΕΣΩ ΤΟΥ EA PLAY ΜΕ ΤΟ XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> ΜΕ ΤΟ XBOX GAME PASS"
    },
    "en-au": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-ca": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-gb": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-hk": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-ie": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-in": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-nz": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-sg": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "en-za": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "es-ar": {
      "keyWitheaplay": "<<PLACEHOLDER>> A TRAVÉS DE EA PLAY CON XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> CON XBOX GAME PASS"
    },
    "es-cl": {
      "keyWitheaplay": "<<PLACEHOLDER>> A TRAVÉS DE EA PLAY CON XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> CON XBOX GAME PASS"
    },
    "es-co": {
      "keyWitheaplay": "<<PLACEHOLDER>> A TRAVÉS DE EA PLAY CON XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> CON XBOX GAME PASS"
    },
    "es-es": {
      "keyWitheaplay": "<<PLACEHOLDER>> A TRAVÉS DE EA PLAY CON XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> CON XBOX GAME PASS"
    },
    "es-mx": {
      "keyWitheaplay": "<<PLACEHOLDER>> A TRAVÉS DE EA PLAY CON XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> CON XBOX GAME PASS"
    },
    "fi-fi": {
      "keyWitheaplay": "<<PLACEHOLDER>> XBOX GAME PASS ULTIMATEEN KUULUVALLA EA PLAYLLA",
      "keyWithxgp": "<<PLACEHOLDER>> XBOX GAME PASSILLA"
    },
    "fr-be": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY AVEC LE XBOX GAME PASS",
      "keyWithxgp": "<<PLACEHOLDER>> AVEC LE XBOX GAME PASS"
    },
    "fr-ca": {
      "keyWitheaplay": "<<PLACEHOLDER>> PAR L’ENTREMISE D’EA PLAY AVEC XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> AVEC XBOX GAME PASS"
    },
    "fr-ch": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY AVEC LE XBOX GAME PASS",
      "keyWithxgp": "<<PLACEHOLDER>> AVEC LE XBOX GAME PASS"
    },
    "fr-fr": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY AVEC LE XBOX GAME PASS",
      "keyWithxgp": "<<PLACEHOLDER>> AVEC LE XBOX GAME PASS"
    },
    "he-il": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY WITH XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> WITH XBOX GAME PASS"
    },
    "hu-hu": {
      "keyWitheaplay": "<<PLACEHOLDER>> EA PLAYJEL XBOX GAME PASS ULTIMATE ELŐFIZETÉSSEL",
      "keyWithxgp": "<<PLACEHOLDER>> XBOX GAME PASS ELŐFIZETÉSSEL"
    },
    "it-it": {
      "keyWitheaplay": "<<PLACEHOLDER>> TRAMITE EA PLAY CON XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> CON XBOX GAME PASS"
    },
    "ja-jp": {
      "keyWitheaplay": "XBOX GAME PASS ULTIMATE で EA PLAY から <<PLACEHOLDER>>",
      "keyWithxgp": "XBOX GAME PASS で <<PLACEHOLDER>>"
    },
    "ko-kr": {
      "keyWitheaplay": "XBOX GAME PASS ULTIMATE로 EA 플레이를 통해 <<PLACEHOLDER>> 즐기기",
      "keyWithxgp": "XBOX GAME PASS로 <<PLACEHOLDER>> 즐기기"
    },
    "nb-no": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY MED XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MED XBOX GAME PASS"
    },
    "nl-be": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY MET XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MET XBOX GAME PASS"
    },
    "nl-nl": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY MET XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MET XBOX GAME PASS"
    },
    "pl-pl": {
      "keyWitheaplay": "<<PLACEHOLDER>> ZA POŚREDNICTWEM EA PLAY W RAMACH SUBSKRYPCJI XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> W RAMACH SUBSKRYPCJI XBOX GAME PASS"
    },
    "pt-br": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY COM XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> INCLUÍDO COM O XBOX GAME PASS"
    },
    "pt-pt": {
      "keyWitheaplay": "<<PLACEHOLDER>> ATRAVÉS DO EA PLAY COM XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> INCLUÍDO NO XBOX GAME PASS"
    },
    "ru-ru": {
      "keyWitheaplay": "<<PLACEHOLDER>> ЧЕРЕЗ EA PLAY С XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> С XBOX GAME PASS"
    },
    "sk-sk": {
      "keyWitheaplay": "<<PLACEHOLDER>> PROSTREDNÍCTVOM EA PLAY S PREDPLATNÝM XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> S PREDPLATNÝM XBOX GAME PASS"
    },
    "sv-se": {
      "keyWitheaplay": "<<PLACEHOLDER>> VIA EA PLAY MED XBOX GAME PASS ULTIMATE",
      "keyWithxgp": "<<PLACEHOLDER>> MED XBOX GAME PASS"
    },
    "tr-tr": {
      "keyWitheaplay": "XBOX GAME PASS ULTIMATE İLE EA PLAY ÜZERİNDEN <<PLACEHOLDER>>",
      "keyWithxgp": "XBOX GAME PASS İLE <<PLACEHOLDER>>"
    },
    "zh-hk": {
      "keyWitheaplay": "使用 XBOX GAME PASS ULTIMATE 透過 EA PLAY 暢玩 <<PLACEHOLDER>>",
      "keyWithxgp": "使用 XBOX GAME PASS 暢玩 <<PLACEHOLDER>>"
    },
    "zh-tw": {
      "keyWitheaplay": "<<PLACEHOLDER>> 透過 EA PLAY 與 XBOX GAME PASS ULTIMATE 遊玩",
      "keyWithxgp": "<<PLACEHOLDER>> 透過 XBOX GAME PASS 遊玩"
    }
  }
}