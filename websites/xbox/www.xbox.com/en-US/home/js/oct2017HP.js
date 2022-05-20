var SCROLLTHRESHOLD = .01; 

$(document).ready(function() {
    if ($(window).width() >= 1068) { //Should be 1084, not sure why but this is working.
        setTimeout(slidingTiles, 1000);
    }
window.onresize = function(event) {
    if ($(window).width() >= 1068) {
        slidingTiles();
    }
}

});

function slidingTiles() {
    $(".hp-mosaic li.slide").each(function(index) {
        var currentElement = $(this);
        var visLoc = visibility(currentElement)[1];
        var isVisible = currentElement.data("mosaic");
        if (isVisible === false && visLoc > SCROLLTHRESHOLD) {
            currentElement.css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 });
            currentElement.css("top", "0px");
            currentElement.data("mosaic", "true");
        }
        $(window).scroll(function() {
            var visLoc = visibility(currentElement)[1];
            var isVisible = currentElement.data("mosaic");
            if (isVisible === false && visLoc > SCROLLTHRESHOLD) {
                currentElement.css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 });
                currentElement.data("mosaic", "true");
                currentElement.animate({ top: '0px' });
            }
        });
    });
}

//This function returns 0 if the element is completely below the viewport, 1 if the element is completely above the viewport, and a decimal value between
//0 and 1 based on the element's current location in the viewport.
function visibility(obj) {

    var winw = jQuery(window).width(),
        winh = jQuery(window).height(),
        elw = obj.width(),
        elh = obj.height(),
        o = obj[0].getBoundingClientRect(),
        x1 = o.left - winw,
        x2 = o.left + elw,
        y1 = o.top - winh,
        y2 = o.top + elh;

    return [
        Math.max(0, Math.min((0 - x1) / (x2 - x1), 1)),
        Math.max(0, Math.min((0 - y1) / (y2 - y1), 1))
    ];
}

//This function takes in the value v, and if it is less than min it returns min, and if it is more than max it 
//returns max. Otherwise, it returns v.
function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

//This function returns the offset of the element from the top left corner of the page, not the viewport.
function offset(element) {
    var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


// RTL to LTR fix 
if ((urlRegion == "ar-ae") || (urlRegion == "ar-sa") || (urlRegion == "he-il")) {
 $("html").attr("dir", "ltr");
 $(".uhf-header").attr("dir", "rtl");
}