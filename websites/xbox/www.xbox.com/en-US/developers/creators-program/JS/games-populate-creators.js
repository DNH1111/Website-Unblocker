document.domain = "xbox.com";
$(document).ready(function () {
    var urlRegion = document.URL.split("/")[3].toLowerCase();
    var globalpag = pagcopy.locales[urlRegion];
    pageloadfocus = 0;

// Games Per Page Filter 

$('.filterMenu select option').text(globalpag["keyGpptext"]);

$('.filterMenu select option').eq(0).text(function(index, gppText) {
    return gppText.replace('<PLACEHOLDER>', "10 ");
});

$('.filterMenu select option').eq(1).text(function(index, gppText) {
    return gppText.replace('<PLACEHOLDER>', "20 ");
});

$('.filterMenu select option').eq(2).text(function(index, gppText) {
    return gppText.replace('<PLACEHOLDER>', "50 ");
});


var amountGamesShown = $('.filterMenu select');
var amountGames = $('.pag-20').data('gamesmax');

    amountGamesShown.attr('aria-label', globalpag["keyGpptext"].replace("<PLACEHOLDER>", amountGames + ' '));

$(document).on("click", ".paginateDropdown li", function() { 
 var gppnumber = $(this).data('gamesmax');
     $('.filterMenu button').attr('aria-label', globalpag["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
     amountGamesShown.attr('aria-label', globalpag["keyGpptext"].replace("<PLACEHOLDER>", gppnumber + ' '));
});

    var catGuidArray = ["CreatorsCollection"];
    var catClassArray = ["catCreators"];
    var listUrl = "https://reco-public.rec.mp.microsoft.com/channels/Reco/v8.0/lists/collection/CreatorsCollection?itemTypes=Game&DeviceFamily=Windows.Xbox&market=US&language=LANG&count=200&xboxlivetier=open";
    gameIdArrays = {};

    listUrl = listUrl.replace("US", urlRegion.split("-")[1].toUpperCase()).replace("LANG", urlRegion.split("-")[0].toUpperCase());

    for (var i = 0; i < catGuidArray.length; i++) {
        var catUrl = listUrl.replace("CATEGORY", catGuidArray[i]);
        (function () {
            getLists(catUrl, i, catGuidArray[i]);
        })(i);
    }
    function getLists(url, index, arrayname) {
        $.get(url)
            .done(function (responseData) {
                listData = responseData;
                var idlength = listData.Items.length
                var idArray = [];
                for (var j = 0; j < idlength; j++) {
                    idArray.push(listData.Items[j].Id)
                }
                gameIdArrays[arrayname] = {};
                gameIdArrays[arrayname] = idArray;
                if (arrayname === "CreatorsCollection") {
                    GUID_pop(gameIdArrays["CreatorsCollection"]);
                }
                // gameIdArrays.push(idArray);
                // if (gameIdArrays.length === catGuidArray.length) {
                //   popLists();
                // }
            })
    }

    function GUID_pop(rawGuids) {
        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'

        var first12 = rawGuids.slice(0, 12)
        rawGuids = rawGuids.slice(12)

        var firstToUrl = first12.join(",");
        guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
        $.get(guidUrl)
            .done(function (responseData) {
                var apiData = responseData;
                populate(apiData, 0);
                guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                restPop();
            })

        function restPop() {
            var m, n, temparray, chunk = 20;
            var arrayCount = 1
            for (m = 0, n = rawGuids.length; m < n; m += chunk) {
                temparray = rawGuids.slice(m, m + chunk);
                var guidsToUrl = temparray.join(",");
                guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)

                $.get(guidUrl)
                  .done(function (responseData) {
                      var apiData = responseData;
                      populate(apiData, arrayCount);
                      arrayCount++
                  })
                guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
            }
        }



        function populate(data, count) {
            var productQuantity = data.Products.length
            for (var i = 0; i < productQuantity; i++) {
                var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle
                var titleClickname = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi, '');
                // get boxshot
                var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
                var imageInd = 1;
                for (var j = 0; j < imagesNum; j++) {
                    if (data.Products[i].LocalizedProperties[0].Images[j].Width > 138 && data.Products[i].LocalizedProperties[0].Images[j].Width === data.Products[i].LocalizedProperties[0].Images[j].Height) {
                        imageInd = j;
                        break;
                    }
                }
                var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri;
                if (itemBoxshot.indexOf("xboxlive.com") !== -1) { itemBoxshot = itemBoxshot + "&w=140&format=jpg"; }
                var itemId = data.Products[i].ProductId.toUpperCase();

                if (itemId === "9NBLGGH1Z6FQ") {
                    itemBoxshot = "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
                }
                if (itemId === "BZFK7WNK7R4M") {
                    itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-";
                }

                var releaseDate = data.Products[i].MarketProperties[0].OriginalReleaseDate;
                if (releaseDate === undefined) {
                    releaseDate = 0;
                }

                $(".gameDivsWrapper").append('<section class="m-product-placement-item f-size-medium context-game gameDiv" itemscope="" itemtype="http://schema.org/Product" data-release="' +
                     releaseDate + '" data-bigid="' + itemId + '">' +
                     '<a href="https://www.microsoft.com/store/p/' + titleClickname + '/' + itemId + '" target="blank" data-clickname="www>developers>creators-collection>' + titleClickname +
                       '>click" aria-label="' + itemTitle + ' learn more" data-retailer="ms store">' +
                      '<picture class="containerIMG">' +
                         '<img class="c-image" aria-hidden="true" srcset="" src="' + itemBoxshot + '" alt="' + itemTitle + ' boxshot">' +
                      '</picture>' +
                      '<div>' +
                       '<h3 class="c-subheading-4 x1GameName" itemprop="product name">' + itemTitle + '</h3>' +
                      '</div>' +
                     '</a>' +
                    '</section>')

                if ($(".gameDiv").length === gameIdArrays["CreatorsCollection"].length) {
                    // gameIdArrays["SubsXGPFeatured"].forEach(function(bid) {
                    //   $("[data-bigid='" + bid + "']").attr("data-featured", "t");
                    // });
                    // gameIdArrays["SubsXGPRecentlyAdded"].forEach(function(bid) {
                    //   $("[data-bigid='" + bid + "']").attr("data-new", "t");
                    // });
                    // gameIdArrays["SubsXGPChannel9"].forEach(function(bid) {
                    //   $("[data-bigid='" + bid + "']").attr("data-idxbox", "t");
                    // });

                    pagesforfocusstart = Math.ceil(gameIdArrays["CreatorsCollection"].length / 20)
                    
                    filtersort();
                    paginateSetup();
                                
                    
                }
            }

        }
    }

    function filtersort() {
        setTimeout(function () {
            $(".gameSort li").eq(0).attr("data-sorting", "release");
            $(".gameSort li").eq(1).attr("data-sorting", "az");
            $(".gameSort li").eq(2).attr("data-sorting", "za");
            $(".paginateDropdown li").eq(0).attr("data-gamesmax", "10");
            $(".paginateDropdown li").eq(1).attr("data-gamesmax", "20");
            $(".paginateDropdown li").eq(2).attr("data-gamesmax", "50");
            // $(document).on("keypress", ".gameSort li", function(event) {  // taken care of by mwf pubsub
            //   if((event.keyCode == 13) || (event.keyCode== 32)){ 
            //     event.preventDefault();
            //     $(this).click();
            //   }
            // })
        }, 500)
        
        $(document).on("click", ".gameSort li", function () {
            var menutext = $(this).text();
            var sorttype = $(this).attr("data-sorting");
            if (sorttype === "release") {
                $(".gameDivsWrapper .gameDiv").sort(asc_sort).appendTo('.gameDivsWrapper');
                function asc_sort(a, b) {
                    return ($(a).data("release")) < ($(b).data("release")) ? 1 : -1;
                }
            } else if (sorttype === "az") {
                $(".gameDivsWrapper .gameDiv").sort(asc_sort).appendTo('.gameDivsWrapper');
                function asc_sort(a, b) {
                    return ($(b).find(".x1GameName").text().toLowerCase().trim()) < ($(a).find(".x1GameName").text().toLowerCase().trim()) ? 1 : -1;
                }
            } else if (sorttype === "za") {
                $(".gameDivsWrapper .gameDiv").sort(asc_sort).appendTo('.gameDivsWrapper');
                function asc_sort(a, b) {
                    return ($(a).find(".x1GameName").text().toLowerCase().trim()) < ($(b).find(".x1GameName").text().toLowerCase().trim()) ? 1 : -1;
                }
            }
            paginateSetup();
        });

        //mwf select handling
        setTimeout(function () {
            var mySelectHtmlElement = document.querySelector('.gameSort .c-select');
            var mwfSelectComp;
            mwf.ComponentFactory.create([{
                c: mwf.Select,
                elements: [mySelectHtmlElement],
                callback: function callback(results) {
                    if (results && results.length) {
                        mwfSelectComp = results[0];
                    }
                },
                eventToBind: 'DOMContentLoaded'
            }]);

            if (mwfSelectComp.selectMenu) {
                // subscribe to the mwfSelectComp onSelectionChanged event
                mwfSelectComp.selectMenu.subscribe({
                    onSelectionChanged: function (e) {
                        $(".gameSort .c-menu-item p:contains('" + e.id + "')").closest(".c-menu-item").click();
                    }
                });
            }

            //mwf pag select handling
            var mySelectHtmlElement2 = document.querySelector('.paginateDropdown .c-select');
            var mwfSelectComp2;
            mwf.ComponentFactory.create([{
                c: mwf.Select,
                elements: [mySelectHtmlElement2],
                callback: function callback(results) {
                    if (results && results.length) {
                        mwfSelectComp2 = results[0];
                    }
                },
                eventToBind: 'DOMContentLoaded'
            }]);

            if (mwfSelectComp2.selectMenu) {
                mwfSelectComp2.selectMenu.subscribe({
                    onSelectionChanged: function (e) {
                        $(".paginateDropdown .c-menu-item p:contains('" + e.id + "')").closest(".c-menu-item").click();
                    }
                });
            }
        }, 2250)

        var checkedboxes = [];
        $(document).on("click", ".filterCheckboxes input[type=checkbox]", function () {
            $(".filterCheckboxes input[type=checkbox]").prop("checked", false);
            $(this).prop("checked", true);
            var clickCat = $(this).attr("data-boxcat");
            catBoxClicked(clickCat);
        })

        function catBoxClicked(category) {
            $(".gameDiv").removeClass("catHide");
            paginateSetup();
            if (category === "featured") {
                $(".gameDiv").each(function () {
                    if ($(this).attr("data-featured") === "f") {
                        $(this).addClass("catHide");
                    }
                })
            } else if (category === "recentlyadded") {
                $(".gameDiv").each(function () {
                    if ($(this).attr("data-new") === "f") {
                        $(this).addClass("catHide");
                    }
                })
            } else if (category === "idxbox") {
                $(".gameDiv").each(function () {
                    if ($(this).attr("data-idxbox") === "f") {
                        $(this).addClass("catHide");
                    }
                })
            } else if (category === "all") {
                $(".gameDiv").each(function () {
                    $(this).removeClass("catHide");
                })
            }
            paginateSetup();
        }
    }

    var x1RegionPop = (function () {
        $(".gameDiv a").each(function () {
            var rawHref = $(this).attr("href")
            var splitHref = rawHref.split("/")
            splitHref.splice(3, 0, urlRegion)
            var newHref = splitHref.join("/")
            $(this).attr("href", newHref)
        })
    })();

    setTimeout(function () {
        var durl = document.URL.toLowerCase();
        if (durl.indexOf("recent") !== -1) {
            $("#selectRecent").click();
            var topofgames = $("#selectRecent").offset().top - 140;
            $(document).scrollTop(topofgames);
        } else {
            $("#selectCreators").click().prop("checked", true);;
        }
        $('[data-sorting="release"]').click();
        $(".boxShots-gallery, .m-pagination").css("visibility", "visible");
    }, 2500)

    //pagination

    gamesperpage = 20;
    $(document).on("click", ".paginateDropdown li", function (e) {
        var newmax = parseInt($(".paginateDropdown button").text().replace(/\D+/g, ''));
        var btttop = $(".filtertopline").offset().top;
        $("HTML, BODY").animate({
            scrollTop: btttop
        }, 500);
        gamesperpage = newmax;
        paginateSetup();
    });

    // pagination accessibility
    var paginationAriaLabel = $(".m-pagination").attr("aria-label");
    $(".m-pagination").removeAttr("aria-label");
    $(".m-pagination").wrap('<nav aria-label="' + paginationAriaLabel + '"></nav>');

    function paginateSetup() {
        $(".paginateprevious").removeClass("pag-disabled");
        $(".paginatenext").removeClass("pag-disabled");
        $(document).off("keypress", ".paginateprevious a");
        $(document).off("keypress", ".paginatenext a");
        $(document).off("keypress", ".paginateprevious a");
        $(".paginatenext a").attr("tabindex", "0");
        $(".paginateprevious a").attr("tabindex", "0");
        $(".paginatenum a").attr("tabindex", "0");
        $("[data-loc-copy='keyCopygamesper']").text(globalpag["keyCopygamesper"]);
        $("[data-loc-aria='keyAriapreviouspage']").attr("aria-label", globalpag["keyAriapreviouspage"]);
        $("[data-loc-aria='keyArianextpage']").attr("aria-label", globalpag["keyArianextpage"]);
        $("[data-loc-copy='keyCopyprevious']").text(globalpag["keyCopyprevious"]);
        $("[data-loc-copy='keyCopynext']").text(globalpag["keyCopynext"]);
        var gamesperpage = parseInt($(".paginateDropdown button").text().replace(/\D+/g, '')) || 20;
        $(".nogamesfound").hide();
        console.log("gamesperpage = " + gamesperpage)
        var activegames = $(".gameDiv").not(".catHide").not(".ratingHide");
        if (activegames.length === 0) {
            $(".gameDivsWrapper").removeAttr("style");
            $(".m-pagination-group").hide();
            $(".resultsText").hide();
            $(".nogamesfound").show();
        } else {
            var gamenum = activegames.length;
            var pagenum = Math.ceil(gamenum / gamesperpage);
            if (pagenum < 2) {
                $(".m-pagination-group").hide();
                $(".resultsText").text(globalpag["keyAllresults"].replace("<NUMBER>", gamenum));
                $(".resultsText").show();
                $(".gameDivsWrapper").removeAttr("style");
            } else {
                $(".paginatenum").remove();
                for (var i = 1; i <= pagenum; i++) {
                    $(".paginatenext").before('<li data-label="' + globalpag.keyCurrentlyon + ' ' + i + '" class="paginatenum" data-topage="' + i +
                      '"><a href="#" aria-label="' + globalpag.keyPage + ' ' + i + '">' + i + '</a></li>')
                }
                $(".paginatenum").eq(0).closest("li").addClass("f-active");
                $(".m-pagination-group").show();
            }
            paginate(gamesperpage, 0, activegames);

            $(".m-pagination li").first().css("display", "inline-block").addClass("paginateprevious");
            $(".paginateprevious").addClass("pag-disabled");

            // paginate handling
            function totop() {
                var searchtop = $(".filtertopline").offset().top;
                $("HTML, BODY").animate({
                    scrollTop: searchtop
                }, 300);
            }
            $(".paginatenum a").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var wrapheight = $(".gameDivsWrapper").height();
                //$(".gameDivsWrapper").css("min-height", wrapheight + "px");
                $(".gameDivsWrapper").css("min-height", "16vw");
                var gotopage = parseInt($(this).closest("li").attr("data-topage")) - 1;
                var lastpage = parseInt($(".paginatenum").last().attr("data-topage")) - 1;
                if ($(this).closest("li").hasClass("f-active")) {
                    return false;
                }
                $(".paginatenum").closest("li").removeClass("f-active");
                $(this).closest("li").addClass("f-active");
                if (gotopage === 0) {
                    $(".paginateprevious").addClass("pag-disabled");
                    $(".paginatenext").removeClass("pag-disabled");
                } else if (gotopage === lastpage) {
                    $(".paginatenext").addClass("pag-disabled");
                    $(".paginateprevious").removeClass("pag-disabled");
                } else {
                    $(".paginateprevious").removeClass("pag-disabled");
                    $(".paginatenext").removeClass("pag-disabled");
                }
                totop();
                paginate(gamesperpage, gotopage, activegames)
            })
            $(".paginateprevious").off("click");
            $(".paginateprevious").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var wrapheight = $(".gameDivsWrapper").height();
                //$(".gameDivsWrapper").css("min-height", wrapheight + "px");
                $(".gameDivsWrapper").css("min-height", "16vw");
                var currentpage = parseInt($(".paginatenum.f-active").attr("data-topage")) - 1;
                var gotopage = currentpage - 1;
                $(".paginatenum.f-active").prev(".paginatenum").addClass("f-active");
                $(".paginatenum.f-active").last().removeClass("f-active");
                if (gotopage === 0) {
                    $(".paginateprevious").addClass("pag-disabled");
                    $(".paginatenext").removeClass("pag-disabled");
                } else {
                    $(".paginateprevious").removeClass("pag-disabled");
                    $(".paginatenext").removeClass("pag-disabled");
                }
                totop();
                paginate(gamesperpage, gotopage, activegames)
            })
            $(".paginatenext").off("click");
            $(".paginatenext").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var wrapheight = $(".gameDivsWrapper").height();
                //$(".gameDivsWrapper").css("min-height", wrapheight + "px");
                $(".gameDivsWrapper").css("min-height", "16vw");
                var currentpage = parseInt($(".paginatenum.f-active").attr("data-topage")) - 1;
                var gotopage = currentpage + 1;
                var lastpage = parseInt($(".paginatenum").last().attr("data-topage")) - 1;
                $(".paginatenum.f-active").next(".paginatenum").addClass("f-active");
                $(".paginatenum.f-active").first().removeClass("f-active");
                if (gotopage === lastpage) {
                    $(".paginatenext").addClass("pag-disabled");
                    $(".paginateprevious").removeClass("pag-disabled");
                } else {
                    $(".paginatenext").removeClass("pag-disabled");
                    $(".paginateprevious").removeClass("pag-disabled");
                }
                totop();
                paginate(gamesperpage, gotopage, activegames)
            })
        }

        $(".pag-disabled a").attr("tabindex", "-1");
        $(".paginatenum.f-active a").attr("tabindex", "-1");
        // pageloadfocus++

        // if (navigator.userAgent.match(/iPad/i) === null && pageloadfocus > 1) { 
        // if ($(".gameDiv").not(".pagHide").not(".catHide").length === 0) {
        //   setTimeout(function() {
        //     $(".nogamesfound h3").eq(0).focus();
        //   }, 600)
        // } else {
        //   $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find(".gameDivLink").focus();
        // }
        // }

        $(document).on("keypress", ".paginatenum a", function (event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                $(this).click();
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
            }
        })
        $(document).on("keypress", ".paginatenext a", function (event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                $(this).click();
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
            }
        })
        $(document).on("keypress", ".paginateprevious a", function (event) {
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                event.preventDefault();
                $(this).click();
                // $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
            }
        })

    }

    function paginate(gamesperpage, page, activegames) {
        $(activegames).addClass("pagHide");
        var startgame = page * gamesperpage;
        shownGames = $(activegames).slice(startgame, startgame + gamesperpage);
        var catarrlen = shownGames.length;
        if ($(activegames).length > gamesperpage) {
            var firstnum = (page * gamesperpage) + 1;
            var secnum = firstnum + gamesperpage - 1;
            if (secnum > $(activegames).length) { secnum = $(activegames).length }
            var viewing = firstnum + "-" + secnum;
            $(".resultsText").text(globalpag["keySomeresults"].replace("<NUMBER1>", viewing).replace("<NUMBER2>", $(activegames).length));
            $(".resultsText").show();
        }
        $(shownGames).removeClass("pagHide");

        // if (page === 0 && $(activegames).length > gamesperpage) {
        //   setTimeout(function() {
        //     // var wrapheight = $(".gameDivsWrapper").height();
        //     // $(".gameDivsWrapper").css("min-height", wrapheight + "px");
        //     $(".gameDivsWrapper").css("min-height", "16vw");
        //   }, 2000)
        // }
        paginateClean();
    }

    function paginateClean() {
        $(".paginatenext a").attr("tabindex", "0");
        $(".paginateprevious a").attr("tabindex", "0");
        $(".paginatenum a").attr("tabindex", "0");
        var screenwidth = $(document).width();
        if (screenwidth > 768) {
            var pagnummax = 9;
        } else {
            var pagnummax = 3;
        }
        $(".paginatenum").show();
        $(".pagskipstart").remove();
        $(".pagskipend").remove();
        var pagnumber = $(".paginatenum").length;
        if (pagnumber > pagnummax) {
            // trim following
            var pagnumprev = $(".paginatenum.f-active").prevAll().length;
            if (pagnumprev <= Math.floor(pagnummax / 2)) {
                var totrimnext = pagnummax - pagnumprev - 1;
                $(".paginatenum.f-active").nextAll(".paginatenum:gt(" + totrimnext + ")").hide();
            } else {
                $(".paginatenum.f-active").nextAll(".paginatenum:gt(" + (Math.floor(pagnummax / 2) - 1) + ")").hide();
            }
            if (pagnumprev > Math.floor(pagnummax / 2) + 2) {

                $(".paginatenum").first().after('<li class="pagskipstart" style="display: inline-block;">...</li>');
            }
            // trim before
            var pagnumnext = $(".paginatenum.f-active").nextAll().length;
            if (pagnumnext <= Math.floor(pagnummax / 2)) {
                var totrimprev = pagnummax - pagnumnext - 1;
                $(".paginatenum.f-active").prevAll(".paginatenum:gt(" + totrimprev + ")").hide();
            } else {
                $(".paginatenum.f-active").prevAll(".paginatenum:gt(" + (Math.floor(pagnummax / 2) - 1) + ")").hide();
            }
            if (pagnumnext > Math.floor(pagnummax / 2) + 2) {

                $(".paginatenum").last().before('<li class="pagskipend" style="display: inline-block;">...</li>');
            }
            $(".paginatenum").first().show();
            $(".paginatenum").last().show();
        }
        $(".pag-disabled a").attr("tabindex", "-1");
        $(".paginatenum.f-active a").attr("tabindex", "-1");

       //Sets foucs on 1st box shot
       // setTimeout(function () {
       //     $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
       // }, 500)
       pageloadfocus++
        if (navigator.userAgent.match(/iPad/i) === null && pageloadfocus >= pagesforfocusstart) {
          if ($(".gameDiv").not(".pagHide").not(".catHide").length === 0) {
            setTimeout(function() {
              $(".nogamesfound h3").eq(0).focus();
            }, 600)
          } else {
            $(".gameDiv").not(".pagHide").not(".catHide").eq(0).find("a").focus();
          }
        }

        // if ($(".paginatenext").hasClass("pag-disabled")) {
        //   $("a.paginateprevious").focus();
        // }
        // if ($(".paginateprevious").hasClass("pag-disabled") && $(".paginateprevious").is(":focus")) {
        //   $(".paginatenext a").focus();
        // }
    }

});

