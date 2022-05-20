// XGP Games
$(document).ready(function() {
    if ($(".CatAnnounce").length === 0) {
        $("body").append('<div style="width:0;height:0;font-size:0;" class="CatAnnounce" aria-live="assertive"></div>');
    }

    // go to catalog section on load if collection is specified in url
    if (document.URL.indexOf("#") !== -1) {
        $(".c-progress.f-indeterminate-local.f-progress-large").show();
        var btttop = $(".thecatalog").position().top;
        $("HTML, BODY").animate({
            scrollTop: btttop
        }, 0);
    }
    paginateclick = 0;
    var globalAdd = { // uncomment 1133 to reactivate eaplaypc
        "1d33fbb9-b895-4732-a8ca-a55c8b99fa2c": {
            colname: "eaplayPC",
            plat: "pc",
            title: "%EA Play",
            spot: 5,
            startstring: "pcea"
        },
        "0ee8fddb-8a59-45c5-aebb-9d4adbe832c5": {
            colname: "optXS",
            plat: "xbox",
            title: "Optimized for Xbox Series X|S",
            spot: 6,
            startstring: "optimized"
        },
        // "275b5c0f-a5de-448e-bb6b-8d26588b62db": { colname : "bethall",
        //                                          plat: "all",
        //                                          title: "Bethesda Softworks",
        //                                          spot: 4,
        //                                          startstring: "bethesdaall"
        //                                        },
        "f6505a9f-ec7d-4eb8-a496-be83f8f35829": {
            colname: "bethxbox",
            plat: "xbox",
            title: "Bethesda Softworks",
            spot: 7,
            startstring: "bethesdaconsole"
        },
        "79fe89cf-f6a3-48d4-af6c-de4482cf4a51": {
            colname: "bethpc",
            plat: "pc",
            title: "Bethesda Softworks",
            spot: 5,
            startstring: "bethesdapc"
        },
        "43074527-8b07-42ca-af99-cf481e756aad": {
            colname: "allsports",
            plat: "all",
            title: "Sports",
            spot: 3,
            startstring: "allsports"
        },
        //"ec049be7-33d2-47d5-a67b-01d2933e9478": { colname : "twentyxbox",
        //                                         plat: "xbox",
        //                                         title: "Twenty Years",
        //                                         spot: 5,
        //                                         startstring: "console20years"
        //                                       },
        //"fd4bebcc-b280-4b28-a6fa-3aebb0a37a0e": { colname : "twentypc",
        //                                         plat: "pc",
        //                                         title: "Twenty Years",
        //                                         spot: 5,
        //                                         startstring: "pc20years"
        //                                       },
        "4c894453-744d-4b35-acea-40df9f4312b1": {
            colname: "idxboxpc",
            plat: "pc",
            title: "ID@Xbox",
            spot: 10,
            startstring: "pcid"
        },
        "bc3db341-2584-4f25-b836-e6ad04b4173e": {
            colname: "animalconsole",
            plat: "xbox",
            title: "",
            spot: 12,
            startstring: "animalanticsconsole"
        },
        "31d918c0-0287-45bc-bc77-66fc514bba0a": {
            colname: "animalpc",
            plat: "pc",
            title: "",
            spot: 9,
            startstring: "animalanticspc"
        }
        // "7ebf22cd-a385-4ac4-9c53-3655e22a7ddb": { colname : "earthday",
        //                                          plat: "xbox",
        //                                          title: "Earth Day**en-us",
        //                                          spot: 5,
        //                                          startstring: "earthday"
        //                                        }
    }
    var newListIds = Object.keys(globalAdd);
    $(".m-hero a").click(function(e) {
        if ($(this).attr("href").indexOf("#") !== -1) {
            e.preventDefault();
        }
    })

    var win10user = false;
    if (navigator.userAgent.indexOf("Windows NT 10") > -1) { win10user = true; }
    if (win10user === false) {
        $(".win10ban").remove();
    } else {
        $(".nonwin10ban").remove();
    }

    regionRatingOrgs = { "en-us": "ESRB", "en-au": "COB-AU", "en-hk": "IARC", "en-in": "PEGI", "en-nz": "OFLC-NZ", "en-sg": "IARC", "ja-jp": "CERO", "ko-kr": "GRB", "zh-hk": "IARC", "zh-tw": "CSRR", "ar-ae": "IARC", "ar-sa": "IARC", "cs-cz": "PEGI", "da-dk": "PEGI", "de-at": "USK", "de-ch": "USK", "de-de": "USK", "el-gr": "PEGI", "en-gb": "PEGI", "en-ie": "PEGI", "en-za": "FPB", "fi-fi": "PEGI", "fr-be": "PEGI", "fr-ch": "PEGI", "fr-fr": "PEGI", "he-il": "PEGI", "hu-hu": "PEGI", "it-it": "PEGI", "nb-no": "PEGI", "nl-be": "PEGI", "nl-nl": "PEGI", "pl-pl": "PEGI", "pt-pt": "PEGI", "ru-ru": "PCBP", "sk-sk": "PEGI", "sv-se": "PEGI", "tr-tr": "PEGI", "en-ca": "ESRB", "fr-ca": "ESRB", "es-ar": "IARC", "es-cl": "IARC", "es-co": "IARC", "es-es": "PEGI", "es-mx": "ESRB", "pt-br": "DJCTQ" };
    //overrides
    fullcarouselimages = ["9PGSCB1X2P7G", "BRKX5CRMRTC2", "BZGJRJC1FGF3", "BPL68T0XK96W", "BV0NSD4NN4V4", "BPQ955FQFPH6", "BZRK5C951KK7", "BWPKGQV97N7N", "BPJ686W6S0NH", "9PDV8FKWP3B4", "BNG91PT95LQN", "C0QN5M9ZTC38", "C0GWTPD0S8S1", "C40860J5R2MP", "BR7X7MVBBQKM", "C4LLMHFQ1BXQ", "9NDDH3R9DF40", "BS36XT3Z5ZKL", "C17SFN1NXZ37", "BVFDTJ1XF6CS", "C4VLMWJWM7BG", "C57L9GR0HHB7", "BX4RTV7M28VS", "BS37BWWP2PZ1", "BW2XDRNSCCPZ", "BSZM480TSWGP", "BRGPD72KHM3Q", "C3KLDKZBHNCZ", "C3HQKX3B35PD", "C2N9CS4FS1QR", "C0X2HNVH08FB", "9NBLGGH51QT4", "BPBC39LH0Q9B", "BVV8LHVGPBS3", "BWC95BZPFBS7", "BXL4538LK4DK", "BQMVWCMB8P59", "C2BTFXNW3TTT", "9P4WKZXWP1QW", "BRJGPRMBV1NT"]
    omitimages = ["https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcB7WVDn.f4Uli2dyqvJAR1iMrHLquSMr6CthfgctOtrvg54xKrmjYXQ1BkhiG4i6RT1HzvxN47vdGKnWcFR1BrIpKbs257dc4YHkUyePffX5a.c3Z9hfO6bkguMWKak4QJZyll1iBDl8IFZ12EEgxVXSW2Bh6iGMM6qEszDFtB80-&w=980&format=jpg"]
        //omitgames = ["9PNQKHFLD2WQ"];
    swapgames = { "9PNQKHFLD2WQ": "9PNJXVCVWD4K" }
        //end overrides
    pageloadfocus = 0;

    var urlRegion = document.URL.split("/")[3].toLowerCase().slice(0, 5);
    var ratingorg = regionRatingOrgs[urlRegion];
    var clickname = "www>games>xbox-one>GAMETITLE>click";
    var regionContent = globalContent.locales[urlRegion]; //change back to urlRegion once JSON localized

    //android detection
    var androiduser = false;
    if (navigator.userAgent.indexOf("Android") > -1) { androiduser = true; }

    if (androiduser === true) {
        $(".androidBanner").show();
    }

    $(".modalDialog .close").click(function() {
        $(".modalDialog").hide();
    });

    // Shocktober 2020
    // $(".collections-all a").first().after('<a class="coloption c-paragraph-3" href="#" aria-label="filter by Shocktober games" data-col="shocktoberall">' + 
    //                                         '<span>Shocktober</span></a>');
    // $(".collections-xbox a").first().after('<a class="coloption c-paragraph-3" href="#" aria-label="filter by Shocktober games" data-col="shocktoberxbox">' + 
    //                                         '<span>Shocktober</span></a>');
    // $(".collections-pc a").first().after('<a class="coloption c-paragraph-3" href="#" aria-label="filter by Shocktober games" data-col="shocktoberpc">' + 
    //                                         '<span>Shocktober</span></a>');


    // Games Per Page Filter 

    $('.filterMenu select option').text(regionContent["keyGpptext"]);

    $('.filterMenu select option').eq(0).text(function(index, gppText) {
        return gppText.replace('<PLACEHOLDER>', "20 ");
    });

    $('.filterMenu select option').eq(1).text(function(index, gppText) {
        return gppText.replace('<PLACEHOLDER>', "50 ");
    });

    $('.filterMenu select option').eq(2).text(function(index, gppText) {
        return gppText.replace('<PLACEHOLDER>', "100 ");
    });

    $('.filterMenu select option').eq(3).text(function(index, gppText) {
        return gppText.replace('<PLACEHOLDER>', "200 ");
    });

    var amountGamesShown = $('.filterMenu select');
    var amountGames = $('.pag-20').data('gamesmax');

    amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", amountGames + ' '));

    $(document).on("click", ".paginateDropdown li", function() {
        var gppnumber = $(this).data('gamesmax');
        $('.filterMenu button').attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
        amountGamesShown.attr('aria-label', regionContent["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
    });


    // var xgpGuidArray = ["XGPPMPMostPopular", "XGPPMPRecentlyAdded", "XGPPMPIDXbox", "XGPPMPActionAdventure", "XGPPMPShooters", "XGPPMPFamilyFriendly", "subsxgprecentlyadded", 
    //                     "subsxgpchannel9", "subsxgpchannel5", "subsxgpchannel6", "subsxgpchannel4", "pcgaVTaz", "pcgaVTpopular", "pcgaVTIndies", "pcgaVTRPG", "pcgaVTStrategy", 
    //                     "SubsXGPLeavingSoon", "subsxgpchannel3"];
    // var pcarrays = ["XGPPMPMostPopular", "XGPPMPRecentlyAdded", "XGPPMPIDXbox", "XGPPMPActionAdventure", "XGPPMPShooters", "XGPPMPFamilyFriendly", "pcgaVTaz", "pcgaVTpopular", 
    //                 "pcgaVTIndies", "pcgaVTRPG", "pcgaVTStrategy"];

    xgpGuidArray = ["eab7757c-ff70-45af-bfa6-79d3cfb2bf81", "a884932a-f02b-40c8-a903-a008c23b1df1", "f13cf6b4-57e6-4459-89df-6aec18cf0538",
        "3fdd7f57-7092-4b65-bd40-5a9dac1b2b84", "fc40d1b9-85ec-422d-b454-8685fb31776e", "4c894453-744d-4b35-acea-40df9f4312b1", "fafb048d-9850-4447-ae20-f8f698bd208a",
        "0f4967a6-7226-48bd-8ab4-a6ef40b09981", "72c5a54f-45f9-4723-970c-1c8040cffe2e", "590d891f-0f12-4bd6-8d58-28c5d612ba38", "8e7cd765-1293-44e0-95bb-8257e2bf0221", "8e5089f1-5947-4ce1-9db1-94644556e493",
        "393f05bf-e596-4ef6-9487-6d4fa0eab987", "cc7fc951-d00f-410e-9e02-5e4628e04163", "1e2ce757-e84f-4d2c-9243-34b81912644a", "c621daed-3d22-4745-afc9-19ed77a2e9be",
        "7a3b01ac-93e4-4d52-81ad-980bc4cb4ff5", "f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e", "e7590b22-e299-44db-ae22-25c61405454c", "29a81209-df6f-41fd-a528-2ae6b91f719c",
        "88c10a22-33b5-4e24-90b6-125bee02da39", "ebedc400-a688-4929-b794-4435b2e1ab0a", "f576ca76-9aad-4ac7-a0f0-71429ef36850", "c4be032d-0f42-4df5-8934-1758748cf7f0",
        "95f39cf3-48ec-4d3c-83e6-a7f6916fbdfe", "e68225ce-e42f-4156-998d-697bf985da73", "38441e3f-26c6-498c-8b84-0ca20a3785af", "200674bd-7bd4-4360-bd0f-af8cd899839f",
        "5d6c2384-b30e-4717-86f6-e684e819622b", "7d8e8d56-c02f-4711-afec-73a80d8e9261", "796c328b-4a17-4996-99f8-0edb59bef85a", "b8900d09-a491-44cc-916e-32b5acae621b",
        "6661f37d-6159-4c9c-81d8-668af0a78b04", "eab7757c-ff70-45af-bfa6-79d3cfb2bf81", "095bda36-f5cd-43f2-9ee1-0a72f371fb96", "18e0b0af-cefe-4492-845c-b9f6ab8737f8",
        // "4165f752-d702-49c8-886b-fb57936f6bae", "ddba2cbd-5f5c-4e5f-baeb-a08fbafe86a6", "98054d59-3082-4e1f-8991-3de33aea8bf8", "a672552e-fdc2-4ecd-96e9-b8409193f524",
        "4165f752-d702-49c8-886b-fb57936f6bae", "a672552e-fdc2-4ecd-96e9-b8409193f524", "4b59700c-801f-494a-a34c-842b8c98f154", "0f0bccc0-cdc8-4e1a-bfca-4b7da5c6c418", "f0e9ffe0-176e-41af-be11-c40a05d26e2c", // removed must-haves 
        "609d944c-d395-4c0a-9ea4-e9f39b52c1ad"
    ];
    var pcarrays = [];
    var xgplistUrl = "https://catalog.gamepass.com/sigls/v2?id=CATEGORY&language=LANG&market=MARK";
    var xgplistUrlPC = "https://catalog.gamepass.com/sigls/v2?id=CATEGORY&language=LANG&market=MARK";

    guidAmpt = {
        "XGPPMPMostPopular": "eab7757c-ff70-45af-bfa6-79d3cfb2bf81,a884932a-f02b-40c8-a903-a008c23b1df1",
        "XGPPMPRecentlyAdded": "f13cf6b4-57e6-4459-89df-6aec18cf0538,3fdd7f57-7092-4b65-bd40-5a9dac1b2b84",
        "XGPPMPIDXbox": "fc40d1b9-85ec-422d-b454-8685fb31776e,4c894453-744d-4b35-acea-40df9f4312b1",
        "XGPPMPActionAdventure": "fafb048d-9850-4447-ae20-f8f698bd208a,0f4967a6-7226-48bd-8ab4-a6ef40b09981",
        "XGPPMPShooters": "72c5a54f-45f9-4723-970c-1c8040cffe2e,590d891f-0f12-4bd6-8d58-28c5d612ba38",
        "XGPPMPFamilyFriendly": "8e7cd765-1293-44e0-95bb-8257e2bf0221,8e5089f1-5947-4ce1-9db1-94644556e493",
        "SubsXGPLeavingSoon": "393f05bf-e596-4ef6-9487-6d4fa0eab987,cc7fc951-d00f-410e-9e02-5e4628e04163",
        "subsxgprecentlyadded": "f13cf6b4-57e6-4459-89df-6aec18cf0538",
        "subsxgpchannel9": "fc40d1b9-85ec-422d-b454-8685fb31776e",
        "subsxgpchannel5": "fafb048d-9850-4447-ae20-f8f698bd208a",
        "subsxgpchannel6": "72c5a54f-45f9-4723-970c-1c8040cffe2e",
        "subsxgpchannel4": "8e7cd765-1293-44e0-95bb-8257e2bf0221",
        "consoleleavingsoon": "393f05bf-e596-4ef6-9487-6d4fa0eab987",
        "pcrecent": "3fdd7f57-7092-4b65-bd40-5a9dac1b2b84",
        "pccomingsoon": "4165f752-d702-49c8-886b-fb57936f6bae",
        "pcgaVTpopular": "a884932a-f02b-40c8-a903-a008c23b1df1",
        "pcgaVTIndies": "1e2ce757-e84f-4d2c-9243-34b81912644a",
        "pcgaVTRPG": "c621daed-3d22-4745-afc9-19ed77a2e9be",
        "pcgaVTStrategy": "7a3b01ac-93e4-4d52-81ad-980bc4cb4ff5",
        "pcgaVTFamily": "0f0bccc0-cdc8-4e1a-bfca-4b7da5c6c418",
        "pcgaVTSimulation": "f0e9ffe0-176e-41af-be11-c40a05d26e2c",
        "pcleavingsoon": "cc7fc951-d00f-410e-9e02-5e4628e04163",
        "subsxgpchannel3": "f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e",
        "popCloud": "e7590b22-e299-44db-ae22-25c61405454c",
        "allCloud": "29a81209-df6f-41fd-a528-2ae6b91f719c",
        "mobileCloud": "88c10a22-33b5-4e24-90b6-125bee02da39",
        "aaCloud": "ebedc400-a688-4929-b794-4435b2e1ab0a",
        "famCloud": "f576ca76-9aad-4ac7-a0f0-71429ef36850",
        "fightCloud": "c4be032d-0f42-4df5-8934-1758748cf7f0",
        "indieCloud": "95f39cf3-48ec-4d3c-83e6-a7f6916fbdfe",
        "rpgCloud": "e68225ce-e42f-4156-998d-697bf985da73",
        "shooterCloud": "38441e3f-26c6-498c-8b84-0ca20a3785af",
        "simCloud": "200674bd-7bd4-4360-bd0f-af8cd899839f",
        "stratCloud": "5d6c2384-b30e-4717-86f6-e684e819622b",
        "touchCloud": "7d8e8d56-c02f-4711-afec-73a80d8e9261",
        "sportsConsole": "796c328b-4a17-4996-99f8-0edb59bef85a",
        "sportsPC": "6661f37d-6159-4c9c-81d8-668af0a78b04",
        "rpgConsole": "18e0b0af-cefe-4492-845c-b9f6ab8737f8",
        "eaplayAll": "b8900d09-a491-44cc-916e-32b5acae621b",
        "eaplayConsole": "b8900d09-a491-44cc-916e-32b5acae621b",
        "popularconsole": "eab7757c-ff70-45af-bfa6-79d3cfb2bf81",
        "consolecomingsoon": "095bda36-f5cd-43f2-9ee1-0a72f371fb96",
        "pdoConsole": "a672552e-fdc2-4ecd-96e9-b8409193f524",
        "pdoPC": "4b59700c-801f-494a-a34c-842b8c98f154",
        // "musthaveConsole" : "ddba2cbd-5f5c-4e5f-baeb-a08fbafe86a6",
        // "musthavePC" : "98054d59-3082-4e1f-8991-3de33aea8bf8",
        "pcgaVTaz": "609d944c-d395-4c0a-9ea4-e9f39b52c1ad",
        "animalconsole": "bc3db341-2584-4f25-b836-e6ad04b4173e",
        "animalpc": "31d918c0-0287-45bc-bc77-66fc514bba0a",
    }

    for (var p = 0; p < newListIds.length; p++) {
        xgpGuidArray.unshift(newListIds[p]);
        guidAmpt[globalAdd[newListIds[p]].colname] = newListIds[p];
    }


    xgplistUrl = xgplistUrl.replace("LANG", urlRegion).replace("MARK", urlRegion.split("-")[1].toUpperCase());
    xgplistUrlPC = xgplistUrlPC.replace("LANG", urlRegion).replace("MARK", urlRegion.split("-")[1].toUpperCase());

    fullGameArray = [];

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
                var idlength = listData.length
                var idArray = [];
                for (var j = 1; j < idlength; j++) {
                    if (swapgames[listData[j].id] !== undefined) {
                        if (idArray.indexOf(swapgames[listData[j].id]) === -1) {
                            idArray.push(swapgames[listData[j].id])
                        }
                    } else {
                        if (idArray.indexOf(listData[j].id) === -1) {
                            idArray.push(listData[j].id)
                        }
                    }
                }
                var apiTitle = listData[0].title;
                if (globalAdd[arrayname] !== undefined) {
                    if (globalAdd[arrayname].title.indexOf("^") !== -1) { // use json loc titles
                        var titleVar = globalAdd[arrayname].title.split("^")[1];
                        globalAdd[arrayname].title = titleStrings[titleVar].locales[urlRegion].keyTitle;
                    } else if (globalAdd[arrayname].title.indexOf("**") !== -1) { // regions listed after ** use string, not json loc title
                        var specialtitlelocs = globalAdd[arrayname].title.split("**")[1];
                        if (specialtitlelocs.indexOf(urlRegion) !== -1) {
                            globalAdd[arrayname].title = globalAdd[arrayname].title.split("**")[0];
                        } else {
                            globalAdd[arrayname].title = apiTitle;
                        }
                    } else if (globalAdd[arrayname].title.indexOf("%") !== -1) { // use string globally
                        globalAdd[arrayname].title = globalAdd[arrayname].title.split("%")[1];
                    } else {
                        globalAdd[arrayname].title = apiTitle;
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
                if (arrayname === "609d944c-d395-4c0a-9ea4-e9f39b52c1ad") {
                    // $.get(url + "&skipItems=200")
                    //   .done(function(responseData) {
                    //     listData = responseData;
                    //     var idlength = listData.Items.length;
                    //     for (var j = 0; j < idlength; j++) {
                    //       if (swapgames[listData.Items[j].Id] !== undefined) {
                    //         if (gameIdArrays[arrayname].indexOf(swapgames[listData.Items[j].Id]) === -1) {
                    //           gameIdArrays[arrayname].push(swapgames[listData.Items[j].Id])
                    //           if (fullGameArray.indexOf(listData.Items[j].Id) === -1) {
                    //             fullGameArray.push(listData.Items[j].Id)
                    //           }
                    //         }
                    //       } else {
                    //         if (gameIdArrays[arrayname].indexOf(listData.Items[j].Id) === -1) {
                    //           gameIdArrays[arrayname].push(listData.Items[j].Id)
                    //           if (fullGameArray.indexOf(listData.Items[j].Id) === -1) {
                    //             fullGameArray.push(listData.Items[j].Id)
                    //           }
                    //         }
                    //       }
                    //     }
                    var activecheck1 = setInterval(function() {
                        var activeAjax = $.active;
                        if (activeAjax === 0) {
                            chunktotal = Math.ceil(fullGameArray.length / 20)
                            grabLists();
                            clearInterval(activecheck1);
                        }
                    }, 500);


                    // })
                }
                // gameIdArrays.push(idArray);
                // if (gameIdArrays.length === catGuidArray.length) {  
                //   popLists();
                // }
            })
    }

    var capArray = ["&gamecapabilities=capability4k:fourk", "&gamecapabilities=capabilityhdr:HDRGaming", "&NumberOfPlayers=OnlineMultiplayerWithGold:multionline", "&NumberOfPlayers=LocalMultiplayer:multilocal",
        "&NumberOfPlayers=CoopSupportOnline:cooponline", "&NumberOfPlayers=CoopSupportLocal:cooplocal",
        "&gamecapabilities=consolecrossgen:cross", "&gamecapabilities=ConsoleGen9Optimized:genNine"
    ];

    function grabLists() {
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
                                    if (gameIdArrays[arrayname].indexOf(e.Id) === -1) {
                                        gameIdArrays[arrayname].push(e.Id);
                                    }
                                })
                                if (totalitems > 200) {
                                    var chunks = Math.ceil(totalitems / 200)
                                    largeList(listUrl, arrayname, chunks, true);
                                }
                                if (i === capUrls.length - 1 && j === capArray.length - 1) {
                                    var recoactivecheck = setInterval(function() {
                                        var recoactiveAjax = $.active;
                                        if (recoactiveAjax === 0) {
                                            recodone();
                                            clearInterval(recoactivecheck);
                                        }
                                    }, 500);
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
                                    if (gameIdArrays[arrayname].indexOf(e.Id) === -1) {
                                        gameIdArrays[arrayname].push(e.Id);
                                    }
                                } else {
                                    if (excludebids.indexOf(e.Id) === -1) {
                                        gameIdArrays[arrayname].push(e.Id);
                                    }
                                    // if (fullGameArray.indexOf(e.Id) === -1 && excludebids.indexOf(e.Id) === -1) {
                                    //     fullGameArray.push(e.Id);
                                    // }
                                }
                            })
                        })
                })(i);
            }
        }

        function recodone() {
            popJSON();
        }

    };

    function popJSON() {
        // add new collections
        for (var p = 0; p < newListIds.length; p++) {
            $(".collections-" + globalAdd[newListIds[p]].plat + " a").eq(globalAdd[newListIds[p]].spot - 1)
                .before('<a class="coloption c-paragraph-3" href="#" aria-label="filter by ' + globalAdd[newListIds[p]].title +
                    ' games" data-col="' + globalAdd[newListIds[p]].colname + '">' +
                    '<span>' + globalAdd[newListIds[p]].title + '</span></a>');

        }
        // translate new GUID lists to old names
        var guidAmptKeys = Object.keys(guidAmpt);
        for (var i = 0; i < guidAmptKeys.length; i++) {
            if (guidAmpt[guidAmptKeys[i]].indexOf(",") > -1) {
                var a = gameIdArrays[guidAmpt[guidAmptKeys[i]].split(",")[0]];
                var b = gameIdArrays[guidAmpt[guidAmptKeys[i]].split(",")[1]];
                var c = [];
                for (var j = 0; j < a.length; j++) {
                    c.push(a[j]);
                }
                for (var j = 0; j < b.length; j++) {
                    if (c.indexOf(b[j]) === -1) {
                        c.push(b[j]);
                    }
                }
                gameIdArrays[guidAmptKeys[i]] = c;
            } else {
                gameIdArrays[guidAmptKeys[i]] = gameIdArrays[guidAmpt[guidAmptKeys[i]]];
            }
        }
        // make leaving soon pc and console lists
        gameIdArrays["SubsXGPAllGames"] = gameIdArrays["subsxgpchannel3"];
        // gameIdArrays["consoleleavingsoon"] = [];
        // gameIdArrays["pcleavingsoon"] = [];
        // for (var i = 0; i < gameIdArrays["SubsXGPLeavingSoon"].length; i++) {
        //   if (gameIdArrays["subsxgpchannel3"].indexOf(gameIdArrays["SubsXGPLeavingSoon"][i]) > -1 && 
        //       gameIdArrays["consoleleavingsoon"].indexOf(gameIdArrays["SubsXGPLeavingSoon"][i]) === -1) {
        //     gameIdArrays["consoleleavingsoon"].push(gameIdArrays["SubsXGPLeavingSoon"][i])
        //   }
        //   if (gameIdArrays["pcgaVTaz"].indexOf(gameIdArrays["SubsXGPLeavingSoon"][i]) > -1 && 
        //       gameIdArrays["pcleavingsoon"].indexOf(gameIdArrays["SubsXGPLeavingSoon"][i]) === -1) {
        //     gameIdArrays["pcleavingsoon"].push(gameIdArrays["SubsXGPLeavingSoon"][i])
        //   }
        // }
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
            $("body").css("visibility", "visible");
        }, 650);
        // special needs for page


        //$(".xghsearch input").attr("placeholder", regionContent["keyAriasearchplaceholder"]);

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
    };

    var catGuidArray = ["HDRGaming", "IDXPAgaming.homepage", "TryForFree.homepage"];
    //var catClassArray = ["catFeatured", "catRecent", "catMs", "catId", "catAll"];
    var fullGameListId = "SpringSale2017All.games";
    var countcheckUrl = "http://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/CATEGORY?itemTypes=Game&DeviceFamily=Windows.Xbox&market=US&count=1";
    var listUrl = "http://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/CATEGORY?itemTypes=Game&DeviceFamily=Windows.Xbox&market=US&count=200&skipItems=0";

    // var windowresized2 = (function () {
    //   var timers = {};
    //   return function (callback, ms, uniqueId) {
    //     if (!uniqueId) {
    //       uniqueId = "Fires only once.";
    //     }
    //     if (timers[uniqueId]) {
    //       clearTimeout (timers[uniqueId]);
    //     }
    //     timers[uniqueId] = setTimeout(callback, ms);
    //   };
    // })();

    // $(window).resize(function () {
    //   windowresized2(function(){
    //     var newWidth = $(document).width();
    //     paginateSetup(prunedGames, 0);
    //     $(".gameDivsWrapper").removeAttr("style");
    //     if (newWidth > 768) {
    //       $(".gameSelectors").attr("style", "");
    //     }
    //   }, 200, "pageresize");
    // });

    function GUID_pop(rawGuids) {
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
        gameIdArrays["exclusives"] = [];
        gameIdArrays["newreleases"] = [];
        gameIdArrays["multiplayer"] = [];
        gameIdArrays["upcoming"] = [];
        gameIdArrays["kidsfamily"] = [];
        gameIdArrays["onsale"] = [];
        // gameIdArrays["enhanced"] = gameIdArrays["enhanced"].filter(function(v) { return fullGameArray.indexOf(v) !== -1});
        gameIdArrays["enhanced"] = [];
        gameIdArrays["360games"] = [];
        gameIdArrays["physical"] = [];

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
            eliminated = bigidsgiven.filter(function(v) { return allprodids.indexOf(v) === -1 });

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
                            excludeit404 += 1;
                            excludeitpurch += 1;
                        }
                        if (av.Actions.indexOf("Details") !== -1) {
                            excludeit404 += 1;
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
                if (shortdesc === undefined || shortdesc === null) {
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
                var platcloud = "false";
                var platxo = "false";
                var platxsx = "false";
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

                    if (platxbox === "true") {
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
                    }

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

                if (platpc === "false" && platxbox === "false" && (gameIdArrays["609d944c-d395-4c0a-9ea4-e9f39b52c1ad"].indexOf(itemId) !== -1 ||
                        gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"].indexOf(itemId) !== -1)) {
                    platpc = "true";
                } else if (platpc === "false" && platxbox === "false") {
                    platxbox = "true";
                }
                if (platpc === "true" && platxbox === "false") {
                    platxsx = "false";
                }
                if (gameIdArrays["eaplayPC"].indexOf(itemId) !== -1) {
                    platxbox = "false";
                    platxsx = "false";
                    platpc = "true"
                }

                if (listprice === undefined) {
                    console.log("NOTE: BigID " + itemId + " has no price information.");
                    listprice = 100000000;
                    msrpprice = 100000000;
                    currencycode = "USD";
                }

                var rating = "none";
                var ratingcode = "";
                var ratingage = 99;
                var ratingsystem = "none";
                var kidfamilyratings = ["ESRB:T", "ESRB:E10", "ESRB:E", "ESRB:EC", "ESRB:RPEveryone", "ESRB:RPTeen", "PEGI:3", "PEGI:7", "PEGI:12", "COB-AU:G", "COB-AU:PG", "COB-AU:CTC", "OFLC-NZ:G",
                    "OFLC-NZ:PG", "OFLC-NZ:R13", "OFLC-NZ:R13", "USK:Everyone", "USK:6", "USK:12", "IARC:3", "IARC:7", "IARC:12", "CERO:A", "CERO:B", "USK:6", "USK:Everyone", "USK:6",
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
                    if (urlRegion === "es-ar" || urlRegion === "es-co" || urlRegion === "es-cl") {
                        rating = osgratings["displayData"][ratingcode]["en-us"].longName;
                    } else if (osgratings["displayData"][ratingcode] === undefined || osgratings["displayData"][ratingcode][osgregion] === undefined) {
                        rating = '';
                    } else {
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
                if (data.Products[i].MarketProperties[0].UsageData) {
                    //avgstars = data.Products[i].MarketProperties[0].UsageData[0].AverageRating;
                    //ratingcount = data.Products[i].MarketProperties[0].UsageData[0].RatingCount;
                }


                if (itemId === "9NCLP4LV5K7Z") {
                    itemBoxshot = "https://store-images.s-microsoft.com/image/apps.28362.67453348098260763.a9f96429-c651-425e-97d2-e8861561f15f.f7b26f7f-73d8-4f53-9f3b-4d9e4e4d23f0";
                    itemBoxshotSmall = "https://store-images.s-microsoft.com/image/apps.28362.67453348098260763.a9f96429-c651-425e-97d2-e8861561f15f.f7b26f7f-73d8-4f53-9f3b-4d9e4e4d23f0";
                }
                // if (itemId === "BZFK7WNK7R4M") {
                //   itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
                //   itemBoxshotSmall = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
                // }    

                // genres
                var gamegenresall = [];
                    if (data.Products[i].Properties.Categories !== undefined && data.Products[i].Properties.Categories !== null) {
                        var gamegenres = data.Products[i].Properties.Categories[0];
                        gamegenresall = data.Products[i].Properties.Categories;
                    } else if (data.Products[i].Properties.Category !== undefined && data.Products[i].Properties.Category !== null) {
                        var gamegenres = data.Products[i].Properties.Category;
                        gamegenresall.push(gamegenres)
                    } else {
                        var gamegenres = "";
                        gamegenresall = [""];
                    }

                var recentxgp = "false";
                if (gameIdArrays["subsxgprecentlyadded"].indexOf(itemId) !== -1 || gameIdArrays["XGPPMPRecentlyAdded"].indexOf(itemId) !== -1) {
                    recentxgp = "true";
                }
                var leavingsoon = "false";
                if (gameIdArrays["SubsXGPLeavingSoon"].indexOf(itemId) !== -1) {
                    leavingsoon = "true";
                }

                allGames[itemId] = {
                    releasedate: releaseDate,
                    msproduct: msproduct,
                    multiplayer: multiplayer,
                    coop: coop,
                    rating: rating,
                    ratingage: ratingage,
                    ratingsystem: ratingsystem,
                    gameurl: itemhref,
                    titleclickname: titleClickname,
                    ratimage: ratimage,
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
                    genresAll: gamegenresall,
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
                    silversaleperc: silversaleperc,
                    goldandsilversalegoldperc: goldandsilversalegoldperc,
                    x360game: "false",
                    includes: "",
                    excludes: "",
                    playson: "false",
                    moddate: modDate,
                    recentxgp: recentxgp,
                    platformxbox: platxbox,
                    platformpc: platpc,
                    licensekeys: licensekeys,
                    leavingsoon: leavingsoon,
                    eaplaypcgame: "false",
                    platformxo: platxo,
                    platformxsx: platxsx
                };

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
                if (gameIdArrays["eaplayPC"].indexOf(itemId) > -1) {
                    allGames[itemId]["eaplaypcgame"] = "true";
                }


                popcounter++;

                //console.log("itemId:" + itemId + "  " + i + ":" + (productQuantity -1) + "   " + popcounter + ":" + (fullGameArray.length) + "  locagamesremoved:" + locgamesremoved + "   " + count + ":" + chunktotal)

                if ((i === (productQuantity - 1)) && count === chunktotal - 1) {
                    var activecheck = setInterval(function() {
                        var activeAjax = $.active;
                        if (activeAjax === 0) {
                            ajaxdone();
                            popRotator();
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
                        //       if (gameIdArrays["subsxgpchannel3"].indexOf(allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]) > -1 && 
                        //           gameIdArrays[pcarrays[i]][j] !== allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]) {
                        //         console.log("replacing pc list " + gameIdArrays[pcarrays[i]][j] + " with " + allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]);
                        //         replacepcwithcon(gameIdArrays[pcarrays[i]][j], allGames[gameIdArrays[pcarrays[i]][j]].licensekeys[k]);
                        //       }
                        //     }
                        //   }
                        // }

                        $(".gameDiv").last().after('<script type="text/javascript" src="/en-US/global-resources/templates/MWF/JS/MWF-Aria-Boxshots-loc.js"></s' + 'cript>');
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
                        var beginfeat = "avail-download";
                        if (durl.indexOf("multiplayer") !== -1) {
                            beginfeat = 'avail-download,feature-multiplayer';
                        }
                        if (durl.indexOf("co-op") !== -1) {
                            beginfeat = 'avail-download,feature-coop';
                        }
                        if (durl.indexOf("4k") !== -1) {
                            beginfeat = 'avail-download,feature-4k';
                        }
                        if (durl.indexOf("hdr") !== -1) {
                            beginfeat = 'avail-download,feature-hdr'; //consolecomingsoon
                        }

                        collectioninfo = {
                            "allpopular": { plat: "xbox", ampt: "popularconsole" },
                            "allrecent": { plat: "xbox", ampt: "subsxgprecentlyadded" },
                            "consoleid": { plat: "xbox", ampt: "subsxgpchannel9" },
                            "allaction": { plat: "xbox", ampt: "subsxgpchannel5" },
                            "allshooters": { plat: "xbox", ampt: "subsxgpchannel6" },
                            "allfamily": { plat: "xbox", ampt: "subsxgpchannel4" },
                            "allleaving": { plat: "xbox", ampt: "consoleleavingsoon" },
                            "consolerecent": { plat: "xbox", ampt: "subsxgprecentlyadded" },
                            "consoleid": { plat: "xbox", ampt: "subsxgpchannel9" },
                            "consoleshooters": { plat: "xbox", ampt: "subsxgpchannel6" },
                            "consolefamily": { plat: "xbox", ampt: "subsxgpchannel4" },
                            "consolepopular": { plat: "xbox", ampt: "popularconsole" },
                            "consolecomingsoon": { plat: "xbox", ampt: "consolecomingsoon" },
                            "consoleleavingsoon": { plat: "xbox", ampt: "consoleleavingsoon" },
                            "pcpopular": { plat: "pc", ampt: "pcgaVTpopular" },
                            "pcrecent": { plat: "pc", ampt: "pcrecent" },
                            "pccomingsoon": { plat: "pc", ampt: "pccomingsoon" },
                            "pcleavingsoon": { plat: "pc", ampt: "pcleavingsoon" },
                            "consolegames": { plat: "xbox", ampt: "SubsXGPAllGames" },
                            "pcgames": { plat: "pc", ampt: "pcgaVTaz" },
                            // "shocktober" : { plat: "all", ampt: "shocktoberall"},
                            "xboxtouchcontrols": { plat: "cloud", ampt: "touchCloud" },
                            "eaplay": { plat: "xbox", ampt: "eaplayConsole" },
                            "consoleea": { plat: "xbox", ampt: "eaplayConsole" },
                            "cloud": { plat: "cloud", ampt: "allCloud" },
                            "pcdayone": { plat: "pc", ampt: "pdoPC" },
                            "consoledayone": { plat: "xbox", ampt: "pdoConsole" },
                            "consolecomingsoon": { plat: "xbox", ampt: "consolecomingsoon" },
                            "comingsoonconsole": { plat: "xbox", ampt: "consolecomingsoon" },
                            "bethesdaall": { plat: "xbox", ampt: "bethxbox" }
                        };

                        // add new collections
                        for (var p = 0; p < newListIds.length; p++) {
                            if (globalAdd[newListIds[p]].startstring.length > 0) {
                                collectioninfo[globalAdd[newListIds[p]].startstring] = {};
                                collectioninfo[globalAdd[newListIds[p]].startstring].plat = globalAdd[newListIds[p]].plat;
                                collectioninfo[globalAdd[newListIds[p]].startstring].ampt = globalAdd[newListIds[p]].colname;
                            }
                        }

                        // modify lists
                        gameIdArrays.eaplayAll = gameIdArrays.eaplayAll.concat(gameIdArrays.eaplayPC);

                        var ciarray = Object.keys(collectioninfo);

                        for (var c = 0; c < ciarray.length; c++) {
                            if (durl.indexOf(ciarray[c]) !== -1) {
                                $(".platformselection a").removeClass("platselected");
                                $("[data-theplat=" + collectioninfo[ciarray[c]].plat + "]").addClass("platselected");
                                $(".coloption").removeClass("col-selected");
                                $("[data-col=" + collectioninfo[ciarray[c]].ampt + "]").addClass("col-selected");
                                $(".gameSelector").attr("data-colselected", collectioninfo[ciarray[c]].ampt);
                                beginningState(collectioninfo[ciarray[c]].plat);
                                listGames(collectioninfo[ciarray[c]].ampt, beginfeat, "release", collectioninfo[ciarray[c]].plat);
                                filtersort();
                                break;
                            }
                            if (c === ciarray.length - 1) {
                                beginningState("xbox");
                                listGames("SubsXGPAllGames", beginfeat, "release", "xbox");
                                filtersort();
                            }
                        }

                        // hero filter click
                        $(".m-hero a").click(function(e) {
                            if ($(this).attr("href").indexOf("#") !== -1) {
                                e.preventDefault();
                                var col = $(this).attr("href").split("#")[1];
                                beginningState(collectioninfo[col].plat);
                                listGames(collectioninfo[col].ampt, beginfeat, "release", collectioninfo[col].plat);
                                filtersort();
                                $(".col-selected").removeClass("col-selected");
                                $("[data-col='" + collectioninfo[col].ampt + "']").addClass("col-selected");
                            }
                        })

                        function beginningState(platform) {
                            $(".colgroup").addClass("hidden");
                            var newplat = platform;
                            $(".collections-" + newplat).removeClass("hidden");
                            $(".collections-" + newplat).find("a").eq(0).click();
                            $(".platformselection").attr("data-platselected", newplat);
                            $(".platformselection").attr("data-platclicked", "true");

                            var filterAnchors = {
                                "consoleaction": { plat: "xbox", filterId: "genre-action & adventure" },
                                "pcaction": { plat: "pc", filterId: "genre-action & adventure" },
                                "consoleclassics": { plat: "xbox", filterId: "genre-classics" },
                                "pcclassics": { plat: "pc", filterId: "genre-classics" },
                                "consoleindie": { plat: "xbox", filterId: "genre-indie" },
                                "pcindie": { plat: "pc", filterId: "genre-indie" },
                                "consoleplatformers": { plat: "xbox", filterId: "genre-platformers" },
                                "pcplatformers": { plat: "pc", filterId: "genre-platformers" },
                                "consolepuzzle": { plat: "xbox", filterId: "genre-puzzle" },
                                "pcpuzzle": { plat: "pc", filterId: "genre-puzzle" },
                                "consoleshooters": { plat: "xbox", filterId: "genre-shooter" },
                                "pcshooters": { plat: "pc", filterId: "genre-shooter" },
                                "pcrpg": { plat: "pc", filterId: "genre-rpg" },
                                "consolerpg": { plat: "xbox", filterId: "genre-role-playing" },
                                "consolesports": { plat: "xbox", filterId: "genre-sports" },
                                "pcsports": { plat: "pc", filterId: "genre-sports" },
                                "consolestrategy": { plat: "xbox", filterId: "genre-strategy" },
                                "pcstrategy": { plat: "pc", filterId: "genre-strategy" },
                                "cloud": { plat: "xbox", filterId: "delivery-cloud" }
                            }
                            var filterAnchorKeys = Object.keys(filterAnchors);

                            setTimeout(function() {
                                $(".platformselection").attr("data-platclicked", "false");
                                for (var a = 0; a < filterAnchorKeys.length; a++) {
                                    if (durl.indexOf(filterAnchorKeys[a]) !== -1) {
                                        runStartingFilter(filterAnchors[filterAnchorKeys[a]].plat, filterAnchors[filterAnchorKeys[a]].filterId)
                                    }
                                }

                                function runStartingFilter(platform, id) {
                                    $("[data-theplat='" + platform + "']")[0].click();
                                    $("[data-cat='" + id + "']")[0].click();
                                }
                            }, 500)

                            if (document.URL.indexOf("#") !== -1) {
                                // $(".availability").addClass("hidden");
                                setTimeout(function() {
                                    var btttop = $(".GridSmall").position().top;
                                    $("HTML, BODY").animate({
                                        scrollTop: btttop
                                    }, 500);
                                }, 50)
                            } else {
                                // $(".availability").removeClass("hidden");
                            }

                        }
                    }
                }
            }
        }
    }

    // setTimeout(function() {
    //   $("div").last().after('<script async="async" src="http://assets.onestore.ms/cdnfiles/external/mwf/long/v1/v1.21.0/scripts/mwf-auto-init-main.var.min.js"></s' + 'cript>' +
    //           '<noscript></nos' + 'cript>');   
    // }, 2500)

    function listGames(cat, filt, sort, plat, searchactive) {
        setTimeout(function() {
            $(".specialBanners").addClass("hide");
            $(".enhancedlink").addClass("hide");
            $(".looklogo").addClass("hide");
            $(".eappcBanner").addClass("hide");
            $(".gamesFilters").removeClass("filtersdisabled").removeAttr("tabindex");
            $(".gamesFilters *").removeAttr("tabindex")
            if (cat === "all") {
                //get rid of coming soon from fga
                if (gameIdArrays["095bda36-f5cd-43f2-9ee1-0a72f371fb96"] !== undefined) {
                    fullGameArrayNoComingSoon = fullGameArray.filter(function(v) { return gameIdArrays["095bda36-f5cd-43f2-9ee1-0a72f371fb96"].indexOf(v) === -1 });
                }
                if (gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"] !== undefined) {
                    fullGameArrayNoComingSoon = fullGameArray.filter(function(v) { return gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"].indexOf(v) === -1 });
                }
                cat = fullGameArrayNoComingSoon;
            } else if (sort === "search") {
                cat = cat;
            } else {
                cat = gameIdArrays[cat];
            }
            if (cat === gameIdArrays["consoleleavingsoon"] || cat === gameIdArrays["pcleavingsoon"]) {
                $(".messageLeavingSoon").removeClass("hide");
            }
            if (cat === gameIdArrays["pdoConsole"] || cat === gameIdArrays["pdoPC"]) {
                $(".messagePlayDayOne").removeClass("hide");
            }
            if (cat === gameIdArrays["SubsXGPLeavingSoon"]) {
                $(".looklogo").removeClass("hide");
            }
            $(".nogamesfound").hide().find("h3").text(regionContent["keyCopynogamesfound"]);

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
            if (filterarray.length > 1) {
                var theplat = $(".platformselection").attr("data-platselected");
                for (var i = 0; i < ratarrlen; i++) {
                    var availset, platset, genreset, featureset, ratingset, playonset, deliveryset, inputset;
                    availset = platset = genreset = featureset = ratingset = playonset = deliveryset = inputset = 0;
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
                    // if (filt.indexOf("plat-") !== -1) {
                    if (theplat === "xbox" && gameIdArrays["SubsXGPAllGames"].indexOf(selectedGames[i]) !== -1) {
                        platset = 1;
                    } else if (theplat === "pc" && gameIdArrays["pcgaVTaz"].indexOf(selectedGames[i]) !== -1) {
                        platset = 1;
                    }

                    // genre filter
                    if (filt.indexOf("genre-") !== -1) {
                        if (filt.indexOf("genre-indie") !== -1) {
                            if (theplat === "xbox") {
                                if (gameIdArrays["XGPPMPIDXbox"].indexOf(selectedGames[i]) !== -1) {
                                    genreset = 1;
                                }
                            } else if (theplat === "pc") {
                                if (gameIdArrays["pcgaVTIndies"].indexOf(selectedGames[i]) !== -1) {
                                    genreset = 1;
                                }
                            }

                            // for (var h = 0; h < gameIdArrays["indie"].length; h++) {
                            //   if (selectedGames[i] === gameIdArrays["indie"][h]) {
                            //     genreset = 1;
                            //     break;
                            //   }
                            // }
                        }
                        if (filt.indexOf("genre-family") !== -1 && theplat === "pc") {
                            if (gameIdArrays["pcgaVTFamily"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }
                        if (filt.indexOf("genre-simulation") !== -1 && theplat === "pc") {
                            if (gameIdArrays["pcgaVTSimulation"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }
                        if (filt.indexOf("genre-strategy") !== -1 && theplat === "pc") {
                            if (gameIdArrays["pcgaVTStrategy"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }
                        if (filt.indexOf("genre-rpg") !== -1) {
                            if (gameIdArrays["pcgaVTRPG"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }
                        if (filt.indexOf("genre-shooter") !== -1) {
                            if (gameIdArrays["XGPPMPShooters"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }
                        if (filt.indexOf("genre-sports") !== -1) {
                            if (gameIdArrays["allsports"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }
                        if (filt.indexOf("genre-action & adventure") !== -1) {
                            if (gameIdArrays["XGPPMPActionAdventure"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
                            }
                        }

                        if (filt.indexOf("genre-role-playing") !== -1) {
                            if (gameIdArrays["rpgConsole"].indexOf(selectedGames[i]) !== -1) {
                                genreset = 1;
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
                            if (allGames[selectedGames[i]]["genresAll"].join(" ").toLowerCase().indexOf(gf) !== -1) {
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
                                if (gameIdArrays["fourk"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-smartdelivery") {
                                if (gameIdArrays["cross"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-hdr") {
                                if (gameIdArrays["HDRGaming"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-multiplayer") {
                                if (allGames[selectedGames[i]]["multiplayer"] === "true") {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-multiplayerlocal") {
                                if (gameIdArrays["multilocal"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-coop") {
                                if (allGames[selectedGames[i]]["coop"] === "true") {
                                    featcount++;
                                }
                            } else if (allfeats[f] === "feature-cooplocal") {
                                if (gameIdArrays["cooplocal"].indexOf(selectedGames[i]) !== -1) {
                                    featcount++;
                                }
                            }
                        }
                        if (featcount === allfeats.length) { featureset = 1 }
                    } else {
                        featureset = 1;
                    }

                    // play on filter
                    if (filt.indexOf("playon-") !== -1) {
                        if (filt.indexOf("playon-seriesxs") !== -1) {
                            if (allGames[selectedGames[i]].platformxsx === "true") {
                                playonset = 1;
                            }
                        } else if (filt.indexOf("playon-x1") !== -1) {
                            if (gameIdArrays["SubsXGPAllGames"].indexOf(selectedGames[i]) !== -1) {
                                playonset = 1;
                            }
                        } else if (filt.indexOf("playon-windows") !== -1) {
                            if (gameIdArrays["pcgaVTaz"].indexOf(selectedGames[i]) !== -1) {
                                playonset = 1;
                            }
                        } else if (filt.indexOf("playon-android") !== -1) {
                            if (gameIdArrays["allCloud"].indexOf(selectedGames[i]) !== -1) {
                                playonset = 1;
                            }
                        } else if (filt.indexOf("playon-apple") !== -1) {
                            if (gameIdArrays["allCloud"].indexOf(selectedGames[i]) !== -1) {
                                playonset = 1;
                            }
                        } else if (filt.indexOf("playon-pc") !== -1) {
                            if (gameIdArrays["allCloud"].indexOf(selectedGames[i]) !== -1) {
                                playonset = 1;
                            }
                        }
                    } else {
                        playonset = 1;
                    }

                    // delivery filter
                    if (filt.indexOf("delivery-cloud") !== -1) {
                        if (gameIdArrays["allCloud"].indexOf(selectedGames[i]) !== -1) {
                            deliveryset = 1;
                        } else {
                            deliveryset = 0;
                        }
                    } else {
                        deliveryset = 1;
                    }

                    // inputs filter
                    if (filt.indexOf("inputs-touch") !== -1) {
                        if (gameIdArrays["touchCloud"].indexOf(selectedGames[i]) !== -1) {
                            inputset = 1;
                        } else {
                            inputset = 0;
                        }
                    } else {
                        inputset = 1;
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

                    filtsettotal = availset + platset + genreset + featureset + ratingset + playonset + deliveryset + inputset;
                    if (filtsettotal === 8) { // game passes all 4 filters
                        prunedGames.push(selectedGames[i]);
                    }
                }
            } else {
                if (filterarray.indexOf("avail-download") !== -1) {
                    for (var p = 0; p < ratarrlen; p++) {
                        if (allGames[selectedGames[p]]["physical"] === "false") {
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
            if (sort === "release") {
                // prunedGames = prunedGames.sort(asc_sort);
                // function asc_sort(a, b){
                //   return (new Date(allGames[a]["releasedate"])) < (new Date(allGames[b]["releasedate"])) ? 1 : -1;  
                // }
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    var anewmatch = 0;
                    var bnewmatch = 0;
                    if (allGames[a]["recentxgp"] === "true" && allGames[b]["recentxgp"] === "true") {
                        if ((new Date(allGames[a]["moddate"])) > (new Date(allGames[b]["moddate"]))) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                    if (allGames[a]["recentxgp"] === "true") {
                        return -1
                    } else {
                        return 1
                    }

                    //return anewmatch - bnewmatch || ($(a).data("mod")) < ($(b).data("mod")) ? 1 : -1;    
                }
            } else if (sort === "az") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (allGames[b]["title"].toLowerCase().trim()) < (allGames[a]["title"].toLowerCase().trim()) ? 1 : -1;
                }
            } else if (sort === "za") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (allGames[a]["title"].toLowerCase().trim()) < (allGames[b]["title"].toLowerCase().trim()) ? 1 : -1;
                }
            } else if (sort === "percdown") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (parseInt(allGames[a]["silversaleperc"])) < (parseInt(allGames[b]["silversaleperc"])) ? 1 : -1;
                }
            } else if (sort === "percup") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (parseInt(allGames[a]["silversaleperc"])) > (parseInt(allGames[b]["silversaleperc"])) ? 1 : -1;
                }
            } else if (sort === "pricedown") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (allGames[a]["listprice"]) < (allGames[b]["listprice"]) ? 1 : -1;
                }
            } else if (sort === "priceup") {
                prunedGames = prunedGames.sort(asc_sort);

                function asc_sort(a, b) {
                    return (allGames[a]["listprice"]) > (allGames[b]["listprice"]) ? 1 : -1;
                }
            }

            // platform prune - no longer needed, going purely by ampt lists
            // var platarray = [];
            // var pgnum = prunedGames.length;
            // if (plat === "pc") {
            //   for (var p = 0; p < pgnum; p++) {
            //     if (allGames[prunedGames[p]]["platformpc"] === "true") {
            //       platarray.push(prunedGames[p])
            //     }
            //   }
            // } else {
            //   for (var p = 0; p < pgnum; p++) {
            //     if (allGames[prunedGames[p]]["platformxbox"] === "true") {
            //       platarray.push(prunedGames[p])
            //     }
            //   }
            // }
            // prunedGames = platarray;

            paginateSetup(prunedGames);

            //filtersort();
            $(".c-progress.f-indeterminate-local.f-progress-large").hide();
            $(".gameDivsWrapper").removeClass("gdSorting");
            if ($(".gameDiv").length === 0) {
                if (cat === gameIdArrays["SubsXGPLeavingSoon"]) { // all leaving
                    $(".nogamesfound h3").text(regionContent["keyAllleavingsoon"])
                } else if (cat === gameIdArrays["consoleleavingsoon"]) {
                    $(".nogamesfound h3").text(regionContent["keyConsolesleavingsoon"])
                } else if (cat === gameIdArrays["pcleavingsoon"]) {
                    $(".nogamesfound h3").text(regionContent["keyPcleavingsoon"])
                }
                $(".nogamesfound").show();
                $(".resultsText").hide();
            }

            $(".gameDiv a .ratingstars").each(function() {
                var starperc = $(this).attr("data-starpercent") || "0";
                $(this).find(".c-rating[data-value].f-individual.filledstars div").css("width", starperc + "px");
            })

            if (plat === "all") {
                $(".availability").removeClass("hidden");
                $(".eappcBanner").removeClass("hide");
            } else {
                $(".availability").addClass("hidden");
            }
            if (plat === "xbox") {
                $(".filtConsoleOnly").show();
                $(".filtPCOnly").hide();
            }
            if (plat === "pc") {
                $(".filtPCOnly").show();
                $(".filtConsoleOnly").hide();
                $(".eappcBanner").removeClass("hide");
            }
            if (searchactive === true) {
                // setTimeout(function() {
                $(".xghsearch button").click();
                // }, 100)
            }

        }, 10);
    }
    gamesperpage = 20;
    $(document).on("click", ".paginateDropdown li", function(e) {
        e.preventDefault();
        //var newmax = parseInt($(this).attr("data-gamesmax"));
        var newmax = parseInt($(".paginateDropdown button").text().replace(/\D+/g, ''))

        //$(".pagcontroltitle").text(newmax);
        gamesperpage = newmax;
        paginateSetup(prunedGames);
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
        var gamesperpage = parseInt($(".paginateDropdown button").text().replace(/\D+/g, '')) || 20;
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
            var rs = allGames[selectedGames[i]]["ratingsystem"];
            if (!systems[rs]) {
                systems[rs] = 1
            } else {
                systems[rs]++
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
        if ($(".dynRatingItem").length === 0) {
            for (var i = 0; i < currentgameslength; i++) {
                if (allGames[selectedGames[i]]["ratingsystem"] !== bigsystem) {
                    allGames[selectedGames[i]]["rating"] = "none";
                } else {
                    var gamerating = "rating-" + allGames[selectedGames[i]]["rating"];
                    if ($(".ratingchoice[data-cat='" + gamerating + "']").length === 0 && allGames[selectedGames[i]]["rating"] !== "none") {
                        $("#ratingSelect").append('<li class="dynRatingItem" data-ratingage="' + allGames[selectedGames[i]]["ratingage"] + '">' +
                            '<a class="c-refine-item ratingchoice" href="#" aria-label="Refine by ' + allGames[selectedGames[i]]["rating"] + ' games" data-cat="' + gamerating + '">' +
                            //'<span aria-hidden="true">' + allGames[selectedGames[i]]["rating"] + '</span>' +
                            '<span aria-hidden="true">' + allGames[selectedGames[i]]["rating"] + '</span>' +
                            '</a></li>');
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
            setTimeout(function() {
                $(".dynRatingItem a").attr("tabindex", "0");
            }, 1000)
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
    }

    function paginate(array, page) {
        docwidth = $(document).width();
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
            var msrpshown = allGames[thebigid]["msrpprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
            var listshown = allGames[thebigid]["listprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
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
            // if (allGames[thebigid]["gameswithgold"] === "true") {
            //   badges+= '<span class="c-badge f-small f-highlight">' + regionContent["keyBadgegwg"] + '</span>'
            // } else if (allGames[thebigid]["onsale"] === "true") {
            //   badges+= '<span class="c-badge f-small f-highlight">' + regionContent["keyBadgeonsale"] + '</span>'
            // }
            // if (allGames[thebigid]["newrelease"] === "true") {
            //   badges+= '<span class="c-badge f-small badge-silver">' + regionContent["keyBadgenewrelease"] + '</span><br>'
            // }
            // if (allGames[thebigid]["upcoming"] === "true" && allGames[thebigid]["purchasable"] === "false") {
            //   badges+= '<span class="c-badge f-small badge-silver">' + regionContent["keyBadgecomingsoon"] + '</span><br>'
            // }
            // if (allGames[thebigid]["title"].toLowerCase().indexOf("preview") !== -1 || allGames[thebigid]["description"].toLowerCase().indexOf("game preview") !== -1) {
            //   badges+= ''
            // } else if (allGames[thebigid]["upcoming"] === "true" && allGames[thebigid]["purchasable"] === "true" && allGames[thebigid]["title"].toLowerCase().indexOf("game preview") === -1) {
            //   badges+= '<span class="c-badge f-small badge-silver">' + regionContent["keyBadgepreorder"] + '</span>'
            // }
            if (gameIdArrays["b8900d09-a491-44cc-916e-32b5acae621b"].indexOf(thebigid) > -1 ||
                gameIdArrays["1d33fbb9-b895-4732-a8ca-a55c8b99fa2c"].indexOf(thebigid) > -1) {
                badges += '<strong class="c-badge f-small f-highlight badge-silver c-caption-2">EA PLAY</strong>'
            }

            if (allGames[thebigid]["silversaleperc"] !== "0%") {
                //badges+= '<span class="c-badge f-small badge-silver">' + regionContent["keyPopbadgepercent"].replace("<PLACEHOLDER>", allGames[thebigid]["silversaleperc"]) + '</span>'
            }
            if (allGames[thebigid]["goldandsilversalegoldperc"] !== "0%") {
                //badges+= '<span class="c-badge f-small f-highlight">GOLD ' + regionContent["keyPopbadgepercent"].replace("<PLACEHOLDER>", allGames[thebigid]["goldandsilversalegoldperc"]) + '</span>'
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
            var thesmallstars = '';
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

                thesmallstars = '<div class="ratingstars" data-starpercent="' + starsfilled + '"><div class="c-rating f-individual emptystars" data-value="' + avgrating +
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
                    '</div></div></div>';
                // $("body").append('<style>.c-rating[data-value].f-individual div {height: 30px;width: 138px;}.ratingstars {position:relative;display: inline-block;vertical-align: middle;}.emptystars {position: absolute;left: 0;right: 0;}' +
                //     '.filledstars.c-rating[data-value].f-individual div:after, .filledstars.c-rating[data-value].f-individual div:before {width:' + starsfilled + 'px; overflow:hidden;}' +
                //     '.startotalratings{display: inline-block;font-size: 16px;margin-left: 12px;}');
            }

            var thedescriptors = '';
            var rawdesc = allGames[thebigid]["descriptors"];
            var rdarray = rawdesc.split(", ");
            var rdtext = [];
            for (var r = 0; r < rdarray.length; r++) {
                if (ratingDescriptors[rdarray[r]] !== undefined) {
                    rdtext.push(ratingDescriptors[rdarray[r]]);
                } else {
                    rdtext.push(rdarray[r]);
                }
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

            if (gameIdArrays["allCloud"].indexOf(thebigid) !== -1) {
                if (previousExists) {
                    popiconXpa += '<span class="featureCircle"> ● </span>'
                }
                popiconXpa += '<span class="c-paragraph-3"> ' + quickLookLocStrings.locales[urlRegion]["keyCloudenabled"] + ' </span>';
                previousExists = true;
            }

            var popbadges = '';
            var popgoldprice = '';
            if (allGames[thebigid]["msrpprice"] !== allGames[thebigid]["listprice"]) {
                popbadges += '<span class="c-badge f-small badge-silver">' + regionContent["keyPopbadgepercent"].replace("<PLACEHOLDER>", allGames[thebigid]["silversaleperc"]) + '</span>'
            }

            if (allGames[thebigid]["goldandsilversale"] === "true") {
                popbadges += '<span class="c-badge f-small f-highlight">' + regionContent["keyPopgolddiscount"] + '</span>';
                var specialshown = allGames[thebigid]["goldandsilversalegoldprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                popgoldprice += '<div class="popgoldarea"><div class="c-price popgoldprice" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                    '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
                    '<span class="textpricenew x-hidden-focus" itemprop="price">' + specialshown + '</span>' +
                    '</div>' +
                    '<img class="popgoldlogo" src="https://compass-ssl.xbox.com/assets/93/ca/93ca0eec-39bc-4db8-a0ca-e0ee603047b7.svg?n=X1-Games-Catalog_0_Gold-Logo_64x23.svg"></div>';
            } else if (allGames[thebigid]["golddiscount"] === "true" || allGames[thebigid]["gameswithgold"] === "true") {
                popbadges += '<span class="c-badge f-small f-highlight">' + regionContent["keyPopgolddiscount"] + '</span>';
                var specialshown = allGames[thebigid]["specialprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
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
                var eaprice = allGames[thebigid]["specialprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
                popservices += '<div class="servicesarea"><p>' + regionContent["keyPopeagame"].replace("<PLACEHOLDER>", eaprice) + '</p></div>';
            }

            var popbuytext = regionContent["keyBuynow"];
            if (allGames[thebigid]["title"].toLowerCase().indexOf("preview") !== -1 || allGames[thebigid]["description"].toLowerCase().indexOf("game preview") !== -1) {
                var popbuytext = regionContent["keyBuynow"];
            } else if (gameIdArrays["upcoming"].indexOf(thebigid) !== -1 && allGames[thebigid]["purchasable"] === "true") {
                popbuytext = regionContent["keyPreordernow"];
            }
            // var popgettext = regionContent["keyGetitnow"]; change all to learn more
            var popgettext = regionContent["keyLearnmore"];

            var dataret = '';
            if (allGames[thebigid]["gameurl"].toLowerCase().indexOf("games/store") !== -1) {
                dataret = 'data-retailer="ms store"'
            }

            if (allGames[thebigid]["gameurl"].toLowerCase().indexOf("games/store") !== -1) {
                priceButtons = '<a href="' + allGames[thebigid]["gameurl"] + '" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                    '>buy-now>click" class="c-call-to-action c-glyph popbuynow poplastbutton" target="_blank" ' + ' aria-label="' + popgettext + ", " + allGames[thebigid]["title"] + '"' + dataret + '>' +
                    '<span>' + popgettext + '</span>' +
                    '</a>'
            } else {
                priceButtons = //'<a href="https://www.microsoft.com/store/p/' + allGames[thebigid]["titleclickname"] + '/' + thebigid + '" data-clickname="www>games>xbox-one>' + // buy now to store
                    //'<a href="' + allGames[thebigid]["gameurl"] + '#purchaseoptions" data-clickname="www>games>xbox-one>' + 
                    //  allGames[thebigid]["titleclickname"] + '>buy-now>click" class="c-call-to-action c-glyph popbuynow" target="_blank">' +
                    //  '<span>' + popgettext + '</span>' +
                    '</a>' +
                    '<a href="' + allGames[thebigid]["gameurl"] + '" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                    '>learn-more>click" class="c-call-to-action c-glyph poplastbutton" target="_blank"' + ' aria-label="' + regionContent["keyLearnmore"] + " about " + allGames[thebigid]["title"] + '">' +
                    '<span>' + regionContent["keyLearnmore"] + '</span>' +
                    '</a>'

            }
            if (gameIdArrays["upcoming"].indexOf(thebigid) !== -1 && allGames[thebigid]["purchasable"] === "false") {
                popprice = '<div class="popprice">'
                popbadges = '';
                priceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
                    '<span class="textpricenew soontextprice x-hidden-focus" itemprop="price">' + regionContent["keyBadgecomingsoonlower"] + '</span>' +
                    '</div>';
                popgoldprice = '';
                popservices = '';
                priceButtons = '<a href="' + allGames[thebigid]["gameurl"] + '" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                    '>learn-more>click" class="c-call-to-action c-glyph poplastbutton" target="_blank"' + ' aria-label="' + regionContent["keyLearnmore"] + "about " + allGames[thebigid]["title"] + '">' +
                    '<span>' + regionContent["keyLearnmore"] + '</span>' +
                    '</a>'
            } else {
                popprice = '<div class="popprice">'
            }

            var plxb = '';
            var plpc = '';
            var plxsx = '';
            var plmo = '';
            var availon = '';

            if (allGames[thebigid]["platformxsx"] === "true") {
                plxsx = '<div class="c-tag">' +
                    // '<span class="c-glyph svg-xbox-series-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="20" height="20"><path d="M832 384q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM512 0h1024v2048H512V0zm896 1920V128H640v1792h128v-896h128v896h512z"></path></svg></span>' +
                    'Xbox Series X|S' +
                    '</div>';
            }

            if (allGames[thebigid]["platformxo"] === "true") {
                plxb = '<div class="c-tag">' +
                    // '<span class="c-glyph glyph-xbox-one-console"></span>' + 
                    'Xbox One' +
                    '</div>';
                availon = '<div class="availability"><div><p class="c-caption-1">' + regionContent["keyPlatform"] + ':<span class="c-glyph" aria-label="Console"></span></p></div></div>'
            }
            if (allGames[thebigid]["platformpc"] === "true") {
                plpc = '<div class="c-tag">' +
                    // '<span class="c-glyph glyph-pc1"></span>' + 
                    //'PC' + 
                    quickLookLocStrings.locales[urlRegion]["keyPc"] +
                    '</div>';
                availon = '<div class="availability"><div><p class="c-caption-1">' + regionContent["keyPlatform"] + ':<span class="c-glyph" aria-label="PC"></span></p></div></div>'
            }
            if (gameIdArrays["allCloud"].indexOf(thebigid) !== -1) {
                plmo = '<div class="c-tag">' +
                    // '<span class="c-glyph glyph-mobile-tablet"></span>' +
                    quickLookLocStrings.locales[urlRegion]["keyMobile"] +
                    // 'Android' +
                    '</div>';
            }
            if (allGames[thebigid]["platformpc"] === "true" && allGames[thebigid]["platformxbox"] === "true") {
                availon = '<div class="availability"><div><p class="c-caption-1">' + regionContent["keyPlatform"] +
                    ':<span class="c-glyph" aria-label="Console"></span><span class="c-glyph" aria-label="PC"></span></p></div></div>'
            }

            var qlbutclass = '';
            if (allGames[thebigid]["physical"] === "true") { qlbutclass = ' physgame' }
            var eappclass = '';
            var notab = '';

            var eachGameClass = '';
            if (docwidth > 1083 && navigator.userAgent.indexOf("iPad") === -1) { // Added check -EL 11/23/20
                eachGameClass = 'm-product-placement-item f-size-medium context-game gameDiv';
            } else {
                eachGameClass = 'm-product-placement-item f-size-medium context-game gameDiv qlButtonFuncDISABLE';
            }
            var gamehref = allGames[thebigid]["gameurl"];
            if (allGames[thebigid]["eaplaypcgame"] === "true") {
                eappclass = ' eappgame';
                gamehref = "";
                notab = 'tabindex="-1" role="presentation"';
            }
            var x360class = '';
            if (allGames[thebigid]["x360game"] === "true") { x360class = ' x360game' }
            var playsonimg = '';
            if (allGames[thebigid]["playson"] === "true") { playsonimg = '<img class="playsOn" src="https://compass-ssl.xbox.com/assets/f7/9f/f79fb1ef-307e-42f9-9637-c4c9f1ff91eb.png?n=EN_Plays-on-Xbox-One_Branding-Bar_215x51.png" alt="Plays on">' }
            var eachgameA = '<section class="' + eachGameClass + qlbutclass + x360class + '" itemscope="" itemtype="http://schema.org/Product" data-bigid="' + thebigid + '" ' +
                'data-releasedate="' + allGames[thebigid]["releasedate"] + '" data-msproduct="' + allGames[thebigid]["msproduct"] + '" data-multiplayer="' + allGames[thebigid]["multiplayer"] +
                '" data-rating="' + allGames[thebigid]["rating"] + '" data-ratingsystem="' + allGames[thebigid]["ratingsystem"] + '" data-listprice="' + allGames[thebigid]["listprice"] + '">' +
                '<a class="gameDivLink' + eappclass + '" href="' + gamehref + '" target="_blank" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] +
                '>click" ' + dataret + notab + '>' +
                '<picture class="containerIMG">' +
                '<img class="c-image" aria-hidden="true" alt="' + boxshotlocstrings.locales[urlRegion]["keyPlaceholderboxshot"].replace("<PLACEHOLDER>", allGames[thebigid]["title"]) +
                '" srcset="" src="' + theboxshot + '">' +
                playsonimg +
                availon +
                '</picture>' +
                badges +
                '<div>' +
                '<h3 class="c-subheading-4 x1GameName" itemprop="product name">' + allGames[thebigid]["title"] + '</h3>' +
                //priceshown + 
                thesmallstars +
                '</div>' +
                '</a>';


            var quickLookButton = '<div class="qlButton">' +
                '<a class="c-call-to-action c-glyph black-c" tabindex="0" aria-label="' + regionContent["keyQuickaria"] + '">' + regionContent["keyQuicklook"] + '</a>' +
                '</div>';

            if (allGames[thebigid]["eaplaypcgame"] === "true" && win10user === true) {
                priceButtons = $(".win10link").html();
            }
            if (allGames[thebigid]["eaplaypcgame"] === "true" && win10user === false) {
                priceButtons = $(".nonwin10link").html();
            }

            var eachgamePopup = '<div class="gameMoreInfo">' +
                '<div tabindex="0" class="qclosebutton" aria-label="close button for dialog window">' +
                '<img src="https://compass-ssl.xbox.com/assets/b7/fc/b7fc0278-f0ed-4918-8d05-98fea426a597.svg?n=Games-Catalog_Image-0_X-Button_230x120.svg" alt="close button">' +
                '</div>' +
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
                '<div class="platformdescription"><div class="furtherplatform"><span class="furthheading">' + regionContent["keyPlatform"] +
                ': </span>' + plxsx + plxb + plpc + plmo + '</div></div>' +
                '</div>' +
                '<div class="popbottom">' +
                //'<div class="popprice">' +
                //badges + 
                popprice +
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

            var eachgameB = '</section>';

            // if (docwidth > 1083) {
            gamehtml += eachgameA + quickLookButton + eachgamePopup + eachgameB;
            // } else {
            //     gamehtml += eachgameA + eachgamePopup + eachgameB;
            // }
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
        if ($(".platformselection").attr("data-platselected") === "all") {
            $(".availability").removeClass("hidden");
        } else {
            $(".availability").addClass("hidden");
        }
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
        })

        $(document).on("click", ".eappgame", function(e) {
                e.preventDefault();
                //   $(this).next(".qlButton").find("a").click();
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
        if (currentwidth > 767 && navigator.userAgent.match(/iPad/i) === null && pageloadfocus > 1) {
            if ($(".gameDiv").not(".pagHide").not(".catHide").length === 0) {
                if (currentwidth <= 1083) {
                    $(".gameDivLink.eappgame").attr("tabindex", "-1");
                }
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
            $(".gameSort li").eq(0).attr("data-sorting", "release");
            $(".gameSort li").eq(1).attr("data-sorting", "az");
            $(".gameSort li").eq(2).attr("data-sorting", "za");
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
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        $(document).on("click", "#genreSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        $(document).on("click", "#featureSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        $(document).on("click", "#ratingSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        $(document).on("click", "#playonSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        $(document).on("click", "#deliverySelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        $(document).on("click", "#inputsSelect a", function(e) {
            e.preventDefault();
            $(".gameDivsWrapper").addClass("gdSorting");
            if (!$(this).hasClass("f-selected")) {
                if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                    var updPhrase = $(this).find("span").text() + " filter has been removed";
                } else {
                    var updPhrase = $(this).find("span").text() + " filter removed";
                }
                $(".CatAnnounce").text(updPhrase);
            }
            getFilterStatus();
        });

        // collection select
        $(document).on("click", ".coloption", function(e) {
            e.preventDefault();
            // var closingwidth = $(window).width();
            // if (closingwidth < 768) {
            //   $(".filterClose a").click();
            // }
            $(".coloption").removeClass("col-selected");
            $(this).addClass("col-selected");
            var colTitle = $(".col-selected span").text();
            $(".catalogTitle").text(colTitle);
            $(".gameDivsWrapper").addClass("gdSorting");
            var clickCol = $(this).attr("data-col");
            $(".gamesCollections").attr("data-colselected", clickCol);
            $(".xghsearch input").val("");
            $(".CatAnnounce").text(colTitle + " collection selected");
            getFilterStatus()
        })

        $(document).on("click", ".filterSelections a", function(e) {
            e.preventDefault();
            var catremove = $(this).closest("li").attr("data-catselected");
            $("[data-cat='" + catremove + "']").removeClass("f-selected");
            $(this).closest("li").remove();
            if ($(".filterSelections li").length === 0 || catremove === "avail-physical") {
                $("[data-cat='avail-download']").addClass("f-selected");
            } else if (catremove === "avail-download") {
                $("[data-cat='avail-physical']").addClass("f-selected");
            }
            if ($(this).hasClass("searchcat")) {
                // $("[data-col='all']").click();
            }
            var updPhrase = $(this).next("span").text() + " filter removed";
            if ($(".CatAnnounce").text().indexOf("filter removed") !== -1) {
                var updPhrase = $(this).next("span").text() + " filter has been removed";
            } else {
                var updPhrase = $(this).next("span").text() + " filter removed";
            }
            $(".CatAnnounce").text(updPhrase);

            if ($(".searchcat").length === 0) {
                getFilterStatus();
            } else {
                getFilterStatus(true);
            }
        })

        $(document).on("click", ".clearall", function(e) {
            e.preventDefault();
            $("#playonSelect a").removeClass("f-selected");
            $("#deliverySelect a").removeClass("f-selected");
            $("#inputsSelect a").removeClass("f-selected");
            $("#genreSelect a").removeClass("f-selected");
            $("#featureSelect a").removeClass("f-selected");
            $("#ratingSelect a").removeClass("f-selected");
            $(".filterSelections li:gt(0)").remove();
            $(".xghsearch input").val("");
            if ($(".gameSelector").attr("data-colselected") === "search") {
                $(".gameSelector").attr("data-colselected", "xbox");
                $(".platformselection a").removeClass("platselected");
                $(".platall").addClass("platselected")
                $(".colgroup").addClass("hidden");
                $(".collections-all").removeClass("hidden");
            }

            if ($(".CatAnnounce").text().indexOf("all filters") !== -1) {
                var updPhrase = "every filter removed";
            } else {
                var updPhrase = "all filters removed";
            }
            $(".CatAnnounce").text(updPhrase);

            getFilterStatus();
        })

        function getFilterStatus(searchactive) {
            if ($(".platformselection").attr("data-platclicked") !== "true") { // keep search when switching platforms
                $(".filterSelections li").remove();
            }
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
            var sorttosend = $(".gameSort").attr("data-sort") || "release";
            var plattosend = $(".platformselection").attr("data-platselected");

            if (searchactive === true) {
                listGames(coltosend, filterstosend, sorttosend, plattosend, true);
            } else {
                listGames(coltosend, filterstosend, sorttosend, plattosend);
            }
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

    function addSummary(text, data) {
        if ($(".c-choice-summary[data-catselected='" + data + "']").length === 0) {
            $(".filterSelections").append('<li class="c-choice-summary" data-catselected="' + data + '">' +
                '<a class="c-action-trigger c-glyph glyph-cancel" href="#" aria-label="' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", text) + '">' +
                '<span class="x-screen-reader">' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", text) + '</span>' +
                '</a>' +
                '<span>' + text + '</span></li>')
        }
    }

    $(".xghsearch button").on("click", function(e) {
        e.preventDefault();
        gameSearch();
    })

    function gameSearch() {
        if ($(".filterSelections a").length > 0) {
            $(".filterSelections li").remove();
        }
        // $(".platformselection a").removeClass("platselected");
        // $(".platall").addClass("platselected")
        // $(".colgroup").addClass("hidden");
        // $(".collections-all").removeClass("hidden");
        //$(".platformselection").attr("data-platselected", "all");
        var newplat = $(".platselected").attr("data-theplat");
        var queryraw = encodeURI($(".xghsearch input").val().trim().replace("<", "")).replace(/[!'()*]/g).replace(/%20/g, " ");
        var query = encodeURI($(".xghsearch input").val().trim().replace(/\s+/g, ' ').replace("<", "").toLowerCase()).replace(/[!'()*]/g).replace(/%20/g, " ");
        // if (query.length < 3) {
        //   $(".searcherrormessage").text(regionContent["keySearchlengtherror"])
        //   return false;
        // } else if (query.length > 50) {
        //   $(".searcherrormessage").text(regionContent["keySearchlengthlongerror"])
        //   return false;
        // } else {
        $(".searcherrormessage").text("");
        // }
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
        searchArray = Object.keys(searchObj);
        searchArray = searchArray.sort(asc_sortbi);

        function asc_sortbi(a, b) {
            return (new Date(searchObj[a]["exacts"])) < (new Date(searchObj[b]["exacts"])) ? 1 : -1;
        }
        if (newplat === "xbox") {
            searchArray = searchArray.filter(function(v) { return gameIdArrays["subsxgpchannel3"].indexOf(v) !== -1 });
            if (gameIdArrays["095bda36-f5cd-43f2-9ee1-0a72f371fb96"] !== undefined) { //coming soon should not be searched
                searchArray = searchArray.filter(function(v) { return gameIdArrays["095bda36-f5cd-43f2-9ee1-0a72f371fb96"].indexOf(v) === -1 });
            }
        } else if (newplat === "pc") {
            searchArray = searchArray.filter(function(v) { return gameIdArrays["pcgaVTaz"].indexOf(v) !== -1 });
            if (gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"] !== undefined) {
                searchArray = searchArray.filter(function(v) { return gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"].indexOf(v) === -1 });
            }
        } else if (newplat === "cloud") {
            searchArray = searchArray.filter(function(v) { return gameIdArrays["allCloud"].indexOf(v) !== -1 });
        } else if (newplat === "all") {
            if (gameIdArrays["095bda36-f5cd-43f2-9ee1-0a72f371fb96"] !== undefined) { //coming soon should not be searched
                searchArray = searchArray.filter(function(v) { return gameIdArrays["095bda36-f5cd-43f2-9ee1-0a72f371fb96"].indexOf(v) === -1 });
            }
            if (gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"] !== undefined) {
                searchArray = searchArray.filter(function(v) { return gameIdArrays["4165f752-d702-49c8-886b-fb57936f6bae"].indexOf(v) === -1 });
            }
        }

        // $(".gamesCollections").attr("data-colselected", "search");
        // $(".coloption").removeClass("col-selected");
        // $(".coloption[data-col='all']").addClass("col-selected");
        // $("#genreSelect a").removeClass("f-selected");
        // $("#featureSelect a").removeClass("f-selected");
        // $("#ratingSelect a").removeClass("f-selected");
        // if ($(".platformselection").attr("data-platclicked") !== "true") { // keep search when switching platforms
        //   $(".filterSelections li:gt(0)").remove();
        // }
        if ($("#availSelect a").eq(0).hasClass("f-selected")) {
            var availtype = "avail-physical";
        } else {
            var availtype = "avail-download";
        }
        $(".gamesFilters").attr("data-filtersselected", availtype);
        var plattosend = $(".platformselection").attr("data-platselected");

        $(".CatAnnounce").text("games filtered by search string " + queryraw);
        listGames(searchArray, availtype, "search", plattosend);
        if (query.length !== 0) {
            $(".filterSelections").append('<li class="c-choice-summary" data-catselected="searchcat">' +
                '<a class="c-action-trigger c-glyph glyph-cancel searchcat" href="#" aria-label="' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", queryraw) + '">' +
                '<span class="x-screen-reader">' + regionContent["keyRemovefilter"].replace("<PLACEHOLDER>", queryraw) + '</span>' +
                '</a>' +
                '<span>' + queryraw + '</span></li>')
        }
    }

    // popup
    $(document).on("mouseenter", ".gameDiv a.gameDivLink", function(e) {
        //$(e.target).off("mouseleave");
        var buttontoshow = $(e.target).closest(".gameDiv").find(".qlButton");
        $(".popupShow").removeClass("popupShow");
        $(buttontoshow).addClass("popupShow");
    })

    $(document).on("mouseleave", ".gameDiv", function(e) {
        $(e.target).off("mouseenter");
        var buttontoshow = $(e.target).closest(".gameDiv").find(".qlButton");
        $(buttontoshow).removeClass("popupShow");
    })

    $(document).on("focus", ".gameDiv a.gameDivLink", function(e) {
        $(".qlButton").removeClass("popupShow");
        var buttontoshow = $(e.target).closest(".gameDiv").find(".qlButton");
        $(".popupShow").removeClass("popupShow");
        $(buttontoshow).addClass("popupShow");
    })

    // $(document).on("click", "a.gameDivLink", function(e) {
    //   if (window.innerWidth <= 769) {
    //     e.preventDefault();
    //     $(this).next(".qlButton").find("a").click();
    //   }
    // })

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
                            '<img srcset="' + allGames[thebigid]["screenarray"][s] + '" src="' + allGames[thebigid]["screenarray"][s] + '" alt="' + allGames[thebigid]["title"] + '">' +
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
                            '<img srcset="' + allGames[thebigid]["screenarray"][s] + '" src="' + allGames[thebigid]["screenarray"][s] + '" alt="' + allGames[thebigid]["title"] + '">' +
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
                var fullimageclass = "";
            } else {
                var fullimageclass = "";
            }

            therotator = '<div class="c-carousel f-multi-slide f-auto-play' + fullimageclass + '" data-js-interval="6000">' +
                '<div class="c-group">' +
                '<div class="c-sequence-indicator" role="tablist">' +
                buttonhtml +
                '</div>' +
                '<button class="c-action-toggle c-glyph glyph-play f-toggle" data-toggled-label="Pause" data-toggled-glyph="glyph-pause" aria-label="Play"></button>' +
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
        $(".gameMoreInfo.popupShow").closest(".gameDiv").focus();
        $(".gameMoreInfo").removeClass("popupShow");
        $("#page-cover").remove();
        $('body').removeClass('stop-scrolling')

    })

    $(document).on("keypress", ".qclosebutton", function(event) {
        console.log(event.keyCode)
        if ((event.keyCode == 32) || (event.keyCode == 13)) {
            event.preventDefault();
            $(this).click();
        }
    })

    // menu button in mobile
    $(".mobileMenuToggle button").on("click", function() {
        $(".gameSelectors").slideToggle();
        if ($(this).attr("aria-expanded") === "false") {
            $(this).attr("aria-expanded", "true");
        } else {
            $(this).attr("aria-expanded", "false");
            setTimeout(function() {
                var btttop = $(".gameList").position().top;
                $("HTML, BODY").animate({
                    scrollTop: btttop
                }, 500);
            }, 500)
        }
    })
    $(".filterClose a").on("click", function(e) {
        e.preventDefault();
        $(".gameSelectors").slideToggle();
        if ($(".mobileMenuToggle button").attr("aria-expanded") === "false") {
            $(".mobileMenuToggle button").attr("aria-expanded", "true");
        } else {
            $(".mobileMenuToggle button").attr("aria-expanded", "false");
            setTimeout(function() {
                var btttop = $(".gameList").position().top;
                $("HTML, BODY").animate({
                    scrollTop: btttop
                }, 500);
            }, 500)
        }
    })

    $('.m-back-to-top').click(function(e) {
        e.preventDefault();
        setTimeout(function() {
            var btttop = $(".platformselection").position().top;
            $("HTML, BODY").animate({
                scrollTop: btttop
            }, 500);
            $(".home-hero a:first-child").focus();
        }, 500)
    });

    // transparent header
    // $(".js-global-head").removeClass("theme-light").addClass("f-transparent").addClass("theme-dark");
    // $(".js-cat-head").removeClass("theme-light").addClass("f-transparent").addClass("theme-dark");
    // $(".c-uhfh.context-uhf").addClass("f-transparent");
    // $("#uhfLogo img").attr("src", "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1MmB8?ver=6c43g");
    // $("#uhfCatLogo img").attr("src", "https://img-prod-cms-rt-microsoft-com.akamaized.net//cms/api/am/imageFileData/RW8TP2?ver=d2e0&_=1");

    // locale specific
    var hideratingdropdown = "es-ar, es-co, es-cl";
    if (hideratingdropdown.indexOf(urlRegion) !== -1) {
        $("div#filter-ratings").hide();
    }

    // rotator
    function popRotator() {
        rotArray = ["f13cf6b4-57e6-4459-89df-6aec18cf0538"];
        removegames = ["BNLG5J5KDVJ3", "9NB80T1XC43B"];

        function removegame(bigid) {
            var fgaindex = fullGameArray.indexOf(bigid);
            fullGameArray.splice(fgaindex, 1);
            delete allGames[bigid];
        }
        showngames = [];

        // for (var i = 0; i < removegames.length; i++) {
        //   removegame(removegames[i]);
        // }

        for (var i = 0; i < rotArray.length; i++) {
            var curGames = gameIdArrays[rotArray[i]];
            var actualPopulatedGames = 0
                // var listlimit = curGames.length;
                // if (listlimit > 8) {
                //   listlimit = 8;
                // }
            for (var j = 0; j < curGames.length; j++) {
                if (allGames[curGames[j]] && showngames.indexOf(curGames[j]) === -1) {
                    poplist(rotArray[i], curGames[j]);
                    actualPopulatedGames = actualPopulatedGames + 1;
                    if (actualPopulatedGames >= 8) { break; }
                }
            }
        }

        function poplist(listclass, thebigid) {
            showngames.push(thebigid);

            var altTag = boxshotlocstrings.locales[urlRegion].keyPlaceholderboxshot;
            altTag = altTag.replace("PLACEHOLDER", allGames[thebigid].title);

            var xboxGlyph = '';
            var pcGlyph = '';
            var platformAria = regionContent["keyPlatform"] + ' ';
            if (allGames[thebigid].platformxbox === "true") {
                platformAria += (quickLookLocStrings["keyConsole"]);
                xboxGlyph = '<span class="c-glyph" aria-label="' + regionContent["keyPlatform"] + " " + quickLookLocStrings["keyConsole"] + '" title="' + regionContent["keyPlatform"] + " " + quickLookLocStrings["keyConsole"] + '"></span>'; // these two look the same here but use different glyphs
                //xboxGlyph = '<span class="c-glyph"></span>'; // these two look the same here but use different glyphs
            }
            if ((allGames[thebigid].platformxbox === "true") && (allGames[thebigid].platformpc === "true")) {
                platformAria += ", ";
            }
            if (allGames[thebigid].platformpc === "true") {
                platformAria += (quickLookLocStrings["keyPc"]);
                pcGlyph = '<span class="c-glyph" aria-label="' + regionContent["keyPlatform"] + " " + quickLookLocStrings["keyPc"] + '" title="' + regionContent["keyPlatform"] + " " + quickLookLocStrings["keyPc"] + '"></span>'; // these two look the same here but use different glyphs
                // pcGlyph = '<span class="c-glyph"></span>'; // these two look the same here but use different glyphs
            }
            platformAria += ".";

            // hide genre in non-Engish locales
            if (urlRegion !== "en-us") {
                allGames[thebigid].genre = "";
            }
            // end

            eaplaygame = '';
            if (gameIdArrays["b8900d09-a491-44cc-916e-32b5acae621b"].indexOf(thebigid) > -1 ||
                gameIdArrays["1d33fbb9-b895-4732-a8ca-a55c8b99fa2c"].indexOf(thebigid) > -1) {
                eaplaygame = '<div class="eaplaygame"><div><p class="c-caption-1 white-c">EA Play</p></div></div>';
            }

            $(".featured-games ul").append('<li>' +
                '<section class="m-product-placement-item context-software f-size-large" itemscope itemtype="http://schema.org/Product" data-big-id="' + thebigid + '">' +
                '<a target="_blank" href="' + allGames[thebigid].gameurl + '" data-retailer="ms store" aria-label="read more about ' + allGames[thebigid].title + '. ' + allGames[thebigid].genres + '">' +
                '<div class="f-default-image">' +
                '<picture>' +
                '<img class="c-image" aria-hidden="false" srcset="' + allGames[thebigid].boxshot + '" src="' + allGames[thebigid].boxshot + '" alt="' + altTag + '">' +
                eaplaygame +
                '</picture>' +
                '</div>' +
                '<div class="slide-content high-contrast">' +
                //     '<strong class="c-badge f-small f-highlight c-caption-2">BADGE</strong>' +
                '<h3 class="c-heading-6 f-lean" itemprop="game name">' + allGames[thebigid].title + '</h3>' +
                '<p class=" c-caption-1">' + allGames[thebigid].genres + '</p>' +
                // '<div class="availability"><div>' +
                //   '<p class="c-caption-1">' +
                //   regionContent["keyPlatform"] + ':' +
                //   xboxGlyph + pcGlyph +
                //   '</p>' +
                // '</div></div>' +
                '</div>' +
                '</a>' +
                '</section>' +
                '</li>');
        }
    }
    // end rotator

});

ratingDescriptors = {
    "ESRB:FanVio": "Fantasy Violence",
    "ESRB:MilBlo": "Mild Blood",
    "ESRB:MilLyr": "Mild Lyrics",
    "ESRB:BloGor": "Blood and Gore",
    "ESRB:IntVio": "Intense Violence",
    "ESRB:StrLan": "Strong Language",
    "ESRB:ParNud": "Partial Nudity",
    "ESRB:UseDru": "Use of Drugs",
    "ESRB:SexCon": "Sexual Content",
    "ESRB:AlcRef": "Alcohol Reference",
    "ESRB:Blo": "Blood",
    "ESRB:Vio": "Violence",
    "ESRB:MilSugThe": "Suggestive Themes",
    "ESRB:MilLan": "Mild Language",
    "ESRB:MatHum": "Mature Humor",
    "ESRB:Nud": "Nudity",
    "ESRB:UseOfAlcAndTob": "Use of Alcohol and Tobacco",
    "ESRB:CarVio": "Cartoon Violence",
    "ESRB:SexThe": "Sexual Themes",
    "ESRB:DruRef": "Drug Reference",
    "ESRB:MilFanVio": "Mild Fantasy Violence",
    "ESRB:Lan": "Language",
    "ESRB:StrSexCon": "Strong Sexual Content",
    "ESRB:UseAlc": "Use of Alcohol",
    "ESRB:CruHum": "Crude Humor",
    "ESRB:MilVio": "Mild Violence",
    "ESRB:SugThe": "Suggestive Themes",
    "ESRB:AniBlo": "Animated Blood",
    "ESRB:UseTob": "Use of Tobacco"
}

ratingImages = {
    "ESRB:M": "https://compass-ssl.xbox.com/assets/88/d4/88d43eac-89d7-43c8-8aa7-eb67b02595c5.svg?n=ESRB-Mature_500x500.svg",
    "ESRB:T": "https://compass-ssl.xbox.com/assets/35/ee/35eef92e-13d8-407d-905c-294e25988f4f.svg?n=ESRB-T_500x500.svg",
    "ESRB:E": "https://compass-ssl.xbox.com/assets/59/de/59de1b15-33b5-4a72-bff9-55b81625ef23.svg?n=ESRB-E_500x500.svg",
    "ESRB:E10": "https://compass-ssl.xbox.com/assets/5b/b7/5bb72c9b-6224-474b-9bc5-218256bf447f.svg?n=ESRB-E-10%2b_500x500.svg",
    "ESRB:RPTeen": "https://compass-ssl.xbox.com/assets/52/f5/52f5c300-46fe-46b2-a468-0bc063f3dc39.svg?n=ESRB-Rating-Pending_500x500.svg",
    "ESRB:RPEveryone": "https://compass-ssl.xbox.com/assets/52/f5/52f5c300-46fe-46b2-a468-0bc063f3dc39.svg?n=ESRB-Rating-Pending_500x500.svg"
}

quickLookLocStrings = {
    "locales": {
        "en-us": {
            "keyAddtowishlist": "Add to wish list",
            "keyOptimizedforxboxseriesxs": "Optimized for Xbox Series X|S",
            "keySmartdelivery": "Smart Delivery",
            "keyCloudenabled": "Cloud-enabled",
            "keyPc": "PC",
            "keyMobile": "Mobile",
            "keyGetitnow": "GET IT NOW",
            "keyPreordernow": "PRE-ORDER NOW",
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "snímek obrazovky",
            "keyConsole": "Konzole"
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
            "keyScreenshot": "skærmbillede",
            "keyConsole": "Konsol"
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
            "keyScreenshot": "Screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "Screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "Screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "στιγμιότυπο",
            "keyConsole": "Κονσόλα"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "captura de pantalla",
            "keyConsole": "Consola"
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
            "keyScreenshot": "captura de pantalla",
            "keyConsole": "Consola"
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
            "keyScreenshot": "captura de pantalla",
            "keyConsole": "Consola"
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
            "keyScreenshot": "captura de pantalla",
            "keyConsole": "Consola"
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
            "keyScreenshot": "captura de pantalla",
            "keyConsole": "Consola"
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
            "keyScreenshot": "näyttökuva",
            "keyConsole": "Konsoli"
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
            "keyScreenshot": "capture d’écran",
            "keyConsole": "Console"
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
            "keyScreenshot": "capture d’écran",
            "keyConsole": "Console"
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
            "keyScreenshot": "capture d’écran",
            "keyConsole": "Console"
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
            "keyScreenshot": "capture d’écran",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "képernyőfelvétel",
            "keyConsole": "Konzol"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "スクリーンショット",
            "keyConsole": "コンソール"
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
            "keyScreenshot": "스크린샷",
            "keyConsole": "콘솔"
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
            "keyScreenshot": "skjermbilde",
            "keyConsole": "Konsoll"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "screenshot",
            "keyConsole": "Console"
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
            "keyScreenshot": "zdjęcie z gry",
            "keyConsole": "Konsola"
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
            "keyScreenshot": "captura de tela",
            "keyConsole": "Console"
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
            "keyScreenshot": "captura de ecrã",
            "keyConsole": "Consola"
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
            "keyScreenshot": "снимок экрана",
            "keyConsole": "Консоли"
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
            "keyScreenshot": "snímka obrazovky",
            "keyConsole": "Konzola"
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
            "keyScreenshot": "skärmbild",
            "keyConsole": "Konsol"
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
            "keyScreenshot": "ekran görüntüsü",
            "keyConsole": "Konsol"
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
            "keyScreenshot": "畫面截圖",
            "keyConsole": "主機"
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
            "keyScreenshot": "螢幕擷取畫面",
            "keyConsole": "主機"
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

titleStrings = {};