$(document).ready(function() {
    var ItemPopulate = (function() {
        // fix IE focus issue
        var userAgentString = navigator.userAgent;
        if (userAgentString.indexOf("Trident") >= 0) {
            $(".consoleFilterLink").parent("a").attr("tabindex", "-1")
            $(".consoleFilterLink").attr("tabindex", "0")
        }

        var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
        if (urlRegion === "en-ae") {
            urlRegion = "ar-ae";
        } else if (urlRegion === "en-sa") {
            urlRegion = "ar-sa";
        } else if (urlRegion === "en-il") {
            urlRegion = "he-il";
        }

        // Shop Anchor 
        setTimeout(function() {
            var docurl = document.URL.toLowerCase();
            if (docurl.indexOf("shop") > -1) {
                var topofshop = $("#shop").offset().top;
                $("HTML, BODY").animate({
                    scrollTop: topofshop
                }, 300);
            } else if (docurl.indexOf("xbox-one-x") > -1) {
                var topofx1x = $("#x1x").offset().top;
                $("HTML, BODY").animate({
                    scrollTop: topofx1x
                }, 300);
            } else if (docurl.indexOf("xbox-one-s") > -1) {
                var topofx1s = $("#x1s").offset().top;
                $("HTML, BODY").animate({
                    scrollTop: topofx1s
                }, 300);
            }
        }, 1500)

        // Escape Key for Filter
        setTimeout(function() {
            $("#ratingFilter").attr("data-bi-bhvr", "REDUCE");
        }, 600);

        $(document).on("keydown", ".ratingSelect .c-refine-item", function(event) {
            if (event.keyCode == 27) {
                $("#ratingFilter").attr("data-bi-bhvr", "REDUCE");
                $("#ratingFilter").attr("aria-live", "soft");
                $("#ratingFilter").focus();
                setTimeout(function() {
                    $("#ratingFilter").click();
                }, 1);
            }
        })

        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var regionItems = allConsoles.locales[urlRegion];
        var currencyFormat = priceFormat.locales[urlRegion];
        //var enusItems = allConsoles.locales["en-us"] // for data-clicknames
        var regionContent = globalConsolesContent.locales[urlRegion];
        var regionSoldout = globalSoldout.locales[urlRegion];
        var regionRatingContent = ratingFilterContent.locales[urlRegion];
        var bigIdStringList = "";

        regionItems.forEach(function(product) {
            if (product.updProductId.indexOf("/") !== -1) {
                if (product.specIdBig !== "") {
                    bigIdStringList = bigIdStringList + product.specIdBig + ',';
                } else {
                    bigIdStringList = bigIdStringList + product.updProductId.split("/")[0] + ',';
                }

            } else if (product.productId.indexOf("/") !== -1) {
                if (product.specIdBig !== "") {
                    bigIdStringList = bigIdStringList + product.specIdBig + ',';
                } else {
                    bigIdStringList = bigIdStringList + product.productId.split("/")[0] + ',';
                }
            }
        });


        bigIdStringList = setCharAt(bigIdStringList, bigIdStringList.length - 1, ""); // Remove the , at the end of the string

        var apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + bigIdStringList + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';

        var cursorttext = $(".sort-area .c-select-menu a").attr("aria-label");

        // default filtering category items
        var defaultCapacities = ["500GB", "1TB", "2TB"]; // needs to match values in JSON
        var defaultCapacitiesText = [regionContent.key500GB, regionContent.key1TB, regionContent.key2TB] // localized text
        var actualCapacities = [];
        var defaultRatings = ["all", "teen", ]; // needs to match values in JSON
        var defaultRatingsText = []; // full text for default ratings (translatable)
        defaultRatingsText.push(regionRatingContent.keyPegi37);
        defaultRatingsText.push(regionRatingContent.keyPegi12andup);


        var itemcount = regionItems.length;
        if (bigIdStringList !== "") {
            $.get(apiUrl)
                .done(function(responseData) {
                    var apiItemList = [];
                    responseData.Products.forEach(function(product) {
                        product.DisplaySkuAvailabilities.forEach(function(skuAvailability) {
                            var apiItem = new Object();
                            apiItem.productId = product.ProductId;
                            apiItem.MSRP = skuAvailability.Availabilities[0].OrderManagementData.Price.MSRP;
                            apiItem.listPrice = skuAvailability.Availabilities[0].OrderManagementData.Price.ListPrice;
                            apiItem.skuId = skuAvailability.Availabilities[0].SkuId;
                            apiItemList.push(apiItem);
                        });
                    });
                    populateConsoleHub(true, apiItemList);
                })
                .fail(function() {
                    populateConsoleHub(false);
                })
        } else { populateConsoleHub(false); }

        function populateConsoleHub(useMS_store, apiItemList) {
            for (var i = 0; i < itemcount; i++) {
                var useAPIPrice = true; // Using a '!' character at the beginning of the priceText in the allConsoles.js price to override the API price.
                if (regionItems[i].priceText.charAt(0) === "!") {
                    useAPIPrice = false;
                    regionItems[i].priceNumber = regionItems[i].priceText.replace("!", "");
                    regionItems[i].priceText = formatCurrency(regionItems[i].priceText.replace("!", ""), currencyFormat);
                    if (regionItems[i].tprPriceText.charAt(0) === "!") {
                        regionItems[i].tprPriceNumber = regionItems[i].tprPriceText.replace("!", "");
                        regionItems[i].tprPriceText = formatCurrency(regionItems[i].tprPriceText.replace("!", ""), currencyFormat);
                    }
                }

                if (useAPIPrice && useMS_store) {
                    var currentPID = "";
                    var currentSID = "";
                    apiItemList.forEach(function(item) {
                        if (regionItems[i].updProductId.indexOf("/") !== -1) {
                            currentPID = regionItems[i].updProductId.split("/")[0];
                            currentSID = regionItems[i].updProductId.split("/")[1];
                        } else if (regionItems[i].productId.indexOf("/") !== -1) {
                            currentPID = regionItems[i].productId.split("/")[0];
                            currentSID = regionItems[i].productId.split("/")[1];
                        }
                        if (regionItems[i].specIdBig !== "") {
                            currentPID = regionItems[i].specIdBig;
                        }

                        if (item.productId === currentPID.toUpperCase() && item.skuId === currentSID.toUpperCase()) {
                            //console.log(item.productId + " " + item.skuId + " " + " MSRP= " + item.MSRP);
                            if ((item.MSRP != 0) && (item.MSRP != "100000")) {
                                //console.log("|" + item.MSRP + "|");
                                regionItems[i].priceText = formatCurrency(item.MSRP, currencyFormat);
                                regionItems[i].priceNumber = item.MSRP;
                                if (item.MSRP > item.listPrice) {
                                    regionItems[i].tprPriceText = formatCurrency(item.listPrice, currencyFormat);
                                    regionItems[i].tprPriceNumber = item.listPrice;
                                }
                            } else { // console.log("Broken: " + urlRegion + " - " + regionItems[i].productId + " - " + regionItems[i].updProductId + " - " + regionItems[i].headline); 
                            }
                        }
                    });

                } else if (regionItems[i].priceNumber !== "####") {
                    regionItems[i].priceText = formatCurrency(regionItems[i].priceNumber, currencyFormat);
                }

                var clicknamelearn = "www>xbox-one>consoles>" + regionItems[i].itemId + ">see-details>click"; // using en-us text globally
                var featuredBin = 0;
                if (regionItems[i].featured === "t") {
                    featuredBin = 1;
                }

                var consolesClass = "xoConsoles";
                /*if (regionItems[i].product.toLowerCase().indexOf("x1s") !== -1) {
                    consolesClass = "xoConsoles"; // was xosConsoles, REMOVED
                }*/

                var priceNum = regionItems[i].priceNumber;
                if (regionItems[i].tprPriceNumber !== "####") {
                    priceNum = regionItems[i].tprPriceNumber;
                }
                //construct review URL
                var countryStore = "msusa"
                if (urlRegion === "en-gb") {
                    countryStore = "msuk"
                }
                var urlRegionUrl = urlRegion.split("-")[0] + "_" + urlRegion.split("-")[1].toUpperCase();
                var reviewUrl = "https://www.microsoftstore.com/store/" + countryStore + "/" + urlRegionUrl + "/pdp/" + regionItems[i].itemId + "/productID." + regionItems[i].productId + "#ratingsandreviews"

                if (regionItems[i].tprPriceText !== "####") {
                    var srprice = regionItems[i].tprPriceText;
                } else {
                    var srprice = regionItems[i].priceText;
                }



                retailPriceText = {
                    "locales": {
                        "en-us": {
                            "keyRetailText": "Retail Price: &nbsp;"
                        },
                        "de-de": {
                            "keyRetailText": "Einzelhandelspreis: &nbsp;"
                        },
                        "en-ca": {
                            "keyRetailText": "Retail Price: &nbsp;"
                        },
                        "en-au": {
                            "keyRetailText": "Retail Price: &nbsp;"
                        },
                        "en-gb": {
                            "keyRetailText": "Retail Price: &nbsp;"
                        },
                        "en-nz": {
                            "keyRetailText": "Retail Price: &nbsp;"
                        },
                        "en-sg": {
                            "keyRetailText": "Retail Price: &nbsp;"
                        },
                        "da-dk": {
                            "keyRetailText": "Butikspris: &nbsp;"
                        },
                        "es-mx": {
                            "keyRetailText": "Precio de venta al público: &nbsp;"
                        },
                        "es-es": {
                            "keyRetailText": "Precio de venta al público: &nbsp;"
                        },
                        "fi-fi": {
                            "keyRetailText": "Vähittäismyyntihinta: &nbsp;"
                        },
                        "fr-ca": {
                            "keyRetailText": "Prix de détail : &nbsp;"
                        },
                        "fr-fr": {
                            "keyRetailText": "Prix au détail : &nbsp;"
                        },
                        "it-it": {
                            "keyRetailText": "Prezzo al dettaglio: &nbsp;"
                        },
                        "ko-kr": {
                            "keyRetailText": "소매 가격: &nbsp;"
                        },
                        "nb-no": {
                            "keyRetailText": "Veil. pris: &nbsp;"
                        },
                        "pl-pl": {
                            "keyRetailText": "Cena detaliczna: &nbsp;"
                        },
                        "pt-pt": {
                            "keyRetailText": "Preço de retalho: &nbsp;"
                        },
                        "sv-se": {
                            "keyRetailText": "Återförsäljarpris: &nbsp;"
                        }
                    }
                }
                // XAA - Needed for Retailer
                var retailerTextArray = ["en-us","en-ca","en-au","en-gb","en-nz","da-dk","fi-fi","nb-no","sv-se","pl-pl","fr-fr","ko-kr","it-it","fr-ca","de-de","en-sg","es-mx","es-es","pt-pt"];

                if (retailerTextArray.indexOf(urlRegion) !== -1) {
                    var retailText = retailPriceText.locales[urlRegion].keyRetailText;
                }

                // Needed when just using priceText
                regionItems[i].priceText = formatCurrency(regionItems[i].priceNumber, currencyFormat);

                $("." + consolesClass + " .consoleList")
                    .append('<div data-grid="col-4 pad-6x" class="consoleItem" data-featured="' + featuredBin + '" data-hidestars="' + regionItems[i].hideStar.toLowerCase() + '" data-price="' + priceNum +
                        '" data-position="' + regionItems[i].position + '" data-tprpricetext="' + regionItems[i].tprPriceText + '" data-priceaa="' + regionItems[i].priceAA + '" data-soldout="' + regionItems[i].soldOut +
                        '" data-rating="' + regionItems[i].rating.toLowerCase() + '" data-storage="' + regionItems[i].storage.toUpperCase() + '" data-releasedate="' + regionItems[i].releaseDate + '">' +
                        '<div data-grid="col-12">' +
                        '<section class="m-content-placement-item f-size-medium">' +
                        '<a tabindex="-1" href="' + regionItems[i].detailsURL + '" data-clickname="' + clicknamelearn + '">' +
                        '<picture>' +
                        '<img tabindex="-1" srcset="' + regionItems[i].image + '" src="' + regionItems[i].image + '" alt="box and console shot of ' + regionItems[i].headline.replace(/<[^>]*>/g, "") + '">' +
                        '</picture>' +
                        '<span class="c-badge f-small f-highlight">' + regionItems[i].edition + '</span>' +
                        '<h3 class="c-subheading-2 f-lean">' + regionItems[i].headline + '</h3>' +
                        '<span class="c-price priceAA">' + regionItems[i].priceAA + '</span>' +
                        '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
                        '<span class="retailText">' + retailText + '</span>' + '<span itemprop="price" class="priceText">' + regionItems[i].priceText + '</span>' +
                        '</div>' +
                        '<div class="ratings starRatings" data-productid="' + regionItems[i].productId + '">' +
                        '<a target="_blank" href="' + reviewUrl + '">' +
                        '<span class="bv-rating-stars-container" data-productid="' + regionItems[i].productId + '">' +
                        '<span class="bv-rating-stars bv-rating-stars-off" aria-hidden="true">  ★★★★★  </span>' +
                        '<span class="bv-rating-stars bv-rating-stars-on" aria-hidden="true">  ★★★★★  </span>' +
                        '</span>' +
                        '<span class="avgRating"></span>' +
                        '<span class="reviewsCount"></span>' +
                        '</a>' +
                        '</div>' +
                        '<a tabindex="0" href="' + regionItems[i].detailsURL + '" data-clickname="' + clicknamelearn +
                        '" aria-label="' + regionItems[i].headline.replace(/<[^>]*>/g, "") + ' ' + srprice + ' ' + regionItems[i].detailsCTA + '" class="c-call-to-action c-glyph detailsLink">' +
                        '<span>' + regionItems[i].detailsCTA + '</span>' +
                        '</a>' +
                        '</a>' +
                        '</section>' +
                        '</div>' +
                        '</div>')

            }
            $(".f-small.f-highlight:contains('####')").css("visibility", "hidden");
            $(".priceText:contains('#')").css("display", "none");
            $(".consoleItem .detailsLink").each(function() {
                if ($(this).attr("href").indexOf("####") > -1) {
                    $(this).css("display", "none");
                    $(this).parents(".consoleItem").css("pointer-events", "none");
                }
            });
            $(".consoleItem").each(function() {
                if ($(this).data("tprpricetext") !== "####") {
                    var newPrice = $(this).data("tprpricetext");
                    $(this).find(".priceText").last().css("text-decoration", "line-through").after('<span itemprop="price" class="priceText" style="margin-left: 8px">' + newPrice + '</span>');
                }

                if ($(this).find("a").attr("href").indexOf("refurbished") !== -1) {
                    $(this).hide();
                }

                if ($(this).data("soldout") === "t") {
                    $(this).find(".c-badge").css("visibility", "visible").text(regionSoldout["keySoldout"]).removeClass("f-highlight").addClass("f-lowlight");
                    $(this).find(".priceText, .retailText, .priceAA").hide();
                    $(this).find("a").removeAttr("href").css("pointer-events", "none").css("cursor", "auto");
                    $(this).find(".m-content-placement-item").hover(function() { $(".m-content-placement-item").css("cursor", "default") })
                    $(this).find(".m-content-placement-item").addClass("noClick");
                    $(this).find(".detailsLink").remove();

                }

                var storage = $(this).data("storage")
                if (actualCapacities.indexOf(storage) === -1) {
                    actualCapacities.push(storage)
                }
                if ($(this).attr("data-hidestars") === "true") {
                    $(this).find(".starRatings").remove();
                }
                // XAA
                if ($(this).attr("data-priceaa") === "####") {
                    $(this).find(".priceAA").remove();
                    $(this).find(".retailText").remove();
                }
            })

            // removing capacities from filter if no products have them
            var capindToRemove = []
            for (var i = 0; i < defaultCapacities.length; i++) {
                if (actualCapacities.indexOf(defaultCapacities[i]) === -1) {
                    capindToRemove.push(i)
                }
            }

            if (capindToRemove.length > 0) {
                for (var i = capindToRemove.length - 1; i >= 0; i--) {
                    defaultCapacities.splice(capindToRemove[i], 1);
                    defaultCapacitiesText.splice(capindToRemove[i], 1);
                }
            }
            /////////////////////////////////////////////////////////////////// Adding in some scrolling after the page loads EL 10/1/18
            setTimeout(function() {
                var docUrl = document.URL;
                if (docUrl.indexOf("#") > -1) {
                    var theConsole = docUrl.split("#")[1].toLowerCase();
                    if (theConsole.indexOf("xbox-one-s") !== -1) {
                        //$("#xosFilterButton a").click();
                        var $elmnt = $(".xosConsoles").first();
                        $elmnt.ScrollTo();
                        //var $container = $("html,body");                
                        //$container.animate({scrollTop: $elmnt.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300);
                    } else if (theConsole.indexOf("xbox-one-x") !== -1) {
                        //$("#xoFilterButton a").click();
                        var $elmnt = $(".xoConsoles").first();
                        $elmnt.ScrollTo();
                        //var $container = $("html,body");
                        //$container.animate({scrollTop: $elmnt.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300);                 
                    }
                }
            }, 1500);
            //////////////////////////////////////////////////////////////////////////////////////////////////////////
            //sortItems('position', 'lohi');

        }


        //sorting
        var sortItems = function(option, order) {
            $(".consoleList").each(function() {
                $(this).find(".consoleItem").sort(function(a, b) {
                    if (option === "releasedate") {
                        var aVal = Date.parse(a.dataset[option])
                        var bVal = Date.parse(b.dataset[option])
                    } else if (option === "price" || option === "featured") {
                        var aVal = parseFloat(a.dataset[option])
                        var bVal = parseFloat(b.dataset[option])
                    } else {
                        var aVal = a.dataset[option]
                        var bVal = b.dataset[option]
                    }
                    if (order === "lohi") {
                        return aVal - bVal;
                    } else {
                        return bVal - aVal;
                    }

                }).appendTo(this);
            })
        }

        $(".consoleSort .c-menu-item a").on("click", function(e) {
            e.preventDefault();

            if ($(this).hasClass('featured')) {
                sortItems('featured', 'hilo');
                var newsorttext = cursorttext + ", selected " + $(".sort-area ul li").eq(0).find("a").text();
            } else if ($(this).hasClass('highest-price')) {
                sortItems('price', 'hilo');
                var newsorttext = cursorttext + ", selected " + $(".sort-area ul li").eq(2).find("a").text();
            } else if ($(this).hasClass('lowest-price')) {
                sortItems('price', 'lohi');
                var newsorttext = cursorttext + ", selected " + $(".sort-area ul li").eq(1).find("a").text();
            } else if ($(this).hasClass('oldest')) {
                sortItems('releasedate', 'lohi');
                var newsorttext = cursorttext + ", selected " + $(".sort-area ul li").eq(3).find("a").text();
            } else {
                sortItems('releasedate', 'hilo');
                var newsorttext = cursorttext + ", selected " + $(".sort-area ul li").eq(3).find("a").text();
            }
            $(".sort-area .c-select-menu a").attr("aria-label", newsorttext);
        });

        //initial page load sorting based on data-position 
        sortItems('position', 'lohi');

        //filtering

        // populate filters
        for (var i = 0; i < defaultCapacities.length; i++) {
            var ariaText = regionContent.keyAriarefine.replace("<PLACEHOLDER>", defaultCapacitiesText[i]);
            $(".capacitySelect").append('<li>' +
                '<a class="c-refine-item cap' + defaultCapacities[i] + '" href="#" aria-label="' + ariaText + '" data-capacity="' + defaultCapacities[i] + '">' +
                '<span aria-hidden="false">' + defaultCapacitiesText[i] + '</span>' +
                '</a>' +
                '</li>')
        }
        for (var i = 0; i < defaultRatings.length; i++) {
            var ariaText = regionContent.keyAriarefine.replace("<PLACEHOLDER>", defaultCapacitiesText[i]);
            $(".ratingSelect").append('<li>' +
                '<a class="c-refine-item rat' + defaultRatings[i] + '" href="#" aria-label="' + ariaText + '" data-rating="' + defaultRatings[i] + '">' +
                '<span aria-hidden="true">' + defaultRatingsText[i] + '</span>' +
                '</a>' +
                '</li>')
        }

        // close filters upon page load
        (function() {
            $('.c-refine-menu .c-drawer button').attr("aria-expanded", "false");
            $('.c-refine-menu .c-drawer ul').attr("aria-hidden", "false").css({
                "height": "0px",
                "overflow": "hidden"
            }).attr("hidden");
        })();

        consoleFilter = []

        $("#xosFilterButton a").click(function(e) {
            e.preventDefault();
            if (consoleFilter.length === 0) {
                consoleFilter.push("Xbox One S");
                $("#xoFilterButton").css("opacity", ".45");
                $(".xoConsoles").hide();
                $(".xoConsoles").next(".m-feature").hide();
                $(".summaryViewAll").addClass("itemconhidden")
                $(".choice-summary ul").prepend('<li class="c-choice-summary default summaryXboxOneS">' +
                    '<button class="c-action-trigger c-glyph glyph-cancel " href="#" aria-label="' + regionContent.keyClosefilterx1s + '">' +
                    '<span class="x-screen-reader">Xbox One S</span>' +
                    '</button>' +
                    '<span>Xbox One S</span>' +
                    '</li>')
                $(".summaryXboxOneS button").on("click", function() {
                    $("#xoFilterButton a").click();
                })
                buttonaria("#xosFilterButton a", "already")
                buttonaria("#xoFilterButton a", "both")
            } else if (consoleFilter[0] === "Xbox One S") {
                // do nothing if already selected
            } else {
                consoleFilter = [];
                $("#xoFilterButton").css("opacity", "1");
                $("#xosFilterButton").css("opacity", "1");
                $(".xoConsoles").show();
                $(".xosConsoles").show();
                $(".summaryViewAll").removeClass("itemconhidden")
                $(".summaryXboxOneS").remove();
                $(".summaryXboxOne").remove();
                buttonaria("#xosFilterButton a", "only")
                buttonaria("#xoFilterButton a", "only")
            }
            //$(".consoleItem").first().find(".detailsLink").eq(0).focus();
        })

        $("#xoFilterButton a").click(function(e) {
            e.preventDefault();
            if (consoleFilter.length === 0) {
                consoleFilter.push("Xbox One");
                $("#xosFilterButton").css("opacity", ".45");
                $(".xosConsoles").hide();
                $(".xosConsoles").next(".m-feature").hide();
                $(".summaryViewAll").addClass("itemconhidden")
                $(".choice-summary ul").prepend('<li class="c-choice-summary default summaryXboxOne">' +
                    '<button class="c-action-trigger c-glyph glyph-cancel " href="#" aria-label="' + regionContent.keyClosefilterx1 + '">' +
                    '<span class="x-screen-reader">Xbox One X</span>' +
                    '</button>' +
                    '<span>Xbox One X</span>' +
                    '</li>')
                $(".summaryXboxOne button").on("click", function() {
                    $("#xosFilterButton a").click();
                })
                buttonaria("#xoFilterButton a", "already")
                buttonaria("#xosFilterButton a", "both")
            } else if (consoleFilter[0] === "Xbox One") {
                // do nothing if already selected
            } else {
                consoleFilter = [];
                $("#xoFilterButton").css("opacity", "1");
                $("#xosFilterButton").css("opacity", "1");
                $(".xoConsoles").show();
                $(".xosConsoles").show();
                $(".summaryViewAll").removeClass("itemconhidden")
                $(".summaryXboxOneS").remove();
                $(".summaryXboxOne").remove();
                buttonaria("#xoFilterButton a", "only")
                buttonaria("#xosFilterButton a", "only")
            }
            //$(".consoleItem").first().find(".detailsLink").eq(0).focus();
        })

        $("#xoFilterButton a").on("keyup", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                //console.log("xo clicked!")
                event.preventDefault();
                //$(this).click(); 
                $("#xosFilterButton a")[0].focus();
            }
        })
        $("#xosFilterButton a").on("keyup", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                //$(this).click(); 
                $("#ratingFilter").eq(0).focus();
            }
        })

        function buttonaria(container, type) {
            if (type === "only") {
                $(container).attr("aria-label", $(container).attr("data-showonly-aria"));
            } else if (type === "already") {
                $(container).attr("aria-label", $(container).attr("data-showalready-aria"));
            } else {
                $(container).attr("aria-label", $(container).attr("data-showboth-aria"));
            }
        }

        var capacityFilter = defaultCapacities;
        var capacityFilterText = defaultCapacitiesText;
        var ratingFilter = defaultRatings;

        var updateCapacityFilters = function() {
            // capacity update
            if (capacityFilter.length !== 0) {
                $(".consoleItem").addClass("itemcaphidden");
                $(".capSummary").remove();
                var captext = ""
                for (var i = 0; i < capacityFilter.length; i++) {
                    if (urlRegion === "en-us") { captext = "capacity" }
                    // var ariaText = regionContent.keyClosefilter.replace("<PLACEHOLDER>", capacityFilterText[i]);
                    var ariaText = regionContent.keyClosefilter.replace("<PLACEHOLDER>", captext);
                    $(".consoleItem[data-storage='" + capacityFilter[i] + "']").removeClass("itemcaphidden");
                    $(".choice-summary ul").append('<li class="c-choice-summary default capSummary">' +
                        '<button class="c-action-trigger c-glyph glyph-cancel " href="#" aria-label="' + ariaText + '" data-filter="' + capacityFilter[i] + '">' +
                        '<span class="x-screen-reader">' + capacityFilterText[i] + '</span>' +
                        '</button>' +
                        '<span>' + capacityFilterText[i] + '</span>' +
                        '</li>')
                }
                $(".summaryViewAllCapacities").addClass("itemconhidden")
                $(".capSummary button").on("click", function() {
                    var capClose = $(this).data("filter")
                    var capInd = capacityFilter.indexOf(capClose);
                    capacityFilter.splice(capInd, 1);
                    capacityFilterText.splice(capInd, 1);
                    $(".capacitySelect a[data-capacity='" + capClose + "']").removeClass("f-selected");
                    updateCapacityFilters();
                    $("#storageFilter").eq(0).focus();
                })
            } else {
                $(".consoleItem").removeClass("itemcaphidden");
                $(".capSummary").remove();
                setTimeout(function() { $(".capViewAll").addClass("f-selected"); }, 100);
                $(".summaryViewAllCapacities").removeClass("itemconhidden")
            }
            if (capacityFilter.length === defaultCapacities.length) {
                $(".consoleItem").removeClass("itemcaphidden");
                $(".capacitySelect a").not(".capViewAll").removeClass("f-selected");
                setTimeout(function() { $(".capViewAll").addClass("f-selected"); }, 100);
                $(".capSummary").remove();
                $(".summaryViewAllCapacities").removeClass("itemconhidden")
            }
        }

        var updateRatingFilters = function() {
            // ratings update
            if (ratingFilter.length !== 0) {
                $(".consoleItem").addClass("itemrathidden");
                $(".ratSummary").remove();
                var rattext = ""
                for (var i = 0; i < ratingFilter.length; i++) {
                    if (urlRegion === "en-us") { rattext = "ratings" }
                    // var ariaText = regionContent.keyClosefilter.replace("<PLACEHOLDER>", ratingFilter[i]);
                    var ariaText = regionContent.keyClosefilter.replace("<PLACEHOLDER>", rattext);
                    $(".consoleItem[data-rating='" + ratingFilter[i] + "']").removeClass("itemrathidden");
                    var rfInd = defaultRatings.indexOf(ratingFilter[i]);
                    var ratingTitle = defaultRatingsText[rfInd];
                    $(".choice-summary ul").append('<li class="c-choice-summary default ratSummary">' +
                        '<button class="c-action-trigger c-glyph glyph-cancel " href="#" aria-label="' + ariaText + '" data-filter="' + ratingFilter[i] + '">' +
                        '<span class="x-screen-reader">' + ratingTitle + '</span>' +
                        '</button>' +
                        '<span>' + ratingTitle + '</span>' +
                        '</li>')
                }
                $(".summaryViewAllRatings").addClass("itemrathidden")
                $(".ratSummary button").on("click", function() {
                    var ratClose = $(this).data("filter")
                    var ratInd = ratingFilter.indexOf(ratClose);
                    ratingFilter.splice(ratInd, 1);
                    $(".ratingSelect a[data-rating='" + ratClose + "']").removeClass("f-selected");
                    updateRatingFilters();
                    $("#ratingFilter").eq(0).focus();
                })
            } else {
                $(".consoleItem").removeClass("itemrathidden");
                $(".ratSummary").remove();
                setTimeout(function() { $(".ratViewAll").addClass("f-selected"); }, 100)
                $(".summaryViewAllRatings").removeClass("itemrathidden")
            }
            if (ratingFilter.length === defaultRatings.length) {
                $(".consoleItem").removeClass("itemrathidden");
                $(".ratingSelect a").not(".ratViewAll").removeClass("f-selected");
                setTimeout(function() { $(".ratViewAll").addClass("f-selected"); }, 100);
                $(".ratSummary").remove();
                $(".summaryViewAllRatings").removeClass("itemrathidden")
            }
        }

        $(".capacitySelect a").on("click", function(e) {
            e.preventDefault();
            var capacity = $(this).data("capacity");
            if (capacity === "view-all") {
                capacityFilter = defaultCapacities;
                capacityFilterText = defaultCapacitiesText;
                $(".capacitySelect a").not(".capViewAll").removeClass("f-selected");
                setTimeout(function() { $(".capViewAll").addClass("f-selected"); }, 100);
                updateCapacityFilters();
            } else {
                capacityFilter = [];
                capacityFilterText = [];
                setTimeout(function() {
                    $(".capViewAll").removeClass("f-selected");
                    $(".capacitySelect .f-selected").each(function() {
                        var capToAdd = $(this).data("capacity");
                        capacityFilter.push(capToAdd)
                        capacityFilterText.push(regionContent["key" + capToAdd])
                    })
                    updateCapacityFilters();
                    //$(".consoleItem").first().find(".detailsLink").eq(0).focus();
                }, 100)
            }

        })

        $(".ratingSelect a").on("click", function(e) {
            e.preventDefault();
            var rating = $(this).data("rating");
            if (rating === "view-all") {
                ratingFilter = defaultRatings;
                $(".ratingSelect a").not(".ratViewAll").removeClass("f-selected");
                setTimeout(function() { $(".ratViewAll").addClass("f-selected"); }, 100);
                updateRatingFilters();
            } else {
                ratingFilter = [];
                setTimeout(function() {
                    $(".ratViewAll").removeClass("f-selected");
                    $(".ratingSelect .f-selected").each(function() {
                        var ratToAdd = $(this).data("rating");
                        ratingFilter.push(ratToAdd)
                    })
                    updateRatingFilters();
                    //$(".consoleItem").first().find(".detailsLink").eq(0).focus();
                }, 100)
            }

        })
        $("#unique-id-for-list a").on("keydown", function(event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                $(this).click();
                //$(".consoleItem").first().find(".detailsLink").eq(0).focus();   
            }
        })

        // url based filtering
        var docUrl = document.URL;
        if (docUrl.indexOf("#") > -1) {
            var theConsole = docUrl.split("#")[1].toLowerCase();
            if (theConsole.indexOf("xbox-one-s") !== -1) {
                $("#xosFilterButton a").click();
            } else if (theConsole.indexOf("xbox-one-x") !== -1) {
                $("#xoFilterButton a").click();
            }
            if (docUrl.split("#")[2]) {
                var theCapacities = docUrl.split("#")[2];
                var tempCap = [];
                for (var i = 0; i < defaultCapacities.length; i++) {
                    if (theCapacities.indexOf(defaultCapacities[i]) !== -1) {
                        tempCap.push(defaultCapacities[i]);
                        $(".capViewAll").removeClass("f-selected");
                        $(".cap" + defaultCapacities[i]).addClass("f-selected");
                    }
                }
                if (tempCap.length !== 0) {
                    capacityFilter = tempCap;
                } else {
                    capacityFilter = defaultCapacities;
                }
                updateCapacityFilters();
            }
            if (docUrl.split("#")[3]) {
                var theRatings = docUrl.split("#")[3];
                var tempRat = [];
                for (var i = 0; i < defaultRatings.length; i++) {
                    if (theRatings.indexOf(defaultRatingsText[i]) !== -1) {
                        tempRat.push(defaultRatings[i]);
                        $(".ratViewAll").removeClass("f-selected");
                        $(".rat" + defaultRatings[i]).addClass("f-selected");
                    }
                }
                if (tempRat.length !== 0) {
                    ratingFilter = tempRat;
                } else {
                    ratingFilter = defaultRatings;
                }
                updateRatingFilters();
            }
        }

        // Console filter removal
        //var removeX1 = "pt-br en-in en-us ar-ae ar-sa en-gb en-ca fr-ca he-il de-at ar-ae ar-sa cs-cz da-dk de-at de-ch de-de el-gr en-au en-ie en-nz es-es fi-fi fr-be fr-ca fr-ch fr-fr he-il hu-hu it-it ja-jp nb-no nl-be pt-pt ru-ru sk-sk sv-se es-mx en-hk en-sg en-za es-ar es-cl es-co ko-kr nl-nl pl-pl tr-tr zh-hk zh-tw"
        var removeX1 = ""
        if (removeX1.indexOf(urlRegion) !== -1) {
            $("#xosFilterButton a").click();
            $(".consoleFilterButton").remove();
            $(".context-refine-menu-template.pad-left-right").attr("data-grid", "col-6")
            $(".context-refine-menu-template.pad-left").attr("data-grid", "col-6")
            $(".summaryXboxOneS").remove();
            $(".consoleFilters .live-area p.c-subheading-3").text(filterHeaderContent.locales[urlRegion].keyFilterheader) // use JSON once received
        }

        var x1Cross = "";
        var crossRegion = crossSell.locales[urlRegion]
        if (x1Cross.indexOf(urlRegion) !== -1) {
            $("#xosFilterButton a").click();
            $(".consoleFilterButton").remove();
            $(".context-refine-menu-template.pad-left-right").attr("data-grid", "col-6")
            $(".context-refine-menu-template.pad-left").attr("data-grid", "col-6")
            $(".summaryXboxOneS").remove();
            $(".consoleFilters .live-area p.c-subheading-3").text(filterHeaderContent.locales[urlRegion].keyFilterheader) // use JSON once received
            $(".xoConsoles").parent("div").after('<div class="" data-grid="container">' + //Changed from xosConsoles
                '<div class="m-feature" data-grid="col-12">' +
                '<section class="c-feature f-align-right">' +
                '<picture>' +
                '<source srcset="http://compass.xbox.com/assets/2d/da/2ddafe5c-5598-4c50-b917-a5ddf9fe20b5.jpg?n=WIndows-10-Xbox-App_Feature-1400_X1_800x450.jpg" media="(min-width:768px)">' +
                '<source srcset="http://compass.xbox.com/assets/59/af/59af7072-b815-4cb5-81dc-3fc70c6e51f0.jpg?n=WIndows-10-Xbox-App_Feature-768_X1_630x472.jpg" media="(min-width:540px)">' +
                '<source srcset="http://compass.xbox.com/assets/e3/79/e37933bd-ade3-4c63-ac49-e1d8d0a8bcf9.jpg?n=WIndows-10-Xbox-App_Feature-0_X1_767x288.jpg" media="(min-width:0)">' +
                '<img srcset="" src="http://compass.xbox.com/assets/77/70/77703d56-328e-4798-a9c2-5d9f0fe7f3e7.jpg?n=X1S_Feature-Desktop_Cross-sell-Vertical_800x500.jpg" alt="Xbox one with controller" />' +
                '</picture>' +
                '<div>' +
                '<h2 class="c-heading crossHeading">' + crossRegion.keyXboxone + '</h2>' +
                '<p class="c-paragraph crossCopy">' + crossRegion.keyAvailabledirectlyfrom + '</p>' +
                '<div class="c-group">' +
                '<a href="' + crossRegion.keyHttpwwwxboxcomenhkxbo + '" class="c-call-to-action c-glyph crossLink" data-clickname="www>>xbox-one>consoles>x1-cross-sell>retailers>click" aria-label="shop all xbox consoles" data-cta="learn">' +
                '<span class="crossLinkCopy">' + crossRegion.keyFindaretailer + '</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</section>' +
                '</div>' +
                '</div>')
            if ($(".crossLink").attr("href") === "####") {
                $(".crossLink").remove();
            }
        }

        var removeX1S = "";
        if (removeX1S.indexOf(urlRegion) !== -1) {
            $("#xoFilterButton a").click();
            $(".consoleFilterButton").remove();
            $(".context-refine-menu-template.pad-left-right").attr("data-grid", "col-6")
            $(".context-refine-menu-template.pad-left").attr("data-grid", "col-6")
            $(".summaryXboxOne").remove();
            $(".consoleFilters .live-area p.c-subheading-3").text(filterHeaderContent.locales[urlRegion].keyFilterheader) // use JSON once received
        }


        var oldx1stext = $(".consoleFilters .c-subheading-3").html();
        if (oldx1stext !== undefined) {
            $(".consoleFilters .c-subheading-3").html(oldx1stext.replace("Xbox One S", "Xbox One"));
        }

        // initialize filter aria labels
        setTimeout(function() {
            $("#storageFilter").click().click();
            $("#ratingFilter").click().click();
        }, 2750)

        setTimeout(function() {
            $("body").show();
        }, 750)

        //star ratings
        var GetRatingReview, PopulateRatingReview, populateRatingReviewData;
        var productID = $('.ratings').map(function() {
            return $(this).attr('data-productid');
        }).get().join(",");

        $.PopulateRatingReview =
            function(data) {
                $('.bv-rating-stars-container').each(function() {
                    var selectedProductID = parseInt($(this).attr('data-productid'));
                    if (!data.HasErrors && data.TotalResults > 0) {
                        for (var selectedItemCount = 0; selectedItemCount < data.TotalResults; selectedItemCount++) {
                            if (selectedProductID == parseInt(data.Results[selectedItemCount].ProductStatistics.ProductId, 10)) {
                                if (data.Results[selectedItemCount] != undefined && data.Results[selectedItemCount].ProductStatistics != undefined) {
                                    var avgRating = data.Results[selectedItemCount].ProductStatistics.ReviewStatistics.AverageOverallRating;
                                    var overAllRatingRange = data.Results[selectedItemCount].ProductStatistics.ReviewStatistics.OverallRatingRange;
                                    var totalReviewCount = data.Results[selectedItemCount].ProductStatistics.ReviewStatistics.TotalReviewCount;
                                    if (totalReviewCount > 0) {
                                        var avgPercentage = (avgRating / overAllRatingRange) * 100;
                                        if ($(this).find('.bv-rating-stars-on').length > 0) {
                                            $(this).find('.bv-rating-stars-on').css('width', avgPercentage + '%');
                                        }
                                        $(this).find('.bv-off-screen').html(avgRating);
                                        $(this).parent().find('.bvseo-ratingValue').html(avgRating);
                                        $(this).parent().find('.bvseo-bestRating').html(overAllRatingRange);
                                        $(this).find('.overallrating').attr('content', overAllRatingRange);
                                        $(this).parent().find('.avgRating').html('  ' + Math.round(avgRating * 10) / 10);
                                        $(this).parent().find('.reviewsCount,.bvseo-reviewCount').html('  (' + totalReviewCount + ' Reviews)');
                                        $(this).parent().removeClass('ratingPluginIntialLoad');
                                    } else if (totalReviewCount == 0) {
                                        $(this).find('.bv-rating-stars-on').css('width', 0 + '%');
                                        $(this).parent().find('.reviewsCount').html('(' + totalReviewCount + ')');
                                        $(this).parent().removeClass('ratingPluginIntialLoad');
                                    }
                                }
                                return true;
                            }
                        }
                    }
                });
                // $(window).trigger('resize');
            }

        $.GetRatingReview =
            function() {
                if ($.populateRatingReviewData == undefined && productID != "") {
                    if (urlRegion === "en-us") {
                        var serviceURl = '//api.bazaarvoice.com/data/statistics.json?apiversion=5.4&passkey=azhcqyk65khx35wtczcarpwp&stats=Reviews&Filter=ProductId:' + productID + '&filter=contentlocale:eq:en_US'
                    } else {
                        var serviceURl = '//api.bazaarvoice.com/data/statistics.json?apiversion=5.4&passkey=azhcqyk65khx35wtczcarpwp&stats=Reviews&Filter=ProductId:' + productID;
                    }
                    $.ajax({
                        async: false,
                        url: serviceURl,
                        type: "GET",
                        dataType: "jsonp",
                        context: this,
                        success: function(data) {
                            $.populateRatingReviewData = data;
                            if (data != undefined) {
                                $.PopulateRatingReview(data);
                            }
                        }
                    });
                } else {
                    if ($.populateRatingReviewData != undefined) {
                        $.PopulateRatingReview($.populateRatingReviewData);
                    }
                }
            }

        $.GetRatingReview();

        $("body").append('<style>' +
            '.avgRating, .reviewsCount {color: #107c10; font-weight: 700;}' +
            '.avgRating:hover, .reviewsCount:hover {text-decoration: underline;}' +
            '.ratingPluginIntialLoad {' +
            'display:none;' +
            '}' +
            '.ReviewsCount {' +
            'float:left;' +
            'color:#107C10;' +
            '}' +
            '.bv-rating-stars-container {' +
            'display: inline-table;' +
            '}' +
            '.rtl .bv-rating-stars-container {' +
            'float:right;' +
            '}' +
            '.bv-rating-stars-off {' +
            'color: #9d9d9e;' +
            '}' +
            '.bv-rating-stars{' +
            'display: block;' +
            'display:-webkit-box;' +
            'display: -ms-grid;' +
            'overflow:hidden; ' +
            'font-size:1.5em; ' +
            'height:1em;' +
            'line-height:1em;' +
            '}' +
            '.bv-rating-stars-on {' +
            'margin-top:-1em;' +
            'color:#107C10;' +
            '}' +
            '.ratings {' +
            'padding-top: 12px;' +
            '}' +
            '.ratings + .c-price{' +
            'width:100%;' +
            'float:left;' +
            '}' +
            // '.xosConsoles .c-heading-2 {' +
            // 'visibility: hidden !important;' +
            // '}' +
            '</style>')

        // accessibility fix
        $("#capacity h2").attr("aria-hidden", "true");
        $("#rating h2").attr("aria-hidden", "true");
    })();

});

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}


