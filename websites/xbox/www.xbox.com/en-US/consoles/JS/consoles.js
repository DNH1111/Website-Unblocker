$(document).ready(function() {
var purchaseRegions=""; // Just add regions here that will have preorder button, can be separated by either space or comma
var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);

/* Use this section if you need to override the actual URL on the page*/
/*var cta_url_X="https://www.xbox.com/" + urlRegion  +"/consoles/xbox-series-x#buy";
var cta_url_S="https://www.xbox.com/" + urlRegion + "/consoles/xbox-series-s#target-purchase";
$(".image-panes .m-panes section:nth-child(1) .c-group .f-primary").attr("href", cta_url_X);
$(".image-panes .m-panes section:nth-child(2) .c-group .f-primary").attr("href", cta_url_S);*/

if (purchaseRegions.indexOf(urlRegion) === -1) {
    $(".image-panes .c-group .f-primary").remove();
}

if (urlRegion === "es-co") {
$(".x1xButton").remove();
}

});