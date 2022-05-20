$(document).ready(function() {
  var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);

  var iphoneuser = false;
  var androiduser = false;
  if (navigator.userAgent.indexOf("iPhone") > -1) { iphoneuser = true; }
  if (navigator.userAgent.indexOf("Android") > -1) { androiduser = true; }

  if (urlRegion === "en-us") { // once loc'ed, make this all locales
    if (androiduser === true) {
      $(".androidBanner").show();
    } 
  } else {
    if (androiduser === true) {
      $(".androidContent").show();
      $(".androidBanner").show();
    } 
    if (iphoneuser === true) {
      $(".iphoneContent").show();
      $(".androidBanner").show();
    } 
  }

  $(".modalDialog .close").click(function () {
    $(".modalDialog").hide();
  });

});
  