priceFormat = {
    "locales": {
        "en-us": {
            "keyPriceFormat": "$# ",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "ar-ae": {
            "keyPriceFormat": "AED #",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "ar-sa": {
            "keyPriceFormat": "SR #",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," //no decimal
        },
        "cs-cz": {
            "keyPriceFormat": "# Kč",
            "keyHasDecimal": false,
            "keyThousandCharacter": " " //space replace comma, no decimal
        },
        "da-dk": {
            "keyPriceFormat": "# kr",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "de-at": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "de-ch": {
            "keyPriceFormat": "CHF #",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "de-de": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "el-gr": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-au": {
            "keyPriceFormat": "$# ",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-ca": {
            "keyPriceFormat": "$# ",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-gb": {
            "keyPriceFormat": "£#",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-hk": {
            "keyPriceFormat": "HK$#",
            "keyHasDecimal": true,
            "keyThousandCharacter": "," //no decimal
        },
        "en-ie": {
            "keyPriceFormat": "€ #",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-in": {
            "keyPriceFormat": "₹ #",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-nz": {
            "keyPriceFormat": "$# ",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "en-sg": {
            "keyPriceFormat": "SG$#",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," // no decimal
        },
        "en-za": {
            "keyPriceFormat": "R#",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "es-ar": {
            "keyPriceFormat": "$ #",
            "keyHasDecimal": false,
            "keyThousandCharacter": "."
        },
        "es-cl": {
            "keyPriceFormat": "$#",
            "keyHasDecimal": false,
            "keyThousandCharacter": "."
        },
        "es-co": {
            "keyPriceFormat": "$#",
            "keyHasDecimal": false,
            "keyThousandCharacter": "."
        },
        "es-es": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "es-mx": {
            "keyPriceFormat": "$#",
            "keyHasDecimal": false,
            "keyThousandCharacter": ","
        },
        "fi-fi": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "."
        },
        "fr-be": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "."
        },
        "fr-ca": {
            "keyPriceFormat": "# $",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," //no decimal
        },
        "fr-ch": {
            "keyPriceFormat": "CHF #",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "fr-fr": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "he-il": {
            "keyPriceFormat": "₪‎#",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "hu-hu": {
            "keyPriceFormat": "# HUF",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "it-it": {
            "keyPriceFormat": "€#",
            "keyHasDecimal": true,
            "keyThousandCharacter": "."
        },
        "ja-jp": {
            "keyPriceFormat": "# 円 (税込)",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," //no decimal
        },
        "ko-kr": {
            "keyPriceFormat": "₩#",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," //no decimal
        },
        "nb-no": {
            "keyPriceFormat": "# kr",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "nl-be": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "nl-nl": {
            "keyPriceFormat": "€ #",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "pl-pl": {
            "keyPriceFormat": "# zł",
            "keyHasDecimal": true,
            "keyThousandCharacter": " " // comma replace period, space replace comma
        },
        "pt-br": {
            "keyPriceFormat": "R$ #",
            "keyHasDecimal": false,
            "keyThousandCharacter": "."
        },
        "pt-pt": {
            "keyPriceFormat": "#€",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." //period comma reversed
        },
        "ru-ru": {
            "keyPriceFormat": "# ₽",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "sk-sk": {
            "keyPriceFormat": "# €",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," // no decimal
        },
        "sv-se": {
            "keyPriceFormat": "# kr",
            "keyHasDecimal": true,
            "keyThousandCharacter": "." // no comma
        },
        "tr-tr": {
            "keyPriceFormat": "# ₺",
            "keyHasDecimal": true,
            "keyThousandCharacter": ","
        },
        "zh-hk": {
            "keyPriceFormat": "HK$#",
            "keyHasDecimal": true,
            "keyThousandCharacter": "," //no decimal
        },
        "zh-tw": {
            "keyPriceFormat": "NT$#",
            "keyHasDecimal": false,
            "keyThousandCharacter": "," //no decimal
        }
    }
}

//If you don't send in the format from the PriceFormat JSON, you're going to have a bad time.
function formatCurrency(price, format) {
    var formattedPrice = "" + price;
    if (!format.keyHasDecimal) {
        formattedPrice = formattedPrice.split(".")[0];
    } else if (formattedPrice.indexOf(".99") === -1) {
        formattedPrice = formattedPrice.split(".")[0] + ".00";
    }
    if (formattedPrice.split(".")[0].length > 3) { // Needs to figure out thousands
        //console.log("splitting thousands");
        if (!format.keyHasDecimal) {
            formattedPrice = formattedPrice.substring(0, formattedPrice.length - 3) + "*" + formattedPrice.substring(formattedPrice.length - 3, formattedPrice.length);
        } else {
            formattedPrice = formattedPrice.substring(0, formattedPrice.length - 6) + "*" + formattedPrice.substring(formattedPrice.length - 6, formattedPrice.length);
        }
    }
    if (formattedPrice.split(".")[0].length > 7) { // Needs to figure out millions
        //console.log("splitting millions");
        if (!format.keyHasDecimal) {
            formattedPrice = formattedPrice.substring(0, formattedPrice.length - 7) + "MMM" + formattedPrice.substring(formattedPrice.length - 7, formattedPrice.length);
        } else {
            formattedPrice = formattedPrice.substring(0, formattedPrice.length - 10) + "MMM" + formattedPrice.substring(formattedPrice.length - 10, formattedPrice.length);
        }
    }
    
    if (format.keyThousandCharacter === ",") {
        //console.log("replacing thousand");
        formattedPrice = formattedPrice.replace("*", format.keyThousandCharacter);
        formattedPrice = formattedPrice.replace("MMM", format.keyThousandCharacter);
    } else {
        //console.log("replacing period");
        formattedPrice = formattedPrice.replace(".", ",");
        formattedPrice = formattedPrice.replace("*", format.keyThousandCharacter);
        formattedPrice = formattedPrice.replace("MMM", format.keyThousandCharacter);
    }

    formattedPrice = "" + format.keyPriceFormat.replace("#", formattedPrice);

    return formattedPrice;
}

/***
///////////////////////ScrollTo////////////////
***/

(function() {
    // Prepare
    var $, ScrollTo
    $ = window.jQuery || require('jquery')

    // Fix scrolling animations on html/body on safari
    $.propHooks.scrollTop = $.propHooks.scrollLeft = {
        get: function(elem, prop) {
            var result = null
            if (elem.tagName === 'HTML' || elem.tagName === 'BODY') {
                if (prop === 'scrollLeft') {
                    result = window.scrollX
                } else if (prop === 'scrollTop') {
                    result = window.scrollY
                }
            }
            if (result == null) {
                result = elem[prop]
            }
            return result
        }
    }
    $.Tween.propHooks.scrollTop = $.Tween.propHooks.scrollLeft = {
        get: function(tween) {
            return $.propHooks.scrollTop.get(tween.elem, tween.prop)
        },
        set: function(tween) {
            // Our safari fix
            if (tween.elem.tagName === 'HTML' || tween.elem.tagName === 'BODY') {
                // Defaults
                tween.options.bodyScrollLeft = (tween.options.bodyScrollLeft || window.scrollX)
                tween.options.bodyScrollTop = (tween.options.bodyScrollTop || window.scrollY)

                // Apply
                if (tween.prop === 'scrollLeft') {
                    tween.options.bodyScrollLeft = Math.round(tween.now)
                } else if (tween.prop === 'scrollTop') {
                    tween.options.bodyScrollTop = Math.round(tween.now)
                }

                // Apply
                window.scrollTo(tween.options.bodyScrollLeft, tween.options.bodyScrollTop)
            }
            // jQuery's IE8 Fix
            else if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now
            }
        }
    }

    // jQuery ScrollTo
    ScrollTo = {
        // Configuration
        config: {
            duration: 400,
            easing: 'swing',
            callback: null,
            durationMode: 'each',
            offsetTop: 0,
            offsetLeft: 0
        },

        // Set Configuration
        configure: function(options) {
            // Apply Options to Config
            $.extend(ScrollTo.config, options || {})

            // Chain
            return this
        },

        // Perform the Scroll Animation for the Collections
        // We use $inline here, so we can determine the actual offset start for each overflow:scroll item
        // Each collection is for each overflow:scroll item
        scroll: function(collections, config) {
            // Prepare
            var collection, $container, $target, $inline, position,
                containerScrollTop, containerScrollLeft,
                containerScrollTopEnd, containerScrollLeftEnd,
                startOffsetTop, targetOffsetTop, targetOffsetTopAdjusted,
                startOffsetLeft, targetOffsetLeft, targetOffsetLeftAdjusted,
                scrollOptions,
                callback

            // Determine the Scroll
            collection = collections.pop()
            $container = collection.$container
            $target = collection.$target

            // Prepare the Inline Element of the Container
            $inline = $('<span/>').css({
                'position': 'absolute',
                'top': '0px',
                'left': '0px'
            })
            position = $container.css('position')

            // Insert the Inline Element of the Container
            $container.css({ position: 'relative' })
            $inline.appendTo($container)

            // Determine the top offset
            startOffsetTop = $inline.offset().top
            targetOffsetTop = $target.offset().top
            targetOffsetTopAdjusted = targetOffsetTop - startOffsetTop - parseInt(config.offsetTop, 10)

            // Determine the left offset
            startOffsetLeft = $inline.offset().left
            targetOffsetLeft = $target.offset().left
            targetOffsetLeftAdjusted = targetOffsetLeft - startOffsetLeft - parseInt(config.offsetLeft, 10)

            // Determine current scroll positions
            containerScrollTop = $container.prop('scrollTop')
            containerScrollLeft = $container.prop('scrollLeft')

            // Reset the Inline Element of the Container
            $inline.remove()
            $container.css({ position: position })

            // Prepare the scroll options
            scrollOptions = {}

            // Prepare the callback
            callback = function() {
                // Check
                if (collections.length === 0) {
                    // Callback
                    if (typeof config.callback === 'function') {
                        config.callback()
                    }
                } else {
                    // Recurse
                    ScrollTo.scroll(collections, config)
                }
                // Return true
                return true
            }

            // Handle if we only want to scroll if we are outside the viewport
            if (config.onlyIfOutside) {
                // Determine current scroll positions
                containerScrollTopEnd = containerScrollTop + $container.height()
                containerScrollLeftEnd = containerScrollLeft + $container.width()

                // Check if we are in the range of the visible area of the container
                if (containerScrollTop < targetOffsetTopAdjusted && targetOffsetTopAdjusted < containerScrollTopEnd) {
                    targetOffsetTopAdjusted = containerScrollTop
                }
                if (containerScrollLeft < targetOffsetLeftAdjusted && targetOffsetLeftAdjusted < containerScrollLeftEnd) {
                    targetOffsetLeftAdjusted = containerScrollLeft
                }
            }

            // Determine the scroll options
            if (targetOffsetTopAdjusted !== containerScrollTop) {
                scrollOptions.scrollTop = targetOffsetTopAdjusted
            }
            if (targetOffsetLeftAdjusted !== containerScrollLeft) {
                scrollOptions.scrollLeft = targetOffsetLeftAdjusted
            }

            // Check to see if the scroll is necessary
            if ($container.prop('scrollHeight') === $container.height()) {
                delete scrollOptions.scrollTop
            }
            if ($container.prop('scrollWidth') === $container.width()) {
                delete scrollOptions.scrollLeft
            }

            // Perform the scroll
            if (scrollOptions.scrollTop != null || scrollOptions.scrollLeft != null) {
                $container.animate(scrollOptions, {
                    duration: config.duration,
                    easing: config.easing,
                    complete: callback
                })
            } else {
                callback()
            }

            // Return true
            return true
        },

        // ScrollTo the Element using the Options
        fn: function(options) {
            // Prepare
            var collections, config, $container, container
            collections = []

            // Prepare
            var $target = $(this)
            if ($target.length === 0) {
                // Chain
                return this
            }

            // Handle Options
            config = $.extend({}, ScrollTo.config, options)

            // Fetch
            $container = $target.parent()
            container = $container.get(0)

            // Cycle through the containers
            while (($container.length === 1) && (container !== document.body) && (container !== document)) {
                // Check Container for scroll differences
                var containerScrollTop, containerScrollLeft
                containerScrollTop = $container.css('overflow-y') !== 'visible' && container.scrollHeight !== container.clientHeight
                containerScrollLeft = $container.css('overflow-x') !== 'visible' && container.scrollWidth !== container.clientWidth
                if (containerScrollTop || containerScrollLeft) {
                    // Push the Collection
                    collections.push({
                        '$container': $container,
                        '$target': $target
                    })
                    // Update the Target
                    $target = $container
                }
                // Update the Container
                $container = $container.parent()
                container = $container.get(0)
            }

            // Add the final collection
            collections.push({
                '$container': $('html'),
                // document.body doesn't work in firefox, html works for all
                // internet explorer starts at the beggining
                '$target': $target
            })

            // Adjust the Config
            if (config.durationMode === 'all') {
                config.duration /= collections.length
            }

            // Handle
            ScrollTo.scroll(collections, config)

            // Chain
            return this
        }
    }

    // Apply our extensions to jQuery
    $.ScrollTo = $.ScrollTo || ScrollTo
    $.fn.ScrollTo = $.fn.ScrollTo || ScrollTo.fn

    // Export
    return ScrollTo
}).call(this)

// Forcing tabindex on filter elements
setTimeout(function() {
    $('.ratingSelect .c-refine-item').attr("tabindex", "0");
}, 8000);