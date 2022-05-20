$(document).ready(function() {
    var HeroPopulate = (function() { 
    var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
    if (urlRegion === "en-ae") {
      urlRegion = "ar-ae";
    } else if (urlRegion === "en-sa") {
      urlRegion = "ar-sa";
    } else if (urlRegion === "en-il") {
      urlRegion = "he-il";
    }
      // var rollingLocales = ""
      // MAKE SURE TO PUBLISH CORRESPONDING FILE
      // for QA (all locales)
        var rollingLocales = "en-au en-hk en-in en-nz en-sg ja-jp ko-kr zh-hk zh-tw en-au en-hk en-in en-nz en-sg ja-jp ko-kr zh-hk zh-tw ar-ae ar-sa cs-cz da-dk de-at de-ch de-de el-gr en-gb en-ie en-za fi-fi fr-be fr-ch fr-fr he-il hu-hu it-it nb-no nl-be nl-nl pl-pl pt-pt ru-ru sk-sk sv-se tr-tr en-ca fr-ca es-ar es-cl es-co es-es es-mx pt-br en-us"
      // 3pm day before
       //  var rollingLocales = "en-au en-hk en-in en-nz en-sg ja-jp ko-kr zh-hk zh-tw"
      // 4pm day before
      // var rollingLocales = "en-au en-hk en-in en-nz en-sg ja-jp ko-kr zh-hk zh-tw ar-ae ar-sa cs-cz da-dk de-at de-ch de-de el-gr en-gb en-ie en-za es-es fi-fi fr-be fr-ch fr-fr he-il hu-hu it-it nb-no nl-be nl-nl pl-pl pt-pt ru-ru sk-sk sv-se tr-tr"
      if (rollingLocales.indexOf(urlRegion) !== -1) {
        var regionContent = globalContentNew.locales[urlRegion]
      } else {
        var regionContent = globalContentOld.locales[urlRegion]
      }
  
      var allKeys = Object.keys(regionContent)
      var keysLength = allKeys.length
  
      // page-specific container hiding
      if (regionContent.keyCopylateravailable.indexOf("####") !== -1) {
        $(".availSoon").remove();
        $(".infinite").eq(1).remove();
      }
      var gameRemoval = ["keyCopytitlenowgame1", "keyCopytitlenowgame2", "keyCopytitlenowgame3", "keyCopytitlenowgame4", "keyCopytitlenowgame5", "keyCopytitlelatergame1", "keyCopytitlelatergame2" , "keyCopytitlelatergame3" , "keyCopytitlelatergame4" , "keyCopytitlelatergame5"]
      for (var i = 0; i < gameRemoval.length; i++) {
        if (regionContent[gameRemoval[i]].indexOf("####") !== -1) {
          $("[data-loc-copy=" + gameRemoval[i] + "]").parents(".gameDiv").remove();
        }
      }
      var legalRemoval = ["keyCopylegal1" , "keyCopylegal2" , "keyCopylegal3" , "keyCopylegal4", "keyCopylegal5"]
      for (var i = 0; i < legalRemoval.length; i++) {
        if (regionContent[legalRemoval[i]].indexOf("####") !== -1) {
          $("[data-loc-copy=" + legalRemoval[i] + "]").remove();
        }
      }
  
      // fill in all content
      for (var i = 0; i < keysLength; i++) {
        if (allKeys[i].indexOf("keyCopy") !== -1) {
          $("[data-loc-copy=" + allKeys[i] + "]").text(regionContent[allKeys[i]]);
        } else if (allKeys[i].indexOf("keyImage") !== -1) {
          $("source[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]);
          $("img[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]).attr("srcset", regionContent[allKeys[i]])
                                                                               .attr("src", regionContent[allKeys[i]]).attr("srcset", regionContent[allKeys[i]]);
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
  
        if (i === keysLength - 1) {
          incExc();
        }
      }
  
      // post-content behavior
      $("[data-playson=t]").each(function() {
        $(this).find("img.c-image").after('<img class="playsOn" ' + 
          'src="http://compass.xbox.com/assets/b0/6e/b06e7832-10c4-4e27-8a56-05b0bc491d9f.png?n=Plays-on-Xbox-One_sticker_215x56.png" alt="Plays on">')
      });
      $(".m-hero-item p").each(function() {
        if ($(this).text() === "####") {$(this).remove();}
      });
      $(".gwg .c-heading-3").each(function() {
        if ($(this).text() === "####") {$(this).remove();}
      });
  
      // GWG CTA groups
      var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
      if (urlRegion === "en-ae") {
        urlRegion = "ar-ae";
      } else if (urlRegion === "en-sa") {
        urlRegion = "ar-sa";
      } else if (urlRegion === "en-il") {
        urlRegion = "he-il";
      }
      var engArray = ["en-us", "en-au", "en-nz", "en-hk", "en-in", "en-sg", "en-ca", "ar-ae", "ar-sa", "en-gb", "en-ie", "en-za", "he-il", "tr-tr"];
      var zhArray = ["zh-hk", "zh-tw"];
      var frArray = ["fr-ca", "fr-be", "fr-ch", "fr-fr"];
      var deArray = ["de-at", "de-ch", "de-de"];
      var nlArray = ["nl-be", "nl-nl"];
      var esArray = ["es-ar", "es-cl", "es-co", "es-mx"];
  
      // Available and date groups
      var esAvailArray = ["es-ar", "fr-be", "es-cl", "es-co", "es-es", "fr-fr", "es-mx", "fr-ch"];
      var engDMAvailArray = ["en-ie", "he-il", "en-nz", "ar-sa", "en-za", "ar-ae", "en-gb", "en-au"];
      var singAvailArray = ["en-hk", "en-in", "en-sg"];
  
      if (esAvailArray.indexOf(urlRegion) > -1) {
        availConvert("Disponible:", "daymonth");
      } else if (engDMAvailArray.indexOf(urlRegion) > -1) {
        availConvert("Available:", "daymonth");
      } else if (singAvailArray.indexOf(urlRegion) > -1) {
        availConvert("Free with gold", "daymonth");
      } else if ( urlRegion === "zh-cn") {
        availConvert("发布日期", "daymonth");
      } else if ( urlRegion === "fr-ca") {
        availConvert("Disponible:", "monthday");
      } else if ( urlRegion === "tr-tr") {
        availConvert("Satışta:", "daymonth");
      } else if ( urlRegion === "zh-tw") {
        availConvert("金會員免費遊戲", "monthday");
      } else if ( urlRegion === "zh-hk") {
        availConvert("金會員免費遊戲", "monthday");
      }
  
      if (deArray.indexOf(urlRegion) > -1 ) { 
        availConvert("Erhältlich:", "daymonth");
      } else if (nlArray.indexOf(urlRegion) > -1 ) { 
        availConvert("Beschikbaar:", "daymonth");
      } else if ( urlRegion === "ko-kr") {
        availConvert("멤버에게 무료 증정", "monthday");
      } else if ( urlRegion === "cs-cz") {
        availConvert("Dostupné:", "daymonth");
      } else if ( urlRegion === "da-dk") {
        availConvert("Tilgængelig:", "daymonth");
      } else if ( urlRegion === "el-gr") {
        availConvert("Διαθέσιμα:", "daymonth");
      }  else if ( urlRegion === "fi-fi") {
        availConvert("Saatavilla", "daymonth");
      } else if ( urlRegion === "hu-hu") {
        availConvert("Elérhető:", "monthday");
      } else if ( urlRegion === "it-it") {
        availConvert("Disponibile:", "daymonth");
      } else if ( urlRegion === "nb-no") {
        availConvert("Tilgængelig:", "daymonth");
      } else if ( urlRegion === "pl-pl") {
        availConvert("Dostępne:", "daymonth");
      } else if ( urlRegion === "pt-pt") {
        availConvert("Disponível:", "daymonth");
      } else if ( urlRegion === "ru-ru") {
        availConvert("В продаже:", "daymonth");
      } else if ( urlRegion === "sk-sk") {
        availConvert("K dispozícii:", "daymonth");
      } else if ( urlRegion === "sv-se") {
        availConvert("Tillgängligt:", "monthday");
      } else if ( urlRegion === "ja-jp") {
        availConvert("期間", "monthday");
      } else if ( urlRegion === "pt-br") {
        availConvert("Disponível:", "daymonth");
      } 
  
      function availConvert(word, date) {
        var headingDate;
        var firstDateMonth, firstDateDay;
        $(".avail").text(word + " ");
        if (date === "daymonth") {
          $(".availDate").each(function() {
            var originalDates = $(this).text();
            var origArray = originalDates.split(" ");
            var firstDate = origArray[0];
            var secondDate = origArray[2];
            firstDateMonth = firstDate.split("/")[0];
            firstDateDay = firstDate.split("/")[1];
            var secondDateMonth = secondDate.split("/")[0];
            var secondDateDay = secondDate.split("/")[1];
            var newDate = firstDateDay + "/" + firstDateMonth + " - " + secondDateDay + "/" + secondDateMonth;
            $(this).text(newDate)
          })
          headingDate = firstDateDay + "/" + firstDateMonth;
          $('[data-loc-copy="keyCopylateravailable"]').text(word.replace(":", "") + " " + headingDate)
        } else {
          var originalDates = $(".availDate").last().text();
          var origArray = originalDates.split(" ");
          var firstDate = origArray[0];
          firstDateMonth = firstDate.split("/")[0];
          firstDateDay = firstDate.split("/")[1];
          headingDate = firstDateMonth + "/" + firstDateDay;
          $('[data-loc-copy="keyCopylateravailable"]').text(word.replace(":", "") + " " + headingDate)
        }
      }
      function incExc() {
              // set up 
              var itemContainer = ".gameDiv"
              // end set up
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
                theItem.find("a").each(function() {
                    $(this).addClass("ignoreContStore");
                  if ($(this).attr("href").toLowerCase().indexOf("www.xbox.com") === -1) {
                    $(this).attr("target", "_blank");
                  }
                })
              })
              $(itemContainer + "[style^='display: none;']").remove();
            }
            
    
        $(".gwg section > a").each(function() {
            var label = $(this).attr("aria-label");
            var available = $(this).find(".avail").text();
            var availableDate = $(this).find(".availDate").text();
            var newlabel = label + ". " + available + " " + availableDate
            $(this).attr("aria-label", newlabel);

        //$(this).find(".avail").after('<img class="playsOn" ' + 
        //  'src="http://compass.xbox.com/assets/b0/6e/b06e7832-10c4-4e27-8a56-05b0bc491d9f.png?n=Plays-on-Xbox-One_sticker_215x56.png" alt="Plays on">')
      });
  
    })();
  })