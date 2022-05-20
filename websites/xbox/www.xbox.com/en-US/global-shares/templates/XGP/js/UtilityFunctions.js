//detect viewport
containerPercentVisible = function(container, varname) {
    if (typeof containerPercent === "undefined") {
        containerPercent = {};
    }
    if (typeof containerPercent[varname] !== "undefined") {
        var e = new Error('Container Percent Visible Variable name "' + varname + '" already in use, please choose another name.');
        throw e
    } else {
        containerPercent[varname] = 0;
    }
    $(window).on("load", function() {
        calcPercent();
    });
    $(window).on("scroll", function() {
        calcPercent();
    });

    function calcPercent() {
        var winHeight = $(window).height();
        var winTopPosition = $(window).scrollTop();
        var winBottomPosition = winTopPosition + winHeight;
        var contHeight = $(container).height();
        var contTopPosition = $(container).offset().top;
        var contBottomPosition = contTopPosition + contHeight;
        if (winTopPosition > contTopPosition) {
            var topCutOff = winTopPosition - contTopPosition;
            if (topCutOff > contHeight) {
                topCutOff = contHeight;
            }
        } else {
            var topCutOff = 0;
        }
        if (winBottomPosition < contBottomPosition) {
            var bottomCutOff = contBottomPosition - winBottomPosition;
            if (bottomCutOff > contHeight) {
                bottomCutOff = contHeight;
            }
        } else {
            var bottomCutOff = 0;
        }
        var totalCutOff = topCutOff + bottomCutOff;
        var percentVisible = parseFloat((contHeight - totalCutOff)/contHeight * 100).toFixed(2);
  containerPercent[varname] = parseFloat(percentVisible);
  //console.log(varname + " " + containerPercent[varname]);
    }
}

//detect viewport with offset (percent)
containerPercentVisibleWithOffset = function(container, varname, offset) {
    if (typeof containerPercentWithOffset === "undefined") {
        containerPercentWithOffset = {};
    }
    if (typeof containerPercentWithOffset[varname] !== "undefined") {
        var e = new Error('Container Percent Visible With Offset Variable name "' + varname + '" already in use, please choose another name.');
        throw e
    } else {
        containerPercentWithOffset[varname] = 0;
    }
    $(window).on("load, scroll", function() {
        calcPercent();
    });

    function calcPercent() {
        var winHeight = $(window).height();
//console.log("winHeight  " + winHeight);

        var offsetpx = Math.floor(winHeight * (offset / 100));
//console.log("offsetpx  " + offsetpx);

        var winTopPosition = $(window).scrollTop() + offsetpx;
//console.log("winTopPosition  " + winTopPosition);

        var winBottomPosition = winTopPosition + winHeight + offsetpx;
//console.log("winBottomPosition  " + winBottomPosition);

        var contHeight = $(container).height();
//console.log(container + " contHeight  " + contHeight);

        var contTopPosition = $(container).offset().top;//changed from position();
//console.log(container + " contTopPosition  " + contTopPosition);

        var contBottomPosition = contTopPosition + contHeight;
//console.log(container + " contBottomPosition  " + contBottomPosition);

        if (winTopPosition > contTopPosition) {
            var topCutOff = winTopPosition - contTopPosition;
            if (topCutOff > contHeight) {
                topCutOff = contHeight;
//console.log("topCutOff  " + topCutOff);
            }
        } else {
            var topCutOff = 0;
//console.log("topCutOff  " + topCutOff);
          }
        if (winBottomPosition < contBottomPosition) {
            var bottomCutOff = contBottomPosition - winBottomPosition;
//console.log("topCutOff  " + topCutOff);
            if (bottomCutOff > contHeight) {
                bottomCutOff = contHeight;
//console.log("topCutOff  " + topCutOff);
            }
        } else {
            var bottomCutOff = 0;
//console.log("topCutOff  " + topCutOff);
        }
        var totalCutOff = topCutOff + bottomCutOff;
//console.log("totalCutOff  " + totalCutOff);

        var percentVisible = parseFloat((contHeight - totalCutOff)/contHeight * 100).toFixed(2);
//console.log("percentVisible  " + percentVisible);

        containerPercentWithOffset[varname] = parseFloat(percentVisible);
    }
}

