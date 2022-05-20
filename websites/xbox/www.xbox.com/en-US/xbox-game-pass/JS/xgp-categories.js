var urlRegion = document.URL.split("/")[3].toLowerCase();

function popJSON() {
    var regionContent = globalContent.locales[urlRegion];
    var allKeys = Object.keys(regionContent);
    var keysLength = allKeys.length;
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
    myVar2 = setTimeout(ieFix, 2000);
};


function wait() {
    myVar = setTimeout(popJSON, 2500);
}
wait();

function ieFix() {
    var userAgentString = navigator.userAgent;
    if (userAgentString.indexOf("Trident") >= 0) { //only IE browsers
        console.log("starting IE");
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
}