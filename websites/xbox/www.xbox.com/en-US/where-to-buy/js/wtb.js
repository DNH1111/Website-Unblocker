$(document).ready(function() {
          // Accesssories Tab on Load  
          var pageURL = document.URL.toLowerCase();
          var activecheck = setInterval(function() {
              var activeAjax = $(".shortHero.retailerLogos .c-pivot [aria-setsize='4']").length > 0;
              if (activeAjax === true) {
                  console.log(activeAjax)
                  if (pageURL.indexOf("#accessory") !== -1) {
                      $(".shortHero.retailerLogos .c-pivot li[aria-controls='accessories']").click();
                  }
                  clearInterval(activecheck);
              }
          }, 500);        

  
  })