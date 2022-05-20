$(document).ready(function() {
    function runXlax() {
      if ($(document).width() > 767) {
        var docwidth = $(document).width();
        xlaxResetContainers = {};
        $("[data-xlax]").addClass("xlaxItem");
        $("[data-xlax-horizontal]").addClass("xlaxItem");
        $("[data-xlax*='::']").addClass("fadehiddenOffscreen");
        $("body").append('<style>' +
          '.fadehiddenOffscreen {opacity:0;}' +
          '</style>')
        var oldpos;
        var newpos;
        var winheight;
        var fadeedgeperc = .32; // 1 = 100% of window height
        var fadeedgeborder = 180; // pixels of border zone where container is invisible, very top and very bottom
        var fadeheight;
        var fadetoplimits = {};
        fadetoplimits.top = 0;
        fadetoplimits.dead = 0;
        fadetoplimits.bottom = 0;
        var fadebotlimits = {};
        fadebotlimits.top = 0;
        fadebotlimits.dead = 0;
        fadebotlimits.bottom = 0;
  
        var brightedgeperc = .67; // 1 = 100% of window height
        var brightedgeborder = 600; // pixels of border zone where container is invisible, very top and very bottom
        var brightheight;
        var brighttoplimits = {};
        brighttoplimits.top = 0;
        brighttoplimits.dead = 0;
        brighttoplimits.bottom = 0;
        var brightbotlimits = {};
        brightbotlimits.top = 0;
        brightbotlimits.dead = 0;
        brightbotlimits.bottom = 0;
  
        $(window).on("load", function() {
          xlaxSetup();
        })
        $(window).on("scroll", function() {
          if (noXlaxFlag === false) {
            xlaxSetup();
          } 
        })
  
        function xlaxSetup() {
          if ($(".xlaxActive").length > 0 || $(".xlaxToReset").length > 0) {
            if (newpos === undefined) {
              oldpos = $(window).scrollTop();
            } else {
              oldpos = newpos;
            }
            newpos = $(window).scrollTop();
            posdif = newpos - oldpos;
  
            winheight = $(window).height();
            fadeheight = winheight * fadeedgeperc;
            fadetoplimits.top = $(window).scrollTop();
            fadetoplimits.dead = $(window).scrollTop() + fadeedgeborder;
            fadetoplimits.bottom = $(window).scrollTop() + fadeedgeborder + fadeheight;
            fadebotlimits.top = $(window).scrollTop() + winheight - fadeedgeborder - fadeheight;
            fadebotlimits.dead = $(window).scrollTop() + winheight - fadeedgeborder;
            fadebotlimits.bottom = $(window).scrollTop() + winheight;
  
            brightheight = winheight * brightedgeperc;
            brighttoplimits.top = $(window).scrollTop();
            brighttoplimits.dead = $(window).scrollTop() + brightedgeborder;
            brighttoplimits.bottom = $(window).scrollTop() + brightedgeborder + brightheight;
            brightbotlimits.top = $(window).scrollTop() + winheight - brightedgeborder - brightheight;
            brightbotlimits.dead = $(window).scrollTop() + winheight - brightedgeborder;
            brightbotlimits.bottom = $(window).scrollTop() + winheight;
            xlax();
          }
        }
  
        function xlax() {
          $(".xlaxActive").each(function(cont) {
            var dir = -1; // user scrolling up
            if (posdif > 0) {
              dir = 1; // user scrolling down
            }
            if ($(this).attr("data-xlax")) {
              var speed = parseInt($(this).attr("data-xlax"));
              if (docwidth < 1084 && $(this).attr("data-xlax-tablet-speed")) {
                speed = parseInt($(this).attr("data-xlax-tablet-speed"));
              }
              var edgefade = false;
              if ($(this).attr("data-xlax").indexOf("::") > -1) {
                edgefade = true;
              }
              var edgebrighten = false;
              if ($(this).attr("data-xlax").indexOf("&&") > -1) {
                edgebrighten = true;
              }
              var currenttop = getComputedStyle($(this)[0]).transform;
              if (currenttop === "none") { 
                currenttop = 0 
              } else {
                currenttop = parseFloat(getComputedStyle($(this)[0]).transform.split(",")[5]);
              }
              var changefactor = posdif * (dir * ((-1 * speed) / 100));  
  
              var topchange = currenttop + (dir * changefactor);
              //console.log(posdif)
              // if (posdif > 80) {
              //   topchange = currenttop;
              // } else if (posdif < -60) {
              //   topchange = currenttop;
              // }    
              // if (posdif < 25 && posdif > -25) {
              //   $(this).css("transform", "translate3d(0," + topchange + "px,0");
              // }
            } else {
              var currenttop = getComputedStyle($(this)[0]).transform;
              if (currenttop === "none") { 
                currenttop = 0 
              } else {
                currenttop = parseFloat(getComputedStyle($(this)[0]).transform.split(",")[5]);
              }
              var topchange = currenttop;
            }
  
            // horizontal parallax
            if ($(this).attr("data-xlax-horizontal")) {
              var speedh = parseInt($(this).attr("data-xlax-horizontal"));
              if (docwidth < 1084 && $(this).attr("data-xlax-horizontal-tablet-speed")) {
                speedh = parseInt($(this).attr("data-xlax-horizontal-tablet-speed"));
              }
              var currentleft = getComputedStyle($(this)[0]).transform;
              if (currentleft === "none") { 
                currentleft = 0 
              } else {
                currentleft = parseFloat(getComputedStyle($(this)[0]).transform.split(",")[4]);
              }
              var changefactorh = posdif * (dir * ((speedh) / 100));  
  
              var leftchange = currentleft + (dir * changefactorh);
              //console.log(posdif)
              // if (posdif > 80) {
              //   topchange = currenttop;
              // } else if (posdif < -60) {
              //   topchange = currenttop;
              // }    
              
            } else {
              var currentleft = getComputedStyle($(this)[0]).transform;
              if (currentleft === "none") { 
                currentleft = 0 
              } else {
                currentleft = parseFloat(getComputedStyle($(this)[0]).transform.split(",")[4]);
              }
              var leftchange = currentleft;
            }
  
            if (posdif < 100 && posdif > -100) { // was 25 -25
              $(this).css("transform", "translate3d(" + leftchange + "px," + topchange + "px,0");
            }
  
            if (edgefade === true) {
              var conttop = $(this).offset().top;
              var contbot = conttop + $(this).height();
              if (contbot <= fadetoplimits.dead || conttop >= fadebotlimits.dead) {
                $(this).css("opacity", "0");
              } else if (contbot > fadetoplimits.dead && contbot < fadetoplimits.bottom) { // within top fade zone
                var distfromtop = contbot - fadetoplimits.dead;
                var percdist = distfromtop / fadeheight;
                $(this).css("opacity", percdist);
              } else if (conttop > fadebotlimits.top && conttop < fadebotlimits.dead) { // within bottom fade zone
                var distfrombottom = fadebotlimits.dead - conttop;
                var percdist = distfrombottom / fadeheight;
                $(this).css("opacity", percdist);
              } else if (contbot > fadetoplimits.bottom && conttop < fadebotlimits.top) {
                $(this).css("opacity", "1");
              } else {
                $(this).css("opacity", "0");
              }
            }
  
            if (edgebrighten === true) {
              var conttop = $(this).offset().top;
              var contbot = conttop + $(this).height();
              if (contbot <= brighttoplimits.dead) {
                $(this).css("filter", "brightness(1)");
              } else if (contbot > brighttoplimits.dead && contbot < brighttoplimits.bottom) { // within top bright zone
                var distfromtop = contbot - brighttoplimits.dead;
                var percdist = 1 - ((distfromtop / brightheight) * .7) ;
                $(this).css("filter", "brightness(" + percdist + ")");
              // } else if (conttop > brightbotlimits.top && conttop < brightbotlimits.dead) { // within bottom bright zone
              //   var distfrombottom = brightbotlimits.dead - conttop;
              //   var percdist = distfrombottom / brightheight;
              //   $(this).css("opacity", percdist);
              } else if (contbot > brighttoplimits.bottom && conttop < brightbotlimits.top) {
                $(this).css("filter", "brightness(.3)");
              } else {
                $(this).css("filter", "brightness(.3)");
              }
            }
          })
  
          // out of viewport reset
          $(".xlaxToReset").each(function() {
            if (!$(this).hasClass("xlaxActive")) {
              var rid = $(this).attr("data-xlax-toreset");
              if (fadebotlimits.bottom < xlaxResetContainers[rid].top) {
                // $(this).css("transform", "");
                $(this).css("transform", "translate3d(" + xlaxResetContainers[rid].originalleft + "px," + xlaxResetContainers[rid].originaltransform + "px,0)");
              } else if (newpos > xlaxResetContainers[rid].bottom) { // below the container, reset as if scrolled down
                // $(this).css("transform", "");
                $(this).css("transform", "translate3d(" + xlaxResetContainers[rid].originalleft + "px," + xlaxResetContainers[rid].belowadjust + "px,0)");
              }
              // $(this).removeAttr("data-xlax-toreset").removeClass("xlaxToReset");
              $(this).removeClass("xlaxToReset");
              // console.log("reset container " + rid)
              // delete xlaxResetContainers[rid];
            }
          })
        }
  
        // intersection observer
        var intobsMarkers = document.querySelectorAll(".xlaxItem");
        var resetid = 1;
  
        var markerOptions = {
          threshold: .01,
          rootMargin: "0px 0px 0px 0px"
        };
  
        var markerObserver = new IntersectionObserver(function (entries, marker) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              $(entry.target).removeClass("xlaxActive");
              // $(entry.target).css("transform", "translateY(0px)");
              // return;
            } else {
              // console.log("XboxParallax Marker intersecting! " + entry.target)
              if (!$(entry.target).attr("data-xlax-toreset")) {
                $(entry.target).attr("data-xlax-toreset", resetid);
                xlaxResetContainers[resetid] = {};
                var resettop = $(entry.target).offset().top;
                var resetbot = resettop + $(entry.target).height();
                var originaltransform = getComputedStyle($(entry.target)[0]).transform;
                if (originaltransform === "none") { 
                  originaltransform = 0;
                  originalleft = 0;
                } else {
                  originaltransform = parseFloat(getComputedStyle($(entry.target)[0]).transform.split(",")[5]);
                  originalleft = parseFloat(getComputedStyle($(entry.target)[0]).transform.split(",")[4]);
                }
                var spd = parseInt($(entry.target).attr("data-xlax"));
                if (docwidth < 1084 && $(entry.target).attr("data-xlax-tablet-speed")) {
                  spd = parseInt($(entry.target).attr("data-xlax-tablet-speed"));
                }
                if (spd === NaN) {spd = 0}
                var belowadjust = $(window).height() * ((-1 * spd) / 100) + originaltransform;
                xlaxResetContainers[resetid].top = resettop;
                xlaxResetContainers[resetid].bottom = resetbot;
                xlaxResetContainers[resetid].originaltransform = originaltransform;
                xlaxResetContainers[resetid].originalleft = originalleft;
                xlaxResetContainers[resetid].belowadjust = belowadjust;
                resetid++;
              }
  
              $(entry.target).addClass("xlaxActive").addClass("xlaxToReset");
              // marker.unobserve(entry.target);
            }
          });
        }, markerOptions);
  
        intobsMarkers.forEach(function (marker) {
          markerObserver.observe(marker);
        });
        // end intersection observer
      }
    }
  
    if (navigator.userAgent.indexOf("Trident") === -1) {
      runXlax();
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
          $(".xlaxItem").removeAttr("style");
          $(".xlaxItem").removeClass("xlaxItem");
          $(".fadehiddenOffscreen").removeClass("fadehiddenOffscreen");
          $(".xlaxActive").removeClass("xlaxActive");
          $(".xlaxToReset").removeClass("xlaxToReset");
          $("[data-xlax-toreset]").removeAttr("data-xlax-toreset");
          xlaxResetContainers = {};
          $(window).off("scroll");
          runXlax();
        }, 400, "pageresize");
      });
    } else {
      noXlax();
    }

    function noXlax() {
      if ($(window).width() > 767) {
        $("[data-xlax]").each(function() {
          if ($(this).attr("data-xlax").indexOf("-") === -1) {
            if (getComputedStyle($(this)[0]).top === "auto" || getComputedStyle($(this)[0]).top === "0px") {
              $(this).css("top", "-20px");
            }
          } else {
            if (getComputedStyle($(this)[0]).top === "auto" || getComputedStyle($(this)[0]).top === "0px") {
              $(this).css("top", "20px");
            }
          }
        })
      }
    }

    function tabNoXlax() {
      if ($(window).width() > 767) {
        $("[data-xlax]").not(".m-hero-item.f-y-center.f-x-center>div>div").each(function() {
          $(this).css("transform", "translate3d(0px, 0px, 0px)");
        })
        $("[data-xlax]").each(function() {
          $(this).css("opacity", "1");
        })
      }
    }

    noXlaxFlag = false;
    $(document).on("keydown", function(e) {
      if (e.keyCode === 9) {
        noXlaxFlag = true;
        tabNoXlax();
      }
    })

  });


// custom hero adjustment. IO not reliable.
// fire right away for quick scrollers
if ($(window).scrollTop() > 1800) {
    $(".page-hero").addClass("unstick");
}
setInterval(function() {
    if ($(".page-hero").length) {
        if ($(window).scrollTop() > 1800) {
            $(".page-hero").addClass("unstick");
        } else {
            $(".page-hero").removeClass("unstick");
        }
    }
}, 1000);