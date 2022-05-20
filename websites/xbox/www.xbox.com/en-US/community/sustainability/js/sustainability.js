$(document).ready(function() {

    $(".c-in-page-navigation:nth-child(1) ul li").each(function() {

        // Setting Classes
        if ($(this).find("a")[0].href.indexOf("ourmission") !== -1) {
            $(this).find("a").addClass("firstAnchor");
        } else if ($(this).find("a")[0].href.indexOf("reducingcarbonfootprint") !== -1) {
            $(this).find("a").addClass("secondAnchor");
        } else if ($(this).find("a")[0].href.indexOf("reducingwaste") !== -1) {
            $(this).find("a").addClass("thirdAnchor");
        } else if ($(this).find("a")[0].href.indexOf("collectiveaction") !== -1) {
            $(this).find("a").addClass("fourthAnchor");
        }

        // Page Load
        var pageURL = document.URL.toLowerCase();
        var activecheck1 = setInterval(function() {
            var activeAjax = $(".c-pivot [aria-posinset='1']").length > 0;
            if (activeAjax === true) {
                console.log(activeAjax)
                if (pageURL.indexOf("ourmission") !== -1) {
                    $("#ourmission").click();
                }
                clearInterval(activecheck1);
            }
        }, 500);

        var activecheck2 = setInterval(function() {
            var activeAjax = $(".c-pivot [aria-posinset='2']").length > 0;
            if (activeAjax === true) {
                if (pageURL.indexOf("reducingcarbonfootprint") !== -1) {
                    $("#reducingcarbonfootprint").click();
                }
                clearInterval(activecheck2);
            }
        }, 500);


        var activecheck3 = setInterval(function() {
            var activeAjax = $(".c-pivot [aria-posinset='3']").length > 0;
            if (activeAjax === true) {
                if (pageURL.indexOf("reducingwaste") !== -1) {
                    $("#reducingwaste").click();
                }
                clearInterval(activecheck3);
            }
        }, 500);

        var activecheck4 = setInterval(function() {
            var activeAjax = $(".c-pivot [aria-posinset='4']").length > 0;
            if (activeAjax === true) {
                if (pageURL.indexOf("collectiveaction") !== -1) {
                    $("#collectiveaction").click();
                }
                clearInterval(activecheck4);
            }
        }, 500);


        // Page Bar Clicks
        // Page Bar Removal of Active
        function active(newHash) {
            $(".c-in-page-navigation ul li a").removeClass("f-active");
        }

        $(document).on("click", ".firstAnchor", function() {
            $("#ourmission").click();
            setTimeout(function() {
                active("#ourmission");
                $(".firstAnchor").addClass("f-active");
            }, 900);
        });

        $(document).on("click", ".secondAnchor", function() {
            $("#reducingcarbonfootprint").click();
            setTimeout(function() {
                active("#reducingcarbonfootprint");
                $(".secondAnchor").addClass("f-active");
            }, 900);
        });

        $(document).on("click", ".thirdAnchor", function() {
            $("#reducingwaste").click();
            setTimeout(function() {
                active("#reducingwaste");
                $(".thirdAnchor").addClass("f-active");
            }, 900);
        });

        $(document).on("click", ".fourthAnchor", function() {
            $("#collectiveaction").click();
            setTimeout(function() {
                active("#collectiveaction");
                $(".fouthAnchor").addClass("f-active");
            }, 900);

        });

    });

    $(".pivot-link").on("click", function(event) {

        theTarget = $(this).attr("href"); // get the target pivot panel from the href attribute

        $(theTarget).click(); // switch to the panel that has the target HREF as its ID

        // BONUS
        // stakeholders like the interactive element to be positioned nicely on the screen after the switch, so we position the c-pivot here

        thePivot = $(this).closest(".c-pivot"); // traverse up the DOM for the parent pivot of .pivot-link

        pivotPosition = $(thePivot).offset().top; // get the c-pivot's position in the viewport
        pagebarBuffer = 72; // scoot it down a bit to clear the pagebar
        scrollPosition = (pivotPosition - pagebarBuffer);

        $("html, body").animate({ scrollTop: scrollPosition }, 250); // move the page so everything looks pretty.

    });

    // the pagebar pivot links change the URL hash. This makes it so all pivot and intra-pivot links also change the hash
    $(".c-pivot li[role=tab]").on("click", function () {
        newHash = "#" + $(this).attr("id");
        history.replaceState(undefined, undefined, newHash); // by this method the page takes no action except changing the hashtag 
    });

});