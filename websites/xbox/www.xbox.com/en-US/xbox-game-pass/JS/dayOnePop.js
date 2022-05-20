$(document).ready(function() {


var urlRegion = document.URL.split("/")[3].toLowerCase(); 

 

var popJSON = (function() { 

  var regionContent = dayOneContent.locales[urlRegion]; 

  var allKeys = Object.keys(regionContent) 

  var keysLength = allKeys.length 

  for (var i = 0; i < keysLength; i++) { 

    if (allKeys[i].indexOf("keyCopy") !== -1) { 

      $("[data-loc-copy=" + allKeys[i] + "]").html(regionContent[allKeys[i]]); 

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

 

})(); 

})