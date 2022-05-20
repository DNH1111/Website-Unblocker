$(document).ready(function() {

    if ($(".stealth-carousel").length) {

        $(".stealth-carousel").each(function() {
            // set any existing aria-live to off for center carousel
            $(this).find(".center-carousel").attr("aria-live", "off");

            // create left and right carousels from center carousel, for ease of maintenance

            var centerPanels = $(this).find(".center-carousel .stealth-sub-carousel-panel");

            var panelsMax = (centerPanels.length - 1);

            var leftPanels = new Array;
            var rightPanels = new Array;

            // sort center panels into left and right carousels
            for (var i = 0; i <= panelsMax; i++) {
                // right carousel sorting
                if (i == 0) {
                    rightPanel = panelsMax;
                } else {
                    rightPanel = (i - 1);
                }
                //rightPanels[rightPanel] = $(centerPanels[i]).clone().attr("class" , "stealth-panel-"+(rightPanel+1) + " stealth-sub-carousel-panel");
                rightPanels[rightPanel] = $(centerPanels[i]).clone().attr({ "class": "stealth-panel-" + (rightPanel + 1) + " stealth-sub-carousel-panel", "aria-hidden": "true", "tabindex": "-1", "role": "presentation" });

                //left carousel sorting
                if (i == panelsMax) {
                    leftPanel = 0;
                } else {
                    leftPanel = (i + 1);
                }
                leftPanels[leftPanel] = $(centerPanels[i]).clone().attr({ "class": "stealth-panel-" + (leftPanel + 1) + " stealth-sub-carousel-panel", "aria-hidden": "true", "tabindex": "-1", "role": "presentation" });

                //add numbered class to center panels for script to work
                $(centerPanels[i]).attr("class", "stealth-panel-" + (i + 1) + " stealth-sub-carousel-panel");
            }

            // create left and right carousel containers
            var $leftCarousel = $('<div/>').appendTo($(this)).attr({ "class": "stealth-sub-carousel left-carousel", "aria-hidden": "true", "tabindex": "-1", "role": "presentation" });
            var $rightCarousel = $('<div/>').appendTo($(this)).attr({ "class": "stealth-sub-carousel right-carousel", "aria-hidden": "true", "tabindex": "-1", "role": "presentation" });

            //put panels in place
            for (var i = 0; i <= panelsMax; i++) {
                $(leftPanels[i]).appendTo($(this).find(".left-carousel"));
                $(rightPanels[i]).appendTo($(this).find(".right-carousel"));
            }
        });


    }

    // ========================================
    //pre-existing functionality

    if ($(".stealth-carousel").length) {

        $(".stealth-carousel").each(function(index, item) {

            var currentPanel = 1;
            var panelCount = $(item).find(".stealth-sub-carousel").first().find('[class^="stealth-panel-"]').length;

            function syncHeights() {
                var maxHeight = 0;

                $(item).find('.panel-content').css('height', "auto");

                $(item).find('.panel-content').each(function(index, panel) {
                    var height = $(panel).outerHeight(false);
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });

                $(item).find('.panel-content').css('height', maxHeight + "px");
            }
            /*                $(item).load(function () {
                                syncHeights();
                            });
              */
            function arrowHeights() {
                var arrowHeight = $(item).find('.center-carousel').find('.stealth-panel-' + currentPanel).height() / 2;
                /*if (window.matchMedia('(max-width:767px)').matches) {
                    arrowHeight += 44;
                }*/
                $(item).find('.stealth-carousel-arrow').css('top', arrowHeight + "px");
            }
            syncHeights();
            arrowHeights();

            function rotateCaroLeft(focusedCarousel) {
                var nextPanel = currentPanel - 1;
                if (nextPanel < 1) {
                    nextPanel = panelCount;
                }

                $(focusedCarousel).find(".stealth-panel-" + currentPanel).css({ "animation": "panelFadeOut 0.4s linear", "opacity": "0", "z-index": "-1" });
                $(focusedCarousel).find(".stealth-panel-" + nextPanel).css({ "animation": "panelFadeIn 0.4s linear", "opacity": "1", "z-index": "12", }).find("a, button, summary").attr({ "tabindex": "-1", "aria-hidden": "true" });
                currentPanel = nextPanel;

                $(".center-carousel .stealth-panel-" + currentPanel + " *").removeClass("x-hidden-focus");

                $(".center-carousel .stealth-sub-carousel-panel").attr("aria-label", "");

                $(".center-carousel .stealth-panel-" + currentPanel + " .panel-feature img").focus();
                $(".center-carousel .stealth-panel-" + currentPanel).attr("aria-label", "previous slide");
                // restore a and button tab focus on active panel only
                $(".center-carousel .stealth-panel-" + currentPanel).attr("aria-hidden", "false").find("a, button, summary").attr({ "tabindex": "0", "aria-hidden": "false" });
                arrowHeights();
            }

            function rotateCaroRight(focusedCarousel) {
                var nextPanel = currentPanel + 1;
                if (nextPanel > panelCount) {
                    nextPanel = 1;
                }
                $(focusedCarousel).find(".stealth-panel-" + currentPanel).css({ "animation": "panelFadeOut 0.4s linear", "opacity": "0", "z-index": "-1" });
                $(focusedCarousel).find(".stealth-panel-" + nextPanel).css({ "animation": "panelFadeIn 0.4s linear", "opacity": "1", "z-index": "12" }).find("a, button, summary").attr({ "tabindex": "-1", "aria-hidden": "true" });
                currentPanel = nextPanel;

                $(".center-carousel .stealth-panel-" + currentPanel + " *").removeClass("x-hidden-focus");

                $(".center-carousel .stealth-sub-carousel-panel").attr("aria-label", "");


                $(".center-carousel .stealth-panel-" + currentPanel + " .panel-feature img").focus();
                $(".center-carousel .stealth-panel-" + currentPanel).attr("aria-label", "next slide");

                // restore a and button tab focus on active panel only
                $(".center-carousel .stealth-panel-" + currentPanel).attr("aria-hidden", "false").find("a, button, summary").attr({ "tabindex": "0", "aria-hidden": "false" });

                arrowHeights();
            }

            // disable a and button tab focus except starting panel
            $("[class^=stealth-panel]").not(".center-carousel .stealth-panel-1").attr("aria-hidden", "true").find("a, button, summary").attr({ "tabindex": "-1", "aria-hidden": "true" });

            $(item).find('.left-arrow').on("keydown", function(e) {
                    (13 == e.keyCode || 32 == e.keyCode) && $(this).click()
                }),
                $(item).find('.left-arrow').on("click", function() {
                    //make screen reader read the button every time it's activated
                    thisArrow = $(this);
                    $(thisArrow).attr("aria-live", "polite");
                    thisArrowAria = $(thisArrow).attr("aria-label");
                    $(thisArrow).attr("aria-label", "");
                    $(thisArrow).blur();
                    setTimeout(function() {
                        $(thisArrow).focus();
                        $(thisArrow).attr("aria-label", thisArrowAria);
                    }, 50);

                    // disable a and button tab focus on every navigation
                    $("[class^=stealth-panel]").attr("aria-hidden", "true").find("a, button, summary").attr({ "tabindex": "-1", "aria-hidden": "true" });
                    rotateCaroLeft(item);
                });

            $(item).find('.right-arrow').on("keydown", function(e) {
                    (13 == e.keyCode || 32 == e.keyCode) && $(this).click()
                }),
                $(item).find('.right-arrow').on("click", function() {
                    //make screen reader read the button every time it's activated
                    thisArrow = $(this);
                    $(thisArrow).attr("aria-live", "polite");
                    thisArrowAria = $(thisArrow).attr("aria-label");
                    $(thisArrow).attr("aria-label", "");
                    $(thisArrow).blur();
                    setTimeout(function() {
                        $(thisArrow).focus();
                        $(thisArrow).attr("aria-label", thisArrowAria);
                    }, 50);

                    // disable a and button tab focus on every navigation
                    $("[class^=stealth-panel]").attr("aria-hidden", "true").find("a, button, summary").attr({ "tabindex": "-1", "aria-hidden": "true" });
                    rotateCaroRight(item);
                });


            var touchstartX = 0;
            var touchendX = 0;

            item.addEventListener("touchstart", function(event) {
                touchstartX = event.changedTouches[0].screenX;
            }, false);

            item.addEventListener("touchend", function(event) {
                touchendX = event.changedTouches[0].screenX;
                var distance = touchendX - touchstartX;
                if (distance > 30) {
                    rotateCaroLeft(item);
                } else if (distance < -30) {
                    rotateCaroRight(item);
                }
            }, false);

            var clickstartX = 0;
            var clickendX = 0;

            $(item).on('mousedown', function(event) {
                clickstartX = event.clientX;
            });

            $(item).on('mouseup', function(event) {
                clickendX = event.clientX;
                var distance = clickendX - clickstartX;
                if (distance > 30) {
                    rotateCaroLeft(item);
                } else if (distance < -30) {
                    rotateCaroRight(item);
                }
            });


            /*item.addEventListener("dragstart", function (event) {
                clickstartX = event.clientX;
            }, false);*/

            item.addEventListener("dragend", function(event) {
                clickendX = event.clientX;
                var distance = clickendX - clickstartX;
                if (distance > 30) {
                    rotateCaroLeft(item);
                } else if (distance < -30) {
                    rotateCaroRight(item);
                }
            }, false);

            setTimeout(function() {
                syncHeights();
                arrowHeights();
            }, 500);

            $(window).resize(function() {
                syncHeights();
                arrowHeights();
            });

        });


    }
});