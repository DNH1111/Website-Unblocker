$(document).ready(function () {
    function hashChanged() {
      console.log("hash has changed")
      location.reload();
    }
    window.addEventListener('hashchange', hashChanged, false);
    
      accHeadlines = {
          "locales": {
              "en-us": {
                  "keyAccessories": "Accessories",
                  "keyLastChance": "LAST CHANCE"
              },
              "ar-ae": {
                  "keyAccessories": "Accessories",
              },
              "ar-sa": {
                  "keyAccessories": "Accessories"
              },
              "cs-cz": {
                  "keyAccessories": "Příslušenství"
              },
              "da-dk": {
                  "keyAccessories": "Tilbehør",
                  "keyLastChance": "SIDSTE CHANCE"
              },
              "de-at": {
                  "keyAccessories": "Zubehör",
                  "keyLastChance": "LETZTE CHANCE"
              },
              "de-ch": {
                  "keyAccessories": "Zubehör"
              },
              "de-de": {
                  "keyAccessories": "Zubehör",
                  "keyLastChance": "LETZTE CHANCE"
              },
              "el-gr": {
                  "keyAccessories": "Αξεσουάρ"
              },
              "en-au": {
                  "keyAccessories": "Accessories"
              },
              "en-ca": {
                  "keyAccessories": "Accessories",
                  "keyLastChance": "LAST CHANCE"
              },
              "en-gb": {
                  "keyAccessories": "Accessories",
                  "keyLastChance": "LAST CHANCE"
              },
              "en-hk": {
                  "keyAccessories": "Accessories"
              },
              "en-ie": {
                  "keyAccessories": "Accessories",
                  "keyLastChance": "LAST CHANCE"
              },
              "en-in": {
                  "keyAccessories": "Accessories"
              },
              "en-nz": {
                  "keyAccessories": "Accessories"
              },
              "en-sg": {
                  "keyAccessories": "Accessories"
              },
              "en-za": {
                  "keyAccessories": "Accessories"
              },
              "es-ar": {
                  "keyAccessories": "Accesorios"
              },
              "es-cl": {
                  "keyAccessories": "Accesorios"
              },
              "es-co": {
                  "keyAccessories": "Accesorios"
              },
              "es-es": {
                  "keyAccessories": "Accesorios",
                  "keyLastChance": "ÚLTIMA OPORTUNIDAD"
              },
              "es-mx": {
                  "keyAccessories": "Accesorios"
              },
              "fi-fi": {
                  "keyAccessories": "Lisälaitteet",
                  "keyLastChance": "VIIMEINEN MAHDOLLISUUS"
              },
              "fr-be": {
                  "keyAccessories": "Accessoires",
                  "keyLastChance": "DERNIÈRE CHANCE"
              },
              "fr-ca": {
                  "keyAccessories": "Accessoires",
                  "keyLastChance": "DERNIÈRE CHANCE"
              },
              "fr-ch": {
                  "keyAccessories": "Accessoires"
              },
              "fr-fr": {
                  "keyAccessories": "Accessoires",
                  "keyLastChance": "DERNIÈRE CHANCE"
              },
              "he-il": {
                  "keyAccessories": "Accessories"
              },
              "hu-hu": {
                  "keyAccessories": "Tartozék "
              },
              "it-it": {
                  "keyAccessories": "Accessori",
                  "keyLastChance": "ULTIMA POSSIBILITÀ"
              },
              "ja-jp": {
                  "keyAccessories": "アクセサリー"
              },
              "ko-kr": {
                  "keyAccessories": "액세서리"
              },
              "nb-no": {
                  "keyAccessories": "Tilbehør"
              },
              "nl-be": {
                  "keyAccessories": "Accessoires",
                  "keyLastChance": "LAATSTE KANS"
              },
              "nl-nl": {
                  "keyAccessories": "Accessoires",
                  "keyLastChance": "LAATSTE KANS"
              },
              "pl-pl": {
                  "keyAccessories": "Akcesoria",
                  "keyLastChance": "OSTATNIA SZANSA"
              },
              "pt-br": {
                  "keyAccessories": "Acessórios"
              },
              "pt-pt": {
                  "keyAccessories": "Acessórios",
                  "keyLastChance": "ÚLTIMA OPORTUNIDADE"
              },
              "ru-ru": {
                  "keyAccessories": "Аксессуары"
              },
              "sk-sk": {
                  "keyAccessories": "Príslušenstvo"
              },
              "sv-se": {
                  "keyAccessories": "Tillbehör",
                  "keyLastChance": "SISTA CHANSEN"
              },
              "tr-tr": {
                  "keyAccessories": "Aksesuarlar"
              },
              "zh-cn": {
                  "keyAccessories": "配件"
              },
              "zh-hk": {
                  "keyAccessories": "配件"
              },
              "zh-tw": {
                  "keyAccessories": "配件"
              }
          }
      }
      priceFormat = {
          "locales": {
              "en-us": {
                  "keyPriceFormat": "$#",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": ","
              },
              "ar-ae": {
                  "keyPriceFormat": "AED #",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": ","
              },
              "ar-sa": {
                  "keyPriceFormat": "SR.#",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": "," //no decimal
              },
              "cs-cz": {
                  "keyPriceFormat": "# Kč",
                  "keyHasDecimal": true,
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
                  "keyThousandCharacter": "."
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
                  "keyHasDecimal": false,
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
                  "keyPriceFormat": "SG$#*",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": "," // no decimal
              },
              "en-za": {
                  "keyPriceFormat": "",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": ","
              },
              "es-ar": {
                  "keyPriceFormat": "",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": ","
              },
              "es-cl": {
                  "keyPriceFormat": "",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": ","
              },
              "es-co": {
                  "keyPriceFormat": "",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": ","
              },
              "es-es": {
                  "keyPriceFormat": "# €",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": "." //period comma reversed
              },
              "es-mx": {
                  "keyPriceFormat": "$#",
                  "keyHasDecimal": true,
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
                  "keyHasDecimal": true,
                  "keyThousandCharacter": " "
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
                  "keyPriceFormat": "# NIS",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": ","
              },
              "hu-hu": {
                  "keyPriceFormat": "# HUF",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": ","
              },
              "it-it": {
                  "keyPriceFormat": "# €",
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
                  "keyPriceFormat": "#  €",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": "." //period comma reversed
              },
              "ru-ru": {
                  "keyPriceFormat": "# ₽",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": ""
              },
              "sk-sk": {
                  "keyPriceFormat": "# €",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": "."
              },
              "sv-se": {
                  "keyPriceFormat": "# kr",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": "" // no comma
              },
              "tr-tr": {
                  "keyPriceFormat": "",
                  "keyHasDecimal": true,
                  "keyThousandCharacter": ","
              },
              "zh-hk": {
                  "keyPriceFormat": "HK$#",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": "," //no decimal
              },
              "zh-tw": {
                  "keyPriceFormat": "NT$#",
                  "keyHasDecimal": false,
                  "keyThousandCharacter": "," //no decimal
              }
          }
      }
  
  
      var ItemPopulate = (function () {
      var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
      if (urlRegion === "en-ae") {
          urlRegion = "ar-ae";
      } else if (urlRegion === "en-sa") {
          urlRegion = "ar-sa";
      } else if (urlRegion === "en-il") {
          urlRegion = "he-il";
      }
          var countryCode = urlRegion.split("-")[1].toUpperCase();
          var regionItems = allAccessories.locales[urlRegion]
          var numItems = regionItems.length; 
          var currencyFormat = priceFormat.locales[urlRegion];
          var bigIdStringList = "";
          var catflag = 0;
  
          setTimeout(function () {
              $("#genreSelect li a").attr("tabindex", "0");
              $(".mobileMenuToggle button").attr("aria-label", "click to expand collection selections")
          }, 3000)
  
          $(document).on("click", ".mobileMenuToggle button", function(e) {
              if ($(this).attr("aria-expanded") === "false") {
                  $(this).attr("aria-label", "click to expand collection selections");
              } else {
                  $(this).attr("aria-label", "click to close collection selections");
              }
          })
          $(document).on("keydown", ".mobileMenuToggle button", function(e) {
              if((e.keyCode == 13) || (e.keyCode== 32)){
                  if ($(this).attr("aria-expanded") === "false") {
                      $(this).attr("aria-label", "click to expand collection selections");
                  } else {
                      $(this).attr("aria-label", "click to close collection selections");
                  }
              }
          })
  
          regionItems.forEach(function (product) {
              if (product.productId.indexOf("/") !== -1) { bigIdStringList = bigIdStringList + product.productId.split("/")[0] + ','; }
          });
  
          bigIdStringList = setCharAt(bigIdStringList, bigIdStringList.length - 1, ""); // Remove the , at the end of the string
  
          var apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + bigIdStringList + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
  
          //console.log(apiUrl);
  
          // hero title
          var regTitles = accHeadlines.locales[urlRegion]
          $(".accHeroTitle").text(regTitles["keyAccessories"])
  
          regionItems = regionItems.sort(function (a, b) {
              return a.position - b.position
          });
  
          if (bigIdStringList !== "") {
              $.get(apiUrl)
                  .done(function (responseData) {
                      var apiItemList = [];
                      responseData.Products.forEach(function (product) {
                          product.DisplaySkuAvailabilities.forEach(function (skuAvailability) {
                              var apiItem = new Object();
                              apiItem.productId = product.ProductId;
                              apiItem.MSRP = skuAvailability.Availabilities[0].OrderManagementData.Price.MSRP;
                              apiItem.listPrice = skuAvailability.Availabilities[0].OrderManagementData.Price.ListPrice;
                              apiItem.skuId = skuAvailability.Availabilities[0].SkuId;
                              apiItemList.push(apiItem);
                          });
                      });
                      populateAccessoriesHub(numItems,true, apiItemList);
                  })
                  .fail(function () {
                      populateAccessoriesHub(numItems,false);
                  })
          } else { populateAccessoriesHub(numItems,false); }
  
          function populateAccessoriesHub(numItems,useMS_store, apiItemList) {
   
              for (var i = 0; i < numItems; i++) {
                  var useAPIPrice = true; // Using a '!' character at the beginning of the priceText in the allConsoles.js price to override the API price.
                  if (regionItems[i].priceText.charAt(0) === "!") {
                      useAPIPrice = false;
                      regionItems[i].priceText = regionItems[i].priceText.replace("!", "");
                      regionItems[i].tprPriceText = regionItems[i].tprPriceText.replace("!", "");
                  }
  
                  if (useAPIPrice && useMS_store) {
                      var currentPID = "";
                      var currentSID = "";
                      apiItemList.forEach(function (item) {
                          if (regionItems[i].productId.indexOf("/") !== -1) {
                              currentPID = regionItems[i].productId.split("/")[0];
                              currentSID = regionItems[i].productId.split("/")[1];
                          }
  
                          if (item.productId === currentPID.toUpperCase() && item.skuId === currentSID.toUpperCase()) {
                              //console.log(item.productId + " " + item.skuId + " " + " MSRP= " + item.MSRP);
                              if ((item.MSRP !== 0) && (item.MSRP !== "100000") && (item.MSRP !== 100000)) {
                                  //console.log("|" + item.MSRP + "|");
                                  //console.log("|" + item.listPrice + "|");
                                  regionItems[i].priceText = formatCurrency(item.MSRP, currencyFormat);
                                  regionItems[i].priceNumber = item.MSRP;
                                  regionItems[i].tprPriceText = formatCurrency(item.listPrice, currencyFormat);
                                  regionItems[i].tprPriceNumber = item.listPrice;
  
                              } else { /*console.log("Broken: " + urlRegion + " - " + regionItems[i].productId + " - " + regionItems[i].updProductId + " - " + regionItems[i].headline);*/ }
                          }
                      });
  
                  }
  
                  if (regionItems[i].priceNumber !== "####" && regionItems[i].priceNumber > 1) {
                      var displayPrice = formatCurrency(regionItems[i].priceNumber, currencyFormat);
                  } else if (regionItems[i].priceNumber > 0) {
                      var displayPrice = "";
                  } else {
                      var displayPrice = regionItems[i].priceNumber;
                  }
  
                  //construct review URL
                  var countryStore = "msusa"
                  if (urlRegion === "en-gb") {
                      countryStore = "msuk"
                  }
                  var urlRegionUrl = urlRegion.split("-")[0] + "_" + urlRegion.split("-")[1].toUpperCase();
                  var reviewUrl = "https://www.microsoftstore.com/store/" + countryStore + "/" + urlRegionUrl + "/pdp/" + regionItems[i].itemId + "/productID." + regionItems[i].productId + "#ratingsandreviews";
                  
                  var detailstext = $("#seedetailstext").text().replace("[[PLACEHOLDER]]", regionItems[i].headline);
  
                  // Aria's
                  if (regionItems[i].detailsCTA.indexOf("DESIGN") !== -1) {
                      detailstext = "Design yours with, " + regionItems[i].headline;
                  }
  
                  if (regionItems[i].detailsCTA.indexOf("PICK YOUR TEAM") !== -1) {
                      detailstext = "Pick your team with, " + regionItems[i].headline;
                  }
                  // Data Retailer removal/addition
                  var dataLearn = 'data-cta="learn"'
                  var dataRetailer = 'data-retailer="MS Store" target="_blank"'
  
                      if (regionItems[i].detailsURL.indexOf("microsoft.com") !== -1) {
                          dataLearn = "";
                      } else if (regionItems[i].detailsURL.indexOf("xbox.com") !== -1) {
                          dataRetailer = "";
                      } else {
                          dataLearn = "";
                          dataRetailer = 'data-cta="external" target="_blank"'
                      }
  
                      
                  $("." + regionItems[i].category.replace(/\s+/g, '') + "Items")
                      .append('<div data-grid="col-3" class="item" data-position="' + regionItems[i].position + '" data-price="' + regionItems[i].priceNumber + '" data-win10="' + regionItems[i].win10 +
                      '" data-product="' + regionItems[i].product + '" data-tprpricetext="' + regionItems[i].tprPriceNumber + '" data-originalorder="' + i + '" data-assistive="' + regionItems[i].assistive + '">' +
                      '<div data-grid="col-12">' +
                      '<section class="m-content-placement-item first-child f-size-medium">' +
                      '<a href="' + regionItems[i].detailsURL.trim() + '" data-clickname="www>xbox-one>accessories>' +
                      regionItems[i].headline.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi, '') + '>click" data-cta="learn">' +
                      '<picture>' +
                      '<source srcset="' + regionItems[i].image.replace("http://compass", "https://compass-ssl") + '" media="(min-width:0)">' +
                      '<img srcset="' + regionItems[i].image.replace("http://compass", "https://compass-ssl") + '" src="' + regionItems[i].image.replace("http://compass", "https://compass-ssl") + '" alt="' +
                      regionItems[i].headline + '" ms.title="' + regionItems[i].headline + '" aria-hidden="true">' +
                      '</picture>' +
                      '<strong class="c-badge f-small f-highlight">' + regionItems[i].badge + '</strong>' +
                      '<h3 class="c-subheading-3">' + regionItems[i].headline + '</h3>' +
                      '<p class="c-paragraph-3"><span class="priceText">' + displayPrice + '</span></p>' +
                      '</a>' +
                      '<div>' +
                      '<a href="' + regionItems[i].detailsURL.trim() + '" class="c-glyph c-call-to-action detailsCta" data-clickname="www>xbox-one>accessories>' +
                      regionItems[i].headline.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi, '') + '>click" ' + dataLearn + ' ' + dataRetailer + ' aria-label="' + detailstext +
                      '" tabindex="-1">' +
                      '<span>' + regionItems[i].detailsCTA.toUpperCase() + '</span>' +
                      '</a>' +
                      '</div>' +
                      '</section>' +
                      '</div>' +
                      '</div>')
  
                  
              }
  
  
          // add design logo
          //    var badgeCopy = accHeadlines.locales[urlRegion].keyLastChance;
          //    var badge = '<strong class="c-badge f-small f-highlight">' + badgeCopy + '</strong>';
             
  
              $(".item").each(function () {
                  var ctaTextDL = $(this).find("h3").text().toLowerCase();
                // Customize Button
                //   if (ctaTextDL.indexOf("xbox design lab") !== -1) {
                //       $(this).find(".detailsCta").addClass("customize-button").addClass("cta-btn-dark");
                //       // $(this).find("h3").before(badge);
                //   }
                  if ($(this).find(".c-badge").text().indexOf("####") !== -1) {
                      $(this).find(".c-badge").remove();
                  }
                  var blankHref = $(this).find("a").attr("href");
                  if (blankHref.indexOf("####") !== -1) {
                      $(this).find("a").attr("tabindex", "-1")
                  }
                  //console.log($(this).data("product"));
                  //console.log("msrp is " + parseFloat($(this).data("price")) + " tpr is " + parseFloat($(this).data("tprpricetext")));
                  if ($(this).data("tprpricetext") !== "####" && (parseFloat($(this).data("price")) > parseFloat($(this).data("tprpricetext")))) {
  
                      var newPrice = $(this).data("tprpricetext");
                      $(this).attr("data-price", newPrice); //Update price so it sorts based on tpr
                      newPrice = formatCurrency(newPrice, currencyFormat);
                      $(this).find(".priceText").last().prepend('<span class="sr-text">Previous price</span>');
                      $(this).find(".priceText").last().css("text-decoration", "line-through").after('<span itemprop="price" class="priceText" style="margin-left: 8px"><span class="sr-text">' +
                          'Current price</span>' + newPrice + '</span>');
                  }
                  if ($(this).find(".detailsCta").attr("href").indexOf("####") > -1) {
                      $(this).css("pointer-events", "none").css("cursor", "auto");
                      $(this).find(".detailsCta").css("visibility", "hidden");
                  }
  
                  if ($(this).attr("data-win10") === "true") {
                    $(this).clone().appendTo(".windows10Items")
                  }
                  if ($(this).attr("data-assistive") === "true" && !$(this).closest(".itemCat").hasClass("assistive")) {
                    $(this).clone().prependTo(".assistiveItems")
                  }
              })
  
              $(".priceText:contains('####')").css("visibility", "hidden");
              initCategories();
          }
  
          // checkbox behavior
          // var allacctext = $(".catCheck").first().find("span").text();
          // $(".catCheck").click(function(e) {
          //   e.preventDefault();
          //   if (catflag !== 0) { return false; }
          //   catflag = 1;
          //   var clickCat = $(this).attr("id").toLowerCase().replace("box", "");
          //   var clickid = $(this).attr("id");
          //   setTimeout(function() {
          //     catBoxClicked(clickCat, clickid);
          //     $(".itemnumphrase").focus();
          //   }, 50)
          // })
  
          // function catBoxClicked(category, catid) {
          //     if (category === "all" || $(".f-selected").length === 0) {
          //         // $(".catCheck").removeClass("f-selected");
          //         // $("#boxAll").addClass("f-selected");
          //         $(".catCheck").each(function() {
          //           if ($(this).hasClass("f-selected")) {
          //             $(this)[0].click()
          //           }
          //         })
          //         if (!$("#boxAll").hasClass("f-selected")) {
          //           $("#boxAll")[0].click();
          //         }
          //     } else {
          //         // $("#boxAll").removeClass("f-selected");
          //         if ($("#boxAll").hasClass("f-selected")) {
          //           $("#boxAll")[0].click();
          //         }
          //         if ($(".f-selected").length === $(".catCheck").length - 1) {
          //           // $(".catCheck").removeClass("f-selected");
          //           // $("#boxAll").addClass("f-selected");
          //           $(".catCheck").each(function() {
          //             if ($(this).hasClass("f-selected")) {
          //               $(this)[0].click()
          //             }
          //           })
          //           if (!$("#boxAll").hasClass("f-selected")) {
          //             $("#boxAll")[0].click();
          //           }
          //         }
          //     }
          //     catHideShow(category, catid); 
          // }
  
          // function catHideShow(category, catid) {
          //     // if (category !== "win10") {
          //         if ($("#boxAll").hasClass("f-selected")) {
          //             $(".itemCat").removeClass("catHidden").removeClass("hide");
          //             $(".item").removeClass("hide");
          //             $(".userSelections").text(allacctext);
          //         } else {
          //             $(".itemCat").addClass("catHidden");
          //             $(".catCheck").each(function () {
          //                 var catClass = $(this).attr("id").toLowerCase().replace("box", "");
          //                 if ($(this).hasClass("f-selected")) {
          //                     $("." + catClass).removeClass("catHidden").removeClass("hide")
          //                 }
          //             })
          //             //update heading list
          //             var categoryList = [];
          //             $(".itemCat").not(".catHidden").find("h2.c-heading-2").each(function () {
          //                 var heading = $(this).text();
          //                 categoryList.push(heading);
          //             })
          //             var headingText = categoryList.join(", ");
          //             $(".userSelections").text(headingText);
          //         }
          //     // } else {
          //     //     if ($("#boxWin10").hasClass("f-selected")) {
          //     //         $(".item[data-win10='false']").addClass("hide");
          //     //         $(".itemCat").each(function () {
          //     //             if ($(this).find(".item[data-win10='true']").length === 0) {
          //     //                 $(this).addClass("hide");
          //     //             }
          //     //         })
          //     //     } else {
          //     //       if ($("#boxAll").hasClass("f-selected")) {
          //     //         allacctext = $(".catCheck").first().find("span").text();
          //     //         $(".itemCat").removeClass("catHidden").removeClass("hide");
          //     //         $(".item").removeClass("hide");
          //     //         $(".userSelections").text(allacctext);
          //     //       }
          //     //         $(".item[data-win10='false']").removeClass("hide");
          //     //         $(".itemCat").removeClass("hide");
          //     //     }
          //     // }
  
          //     // update item count
          //     var itemcount = $(".itemCat").not(".catHidden").find(".item").not(".hide").length;
          //     $(".itemNumber").text(itemcount);
          //     setTimeout(function() {
          //       catflag = 0;
          //     }, 80)
          // }
  
          // checkbox behavior
          var allacctext = $(".c-label").first().find("span").text();
          $("#catListItems input[type=checkbox]").click(function () {
              var clickCat = $(this).attr("id").toLowerCase().replace("box", "");
              catBoxClicked(clickCat);
          })
  
          function catBoxClicked(category) {
              if (category === "all") {
                  $(".catCheck").prop("checked", false)
                  $("#boxAll").prop("checked", true)
              } else if ($(".catCheck:checked").length === $(".catCheck").length - 1) {
                  $(".catCheck").prop("checked", false)
                  $("#boxAll").prop("checked", true)
              } else if (category !== "all") {
                  $("#boxAll").prop("checked", false)
              }
              catHideShow(category);
          }
  
          function catHideShow(category) {
              if (category !== "win10") {
                  if ($("#boxAll")[0].checked) {
                      $(".itemCat").removeClass("catHidden").removeClass("hide");
                      $(".item").removeClass("hide");
                      $(".userSelections").text(allacctext);
                  } else {
                      $(".itemCat").addClass("catHidden");
                      $(".catCheck").each(function () {
                          var catClass = $(this).attr("id").toLowerCase().replace("box", "");
                          if ($(this)[0].checked) {
                              $("." + catClass).removeClass("catHidden").removeClass("hide")
                          }
                      })
                      //update heading list
                      var categoryList = [];
                      $(".itemCat").not(".catHidden").find("h2.c-heading-2").each(function () {
                          var heading = $(this).text();
                          categoryList.push(heading);
                      })
                      var headingText = categoryList.join(", ");
                      $(".userSelections").text(headingText);
                  }
              } else {
                  if ($("#boxWin10")[0].checked) {
                      $(".item[data-win10='false']").addClass("hide");
                      $(".itemCat").each(function () {
                          if ($(this).find(".item[data-win10='true']").length === 0) {
                              $(this).addClass("hide");
                          }
                      })
                  } else {
                      $(".item[data-win10='false']").removeClass("hide");
                      $(".itemCat").removeClass("hide");
                  }
              }
  
              // update item count
              var itemcount = $(".itemCat").not(".catHidden").find(".item").not(".hide").length;
              $(".itemNumber").text(itemcount);
              if ($("#filter-genre").find("input:checked").length === 0) {
                $("#filter-genre").find("input").first().click();
                $("#filter-genre").find("label").first().click();
              }
              $("#filter-genre input").attr("aria-checked", "false");
              $("#filter-genre input:checked").attr("aria-checked", "true");
              $("#filter-genre input").each(function() {
                  if ($(this).attr("aria-checked") === "false") {
                      $(this).removeAttr("checked");
                  }
              })
  
          }
  
          var theTarget = document.URL;
  
          function changeCat(cat, thedelay) {
              setTimeout(function() {
                  document.getElementById(cat).click()
                  catHideShow();
                  $(".gameList").show();
                  $(".itemnumphrase").focus();
              }, thedelay)
          }
  
          if (theTarget.indexOf("#") > -1) {
              $(".gameList").hide();
              // reset page for FF and IE
              //changeCat("boxAll", 0)
              theTarget = theTarget.split("#")[1].toLowerCase()
              if (theTarget.indexOf("controllers") !== -1) {
                  changeCat("boxControllers", 1500)
              } else if (theTarget.indexOf("mobile") !== -1) {
                  changeCat("boxMobile", 1500)
              } else if (theTarget.indexOf("stands") !== -1) {
                  changeCat("boxStands", 1500)
              } else if (theTarget.indexOf("headsets") !== -1) {
                  changeCat("boxHeadsets", 1500)
              } else if (theTarget.indexOf("harddrives") !== -1) {
                  changeCat("boxHarddrives", 1500)
              } else if (theTarget.indexOf("display") !== -1) {
                  changeCat("boxDisplay", 1500)
              } else if (theTarget.indexOf("cables") !== -1) {
                  changeCat("boxCables", 1500)
              } else if (theTarget.indexOf("wheels") !== -1) {
                  changeCat("boxWheels", 1500)
              } else if (theTarget.indexOf("starters") !== -1) {
                  changeCat("boxOther", 1500)
              } else if (theTarget.indexOf("assistive") !== -1) {
                  changeCat("boxAssistive", 2400)
              } else if (theTarget.indexOf("windows") !== -1) {
                changeCat("boxWindows10", 2400)
            }
          }
  
          function initCategories() {
              $(".itemCat").each(function () {
                  if ($(this).find(".item").length === 0) {
                      $(this).hide();
                      if ($(this).hasClass("controllers")) {
                          $("[data-accessory='controllers'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("mobile")) {
                          $("[data-accessory='mobile'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("stands")) {
                          $("[data-accessory='stands'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("headsets")) {
                          $("[data-accessory='headsets'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("harddrives")) {
                          $("[data-accessory='harddrives'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("display")) {
                          $("[data-accessory='display'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("cables")) {
                          $("[data-accessory='cables'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("wheels")) {
                          $("[data-accessory='wheels'] input").attr("disabled", "disabled");
                      } else if ($(this).hasClass("other")) {
                          $("[data-accessory='other'] input").attr("disabled", "disabled");
                      }
                  }
              })
              // initial item count
              var itemcount = $(".item").length;
              $(".itemNumber").text(itemcount);
          }
  
          setTimeout(function () {
              $(".item img").attr("tabindex", "-1")
              $(".item .detailsCta").attr("tabindex", "0")
          }, 1500)
  
          // m-feature fix
          $(".m-feature").removeClass("m-feature").addClass("m-");
  
          var windowresized2 = (function () {
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
          windowresized2(function(){
            var newWidth = $(document).width();
            $(".gameDivsWrapper").removeAttr("style");
            if (newWidth > 768) {
              $(".gameSelectors").attr("style", "");
            }
          }, 200, "pageresize");
        });
  
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
  
        // remove sort from price-less locales
        var noprices = "en-in, es-co, el-gr, es-cl, en-za, tr-tr, he-il, hu-hu, pt-br";
        if (noprices.indexOf(urlRegion) !== -1) {
          $(".dropdownItems").hide();
        }
  
        //mwf select handling
        // setTimeout(function() {
        //   var mySelectHtmlElement = document.querySelector('.gameSort .c-select');
        //   var mwfSelectComp;
        //   mwf.ComponentFactory.create([{
        //       c: mwf.Select,
        //       elements: [mySelectHtmlElement],
        //       callback: function callback(results) {
        //           if (results && results.length) {
        //               mwfSelectComp = results[0];
        //           }
        //       },
        //       eventToBind: 'DOMContentLoaded'
        //   }]);
  
        //   if (mwfSelectComp.selectMenu) {
        //       // subscribe to the mwfSelectComp onSelectionChanged event
        //       mwfSelectComp.selectMenu.subscribe({
        //           onSelectionChanged: function (e) {
        //             var selthis = $(".gameSort .c-menu-item p:contains('" + e.id + "')").closest(".c-menu-item");
        //             if ($(selthis).attr("id") === "-generated-select-menu-0") {
        //               // do featured sorting
        //               $(".catItems").each(function () {
        //                 var catItems = $(this);
        //                 catItems.find(".item").sort(function (a, b) {
        //                     return a.dataset.originalorder - b.dataset.originalorder;
        //                 }).appendTo(catItems);
        //               })
        //             } else if ($(selthis).attr("id") === "-generated-select-menu-1") {
        //               // do hilo sorting
        //               $(".catItems").each(function () {
        //                 var catItems = $(this);
        //                 catItems.find(".item").sort(function (a, b) {
        //                     return b.dataset.price - a.dataset.price;
        //                 }).appendTo(catItems);
        //               })
        //             } else if ($(selthis).attr("id") === "-generated-select-menu-2") {
        //               // do lohi sorting
        //               $(".catItems").each(function () {
        //                 var catItems = $(this);
        //                 catItems.find(".item").sort(function (a, b) {
        //                     return a.dataset.price - b.dataset.price;
        //                 }).appendTo(catItems);
        //               })
        //             }
        //           }
        //       });
        //   }
        // },3000)
  
        $(document).on("change", "#sel2", function() {
          for (var t = 0; t < $(this).find("option").length; t++) {
            if ($(this).val() === $(this).find("option").eq(t).text()) {
              var newsort = $(this).find("option").eq(t).data("sorting")
            }
          }
          $(this).data("sortselected", newsort);
          runsort(newsort);
        })
  
        function runsort(sort) {
          if (sort === "featured") {
            // do featured sorting
            $(".catItems").each(function () {
              var catItems = $(this);
              catItems.find(".item").sort(function (a, b) {
                  return a.dataset.originalorder - b.dataset.originalorder;
              }).appendTo(catItems);
            })
          } else if (sort === "hiLo") {
            // do hilo sorting
            $(".catItems").each(function () {
              var catItems = $(this);
              catItems.find(".item").sort(function (a, b) {
                  return b.dataset.price - a.dataset.price;
              }).appendTo(catItems);
            })
          } else {
            // do lohi sorting
            $(".catItems").each(function () {
              var catItems = $(this);
              catItems.find(".item").sort(function (a, b) {
                  return a.dataset.price - b.dataset.price;
              }).appendTo(catItems);
            })
          }
        }
  
        $(".sorting-list .c-menu-item a").removeAttr("href");
  
      })();

    if ($(".CatAnnounce").length === 0) {
        $("body").append('<div style="width:0;height:0;font-size:0;" class="CatAnnounce" aria-live="assertive"></div>');
    }
      // Color Switcher
      var markup = '<ul role="tablist" aria-label="Use these tabs to change the color of the controller. Press the enter button in order to change the color of the controller." class="heroTabControls wf-color-selection" data-mwf-class="LogoController">' +
      '<li class="c-glyph" role="presentation">' +
      '<a href="#" role="tab" class="c-logo" data-color-name="white" itemprop="url" aria-label="White controller" aria-selected="false" tabindex="0">' +
      '<div class="color-indicator-border">' +
      '<div class="color-indicator" data-color="F6F8FE" style="border-color: rgb(246, 248, 254);"></div>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li class="c-glyph" role="presentation">' +
      '<a href="#" role="tab" class="c-logo" data-color-name="black" itemprop="url" aria-label="Black controller" aria-selected="false" tabindex="0">' +
      '<div class="color-indicator-border">' +
      '<div class="color-indicator" data-color="19191A" style="border-color: rgb(25, 25, 26);"></div>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li class="c-glyph" role="presentation">' +
      '<a href="#" role="tab" class="c-logo" data-color-name="red" itemprop="url" aria-label="Red controller" aria-selected="false" tabindex="0">' +
      '<div class="color-indicator-border">' +
      '<div class="color-indicator" data-color="D05353" style="border-color: rgb(208, 83, 83);"></div>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li class="c-glyph" role="presentation">' +
      '<a href="#" role="tab" class="c-logo" data-color-name="green" itemprop="url" aria-label="Volt controller" aria-selected="true" tabindex="0">' +
      '<div class="color-indicator-border">' +
      '<div class="color-indicator" data-color="D4EB50" style="border-color: rgb(212, 235, 80);"></div>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li class="c-glyph" role="presentation">' +
      '<a href="#" role="tab" class="c-logo" data-color-name="blue" itemprop="url" aria-label="Blue controller" aria-selected="false" tabindex="0">' +
      '<div class="color-indicator-border">' +
      '<div class="color-indicator" data-color="2C5AAF" style="border-color: rgb(44, 90, 175);"></div>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '</ul>'

    var queries = [{
          query: ".item[data-product='Xbox Wireless Controller – Electric Volt']",
          class: 'wf-color__green',
          color: 'green'
      },
      {
          query: '.item[data-product="Xbox Wireless Controller - Pulse Red"]',
          class: 'wf-color__red',
          color: 'red'
      },
      {
          query: '.item[data-product="Xbox Wireless Controller – Carbon Black"]',
          class: 'wf-color__black',
          color: 'black'
      },
      {
          query: '.item[data-product="Xbox Wireless Controller – Robot White"]',
          class: 'wf-color__white',
          color: 'white'
      },
      {
          query: '.item[data-product="Xbox Wireless Controller – Shock Blue"]',
          class: 'wf-color__blue',
          color: 'blue'
      }
    ];



  var activecheck = setInterval(function() {
      var activeAjax = $(".item").length > 0;
      if (activeAjax === true) {
          queries.forEach(function(q) {
              var items = $("#controllers " + q.query)
              if (items) {
                  // append color picker
                  items.find('section .c-paragraph-3').addClass("zpt").before(markup);
                  // add color class
                  items.addClass(q.class);
                  // white controller first 
                  if (q.color !== 'white') {
                      items.addClass('wf-hide');
                      items.attr('aria-selected', 'false'); // Optional
                  } else {
                    items.find('c-logo').addClass(".wf-active");
                  }

                  items.find('ul li a[data-color-name="' + q.color + '"]').addClass('wf-active');
                  items.find("ul li a").each(function(index, ele) {
                      ele.addEventListener('click', function(e) {
                          e.preventDefault();
                          var color = ele.getAttribute('data-color-name');
                          if (color !== q.color) {
                              items.addClass('wf-hide');
                              items.attr('aria-selected', 'false');
                              var newColor = $('.wf-color__' + color);
                              newColor.removeClass('wf-hide').find('ul li a[data-color-name="' + color + '"]').focus();
                              newColor.attr('aria-selected', 'true');
                          }
                          $(".CatAnnounce").text(color + "color selected");
                      });
                  });
              }

          })

          clearInterval(activecheck);

      }

  }, 500);   



  });
  
  function setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substr(0, index) + chr + str.substr(index + 1);
  }
  
  //If you don't send in the format from the PriceFormat JSON, you're going to have a bad time.
  function formatCurrency(price, format) {
      var formattedPrice = "" + price;
      if (!format.keyHasDecimal) {
          formattedPrice = formattedPrice.split(".")[0];
      } else if ((formattedPrice.indexOf(".99") === -1) && (formattedPrice.indexOf(".95") === -1)) {
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