var pagcopy = {
    "locales": {
        "en-us": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "ar-ae": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "ar-sa": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "cs-cz": {
            "keyGpptext": "<PLACEHOLDER>her na stránku",
            "keyCurrentlyon": "Momentálně na stránce",
            "keyPage": "Stránka",
            "keyAllresults": "Zobrazují se všechny výsledky: <NUMBER>",
            "keySomeresults": "Zobrazuje se následující počet výsledků: <NUMBER1> (celkem výsledků: <NUMBER2>)",
            "keyAriapreviouspage": "Předchozí stránka",
            "keyCopyprevious": "Předchozí",
            "keyArianextpage": "Další stránka",
            "keyCopynext": "Další",
            "keyCopygamesper": "Počet her na stránku: ",
            "keyAriapaginationlist": "seznam stránkování",
            "keyCopynogamesfound": "Nebyly nalezeny žádné hry."
        },
        "da-dk": {
            "keyGpptext": "<PLACEHOLDER>spil per side",
            "keyCurrentlyon": "Aktuelt på side",
            "keyPage": "Side",
            "keyAllresults": "Visning af alle <NUMBER> resultater",
            "keySomeresults": "Visning af <NUMBER1> af <NUMBER2> resultater",
            "keyAriapreviouspage": "Forrige side",
            "keyCopyprevious": "Forrige",
            "keyArianextpage": "Næste side",
            "keyCopynext": "Næste",
            "keyCopygamesper": "Spil pr. side: ",
            "keyAriapaginationlist": "sideinddelingsliste",
            "keyCopynogamesfound": "Ingen spil blev fundet."
        },
        "de-at": {
            "keyGpptext": "<PLACEHOLDER>Spiele pro Seite",
            "keyCurrentlyon": "Aktuell auf Seite",
            "keyPage": "Seite",
            "keyAllresults": "Alle <NUMBER> Ergebnisse werden angezeigt",
            "keySomeresults": "<NUMBER1> von <NUMBER2> Ergebnissen werden angezeigt",
            "keyAriapreviouspage": "Vorherige Seite",
            "keyCopyprevious": "Zurück",
            "keyArianextpage": "Nächste Seite",
            "keyCopynext": "Weiter",
            "keyCopygamesper": "Spiele pro Seite: ",
            "keyAriapaginationlist": "Paginierungsliste",
            "keyCopynogamesfound": "Keine Spiele gefunden."
        },
        "de-ch": {
            "keyGpptext": "<PLACEHOLDER>Spiele pro Seite",
            "keyCurrentlyon": "Aktuell auf Seite",
            "keyPage": "Seite",
            "keyAllresults": "Alle <NUMBER> Ergebnisse werden angezeigt",
            "keySomeresults": "<NUMBER1> von <NUMBER2> Ergebnissen werden angezeigt",
            "keyAriapreviouspage": "Vorherige Seite",
            "keyCopyprevious": "Zurück",
            "keyArianextpage": "Nächste Seite",
            "keyCopynext": "Weiter",
            "keyCopygamesper": "Spiele pro Seite: ",
            "keyAriapaginationlist": "Paginierungsliste",
            "keyCopynogamesfound": "Keine Spiele gefunden."
        },
        "de-de": {
            "keyGpptext": "<PLACEHOLDER>Spiele pro Seite",
            "keyCurrentlyon": "Aktuell auf Seite",
            "keyPage": "Seite",
            "keyAllresults": "Alle <NUMBER> Ergebnisse werden angezeigt",
            "keySomeresults": "<NUMBER1> von <NUMBER2> Ergebnissen werden angezeigt",
            "keyAriapreviouspage": "Vorherige Seite",
            "keyCopyprevious": "Zurück",
            "keyArianextpage": "Nächste Seite",
            "keyCopynext": "Weiter",
            "keyCopygamesper": "Spiele pro Seite: ",
            "keyAriapaginationlist": "Paginierungsliste",
            "keyCopynogamesfound": "Keine Spiele gefunden."
        },
        "el-gr": {
            "keyGpptext": "<PLACEHOLDER>παιχνίδια ανά σελίδα",
            "keyCurrentlyon": "Τρέχουσα σελίδα",
            "keyPage": "Σελίδα",
            "keyAllresults": "Προβολή όλων των <NUMBER> αποτελεσμάτων",
            "keySomeresults": "Προβολή <NUMBER1> από <NUMBER2> αποτελεσμάτων",
            "keyAriapreviouspage": "Προηγούμενη σελίδα",
            "keyCopyprevious": "Προηγούμενο",
            "keyArianextpage": "Επόμενη σελίδα",
            "keyCopynext": "Επόμενο",
            "keyCopygamesper": "Παιχνίδια ανά σελίδα: ",
            "keyAriapaginationlist": "λίστα σελιδοποίησης",
            "keyCopynogamesfound": "Δεν βρέθηκαν παιχνίδια."
        },
        "en-au": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-ca": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-gb": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-hk": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-ie": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-in": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-nz": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-sg": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "en-za": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "es-ar": {
            "keyGpptext": "<PLACEHOLDER>juegos por página",
            "keyCurrentlyon": "Actualmente en la página",
            "keyPage": "Página",
            "keyAllresults": "Mostrando todos los <NUMBER> resultados",
            "keySomeresults": "Mostrando <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Pagina anterior",
            "keyCopyprevious": "Atrás",
            "keyArianextpage": "Página siguiente",
            "keyCopynext": "Siguiente",
            "keyCopygamesper": "Juegos por página: ",
            "keyAriapaginationlist": "lista de paginación",
            "keyCopynogamesfound": "No se encontraron juegos."
        },
        "es-cl": {
            "keyGpptext": "<PLACEHOLDER>juegos por página",
            "keyCurrentlyon": "Actualmente en la página",
            "keyPage": "Página",
            "keyAllresults": "Mostrando todos los <NUMBER> resultados",
            "keySomeresults": "Mostrando <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Pagina anterior",
            "keyCopyprevious": "Atrás",
            "keyArianextpage": "Página siguiente",
            "keyCopynext": "Siguiente",
            "keyCopygamesper": "Juegos por página: ",
            "keyAriapaginationlist": "lista de paginación",
            "keyCopynogamesfound": "No se encontraron juegos."
        },
        "es-co": {
            "keyGpptext": "<PLACEHOLDER>juegos por página",
            "keyCurrentlyon": "Actualmente en la página",
            "keyPage": "Página",
            "keyAllresults": "Mostrando todos los <NUMBER> resultados",
            "keySomeresults": "Mostrando <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Pagina anterior",
            "keyCopyprevious": "Atrás",
            "keyArianextpage": "Página siguiente",
            "keyCopynext": "Siguiente",
            "keyCopygamesper": "Juegos por página: ",
            "keyAriapaginationlist": "lista de paginación",
            "keyCopynogamesfound": "No se encontraron juegos."
        },
        "es-es": {
            "keyGpptext": "<PLACEHOLDER>juegos por página",
            "keyCurrentlyon": "Actualmente en la página",
            "keyPage": "Página",
            "keyAllresults": "Ver todos los <NUMBER> resultados",
            "keySomeresults": "Ver <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Página anterior",
            "keyCopyprevious": "Atrás",
            "keyArianextpage": "Página siguiente",
            "keyCopynext": "Siguiente",
            "keyCopygamesper": "Juegos por página: ",
            "keyAriapaginationlist": "lista de paginación",
            "keyCopynogamesfound": "No se encontraron juegos."
        },
        "es-mx": {
            "keyGpptext": "<PLACEHOLDER>juegos por página",
            "keyCurrentlyon": "Actualmente en la página",
            "keyPage": "Página",
            "keyAllresults": "Mostrando todos los <NUMBER> resultados",
            "keySomeresults": "Mostrando <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Pagina anterior",
            "keyCopyprevious": "Atrás",
            "keyArianextpage": "Página siguiente",
            "keyCopynext": "Siguiente",
            "keyCopygamesper": "Juegos por página: ",
            "keyAriapaginationlist": "lista de paginación",
            "keyCopynogamesfound": "No se encontraron juegos."
        },
        "fi-fi": {
            "keyGpptext": "<PLACEHOLDER>pelejä sivulla",
            "keyCurrentlyon": "Tällä sivulla",
            "keyPage": "Sivu ",
            "keyAllresults": "Näytä kaikki <NUMBER> tulosta",
            "keySomeresults": "Näytä tulokset <NUMBER1> - <NUMBER2>",
            "keyAriapreviouspage": "Edellinen sivu",
            "keyCopyprevious": "Edellinen",
            "keyArianextpage": "Seuraava sivu",
            "keyCopynext": "Seuraava",
            "keyCopygamesper": "Pelejä sivulla: ",
            "keyAriapaginationlist": "sivunumerot",
            "keyCopynogamesfound": "Ei tuloksia."
        },
        "fr-be": {
            "keyGpptext": "<PLACEHOLDER>jeux par page",
            "keyCurrentlyon": "Actuellement sur la page",
            "keyPage": "Page",
            "keyAllresults": "Affichage des <NUMBER> résultats",
            "keySomeresults": "Affichage des <NUMBER1> sur <NUMBER2> résultats",
            "keyAriapreviouspage": "Page précédente",
            "keyCopyprevious": "Précédent",
            "keyArianextpage": "Page suivante",
            "keyCopynext": "Suivant",
            "keyCopygamesper": "Jeux par page : ",
            "keyAriapaginationlist": "liste de pagination",
            "keyCopynogamesfound": "Aucun jeu trouvé"
        },
        "fr-ca": {
            "keyGpptext": "<PLACEHOLDER>jeux par page",
            "keyCurrentlyon": "Actuellement à la page",
            "keyPage": "Page",
            "keyAllresults": "Afficher tous les résultats <NUMBER>",
            "keySomeresults": "Afficher les résultats <NUMBER1> de <NUMBER2>",
            "keyAriapreviouspage": "Page précédente",
            "keyCopyprevious": "Précédent",
            "keyArianextpage": "Page suivante",
            "keyCopynext": "Suivant",
            "keyCopygamesper": "Jeux par page : ",
            "keyAriapaginationlist": "Liste de pagination",
            "keyCopynogamesfound": "Aucun jeu trouvé."
        },
        "fr-ch": {
            "keyGpptext": "<PLACEHOLDER>jeux par page",
            "keyCurrentlyon": "Actuellement sur la page",
            "keyPage": "Page",
            "keyAllresults": "Affichage des <NUMBER> résultats",
            "keySomeresults": "Affichage des <NUMBER1> sur <NUMBER2> résultats",
            "keyAriapreviouspage": "Page précédente",
            "keyCopyprevious": "Précédent",
            "keyArianextpage": "Page suivante",
            "keyCopynext": "Suivant",
            "keyCopygamesper": "Jeux par page : ",
            "keyAriapaginationlist": "liste de pagination",
            "keyCopynogamesfound": "Aucun jeu trouvé"
        },
        "fr-fr": {
            "keyGpptext": "<PLACEHOLDER>jeux par page",
            "keyCurrentlyon": "Actuellement sur la page",
            "keyPage": "Page",
            "keyAllresults": "Affichage des <NUMBER> résultats",
            "keySomeresults": "Affichage des <NUMBER1> sur <NUMBER2> résultats",
            "keyAriapreviouspage": "Page précédente",
            "keyCopyprevious": "Précédent",
            "keyArianextpage": "Page suivante",
            "keyCopynext": "Suivant",
            "keyCopygamesper": "Jeux par page : ",
            "keyAriapaginationlist": "liste de pagination",
            "keyCopynogamesfound": "Aucun jeu trouvé"
        },
        "he-il": {
            "keyGpptext": "<PLACEHOLDER>games per page",
            "keyCurrentlyon": "Currently on page",
            "keyPage": "Page",
            "keyAllresults": "Viewing all <NUMBER> results",
            "keySomeresults": "Viewing <NUMBER1> of <NUMBER2> results",
            "keyAriapreviouspage": "Previous Page",
            "keyCopyprevious": "Previous",
            "keyArianextpage": "Next Page",
            "keyCopynext": "Next",
            "keyCopygamesper": "Games per page: ",
            "keyAriapaginationlist": "pagination list",
            "keyCopynogamesfound": "No games found."
        },
        "hu-hu": {
            "keyGpptext": "<PLACEHOLDER>játék oldalanként",
            "keyCurrentlyon": "Jelenlegi oldal:",
            "keyPage": "Oldal",
            "keyAllresults": "Az összes (<NUMBER>) találat megjelenítése",
            "keySomeresults": "<NUMBER1>/<NUMBER2> találat megjelenítése",
            "keyAriapreviouspage": "Előző oldal",
            "keyCopyprevious": "Előző",
            "keyArianextpage": "Következő oldal",
            "keyCopynext": "Tovább",
            "keyCopygamesper": "Játékok száma oldalanként: ",
            "keyAriapaginationlist": "tördelési lista",
            "keyCopynogamesfound": "Nem találhatók játékok."
        },
        "it-it": {
            "keyGpptext": "<PLACEHOLDER>giochi per pagina",
            "keyCurrentlyon": "Attualmente nella pagina",
            "keyPage": "Pagina",
            "keyAllresults": "Visualizzazione di tutti i <NUMBER> risultati",
            "keySomeresults": "Visualizzazione di <NUMBER1> risultati su <NUMBER2>",
            "keyAriapreviouspage": "Pagina precedente",
            "keyCopyprevious": "Indietro",
            "keyArianextpage": "Pagina successiva",
            "keyCopynext": "Avanti",
            "keyCopygamesper": "Giochi per pagina: ",
            "keyAriapaginationlist": "impaginazione elenco",
            "keyCopynogamesfound": "Nessun gioco trovato."
        },
        "ja-jp": {
            "keyGpptext": "ページごとに <PLACEHOLDER>作品を表示",
            "keyCurrentlyon": "現在のページは",
            "keyPage": "ページ",
            "keyAllresults": "<NUMBER> 件全ての検索結果を表示",
            "keySomeresults": "<NUMBER1> 件中 <NUMBER2> 件の検索結果を表示",
            "keyAriapreviouspage": "前のページ",
            "keyCopyprevious": "戻る",
            "keyArianextpage": "次のページ",
            "keyCopynext": "次へ",
            "keyCopygamesper": "ページごとにゲームを表示: ",
            "keyAriapaginationlist": "一覧リスト",
            "keyCopynogamesfound": "お探しのゲームは見つかりませんでした。"
        },
        "ko-kr": {
            "keyGpptext": "페이지 당 게임: <PLACEHOLDER>",
            "keyCurrentlyon": "현재 페이지",
            "keyPage": "페이지",
            "keyAllresults": "총 <NUMBER>개의 결과가 표시됨",
            "keySomeresults": "<NUMBER1> / <NUMBER2>개의 결과가 표시됨",
            "keyAriapreviouspage": "이전 페이지",
            "keyCopyprevious": "이전",
            "keyArianextpage": "다음 페이지",
            "keyCopynext": "다음",
            "keyCopygamesper": "페이지 당 게임: ",
            "keyAriapaginationlist": "페이지 번호 목록",
            "keyCopynogamesfound": "검색된 게임이 없습니다."
        },
        "nb-no": {
            "keyGpptext": "<PLACEHOLDER>spill per side",
            "keyCurrentlyon": "I øyeblikket på side",
            "keyPage": "Side",
            "keyAllresults": "Viser alle <NUMBER> resultater",
            "keySomeresults": "Viser <NUMBER1> av <NUMBER2> resultater",
            "keyAriapreviouspage": "Forrige side",
            "keyCopyprevious": "Forrige",
            "keyArianextpage": "Neste side",
            "keyCopynext": "Neste",
            "keyCopygamesper": "Spill per side: ",
            "keyAriapaginationlist": "pagineringsliste",
            "keyCopynogamesfound": "Fant ingen spill."
        },
        "nl-be": {
            "keyGpptext": "<PLACEHOLDER>games per pagina",
            "keyCurrentlyon": "Momenteel op pagina",
            "keyPage": "Pagina",
            "keyAllresults": "Alle <NUMBER> resultaten bekijken",
            "keySomeresults": "<NUMBER1> van <NUMBER2> resultaten bekijken",
            "keyAriapreviouspage": "Vorige pagina",
            "keyCopyprevious": "Vorige",
            "keyArianextpage": "Volgende pagina",
            "keyCopynext": "Volgende",
            "keyCopygamesper": "Games per pagina: ",
            "keyAriapaginationlist": "pagineringslijst",
            "keyCopynogamesfound": "Geen games gevonden."
        },
        "nl-nl": {
            "keyGpptext": "<PLACEHOLDER>games per pagina",
            "keyCurrentlyon": "Momenteel op pagina",
            "keyPage": "Pagina",
            "keyAllresults": "Alle <NUMBER> resultaten bekijken",
            "keySomeresults": "<NUMBER1> van <NUMBER2> resultaten bekijken",
            "keyAriapreviouspage": "Vorige pagina",
            "keyCopyprevious": "Vorige",
            "keyArianextpage": "Volgende pagina",
            "keyCopynext": "Volgende",
            "keyCopygamesper": "Games per pagina: ",
            "keyAriapaginationlist": "pagineringslijst",
            "keyCopynogamesfound": "Geen games gevonden."
        },
        "pl-pl": {
            "keyGpptext": "<PLACEHOLDER>gier na stronie",
            "keyCurrentlyon": "Obecnie na stronie",
            "keyPage": "Strona",
            "keyAllresults": "Wyświetlanie wszystkich <NUMBER> wyników",
            "keySomeresults": "Wyświetlanie <NUMBER1> z <NUMBER2> wyników",
            "keyAriapreviouspage": "Poprzednia strona",
            "keyCopyprevious": "Poprzednie",
            "keyArianextpage": "Następna strona",
            "keyCopynext": "Następne",
            "keyCopygamesper": "Liczba gier na jednej stronie: ",
            "keyAriapaginationlist": "spis stron",
            "keyCopynogamesfound": "Nie znaleziono żadnych gier."
        },
        "pt-br": {
            "keyGpptext": "<PLACEHOLDER>jogos por página",
            "keyCurrentlyon": "Atualmente na página",
            "keyPage": "Página",
            "keyAllresults": "Ver todos os <NUMBER> resultados",
            "keySomeresults": "Visualizando <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Página anterior",
            "keyCopyprevious": "Anterior",
            "keyArianextpage": "Próxima página",
            "keyCopynext": "Avançar",
            "keyCopygamesper": "Jogos por página: ",
            "keyAriapaginationlist": "lista de paginação",
            "keyCopynogamesfound": "Nenhum jogo encontrado."
        },
        "pt-pt": {
            "keyGpptext": "<PLACEHOLDER>jogos por página",
            "keyCurrentlyon": "Atualmente na página",
            "keyPage": "Página",
            "keyAllresults": "A mostrar todos os <NUMBER> resultados",
            "keySomeresults": "A mostrar <NUMBER1> de <NUMBER2> resultados",
            "keyAriapreviouspage": "Página Anterior",
            "keyCopyprevious": "Anterior",
            "keyArianextpage": "Página Seguinte",
            "keyCopynext": "Seguinte",
            "keyCopygamesper": "Jogos por página: ",
            "keyAriapaginationlist": "lista de paginação",
            "keyCopynogamesfound": "Não foram encontrados jogos"
        },
        "ru-ru": {
            "keyGpptext": "<PLACEHOLDER>игр на странице",
            "keyCurrentlyon": "На текущей странице",
            "keyPage": "Страница",
            "keyAllresults": "Показаны все результаты (<NUMBER>)",
            "keySomeresults": "Показано результатов: <NUMBER1> из <NUMBER2>",
            "keyAriapreviouspage": "Предыдущая страница",
            "keyCopyprevious": "Назад",
            "keyArianextpage": "Следующая страница",
            "keyCopynext": "Далее",
            "keyCopygamesper": "Число игр на страницу: ",
            "keyAriapaginationlist": "список страниц",
            "keyCopynogamesfound": "Игр не найдено."
        },
        "sk-sk": {
            "keyGpptext": "<PLACEHOLDER>hier na stránku",
            "keyCurrentlyon": "Momentálne na strane",
            "keyPage": "Strana",
            "keyAllresults": "Zobrazujú sa všetky výsledky: <NUMBER>",
            "keySomeresults": "Zobrazujú sa výsledky: <NUMBER1> z <NUMBER2>",
            "keyAriapreviouspage": "Predchádzajúca strana",
            "keyCopyprevious": "Predchádzajúca",
            "keyArianextpage": "Nasledujúca strana",
            "keyCopynext": "Nasledujúca",
            "keyCopygamesper": "Počet hier na strane: ",
            "keyAriapaginationlist": "zoznam strán",
            "keyCopynogamesfound": "Nenašli sa žiadne hry."
        },
        "sv-se": {
            "keyGpptext": "<PLACEHOLDER>spel per sida",
            "keyCurrentlyon": "För tillfället på sidan",
            "keyPage": "Sidan",
            "keyAllresults": "Visar alla <NUMBER> resultat",
            "keySomeresults": "Visar <NUMBER1> av <NUMBER2> resultat",
            "keyAriapreviouspage": "Föregående sida",
            "keyCopyprevious": "Föregående",
            "keyArianextpage": "Nästa sida",
            "keyCopynext": "Nästa",
            "keyCopygamesper": "Spel per sida: ",
            "keyAriapaginationlist": "sidnumreringslista",
            "keyCopynogamesfound": "Inga spel hittades."
        },
        "tr-tr": {
            "keyGpptext": "Sayfa başına <PLACEHOLDER>oyun",
            "keyCurrentlyon": "Şu anda sayfada bulunan",
            "keyPage": "Sayfa",
            "keyAllresults": "Tüm <NUMBER> sonucu görüntüle",
            "keySomeresults": "<NUMBER1> / <NUMBER2> sonuç görüntüleniyor",
            "keyAriapreviouspage": "Önceki Sayfa",
            "keyCopyprevious": "Önceki",
            "keyArianextpage": "Sonraki Sayfa",
            "keyCopynext": "İleri",
            "keyCopygamesper": "Sayfa başına oyun: ",
            "keyAriapaginationlist": "sayfalandırma listesi",
            "keyCopynogamesfound": "Oyun yok."
        },
        "zh-hk": {
            "keyGpptext": "每頁顯示 <PLACEHOLDER>款遊戲",
            "keyCurrentlyon": "目前在頁面",
            "keyPage": "頁",
            "keyAllresults": "檢視所有 <NUMBER> 個結果",
            "keySomeresults": "檢視第 <NUMBER1> 個結果 (共 <NUMBER2> 個)",
            "keyAriapreviouspage": "上一頁",
            "keyCopyprevious": "上一頁",
            "keyArianextpage": "下一頁",
            "keyCopynext": "下一頁",
            "keyCopygamesper": "每頁遊戲數： ",
            "keyAriapaginationlist": "分頁清單",
            "keyCopynogamesfound": "找不到遊戲。"
        },
        "zh-tw": {
            "keyGpptext": "每頁顯示 <PLACEHOLDER>款遊戲",
            "keyCurrentlyon": "目前在頁面",
            "keyPage": "頁",
            "keyAllresults": "檢視所有 <NUMBER> 個結果",
            "keySomeresults": "檢視第 <NUMBER1> 個結果 (共 <NUMBER2> 個)",
            "keyAriapreviouspage": "上一頁",
            "keyCopyprevious": "上一頁",
            "keyArianextpage": "下一頁",
            "keyCopynext": "下一頁",
            "keyCopygamesper": "每頁遊戲數： ",
            "keyAriapaginationlist": "分頁清單",
            "keyCopynogamesfound": "找不到遊戲。"
        }
    }
}