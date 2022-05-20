$(document).ready(function() {
    $(".bsRotator intobsMarker").remove();
      bsrcarouselstarted = false;
      $("body").append('<div style="width:0;height:0;font-size: 0;" class="carouselAnnounce" aria-live="assertive"></div>');
      if (!window.xsxFunctions) { window.xsxFunctions = {} }
      xsxFunctions = xsxFunctions || {};
      xsxFunctions.drawCenterBox =
        function(grabatbottom) {
          if (grabatbottom === true) {
            var canvas = document.getElementById('bsrCanvasFirst');  
            var jcanvas = $("#bsrCanvasFirst");
          } else {
           var canvas = document.getElementById('bsrCanvas');
           var jcanvas = $("#bsrCanvas");
          }
           var ctx = canvas.getContext('2d');
           var tabWidth = $(document).width();
    
           // Draw slice
           var bgimgratio_w = $("#bgFullImage")[0].naturalWidth / $("#bgFullImage").width(); // get ratios of natural bg image compared to rendered bg image
           var bgimgratio_h = $("#bgFullImage")[0].naturalHeight / $("#bgFullImage").height();
           var canwidth = jcanvas.outerWidth(true);
           var canheight = jcanvas.height();
           jcanvas.attr("width", canwidth).attr("height", canheight);
           var canleft = jcanvas.offset().left;
           if (grabatbottom === true) {
              
              var cantop = $("#bgFullImage").height() + jcanvas.height();
            var cantop = $("#bgFullImage").height() - jcanvas.height();
           } else {
            if(tabWidth === 768) {
              //console.log('testing custom height!!!')
              bgimgratio_h = $("#bgFullImage")[0].naturalHeight / $("#bgFullImage").height();
              bgimgratio_h = bgimgratio_h - .1;
              //console.log(bgimgratio_h)
            }
            
            var cantop = jcanvas.offset().top - $("#bgFullImage").offset().top;
           }
           // console.log("canwidth= " + canwidth + " canheight= " + canheight + " canleft= " + canleft + " cantop= " + cantop)
           ctx.drawImage(document.getElementById('bgFullImage'),
               canleft * bgimgratio_w, cantop * bgimgratio_h, canwidth * bgimgratio_w, canheight * bgimgratio_h, 0, 0, canwidth, canheight);
    
          if ($(".boxshotRotator").hasClass("bsrFirstSeen")) {
            // setTimeout(function() {
              $(".boxshotRotator").addClass("bsrReadyForCarousel");
            // }, 5000)
          }
        }
    
      xsxFunctions.startCarousel =
        function() {
          bsrcarouselstarted = true;
          $(".boxesSlideInMarker").remove();
          if (navigator.userAgent.indexOf("Trident") === -1) {
            var startCarousel = setInterval(function() {
              if ($(".boxshotRotator").hasClass("bsrReadyForCarousel")) {
                var clickable_desktop = {"4": [3,4,5,6],
                                         "3": [2,3,4,5],
                                         "2": [1,2,3,4],
                                         "1": [0,1,2,3]
                                        }
                var clickable_tablet = {"4": [4,5,6],
                                        "3": [3,4,5],
                                        "2": [2,3,4],
                                        "1": [1,2,3],
                                        "0": [0,1,2]
                                       }
                var clickable_mobile = {"5":[6], "4":[5], "3":[4], "2":[3], "1":[2], "0":[1], "-1":[0]}
                $(".boxshotRotator").addClass("boxesSlideIn");
                $(".rotatorFullText p a").attr("tabindex", "0");
                // setTimeout(function() {
                  xsxFunctions.drawCenterBox(false);
                  $(".boxshotRotator").addClass("boxesSlideLeft");
                  $("#bgFullImage").closest("picture").css("opacity", "0");
                  $(".bsRotator").addClass("showDesc");
                  $(".boxViewArea").prepend('<button class="c-flipper c-glyph glyph-next skipanimnow" aria-label="skip carousel animation"></button>');
                  $(".boxViewArea .c-flipper.c-glyph.glyph-next").click(function() {
                    $(".boxshotRotator .allBoxes").addClass("bsrSkipAnim");
                    $(".boxViewArea").prepend('<button class="c-flipper f-previous" aria-label="navigate carousel images previous" aria-disabled="false"></button>');
                      $(".boxViewArea").append('<button class="c-flipper f-next inactivearrow" aria-label="navigate carousel images forward" aria-disabled="true"></button>');
                    $(".boxshotRotator .c-flipper.c-glyph.glyph-next").fadeOut();
                    // $(".boxViewArea .c-flipper.f-previous")[0].focus();
                    $(".boxesSlideLeft").removeClass("boxesSlideLeft");
                    // setTimeout(function() {
                      $(".boxViewArea").attr("data-boxpos", "3");
                      $(".bsrSkipAnim").removeClass("bsrSkipAnim");
                      $(".allBoxes").addClass("bsrBoxesTransition")
                      var dw = $(document).width();
                      if (dw >= 1084) {
                        clickable_desktop[3].forEach(function(num) {
                          $(".allBoxes a").eq(num).attr("tabindex", "0");
                        })
                      } else if (dw >= 768 && dw < 1084) {
                        clickable_tablet[3].forEach(function(num) {
                          $(".allBoxes a").eq(num).attr("tabindex", "0");
                        })
                      } else if (dw < 768) {
                        clickable_mobile[3].forEach(function(num) {
                          $(".allBoxes a").eq(num).attr("tabindex", "0");
                        })
                      }
                    // }, 600)
                    // $(".")
                  })
                  // setTimeout(function() {
                    if ($(".boxViewArea .c-flipper.f-previous").length === 0) {
                      $(".boxViewArea").prepend('<button class="c-flipper f-previous inactivearrow" aria-label="navigate carousel images previous" aria-disabled="true"></button>');
                      $(".boxViewArea").append('<button class="c-flipper f-next" aria-label="navigate carousel images forward" aria-disabled="false"></button>');
                      $(".boxshotRotator .c-flipper.c-glyph.glyph-next").fadeOut();
                      // $(".boxViewArea .c-flipper.f-previous")[0].focus();
                      $(".boxesSlideLeft").removeClass("boxesSlideLeft");
                      var dw = $(document).width();
                      if (dw >= 1084) {
                        $(".boxViewArea").attr("data-boxpos", "1")
                        clickable_desktop[1].forEach(function(num) {
                          $(".allBoxes a").eq(num).attr("tabindex", "0");
                        })
                      } else if (dw >= 768 && dw < 1084) {
                        $(".boxViewArea").attr("data-boxpos", "0")
                        clickable_tablet[0].forEach(function(num) {
                          $(".allBoxes a").eq(num).attr("tabindex", "0");
                        })
                      } else if (dw < 768) {
                        $(".boxViewArea").attr("data-boxpos", "-1")
                        clickable_mobile[-1].forEach(function(num) {
                          $(".allBoxes a").eq(num).attr("tabindex", "0");
                        })
                      }
                      setTimeout(function() {
                        $(".allBoxes").addClass("bsrBoxesTransition");
                      }, 600)
                    }
                  // }, 16000)
                // }, 2500)
                
                $(document).on("click", ".boxViewArea .c-flipper.f-previous", function() {
                  if ($(".carouselAnnounce").text().indexOf("carousel has") > -1) {
                    var announcetext = "carousel moved one item previous";
                  } else {
                    var announcetext = "carousel has moved one item previous";
                  }
                  
                  $(".boxViewArea .f-next").removeClass("inactivearrow").attr("aria-disabled", "false");
                  $(".boxViewArea .f-previous").removeClass("inactivearrow").attr("aria-disabled", "false");
                  var dw = $(document).width();
                  if (dw >= 1084) {
                    if ($(this).closest(".boxViewArea").attr("data-boxpos") === "4") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "3");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "3") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "2");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "2" || $(this).closest(".boxViewArea").attr("data-boxpos") === "1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "1");
                      $(".boxViewArea .f-previous").addClass("inactivearrow").attr("aria-disabled", "true");
                      announcetext = "carousel at beginning";
                    }
                    $(".allBoxes a").attr("tabindex", "-1");
                    var boxnum = $(this).closest(".boxViewArea").attr("data-boxpos");
                    clickable_desktop[boxnum].forEach(function(num) {
                      $(".allBoxes a").eq(num).attr("tabindex", "0");
                    })
                  } else if (dw >= 768 && dw < 1084) {
                    if ($(this).closest(".boxViewArea").attr("data-boxpos") === "4") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "3");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "3") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "2");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "2") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "1");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "1" || $(this).closest(".boxViewArea").attr("data-boxpos") === "0") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "0");
                      $(".boxViewArea .f-previous").addClass("inactivearrow").attr("aria-disabled", "true");
                      announcetext = "carousel at beginning";
                    }
                    $(".allBoxes a").attr("tabindex", "-1");
                    var boxnum = $(this).closest(".boxViewArea").attr("data-boxpos");
                    clickable_tablet[boxnum].forEach(function(num) {
                      $(".allBoxes a").eq(num).attr("tabindex", "0");
                    })
                  } else if (dw < 768) {
                    if ($(this).closest(".boxViewArea").attr("data-boxpos") === "5") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "4");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "4") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "3");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "3") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "2");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "2") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "1");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "0");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "0" || $(this).closest(".boxViewArea").attr("data-boxpos") === "-1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "-1");
                      $(".boxViewArea .f-previous").addClass("inactivearrow").attr("aria-disabled", "true");
                      announcetext = "carousel at beginning";
                    }
                    $(".allBoxes a").attr("tabindex", "-1");
                    var boxnum = $(this).closest(".boxViewArea").attr("data-boxpos");
                    clickable_mobile[boxnum].forEach(function(num) {
                      $(".allBoxes a").eq(num).attr("tabindex", "0");
                    })
                  }
                  $(".carouselAnnounce").text(announcetext);
                })
                $(document).on("click", ".boxViewArea .c-flipper.f-next", function() {
                  if ($(".carouselAnnounce").text().indexOf("carousel has") > -1) {
                    var announcetext = "carousel moved one item forward";
                  } else {
                    var announcetext = "carousel has moved one item forward";
                  }
                  $(".boxViewArea .f-next").removeClass("inactivearrow").attr("aria-disabled", "false");
                  $(".boxViewArea .f-previous").removeClass("inactivearrow").attr("aria-disabled", "false");
                  var dw = $(document).width();
                  if (dw >= 1084) {
                    if ($(this).closest(".boxViewArea").attr("data-boxpos") === "1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "2");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "2") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "3");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "3" || $(this).closest(".boxViewArea").attr("data-boxpos") === "4") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "4");
                      $(".boxViewArea .f-next").addClass("inactivearrow").attr("aria-disabled", "true");
                      announcetext = "carousel at end";
                    }
                    $(".allBoxes a").attr("tabindex", "-1");
                    var boxnum = $(this).closest(".boxViewArea").attr("data-boxpos");
                    clickable_desktop[boxnum].forEach(function(num) {
                      $(".allBoxes a").eq(num).attr("tabindex", "0");
                    })
                  } else if (dw >= 768 && dw < 1084) {
                    if ($(this).closest(".boxViewArea").attr("data-boxpos") === "3" || $(this).closest(".boxViewArea").attr("data-boxpos") === "4") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "4");
                      $(".boxViewArea .f-next").addClass("inactivearrow").attr("aria-disabled", "true");
                      announcetext = "carousel at end";
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "2") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "3");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "2");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "0") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "1");
                    }
                    $(".allBoxes a").attr("tabindex", "-1");
                    var boxnum = $(this).closest(".boxViewArea").attr("data-boxpos");
                    clickable_tablet[boxnum].forEach(function(num) {
                      $(".allBoxes a").eq(num).attr("tabindex", "0");
                    })
                  } else if (dw < 768) {
                    if ($(this).closest(".boxViewArea").attr("data-boxpos") === "4" || $(this).closest(".boxViewArea").attr("data-boxpos") === "5") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "5");
                      $(".boxViewArea .f-next").addClass("inactivearrow").attr("aria-disabled", "true");
                      announcetext = "carousel at end";
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "3") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "4");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "2") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "3");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "2");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "0") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "1");
                    } else if ($(this).closest(".boxViewArea").attr("data-boxpos") === "-1") {
                      $(this).closest(".boxViewArea").attr("data-boxpos", "0");
                    }
                    $(".allBoxes a").attr("tabindex", "-1");
                    var boxnum = $(this).closest(".boxViewArea").attr("data-boxpos");
                    clickable_mobile[boxnum].forEach(function(num) {
                      $(".allBoxes a").eq(num).attr("tabindex", "0");
                    })
                  }
                  $(".carouselAnnounce").text(announcetext);
                })
      
                var bgimg = $(".boxshotRotator picture").html().replace('id="bgFullImage"', '');
                $(bgimg).find("img").removeAttr("id");
                var hlcopy = $(".rotatorHeadline").html();
                var maincopy = $(".rotatorFullText").html().replace('c-heading-3', 'c-heading-4');
                $(".boxshotRotator").before('<div class="boxshotRotator bsrBackground" id="bsrAboveCarousel">' +
                  '<div class="high-contrast rotatorHeadline">' +
                    hlcopy +
                  '</div>' +
                  '<div class="high-contrast rotatorFullText">' +
                    maincopy +
                  '</div>' +
                  '<picture>' + bgimg + '</picture>' +
                 '<div class="bsrImageMaskDarkness"></div>')
                // $(".rotatorFullText p a")[0].focus();
                // setTimeout(function() {
                  $(".boxshotRotator").eq(1).find(".rotatorHeadline").remove();
                  $(".boxshotRotator").eq(1).find(".rotatorFullText").remove();
                // }, 3500)
      
                var btttop = $(".allBoxes").offset().top - 80;
                var currentoffset = $(document).scrollTop();
                if (currentoffset - btttop < 2000 && currentoffset - btttop > -1000) {
                  $("HTML, BODY").animate({
                      scrollTop: btttop
                  }, 500);
                }
                clearInterval(startCarousel);
              }
            }, 250)
          }
          // boxesSlideIn|0::^xsxFunctions.drawCenterBox&false,false|3500::boxesSlideLeft|3500
        }
      
      // $("#bgFullImage").on("load", function() {
       var checkbsrBg = setInterval(function() {
        // console.log($("#bgFullImage").width())
        if ($("#bgFullImage")[0] !== undefined && $("#bgFullImage")[0].naturalWidth > 0) {
         xsxFunctions.drawCenterBox(true);
         clearInterval(checkbsrBg);
        }
       }, 100)
      // })
      if ($("#bgFullImage")[0] !== undefined) {
        var pixelstoslide = ($("#bgFullImage").offset().top + $("#bgFullImage").height()) - ($("#bsrCanvas").offset().top + $("#bsrCanvas").height());
          $("body").append('<style>.boxshotRotator.boxesSlideIn #bgFullImage {animation: 3.5s bgSlideUp forwards;}' +
                  '@keyframes bgSlideUp {' +
                    'from {' +
                      'transform: translateY(0);opacity: 1;' +
                    '}' +
                    'to {' +
                      'transform: translateY(-' + pixelstoslide + 'px);opacity: 1;' +
                    '}' +
                  '}</style>')
      }
      
      // video source selection
      function selectVideoSizes() {
        var screenwidth = window.innerWidth;
        $("video[data-vidsource-desktop]").each(function() {
          $(this).attr("playsinline", "");
          if (screenwidth > 1083) {
            $(this).find("source").remove();
            $(this).append('<source src="' + $(this).attr("data-vidsource-desktop") + '" type="video/mp4">');
            $(this).attr("poster", $(this).attr("data-vidposter-desktop"));
        } else if (screenwidth >= 768 && screenwidth <= 1083) {
            $(this).find("source").remove();
            $(this).append('<source src="' + $(this).attr("data-vidsource-tablet") + '" type="video/mp4">');
            $(this).attr("poster", $(this).attr("data-vidposter-tablet"));
        } else if (screenwidth <= 767) {
            $(this).find("source").remove();
            $(this).append('<source src="' + $(this).attr("data-vidsource-mobile") + '" type="video/mp4">');
            $(this).attr("poster", $(this).attr("data-vidposter-mobile"));
        /*  } else if (screenwidth <= 767) {
            $(this).after('<img class="c-image" srcset="" src="' + $(this).attr("data-vidposter-mobile") + '">');
            $(this).remove();*/
          }
          $(this)[0].load();
          if ($(this).attr("autoplay") && $(this).attr("autoplay") !== "false") {
            $(this)[0].play();
          }
        })
      }
      selectVideoSizes();
      thewindowWidth = window.innerWidth;
    
      
        var windowresized = (function () {
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
          windowresized(function(){
            if ($("#bgFullImage")[0] !== undefined) {
            var pixelstoslide = ($("#bgFullImage").offset().top + $("#bgFullImage").height()) - ($("#bsrCanvas").offset().top + $("#bsrCanvas").height());
            $("body").append('<style>.boxshotRotator.boxesSlideIn #bgFullImage {animation: 3.5s bgSlideUp forwards;}' +
                    '@keyframes bgSlideUp {' +
                      'from {' +
                        'transform: translateY(0);opacity: 1;' +
                      '}' +
                      'to {' +
                        'transform: translateY(-' + pixelstoslide + 'px);opacity: 1;' +
                      '}' +
                    '}</style>')
            }
            var newww = window.innerWidth;
            if (thewindowWidth > 767 && newww < 768 || thewindowWidth > 767 && newww > 767 || thewindowWidth < 768 && newww > 767) {
              // console.log("running video sizes" + thewindowWidth + " " + newww)
              selectVideoSizes();
            }
            thewindowWidth = newww;
          }, 400, "pageresize");
        });
      // end video source selection
    
      //faq section
      var popFaqStructuredData = (function() {
        var newQnum = 1;
        $(".faq-mwf .c-drawer").each(function() {
          var newId = "row-" + newQnum.toString();
          $(this).find("button").attr("aria-controls", newId);
          $(this).find("div").attr("id", newId);
          newQnum++;
        })
        var qatext = "";
        var qnum = $(".faq-mwf .c-drawer").length;
        for (var i = 1; i <= qnum; i++) {
          var theQ = $("[aria-controls='row-" + i + "'] p").html().replace(/"/g,"'");
          var theA = $("#row-" + i + " p").html().replace(/"/g,"'");
          qatext+= '{"@type": "Question",' +
                       '"name": "' + theQ + '",' +
                       '"acceptedAnswer": {' +
                         '"@type": "Answer",' +
                         '"text": "' + theA + '"   }}'
          if (i !== qnum) { qatext+= ", ";}
        }
        $("body").append('<sc' + 'ript type="application/ld+json"> {' +
                           '"@context": "https://schema.org",' +
                           '"@type": "FAQPage",' +
                           '"mainEntity": [' + qatext + ']}' +
                          '</sc' + 'ript>')
      })();
      //end faq section
    
    
    // imgscrubber temp deactivate
    $(".rsImage1").remove();
    $(".rsImage2").remove();
    $(".rsImage3").removeClass("rsImage3");
    
    
    // hide hero
    
      xsxFunctions.toggleHero = function() {
    
          $(".page-hero").toggleClass("unstick");
      }
    /*
      xsxFunctions.showHero = function() {
    
          $(".page-hero").removeClass("hide-me");
      }
    */
      xsxFunctions.stickyHero= function() {
        $(".page-hero").removeClass("unstick");
      }
  
      // if ($(".boxshotRotator h2").length > 0) {
      //   $(".boxshotRotator h2").attr("tabindex", "0");
      //   $(".boxshotRotator h2")[0].addEventListener("focus", function() {
      //     // setTimeout(function() {
      //       $(".boxshotRotator h2").attr("tabindex", "-1");
      //       $(".rotatorFullText p a")[0].focus();
      //       // setTimeout(function() {
      //         if (bsrcarouselstarted === false) {
      //           xsxFunctions.startCarousel();
      //         }
      //       // }, 1500)
      //       // setTimeout(function() {
      //         $(".skipanimnow")[0].focus();
      //       // }, 8500)
      //     // }, 20)
      //   })
      // }
    
    if (navigator.userAgent.indexOf("Trident") !== -1) { // 4k section for IE
      var bgimg = $(".boxshotRotator picture").html().replace('id="bgFullImage"', '');
      $(bgimg).find("img").removeAttr("id");
      var hlcopy = $(".rotatorHeadline").html();
      var maincopy = $(".rotatorFullText").html().replace('c-heading-3', 'c-heading-4');
      $(".boxshotRotator").before('<div class="boxshotRotator bsrBackground" id="bsrAboveCarousel">' +
        '<div class="high-contrast rotatorHeadline">' +
          hlcopy +
        '</div>' +
        '<div class="high-contrast rotatorFullText">' +
          maincopy +
        '</div>' +
        '<picture>' + bgimg + '</picture>' +
       '<div class="bsrImageMaskDarkness"></div>')
    
      $(".boxshotRotator").addClass("bsrBackground").addClass("bsrFirstSeen").addClass("lightenMask").addClass("removeMask")
                          .addClass("bsrReadyForCarousel").addClass("boxesSlideIn");
      $(".bsRotator").addClass("showDesc");
    
      $("body").append('<style>' +
          '.centerBoxLink {pointer-events: all !important;}' +
          '.boxshotRotator.boxesSlideIn .leftBoxes {animation: leftIn 0s forwards;left:calc(41.64vw - 32px);}' +
          '.boxshotRotator.boxesSlideIn .rightBoxes {animation: rightIn 0s forwards;}' +
          '@media screen and (min-width: 768px) and (max-width: 1083px) {' +
            '.boxshotRotator.boxesSlideIn .leftBoxes {left:calc(54.68vw - 32px);}' +
          '}' +
          '@media screen and (max-width: 767px) {' +
            '.boxshotRotator.boxesSlideIn .leftBoxes {left:calc(141.32vw + -32px);}' +
          '}' +
        '</style>')
    }
    if (document.URL.toLowerCase().indexOf("series-x") > -1) {
      xsxFunctions.startCarousel();
      $(".boxshotRotator").addClass("bsrFirstSeen");
      xsxFunctions.drawCenterBox(true);
      $(".boxshotRotator").addClass("lightenMask");
      $(".boxshotRotator").addClass("removeMask");
    }
    
    setTimeout(function() {
        $(".boxshotRotator.bsrBackground:nth-of-type(2) > picture > img").attr({"alt" : "" , "aria-hidden" : "true"});
        $(".bsrImageMaskDarkness").attr({"tabindex" : "-1" , "aria-hidden" : "true", "role" : "presentation", "aria-live" : "off"});
      }, 2000);

  });
    