$(document).ready(function() {
    var multiProcess;
    // fix nav on resize
    $(window).resize(function() {
        var newWidth = $(document).width();
        if (newWidth > 767) {
            navFix = setTimeout(function() {
                // reset inline styles above mobile to bring everything back on the screen
                $(".apps-template .m-multi-feature li").attr("style", "");
            }, 250);
            //clearTimeout(navFix);
        }
        multiProcess = setTimeout(function() {
            processResize(newWidth);
        }, 300);
    });

    // make custom multi-feature accessible to screen readers
    // get rid of legacy markup programmatically
    $(".apps-template .m-multi-feature .c-pivot li img").remove();
    $(".apps-template .m-multi-feature .c-pivot li").attr("aria-label","");

    $(".apps-template .m-multi-feature .c-pivot li").each(function() {
        $(this).contents().eq(0).wrap('<span></span>');
    });

    $(".apps-template .m-multi-feature").each(function() {
        // put tabs and text in arrays.
        var pivotTabs = $(this).find(".c-pivot li");
        var pivotText = $(this).find("section[role='tabpanel'] p");
        // text is contained inside the LI for flexibility and flow.
        // This loop copies and appends the text to LI.
        for (i = 0; i < pivotText.length; i++) {
            copiedText = '<p class="c-paragraph">' + pivotText[i].innerHTML + '</p>';
            $(pivotTabs[i]).append(copiedText);
        }
        // Text exists in one place in the HTML, two places on the page, but one or the other is hidden at all times.
    });

    processResize = function(newWidth) {
        //reset everything we changed last time
        $(".m-multi-feature > section .c-pivot").attr("style", "");
        $(".c-pivot .c-flipper").attr("style", "");
        $(".c-pivot section").attr("style", "");
 
        // adjust flipper height at mobile
        $(".c-pivot ul[role='tablist'").each(function() {
            tabList = $(this);
            tabListTop = tabList.position().top; // relative to parent element
            tabListPadding = parseInt($(tabList).css("padding-top"));
            tabListMargin = parseInt($(tabList).css("margin-top"));
            tabListFontSize = (parseInt($(tabList).css("font-size")));
            tabListOffset = tabListTop + tabListPadding + tabListMargin + (.6 * tabListFontSize);
            $(this).closest(".c-pivot").find(".c-flipper").attr("style", "top: " + tabListOffset + "px");
        });
        if (newWidth < 768) {

            // size text box at mobile so all within a multi-feature are the same size. prevents content below from jumping about.
            // add class that makes it so the target contaiers have a size to get
            $(".c-pivot section[aria-hidden='true'").addClass("resize");
            $(".c-pivot").each(function() {
                theSections = $(this).find("section");
                var sectionHeights = theSections.map(function() {
                    return $(this).outerHeight(true);
                }).get();
                maxHeight = Math.max.apply(null, sectionHeights);
                $(theSections).attr("style", "height: " + maxHeight + "px");
            });
            // remove special class
            $(".c-pivot section[aria-hidden='true'").removeClass("resize");
        }
        if (newWidth > 767) {
            $(".m-multi-feature > section").each(function(index) {
                sectionHeight = $(this).height();
//get the pivot 
                thePivot = $(this).find(".c-pivot");
//get all the li p
                theParagraphs = $(thePivot).find("li p");
//hide all the paragraphs
                $(theParagraphs).addClass("hide");
//get the height
                pivotHeight = thePivot.height();
//show all the paragraphs
                $(theParagraphs).removeClass("hide").addClass("resize");
//get the tallest paragraph
                var paragraphHeight = theParagraphs.map(function() {
                    return $(this).outerHeight(true);
                }).get();
                pMaxHeight = Math.max.apply(null, paragraphHeight);

                $(theParagraphs).removeClass("resize");

                topOffset = (sectionHeight - (pivotHeight + pMaxHeight)) / 2;

                $(thePivot).attr("style", "top: " + topOffset + "px");
            });
        }
        clearTimeout(multiProcess);
    };

    processResize($(document).width());

    // HC test
    $("body").append('<div class="high-contrast-test" style="color:#999; width:0px; height: 0px;"></div>');
    var rgb = $('.high-contrast-test').css('color').match(/\d+/g);
    if (rgb[0] > 153) { $('html').addClass('high-contrast-mode white-on-black'); }
    if (rgb[0] < 153) { $('html').addClass('high-contrast-mode black-on-white'); }

});