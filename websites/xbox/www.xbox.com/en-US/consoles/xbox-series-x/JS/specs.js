$(document).ready(function() {
    /* 
    click button
    this.change style of button 
    change button text
    show drawer
    */

    var specsButton = $(".specs .specs-drawer .drawer-toggle");

    $(specsButton).click(function() {
        console.log("click");
        var theDrawer = $(this).next(".specs-drawer-panel");
        if (!$(theDrawer).hasClass("open")) {
            console.log("open it");
            $(theDrawer).addClass("open");
            $(this).attr("aria-expanded","true").addClass("c-glyph glyph-cancel").find(".specs-drawer-text-control").text($(this).attr("data-drawer-collapse"));
        } else {
            console.log("close it");
            $(theDrawer).removeClass("open");
            $(this).attr("aria-expanded","false").removeClass("c-glyph glyph-cancel").find(".specs-drawer-text-control").text($(this).attr("data-drawer-expand"));

        }

    });
});