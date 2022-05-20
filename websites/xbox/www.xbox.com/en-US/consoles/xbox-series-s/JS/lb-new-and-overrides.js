$(document).ready(function() {
  function rfaText() {
    if (window.innerWidth > 1083) {
      var texttop = $(".readyForActionHeading").offset().top;
      var winheight = $(window).height();
      var winwidth = window.innerWidth;
      var multiplier = .5;
      $(window).on("scroll", function() {
        var winposTop = $(window).scrollTop();
        if (winwidth > 1400) {
          multiplier = .4; // what percent down from top should change happen?
          if (texttop < winposTop + (winheight * multiplier)) {
            $(".readyForActionHeading").addClass("black-c");
          } else {
            $(".readyForActionHeading").removeClass("black-c");
          }
        } else {
          multiplier = .52; // what percent down from top should change happen?
          if (texttop < winposTop + (winheight * multiplier)) {
            $(".readyForActionHeading").addClass("black-c");
          } else {
            $(".readyForActionHeading").removeClass("black-c");
          }
        }
      })
    }
  }
  rfaText();
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
      $(".readyForActionHeading.black-c").removeClass("black-c");
      rfaText();
    }, 400, "pageresize");
  });

  // turn off redefine speed 2nd video for row
  var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
  if (urlRegion !== "en-us") {
    $(".small-video").eq(0).find(".svPlayButton").remove();
    $(".small-video").eq(0).find(".OttoGallery").css("pointer-events", "none").attr("tabindex", "-1");
  }
  if (urlRegion !== "en-us") {
    $(".small-video").eq(1).find(".svPlayButton").remove();
    $(".small-video").eq(1).find(".OttoGallery").css("pointer-events", "none").attr("tabindex", "-1");

  }
})