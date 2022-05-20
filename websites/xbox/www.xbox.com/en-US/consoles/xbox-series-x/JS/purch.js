$(document).ready(function() {
    consSoldOut = "f";
    var API_pop = (function() {
        var urlRegion = document.URL.split("/")[3].toLowerCase();
        // page bar price
        var startingatLocales = "en-us, en-gb, en-au, en-nz"
        if ($(".price-callout").length === 0) {
            $(".m-in-page-navigation .CTAdiv").prepend('<span class="price-callout"> <span class="price-msrp"></span></span>');
        }
        $(".price-callout").clone().appendTo(".heroPrice");

        var stripQueryString = document.URL.split("?");
        var currentUrl = stripQueryString[0].split("/");
        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var prodId = $("#standalonePurch").attr("data-productId");
        var prodIdUpd = $("#standalonePurch").attr("data-updated-productId");
        var specIdBig = $("#standalonePurch").attr("data-special-productId");
        if (specIdBig === undefined)
            var specIdBig = "";
        var psSku = $(".price-spider .ps-widget").attr("ps-sku");
        var currencyFormat = priceFormat.locales[urlRegion];
        var regionSoldout = globalSoldout.locales[urlRegion];
        var sheetDataLoc = allConsoles.locales[urlRegion];
        var pageId = currentUrl[currentUrl.length - 1];
        pageId = pageId.split("#")[0];
        var consoleVersion = currentUrl[currentUrl.length - 2];
        if (pageId.toLowerCase() === "home" || pageId == "") {
            pageId = currentUrl[currentUrl.length - 2];
            consoleVersion = currentUrl[currentUrl.length - 3];
        }
        var apiMSRPPrice = "";
        var apiListPrice = "";
        if (psSku !== "") {
            $(".price-spider").css("display", "inline-block");
        }

        //Grab the product ID from the sheet
        for (var i = 0; i < sheetDataLoc.length; i++) {
            var splitCurrentProductURL = sheetDataLoc[i].detailsURL.split("/");
            var currentProductPageId = splitCurrentProductURL[splitCurrentProductURL.length - 1];
            var currentProductConsoleVersion = splitCurrentProductURL[splitCurrentProductURL.length - 2];
            if (currentProductPageId.toLowerCase() === "home" || currentProductPageId == "") {
                currentProductPageId = splitCurrentProductURL[splitCurrentProductURL.length - 2];
                currentProductConsoleVersion = splitCurrentProductURL[splitCurrentProductURL.length - 3];
            }
            console.log("console version from sheet: " + currentProductConsoleVersion.toLowerCase());
            console.log("actual console version: " + consoleVersion.toLowerCase())
                //prodId = undefined;
            if (sheetDataLoc[i].itemId.toLowerCase() === pageId.toLowerCase() && consoleVersion.toLowerCase() === currentProductConsoleVersion.toLowerCase()) {
                console.log("using id from sheet");
                currentProduct = sheetDataLoc[i];
                if (currentProduct.productId.indexOf("/") !== -1) {
                    prodId = currentProduct.productId.toUpperCase();
                }
                if (currentProduct.updProductId.indexOf("/") !== -1) {
                    prodIdUpd = currentProduct.updProductId.toUpperCase();
                    console.log("FOUND UPDATED PRODUCT ID upd id= " + prodIdUpd);
                }
                if (currentProduct.specIdBig.length > 0) {
                    specIdBig = currentProduct.specIdBig.toUpperCase();
                    console.log("FOUND SPECIAL PRODUCT ID upd id= " + specIdBig);
                }

                break;
            }
        }
        if (prodId === undefined) { throw ("New Product ID " + pageId + " not found in Console Hub JSON. Please check spreadsheet.") }
        //console.log("upd id= " + prodIdUpd);
        //console.log("spec id= " + specIdBig);

        // detect daylight saving
        Date.prototype.stdTimezoneOffset = function() {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }
        Date.prototype.dst = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }
        var pacificoffset = 8;
        var dsttest = new Date();
        var usertzhours = dsttest.getTimezoneOffset() / 60;
        if (dsttest.dst()) {
            pacificoffset = 7;
        }
        console.log(prodId + " - " + prodIdUpd + "-" + specIdBig);
        // check to see if updated bigid is live
        if (prodIdUpd !== undefined && prodIdUpd !== "") {
            if (prodIdUpd.length === 12 && prodIdUpd.indexOf("-") === -1) {
                var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdUpd + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
                if (specIdBig !== "") {
                    var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                }
                $.get(apiUrlTest)
                    .done(function(responseData) {
                        apiDataTest = responseData;
                        if (apiDataTest.Products.length === 0) {
                            idFound();
                        } else {
                            prodId = prodIdUpd;
                            idFound("true");
                        }
                    })
                    .fail(function() {
                        idFound();
                    })
            } else {
                var testSku = prodIdUpd.split("/")[1];
                var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdUpd.split("/")[0] + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
                if (specIdBig !== "") {
                    var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                }

                $.get(apiUrlTest)
                    .done(function(responseData) {
                        apiDataTest = responseData;
                        if (apiDataTest.Products.length === 0) {
                            idFound();
                        } else {
                            var skuFound = false;
                            apiDataTest.Products[0].DisplaySkuAvailabilities.forEach(function(y) {
                                var stillLooking = true;
                                y.Availabilities.forEach(function(z) {
                                    if ((z.SkuId === testSku.toUpperCase()) && stillLooking) {
                                        console.log("sku= " + testSku);
                                        skuFound = true;
                                        apiMSRPPrice = z.OrderManagementData.Price.MSRP;
                                        apiListPrice = z.OrderManagementData.Price.ListPrice;
                                        stillLooking = false; //Leave loop, there may be multiple matches but the first one is ususally the one you want.
                                    }
                                })
                            })
                            if (skuFound === false) {
                                idFound();
                            } else {
                                var ispreorder = responseData.Products[0].DisplaySkuAvailabilities[0].Sku.Properties.IsPreOrder;
                                if (ispreorder.toString().toLowerCase() === "true") {
                                    var potext = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
                                    // Manually Done
                                    // $(".purchButton span").text(potext);
                                    $(".purchButton").attr("aria-label", potext + ", " + responseData.Products[0].LocalizedProperties[0].ShortTitle);
                                    // Manually Done
                                    // $(".purchButtonPB span").text(potext);
                                    // $(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
                                    if (prodIdUpd !== undefined && prodIdUpd !== "") {
                                        prodId = prodIdUpd;
                                        idFound("true");
                                    } else {
                                        idFound();
                                    }
                                } else {
                                    prodId = prodIdUpd;
                                    idFound("true");
                                }

                            }
                        }
                    })
                    .fail(function() {
                        idFound();
                    })
            }
        } else {
            var testSku = prodId.split("/")[1];
            var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodId.split("/")[0] + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
            if (specIdBig !== "") {
                var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
            }
            $.get(apiUrlTest)
                .done(function(responseData) {
                    apiDataTest = responseData;
                    if (apiDataTest.Products.length === 0) {
                        idFound();
                    } else {
                        var skuFound = false;
                        apiDataTest.Products[0].DisplaySkuAvailabilities.forEach(function(y) {
                            var stillLooking = true;
                            y.Availabilities.forEach(function(z) {
                                if ((z.SkuId === testSku.toUpperCase()) && stillLooking) {
                                    console.log("sku= " + testSku);
                                    skuFound = true;
                                    apiMSRPPrice = z.OrderManagementData.Price.MSRP;
                                    apiListPrice = z.OrderManagementData.Price.ListPrice;
                                    stillLooking = false; //Leave loop, there may be multiple matches but the first one is ususally the one you want.
                                }
                            })
                        })
                        if (skuFound === false) {
                            idFound();
                        } else {
                            var ispreorder = responseData.Products[0].DisplaySkuAvailabilities[0].Sku.Properties.IsPreOrder;
                            if (ispreorder.toString().toLowerCase() === "true") {
                                var potext = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
                                // $(".addToCartBtn").text(potext);
                                // $(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
                                $(".purchButton span").text(potext);
                                $(".purchButton").attr("aria-label", potext + ", " + sheetProductInfo.product);
                                $(".purchButtonPB span").text(potext);
                            }
                            idFound();
                        }
                    }
                })
                .fail(function() {
                    idFound();
                })
        }


        function idFound(useupdated) {
            var customATC = $("#standalonePurch").attr("data-custom-addtocart-url");
            if (customATC === undefined) { customATC = ""; }
            var sheetDataLoc = allConsoles.locales[urlRegion];
            var sheetProdInd;

            //Check to see if there is legal, and if there is append it to the legal section of the page.

            if (useupdated === "true") {
                console.log("Using new Product ID.")
                for (var i = 0; i < sheetDataLoc.length; i++) {
                    if (sheetDataLoc[i].updProductId.toLowerCase() === prodId.toLowerCase()) {
                        sheetProdInd = i;
                    }
                }
                if (sheetProdInd === undefined) { throw ("New Product ID " + prodId + " not found in Console Hub JSON. Please check spreadsheet.") }
                sheetProductInfo = sheetDataLoc[sheetProdInd];
            } else {
                for (var i = 0; i < sheetDataLoc.length; i++) {
                    if (sheetDataLoc[i].productId.toLowerCase() === prodId.toLowerCase()) {
                        sheetProdInd = i;
                    }
                }
                sheetProductInfo = sheetDataLoc[sheetProdInd];
            }

            //Legal
            if (sheetProductInfo.legal1 !== "") {
                addLegal();
            }
            
            // BCGG
            var switchBCGG = sheetProductInfo.switchAA;
            if (switchBCGG === "TRUE") {
                $(".buyBox:not(.bcgg)").hide();
            } else {
                $(".bcgg").hide();
            }

            consSoldOut = sheetProductInfo.soldOut;
            if (consSoldOut === "t") {
                console.log("console sold out " + consSoldOut)
                var lm = lmCopy.locales[urlRegion].keyLearnmore;
                var consText = $(".c-in-page-navigation .c-heading-6").first().text();
                $(".CTAdiv button span").text(lm);
                $(".CTAdiv button span").attr("aria-label", lm + ", " + consText)
                $(".CTAdiv button span").css("visibility", "visible");
                $(".page-hero .fade-in .heroPrice").remove();
                $(".page-hero .fade-in [href='#purchase']").remove();
                $(".buy-group").replaceWith('<div class="buy-group" style="visibility:visible">' + tempOos.locales[urlRegion].keyTemporarilyoutofstock + '</div>');
            }
            var prodIdBig = sheetProductInfo.updProductId.split("/")[0];
            var apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
            if (specIdBig !== "") {
                apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
            }
            var guidIds = [];
            var apiData;
            var useAPIPrice = true; // Using a '!' character at the beginning of the priceText in the allConsoles.js price to override the API price.
            // console.log(sheetProductInfo.priceText)
            if (sheetProductInfo.priceText.charAt(0) === "!") {
                useAPIPrice = false;
                sheetProductInfo.priceNumber = sheetProductInfo.priceText.replace("!", "");
                sheetProductInfo.priceText = sheetProductInfo.priceText.replace("!", "");
                console.log(sheetProductInfo.priceText);
                if (sheetProductInfo.tprPriceText.charAt(0) === "!") {
                    sheetProductInfo.tprPriceNumber = sheetProductInfo.tprPriceText.replace("!", "");
                    sheetProductInfo.tprPriceText = formatCurrency(sheetProductInfo.tprPriceText.replace("!", ""), currencyFormat);
                }
            }
            // Add to Cart if in new store
            if (prodIdBig.length > 10) {
                $.get(apiUrl)
                    .done(function(responseData) {
                        apiData = responseData;
                        populate();
                    })
                    //$(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
            } else {
                //$(".purchRow1 .f-heavyweight.retailerLB").removeClass("hiddenImp");

            }

            if (sheetProductInfo === undefined) {
                throw ("The ProductID " + prodId + " is not found in the console JSON. Please check the spreadsheet.");
            }
            var buytext = sheetProductInfo.buyText; // USE THIS ONE
            //var buytext = "TEMPORARY TEXT ABOVE PURCHASE AREA";
            //var buyTextLoc = buyText.locales[urlRegion];
            //var buytext = buyTextLoc[Object.keys(buyTextLoc)[0]];
            $(".buyText").text(buytext);

            if ($(".buyText").text() === "####") {
                $(".buyText").hide();
            }

            if (sheetProductInfo.priceText.length !== 0) {
                var priceText = formatCurrency(sheetProductInfo.priceText, currencyFormat);
                // var priceText = sheetProductInfo.priceText;
                $(".price-msrp").text(priceText);
            } else {
                $(".monthlyPrice").remove();
            }
            if (sheetProductInfo.priceAA.indexOf("#") === -1 && sheetProductInfo.priceAA.length > 1) {
                var oddLocales = ["fi-fi", "nb-no", "fr-fr", "pl-pl", "it-it", "de-de","pt-pt"];

                var aaText = sheetProductInfo.priceAA.split(" ")[0];

                if (oddLocales.indexOf(urlRegion) !== -1) {
                    var aaText = sheetProductInfo.priceAA.split(" ")[0] + " " + sheetProductInfo.priceAA.split(" ")[1] + " " + sheetProductInfo.priceAA.split(" ")[2];
                    if ((urlRegion === "it-it") || (urlRegion === "de-de") || (urlRegion === "pt-pt")) {
                        var aaText = sheetProductInfo.priceAA.split(" ")[0] + " " + sheetProductInfo.priceAA.split(" ")[1] + " ";
                    }
                }
                if ((urlRegion === "da-dk") || (urlRegion === "sv-se" )|| (urlRegion === "es-mx")) {
                    var aaText = " " + sheetProductInfo.priceAA.split(" ")[0] + " " + sheetProductInfo.priceAA.split(" ")[1];
                }
                if (urlRegion === "ko-kr") {
                    var aaText = " " + sheetProductInfo.priceAA.split(" ")[4] + " " + sheetProductInfo.priceAA.split(" ")[5] + " " + sheetProductInfo.priceAA.split(" ")[6];
                }
                // var priceText = sheetProductInfo.priceText;
                $(".price-xaa-lc").text(aaText);
            }

            // if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
            //   var xsxString = "xbox-series-x";
            // } else {
            //   var xsxString = "xbox-series-s";
            // }

            var preorderURL = 'https://xbox.com/' + urlRegion + '/configure/' + sheetProductInfo.specIdBig.split("/")[0];
            // var preorderURL = 'https://www.microsoft.com/' + urlRegion + '/store/configure/' + xsxString + '-console/' + sheetProductInfo.specIdBig.split("/")[0];
            if (sheetProductInfo.updProductId.indexOf("#") === -1 && sheetProductInfo.updProductId.length > 1) {
                preorderURL = 'https://xbox.com/' + urlRegion + '/configure/' + sheetProductInfo.updProductId.split("/")[0];
                // preorderURL = 'https://www.microsoft.com/' + urlRegion + '/store/configure/' + xsxString + '-console/' + sheetProductInfo.updProductId.split("/")[0];
            }
            $(".purchButton").attr("href", preorderURL);

            if (sheetProductInfo.specIdBig.split("/")[0].length < 12 && sheetProductInfo.updProductId.split("/")[0].length < 12) {
                $(".purchButton").remove();
            }

            var canUseAPI_MSRP = (apiMSRPPrice !== "" && apiMSRPPrice != "0" && apiMSRPPrice != "100000" && useAPIPrice);

            if (canUseAPI_MSRP) { //added
                $(".price-msrp").text(formatCurrency(apiMSRPPrice, currencyFormat));
                console.log("msrp price= " + apiMSRPPrice);
                console.log("list price = " + apiListPrice);
            } else {
                if (priceText === "####") {
                    $(".price-msrp").siblings().hide();
                    $(".price-msrp").hide();
                }
            }

            var discountedPriceText = sheetProductInfo.tprPriceText;

            if (canUseAPI_MSRP && apiListPrice !== "" && (apiListPrice < apiMSRPPrice)) { //added
                discountedPriceText = formatCurrency(apiListPrice, currencyFormat);
                console.log("discount price = " + discountedPriceText);
            }

            if (discountedPriceText !== "####") {
                $(".price-msrp").before('<span class="x-screen-reader">' + 'Regularly' + '</span>');
                $(".price-msrp").css("text-decoration", "line-through").css("margin-right", "12px").css("display", "inline-block");
                $(".price-msrp").after('<span class="price-msrp">' + discountedPriceText + '</span>');
                $("#standalonePurch span.price-msrp").addClass("c-heading-1a c-heading-1a-pre")
                // $(".price-msrp").closest(".c-caption").append('<strong><span class="price-msrp">$250.00</span></strong>'); for testing
                $(".price-msrp").closest(".c-caption").css("margin-bottom", "12px");

                // XAA
                // $(".consolePurchase .price-msrp").closest("span").css("text-decoration", "line-through").css("margin-right", "12px");
                // $(".consolePurchase .price-msrp").after('<span class="price-msrp">' + discountedPriceText + '</span>');
            }

            var clickTitle = sheetProductInfo.itemId;
            //$(".addToCartBtn").attr("aria-label", $(".addToCartBtn").attr("aria-label").replace("consoleName", clickTitle));


            // XAA Controls
            // if (sheetProductInfo.switchAA === "TRUE") {
            //     $(".hero-pricing p:nth-child(1)").remove();
            //     $(".hero-pricing .addToCartBtn").remove();
            //     $(".buyText").remove();
            //     $(".gotoRetailer").remove();
            //     } else {
            //         $(".hero-pricing p:nth-child(2)").remove();
            //         $(".purchRow2 .hatchProd").removeClass("hiddenImp");
            //         $(".buttonAA").remove();
            //         $(".bannerAA").remove();
            //         $(".purchaseAA").remove();
            //         $("#caret-footnote").remove();
            //         $("#cross-footnote").remove();
            //     }

            if (urlRegion === "en-au") {
                $(".purchaseAA").addClass("enAU");
            }


            function populate() {
                if (prodId.split("/")[1] !== undefined) {
                    var sid = prodId.split("/")[1];
                } else {
                    if (apiData.Products[0]) {
                        var sid = apiData.Products[0].DisplaySkuAvailabilities[0].Sku.SkuId;
                    } else {
                        outOfStock();
                        return false;
                    }
                }

                if (apiData.Products[0]) {
                    for (var t = 0; t < apiData.Products[0].DisplaySkuAvailabilities.length; t++) {
                        if (apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].SkuId === sid.toUpperCase()) {
                            var availId = apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].AvailabilityId;
                            var ispreorder = apiData.Products[0].DisplaySkuAvailabilities[t].Sku.Properties.IsPreOrder;
                            if (ispreorder.toString().toLowerCase() === "true") {
                                buttonPreorder();
                            }
                            if (apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].Properties.PreOrderReleaseDate) {
                                $(".buyText").before('<h3 class="c-heading-3 availableDate"></h3>');

                                var releasedateraw = apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].Properties.PreOrderReleaseDate;
                                releasedateraw = new Date(releasedateraw);
                                releasedateraw.setHours(releasedateraw.getHours() + pacificoffset - usertzhours)
                                var rdYear = releasedateraw.getYear() + 1900;
                                var rdMonth = releasedateraw.getMonth() + 1;
                                var rdDay = releasedateraw.getDate();
                                var zhArray = ["zh-hk", "zh-tw"];
                                var frArray = ["fr-ca", "fr-be", "fr-ch", "fr-fr"];
                                var deArray = ["de-at", "de-ch", "de-de"];
                                var nlArray = ["nl-be", "nl-nl"];
                                var esArray = ["es-ar", "es-cl", "es-co", "es-mx"];

                                // Available and date groups
                                var esAvailArray = ["es-ar", "fr-be", "es-cl", "es-co", "es-es", "fr-fr", "es-mx", "fr-ch"];
                                var engDMAvailArray = ["en-ie", "he-il", "en-nz", "ar-sa", "en-za", "ar-ae", "en-gb"];
                                var singAvailArray = ["en-hk", "en-in", "en-sg"];

                                if (esAvailArray.indexOf(urlRegion) > -1) {
                                    availConvert("Disponible ", "daymonth");
                                } else if (engDMAvailArray.indexOf(urlRegion) > -1) {
                                    availConvert("Available ", "daymonth");
                                } else if (urlRegion === "en-us" || urlRegion === "en-ca") {
                                    availConvert("Available ", "monthday");
                                } else if (singAvailArray.indexOf(urlRegion) > -1) {
                                    availConvert("Available ", "daymonth");
                                } else if (urlRegion === "zh-cn") {
                                    availConvert("发布日期", "daymonth");
                                } else if (urlRegion === "fr-ca") {
                                    availConvert("Disponible ", "monthday");
                                } else if (urlRegion === "tr-tr") {
                                    availConvert("Satışta ", "daymonth");
                                } else if (urlRegion === "zh-tw") {
                                    availConvert("金會員免費遊戲 ", "monthday");
                                }

                                if (deArray.indexOf(urlRegion) > -1) {
                                    availConvert("Erhältlich ", "daymonth");
                                } else if (nlArray.indexOf(urlRegion) > -1) {
                                    availConvert("Beschikbaar ", "daymonth");
                                } else if (urlRegion === "ko-kr") {
                                    availConvert("멤버에게 무료 증정", "monthday");
                                } else if (urlRegion === "cs-cz") {
                                    availConvert("Dostupné ", "daymonth");
                                } else if (urlRegion === "da-dk") {
                                    availConvert("Tilgængelig ", "daymonth");
                                } else if (urlRegion === "el-gr") {
                                    availConvert("Διαθέσιμα ", "daymonth");
                                } else if (urlRegion === "fi-fi") {
                                    availConvert("Saatavilla ", "daymonth");
                                } else if (urlRegion === "hu-hu") {
                                    availConvert("Elérhető ", "daymonth");
                                } else if (urlRegion === "it-it") {
                                    availConvert("Disponibile ", "daymonth");
                                } else if (urlRegion === "nb-no") {
                                    availConvert("Tilgængelig ", "daymonth");
                                } else if (urlRegion === "pl-pl") {
                                    availConvert("Dostępne ", "daymonth");
                                } else if (urlRegion === "pt-pt") {
                                    availConvert("Disponível ", "daymonth");
                                } else if (urlRegion === "ru-ru") {
                                    availConvert("В продаже ", "daymonth");
                                } else if (urlRegion === "sk-sk") {
                                    availConvert("K dispozícii ", "daymonth");
                                } else if (urlRegion === "sv-se") {
                                    availConvert("Tillgängligt ", "daymonth");
                                } else if (urlRegion === "ja-jp") {
                                    availConvert("発売日: ", "ja");
                                } else if (urlRegion === "pt-br") {
                                    availConvert("Disponível ", "daymonth");
                                }

                                function availConvert(word, monthday) {
                                    if (monthday === "daymonth") {
                                        var slashdate = rdDay + "/" + rdMonth + "/" + rdYear;
                                    } else if (monthday === "monthday") {
                                        var slashdate = rdMonth + "/" + rdDay + "/" + rdYear;
                                    } else { // for ja-jp
                                        var slashdate = releasedateraw.toLocaleDateString(monthday);
                                    }
                                    var nowDate = new Date();
                                    if (releasedateraw < nowDate) {
                                        hideDate();
                                    }
                                    $(".availableDate").text(word + slashdate);
                                }
                            } else {
                                hideDate();
                            }


                        }
                    }
                } else {
                    outOfStock();
                    return false;
                }

                var cartURL = "https://www.microsoft.com/" + urlRegion + "/store/buy?pid=" + prodIdBig + "&sid=" + sid;
                var interstitial = interstitialText.locales[urlRegion].KeyInterstitial;
                if (interstitial !== "") {
                    cartURL = cartURL + "&aid=" + availId + "&crosssellid=" + interstitial;
                }
                if (sheetProductInfo.switchPurchase === "TRUE") {
                    cartURL = "https://www.microsoft.com/" + urlRegion + "/p" + "/xbox-one-offer/" + prodIdBig + "/" + sid;
                }
                if (specIdBig !== "" && specIdBig !== undefined) {
                    cartURL = "https://www.microsoft.com/" + urlRegion + "/store/build/" + "xbox-one-s-bundle" + "/" + specIdBig;
                }
                if (specIdBig !== "" && specIdBig !== undefined && sheetProductInfo.switchPurchase === "TRUE") {
                    cartURL = "https://www.microsoft.com/" + urlRegion + "/p" + "/xbox-one-offer/" + specIdBig;
                }
                if (customATC !== "") {
                    cartURL = customATC;
                }
                // $(".purchButton a").attr("href", cartURL);

                var stockUrl = "https://inv.mp.microsoft.com/v2.0/inventory/" + countryCode + "/" + prodIdBig + "/" + sid + "/" + availId;
                if (specIdBig !== "") {
                    stockUrl = "https://inv.mp.microsoft.com/v2.0/inventory/" + countryCode + "/" + specIdBig + "/" + sid + "/" + availId;
                }
                $.get(stockUrl)
                    .done(function(stockData) {
                        var shipTimes = Object.keys(stockData.futureLots);
                        var futureInstock = "";
                        if (shipTimes.length > 0) {
                            $.each(shipTimes, function() { // Cycles through all future lots to see if in stock.
                                futureInstock = stockData.futureLots[this]["9000000013"].inStock;
                                if (futureInstock.toLowerCase() === "true") {
                                    false; // This breaks out of the foreach loop
                                }
                            });
                        }
                        var instock = stockData.availableLots["0001-01-01T00:00:00.0000000Z"]["9000000013"].inStock;
                        console.log("instock= " + instock);
                        console.log("future instock= " + futureInstock.toString());
                        console.log("pre-order sold out, removing Store button");
                        if (futureInstock.toString().toLowerCase() === "false") {
                            $(".purchButton").remove();
                            $(".hatchProd").removeClass("f-lightweight").addClass("f-heavyweight").css("color", "#054b16");
                        }
                        //console.log("ispreorder= " + ispreorder)

                        //MAY NEED TO UPDATE THIS CODE THE NEXT TIME THERE IS  A PRE-ORDER CONSOLE BUNDLE
                        if ((instock.toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() !== "true" */ ) && (futureInstock.toString().toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() === "true"*/ )) {
                            console.log("OOS")
                            outOfStock();
                        }
                    })
                    .fail(function() {
                        outOfStock();
                    })
                $(".addToCartBtn").css("visibility", "visible").removeClass("hiddenImp");

            }

            function outOfStock() {

                if (customATC === "") {
                    $(".addToCartBtn").addClass("hiddenImp");
                    $(".purchButton").remove();
                    $(".hatchProd").removeClass("f-lightweight").addClass("f-heavyweight").css("color", "#054b16");
                    $(".ps-widget").removeClass("ps-theme-1");
                    // All Digital Edition
                    $(".triggerMain").addClass("hiddenImp");
                }

                if (sheetProductInfo.soldOut === "t") {
                    $(".hero-pricing .c-caption").hide();
                    $(".hatchProd").hide();
                    $(".gotoRetailer").hide();
                    $(".purchRow2").append('<h3 class="c-heading-3">' + regionSoldout["keySoldout"] + '</h3>');
                }
            }

            function hideDate() {
                $(".availableDate").remove();
            }

            function buttonPreorder() {
                var text = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
                $(".addToCartBtn").text(text);
            }

            // clone to bottom purchase section
            // $(".purchRow1").clone().appendTo(".duplicateBuy");
            // $(".purchRow2").clone().appendTo(".duplicateBuy");
            $(".purchButton").show();
            $(".purchButtonPB").show();

        }

        function addLegal() {
            console.log("adding first legal");
            if (sheetProductInfo.legal1.indexOf('*') !== -1) {
                if (sheetProductInfo.switchAA === "TRUE") {
                    $(".legalStart").before('<p class="c-caption-1" id="price-legal"><i>' + sheetProductInfo.legal1 + '</i></p>');
                } else {
                    $(".legal div div").first().prepend('<p class="c-caption-1" id="price-legal"><i>' + sheetProductInfo.legal1 + '</i></p>');
                }
            } else {
                $(".legal div div").after().append('<p class="c-caption-1" id="bcgg"><i>' + sheetProductInfo.legal1 + '</i></p>');
            }

            // if (sheetDataLoc[i].legal2 !== "") {
            //     console.log("adding second legal");
            //     $(".legal div div").first().append('<p class="c-caption-1"><i>' + sheetDataLoc[i].legal2 + '</i></p>');
            // }
            // if (sheetDataLoc[i].legal3 !== "") {
            //     console.log("adding third legal");
            //     $(".legal div div").first().append('<p class="c-caption-1"><i>' + sheetDataLoc[i].legal3 + '</i></p>');
            // }
        }




        var preordertext = {
            "locales": {
                "en-us": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "ar-ae": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "ar-sa": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "cs-cz": {
                    "keyPreorder": "Předobjednat",
                    "keyBuynow": "KOUPIT"
                },
                "da-dk": {
                    "keyPreorder": "Forudbestil",
                    "keyBuynow": "KØB NU"
                },
                "de-at": {
                    "keyPreorder": "Vorbestellen",
                    "keyBuynow": "JETZT KAUFEN"
                },
                "de-ch": {
                    "keyPreorder": "Vorbestellen",
                    "keyBuynow": "JETZT KAUFEN"
                },
                "de-de": {
                    "keyPreorder": "Vorbestellen",
                    "keyBuynow": "JETZT KAUFEN"
                },
                "el-gr": {
                    "keyPreorder": "Προπαραγγελία",
                    "keyBuynow": "ΑΓΟΡΑ ΤΩΡΑ"
                },
                "en-au": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-ca": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-gb": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-hk": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-ie": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-in": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-nz": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-sg": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "en-za": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "es-ar": {
                    "keyPreorder": "Reservar",
                    "keyBuynow": "COMPRAR AHORA"
                },
                "es-cl": {
                    "keyPreorder": "Reservar",
                    "keyBuynow": "COMPRAR AHORA"
                },
                "es-co": {
                    "keyPreorder": "Reservar",
                    "keyBuynow": "COMPRAR AHORA"
                },
                "es-es": {
                    "keyPreorder": "Reservar",
                    "keyBuynow": "COMPRAR AHORA"
                },
                "es-mx": {
                    "keyPreorder": "Reservar",
                    "keyBuynow": "COMPRAR AHORA"
                },
                "fi-fi": {
                    "keyPreorder": "Tilaa ennakkoon",
                    "keyBuynow": "OSTA HETI"
                },
                "fr-be": {
                    "keyPreorder": "Précommander",
                    "keyBuynow": "ACHETER MAINTENANT"
                },
                "fr-ca": {
                    "keyPreorder": "Précommander",
                    "keyBuynow": "MAGASINER TOUT"
                },
                "fr-fr": {
                    "keyPreorder": "Précommander",
                    "keyBuynow": "ACHETER MAINTENANT"
                },
                "fr-ch": {
                    "keyPreorder": "Précommander",
                    "keyBuynow": "ACHETER MAINTENANT"
                },
                "he-il": {
                    "keyPreorder": "Pre-order",
                    "keyBuynow": "BUY NOW"
                },
                "hu-hu": {
                    "keyPreorder": "Előrendelés",
                    "keyBuynow": "VÁSÁRLÁS MOST"
                },
                "it-it": {
                    "keyPreorder": "Preordina",
                    "keyBuynow": "ACQUISTA ORA"
                },
                "ja-jp": {
                    "keyPreorder": "予約",
                    "keyBuynow": "今すぐ購入"
                },
                "ko-kr": {
                    "keyPreorder": "미리 주문하기",
                    "keyBuynow": "지금 구매"
                },
                "nb-no": {
                    "keyPreorder": "Forhåndsbestill",
                    "keyBuynow": "KJØP NÅ"
                },
                "nl-be": {
                    "keyPreorder": "Reserveer",
                    "keyBuynow": "KOOP NU"
                },
                "nl-nl": {
                    "keyPreorder": "Reserveer",
                    "keyBuynow": "KOOP NU"
                },
                "pl-pl": {
                    "keyPreorder": "przedsprzedaż",
                    "keyBuynow": "KUP TERAZ"
                },
                "pt-br": {
                    "keyPreorder": "Pré-venda",
                    "keyBuynow": "COMPRE AGORA"
                },
                "pt-pt": {
                    "keyPreorder": "Pré-encomendar",
                    "keyBuynow": "COMPRAR AGORA"
                },
                "ru-ru": {
                    "keyPreorder": "Предзаказ",
                    "keyBuynow": "КУПИТЬ"
                },
                "sk-sk": {
                    "keyPreorder": "Rezervovať",
                    "keyBuynow": "KÚPIŤ"
                },
                "sv-se": {
                    "keyPreorder": "Förbeställ",
                    "keyBuynow": "KÖP NU"
                },
                "tr-tr": {
                    "keyPreorder": "Ön sipariş verin",
                    "keyBuynow": "ŞİMDİ ALIN"
                },
                "zh-cn": {
                    "keyPreorder": "预订",
                    "keyBuynow": "立即購買"
                },
                "zh-hk": {
                    "keyPreorder": "預先訂購",
                    "keyBuynow": "立即購買"
                },
                "zh-tw": {
                    "keyPreorder": "預購",
                    "keyBuynow": "立即購買"
                }
            }
        }

        var interstitialText = {
            "locales": {
                "en-us": {
                    "KeyInterstitial": "XboxOneInterstitial"
                },
                "ar-ae": {
                    "KeyInterstitial": ""
                },
                "ar-sa": {
                    "KeyInterstitial": ""
                },
                "cs-cz": {
                    "KeyInterstitial": "X1SGenericInterstitial"
                },
                "da-dk": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "de-at": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "de-ch": {
                    "KeyInterstitial": "x1sgenericinterstitial"
                },
                "de-de": {
                    "KeyInterstitial": "X1XInterstitial"
                },
                "el-gr": {
                    "KeyInterstitial": ""
                },
                "en-au": {
                    "KeyInterstitial": "Xboxoneconsoles500gbinterstitial"
                },
                "en-ca": {
                    "KeyInterstitial": "xboxoneconsolenonrefurbinterstitial "
                },
                "en-gb": {
                    "KeyInterstitial": "X1GenericInterstitial"
                },
                "en-hk": {
                    "KeyInterstitial": ""
                },
                "en-ie": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "en-in": {
                    "KeyInterstitial": ""
                },
                "en-nz": {
                    "KeyInterstitial": "Xboxoneconsoles500gbinterstitial"
                },
                "en-sg": {
                    "KeyInterstitial": "XboxInterstitial"
                },
                "en-za": {
                    "KeyInterstitial": ""
                },
                "es-ar": {
                    "KeyInterstitial": ""
                },
                "es-cl": {
                    "KeyInterstitial": ""
                },
                "es-co": {
                    "KeyInterstitial": ""
                },
                "es-es": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "es-mx": {
                    "KeyInterstitial": ""
                },
                "fi-fi": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "fr-be": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "fr-ca": {
                    "KeyInterstitial": "xboxoneconsolenonrefurbinterstitial "
                },
                "fr-fr": {
                    "KeyInterstitial": "X1SGenericInterstitial"
                },
                "fr-ch": {
                    "KeyInterstitial": "x1sgenericinterstitial"
                },
                "he-il": {
                    "KeyInterstitial": ""
                },
                "hu-hu": {
                    "KeyInterstitial": ""
                },
                "it-it": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "ja-jp": {
                    "KeyInterstitial": ""
                },
                "ko-kr": {
                    "KeyInterstitial": ""
                },
                "nb-no": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "nl-be": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "nl-nl": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "pl-pl": {
                    "KeyInterstitial": "X1SGenericInterstitial"
                },
                "pt-br": {
                    "KeyInterstitial": ""
                },
                "pt-pt": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "ru-ru": {
                    "KeyInterstitial": ""
                },
                "sk-sk": {
                    "KeyInterstitial": ""
                },
                "sv-se": {
                    "KeyInterstitial": "XboxOneSInterstitial"
                },
                "tr-tr": {
                    "KeyInterstitial": ""
                },
                "zh-cn": {
                    "KeyInterstitial": ""
                },
                "zh-hk": {
                    "KeyInterstitial": ""
                },
                "zh-tw": {
                    "KeyInterstitial": ""
                }
            }
        }

        var preOrderCopy = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
        var buyNowCopy = preordertext.locales[urlRegion].keyBuynow.toUpperCase();

        buttonSwitch(preOrderCopy, buyNowCopy);

    })();


    // pre-order/buy now for x and s

    function buttonSwitch(preCopy, buyCopy) {

        $(".buy-group a.purchButton").attr("target", "blank");

        var preorderLocales = "";
        if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
            preorderLocales = "";
        }

        var buyNowLocales = "en-au, en-nz, en-hk, en-sg, zh-hk, zh-tw, ko-kr, ja-jp, ar-ae, ar-sa, cs-cz, da-dk, de-at, de-ch, de-de, el-gr, en-gb, en-ie, en-in, en-za, es-es, fi-fi, fr-be, fr-ch, fr-fr, he-il, hu-hu, it-it, nb-no, nl-be, nl-nl, pl-pl, pt-pt, ru-ru, sk-sk, sv-se, tr-tr, en-us, en-ca, fr-ca, es-co, pt-br, es-ar, es-mx, es-cl";

        if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
            buyNowLocales = "en-au, en-nz, en-hk, en-sg, zh-hk, zh-tw, ko-kr, ja-jp, ar-ae, ar-sa, cs-cz, da-dk, de-at, de-ch, de-de, el-gr, en-gb, en-ie, en-in, en-za, es-es, fi-fi, fr-be, fr-ch, fr-fr, he-il, hu-hu, it-it, nb-no, nl-be, nl-nl, pl-pl, pt-pt, ru-ru, sk-sk, sv-se, tr-tr, en-us, en-ca, fr-ca, es-co, pt-br, es-ar, es-mx, es-cl";
        }

        if ((preorderLocales.indexOf(urlRegion) === -1) && (buyNowLocales.indexOf(urlRegion) === -1)) {
            var lm = lmCopy.locales[urlRegion].keyLearnmore;
            var consText = $(".c-in-page-navigation .c-heading-6").first().text();
            $(".CTAdiv button span").text(lm);
            $(".CTAdiv button span").attr("aria-label", lm + ", " + consText)
            $(".CTAdiv button span").css("visibility", "visible");
            $(".page-hero .fade-in .heroPrice").remove();
            $(".page-hero .fade-in [href='#purchase']").remove();
            $(".buy-group").remove();
        } else if (preorderLocales.indexOf(urlRegion) !== -1) {
            $(".buy-group").removeClass("hidden");
            $(".CTAdiv button span").css("visibility", "visible");
            $(".page-hero .fade-in .heroPrice").css("visibility", "visible");
            $(".page-hero .fade-in [href='#purchase']").css("visibility", "visible");
            $(".buy-group").css("visibility", "visible");
            $(".CTAdiv button span").text(preCopy);
            $(".heroCTA span").text(preCopy);
            $(".buy-group .purchButton span").text(preCopy);
        } else if (buyNowLocales.indexOf(urlRegion) !== -1) {
            $(".buy-group").removeClass("hidden");
            $(".CTAdiv button span").css("visibility", "visible");
            $(".page-hero .fade-in .heroPrice").css("visibility", "visible");
            $(".page-hero .fade-in [href='#purchase']").css("visibility", "visible");
            $(".buy-group").css("visibility", "visible");
            // $(".heroCTA span").text(buyCopy);
            // $(".CTAdiv button span").text(buyCopy);
            $(".buy-group .purchButton span").text(buyCopy);


            // Learn More switch (Sold out)
            var lm = lmCopy.locales[urlRegion].keyLearnmore;
            var checkAvail = lmCopy.locales[urlRegion].keyCheckAvail;

            $(".page-hero .fade-in .heroPrice").remove();
            $(".page-hero .fade-in [href='#purchase']").remove();

            // Check Avail Copy
            $(".CTAdiv button span").text(checkAvail);
            // $(".CTAdiv button span").text(lm);

        }

        var hatchlocs = ["de-de", "en-au", "en-ie", "en-nz", "en-us", "en-ca", "en-gb", "es-co", "es-es", "es-mx", "fr-ca", "fr-fr", "it-it", "nl-nl", "sv-se", "pt-br", "pl-pl"];
        if (hatchlocs.indexOf(urlRegion) === -1) {
            $(".hatchProd").attr("href", "https://www.xbox.com/where-to-buy").removeClass("hatchProd");
        }

        if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
            $(".buy-group a.c-call-to-action.f-lightweight").css("color", "#9bf00b");
        }

        var hidePricelocs = ["tr-tr", "el-gr"];
        if (hidePricelocs.indexOf(urlRegion) !== -1) {
            $(".page-hero .fade-in .heroPrice").remove();
            $(".monthlyPrice.price-msrp").remove();
            $(".CTAdiv .price-callout").remove();
        }

        // Just Series X
        if ((urlRegion.indexOf("es-ar") !== -1) && (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1)) {
            $(".CTAdiv .price-callout").remove();
            $(".monthlyPrice.price-msrp").remove();
        }

        // Just Series S
        if ((urlRegion.indexOf("es-ar") !== -1) && (document.URL.toLowerCase().indexOf("xbox-series-s") !== -1)) {
            $(".CTAdiv .price-callout").remove();
            $(".monthlyPrice.price-msrp").remove();
        }

        var xaaLocales = [];
        if (xaaLocales.indexOf(urlRegion) !== -1) {
            $(".buy-group .hatchProd").removeClass("f-lightweight").addClass("f-heavyweight").css("color", "#054b16");
            $(".buy-group .xaaButton").removeClass("f-lightweight").addClass("f-heavyweight").css("color", "#054b16");
        }

    }

});


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

