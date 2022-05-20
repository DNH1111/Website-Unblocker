// BackCompat
$(document).ready(function() {

    if ($(".CatAnnounce").length === 0) {
        $("body").append('<div style="width:0;height:0;font-size:0;" class="CatAnnounce" aria-live="assertive"></div>');
      }
    $(".icon-redeem a").removeAttr("data-retailer");
    regionContent = globalContent.locales[urlRegion];
    paginateclick = 0;
    // Games Per Page Filter 
    var userAgentString = navigator.userAgent;
    var is_screen_touched = false;

    if (userAgentString.indexOf("Trident") >= 0) { //only IE browsers

        $('.filterMenu select option').text(regionContent["keyGpptext"]);

        $('.filterMenu select option').eq(0).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "20 "))
        $('.filterMenu select option').eq(1).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "50 "))
        $('.filterMenu select option').eq(2).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "100 "))
        $('.filterMenu select option').eq(3).text(regionContent["keyGpptext"].replace('<PLACEHOLDER>', "200 "))

        var amountGamesShown = $('.filterMenu select');
        var amountGames = $('.pag-20').data('gamesmax'); //EL added, was 50

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
        var amountGames = $('.pag-20').data('gamesmax'); //EL added, was 50

        amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", amountGames + ' '));

        $(document).on("click", ".paginateDropdown li", function() {
            var gppnumber = $(this).data('gamesmax');
            $('.filterMenu button').attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
            amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
        });
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

    // function removedups(arr) {
    //   var exist = {};
    //   var keep = [];
    //   for (var i = 0; i < arr.length; i++) {
    //       if (!(arr[i] in exist)) {
    //           keep.push(arr[i]);
    //           exist[arr[i]] = true;
    //       }
    //   }
    //   return keep;
    // }

    // get lists from new API
    //fullGameArray = [];
    //gameIdArrays = {};
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
        fullGameArray = [];
        excludebids = [];
        $.get(indieUrl)
            .done(function(listData) {
                listData.Items.forEach(function(b) {
                    gameIdArrays["indie"].push(b.Id);
                })
            })

        // grab cloud sigl list
        var cloudUrl = "https://catalog.gamepass.com/sigls/v2?id=29a81209-df6f-41fd-a528-2ae6b91f719c&language=" + urlRegion.split("-")[0] + "&market=" + urlRegion.split("-")[1];
        $.get(cloudUrl)
            .done(function(listData) {
                listData.forEach(function(b) {
                    if (gameIdArrays["cloud"].indexOf(b.id) === -1 && b.id !== undefined) {
                        gameIdArrays["cloud"].push(b.id);
                    }
                })
                mainLists();
            })


        // main list arrays
        function mainLists() {
            //console.log("indie games " + gameIdArrays["indie"]); //EL added
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
                                        recodone();
                                        clearInterval(recoactivecheck);
                                    }
                                }, 500);
                            }
                        })
                })(i);
            }
        }

        // capability list arrays
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
                                    }
                                })
                                if (totalitems > 200) {
                                    var chunks = Math.ceil(totalitems / 200)
                                    largeList(listUrl, arrayname, chunks, true);
                                }
                            })
                    })(j);
                }
            })(i);
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
                                    }
                                } else {
                                    if (excludebids.indexOf(e.Id) === -1) {
                                        gameIdArrays[arrayname].push(e.Id);
                                    }
                                    if (fullGameArray.indexOf(e.Id) === -1 && excludebids.indexOf(e.Id) === -1) {
                                        fullGameArray.push(e.Id);
                                    }
                                }
                            })
                        })
                })(i);
            }
        }

        function recodone() {
            //fullGameArray = []; grabbing from xcat-bi-urls2
            //console.log("the current list is " + gameIdArrays["cloud"]); //EL added
            for (var i = 0; i < listArray.length; i++) {
                var arrayname = listArray[i].split(":")[1];
                //fullGameArray = fullGameArray.concat(gameIdArrays[arrayname]);
                //fullGameArray = removedups(fullGameArray);
                for (var j = 0; j < gameIdArrays[arrayname].length; j++) {
                    var foundOldGame = false;
                    if (fullGameArray.indexOf(gameIdArrays[arrayname][j]) === -1 && excludebids.indexOf(gameIdArrays[arrayname][j]) === -1) {
                        fullGameArray.push(gameIdArrays[arrayname][j])
                    }

                    //Looking for non-xbox one games, and adding to xbox one list if it isnt one
                    for (var k = 0; k < gameIdArrays["xboxone"].length; k++) {
                        if (gameIdArrays[arrayname][j] == gameIdArrays["xboxone"][k]) {
                            foundOldGame = true;
                            break;
                        }
                    }
                    if (!foundOldGame) {
                        //console.log("checking against full list");
                        for (var n = 0; n < gameIdArrays["fullXboxOne"].length; n++) {
                            if (gameIdArrays[arrayname][j] == gameIdArrays["fullXboxOne"][n]) {
                                foundOldGame = true;
                                gameIdArrays["fullXboxOne"].splice(n, 1); // Removing found xbox one game from provided master list
                                //console.log("found this game: " + gameIdArrays[arrayname][j]);
                                break;
                            }
                        }
                    }
                    if (!foundOldGame) {
                        for (var l = 0; l < gameIdArrays["xboxOG"].length; l++) {
                            if (gameIdArrays[arrayname][j] == gameIdArrays["xboxOG"][l]) {
                                foundOldGame = true;
                                break;
                            }
                        }
                    }
                    if (!foundOldGame) {
                        for (var m = 0; m < gameIdArrays["xbox360"].length; m++) {
                            if (gameIdArrays[arrayname][j] == gameIdArrays["xbox360"][m]) {
                                foundOldGame = true;
                                break;
                            }
                        }
                    }
                    if (!foundOldGame) {
                        //console.log("found " + gameIdArrays[arrayname][j]);
                        gameIdArrays["xboxone"].push(gameIdArrays[arrayname][j]);
                    }

                }
            }
            //console.log(gameIdArrays["fullXboxOne"]);
            //console.log(gameIdArrays["fullXboxOne"].length);
            //console.log(gameIdArrays["xboxone"]);

            for (var n = 0; n < gameIdArrays["fullXboxOne"].length; n++) {
                fullGameArray.push(gameIdArrays["fullXboxOne"][n]); // Adding remaining Xbox one games from master list to working list
                gameIdArrays["xboxone"].push(gameIdArrays["fullXboxOne"][n]);
            }

            //console.log(gameIdArrays["xboxone"]);

            for (var j = 0; j < gameIdArrays["cloud"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["cloud"][j]) === -1 && excludebids.indexOf(gameIdArrays["cloud"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["cloud"][j])
                }
            }
            for (var j = 0; j < gameIdArrays["xboxOG"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["xboxOG"][j]) === -1 && excludebids.indexOf(gameIdArrays["xboxOG"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["xboxOG"][j])
                }
            }
            for (var j = 0; j < gameIdArrays["xbox360"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["xbox360"][j]) === -1 && excludebids.indexOf(gameIdArrays["xbox360"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["xbox360"][j])
                }
            }
            for (var j = 0; j < gameIdArrays["fpsBoostSeriesX"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["fpsBoostSeriesX"][j]) === -1 && excludebids.indexOf(gameIdArrays["fpsBoostSeriesX"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["fpsBoostSeriesX"][j])
                }
            }
            for (var j = 0; j < gameIdArrays["fpsBoostSeriesS"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["fpsBoostSeriesS"][j]) === -1 && excludebids.indexOf(gameIdArrays["fpsBoostSeriesS"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["fpsBoostSeriesS"][j])
                }
            }
            for (var j = 0; j < gameIdArrays["autoHDR"].length; j++) {
                if (fullGameArray.indexOf(gameIdArrays["autoHDR"][j]) === -1 && excludebids.indexOf(gameIdArrays["autoHDR"][j]) === -1) {
                    fullGameArray.push(gameIdArrays["autoHDR"][j])
                }
            }
            popJSON();
        }

    })();

    function popJSON() {
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
            //console.log("full game array " + fullGameArray);
            //var tempBCAray = ["C1LM235H6FZ1", "9NN50LXZT18Z", "BS7SQNNRB28W", "9NVQBQ3F6W9W", "BTCS0LP052HL", "BRG51C5MWFSG", "C3DR0Z8LB53L", "C3R4Z5101DZ4", "BVFB8CBS75R6", "C4B8XR1LCXR5", "BT3QT07V2TGC", "C01MSK2X5HPQ", "BW6GCCJ41VM6", "C2P985H1H42H", "BTHC2G28X9H4", "C4ZP7QZGKC7D", "C02H769DRLQX", "C40FNR9XDVK5", "C0KB8NGFN0TS", "C3BGK0R0KP38", "C17KKS83S9GS", "C3LNP2Q4422J", "BW1PR6CD4S5Z", "C5HHPG1TXDNG", "C12N0W3G401J", "BXV0G44K5JVM", "BPK3L1W8N5GW", "BSRKCPSS0QTD", "BZSWRLXJM182", "BPV56ZX2B8PJ", "BS7CR1KN2W1H", "C4HZPD19R8B8", "BQ4GD4LDGLTB", "BRJB0RMH33T2", "BS8LFD7729CL", "BXVCFBJBNS17", "BX3K6CDNQK97", "BWV6WF6XMFZX", "C46H5R7GT7X9", "BX5CP6DSFW55", "BQR5K462GR3M", "BTFJZ37GDLKK", "C02CNLRP4Q85", "BS6D3CZSMMN2", "BQG7DH2SWF0V", "C3FNJLM45CCC", "BXBTDPZSVFT4", "BWHXZBV41QS1", "BZ46NPQNX334", "BP8JV4W9MXSJ", "C493V31WXV80", "BW08NW03FX4R", "BWNH50G9CZMC", "BSNZHRCKC13J", "BQ48FH11C9P2", "BSJK0B2ZQ5J1", "C12853ZXS6PF", "BRJSGD1HZ136", "BQ33Q6SJCSCX", "C1L4R4054BQF", "C1LM235H6FZ1", "C0R6V9DD2FL3", "BQFNTGXQ1PLK", "BTJH13V09GBF", "BZC8PXK6S00G", "BTS5B1V6434S", "BNVMH8NVCRCT", "BX2JJ48F0CKR", "C0VN7PVQJ8C2", "C0PGHN9PQN72", "C4R5PF77SPCG", "BRB4G4F7920V", "BPN103KDBX2H", "C0GN1MPFC716", "C04N36F2PNRM", "BSVLH08D3Q5R", "BWTR8ZCRND20", "BT3L7MVTD4QF", "BR8C26FGQ9QQ", "BZ7XNRJ1JT9P", "BQ30J3N2LPZX", "C1QQ7GM9HLKG", "C05R27RMJ9SJ", "BRN6BHDHB58J", "C0JN2J76L7C9", "BQ81KKJMM7ZD", "BX0TRXMTRV80", "C13VTXTLMDQ0", "BZ5FXSHHP5SV", "C34MG6M35D3S", "C5FVH1MHKL4W", "BTXM0C9C3B1S", "BR7QJW8V9L2S", "C1WVQ7XBFDDZ", "C28HP82H7MN8", "BTBMZQ3FM2V8", "BVXR4C8LTHS1", "C4XX6JL0N0DM", "BX4447D04HSM", "C3696D3MZFQZ", "BSZFG9VGJDLP", "BWTW7V0CMPPK", "BTJGX158Z7TZ", "C2HGK9J5367F", "BQ8S2HK3ZSD7", "C2TWKQT4VGVV", "C58RFNLTLSXL", "C0NDKFJXW9SZ", "BRC33X34H2C9", "C04KH9Z8WGXZ", "BZGPBRQ3LZ7G", "BVMNMC4J8KLH", "BPBWQZRC5JGG", "BTX66HLTFPWR", "C5DZFZ6NC5SQ", "C45VFZ2P7GX2", "BNP6JNF5K4MF", "C22XXGLL7TG5", "C3WX803ZX8SD", "BZ6XWGQZK45H", "C584PXCBBB6S", "C20VTWP4248L", "BX4W48FFQJPV", "C301C07TSCDJ", "C1Q14RM5224Q", "C2N2L6MHMV34", "C1K9426124PR", "BVMGCSX6XPC9", "C1QJM5XT9SXV", "BS9CGQPQ86NK", "C2NNGCPR2XP8", "BXZLCHZT8NDF", "C4P9QWXCHKNJ", "BT7M0N12GN51", "C0CDN1S0C9TS", "BVW63H3J0JM9", "C26KM7D5BG4S", "C4D1L5ZRJD31", "BVMM601GHXZ6", "C4P48SF7GSH9", "BWJNWBB7MCFT", "C2MX0RPZKR53", "BVLSM0J00MWB", "BZS1294V9FQ3", "BRL99QVV2BF3", "BQBQ98VM5FS2", "C2QDBJVVLVLX", "BSTM3283756M", "C4GSVXGF65TT", "C1383Q07XCXJ", "BSFN4W47NCT4", "BRNRWC6SCRZF", "C3526907V0HD", "BQSWVZL01GTK", "BXQ5KD1Q31MX", "C0TBVGT2XG0K", "C2KF2L3VLRQT", "BWTZKH1HF52W", "C4KCJBLFZ8V7", "C5H7P50X9PCG", "BR74RLMH966K", "BWZL8BKL786P", "C4Q8MJNV4564", "C3VNJHHD7MM4", "C0MKH58NBHRG", "BTB16H9WG3JT", "BNN7BPDZ6GQB", "BQBTGDT4P54J", "BNKKJL1VRR5P", "BVCHVG7HM8LG", "C4VZKDQRB3PB", "C0X6N5963CTW", "C010V77JZ9J7", "C47VK1FQBPND", "BTXC0RGTT3XN", "C4MSKNTVRP10", "BQ0MXFFQQHXP", "BTZCNGWLQPZ0", "BNX5M7M25W16", "BRJLJ6RPLQTJ", "C2PB7STLJGS0", "BP73LMGB1DFD", "C4GQQJJSZSZJ", "BXT8LL7LMZ8N", "BNTQT1260ZJT", "C4P0RC5MXM71", "C3FH57F93XHN", "BRGZNMD482L8", "BTKDXQPN5X5R", "BZK0PF5LXPDV", "BW49H4HWS4MS", "BWXNH3DZMWVK", "C1DZCGD41PQK", "BS0HZNNC6HLF", "C1G9PLTFMQM6", "BSQ928V7VD2W", "C0ZLR1KR1QBG", "BPH1TC2LJBLQ", "BW92N4DPF5K6", "BSJP1XGP79P5", "BRJXN52GVNLG", "BWMZDGGJ19VG", "C2592KJZ0Q1X", "BQ7NXM75NJDG", "BS9SX4Q6XJRF", "BZXM6SQVT9RJ", "C4G76555T4QN", "BTGWRK5HZ2N9", "BZQW9BT1KMTW", "C07J3ZJPGX6Z", "BSFWZVPJR668", "BZ0NBMRKLT18", "C47G7K9NWRRJ", "C52HDXHZV2KR", "BS7BXGC854NK", "C2T2QKRDNWLC", "C0SSJXG14R4T", "BZKT9SRLVX3Z", "BT0ZPG6H6096", "BS1T6552SN9J", "C2C9V8LMHR3T", "BR2TQNC1PPF2", "BS5NB0DWLTP0", "C3M28PDJCJ8T", "BQ9FQ78FGRTB", "C2Q32JM0BPZL", "BTR2D4ZQ2ZB7", "C2WKJJ9F5936", "BR46KM4D5B9L", "BSHQMQVSPR3S", "BZTC4776K9MS", "C29HQ887KH4B", "BX3JNK07Z6QK", "BPX57N768756", "C41N44F9BZHT", "BTHH15K6225J", "BRCK1B8950B2", "BT0FF7LH14HV", "BRBRQCVTJG2D", "BQ192SFB694X", "BQG162F04T2L", "C1HGW6DMDKM9", "BSG43BDRN81R", "BT35RRBKKB99", "C4Z18B1HM4FZ", "BV3LZ19LCP1B", "9N54Z5F19HJP", "BTZT8SVMMCK2", "BQ9VPBCMLZ2Q", "BS9FSLK6B1RR", "C4TV6D8XBDWJ", "BQFB6JN3WSXQ", "BW86SF1H53NX", "BPM525515854", "C06CT5MLNJNX", "C535G04WLZ9R", "C0SMBMB1DWM4", "C086PZP9QM9F", "BPN78H8FCMQ1", "BX46RMKZ6VHX", "C2733SDTF1BJ", "BT69B9T596D9", "BZ24P0L16GRM", "BPN08ZDRPSFK", "C1SDBNRFXT1D", "BPKDQSSFQ9WV", "BSHMMGRP84N4", "BP5G8K2M71PM", "BSZ1688NWC4P", "BXWTX22Z2XFD", "BTDKMK8M1LH2", "C2V826HSLMJ5", "BPZM88D5VKBS", "C0KZLMXLB9T2", "BRV97J4R8DSJ", "BVWRSNPHKW8Q", "BVGJMJ5XQVJK", "C4CV1VLGTP8C", "BRQ2SCZCTXF2", "BQJ3C40XS3V2", "C3B11WF6SWCN", "C3N4MHBKNZCG", "BRZNCW03RQ9N", "C2ZJHNS6M3T6", "BTTPCCC32QZ9", "BPBPGV9MXWPB", "BQGPQBCWSLMR", "C5488TNPSQ0F", "BV39QQXV2J0C", "BS422KB1MS20", "C22TH902K6G2", "BSXZVK24CMR3", "BWH5SB36X3VK", "C26XNFLHTSGH", "BZ270K7LH1TZ", "C1XFHQSGWGD1", "BTD24M1QCD56", "C15T02R2S8BK", "C30Z07T9Q9CT", "BRN1KDPD367M", "C08KCV70D6T3", "C21WCW00DVLR", "BWQ7GGKXG28T", "BRCC79NCQX93", "BZ910SG8ML8X", "BXWJJ7PBQ8MM", "BXHL9BJH9XKC", "C4TX3X5K111K", "BXHQB8CKJNVR", "BWFWBWCW0P9D", "C5JV8LK7MWQX", "C3QDH0Z7DV31", "BWDKPT1Q18D4", "C50F2WS79THT", "BZ8ZV7R2J95R", "C3S8ZQH9ZV50", "C4MZKDS0B8PC", "C24DMFCJKDH2", "C24VXRLK5H0N", "C34HQZGZQ6GJ", "BVPJQ7MRH4VJ", "BTKN78H28RPV", "C2PJ8ZK9J4DH", "BVQL7V5TXBHB", "BPS4JRQN2CG5", "BT0Z1P41PT36", "BVKX6B5FS9C1", "C0P10D72TK1L", "BZB7PMR2N4WG", "C1ZWH2BZ9TSF", "C1X3TD4QD17N", "C276KM77RG0T", "C3MJXH57PJTK", "C2SFHTW47D94", "BPVP56VRVLZ7", "C3KNJV4PP1LD", "BQZW37W54ZZM", "BV228L5JJHXZ", "C228GX7BRJM7", "BTX1PSX2MBF6", "C1D89J1G0NX2", "BX7XFZ51XTW8", "BPN16VT0FLLJ", "BPHF60SHQFXN", "BWVZHJN0G3C3", "C1V1FFWQ7B17", "BRH7S5QHZ0Q8", "BXN9BZW89FHK", "C27JSQ4XKP9X", "BTT25GGLG6KD", "BVWMP1MBMNCP", "BPFXMQVLHFV4", "C363Q6CVHJ7X", "BRRSMNBM1QGG", "C0DQ834WKCCG", "C3MBTRVX085R", "BZB4S8FS8T5B", "C1PJKCDKH6LN", "BTVQW5LF9JPV", "BVG9WBTDR43M", "C39LXT2J8LTF", "BV77KRZQZQ5F", "BZFJKSX3ZN0V", "BNCMX86NPKCL", "BXV4SRT2D6MV", "C1H15FFSH2CB", "C3SDWMQQSFXC", "BTTRZM07V0FW", "BZT6TWK6W5XR", "BTX1DMQ9G015", "BNQLQBLKR2MN", "BNZ3DTPW5D2F", "C10NTXFNSPBW", "BV5N90RDT0SH", "C0Z1N477W100", "C040H652PD98", "BSMH395CNL0Q", "C43H00X6KZRJ", "BSJ67WJZ3LXB", "BZ051HSSLLW1", "BQ6KQX9SQ61P", "BR6HQDNQT004", "BWX1KN6K55Q1", "BZHS2XCVV5T3", "BWZVPDGMPCC5", "BQXWH8FJK3V0", "BS97KVXLT9LK", "BXTCRVBZ52DN", "BZBP5QBBM0HD", "BP96WRTVD7C1", "BVNHG5KK7QDP", "C1Z0M42RJ2C1", "C2FP0XG65F9B", "C1S60CRC51JC", "C1DNPSJ9362C", "C0NGWGX0032C", "BP9TR7DNSZN8", "BSD44973W5SW", "C074HQ3DZ3BS", "BPRQ7GPVDQQC", "BT7Z7ZT6QRN1", "C23F79WJ1NQW", "BX6SQRQGJWSR", "BSN74W264ZCF", "BWB4RKS1TBPV", "BSF4MQFNW44N", "BSP47TQWF6WD", "BS1ZML21QD1N", "C17X452NQ0SX", "C0CDQZQNZLKF", "BS38ZDJVT78N", "BX18C8D4CJHM", "C2XTSV7BJLS9", "BSCSRTX27ZH3", "C5K89TFLSV19", "BSJN0FCDPN5R", "C051SCLQ3W25", "BT84MPNQJBW4", "BX4T47ZXQKNF", "BXX7GBSDF2KN", "BPDDQWC1NJ3N", "C5C1RVPT563H", "BTLBX17B0PZC", "BWPSWFN3B4NZ", "BZ65BV9HSRXG", "C2NVQB1L356S", "BWBS3291305L", "C547G46CMHJ6", "BPF0679N8FFN", "BSCCQL7DZ9KD", "BNDGBQLC33NF", "C0SWGV4560W1", "BX5M231L9ZTN", "BPMD4PV25C9B", "BPZPG9DZV04C", "C4NH02M9X3MM", "C45TWVG6G5XV", "BR1D9CR82ZM8", "BQMPTJ2MVCQJ", "BT2B17V20D1P", "BR30GBNH63F9", "BVPGZMMDDZ0M", "BXHL96D1W827", "BQC3DCLTWH3R", "BVT1N4JTR46G", "BV6NK69B37R6", "C0LM44KW0GHX", "C521P2SS1XJH", "BXWKR3BLHBG8", "BSB9JRS8V8NP", "BW3V2NZHPRXM", "BWZ4KT247JC6", "BWN07CHBVZL3", "C4KPF4TN5T3R", "BX7LXXJ4964V", "BR27BSZ2M3SR", "C4JJ8N6VMFD5", "BPLC6SK5B4B3", "BP664P1CXKKF", "C5CPCD5GBSPX", "C5CX546FNJLG", "BRBVZF1T3GH3", "C2394Q2MWQQ7", "BVW5KN37X9DQ", "BXVVC1LF175B", "BWKLFHWT7DHC", "BWB89BB14C5H", "BV4M9G76SQS3", "BQW8J8XM62JW", "C2K47QSJ7JDX", "BPN5TS0DS1KD", "BVZ4H08BMQ3H", "BQN1ZFK437NZ", "BZGX4ZQZKVKG", "BPJC0C7GNBFB", "BQJNKMZJXZC4", "C52K72Q65KGK", "BRKB6H11MBDS", "BRSZV60TT078", "BQ94W81DS1PV", "C1D3W6N4GM5H", "BPGQ2Z4JSFHB", "BQKRB1Z77G6R", "C0NZWZF27K7W", "BZQ63HW1R8SP", "BT8PG8N64PTF", "C1MRBXQVJVDQ", "BQLTK506H4D8", "BR5LBHR4MH0T", "BZQTQH0MZ90H", "BZ723JMJB1K4", "BXLQRTVZRD8F", "BRMVLDRVRTJ9", "BRL4TWKNVT82", "BZZX30G7MBFZ", "BX71Z672X0ZV", "BR0FFWBQ0J51", "BSNJBK3GBDT3", "C136M2366DM0", "BX7MRJ9KR1K1", "C5JPHZXD2Z40", "BRG6RGTFP8PV", "BVFWMVZCLQM8", "BQ0WGG6B6X2H", "C0DL78795NQ5", "C1BHCN2166WS", "C1NL49GLS561", "BSG54TVPP2M5", "BNKDKQXMXRR2", "C3QWNCV55VLL", "BP6WD717XGMT", "BWQ01MDCPS6W", "BXJHR0NQ1MNS", "BZ9RPMBPW20L", "BPBJ48S1VM0X", "BQK9422JVRDW", "C2S98G1ZC8HS", "BXPK5K67DLJ4", "BZCKRXK87G28", "C1S8X55L9SS1", "C2MP3X67VWNV", "C569J4JN70JD", "C0W8DRKPV6P4", "BVXG5MD1R3WC", "BNS4BB7S1PWL", "BZSDWCPNPJ30", "C59C8G9PQN1D", "BQHCTFQ14DFK", "C098FGNMTS8F", "C27K7XX3DTRD", "C4PK2KZ7HHTM", "BX7K5GTW6BW0", "BVT080SDH88Q", "C3CQR5QCXGDL", "C5FN9WF5Z4LH", "C160K9CDDDCW", "BS84XSHDJNCX", "BXW02MW8K8T1", "C1JKCSRT3XCN", "BWK0Q0RQMH7V", "C042M8GWKS34", "C4KLBW2LG5HW", "BP4TTT81TPPK", "BS68QN8SV1BN", "C4LP93NN6CNF", "BS2B7CBR6JK7", "BZ93QG715BVF", "BQ74L1C4WTQ5", "C4XB8HD7BZG5", "BX2PTCR8L5XP", "BPZQMGF9PVH9", "C1365LM1Q2DK", "BV45N7C2N5FD", "BRRN3ZC632XS", "BWLZ0FPRRG29", "C4HDJMZDTPCP", "BTXHPV48V31Z", "BZD97NQTW7LD", "BZ8TNLDZHNQR", "BNH6F3HFG75F", "BWTRGX57577H", "BVC44J7FF2QB", "BV3FNBP640JB", "BWGWPKRVZZV2", "BTBWBGKPKS97", "C035L0NS3SQN", "BPL3N8R78B7D", "C20T418C1T43", "BTJXDHNM2TCS", "BPXNKHZ54LGX", "BSHPN3SZ2TB4", "BVMNM6K9MS7B", "BR1ZD21DCXJR", "BQ2P6VJLR16D", "BRFKNLB9B2ZW", "BNSBBMGGF5GD", "BTVKZ4DQ7CBD", "BWCSQ4W7DGWW", "C0D7VLQ3VDDD", "C20W5LX41N6M", "C26NJ29TKZ1W", "BX8SSGT9C7NB", "BQHVLTSGMMGL", "C51FLSD4R5DS", "C2B588K0RM2S", "BW4BKDN4WT8F", "BP58JN2GVQS8", "BPQ8RMCDSLRL", "BVMFBCFLL6QP", "BZJ13K1JKGLP", "C0GG86060VF8", "BQ216SGGM4M8", "C5KDXM27B23F", "BSS23FG7060V", "BZD3H9HTF78V", "BZM8CBG9H4XS", "BVXVB2KXFRT3", "C4PPBWR9HRTX", "BWNQM65KQK6H", "BWGC8WZS9SSJ", "BSH213X7PZQW", "C0PK4504XSCN", "C4R1T14GQLZJ", "C4WH5H16F4R0", "BTXJP4Q6RKVT", "BQCRWNB8ZQBS", "BRXQ8V3PKK9C", "BT2KNXLFZWNP", "BRLMTW4D03WB", "BWG011T3T1FH", "C02DXV9SNM0B", "BWNQ4QZFV74P", "BX8J7Z4CWRKQ", "BV9X47B38W0M", "BXWRC2NJ4MJ6", "BPFVSWB0GS6L", "BW9TFFJ50MKV", "BSXH8LSGZT23", "BR4LBLD1GFD0", "BSXDD75Q561F", "BRLP9XTBCXBG", "C0S1DWLKFNF7", "BQZ0V5R1HPXF", "C48PP1NS6ZNP", "BS6QHXD5D9VZ", "C3HNL83BXGZ3", "C4SG06H48738", "BR9MPWXFBCRC", "BZLHL95QW0H6", "BXK4KZ9HK34M", "BSDS22SBQ82S", "C51V4K2NR1B3", "BT1GC5PNV50M", "BV492B0L4DZW", "BW6XL4RDSNRW", "BRT29CTZTN67"];
            //fullGameArray = tempBCAray;
            //console.log("temp BC array " + fullGameArray);
            GUID_pop(fullGameArray); // was  fullGameArray
            ieFix();
            $("body").css("visibility", "visible");
        }, 650);
        // special needs for page


        $(".xghsearch input").attr("placeholder", regionContent["keyAriasearchplaceholder"]);

        if ($("[data-loc-copy='keyCopylinks3title']").text().indexOf("####") !== -1) {
            $("[data-loc-copy='keyCopylinks3title']").closest("div[data-grid='col-6']").remove();
            $('.pagelinks [data-grid="col-6 pad-12x"]').removeAttr("data-grid");
            $('.pagelinks [data-grid="col-6"]').attr("data-grid", "col-4").css("padding", "0 12px");
        }
        $("[href='#fps-boost']").click(function(e) {
          e.preventDefault();
          $("#filter-features button").click();
          $("[data-cat='feature-fpsBoostSeriesX']")[0].click();
          var btttop = $(".thecatalog").offset().top;
          $("HTML, BODY").animate({
              scrollTop: btttop
          }, 500);
        })
        $(document).on("keypress", "[href='#fps-boost']", function(event) {
          if ((event.keyCode == 13) || (event.keyCode == 32)) {
              event.preventDefault();
              $(this).click();
              // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
          }
        })


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
            //console.log("running guid_pop: " + fullGameArray.length)
        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'

        var first12 = rawGuids.slice(0, 12)
        rawGuids = rawGuids.slice(12)

        var firstToUrl = first12.join(",");
        guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
        $.get(guidUrl)
            .done(function(responseData) {
                var apiData = responseData;
                //console.log(apiData);
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
                            //console.log(apiData);
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
        allGamesExcludes.push("BRHSML8030ZN"); // Excluding kinect games the laziest way possible
        allGamesExcludes.push("BVK1LRW59L64");
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
                if (excludeitpurch === 0) {
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
                    //console.log("NOTE: BigID " + allprodids[t] + " unavailable to buy in this locale. Removing from game lists."); //Hid to try to speed up. EL 11/30
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
                    var idind14 = gameIdArrays["mostplayed"].indexOf(eliminated[w]);
                    if (idind14 !== -1) { gameIdArrays["mostplayed"].splice(idind14, 1); }
                }
            
        }

            for (var i = 0; i < productQuantity; i++) {
                var longLangs = "pl-pl, sk-sk, de-de, de-ch, de-at, ru-ru, fr-ca"
                var itemId = data.Products[i].ProductId.toUpperCase();
                var descriptionSizeLimit = 300;
                if (longLangs.indexOf(urlRegion) != -1) {
                    descriptionSizeLimit = 250;
                }

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
                //console.log(itemId + " " + itemTitle); //EL added

                if (shortdesc && (shortdesc.length > descriptionSizeLimit)) { // This should trim the description to prevent overflow
                    for (var j = descriptionSizeLimit; j > 0; j--) {
                        var curChar = shortdesc.charAt(j);
                        if (curChar == '.' || curChar == '?' || curChar == "!") {
                            shortdesc = shortdesc.substring(0, j + 1);
                            break;
                        }
                    }
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
                var platxbox = "false";
                var platpc = "false";
                var platxo = "false";
                var platxsx = "false";
                var platXPA = "false";

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
                                }
                                if (tempea === "true" && av.Actions.length === 2) {
                                    eaaccessgame = "true";
                                }
                                if (gameIdArrays["onsale"].indexOf(itemId) !== -1) {
                                    onsale = "true";
                                }
                            }
                        })
                    })

                    if (data.Products[i].Properties.XboxConsoleGenCompatible === null) {
                        platxo = "true";
                        platxsx = "true";
                    } else if (data.Products[i].Properties.XboxConsoleGenCompatible === undefined) {
                        platxo = "true";
                    } else if (data.Products[i].Properties.XboxConsoleGenCompatible.length === 2) {
                        platxo = "true";
                        platxsx = "true";
                    } else if (data.Products[i].Properties.XboxConsoleGenCompatible[0] === "ConsoleGen8") {
                        platxo = "true";
                    } else if (data.Products[i].Properties.XboxConsoleGenCompatible[0] === "ConsoleGen9") {
                        platxsx = "true";
                        allGamesExcludes.push(itemId);
                        locgamesremoved++
                        popcounter--
                        //console.log("removing " + itemId);
                    }

                } else {
                    data.Products[i].DisplaySkuAvailabilities.forEach(function(sku) {
                        sku.Availabilities.forEach(function(av) {
                            if (av.Actions.indexOf("Purchase") !== -1 && av.Actions.indexOf("Browse") !== -1 && (av.OrderManagementData.Price.MSRP !== 0 || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && av.Actions.length > 2) {
                                listprice = av.OrderManagementData.Price.ListPrice;
                                msrpprice = av.OrderManagementData.Price.MSRP;
                                currencycode = av.OrderManagementData.Price.CurrencyCode;
                                // if (listprice < msrpprice) { 
                                //   onsale = "true";
                                //   if (gameIdArrays["onsale"].indexOf(itemId) === -1) {
                                //     gameIdArrays["onsale"].push(itemId); 
                                //   }
                                // }
                                if (gameIdArrays["onsale"].indexOf(itemId) !== -1) {
                                    onsale = "true";
                                }
                            }
                        })
                    })
                }


                if (listprice === undefined) {
                    //console.log("NOTE: BigID " + itemId + " has no price information.");
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
                if (data.Products[i].MarketProperties[0].ContentRatings !== undefined && data.Products[i].MarketProperties[0].ContentRatings !== null && data.Products[i].MarketProperties[0].ContentRatings.length > 0) {
                    var ratInd = 999;
                    for (var p = 0; p < data.Products[i].MarketProperties[0].ContentRatings.length; p++) {
                        if (data.Products[i].MarketProperties[0].ContentRatings[p].RatingSystem === thesystems[urlRegion]) {
                            ratInd = p;
                        }
                    }
                    if (ratInd === 999) { ratInd = 0 }

                    ratingcode = data.Products[i].MarketProperties[0].ContentRatings[ratInd].RatingId;

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
                    ratingsystem = data.Products[i].MarketProperties[0].ContentRatings[ratInd].RatingSystem;
                    if (kidfamilyratings.indexOf(rating) !== -1) {
                        gameIdArrays["kidsfamily"].push(itemId);
                    }
                    rawdescriptors = data.Products[i].MarketProperties[0].ContentRatings[ratInd].RatingDescriptors.join(", ");
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
                    purchasable: purchasable,
                    platformxbox: platxbox,
                    platformpc: platpc,
                    platformxo: platxo,
                    platformxsx: platxsx
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
                            '<a href="" class="c-call-to-action c-glyph f-lightweight" aria-label="">' +
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

                        $(".cloudEnabled h3").html(regionStrings["keyCloudbannerheadline"]);
                        $(".cloudEnabled p").html(regionStrings["keyCloudbannerparagraph"]);
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
                        $(".gameDiv").last().after('<script type="text/javascript" src="/en-US/global-shares/templates/MWF/JS/MWF-Aria-Boxshots-loc.js"></s' + 'cript>');
                        //$(".gameDivsWrapper").append(gamehtml);
                        var x1RegionPop = (function() {
                            $(".gameDiv a").each(function() {
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
                        } else if (durl.indexOf("xbox360") !== -1) {
                            beginningState("xbox360");
                            listGames(gameIdArrays["xbox360"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("xboxOG") !== -1) {
                            beginningState("xboxOG");
                            listGames(gameIdArrays["xboxOG"], "avail-download", "featured");
                            filtersort();
                        } else if (durl.indexOf("xboxone") !== -1) {
                            beginningState("xboxone");
                            listGames(gameIdArrays["xboxone"], "avail-download", "featured");
                            filtersort();
                        } else {
                            beginningState("all");
                            listGames(fullGameArray, "avail-download", "featured", "nochange");
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
                            var featmap = { "multiplayer": "feature-multiplayer" };
                            var featarray = Object.keys(featmap);
                            for (var g = 0; g < featarray.length; g++) {
                                if (durl.indexOf(featarray[g]) !== -1) {
                                    $("#filter-features button").click();
                                    var feattoclick = featmap[featarray[g]];
                                    $("#featureSelect a[data-cat='" + feattoclick + "']")[0].click();
                                    entrycat = true;
                                }
                            }
                            if (durl.indexOf("fpsboost") !== -1) {
                              var gamepopcheck = setInterval(function() {
                                  var gameslisted = $(".gameDiv").length;
                                  if (gameslisted > 0) {
                                    setTimeout(function() {
                                      jumptosneaky();
                                    }, 750)  
                                    clearInterval(gamepopcheck);
                                  }
                              }, 500);
                              function jumptosneaky() {
                                $("#Stealth-Carousel-1 .f-next").click();
                                $("[href='#fps-boost']")[0].focus();
                                var btttop = $("#Stealth-Carousel-1").offset().top;
                                $("HTML, BODY").animate({
                                    scrollTop: btttop
                                }, 500);
                              }
                            }
                        }

                        function beginningState(collection) {
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
                var newurl = window.location.origin + "/" + urlRegion + "/games/backward-compatibility?cat=" + thecategory;
                window.history.replaceState(currenturl, "Xbox One Games Catalog", newurl);
            }
        }
        setTimeout(function() {
            $(".enhancedlink").addClass("hide");
            $(".looklogo").addClass("hide");
            if (cat === "all") {
                cat = fullGameArray;
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
            } else if (cat === "xbox360") {
                cat = gameIdArrays["xbox360"];
                changeurlbar("xbox360");
            } else if (cat === "xboxOG") {
                cat = gameIdArrays["xboxOG"];
                changeurlbar("xboxOG");
            } else if (cat === "xboxone") {
                cat = gameIdArrays["xboxone"];
                changeurlbar("xboxone");
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

                    if (allGames[selectedGames[i]] !== undefined) {
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
                                } else if (allfeats[f] === "feature-fpsBoostSeriesX") {
                                    $(".smartDelivery").hide();
                                    $(".cloudEnabled").hide();
                                    $(".optimizedGames").hide();
                                    if (gameIdArrays["fpsBoostSeriesX"].indexOf(selectedGames[i]) !== -1) {
                                        featcount++;
                                    }
                                } else if (allfeats[f] === "feature-fpsBoostSeriesS") {
                                    $(".smartDelivery").hide();
                                    $(".cloudEnabled").hide();
                                    $(".optimizedGames").hide();
                                    if (gameIdArrays["fpsBoostSeriesS"].indexOf(selectedGames[i]) !== -1) {
                                        featcount++;
                                    }
                                 }else if (allfeats[f] === "feature-autoHDR") {
                                    $(".smartDelivery").hide();
                                    $(".cloudEnabled").hide();
                                    $(".optimizedGames").hide();
                                    if (gameIdArrays["autoHDR"].indexOf(selectedGames[i]) !== -1) {
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
        }, 10);
    }



    gamesperpage = 20; //EL added, was 20
    $(document).on("click", ".paginateDropdown li", function(e) {
        e.preventDefault();
        //var newmax = parseInt($(this).attr("data-gamesmax"));
        var newmax = parseInt($(".paginateDropdown button").text())
            //$(".pagcontroltitle").text(newmax);
        gamesperpage = newmax;
        paginateSetup(prunedGames);
        paginateclick = 1;
        var btttop = $(".spinnerHold").offset().top;
        $("HTML, BODY").animate({
            scrollTop: btttop
        }, 500);
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
        for (var i = 0; i < currentgameslength; i++) {
            if (allGames[selectedGames[i]]) {
                if (allGames[selectedGames[i]]["ratingsystem"] !== bigsystem) {
                    allGames[selectedGames[i]]["rating"] = "none";
                } else {
                    var gamerating = "rating-" + allGames[selectedGames[i]]["rating"];
                    if ($(".ratingchoice[data-cat='" + gamerating + "']").length === 0) {
                        $("#ratingSelect").append('<li class="dynRatingItem" data-ratingage="' + allGames[selectedGames[i]]["ratingage"] + '">' +
                            '<a class="c-refine-item ratingchoice" href="#" tabindex="0" aria-label="Refine by ' + allGames[selectedGames[i]]["rating"] + ' games" data-cat="' + gamerating + '">' +
                            //'<span aria-hidden="true">' + allGames[selectedGames[i]]["rating"] + '</span>' +
                            '<span aria-hidden="true">' + allGames[selectedGames[i]]["rating"] + '</span>' +
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
            paginate(prunedGames, gotopage);
            $(this).attr("aria-current", "true").attr("current", "true");
            setTimeout(function() {
                $(".paginatenext a").attr("tabindex", "0").attr("aria-current", "false").attr("current", "false");
                $(".paginateprevious a").attr("tabindex", "0").attr("aria-current", "false").attr("current", "false");
                $(".paginatenum a").attr("tabindex", "0").attr("aria-current", "false").attr("current", "false");
                $(".pag-disabled a").attr("aria-current", "true").attr("current", "true");
                $(".paginatenum.f-active a").attr("aria-current", "true").attr("current", "true");
            }, 1750)
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
            // $(".pag-disabled a").attr("tabindex", "-1");
            // $(".paginatenum.f-active a").attr("tabindex", "-1");

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
                        '<span class="textpricenew x-hidden-focus" itemprop="price">' + listshown + '</span>' +
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
            } else if (allGames[thebigid]["onsale"] === "true") {
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
                    popiconXpa = '<span class="featureCircle"> ● </span>'
                }
                popiconXpa += '<span class="c-paragraph-3"> ' + quickLookLocStrings.locales[urlRegion]["keyCloudenabled"] + ' </span>';
                previousExists = true;
            }

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
            if (allGames[thebigid]["gamepassgame"] === "true") {
                popservices += '<div class="servicesarea"><p>' + regionContent["keyPopgpgame"] + '</p></div>';
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
            if (allGames[thebigid]["gameurl"].toLowerCase().indexOf("games/store") === -1) {
                datatrack = 'data-cta="learn"'
            }

            if (allGames[thebigid]["gameurl"].toLowerCase().indexOf("games/store") !== -1) {
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
                    '<span class="c-glyph svg-xbox-series-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="20" height="20"><path d="M832 384q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM512 0h1024v2048H512V0zm896 1920V128H640v1792h128v-896h128v896h512z"></path></svg></span>' +
                    'Xbox Series X|S' +
                    '</div>';
            }

            if (allGames[thebigid]["platformxbox"] === "true") {
                plxb = '<div class="c-tag">' +
                    '<span class="c-glyph glyph-xbox-one-console"></span>' +
                    'Xbox One' +
                    '</div>';
            }
            if (allGames[thebigid]["platformpc"] === "true") {
                plpc = '<div class="c-tag">' +
                    '<span class="c-glyph glyph-pc1"></span>' +
                    quickLookLocStrings.locales[urlRegion]["keyPc"] +
                    '</div>';
            }
            if (gameIdArrays["cloud"].indexOf(thebigid) !== -1) {
                plmo = '<div class="c-tag">' +
                    '<span class="c-glyph glyph-mobile-tablet"></span>' +
                    /*quickLookLocStrings.locales[urlRegion]["keyMobile"]*/
                    'Android' +
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

            var eachgameA = '<div class="' + eachGameClass + qlbutclass + '" itemscope="" itemtype="http://schema.org/Product" data-bigid="' + thebigid + '" ' +
                'data-releasedate="' + allGames[thebigid]["releasedate"] + '" data-msproduct="' + allGames[thebigid]["msproduct"] + '" data-multiplayer="' + allGames[thebigid]["multiplayer"] +
                '" data-rating="' + allGames[thebigid]["rating"] + '" data-ratingsystem="' + allGames[thebigid]["ratingsystem"] + '" data-listprice="' + allGames[thebigid]["listprice"] + '">' +
                '<a class="gameDivLink" href="' + allGames[thebigid]["gameurl"] + '" target="_blank" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                '>click" ' + datatrack + '>' +
                '<picture class="containerIMG">' +
                '<img class="c-image" aria-hidden="true" alt="' + boxshotlocstrings.locales[urlRegion]["keyPlaceholderboxshot"].replace("<PLACEHOLDER>", allGames[thebigid]["title"]) +
                '" srcset="" src="' + theboxshot + '">' +
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
        setTimeout(function() {
            $(".paginatenext a").attr("tabindex", "0").attr("aria-current", "false").attr("current", "false");
            $(".paginateprevious a").attr("tabindex", "0").attr("aria-current", "false").attr("current", "false");
            $(".paginatenum a").attr("tabindex", "0").attr("aria-current", "false").attr("current", "false");
            $(".pag-disabled a").attr("aria-current", "true").attr("current", "true");
            $(".paginatenum.f-active a").attr("aria-current", "true").attr("current", "true");
        }, 500)
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
    $(document).on('keydown', function(e) {
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
        // $(".paginatenext a").attr("tabindex", "0").attr("current", "false");
        // $(".paginateprevious a").attr("tabindex", "0").attr("current", "false");
        // $(".paginatenum a").attr("tabindex", "0").attr("current", "false");

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
        // $(".pag-disabled a").attr("tabindex", "-1");
        // $(".paginatenum.f-active a").attr("tabindex", "-1");

        var currentwidth = $(window).width();
        pageloadfocus++
        if (navigator.userAgent.match(/iPad/i) === null && pageloadfocus > 1) {
            if ($(".gameDiv").not(".pagHide").not(".catHide").length === 0) {
                setTimeout(function() {
                    $(".nogamesfound h3").eq(0).focus();
                }, 600)
            } else {
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find(".gameDivLink").focus();
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
                $("[data-col='all']").click();
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
                $(".gameSelector").attr("data-colselected", "all");
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
            $(".filterSelections li").remove();
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

    function gameSearch() {
        if ($(".filterSelections a").length > 0) {
            $(".filterSelections li").remove();
          }
        // var queryraw = encodeURI($(".xghsearch input").val().trim().replace("<", "")).replace(/[!'()*]/g).replace(/%20/g, " ");
        // var query = encodeURI($(".xghsearch input").val().trim().replace(/\s+/g, ' ').replace("<", "").toLowerCase()).replace(/[!'()*]/g).replace(/%20/g, " ");
        var queryraw = $(".xghsearch input").val().trim().replace(/</g, "");
        var query = $(".xghsearch input").val().trim().replace(/\s+/g, ' ').replace(/</g, "").toLowerCase();
        if (query.length < 3) {
            $(".searcherrormessage").text(regionContent["keySearchlengtherror"])
            return false;
        } else if (query.length > 50) {
            $(".searcherrormessage").text(regionContent["keySearchlengthlongerror"])
            return false;
        } else {
            $(".searcherrormessage").text("");
        }
        queryraw = queryraw.replace(/"/g, '&quot;')
        query = query.replace(/"/g, '&quot;')
        queryraw = queryraw.replace(/'/g, '&apos;')
        query = query.replace(/'/g, '&apos;')
        searchArray = [];
        var searchObj = {};

        var smallwords = ["the", "a", "an", "of", "for", "and", "or", "it", "in", "on", "with", "as", "at", "be", "but", "by", "from", "had", "has", "how", "if", "its", "so", "than", "that",
            "to", "too", "was"
        ]; // "stop words"
        var allgameslength = fullGameArray.length;
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
            if (allGames[fullGameArray[i]] !== undefined) {
                var titlesch = allGames[fullGameArray[i]]["title"].replace(/\s+/g, ' ').toLowerCase();
                var titlearr = titlesch.split(" ");

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
                                if (typeof searchObj[fullGameArray[i]] === "undefined") {
                                    searchObj[fullGameArray[i]] = {};
                                    searchObj[fullGameArray[i]].exacts = 1;
                                } else {
                                    searchObj[fullGameArray[i]].exacts++;
                                }

                            } else if (lettermatches / queryword.length >= .75) {
                                // wordmatches++;
                                if (typeof searchObj[fullGameArray[i]] === "undefined") {
                                    searchObj[fullGameArray[i]] = {};
                                    searchObj[fullGameArray[i]].exacts = 0;
                                }
                            }
                        }
                    }

                }


                // last straight matches
                if (titlesch.toLowerCase().replace("®", "").replace("™", "").indexOf(query) !== -1) { // && typeof searchObj[fullGameArray[i]] === "undefined"
                    searchObj[fullGameArray[i]] = {};
                    searchObj[fullGameArray[i]].exacts = 999;
                }
                // if (wordmatches > 0) {
                //   searchArray.push(fullGameArray[i])
                // }
            }
        }
        searchArray = Object.keys(searchObj);
        searchArray = searchArray.sort(asc_sortbi);

        function asc_sortbi(a, b) {
            return (new Date(searchObj[a]["exacts"])) < (new Date(searchObj[b]["exacts"])) ? 1 : -1;
        }

        $(".gamesCollections").attr("data-colselected", "search");
        $(".coloption").removeClass("col-selected");
        $(".coloption[data-col='all']").addClass("col-selected");
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

    // $(".c-select-menu li").click(function() {
    //     $(".gameDivLink").first().eq(0).focus();
    // })

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
    window.addEventListener('touchstart', function() { // Remove all QL CTAs when the user touches the screen
        if (!is_screen_touched) {
            $('.qlButton').remove();
            is_screen_touched = true;
        }
    });


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