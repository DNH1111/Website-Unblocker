// if (document.URL.toLowerCase().indexOf("pc-games") !== -1) { 
  $("body").append('<script type="text/javascript" src="https://assets.xbox.com/xbox-store-web-sdk/latest/purchaseHost.js"></s' + 'cript>');
  $(document).ready(function () {
   if (launchProductPurchase) {
    storePrep();
    var recoactivecheck = setInterval(function() {
                              var recoactiveAjax = $.active;
                              if (recoactiveAjax === 0) {
                               setTimeout(function() { storePrep(); }, 1600)
                                clearInterval(recoactivecheck);
                              }
                            }, 500);
     function storePrep() {
      if ($(".specificContStore").length > 0) {
        var bodycontent = $(".specificContStore").not(".xbstoreDynAdd");
      } else {
        var bodycontent = $("#BodyContent a").not(".ignoreContStore").not(".xbstoreDynAdd");
        if ($("#BodyContent").length === 0) {
          bodycontent = $(".body a").not(".ignoreContStore").not(".xbstoreDynAdd");
        }
      }
      bodycontent.each(function() {
       if ($(this).attr("href") !== undefined && $(this).attr("href").toLowerCase().indexOf("microsoft.com") !== -1 && $(this).attr("href").toLowerCase().indexOf("/p/") !== -1 && $(this).attr("href").toLowerCase().indexOf("onerf") === -1) {
           var hrefurl = $(this).attr("href").toLowerCase();
           var husplit = hrefurl.split("/")
           if (husplit.length > 6 && $(this).attr("href").toLowerCase().indexOf("/store/") === -1 && $(this).attr("href").toLowerCase().indexOf("/p/") !== -1) {
            if (husplit[3].indexOf("-") === -1) { // no locale in url
        var thebigid = husplit[5].slice(0,12).toUpperCase();
            } else {
             var thebigid = husplit[6].slice(0,12).toUpperCase();
            }
           } else if (husplit.length > 7 && $(this).attr("href").toLowerCase().indexOf("/store/p/") !== -1) {
             var thebigid = husplit[7].slice(0,12).toUpperCase();
           }
           $(this).addClass("xbstorebuy").addClass("xbstoreDynAdd").attr("data-xbbigid", thebigid);
          }
      })
      storePop();
     }

     function storePop() {
      var orig = document.location.origin.toLowerCase().replace("https://", "").replace("http://", "");
       $(".xbstorebuy").not(".storeDynAdded").each(function () {
         var bi = $(this).attr("data-xbbigid");
         // $(this).attr("onclick", "xboxContextualStore.Open('" + bi + "')");
         $(this).attr('onclick', 'document.dispatchEvent(new CustomEvent("launchContextualStore", { detail: { productId: "' + bi + '" }}));')
         // $(this).attr("onclick", 'launchProductPurchase({productId: "' + bi + '",storeDomain: "' + orig + 
         //  '",styleOverrides: {"z-index": 100000, "position": "fixed","border": "2px solid black", "left": "0", "right": "0", "margin": "0 auto"},partnerId: "' + orig + '"})');
         $(this).attr('href', 'JavaScript:void(0);');
         $(this).removeAttr('target');
         $(this).addClass("storeDynAdded");
       })
     }

   }
  })   
// } 