globalSoldout = {
    "locales": {
        "en-us": {
            "keySoldout": "Sold Out"
        },
        "ar-ae": {
            "keySoldout": "Sold Out"
        },
        "ar-sa": {
            "keySoldout": "Sold Out"
        },
        "cs-cz": {
            "keySoldout": " Vyprodáno"
        },
        "da-dk": {
            "keySoldout": "Udsolgt"
        },
        "de-at": {
            "keySoldout": " Ausverkauft"
        },
        "de-ch": {
            "keySoldout": " Ausverkauft"
        },
        "de-de": {
            "keySoldout": " Ausverkauft"
        },
        "el-gr": {
            "keySoldout": " Έχει εξαντληθεί"
        },
        "en-au": {
            "keySoldout": "Sold Out"
        },
        "en-ca": {
            "keySoldout": "Sold Out"
        },
        "en-gb": {
            "keySoldout": "Sold Out"
        },
        "en-hk": {
            "keySoldout": "Sold Out"
        },
        "en-ie": {
            "keySoldout": "Sold Out"
        },
        "en-in": {
            "keySoldout": "Sold Out"
        },
        "en-nz": {
            "keySoldout": "Sold Out"
        },
        "en-sg": {
            "keySoldout": "Sold Out"
        },
        "en-za": {
            "keySoldout": "Sold Out"
        },
        "es-ar": {
            "keySoldout": "Agotado"
        },
        "es-cl": {
            "keySoldout": "Agotado"
        },
        "es-co": {
            "keySoldout": "Agotado"
        },
        "es-es": {
            "keySoldout": " Agotado"
        },
        "es-mx": {
            "keySoldout": "Agotado"
        },
        "fi-fi": {
            "keySoldout": " Loppuunmyyty"
        },
        "fr-be": {
            "keySoldout": " Épuisé"
        },
        "fr-ca": {
            "keySoldout": " En rupture de stock"
        },
        "fr-ch": {
            "keySoldout": " Épuisé"
        },
        "fr-fr": {
            "keySoldout": " Épuisé"
        },
        "he-il": {
            "keySoldout": "Sold Out"
        },
        "hu-hu": {
            "keySoldout": "Elfogyott"
        },
        "it-it": {
            "keySoldout": " Esaurito"
        },
        "ja-jp": {
            "keySoldout": " 完売"
        },
        "ko-kr": {
            "keySoldout": " 품절"
        },
        "nb-no": {
            "keySoldout": "Utsolgt "
        },
        "nl-be": {
            "keySoldout": "Uitverkocht"
        },
        "nl-nl": {
            "keySoldout": "Uitverkocht"
        },
        "pl-pl": {
            "keySoldout": " Wyprzedane"
        },
        "pt-br": {
            "keySoldout": " Esgotado"
        },
        "pt-pt": {
            "keySoldout": " Esgotado"
        },
        "ru-ru": {
            "keySoldout": " Распродано"
        },
        "sk-sk": {
            "keySoldout": " Vypredané"
        },
        "sv-se": {
            "keySoldout": " Utsåld"
        },
        "tr-tr": {
            "keySoldout": " Tükendi"
        },
        "zh-hk": {
            "keySoldout": "售罄"
        },
        "zh-tw": {
            "keySoldout": "售罄"
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

lmCopy = {
    "locales": {
        "en-us": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "ar-ae": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "ar-sa": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "cs-cz": {
            "keyLearnmore": "DALŠÍ INFORMACE",
            "keyCheckAvail": "ZKONTROLOVAT DOSTUPNOST"
        },
        "da-dk": {
            "keyLearnmore": "FÅ MERE AT VIDE",
            "keyCheckAvail": "SE TILGÆNGELIGHED"
        },
        "de-at": {
            "keyLearnmore": "MEHR ERFAHREN",
            "keyCheckAvail": "VERFÜGBARKEIT PRÜFEN"
        },
        "de-ch": {
            "keyLearnmore": "MEHR ERFAHREN",
            "keyCheckAvail": "VERFÜGBARKEIT PRÜFEN"
        },
        "de-de": {
            "keyLearnmore": "MEHR ERFAHREN",
            "keyCheckAvail": "VERFÜGBARKEIT PRÜFEN"
        },
        "el-gr": {
            "keyLearnmore": "ΜΑΘΕΤΕ ΠΕΡΙΣΣΟΤΕΡΑ",
            "keyCheckAvail": "ΕΛΕΓΧΟΣ ΔΙΑΘΕΣΙΜΟΤΗΤΑΣ"
        },
        "en-au": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-ca": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-gb": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-hk": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-ie": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-in": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-nz": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-sg": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "en-za": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "es-ar": {
            "keyLearnmore": "MÁS INFORMACIÓN",
            "keyCheckAvail": "COMPROBAR DISPONIBILIDAD"
        },
        "es-cl": {
            "keyLearnmore": "MÁS INFORMACIÓN",
            "keyCheckAvail": "COMPROBAR DISPONIBILIDAD"
        },
        "es-co": {
            "keyLearnmore": "MÁS INFORMACIÓN",
            "keyCheckAvail": "COMPROBAR DISPONIBILIDAD"
        },
        "es-es": {
            "keyLearnmore": "DESCUBRE MÁS",
            "keyCheckAvail": "COMPROBAR LA DISPONIBILIDAD"
        },
        "es-mx": {
            "keyLearnmore": "MÁS INFORMACIÓN",
            "keyCheckAvail": "COMPROBAR DISPONIBILIDAD"
        },
        "fi-fi": {
            "keyLearnmore": "LUE LISÄÄ",
            "keyCheckAvail": "TARKISTA SAATAVUUS"
        },
        "fr-be": {
            "keyLearnmore": "EN SAVOIR PLUS",
            "keyCheckAvail": "VOIR LES DISPONIBILITÉS"
        },
        "fr-ca": {
            "keyLearnmore": "EN SAVOIR PLUS",
            "keyCheckAvail": "VÉRIFIER LA DISPONIBILITÉ"
        },
        "fr-ch": {
            "keyLearnmore": "EN SAVOIR PLUS",
            "keyCheckAvail": "VOIR LES DISPONIBILITÉS"
        },
        "fr-fr": {
            "keyLearnmore": "EN SAVOIR PLUS",
            "keyCheckAvail": "VOIR LES DISPONIBILITÉS"
        },
        "he-il": {
            "keyLearnmore": "LEARN MORE",
            "keyCheckAvail": "CHECK AVAILABILITY"
        },
        "hu-hu": {
            "keyLearnmore": "TOVÁBBI INFORMÁCIÓ",
            "keyCheckAvail": "AZ ELÉRHETŐSÉG ELLENŐRZÉSE"
        },
        "it-it": {
            "keyLearnmore": "SCOPRI DI PIÙ",
            "keyCheckAvail": "VERIFICA LA DISPONIBILITÀ"
        },
        "ja-jp": {
            "keyLearnmore": "詳細について",
            "keyCheckAvail": "利用可能か確認する"
        },
        "ko-kr": {
            "keyLearnmore": "자세한 정보",
            "keyCheckAvail": "플레이 가능성 확인"
        },
        "nb-no": {
            "keyLearnmore": "FINN UT MER",
            "keyCheckAvail": "SJEKK TILGJENGELIGHET"
        },
        "nl-be": {
            "keyLearnmore": "MEER INFO",
            "keyCheckAvail": "BESCHIKBAARHEID CONTROLEREN"
        },
        "nl-nl": {
            "keyLearnmore": "MEER INFO",
            "keyCheckAvail": "BESCHIKBAARHEID CONTROLEREN"
        },
        "pl-pl": {
            "keyLearnmore": "DOWIEDZ SIĘ WIĘCEJ",
            "keyCheckAvail": "SPRAWDŹ DOSTĘPNOŚĆ"
        },
        "pt-br": {
            "keyLearnmore": "SAIBA MAIS",
            "keyCheckAvail": "VERIFICAR DISPONIBILIDADE"
        },
        "pt-pt": {
            "keyLearnmore": "SABER MAIS",
            "keyCheckAvail": "VERIFICAR DISPONIBILIDADE"
        },
        "ru-ru": {
            "keyLearnmore": "ПОДРОБНОСТИ",
            "keyCheckAvail": "ПРОВЕРКА ДОСТУПНОСТИ"
        },
        "sk-sk": {
            "keyLearnmore": "ZISTIŤ VIAC",
            "keyCheckAvail": "OVERIŤ DOSTUPNOSŤ"
        },
        "sv-se": {
            "keyLearnmore": "LÄS MER",
            "keyCheckAvail": "KOLLA TILLGÄNGLIGHETEN"
        },
        "tr-tr": {
            "keyLearnmore": "DAHA FAZLA BILGI EDININ",
            "keyCheckAvail": "ERİŞİLEBİLİRLİĞİ KONTROL EDİN"
        },
        "zh-hk": {
            "keyLearnmore": "詳細介紹",
            "keyCheckAvail": "检查可用性"
        },
        "zh-tw": {
            "keyLearnmore": "詳細介紹",
            "keyCheckAvail": "查看供應情形"
        }
    }
}

tempOos = {
    "locales": {
        "en-us": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "ar-ae": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "ar-sa": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "cs-cz": {
            "keyTemporarilyoutofstock": "Dočasně není skladem."
        },
        "da-dk": {
            "keyTemporarilyoutofstock": "Midlertidigt udsolgt."
        },
        "de-at": {
            "keyTemporarilyoutofstock": "Vorübergehend nicht auf Lager."
        },
        "de-ch": {
            "keyTemporarilyoutofstock": "Vorübergehend nicht auf Lager."
        },
        "de-de": {
            "keyTemporarilyoutofstock": "Vorübergehend nicht auf Lager."
        },
        "el-gr": {
            "keyTemporarilyoutofstock": "Προσωρινά χωρίς απόθεμα."
        },
        "en-au": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-ca": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-gb": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-hk": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-ie": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-in": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-nz": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-sg": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-za": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "es-ar": {
            "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "es-cl": {
            "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "es-co": {
            "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "es-es": {
            "keyTemporarilyoutofstock": "Temporalmente agotado."
        },
        "es-mx": {
            "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "fi-fi": {
            "keyTemporarilyoutofstock": "Tilapäisesti loppu."
        },
        "fr-be": {
            "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "fr-ca": {
            "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "fr-ch": {
            "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "fr-fr": {
            "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "he-il": {
            "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "hu-hu": {
            "keyTemporarilyoutofstock": "Jelenleg nincs raktáron."
        },
        "it-it": {
            "keyTemporarilyoutofstock": "Temporaneamente esaurito."
        },
        "ja-jp": {
            "keyTemporarilyoutofstock": "ただいま在庫はありません。"
        },
        "ko-kr": {
            "keyTemporarilyoutofstock": "일시적으로 재고가 없습니다."
        },
        "nb-no": {
            "keyTemporarilyoutofstock": "Midlertidig utsolgt."
        },
        "nl-be": {
            "keyTemporarilyoutofstock": "Tijdelijk niet op voorraad."
        },
        "nl-nl": {
            "keyTemporarilyoutofstock": "Tijdelijk niet op voorraad."
        },
        "pl-pl": {
            "keyTemporarilyoutofstock": "Tymczasowo niedostępny."
        },
        "pt-br": {
            "keyTemporarilyoutofstock": "Temporariamente fora de estoque."
        },
        "pt-pt": {
            "keyTemporarilyoutofstock": "Temporariamente esgotado."
        },
        "ru-ru": {
            "keyTemporarilyoutofstock": "Временно нет в наличии."
        },
        "sk-sk": {
            "keyTemporarilyoutofstock": "Dočasne nie je na sklade."
        },
        "sv-se": {
            "keyTemporarilyoutofstock": "Tillfälligt slut."
        },
        "tr-tr": {
            "keyTemporarilyoutofstock": "Geçici olarak stokta yok."
        },
        "zh-hk": {
            "keyTemporarilyoutofstock": "暫時缺貨。"
        },
        "zh-tw": {
            "keyTemporarilyoutofstock": "暫時缺貨。"
        }
    }
}