//parallax
function parallaxForeground(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove) { // container to move, spd of plx, plx dir scrolling down ("up" or "down"), plx dir scrolling up ("up" or "down", max displacement in px
  var oldpos = {};
  var newpos = {};
  oldpos[container] = $(window).scrollTop();
  newpos[container] = $(window).scrollTop();
  var posdif = {};
  posdif[container] = 0;
  var topchange = {};
  topchange[container] = 0;
  var direction = {};
  $(window).on("load", function() {
    topPosition(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove);
  })
  $(window).on("scroll", function() {
    topPosition(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove);
  })
  function topPosition(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove) {
    (function() {
      var perc = containerPercent[parentvar];
      if (perc > 0) {
        oldpos[container] = newpos[container];
        newpos[container] = $(window).scrollTop();
        posdif[container] = (newpos[container] - oldpos[container]) * speed;
        if (newpos[container] > oldpos[container]) { // user scrolls down
          if (dirscrolldown === dirscrollup) {
            topchange[container] = ((perc * speed)/100) * maxmove;
            if (dirscrolldown === "up") {
              var direction = "-"
            } else {
              var direction = "";
            }
          } else if (dirscrolldown === "down") { 
            topchange[container] = topchange[container] + posdif[container]; 
            var direction = "";
          } else { 
            topchange[container] = topchange[container] - posdif[container]; 
            var direction = "";
          }
        } else { // user scrolls up
          if (dirscrolldown === dirscrollup) {
            topchange[container] = ((perc * speed)/100) * maxmove;
            if (dirscrolldown === "up") {
              var direction = "-"
            } else {
              var direction = "";
            }
          } else if (dirscrollup === "down") { 
            topchange[container] = topchange[container] - posdif[container]; 
            var direction = "";
          } else { 
            topchange[container] = topchange[container] + posdif[container];
            var direction = "";
          }
        }
        if (topchange[container] > maxmove) { topchange[container] = maxmove }
        if (topchange[container] < -1 * maxmove) { topchange[container] = -1 * maxmove}
      }  else {
        oldpos[container] = newpos[container];
        newpos[container] = $(window).scrollTop();
        topchange[container] = 0
      }
      $(container).css("top", direction + topchange[container] + "px");
    })(container);
  };
}

containerPercentVisible2 = function(container, varname) {
    if (typeof containerPercent2 === "undefined") {
      containerPercent2 = {};
    }
    if (typeof containerPercent2[varname] !== "undefined") {
      var e = new Error('Container Percent Visible Variable name "' + varname + '" already in use, please choose another name.');
      throw e
    } else {
      containerPercent2[varname] = 0;
    }
    (function() {
      calcPercent();
    })();
    $(window).on("scroll", function() {
      calcPercent();
    });

    function calcPercent() {
      var winHeight = $(window).height();
      var winTopPosition = $(window).scrollTop();
      var winBottomPosition = winTopPosition + winHeight;
      var contHeight = $(container).height();
      var contTopPosition = $(container).offset().top;
      var contBottomPosition = contTopPosition + contHeight;
      if (winTopPosition > contTopPosition) {
        var topCutOff = winTopPosition - contTopPosition;
        if (topCutOff > contHeight) {
          topCutOff = contHeight;
        }
      } else {
        var topCutOff = 0;
      }
      if (winBottomPosition < contBottomPosition) {
        var bottomCutOff = contBottomPosition - winBottomPosition;
        if (bottomCutOff > contHeight) {
          bottomCutOff = contHeight;
        }
      } else {
        var bottomCutOff = 0;
      }
      var totalCutOff = topCutOff + bottomCutOff;
      var percentVisible = parseFloat((contHeight - totalCutOff)/contHeight * 100).toFixed(2);
      containerPercent2[varname] = parseFloat(percentVisible);
    }
  }

