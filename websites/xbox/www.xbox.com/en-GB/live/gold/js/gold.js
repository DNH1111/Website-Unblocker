$(document).ready(function() {
  //TAB PROCESSING

  // collect tab hrefs to compare against url hash for error checking
  var theTabs = $(".tab");
  var targets = new Array();
  $(theTabs).each(function() {
      // if (typeof lightboxcontainer !== "undefined")
      if (typeof $(this).attr('data-href') != "undefined") {
          targets.push($(this).attr('data-href'));
      } else {
          targets.push($(this).attr('href'));
      }
  });
  var initialPageLoad = 0;

  // makes sure hash is lower case
  document.location.hash = document.location.hash.toLowerCase();
  theHash = document.location.hash.substring(1);

  // if the page loads with a hash in the URL, and if hash is valid, act as if tab has been clicked.
  $(window).on('load', function() {
      if (theHash && targets.indexOf("#" + theHash) != -1) {
          tabNavigation(theHash + "tab");
          setTimeout(function() {
              //console.log("scroll");
              $('html, body').animate({ scrollTop: $("#ContentBlockList_1").offset().top }, 0);
          }, 1000);
      } else {
          tabNavigation("defaulttab");
      }
  });

  $(".tab").on("click", function(e) {
      //e.preventDefault();
      tabNavigation($(this).attr("data-id"));
  });

  // HTML tab href, id, and data-tab attributes all must be set correctly.
  // href is what makes sense in URL, id = href + "tab", data-tab is the class applied to the modules to show/hide accordingly (along with .tab-content")
  function tabNavigation(t) {
      console.log("t " + t);
      theTab = $("a[data-id=" + t + "]");
      $(".tab").removeClass("selected");
      $(theTab).addClass("selected");
      if (theTab != "#defaulttab") {
          tabContent = $(theTab).attr("data-tab");
          $(".tab-content").hide();
          $("." + tabContent).show();
          if (initialPageLoad == 0) { // prevents infinite focus->onFocus loop
              initialPageLoad = 1;
              $(theTab).focus();
          }
      } else {
          history.pushState("", document.title, window.location.pathname + window.location.search); //gets rid of hash from URL
          $(".tab-content").hide();
          $(".default").show();
      }
  }



  // END TAB PROCESSING ============ 

  var urlRegion = document.URL.split("/")[3].toLowerCase();

  var popJSON = (function() {
      var regionContent = liveGoldContent.locales[urlRegion];
      var allKeys = Object.keys(regionContent)
      var keysLength = allKeys.length
      for (var i = 0; i < keysLength; i++) {

          /* error checking if placeholder image isn't in spreadsheet. Only conditions for this specific page were considered, but can be adapted as needed. */
          if ((regionContent[allKeys[i]].indexOf("##") !== -1) || (regionContent[allKeys[i]].indexOf(" ") === 0)) {
              //console.log('condition met: /' + regionContent[allKeys[i]] + "/")
              continue;
          }
          /* end error checking */

          if (allKeys[i].indexOf("keyCopy") !== -1) {
              $("[data-loc-copy=" + allKeys[i] + "]").html(regionContent[allKeys[i]]);
          } else if (allKeys[i].indexOf("keyImage") !== -1) {
              $("source[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]);
              $("img[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]).attr("srcset", regionContent[allKeys[i]]);
          } else if (allKeys[i].indexOf("keyAlt") !== -1) {
              $("[data-loc-alt=" + allKeys[i] + "]").attr("alt", regionContent[allKeys[i]]);
          } else if (allKeys[i].indexOf("keyLink") !== -1) {

              //empty link check unique to live/gold
              if (regionContent[allKeys[i]] == "") {
                  //if link is empty, remove the <a> tag to prevent glyph from appearing on the page.
                  $("[data-loc-link=" + allKeys[i] + "]").remove();
              } else {
                  //this line is the standard operation
                  $("[data-loc-link=" + allKeys[i] + "]").attr("href", regionContent[allKeys[i]]);
              }

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

      // special needs for page

      //fix for IE  hero
      // window resizing
      var userAgentString = navigator.userAgent;
      if (userAgentString.indexOf("Trident") >= 0) { //only IE browsers
          $(".m-content-placement-item.f-size-large").each(function() {
              $(this).find("img").attr("src", $(this).find("img").attr("srcset"))
          })
          var winWidth = $(document).width();
          if (winWidth < 767) {
              $("picture").each(function() {
                  if ($(this).find("source").length === 3) {
                      $(this).find("img").attr("src", $(this).find("source").eq(2).attr("srcset"));
                  } else if ($(this).find("source").length === 2) {
                      $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                  } else {
                      $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                  }
              });
          } else if (winWidth >= 768 && winWidth < 1083) {
              $("picture").each(function() {
                  if ($(this).find("source").length === 3) {
                      $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                  } else {
                      $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                  }
              });
          } else if (winWidth >= 1084) {
              $("picture").each(function() {
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
                      $("picture").each(function() {
                          if ($(this).find("source").length === 3) {
                              $(this).find("img").attr("src", $(this).find("source").eq(2).attr("srcset"));
                          } else if ($(this).find("source").length === 2) {
                              $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                          } else {
                              $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                          }
                      });
                  } else if (newWidth >= 768 && newWidth < 1083) {
                      $("picture").each(function() {
                          if ($(this).find("source").length === 3) {
                              $(this).find("img").attr("src", $(this).find("source").eq(1).attr("srcset"));
                          } else {
                              $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                          }
                      });
                  } else if (newWidth >= 1084) {
                      $("picture").each(function() {
                          $(this).find("img").attr("src", $(this).find("source").eq(0).attr("srcset"));
                      });
                  }
              }, 200, "pageresize");
          });
      }
  })();
});