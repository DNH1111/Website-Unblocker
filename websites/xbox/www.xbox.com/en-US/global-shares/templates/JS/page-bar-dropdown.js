$(document).ready(function() { // needs to be in one of these because page targets won't exist when script loads

    var pageBar = $(".c-in-page-navigation").first();
    var pageBarAria = $(pageBar).attr("aria-label");
    var resizeTimer;
    $(window).on('load resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if ((window.innerWidth < 1084) && ($(pageBar).attr("aria-label") !== "")) {
                $(pageBar).attr("aria-label", "");
            } else if ((window.innerWidth >= 1084) && ($(pageBar).attr("aria-label") === "")) {
                $(pageBar).attr("aria-label", pageBarAria);
            }
        }, 250);
    });

    // fixes MWF glitch
    if ($(".c-navigation-menu").length) {
        $(".c-navigation-menu a").click(function() {
            $(".c-navigation-menu button").attr("aria-expanded", "false");
        });
    }

    // make the Join cta a button to remove it from the MWF highlighting script
    $(".m-in-page-navigation .CTAdiv button").click(function() {
        if ($(this).attr('data-target') == "_blank") {
            window.open($(this).attr("data-cta-href"));
        } else {
            window.location.href = $(this).attr("data-cta-href");
        }
    });

});