containerPercentScrolled = function(container, varname, addedarea) {
    if (typeof containerScrolled === "undefined") {
      containerScrolled = {};
    }
    if (typeof containerScrolled[varname] !== "undefined") {
      var e = new Error('Container Percent Scrolled Variable name "' + varname + '" already in use, please choose another name.');
      throw e
    } else {
      containerScrolled[varname] = 0;
    }
    $(window).on("load", function() {
      calcPercent();
    });
    $(window).on("scroll", function() {
      calcPercent();
    });

    function calcPercent() {
      var winHeight = $(window).height();
//console.log("winHeight  " + winHeight);

      var winTopPosition = $(window).scrollTop();
//console.log("winTopPosition  " + winTopPosition);

      var winBottomPosition = winTopPosition + winHeight;
      var contHeight = $(container).height() + addedarea;
//console.log("contHeight  " + contHeight);

      var contTopPosition = $(container).offset().top;
//console.log("contTopPosition  " + contTopPosition);

      var contBottomPosition = contTopPosition + contHeight;
      if (winBottomPosition > contTopPosition) {
        var areaSeen = winBottomPosition - contTopPosition;
        if (areaSeen > contHeight) {
          var percentVisible = 100;
        } else {
          var percentVisible = (areaSeen / contHeight) * 100;
        }
      } else {
        var percentVisible = 0;
      }
      containerScrolled[varname] = parseFloat(percentVisible);
    }
  }

function parallaxForeground2(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove) { // container to move, spd of plx, plx dir scrolling down ("up" or "down"), plx dir scrolling up ("up" or "down", max displacement in px
  var oldpos = {};
  var newpos = {};
  oldpos[container] = $(window).scrollTop();
  newpos[container] = $(window).scrollTop();
  var posdif = {};
  posdif[container] = 0;
  var topchange = {};
  topchange[container] = 0;
  var direction = {};
  $(window).on("load", function() {
    topPosition(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove);
  })
  $(window).on("scroll", function() {
    topPosition(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove);
  })
  function topPosition(container, parentvar, speed, dirscrolldown, dirscrollup, maxmove) {
    (function() {
      var perc = containerScrolled[parentvar];
      if (perc > 0) {
        oldpos[container] = newpos[container];
        newpos[container] = $(window).scrollTop();
        posdif[container] = (newpos[container] - oldpos[container]) * speed;
        if (newpos[container] > oldpos[container]) { // user scrolls down
          if (dirscrolldown === dirscrollup) {
            topchange[container] = ((perc * speed)/100) * maxmove;
            if (dirscrolldown === "up") {
              var direction = "-"
            } else {
              var direction = "";
            }
          } else if (dirscrolldown === "down") { 
            topchange[container] = topchange[container] + posdif[container]; 
            var direction = "";
          } else { 
            topchange[container] = topchange[container] - posdif[container]; 
            var direction = "";
          }
        } else { // user scrolls up
          if (dirscrolldown === dirscrollup) {
            topchange[container] = ((perc * speed)/100) * maxmove;
            if (dirscrolldown === "up") {
              var direction = "-"
            } else {
              var direction = "";
            }
          } else if (dirscrollup === "down") { 
            topchange[container] = topchange[container] - posdif[container]; 
            var direction = "";
          } else { 
            topchange[container] = topchange[container] + posdif[container];
            var direction = "";
          }
        }
        if (topchange[container] > maxmove) { topchange[container] = maxmove }
        if (topchange[container] < -1 * maxmove) { topchange[container] = -1 * maxmove}
      }  else {
        oldpos[container] = newpos[container];
        newpos[container] = $(window).scrollTop();
        topchange[container] = 0
      }
      $(container).css("transform", "translateY(" + direction + topchange[container] + "px)");
    })(container);
  };
}

