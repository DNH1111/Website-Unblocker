// popup video setup 1 - comment out when no popup in any locale
var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
var popuplocales = "en-";
if (urlRegion.indexOf(popuplocales) !== -1) {
  $("body").addClass("blackout");  // add back for popup
}
// end popup set up 

$(document).ready(function() {
  // setup for video popup 2 - comment out when no popup in any locale
  if (urlRegion.indexOf(popuplocales) === -1) {
    $(".videopopup").html("");
    $(".videopopup").addClass("pophidden");
    $(".videopopup").removeClass("videopopup");
  }
  // end popup setup
    var screenwidth = $(document).width();
    if (screenwidth < 1080) {
        $(".blackout").removeClass("blackout");
    } else {
        $(".pophidden").removeClass("pophidden");
    }
    
    if (urlRegion === "en-ae") {
        urlRegion = "ar-ae";
    } else if (urlRegion === "en-sa") {
        urlRegion = "ar-sa";
    } else if (urlRegion === "en-il") {
        urlRegion = "he-il";
    }

    function makedc(title) {
        return title.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi, '');
    }

    var sec = 0;
    var checklogin = setInterval(function() {
        if (document.getElementById('mectrl_headerPicture')) {
            var iconImage = document.getElementById('mectrl_headerPicture').style.backgroundImage.replace(/url\(|\)|"/gi, '')
            $('.myAccount img').attr("srcset", iconImage);
            $('.myAccount img').attr("src", iconImage);
            $('.myAccount img').css("border-radius", "50%");
            clearInterval(checklogin)
        }
        sec++;
        if (sec === 6) { clearInterval(checklogin) }
    }, 1000)

    var populateHero = (function() {
        var regHeroContent = allHeroes.locales[urlRegion]

        var heroTypes = {};
        heroTypes["center"] = '<section class="m-hero-item f-x-center f-y-center context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1a"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["centerlogo"] = '<section class="m-hero-item f-x-center f-y-center context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1a"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["right"] = '<section class="m-hero-item f-x-right f-y-center context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1a"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["left"] = '<section class="m-hero-item f-x-left f-y-center context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1a"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["righttop"] = '<section class="m-hero-item f-x-right f-y-top context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-2"></h1>' +
            '<p class="c-subheading-2"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["centerbottom"] = '<section class="m-hero-item f-x-center f-y-bottom context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1a"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["centertop"] = '<section class="m-hero-item f-x-center f-y-top context-accessory" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1" >' +
            '<picture class="c-image">' +
            '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
            '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
            '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
            '<img srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1a"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>'

        heroTypes["video"] = '<section class="m-hero-item context-device videohero" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<div class="m-ambient-video vid herovideo">' +
            '<video alt="Ambient video alt text" poster muted autoplay>' +
            //'<video alt="Ambient video alt text" poster="https://compass-ssl.xbox.com/assets/2a/b6/2ab6377c-a97b-4f5d-bfa6-3e972a1e3c5e.jpg?n=Grounded_HP-FAT_Hero-Poster-Image_1920x720.jpg" muted autoplay>' +
            '<source class="heroImgDesktop" src="" type="video/mp4">' +
            '</video>' +
            '</div> ' +
            '<picture class="c-image">' +
            '<source class="heronovideomobbiggest" srcset="" media="(min-width:768px)">' +
            '<source class="heronovideomobmedium" srcset="" media="(min-width:540px)">' +
            '<source class="heronovideomobsmallest" srcset="" media="(min-width:0)">' +
            '<img class="heronovideomobile" srcset="" src="" alt="">' +
            '</picture>' +
            '<div>' +
            '<div class="high-contrast">' +
            '<strong class="c-badge f-small"><span></span></strong>' +
            '<h1 class="c-heading-1"></h1>' +
            '<p class="c-subheading-1"></p>' +
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2">' +
            '<span></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>' +
            '<style>.m-hero-item .m-ambient-video {padding: 0;}</style>'


        var numHeroes = regHeroContent["keyNumberofheroes"]
        if (numHeroes === "1") {
            var heroInsert = heroTypes[regHeroContent["keyHero1type"].toLowerCase()];
            $(".sl-hero").append(heroInsert)
            $(".m-hero-item").removeAttr("tabindex");
            if (regHeroContent["keyHero1extraclasses"] !== "####") {
                $(".sl-hero .m-hero-item").addClass(regHeroContent["keyHero1extraclasses"])
            }
            $(".sl-hero .heroImgDesktop").attr("srcset", regHeroContent["keyHero1imagedesktop"])
            $(".sl-hero .heroImgTablet").attr("srcset", regHeroContent["keyHero1imagetablet"])
            $(".sl-hero .heroImgTabletSmall").attr("srcset", regHeroContent["keyHero1imagetabletsmall"])
            $(".sl-hero .heroImgMobile").attr("srcset", regHeroContent["keyHero1imagemobile"])
            $(".sl-hero picture img").attr("src", regHeroContent["keyHero1imagedesktop"]).attr("srcset", regHeroContent["keyHero1imagedesktop"])
            $(".sl-hero video source").attr("src", regHeroContent["keyHero1imagedesktop"]); // for video
            $(".sl-hero picture img").attr("src", regHeroContent["keyHero1imagedesktop"])
            $(".sl-hero picture img").attr("alt", regHeroContent["keyHero1alt"])
            $(".sl-hero video").attr("alt", regHeroContent["keyHero1alt"]); // for video
            $(".sl-hero video").attr("poster", regHeroContent["keyHero1imagetablet"]); // for video
            $(".sl-hero .heronovideomobile").attr("src", regHeroContent["keyHero1imagesmallest"]);
            $(".sl-hero .heronovideomobsmallest").attr("srcset", regHeroContent["keyHero1imagesmallest"]);
            $(".sl-hero .heronovideomobmedium").attr("srcset", regHeroContent["keyHero1imagemobile"]);
            $(".sl-hero .heronovideomobbiggest").attr("srcset", regHeroContent["keyHero1imagetablet"]);
            if (regHeroContent["keyHero1badgecolor"].toLowerCase() === "gold") {
                $(".sl-hero .c-badge").addClass("f-highlight");
            } else {
                $(".sl-hero .c-badge").addClass("f-lowlight");
            }
            if (regHeroContent["keyHero1headlinesmaller"] !== undefined && regHeroContent["keyHero1headlinesmaller"].length > 1) {
                $(".sl-hero .c-heading-1a").addClass("c-heading-1").removeClass("c-heading-1a");
            }
            $(".sl-hero .c-badge").attr("data-loc-color", "keyHero1badgecolor");
            $(".sl-hero .c-badge span").text(regHeroContent["keyHero1badgecopy"]);
            $(".sl-hero h1").html(regHeroContent["keyHero1headline"])
            $(".sl-hero p.c-subheading-1").html(regHeroContent["keyHero1subheading"])
            $(".sl-hero p.c-subheading-2").html(regHeroContent["keyHero1subheading"])
            $(".sl-hero a.cta1").attr("href", regHeroContent["keyHero1link"])
            $(".sl-hero a.cta1 span").text(regHeroContent["keyHero1cta"])
            if (regHeroContent["keyHero1ctatype"] !== undefined && regHeroContent["keyHero1ctatype"].toLowerCase() === "text") { 
                $(".sl-hero a.cta1").removeClass("f-heavyweight").addClass("f-lightweight");
            }
            if (regHeroContent["keyHero1dataretailer"] !== "####" && regHeroContent["keyHero1dataretailer"] !== "") { $(".sl-hero a.cta1").attr("data-retailer", regHeroContent["keyHero1dataretailer"]) }
            if (regHeroContent["keyHero1datacta"] !== "####" && regHeroContent["keyHero1datacta"] !== "") { $(".sl-hero a.cta1").attr("data-cta", regHeroContent["keyHero1datacta"]) }
            $(".sl-hero a.cta1").attr("aria-label", regHeroContent["keyHero1arialabel"])

            $(".sl-hero a.cta2").attr("href", regHeroContent["keyHero1link2"])
            $(".sl-hero a.cta2 span").text(regHeroContent["keyHero1cta2"])
            if (regHeroContent["keyHero1ctatype2"] !== undefined && regHeroContent["keyHero1ctatype2"].toLowerCase() === "text") { 
                $(".sl-hero a.cta1").addClass("f-lightweight");
            } else {
                $(".sl-hero a.cta1").addClass("f-heavyweight");
            }
            if (regHeroContent["keyHero1dataretailer2"] !== "####" && regHeroContent["keyHero1dataretailer2"] !== "") { $(".sl-hero a.cta2").attr("data-retailer", regHeroContent["keyHero1dataretailer2"]) }
            if (regHeroContent["keyHero1datacta2"] !== "####" && regHeroContent["keyHero1datacta2"] !== "") { $(".sl-hero a.cta2").attr("data-cta", regHeroContent["keyHero1datacta2"]) }
            $(".sl-hero a.cta2").attr("aria-label", regHeroContent["keyHero1arialabel2"])
        } else {
            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };

            var playslidetext = {
                "locales": {
                    "en-us": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "ar-ae": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "ar-sa": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "cs-cz": {
                        "keyPlayslideshow": "Přehrát prezentaci"
                    },
                    "da-dk": {
                        "keyPlayslideshow": "Afspil slideshow"
                    },
                    "de-at": {
                        "keyPlayslideshow": "Diashow abspielen"
                    },
                    "de-ch": {
                        "keyPlayslideshow": "Diashow abspielen"
                    },
                    "de-de": {
                        "keyPlayslideshow": "Diashow abspielen"
                    },
                    "el-gr": {
                        "keyPlayslideshow": "Αναπαραγωγή παρουσίασης"
                    },
                    "en-au": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-ca": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-gb": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-hk": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-ie": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-in": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-nz": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-sg": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "en-za": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "es-ar": {
                        "keyPlayslideshow": "Reproducir presentación de diapositivas"
                    },
                    "es-cl": {
                        "keyPlayslideshow": "Reproducir presentación de diapositivas"
                    },
                    "es-co": {
                        "keyPlayslideshow": "Reproducir presentación de diapositivas"
                    },
                    "es-es": {
                        "keyPlayslideshow": "Reproducir presentación de diapositivas"
                    },
                    "es-mx": {
                        "keyPlayslideshow": "Reproducir presentación de diapositivas"
                    },
                    "fi-fi": {
                        "keyPlayslideshow": "Toista diaesitys"
                    },
                    "fr-be": {
                        "keyPlayslideshow": "Lancer le diaporama"
                    },
                    "fr-ca": {
                        "keyPlayslideshow": "Lancer le diaporama"
                    },
                    "fr-ch": {
                        "keyPlayslideshow": "Lancer le diaporama"
                    },
                    "fr-fr": {
                        "keyPlayslideshow": "Lancer le diaporama"
                    },
                    "he-il": {
                        "keyPlayslideshow": "Play slideshow"
                    },
                    "hu-hu": {
                        "keyPlayslideshow": "Diavetítés"
                    },
                    "it-it": {
                        "keyPlayslideshow": "Esegui presentazione"
                    },
                    "ja-jp": {
                        "keyPlayslideshow": "スライドショーの再生"
                    },
                    "ko-kr": {
                        "keyPlayslideshow": "슬라이드쇼 재생"
                    },
                    "nb-no": {
                        "keyPlayslideshow": "Spill lysbildefremvisning"
                    },
                    "nl-be": {
                        "keyPlayslideshow": "Diavoorstelling afspelen"
                    },
                    "nl-nl": {
                        "keyPlayslideshow": "Diavoorstelling afspelen"
                    },
                    "pl-pl": {
                        "keyPlayslideshow": "Odtwórz pokaz slajdów"
                    },
                    "pt-br": {
                        "keyPlayslideshow": "Ver apresentação de slides"
                    },
                    "pt-pt": {
                        "keyPlayslideshow": "Reproduzir apresentação de diapositivos"
                    },
                    "ru-ru": {
                        "keyPlayslideshow": "Воспроизвести слайд-шоу"
                    },
                    "sk-sk": {
                        "keyPlayslideshow": "Prehrať prezentáciu"
                    },
                    "sv-se": {
                        "keyPlayslideshow": "Spela bildspell"
                    },
                    "tr-tr": {
                        "keyPlayslideshow": "Slayt gösterisini oynat"
                    },
                    "zh-hk": {
                        "keyPlayslideshow": "播放投影片"
                    },
                    "zh-tw": {
                        "keyPlayslideshow": "播放投影片"
                    }
                }
            }

            $(".sl-hero").append('<div class="c-carousel f-multi-slide f-auto-play" role="region" aria-label="featured items on xbox dot com" data-js-interval="6000">' +
                '<div class="c-group">' +
                // '<button class="c-action-toggle high-contrast c-glyph glyph-play f-toggle" data-toggled-label="Play" data-toggled-glyph="glyph-pause" ' +
                // 'aria-label="' + playslidetext.locales[urlRegion].keyPlayslideshow + '" aria-pressed="false"></button>' +
                '<button class="c-action-toggle high-contrast c-glyph glyph-play f-toggle" data-toggled-label="Pause" data-toggled-glyph="glyph-pause" ' +
                'aria-label="Play" aria-pressed="false"></button>' +
                '<div class="c-sequence-indicator" role="tablist">' +
                '<button role="tab" aria-selected="true" aria-label="" aria-controls="hero-1" title="' +
                regHeroContent["keyHero1headline"].replace("<br>", " ") + '"></button>' +
                '<button role="tab" aria-selected="false" aria-label="" aria-controls="hero-2" title="' +
                regHeroContent["keyHero2headline"].replace("<br>", " ") + '"></button>' +
                '</div>' +
                '</div>' +
                '<button class="c-flipper f-previous high-contrast" aria-hidden="true" tabindex="-1"></button>' +
                '<button class="c-flipper f-next high-contrast" aria-hidden="true" tabindex="-1"></button>' +
                '<div itemscope itemtype="http://schema.org/ItemList">' +
                '<ul class="heroList">' +
                '</ul>' +
                '</div>' +
                '</div>')

            for (var i = 1; i <= numHeroes; i++) {
                var heroPre = "keyHero" + i;
                if (i > 2) {
                    var controllab = regHeroContent[heroPre + "headline"].replaceAll("<br>", " ").replaceAll("</br>", " ").replaceAll("<i>", "").replaceAll("</i>", "").replaceAll("<b>", "").replaceAll("</b>", "");
                    if (controllab.length === 0) {
                        controllab = regHeroContent[heroPre + "subheading"].replaceAll("<br>", " ").replaceAll("</br>", " ").replaceAll("<i>", "").replaceAll("</i>", "").replaceAll("<b>", "").replaceAll("</b>", "");
                    }
                    $(".sl-hero .c-sequence-indicator button").last().after('<button role="tab" aria-selected="false" aria-label="' + controllab + '" aria-controls="hero-' +
                        i + '" title="' + controllab + '"></button>')
                }
                var heroInsert = heroTypes[regHeroContent[heroPre + "type"].toLowerCase()];
                $(".sl-hero .heroList").append('<li id="hero-' + i + '">' +
                    heroInsert +
                    '</li>')
                if (regHeroContent[heroPre + "extraclasses"] !== "####") {
                    $(".sl-hero li").eq(i - 1).find(".m-hero-item").addClass(regHeroContent[heroPre + "extraclasses"])
                }
                var ariasectionhelp = regHeroContent[heroPre + "headline"].replace(/<[^>]*>/g, " ");
                if (ariasectionhelp.length === 0) {
                    ariasectionhelp = regHeroContent[heroPre + "subheading"].replace(/<[^>]*>/g, " ");
                }
                $(".sl-hero li").eq(i - 1).find("section").attr("aria-label", "section describing " + ariasectionhelp)
                $(".sl-hero li").eq(i - 1).find(".heroImgDesktop").attr("srcset", regHeroContent[heroPre + "imagedesktop"])
                $(".sl-hero li").eq(i - 1).find(".heroImgTablet").attr("srcset", regHeroContent[heroPre + "imagetablet"])
                $(".sl-hero li").eq(i - 1).find(".heroImgTabletSmall").attr("srcset", regHeroContent[heroPre + "imagetabletsmall"])
                $(".sl-hero li").eq(i - 1).find(".heroImgMobile").attr("srcset", regHeroContent[heroPre + "imagemobile"])
                $(".sl-hero li").eq(i - 1).find("picture img").attr("src", regHeroContent[heroPre + "imagedesktop"]).attr("srcset", regHeroContent[heroPre + "imagedesktop"])
                $(".sl-hero li").eq(i - 1).find("video source").attr("src", regHeroContent[heroPre + "imagedesktop"]); // for video
                $(".sl-hero li").eq(i - 1).find("picture img").attr("alt", regHeroContent[heroPre + "alt"])
                $(".sl-hero li").eq(i - 1).find("video").attr("alt", regHeroContent[heroPre + "alt"]); // for video
                $(".sl-hero li").eq(i - 1).find("video").attr("poster", regHeroContent[heroPre + "imagetablet"]); // for video
                $(".sl-hero li").eq(i - 1).find(".heronovideomobile").attr("src", regHeroContent[heroPre + "imagesmallest"])
                $(".sl-hero li").eq(i - 1).find(".heronovideomobsmallest").attr("srcset", regHeroContent[heroPre + "imagesmallest"]);
                $(".sl-hero li").eq(i - 1).find(".heronovideomobmedium").attr("srcset", regHeroContent[heroPre + "imagemobile"]);
                $(".sl-hero li").eq(i - 1).find(".heronovideomobbiggest").attr("srcset", regHeroContent[heroPre + "imagetablet"]);
                if (regHeroContent["keyHero" + i + "badgecolor"].toLowerCase() === "gold") {
                    $(".sl-hero li").eq(i - 1).find(".c-badge").addClass("f-highlight");
                } else {
                    $(".sl-hero li").eq(i - 1).find(".c-badge").addClass("f-lowlight");
                }
                if (regHeroContent["keyHero" + i + "headlinesmaller"] !== undefined && regHeroContent["keyHero" + i + "headlinesmaller"].length > 1) {
                  $(".sl-hero li").eq(i - 1).find(".c-heading-1a").addClass("c-heading-1").removeClass("c-heading-1a");
                }
                $(".sl-hero li").eq(i - 1).find(".c-badge span").text(regHeroContent["keyHero" + i + "badgecopy"]);
                $(".sl-hero li").eq(i - 1).find("h1").html(regHeroContent[heroPre + "headline"])
                $(".sl-hero li").eq(i - 1).find("p.c-subheading-1").html(regHeroContent[heroPre + "subheading"])
                $(".sl-hero li").eq(i - 1).find("p.c-subheading-2").html(regHeroContent[heroPre + "subheading"])
                $(".sl-hero li").eq(i - 1).find("a.cta1").attr("href", regHeroContent[heroPre + "link"])
                $(".sl-hero li").eq(i - 1).find("a.cta1 span").text(regHeroContent[heroPre + "cta"])
                if (regHeroContent[heroPre + "ctatype"] !== undefined && regHeroContent[heroPre + "ctatype"].toLowerCase() === "text") { 
                    $(".sl-hero li").eq(i - 1).find("a.cta1").removeClass("f-heavyweight").addClass("f-lightweight");
                }
                if (regHeroContent[heroPre + "dataretailer"] !== "####" && regHeroContent[heroPre + "dataretailer"] !== "") {
                    $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-retailer", regHeroContent[heroPre + "dataretailer"])
                }
                if (regHeroContent[heroPre + "datacta"] !== "####" && regHeroContent[heroPre + "datacta"] !== "") {
                    $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-cta", regHeroContent[heroPre + "datacta"])
                }
                $(".sl-hero li").eq(i - 1).find("a.cta1").attr("aria-label", regHeroContent[heroPre + "arialabel"])

                $(".sl-hero li").eq(i - 1).find("a.cta2").attr("href", regHeroContent[heroPre + "link2"])
                $(".sl-hero li").eq(i - 1).find("a.cta2 span").text(regHeroContent[heroPre + "cta2"])
                if (regHeroContent[heroPre + "ctatype2"] !== undefined && regHeroContent[heroPre + "ctatype2"].toLowerCase() === "text") { 
                    $(".sl-hero li").eq(i - 1).find("a.cta2").addClass("f-lightweight");
                } else {
                    $(".sl-hero li").eq(i - 1).find("a.cta2").addClass("f-heavyweight");
                }
                if (regHeroContent[heroPre + "dataretailer2"] !== "####" && regHeroContent[heroPre + "dataretailer2"] !== "") {
                    $(".sl-hero li").eq(i - 1).find("a.cta2").attr("data-retailer", regHeroContent[heroPre + "dataretailer2"])
                }
                if (regHeroContent[heroPre + "datacta2"] !== "####" && regHeroContent[heroPre + "datacta2"] !== "") {
                    $(".sl-hero li").eq(i - 1).find("a.cta2").attr("data-cta", regHeroContent[heroPre + "datacta2"])
                }
                $(".sl-hero li").eq(i - 1).find("a.cta2").attr("aria-label", regHeroContent[heroPre + "arialabel2"])
                if ($(".sl-hero li").eq(i - 1).find("p.c-subheading-1").text() === "####") {
                    $(".sl-hero li").eq(i - 1).find("p.c-subheading-1").remove();
                }
                if ($(".sl-hero li").eq(i - 1).find("p.c-subheading-2").text() === "####") {
                    $(".sl-hero li").eq(i - 1).find("p.c-subheading-2").remove();
                }
                if ($(".sl-hero li").eq(i - 1).find("h1").text() === "####") {
                    $(".sl-hero li").eq(i - 1).find("h1").remove();
                }
                if ($(".sl-hero li").eq(i - 1).find("h1").text().length > 32) {
                    $(".sl-hero li").eq(i - 1).find("h1").removeClass("c-heading-1").addClass("c-heading-2");
                }
            }
        }

        $(".sl-hero a").each(function() {
            if ($(this).text() === "####" || $(this).text() === "") {
                $(this).remove();
            }
        })
        $(".sl-hero p").each(function() {
            if ($(this).text() === "####") {
                $(this).remove();
            }
        })
        $(".sl-hero h1").each(function() {
            if ($(this).text() === "####") {
                $(this).remove();
            }
        })



        $(".sl-hero ul li").eq(0).addClass("f-active");

        $(".heroList section").each(function() {
            if ($(this).hasClass("theme-dark")) {
                $(this).parents("li").attr("data-f-theme", "dark")
            } else {
                $(this).parents("li").attr("data-f-theme", "light")
            }
        })

        $(".sl-hero h1").each(function(index) {
            var head = $(this);
            var temphead = $(head).html();
            var headarr = temphead.toLowerCase().replace("<br>", " ").split(" ");
            headarr.forEach(function(word) {
                if (word.length > 11) {
                    $(head).removeClass("c-heading-1").addClass("c-heading-2");
                }
            })
        })

        $(".m-hero-item h1").each(function(index) {
            if (index !== 0) {
                var newhtext = $(this).html();
                var newhclasses = $(this).attr("class");
                $(this).after('<h2 class="' + newhclasses + ' x-hidden-focus">' + newhtext + '</h2>');
                $(this).remove();
            }
        });

        $(".m-hero-item p").each(function() {
            if ($(this).text().length === 0) {
                $(this).remove();
            }
        })

        if (regHeroContent["keyHero1type"].toLowerCase().trim() === "video" && 
            allContent.locales[urlRegion]["keySpecialstyles"].indexOf("noherofade") === -1) {
            videoTransitionCss();
        }

        function videoTransitionCss() {
            $("body").append('<style>' +
                '.m-hero .c-carousel { background-color: black !important; }' +
                '.heroList a { pointer-events: all; }' +
                '.heroList li { opacity: 0; visibility: hidden !important; transition-timing-function: linear !important; transition-duration: 0s, .7s !important;' +
                'transition-property: visibility, opacity !important; transition-delay: 1s, .3s !important; position: absolute !important; ' +
                'display: block !important; pointer-events: none; }' +
                '.heroList li.f-active  { opacity: 1; display: block !important; position:relative !important; visibility: visible !important;' +
                'transition-timing-function: linear !important; transition-duration: 0s, .7s !important; transition-property: visibility, opacity !important;' +
                'transition-delay: 0.3s, .7s !important; }' +
                '</style>')
        }

        // if (regHeroContent["keyTakeover"].length > 4) {
        //   $("#BodyContent #ContentBlockList_1").parent("div").prepend('<div class="clickableback" style="position: absolute; left: 0; right: 0; overflow: hidden;"><img src="' + 
        //     regHeroContent["keyTakeover"] + '" style="width: 100%; opacity:0;"><div data-grid="container" style="position: absolute; left:0; right: 0; height: 100%; top: 0;">' + 
        //     '<a class="lefttakeoverlink" style="position: absolute; right: 100%; width: 8vw; height: 100%; top: 0;" href="' + 
        //     regHeroContent["keyTakeoverurl"] + '" data-clickname="www>home>takeover>click"></a>' + 
        //     '<a class="righttakeoverlink" style="position: absolute; left: 100%; width: 8vw; height: 100%;top: 0;" href="' + regHeroContent["keyTakeoverurl"] + 
        //     '" data-clickname="www>home>takeover>click"></a></div></div>');
        //   $("#BodyContent #ContentBlockList_1").parent("div").css("background-image", "url(" + regHeroContent["keyTakeover"] + ")").css("background-repeat", "no-repeat");
        //   $("#BodyContent #ContentBlockList_1").parent("div").addClass("backgrounded").css("background-color", regHeroContent["keyTakeovercolor"]);
        //   $('.backgrounded [data-grid~="container"]').css("background", "white").css("max-width", "1600px").css("padding-left", "0").css("padding-right", "0");
        //   $(".ribbonSpacer").css("background", "white").css("margin-top", "0").css("padding-top", "48px");
        //   $(".homeRibbon").closest('[data-grid~="container"]').removeAttr("style");
        //   $(".homeRibbon").removeClass("theme-2f").css("background", "transparent").css("color", "white");
        //   $(".homeRibbon div, .homeRibbon picture").css("z-index", "3");
        //   $(".clickableback, .clickableback div").css("background", "transparent");
        // }

        setTimeout(function() {
            populateContent();
            $("body").css("visibility", "visible");
        }, 100)

        // setTimeout(function () {
        //   if ($(".c-carousel .c-action-toggle.c-glyph").hasClass("glyph-pause")) {
        //     heroPlaying();
        //   } else {
        //     heroPaused();
        //   }

        //   $(document).on("click", ".c-carousel .c-action-toggle.c-glyph.glyph-pause", function (e) {
        //     heroPlaying();
        //   })

        //   $(document).on("keydown", ".c-carousel .c-action-toggle.c-glyph.glyph-pause", function (e) {
        //     if ((e.keyCode == 13) || (e.keyCode == 32)) {
        //       heroPlaying();
        //     }
        //   })

        //   $(document).on("click", ".c-carousel .c-action-toggle.c-glyph.glyph-play", function (e) {
        //     heroPaused()
        //   })
        //   $(document).on("keydown", ".c-carousel .c-action-toggle.c-glyph.glyph-play", function (e) {
        //     if ((e.keyCode == 13) || (e.keyCode == 32)) {
        //       heroPaused();
        //     }
        //   })

        //   function heroPaused() {
        //     //$(".home-hero .c-carousel .c-action-toggle.c-glyph").attr("aria-label", "Play slideshow"); // play slideshow
        //   }
        //   function heroPlaying() {
        //    // $(".home-hero .c-carousel .c-action-toggle.c-glyph").attr("aria-label", "Play slideshow"); // pause slideshow
        //   }
        // }, 1500)
    })();


  //Forza 11/8 + Special Small Tout Colors
//   if (urlRegion === "en-us") {
//     $("body").append('<style>' +
//       '.hp-mosaic li:nth-child(2) .theme-green {background-color: #cd3500 !important;}' +
//       '.hp-mosaic li:nth-child(4) .theme-green {background-color: #dc005f !important;}' +
//       '</style>')
//   }
  // Forza Video
//     $("body").append('<style>' +
//     '@media screen and (min-width: 1084px) and (max-width: 1600px) {' +
//         '.home-hero .m-hero-item>div>div {max-width: 455px !important;}' +
//     '}' +
//     '@media screen and (max-width: 1400px) and (min-width: 1084px) {' +
//         '.home-hero .m-hero-item .c-subheading-1  {font-size: 24px; line-height: 28px;}' +
//     '}' +
//   '</style>')

    
    var populateContent = function() {
        var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
        if (urlRegion === "en-ae") {
            urlRegion = "ar-ae";
        } else if (urlRegion === "en-sa") {
            urlRegion = "ar-sa";
        } else if (urlRegion === "en-il") {
            urlRegion = "he-il";
        }


        var popJSON = (function() {
            var regionContent = allContent.locales[urlRegion];
            var allKeys = Object.keys(regionContent)
            var keysLength = allKeys.length
            for (var i = 0; i < keysLength; i++) {
                if (allKeys[i].indexOf("keyCopy") !== -1) {
                    $("[data-loc-copy=" + allKeys[i] + "]").html(regionContent[allKeys[i]]);
                    $("[data-loc-aria=" + allKeys[i] + "]").attr("aria-label", regionContent[allKeys[i]]);
                } else if (allKeys[i].indexOf("keyImage") !== -1) {
                    $("source[data-loc-image=" + allKeys[i] + "]").attr("srcset", regionContent[allKeys[i]]);
                    $("img[data-loc-image=" + allKeys[i] + "]").attr("src", regionContent[allKeys[i]]).attr("srcset", regionContent[allKeys[i]]);
                } else if (allKeys[i].indexOf("keyAlt") !== -1) {
                    $("[data-loc-alt=" + allKeys[i] + "]").attr("alt", regionContent[allKeys[i]]);
                } else if (allKeys[i].indexOf("keyLink") !== -1) {
                    $("[data-loc-link=" + allKeys[i] + "]").attr("href", regionContent[allKeys[i]]);
                } else if (allKeys[i].indexOf("keyClickname") !== -1) {
                    $("[data-loc-clickname=" + allKeys[i] + "]").attr("data-clickname", regionContent[allKeys[i]]);
                } else if (allKeys[i].indexOf("keyRetailer") !== -1) {
                    if (regionContent[allKeys[i]] !== "####" && regionContent[allKeys[i]] !== "") {
                        $("[data-loc-retailer=" + allKeys[i] + "]").attr("data-retailer", regionContent[allKeys[i]]);
                    }
                } else if (allKeys[i].indexOf("keyCta") !== -1) {
                    if (regionContent[allKeys[i]] !== "####" && regionContent[allKeys[i]] !== "") {
                        $("[data-loc-cta=" + allKeys[i] + "]").attr("data-cta", regionContent[allKeys[i]]);
                    }
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

            // popup video
            function removepopup() {
              //$(".sl-hero .f-toggle")[0].click();
              $(".home-hero").fadeIn(1, function() {  // usually 3000
                //$("#headerArea").removeClass("headersee");
                //$(".sl-hero .glyph-play")[0].click()
              });
              $(".iconBlade").removeClass("invisible");
              $(".homeMosaic").removeClass("invisible");
              $("#BodyFooter").removeClass("invisible");
               $("#headerArea").removeClass("invisible");
              //$("#thepopupvideo").addClass("fadingout");
              setTimeout(function() {
                $("#thepopupvideo").remove()
              }, 2000) // usually 4000
            }
            if ($(".videopopup").length > 0) {
              $(".herovideo video").attr("loop", "");
              $(".herovideo").addClass("pp-button");
              $(".videohero .high-contrast").prepend('<a style="display:none;" href="JavaScript:Void(0);" class="c-call-to-action c-glyph" data-clickname="" aria-hidden="true" tab-index="-1"></a>')
              // shared xbox js for pp button
              $("head").eq(0).append('<script type="text/javascript" src="/en-US/global-shares/templates/JS/xbox-MWF-2021.js"></s' + 'cript>'); 
              $("body").append('<style>' +
                                '.m-ambient-video{position:relative;}' +
                                  '.m-ambient-video button:focus{outline: 2px dashed #000 !important; border:2px dashed #fff !important;}' +
                                  '.m-ambient-video button{' +
                                    'height:36px !important;width: 36px;position: absolute;color: white;background-color:rgba(0, 0, 0, 0.60);' + 
                                    'border: 1px solid white !important;bottom: 148px;display: block;padding: 2px 0px 0px 0px;margin-left: 24px;}' +
                                  '.videohero {pointer-events:none !important}' +
                                  '.videohero a, .videohero button {pointer-events:auto !important}' +
                               '</style>')
              $(".pp-button button").unwrap();
              $(".thepopupvideo .glyph-cancel").attr("tabindex", "1");
              $("#thepopupvideo .vidPlayPause").attr("tabindex", "2");

              var screenwidth = $(document).width();

              if (screenwidth < 1080) {
                $(".blackout").removeClass("blackout");
                removepopup();
              }

              if ($(".videopopup video source").attr("src").length > 4 && screenwidth > 1079) {
                  $("#headerArea").addClass("invisible");
                  setTimeout(function() {
                      $(".sl-hero .f-toggle")[0].click();
                  }, 2000)
                //$("#headerArea").addClass("headersee");
                $("#thepopupvideo").show();
                $(".home-hero").hide();
                $(".iconBlade").addClass("invisible");
                $(".homeMosaic").addClass("invisible");
                $("#BodyFooter").addClass("invisible");
                setTimeout(function() {
                  removepopup();
                }, 9000)
                setTimeout(function() {
                  $(".sl-hero .glyph-play")[0].click()
                }, 12000)      

              } else {
                $(".videopopup").remove();
              }
              $(".blackout").removeClass("blackout");

              $("#thepopupvideo .c-glyph.glyph-cancel").click(function() {
                removepopup();
              });
              $(document).on("keydown", "#thepopupvideo .c-glyph.glyph-cancel", function (e) {
                  if ((e.keyCode == 13) || (e.keyCode == 32)) {
                    removepopup();
                  }
                })
            } else {
              $(".blackout").removeClass("blackout");
              removepopup();
            }
            //end popup

            // copy color
            var copycolors = ["Mos1pos1copycolor", "Mos1pos2copycolor", "Mos1pos3copycolor", "Mos1pos4copycolor", "Mos2pos1copycolor", "Mos2pos2copycolor", "Mos2pos3copycolor", "Mos2pos4copycolor"]

            copycolors.forEach(function(b) {
                var bc = "keyCopy" + b.toLowerCase().replace("copy", "badge").replace("color", "");
                var color = regionContent["key" + b].toLowerCase();
                if (color === "white") {
                    if (!$("[data-loc-copy='" + bc + "']").closest("section").hasClass("greenthm")) {
                        $("[data-loc-copy='" + bc + "']").closest("section").removeClass("theme-dark").removeClass("theme-light").addClass("theme-dark");
                    }
                    $("[data-loc-copy='" + bc + "']").closest("section").find("h2, h3, p, span, a").not(".c-badge span").removeClass("white-c").removeClass("black-c").not(".c-call-to-action span").addClass("white-c");
                    if (b === "Mos2pos4copycolor") {
                        if (color === "white") {
                            $("[data-loc-copy='" + bc + "']").closest("section").parent().addClass("theme-dark") 
                        }
                    }
                } else {
                    if (!$("[data-loc-copy='" + bc + "']").closest("section").hasClass("greenthm")) {
                        $("[data-loc-copy='" + bc + "']").closest("section").removeClass("theme-dark").removeClass("theme-light");
                    }
                    $("[data-loc-copy='" + bc + "']").closest("section").find("h2, h3, p, span, a").not(".c-badge span").removeClass("white-c").removeClass("black-c").addClass("black-c");
                }
            })

            if (regionContent["keyFullcopycolor"].toLowerCase().trim() === "white") {
                $(".fullLeftRight .copy").not(".fullLeftRight2 .copy").find("h2, h3, p, span").not(".c-badge span").removeClass("white-c").removeClass("black-c").not(".c-call-to-action span").addClass("white-c");
                $(".fullLeftRight .copy").not(".fullLeftRight2 .copy").find("a").not(".c-badge span").removeClass("f-lightweight");
                $(".fullLeftRight").not(".fullLeftRight2").addClass("theme-dark")
            } else {
                $(".fullLeftRight section").not(".fullLeftRight2 section").removeClass("theme-dark")
            }

            if (regionContent["keyFullcopycolor2"].toLowerCase().trim() === "white") {
                $(".fullLeftRight2 .copy").find("h2, h3, p, span").not(".c-badge span").removeClass("white-c").removeClass("black-c").not(".c-call-to-action span").addClass("white-c");
                $(".fullLeftRight2 .copy").find("a").not(".c-badge span").removeClass("f-lightweight");
                $(".fullLeftRight2").removeClass("theme-dark").addClass("theme-black");
                $(".fullLeftRight2 .m-hero-item").removeClass("theme-white").addClass("theme-black");
            } else {
                $(".fullLeftRight2 section").removeClass("theme-dark");
            }

            //snowbird
            $('[data-loc-cta="keyCtamos1pos2"]').removeClass("f-lightweight");
            $('[data-loc-cta="keyCtadq2left"]').removeClass("f-lightweight").addClass("white-c");

            // contrast issue non-gear regions
            var gearregions = ["en-us", "de-de", "en-ca", "en-gb", "fr-ca", "fr-fr"]
            if (gearregions.indexOf(urlRegion) === -1) {
              $("[data-loc-cta='keyCtamos2pos3']").removeClass("lime-green-c").removeClass("white-c").removeClass("f-lightweight").addClass("f-heavyweight")
                                                  .find("span").removeClass("white-c").removeClass("lime-green-c");
            }

            // badge color
            var badgecolors = ["Mos1pos1badgecolor", "Mos1pos2badgecolor", "Mos1pos3badgecolor", "Mos1pos4badgecolor", "Dq1leftbadgecolor", "Dq1rightbadgecolor",
                "Fullbadgecolor", "Dq2leftbadgecolor", "Dq2rightbadgecolor", "Mos2pos1badgecolor", "Mos2pos2badgecolor", "Mos2pos3badgecolor", "Mos2pos4badgecolor", "Fullbadgecolorb"
            ]

            badgecolors.forEach(function(b) {
                var bc = "keyCopy" + b.toLowerCase().replace("color", "");
                if (regionContent["key" + b] !== undefined) {
                    var color = regionContent["key" + b].toLowerCase();
                    if (color === "gold") {
                        $("[data-loc-copy='" + bc + "']").closest(".c-badge").removeClass("f-highlight").removeClass("f-lowlight").addClass("f-highlight");
                    } else {
                        $("[data-loc-copy='" + bc + "']").closest(".c-badge").removeClass("f-highlight").removeClass("f-lowlight").addClass("f-lowlight");
                    }
                }
            })

            $(".icons a").each(function() {
                if ($(this).attr("href") === "####") {
                    $(this).remove();
                }
            })

            $(".hp-mosaic li a.c-call-to-action span.secondcta").each(function() {
                if ($(this).text() === "####") {
                    $(this).closest("a").remove();
                }
            })

            $(".hp-mosaic li a.c-call-to-action span").not(".secondcta").each(function() {
                if ($(this).text() === "####") {
                    $(this).closest("li").remove()
                }
            })

            $(".c-badge span").each(function() {
                if ($(this).text() === "####") {
                    $(this).closest(".c-badge").remove()
                }
            })
            // Other Domains
            $(".home-hero a.c-call-to-action").each(function() {
                var temphref = $(this).attr("href")
                if (temphref.toLowerCase().indexOf("www.xbox.com") === -1) {
                    $(this).attr("target", "blank");
                }
            })

            $(".hp-mosaic a").each(function() {
                var temphref = $(this).attr("href")
                if (temphref.toLowerCase().indexOf("www.xbox.com") === -1) {
                    $(this).attr("target", "blank");
                }
            })
            $(".gearMerch h2:contains(####)").closest(".gearMerch").remove();
            $("h2:contains(####)").closest(".slide").remove();
            // if ($(".gearMerch h2").hasClass("white-c")) {
            //     $(".gearMerch").addClass("theme-black");
            // }
            //TODO: FIX THIS TO BE REGULAR IMAGES!!!!!
            //CHECK GAMES/XBOX(ONE?) TO MAKE SURE THIS FILE ISN'T SHARED
            $("#zoomImg1 img").attr("src", regionContent["keyImagemos1pos2anim"]);
            $("#zoomImg2 img").attr("src", regionContent["keyImagemos1pos4anim"]);
            $("#zoomImg3 img").attr("src", regionContent["keyImagedq1leftanim"]);
            $("#zoomImg4 img").attr("src", regionContent["keyImagedq1rightanim"]);
            $("#zoomImg5 img").attr("src", regionContent["keyImagedq2leftanim"]);
            $("#zoomImg6 img").attr("src", regionContent["keyImagedq2rightanim"]);
            $("#zoomImg7 img").attr("src", regionContent["keyImagemos2pos1anim"]);
            $("#zoomImg8 img").attr("src", regionContent["keyImagemos2pos4anim"]);
            /*$("body").append('<style>' +
                    '#zoomImg1 {' +
                    'background: url(' + regionContent["keyImagemos1pos2anim"] + ');' +
                    '}' +
                    '#zoomImg2 {' +
                    'background: url(' + regionContent["keyImagemos1pos4anim"] + ');' +
                    '}' +
                    '#zoomImg3 {' +
                    'background: url(' + regionContent["keyImagedq1leftanim"] + ');' +
                    '}' +
                    '#zoomImg4 {' +
                    'background: url(' + regionContent["keyImagedq1rightanim"] + ');' +
                    '}' +
                    '#zoomImg5 {' +
                    'background: url(' + regionContent["keyImagedq2leftanim"] + ');' +
                    '}' +
                    '#zoomImg6 {' +
                    'background: url(' + regionContent["keyImagedq2rightanim"] + ');' +
                    '}' +
                    '#zoomImg7 {' +
                    'background: url(' + regionContent["keyImagemos2pos1anim"] + ');' +
                    '}' +
                    '#zoomImg8 {' +
                    'background: url(' + regionContent["keyImagemos2pos4anim"] + ');' +
                    '}' +
                    '@media screen and (min-width: 1084px) {' +
                    '.fullTile section {' +
                    'background-image: url(' + regionContent["keyImagefullanim"] + ');' +
                    '}' +
                    '}' +
                    '@media screen and (min-width: 1084px) {' +
                    '.fullTile.gearMerch section {' +
                    'background-image: url(' + regionContent["keyImagefullbanim"] + ');' +
                    '}' +
                    '}' +
                    '</style>'
            )*/

            // middle full blade center top copy
            if (regionContent["keyTypefull"].toLowerCase().trim() === "centertop") {
                $("[data-loc-aria='keyAriafull']").closest(".fullTile").addClass("fullTileCenterTop");
                $(".fullTileCenterTop section .copy").prepend('<picture class="c-image fulltilelogo">' +
                    '<source class="heroImgMobile" srcset="' + regionContent["keyImagefulllogo"] + '" media="(min-width:0)">' +
                    '<img srcset="' + regionContent["keyImagefulllogo"] + '" src="' + regionContent["keyImagefulllogo"] + '" alt="xbox one logo">' +
                    '</picture>');
                $("body").append('<style>' +
                    '@media screen and (min-width: 1084px) {' +
                    '.fullTile.fullTileCenterTop .copy { top: 52px; }' +
                    '}' +
                    '@media screen and (min-width: 1600px) {' +
                    '.fullTile.fullTileCenterTop .copy { top: 136px; max-width: 880px; padding: 0; }' +
                    '}' +
                    '</style>'
                )
            }
            if (regionContent["keyTypefull"].toLowerCase().trim() === "left") {
                $(".fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item").eq(0).addClass("f-x-right").removeClass("f-x-left");
                $("body").append('<style>' +
                '@media screen and (min-width: 1084px) {' +
                '.fullTile.fullLeftRight:not(.fullLeftRight2) .copy {float: left;}' +
                '}' +
                '</style>'
                )
            }
            if (regionContent["keyImagefulllogo"] === "####") {
              $(".fulltilelogo").remove();
            }
            if (regionContent["keyLinkfull2"] === "####") {
                $("[data-loc-link='keyLinkfull2']").remove();
            }
            // green outline small tout fix
            $("body").append('<style>' +
                '@media screen and (min-width: 1084px) {' +
                '.hp-mosaic li.double .floatR { height: 27.75vw; position: relative; right: -1px; }' +
                '}' +
                '</style>'
            )

            //special styling css
            var thespecials = regionContent["keySpecialstyles"].replace(/\s+/g, '').split(",");
            for (var i = 0; i < thespecials.length; i++) {
                if (thespecials[i] === "fullblade1") {
                    console.log("running special style " + thespecials[i]);
                    $(".fullLeftRight").not(".fullLeftRight2").addClass("fblrstyle");
                    $(".fblrstyle .c-call-to-action").addClass("green-brdr");
                    $(".fblrstyle p").removeClass("c-paragraph-2").addClass("c-subheading-2");
                    $("body").append('<style>' +
                        '@media screen and (min-width: 1400px) { .fullTile .copy { padding-right: 8%; max-width: 680px;} }' +
                        '@media screen and (min-width: 1800px) { .fullTile .copy { padding-right: 12%; max-width: 680px; } }' +
                        '@media screen and (min-width: 1084px) {.fblrstyle.theme-dark { background-color: transparent; } }' +
                        '.fblrstyle h2 { letter-spacing: .08em; text-transform: uppercase; }' +
                        '.fblrstyle p { letter-spacing: .5em; margin-top: 8px; text-transform: uppercase; }' +
                        '.fblrstyle .green-brdr { border: 2px solid #9bf00b !important; }' +
                        '.fblrstyle a.c-call-to-action.c-glyph.green-brdr:hover { background: #107c10 !important; }' +
                        '.fblrstyle strong.c-badge.f-small.f-lowlight { color: black; background: white; }' +
                        '.fblrstyle a.c-call-to-action.c-glyph.green-brdr:focus { outline: 3px dashed white !important; }' +
                        '</style>')
                }

                if (thespecials[i] === "longvideo") {
                    console.log("running special style " + thespecials[i]);
                  $(".herovideo video").attr("loop", "");
                  $(".herovideo").addClass("pp-button");
                  $(".videohero .high-contrast").prepend('<a style="display:none;" href="JavaScript:Void(0);" class="c-call-to-action c-glyph" data-clickname="" aria-hidden="true" tab-index="-1"></a>')
                  // shared xbox js for pp button
                  if (thespecials.indexOf("grounded") === -1 && thespecials.indexOf("launch") === -1) {
                      $("head").eq(0).append('<script type="text/javascript" src="/en-US/global-shares/templates/JS/xbox-MWF-2021.js"></s' + 'cript>'); 
                      $("body").append('<style>' +
                                        '.m-ambient-video{position:relative;}' +
                                          '.m-ambient-video button:focus{outline: 2px dashed #000 !important; border:2px dashed #fff !important;}' +
                                          '.m-ambient-video button{' +
                                            'height:36px !important;width: 36px;position: absolute;color: white;background-color:rgba(0, 0, 0, 0.60);' + 
                                            'border: 1px solid white !important;bottom: 24px;display: block;padding: 2px 0px 0px 0px;margin-left: 24px;}' +
                                          '.videohero {pointer-events:none !important}' +
                                          '.videohero a, .videohero button {pointer-events:auto !important}' +
                                       '</style>')
                      $(".pp-button button").unwrap();
                  }
                }

                // Console Promo Middle Hero 
                if (thespecials[i] === "middleherojump") {
                    console.log("running special style " + thespecials[i]);

                    var theJump = '<span class="jump-g jump-b"></span>'

                    $(".fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item").eq(0).addClass("f-x-right").removeClass("f-x-left");
                    $(".fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item h2").addClass("c-heading-1a").removeClass("c-heading-2");
                    $(".fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item p").addClass("c-subheading-1").removeClass("c-paragraph-2");

                    
                    $(".fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item h2").after(theJump);


                    $("body").append('<style>' +
                    '@media screen and (min-width: 1084px) {' +
                        '.fullTile.fullLeftRight:not(.fullLeftRight2) .copy {float: left;}' +
                    '}' +
                    '@media screen and (max-width: 1083px) and (min-width: 539px) {' +
                    '.fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item .c-subheading-1 {font-size: 26px; line-height: 32px;}' +
                    '.fullTile.fullLeftRight:not(.fullLeftRight2) .c-group {margin-top: 0;}' +
                    '}' +
                    '@media screen and (min-width: 0) {' +
                        '.fullTile.fullLeftRight:not(.fullLeftRight2) .c-heading-1a + .jump-g.jump-b {top: 10px;}' +
                    '}' +
                    '</style>')
                }

                // Middle Full Hero Animation
                if (thespecials[i] === "fullanimation") {
                        console.log("running special style " + thespecials[i]);
                        $("body").append('<style>' +
                            '@media screen and (min-width: 1084px) {' +
                            //'.fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item.f-x-right.f-y-center .copy {transform: translate(-50%,-50%) !important; left: calc(20%) !important; max-width: 30% !important; position: absolute !important; padding-right: 0 !important;}' +
                            //'.fullTile.fullLeftRight:not(.fullLeftRight2) section.m-hero-item>div>div>div {margin-top: 0; padding-top: 0;}' +
                            //'.fullTile.fullLeftRight:not(.fullLeftRight2) section.m-hero-item.f-x-right>div {left: 0 !important;}' +
                            //'.fullTile.fullLeftRight:not(.fullLeftRight2) section.m-hero-item.f-x-right .fulltilelogo {display: inline-block !important;}' +
                            '.fullTile.fullLeftRight:not(.fullLeftRight2) .vidPlayPause {left: -99vw; top: 16.5vw;}' +
                            //'.fullTile.fullLeftRight:not(.fullLeftRight2) .copy {float: left;}' +
                            '}' +
                            '@media screen and (max-width: 1300px) and (min-width: 1084px) {' +
                            //'.fullTile.fullLeftRight:not(.fullLeftRight2) .m-hero-item.f-x-right.f-y-center .copy {transform: translate(-50%,-60%) !important;}' +
                            '}' +
                            '.m-ambient-video.bgvid {padding: 0;}' +
                            '@media screen and (min-width: 1084px) {' +
                                '[data-loc-image="keyImagefullanim"] {display: none !important;}' +
                                '.fullTile section.m-hero-item>div.m-ambient-video {left: 0px;}' +
                              '}' +
                              '@media screen and (max-width: 1083px) { .m-ambient-video.bgvid, .transparentGif {display: none !important;} }'+
                            '</style>'
                        )
                    
                    
                        $('.fullLeftRight').not(".fullLeftRight2").find("section").prepend('<div class="m-ambient-video pp-button bgvid">' +
                            '<video role="img" id="full-video" poster="" muted="" autoplay="" loop="" aria-label="' + regionContent["keyAltfull"] + '">' +
                            '<source src="' + regionContent["keyImagefullanim"] + '" type="video/mp4"></video></div>')     
                    
                }

                // 1080px Tall Hero
                if (thespecials[i] === "tallhero") {
                    console.log("running special style " + thespecials[i]);
                    // $(".herovideo video").removeAttr("loop");
                    $("body").append('<style>' +
                    '@media screen and (min-width: 1084px) {' +
                        '.home-hero section {height: 55.7vw;}' +
                        // '.home-hero .vidPlayPause {top: 23vw;}' +
                    '}' +
                    '@media screen and (min-width: 1921px) {' +
                      '.home-hero .videohero {height: auto;}' +
                      '.home-hero .vidPlayPause {top: 18vw;}' +
                      '.home-hero .m-hero-item:before {padding-bottom: 61.875% !important;}' +
                    '}' +
                    '</style>')
                }

                if (thespecials[i] === "tallherohalo") { // a little more specialized for halo launch
                    console.log("running special style " + thespecials[i]);
                    $(".herovideo video").removeAttr("loop");
                    $("body").append('<style>' +
                    '.home-hero .vidPlayPause {top: auto !important; bottom: 24px;}' +
                    '.videohero .c-badge {background: #107c10 !important;color: white !important;}' +
                    'span.jump-g.jump-b {right: 1vw;}' +
                    '@media screen and (min-width: 1084px) {' +
                        '.home-hero section {height: 55.7vw;}' +
                        '.home-hero .vidPlayPause {top: 23vw;}' +
                    '}' +
                    '@media screen and (min-width: 1921px) {' +
                      '.home-hero .videohero {height: auto;}' +
                      '.home-hero .vidPlayPause {top: 18vw;}' +
                      '.home-hero .m-hero-item:before {padding-bottom: 61.875% !important;}' +
                    '}' +
                    '</style>')
                    $(".videohero").addClass("f-precise-click");
                    $(".herovideo").addClass("pp-button");
                    $(".videohero h1").addClass("c-heading-1a").removeClass("c-heading-1");
                    $(".c-heading-1a").after('<span class="jump-g jump-b"></span>');
                    $(".videohero .c-subheading-1").addClass("c-heading-2 zpt").removeClass("c-subheading-1");
                    $("head").append('<script type="text/javascript" src="/en-US/global-shares/templates/JS/xbox-MWF-2021.js"></s' + 'cript>'); 
                }
                
                // Fade
                if (thespecials[i] === "fade") {
                    console.log("running special style " + thespecials[i]);
                    $("body").append('<style>' +
                    '@media screen and (min-width: 1084px) {' +
                      '.home-hero .m-hero-item div>div.high-contrast {opacity: 0; animation-name: fadein; animation-duration: 2s; animation-timing-function: ease-in-out; visibility: visible !important; animation-delay: 6s; animation-fill-mode: forwards;}' +
                      '}' +
                      '@keyframes fadein {' +
                      'from {' +
                        'opacity: 0;' +
                      '}' +
                      'to {' +
                      'opacity: 1;' +
                      '}' +
                      '</style>')

                }

                // Full Width Small Touts 1 and 2
                if (thespecials[i] === "smallfulltout") {
                    console.log("running special style " + thespecials[i]);
                    $("body").append('<style>' +
                        '@media screen and (min-width: 1084px) {' +
                        '#zoomImg1 {float: none; width: calc(100% - 4px); position: absolute; top: 2px; left: 2px; background-color: transparent !important;}' +
                        '#zoomImg2 {float: none; width: calc(100% - 4px); position: absolute; top: 2px; left: 2px; background-color: transparent !important;}' +
                        '#zoomImg5 {float: none; width: calc(100% - 4px); position: absolute; top: 2px; left: 2px; background-color: transparent !important;}' +
                        '#zoomImg8 {float: none; width: calc(100% - 4px); position: absolute; top: 2px; left: 2px; background-color: transparent !important;}' +
                        '.hp-mosaic li:nth-child(4) .m-content-placement-item {background-color: transparent !important;}' +
                        '.hp-mosaic li:nth-child(4) .theme-green, .hp-mosaic li:nth-child(2) .theme-green {background-color: transparent !important;}' +
                        '#zoomImg8-parent .m-content-placement-item {float: right;background: transparent !important;}' +
                        // Turn off Zoom
                        '#zoomImg1.zoomImg:hover img, #zoomImg2.zoomImg:hover img {-moz-transform: none !important; -webkit-transform: none !important; transform: none !important;}' +
                    '}' +
                    '</style>')
                }

                // Special Wayfinder Color
                if (thespecials[i].indexOf("#") !== -1) {
                    var hexColor = thespecials[i];
                    $(".icons a p span").css("color", hexColor);

                }

                if (thespecials[i] === "fulltilelightweight") {
                    console.log("running special style " + thespecials[i]);
                  $(".fullLeftRight").not(".fullLeftRight2").find("a").eq(0).addClass("f-lightweight");
                }

                if (thespecials[i] === "soloblankhero") {
                    console.log("running special style " + thespecials[i]);
                    $("body").append('<style>' +
                                    '@media (max-width: 767px) {' +
                                      '.m-hero-item:before {padding-bottom: 0 !important;}' +
                                      '.m-hero-item[class*="f-x"][class*="f-y"]>div>div {transform: translateY(-78%);}' +
                                    '}' +
                                    '@media (min-width: 768px) and (max-width: 1083px) {' +
                                      // '.m-hero-item:before {padding-bottom: 0 !important;}' +
                                      // '.m-hero-item[class*="f-x"][class*="f-y"]>div>div {transform: translateY(-78%);}' +
                                      '.m-hero-item.f-y-center.f-x-center>div>div { -ms-transform: translate(0%,0%); transform: translate(0%,0%); }' +
                                      '.home-hero section {height: 60vw !important;}' +
                                      '.home-hero .m-hero-item>div>div {top: 30% !important;}' +
                                    '}' +
                                   '</style>')

                  
                }

                if (thespecials[i] === "multiblankhero") {
                    console.log("running special style " + thespecials[i]);
                    $("body").append('<style>' +
                                    '@media (max-width: 767px) {' +
                                      // '.m-hero-item.f-y-center.f-x-center:before {padding-bottom: 0 !important;}' +
                                      '.m-hero-item.f-y-center.f-x-center[class*="f-x"][class*="f-y"]>div>div {transform: translateY(-78%);}' +
                                      '.home-hero .m-hero-item.f-y-center.f-x-center>div>div {top: 6vw !important;}' +
                                    '}' +
                                    '@media (min-width: 768px) and (max-width: 1083px) {' +
                                      // '.m-hero-item:before {padding-bottom: 0 !important;}' +
                                      // '.m-hero-item[class*="f-x"][class*="f-y"]>div>div {transform: translateY(-78%);}' +
                                      '.m-hero-item.f-y-center.f-x-center>div>div { -ms-transform: translate(0%,0%); transform: translate(0%,0%); }' +
                                      // '.home-hero section {height: 60vw !important;}' +
                                      '.home-hero .m-hero-item.f-y-center.f-x-center>div>div {top: 50% !important;}' +
                                    '}' +
                                   '</style>')

                  
                }

                if (thespecials[i] === "pyd") {
                    console.log("running special style " + thespecials[i]);
                    $("body").append('<style>' +
                                    '.home-hero .m-hero-item.f-x-center.f-y-bottom .high-contrast {max-width: none;}' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {font-weight: 300 !important;line-height: 1.5;letter-spacing: 18px;}' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.5em;letter-spacing: 32px;}' +
                                    '@media (max-width: 1920px) and (min-width: 1700px) {' +
                                    '.home-hero .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 46px;margin-bottom: calc(4.5vw - 1.0vw);margin-left: calc(2.5vw - 1.0vw);}' +
                                    '}' +
                                    '@media (max-width: 1699px) and (min-width: 1550px) {' +
                                    '.home-hero .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 38px;margin-bottom: calc(5vw - 1.0vw);margin-left: calc(2.5vw - 1.0vw);}' +
                                    '}' +
                                    '@media (max-width: 1549px) and (min-width: 1250px) {' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.3;font-size: 32px;margin-bottom: calc(5.5vw - 1.0vw);margin-left: calc(2.5vw - 1.0vw);}' +
                                    '}' +
                                    '@media (max-width: 1249px) and (min-width: 1084px) {' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.3;font-size: 28px;margin-bottom: calc(3vw - 1.0vw);margin-left: calc(2.5vw - 1.0vw);}' +
                                    '}' +
                                    '@media (max-width: 767px) {' +
                                    '.home-hero .m-hero-item.f-x-center.f-y-bottom>div>div {top: -10% !important;}' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {letter-spacing: 16px;margin-bottom: 1vw;font-size: 42px;margin-left: calc(4vw - 1.0vw);}' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 strong {letter-spacing: 24px;}' +
                                    '}' +
                                    '@media (max-width: 480px) {' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.2;letter-spacing: 6px;margin-bottom: 1vw;margin-left: calc(2.5vw - 1.0vw);}' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 strong {line-height: 1.2;letter-spacing: 8px;}' +
                                    '}' +
                                    '@media (min-width: 768px) and (max-width: 1083px) {' +
                                    '.home-hero .m-hero-item.f-x-center.f-y-bottom>div>div {top: 60% !important;}' +
                                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {margin-bottom: 2vw;margin-left: calc(2.5vw - 1.0vw);}' +
                                    '}' +
                                   '</style>')

                  if ((urlRegion === "tr-tr") || (urlRegion === "fi-fi")) {
                    $("body").append('<style>' +
                    '@media (max-width: 960px) {' +
                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {font-size: 26px;}' +
                    '}' +
                    '@media (max-width: 650px) {' +
                    '.home-hero .f-x-center.f-y-bottom .c-heading-2 {font-size: 12px !important;}' +
                    '}' +
                   '</style>')
                  }
                }

                if (thespecials[i] === "pydfull") {
                    console.log("running special style " + thespecials[i]);
                    $(".fullLeftRight").eq(0).addClass("pydFullStyle");
                    $(".fullLeftRight .m-hero-item").eq(0).addClass("f-x-center").addClass("f-y-bottom")
                                                          .removeClass("f-x-right").removeClass("f-y-center");
                    $("body").append('<style>' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: 0;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {max-width: none;float: none;top: 10vw;padding-right:0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-weight: 300 !important;line-height: 1.5;letter-spacing: 18px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.5em;letter-spacing: 32px;margin-left: .2em;}' +
                                    '@media (max-width: 1920px) and (min-width: 1700px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 46px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1699px) and (min-width: 1550px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 38px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1549px) and (min-width: 1250px) {' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.3;font-size: 32px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1249px) and (min-width: 1084px) {' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.3;font-size: 28px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 767px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {height: auto;width: 100vw;left: -20px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 22vw !important;position: relative;margin: 20px 0;text-align: center;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast .c-group {left: -8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.25;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.25em;margin-left: 0em;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom>div>div {top: -10% !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {letter-spacing: 16px;margin-bottom: 1vw;font-size: 26px !important;margin-left: 0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {letter-spacing: 24px;}' +
                                    '}' +
                                    '@media (max-width: 480px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 36vw !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.2;letter-spacing: 6px;margin-bottom: 1vw;margin-left: 0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {line-height: 1.2;letter-spacing: 8px;}' +
                                    '}' +
                                    '@media (min-width: 768px) and (max-width: 1083px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {height: auto;width: 100vw;left: -20px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 0vw !important;position: relative;margin: 20px 0;text-align: center;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast .c-group {left: -8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 1.25;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.25em;margin-left: 0em;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom>div>div {top: 60% !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {margin-bottom: -3vw;margin-left: 0;}' +
                                    '}' +
                                   '</style>')

                  if ((urlRegion === "tr-tr") || (urlRegion === "fi-fi")) {
                    $("body").append('<style>' +
                    '@media (max-width: 960px) {' +
                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 26px;}' +
                    '}' +
                    '@media (max-width: 650px) {' +
                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 12px !important;}' +
                    '}' +
                   '</style>')
                  }
                }

                if (thespecials[i] === "pydaccolade") {
                    console.log("running special style " + thespecials[i]);
                    $(".fullLeftRight").eq(0).addClass("pydFullStyle");
                    $(".fullLeftRight .m-hero-item").eq(0).addClass("f-x-center").addClass("f-y-bottom")
                                                          .removeClass("f-x-right").removeClass("f-y-center");
                    $("body").append('<style>' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: 0;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {width:fit-content;max-width: none;float: none;top: 10vw;padding-right:0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-weight: 300 !important;line-height: 2;letter-spacing: 18px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {line-height: .8;font-size: 2em;letter-spacing: 0px;margin-left: .2em; font-weight: 700;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-paragraph-2 {font-weight: 300 !important;line-height: 1.5;letter-spacing: 10px;margin-top: 20px;}' +
                                    '.pydFullStyle .quoteBefore, .pydFullStyle .quoteAfter {position: absolute;}' +
                                    '.pydFullStyle .quoteBefore {left: -1em;}' +
                                    '.pydFullStyle .quoteAfter {right: -1em;}' +
                                    '@media (max-width: 1920px) and (min-width: 1700px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 34px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1699px) and (min-width: 1550px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 34px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1549px) and (min-width: 1250px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 7vw;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 2;font-size: 34px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1249px) and (min-width: 1084px) {' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 2;font-size: 27px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1365px) and (min-width: 1084px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 7vw;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size:27px !important;font-weight: 300 !important;letter-spacing: 13px;}' +
                                      '}' +
                                    '@media (max-width: 767px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {height: auto;width: 100vw;left: -20px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 22vw !important;position: relative;margin: 20px auto;left: 6px;text-align: center;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast .c-group {left: -8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 2;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.25em;margin-left: 0em;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom>div>div {top: -10% !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {letter-spacing: 13px;margin-bottom: 1vw;font-size: 27px !important;margin-left: 0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {letter-spacing: 0px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-paragraph-2 {margin-top: 10px;padding-top: 0;margin-bottom: 16px;}' +
                                    '}' +
                                    '@media (max-width: 640px) {' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size:16px !important;font-weight: 300 !important;letter-spacing: 10px;}' +
                                    '}' +
                                    '@media (max-width: 480px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: -10px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 30vw !important;}' +
                                    '}' +
                                    '@media (max-width: 359px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 36vw !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size:14px !important;font-weight: 300 !important;letter-spacing: 8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {letter-spacing: 10px;}' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: -10px;}' +
                                    '}' +
                                    '@media (min-width: 768px) and (max-width: 1083px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {height: auto;width: 100vw;left: -20px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 0vw !important;position: relative;margin: 20px 0;text-align: center;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast .c-group {left: -8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 30px;line-height: 2;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.25em;margin-left: 0em;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom>div>div {top: 60% !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {margin-bottom: -3vw;margin-left: 0;}' +
                                    '}' +
                                   '</style>')

                  if ((urlRegion === "tr-tr") || (urlRegion === "fi-fi")) {
                    $("body").append('<style>' +
                    '@media (max-width: 960px) {' +
                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 26px;}' +
                    '}' +
                    '@media (max-width: 650px) {' +
                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 12px !important;}' +
                    '}' +
                   '</style>')
                  }
                  $(".pydFullStyle .f-x-center.f-y-bottom .c-heading-2").addClass("c-heading-1a").removeClass("c-heading-2");
                  $(".pydFullStyle .f-x-center.f-y-bottom .c-heading-1a strong").css("position", "relative").append('<strong class="quoteAfter">"</strong>');
                  $(".pydFullStyle .f-x-center.f-y-bottom .c-heading-1a strong").first().prepend('<strong class="quoteBefore">"</strong>');
                }

                if (thespecials[i] === "pydaccoladevar1") {
                    console.log("running special style " + thespecials[i]);
                    $(".fullLeftRight").eq(0).addClass("pydFullStyle");
                    $(".fullLeftRight .m-hero-item").eq(0).addClass("f-x-center").addClass("f-y-bottom")
                                                          .removeClass("f-x-right").removeClass("f-y-center");
                    $("body").append('<style>' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: 0;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {width:fit-content;max-width: none;float: none;top: 8vw;padding-right:0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-weight: 300 !important;line-height: 2;letter-spacing: 18px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.5em;letter-spacing: 22px;margin-left: .2em;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-paragraph-2 {font-weight: 300 !important;line-height: 1.5;letter-spacing: 10px;margin-top: 20px;}' +
                                    '@media (max-width: 1920px) and (min-width: 1700px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 34px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1699px) and (min-width: 1550px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .c-heading-2 {font-size: 34px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1549px) and (min-width: 1250px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 5vw;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 2;font-size: 34px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1249px) and (min-width: 1084px) {' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 2;font-size: 27px;margin-bottom: calc(0vw - 1.0vw);margin-left: calc(.75vw);}' +
                                    '}' +
                                    '@media (max-width: 1365px) and (min-width: 1084px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 5vw;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size:27px !important;font-weight: 300 !important;letter-spacing: 13px;}' +
                                      '}' +
                                    '@media (max-width: 767px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {height: auto;width: 100vw;left: -20px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 20vw !important;position: relative;margin: 20px auto;left: 6px;text-align: center;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast .c-group {left: -8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {line-height: 2;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.25em;margin-left: 0em;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom>div>div {top: -10% !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {letter-spacing: 13px;margin-bottom: 1vw;font-size: 27px !important;margin-left: 0;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {letter-spacing: 13px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-paragraph-2 {margin-top: 10px;padding-top: 0;margin-bottom: 16px;}' +
                                    '}' +
                                    '@media (max-width: 640px) {' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size:16px !important;font-weight: 300 !important;letter-spacing: 10px;}' +
                                    '}' +
                                    '@media (max-width: 480px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: -10px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 30vw !important;}' +
                                    '}' +
                                    '@media (max-width: 359px) {' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 36vw !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size:14px !important;font-weight: 300 !important;letter-spacing: 8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {letter-spacing: 10px;}' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {left: -10px;}' +
                                    '}' +
                                    '@media (min-width: 768px) and (max-width: 1083px) {' +
                                    '.pydFullStyle.fullTile section.m-hero-item>div {height: auto;width: 100vw;left: -20px;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast {top: 0vw !important;position: relative;margin: 20px 0;text-align: center;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom .high-contrast .c-group {left: -8px;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 30px;line-height: 2;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 strong {font-size: 1.25em;margin-left: 0em;}' +
                                    '.pydFullStyle .m-hero-item.f-x-center.f-y-bottom>div>div {top: 60% !important;}' +
                                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {margin-bottom: -3vw;margin-left: 0;}' +
                                    '}' +
                                   '</style>')

                  if ((urlRegion === "tr-tr") || (urlRegion === "fi-fi")) {
                    $("body").append('<style>' +
                    '@media (max-width: 960px) {' +
                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 26px;}' +
                    '}' +
                    '@media (max-width: 650px) {' +
                    '.pydFullStyle .f-x-center.f-y-bottom .c-heading-2 {font-size: 12px !important;}' +
                    '}' +
                   '</style>')
                  }
                }

                if (thespecials[i] === "grounded") {
                  console.log("running special style " + thespecials[i]);
                  viewwidth = $(document).width();
                  if (viewwidth > 1500) {
                    var iconfile = "icons1920"
                    var giftiming = 5500;
                  } else if (viewwidth > 1400) {
                    var iconfile = "icons1500"
                    var giftiming = 5500;
                  } else if (viewwidth > 1084) {
                    var iconfile = "icons1400"
                    var giftiming = 5500;
                  } else {
                    var iconfile = "icons1084"
                    var giftiming = 4500;
                  }
                  var groundedvids = {
                    icons1920: "https://compass-ssl.xbox.com/assets/47/f4/47f472b0-4876-40d9-bcd8-319ec81c6bf6.gif?n=Grounded_GLP-Cinemagraph_WF-Icons_1920x146.gif",
                    icons1500: "https://compass-ssl.xbox.com/assets/6c/31/6c31e508-ddd9-40bd-91d4-cc362b1b15bc.gif?n=Grounded_GLP-Cinemagraph_WF-Icons_1500x146.gif",
                    icons1400: "https://compass-ssl.xbox.com/assets/ca/fa/cafaa794-a881-4e12-ab76-86a8b1e2174b.gif?n=Grounded_GLP-Cinemagraph_WF-Icons_1400x146.gif",
                    icons1084: "https://compass-ssl.xbox.com/assets/7b/30/7b30e02e-472a-46a6-b0fe-76a971dcec19.gif?n=Grounded_GLP-Cinemagraph_WF-Icons_1084x146.gif",
                    mos1: "https://compass-ssl.xbox.com/assets/55/7e/557e0080-24d9-4594-b39e-569d5ad673f8.mp4?n=Grounded_HP-FAT_L1-XoG_1083x1222_04.mp4%202",
                    mos2: "https://compass-ssl.xbox.com/assets/f9/9c/f99c3934-6bf4-4833-ab24-677fb83cb882.mp4?n=Grounded-HP-FAT_Small-Tout-1_XGP_475x534.mp4",
                    mos3: "https://compass-ssl.xbox.com/assets/b3/de/b3de4dd6-6ee2-462e-9105-459263f21861.mp4?n=Grounded_HP-FAT_L2-XDL_1083x1222.mp4",
                    mos4: "https://compass-ssl.xbox.com/assets/54/4b/544b1e21-13d1-4eb8-9743-f9a7e7278724.mp4?n=Grounded-HP-FAT_Small-Tout-2_Halo-MCC_475x534.mp4",
                    full: "https://compass-ssl.xbox.com/assets/3a/41/3a4199da-4f90-4701-9804-37073bd8c2ee.mp4?n=Grounded_HP-FAT_Series-X_1904x805_02.mp4"
                  }

                  // $('.iconBlade').prepend('<div class="m-ambient-video bgvid">' +
                  //     // '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid0|0"></div>' +
                  //     '<video id="mosvid0" poster="" muted autoplay alt="' + regionContent["keyAltmos1pos1"] + '">' +
                  //       '<source src="' + groundedvids[iconfile] + '" type="video/mp4"></video></div>')
                  $('.iconBlade').append('<picture class="c-image transparentGif">' +
                      '<source srcset="' + groundedvids[iconfile] + '" media="(min-width:0)">' +
                      '<img srcset="" src="' + groundedvids[iconfile] + '" alt="specs background image">' +
                    '</picture>')

                  $('a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"]').closest("section").before('<div class="m-ambient-video bgvid">' +
                      '<video id="mosvid1" poster="" muted alt="' + regionContent["keyAltmos1pos1"] + '">' +
                        '<source src="' + groundedvids.mos1 + '" type="video/mp4"></video></div>' +
                        '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid1|0"></div>')

                  // $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom')
                  //   .append('<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid2|0"></div>')

                  $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom').append('<div class="m-ambient-video bgvid">' +
                      '<video id="mosvid2" poster="" muted ' + regionContent["keyAltmos1pos2"] + '>' +
                        '<source src="' + groundedvids.mos2 + '" type="video/mp4"></video></div>')

                  $('a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"]').closest("section").before('<div class="m-ambient-video bgvid">' +
                      '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid2|0"></div>' +
                      '<video id="mosvid3" poster="" muted alt="' + regionContent["keyAltmos1pos3"] + '">' +
                        '<source src="' + groundedvids.mos3 + '" type="video/mp4"></video></div>')

                  $('a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom').append('<div class="m-ambient-video bgvid">' +
                      '<video id="mosvid4" poster="" muted alt="' + regionContent["keyAltmos1pos4"] + '">' +
                        '<source src="' + groundedvids.mos4 + '" type="video/mp4"></video></div>')

                  $('#mosvid3')
                    .after('<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid3|0"></div>' +
                      '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid4|3000"></div>')

                  $('.fullLeftRight').not(".fullLeftRight2").find("section").prepend('<div class="m-ambient-video pp-button bgvid">' +
                      '<video id="mosvid5" poster="" muted alt="' + regionContent["keyAltfull"] + '">' +
                        '<source src="' + groundedvids.full + '" type="video/mp4"></video></div>')

                  $('.fullLeftRight').not(".fullLeftRight2").find("section")
                  .after('<span class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid5|0"></span>')

                  $('[data-loc-retailer="keyRetailermos1pos3"]').closest("section").addClass("theme-black").find("*").removeClass("black-c")

                  $("body").append('<style>' +
                                    '.intobsMarker {width: 0;height: 0;}' +
                                    '.m-ambient-video.bgvid {padding: 0;}' +
                                    '@media (min-width: 1084px) {' +
                                        'a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"], a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] picture, ' + 
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom img, a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"], ' + 
                                        'a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] picture, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom img, ' + 
                                        '[data-loc-image="keyImagefullanim"] {display: none !important;}' +
                                        '.hp-mosaic .m-image-intro.f-align-bottom>div {bottom: 60px;}' +
                                        '.zoom .bgvid {left: -1%;width: 100.8%;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom ' + 
                                        '{height: 27.74vw;}' +
                                        '.iconBlade {position: relative;}' +
                                        '.icons {left: 28px;position: relative;}' +
                                        '.icons a:nth-child(6) {margin-right: 50px;}' +
                                        // '.icons a {visibility: hidden;}' +
                                        '.iconBlade .c-image.transparentGif {position: absolute;left: 0px;top: 0px;}' +
                                        '.fullTile section.m-hero-item>div.m-ambient-video {left: 0px;}' +
                                      '}' +
                                      '@media (max-width: 1083px) { .m-ambient-video.bgvid, .transparentGif {display: none !important;} }'+
                                 '</style>')
                  $(".videohero").addClass("f-x-right").addClass("f-y-center");

                  setTimeout(function() {
                    // $( ".iconBlade .m-ambient-video" ).animate({
                    //   top: "-100px"
                    // }, 250, function() {
                      // $(".icons a").css("visibility", "visible");
                      $(".iconBlade .c-image.transparentGif").fadeOut(200)
                      
                      // $( ".icons a" ).animate({
                      //   top: "0"
                      // }, 250)
                    // });
                    
                    
                  }, giftiming);

                   var intobsMarkers = document.querySelectorAll(".intobsMarker");

                   var markerOptions = {
                      threshold: 1,
                      // rootMargin: "0px 0px -300px 0px" // action happens once marker is 300px above   bottom of viewport
                      rootMargin: "0px 0px -30px 0px"
                    };

                    var markerObserver = new IntersectionObserver(function (entries, marker) {
                      entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                          return;
                        } else {
                         console.log("Marker intersecting! " + entry.target)
                         var behaviorContainer = $(entry.target).attr("data-container");
                         var transitionClasses = $(entry.target).attr("data-transitions");
                         var classArray = transitionClasses.split("::");
                         classArray.forEach(function(tr) {
                          var cl = tr.split("|")[0];
                          var tm = 0;
                          if (tr.split("|")[1] !== undefined) {
                           tm = tr.split("|")[1];
                          } else {
                           console.log("Transition class " + cl + " has no timing. Defaulted to 0. Is this correct?");
                          }
                          setTimeout(function() {
                            console.log(cl)
                            if (cl.charAt(0) === "^") {
                              var fstring = cl.split("&")[0].split(".")[0].replace("^", "");
                              var fstring2 = cl.split("&")[0].split(".")[1];
                              var fparams = cl.split("&")[1];
                              if (fparams === "true") { fparams = true }
                              if (fparams === "false") { fparams = false }
                              var f = window[fstring][fstring2];
                              if (typeof f === "function") { f(fparams); }
                            } else {
                              $("." + behaviorContainer).addClass(cl);
                            }
                          }, tm)
                         })
                          marker.unobserve(entry.target);
                        }
                      });
                    }, markerOptions);

                    intobsMarkers.forEach(function (marker) {
                      markerObserver.observe(marker);
                    });
                   // end intersection observer

                   //global functions
                    if (!window.globFunctions) { window.globFunctions = {} }
                      globFunctions = globFunctions || {};
                      globFunctions.startVid =
                        function(id) {
                          var vid = document.getElementById(id)
                          vid.play();
                          if (id === "mosvid5") {
                            $("#mosvid5").next("button").click();
                          }
                        }

                  $("head").append('<script type="text/javascript" src="/en-US/global-shares/templates/JS/xbox-MWF-2021.js"></s' + 'cript>'); 

                  $("body").append('<style>' +
                                    '.m-ambient-video{position:relative;}' +
                                      '.m-ambient-video button:focus{outline: 2px dashed #000 !important; border:2px dashed #fff !important;}' +
                                      '.m-ambient-video button{' +
                                        'height:36px !important;width: 36px;position: absolute;color: white;background-color:rgba(0, 0, 0, 0.60);' + 
                                        'border: 1px solid white !important;bottom: 24px;display: block;padding: 2px 0px 0px 0px;margin-left: 24px;}' +
                                      '.videohero {pointer-events:none !important}' +
                                      '.videohero a, .videohero button {pointer-events:auto !important}' +
                                   '</style>')
                  $(".pp-button button").unwrap();
                }

                if (thespecials[i] === "launch") {
                  console.log("running special style " + thespecials[i]);
                  viewwidth = $(document).width();
                  $(".home-hero video").removeAttr("loop");

                  var launchvids = {
                    mos1: "https://compass-ssl.xbox.com/assets/61/27/6127707e-15f9-43b1-b2f4-67069007436f.mp4?n=333099_Large-Tout-Video_Assassins-Creed-Valhalla_1084x1222.mp4",
                    mos2: "https://compass-ssl.xbox.com/assets/d1/c9/d1c92d75-ede2-4369-93eb-6ab04a12050f.mp4?n=333099_Small-Tout-Video_XGP_952x542_02.mp4",
                    mos3: "https://compass-ssl.xbox.com/assets/95/75/95759052-cc36-4137-8742-d5abbc0015db.mp4?n=333099_Large-Tout-Video-Comp_D2_1084x1222.mp4",
                    mos4: "https://compass-ssl.xbox.com/assets/28/26/282607ec-d5e8-45e1-9c87-09eb3bb73d45.mp4?n=333099_Small-Tout-Video_Yakuza_952x542.mp4",
                    mos5: "https://compass-ssl.xbox.com/assets/34/73/347373fa-2a03-4843-bbe7-7ba715caf03f.mp4?n=333099_Small-Tout-Video_Watch-Dogs-Legion_952x542.mp4",
                    mos6: "https://compass-ssl.xbox.com/assets/88/54/88549de9-e881-40bf-b4ec-17f176b8b4cf.mp4?n=333099_Small-Tout-Video_Cyberpunk-2077_952x542.mp4"
                  }              

                  $('a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"]').closest("section").before('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid1" poster="" autoplay loop muted alt="' + regionContent["keyAltmos1pos1"] + '">' +
                        '<source src="' + launchvids.mos1 + '" type="video/mp4"></video></div>')
                  $('a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"]').closest("li").addClass("largeTout1");

                  $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"]').append('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid2" poster="" autoplay loop muted alt="' + regionContent["keyAltmos1pos2"] + '">' +
                        '<source src="' + launchvids.mos2 + '" type="video/mp4"></video></div>')
                  $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"]').next("div").find("section").first().addClass("smallVid").addClass("f-precise-click");
                  $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"]').attr("href", "javascript:void(0)");

                  $('a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"]').closest("section").before('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid3" poster="" autoplay loop muted alt="' + regionContent["keyAltmos1pos3"] + '">' +
                        '<source src="' + launchvids.mos3 + '" type="video/mp4"></video></div>')
                  setTimeout(function() {
                    $('a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"]').closest("section").removeClass("theme-black").addClass("theme-light");
                  }, 1100)
                  $('a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"]').closest("li").addClass("largeTout2");

                  if (thespecials.indexOf("noyakuza") === -1) {
                    $('a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"]').append('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid4" poster="" autoplay loop muted alt="' + regionContent["keyAltmos1pos4"] + '">' +
                        '<source src="' + launchvids.mos4 + '" type="video/mp4"></video></div>')
                    $('a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"]').next("div").find("section").first().addClass("secondSmall").addClass("f-precise-click");
                    $('a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"]').attr("href", "javascript:void(0)");
                  }
                 
                  $('[data-loc-retailer="keyRetailermos1pos3"]').closest("section").addClass("theme-black").find("*").removeClass("black-c")
                  $('[data-loc-retailer="keyRetailermos1pos3"]').addClass("black-c");

                  $('a[data-loc-link="keyLinkdq1left"]').closest("li").find(".theme-green").append('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid5" poster="" autoplay loop muted alt="' + regionContent["keyAltdq1left"] + '">' +
                        '<source src="' + launchvids.mos5 + '" type="video/mp4"></video></div>')
                  $('a[data-loc-link="keyLinkdq1left"]').closest("li").addClass("twoVids");

                  $('a[data-loc-link="keyLinkdq1right"]').closest("li").find(".theme-green").append('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid6" poster="" autoplay loop muted alt="' + regionContent["keyAltdq1right"] + '">' +
                        '<source src="' + launchvids.mos6 + '" type="video/mp4"></video></div>')
                  $('a[data-loc-link="keyLinkdq1right"]').closest("li").addClass("twoVids").addClass("twoVidsB");
                  $('a[data-loc-link="keyLinkdq1right"]').addClass("black-c");
                  $(".twoVidsB .theme-green").addClass("theme-light").removeClass("theme-green").removeClass("theme-dark");

                  $(".fullLeftRight").first().find("a").first().addClass("f-lightweight").addClass("white-c").addClass("fullBladeLeft");
                  $(".fullLeftRight").first().find("a").eq(1).addClass("white-c");
                  if (regionContent["keyCopyfullcta3"] !== undefined && regionContent["keyCopyfullcta3"].length > 1 &&
                      regionContent["keyCopyfullcta3"] !== "####") {
                    $(".fullLeftRight").first().find("a").last()
                                       .after('<a href="' + regionContent["keyLinkfull3"] + '" class="c-call-to-action c-glyph white-c" ' + 
                                                  'aria-label="' + regionContent["keyAriafull3"] + '" data-cta="' + regionContent["keyRetailerfull3"] + 
                                                  '" target="blank">' +
                                                '<span class="secondcta">' + regionContent["keyCopyfullcta3"] + '</span></a>')
                  }

                  $(".fullTileCenterTop a").removeAttr("data-retailer");
                  
                  if (thespecials.indexOf("noyakuza") > -1) {
                    $("body").append('<style>' +
                                    '.intobsMarker {width: 0;height: 0;}' +
                                    '.m-ambient-video.bgvid {padding: 0;}' +
                                    '.fullTileCenterTop a {padding-right: 0px !important}' +
                                    '@media (min-width: 1084px) {' +
                                        '.home-hero section {height: 55.7vw;}' +
                                        '.home-hero .high-contrast {display: none; bottom: 31% !important;}' +
                                        'section.videohero .cta1 {bottom: 50px;}' +
                                        '.iconBlade {display: none;}' +
                                        '.hp-mosaic li {overflow: hidden !important; background: white;}' +
                                        'a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"], a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] picture, ' + 
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom img, a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"] ' +  
                                        '{display: none !important;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] {position: relative; display: block;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .m-ambient-video {position: absolute; background: white;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom {display: none;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .vidPlayPause {z-index:4;}' +
                                        '.smallVid {width: 100% !important;top: 80% !important;text-align: center;}' +
                                        '.secondSmall {background: transparent !important;}' +
                                        // '.twoVids {max-width: 49.789% !important;}' +
                                        '.twoVids .m-ambient-video.bgvid {position: absolute;top: 3px; left: 0px; background: white;}' +
                                        '.twoVids .zoom {display: none !important;}' +
                                        '.twoVids .theme-green.theme-dark, .twoVidsB .theme-light {background: white !important; position: relative;}' +
                                        '.twoVids .m-content-placement-item {z-index: 2;}' +
                                        '.twoVidsB .m-ambient-video.bgvid {left: 0px;}' +
                                        '.hp-mosaic .m-image-intro.f-align-bottom>div {bottom: 60px;}' +
                                        '.zoom .bgvid {left: -1%;width: 100.8%;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom ' + 
                                        '{height: 27.74vw;}' +
                                        '.iconBlade .c-image.transparentGif {position: absolute;left: 0px;top: 0px;}' +
                                        '.fullTile.fullLeftRight2 .copy {top: 50% !important;max-width: 880px;padding-right: 4vh;}' +
                                      '}' +
                                      '@media (min-width: 1084px) and (max-width: 1400px) {' +
                                        'p[data-loc-copy="keyCopymos1pos2subhead"] {padding-top: 4px !important;}' +
                                        'a.c-call-to-action[data-loc-link="keyLinkmos1pos2"] {padding-top: 0px !important; margin-top: 4px !important}' +
                                        '.largeTout1 .m-ambient-video:after {background-image: linear-gradient(0deg, rgba(0,0,0,.5) 54%, transparent 64%);display: block;height: 100%;width: 100%;position: absolute;top: 0;left: 0;}' +
                                        '.largeTout2 .m-ambient-video:after {background-image: linear-gradient(0deg, rgba(255,255,255,.5) 54%, transparent 64%);display: block;height: 100%;width: 100%;position: absolute;top: 0;left: 0;}' +
                                      '}' +
                                      '@media (max-width: 767px) {' +
                                        '.secondSmall .high-contrast, .secondSmall h2, .secondSmall p {color: white !important;}' +
                                      '}' +
                                      '@media (max-width: 1083px) { .m-ambient-video.bgvid, .transparentGif {display: none !important;} }'+
                                 '</style>')
                  } else {
                    $("body").append('<style>' +
                                    '.intobsMarker {width: 0;height: 0;}' +
                                    '.m-ambient-video.bgvid {padding: 0;}' +
                                    '.fullTileCenterTop a {padding-right: 0px !important}' +
                                    '@media (min-width: 1084px) {' +
                                        '.home-hero section {height: 55.7vw;}' +
                                        '.home-hero .high-contrast {display: none; bottom: 31% !important;}' +
                                        'section.videohero .cta1 {bottom: 50px;}' +
                                        '.iconBlade {display: none;}' +
                                        '.hp-mosaic li {overflow: hidden !important; background: white;}' +
                                        'a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"], a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] picture, ' + 
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom img, a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"], ' + 
                                        'a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] picture, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom img ' + 
                                        '{display: none !important;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"], a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] {position: relative; display: block;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .m-ambient-video, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .m-ambient-video {position: absolute; background: white;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom {display: none;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .vidPlayPause, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .vidPlayPause {z-index:4;}' +
                                        '.smallVid {width: 100% !important;top: 80% !important;text-align: center;}' +
                                        '.secondSmall {background: transparent !important;}' +
                                        // '.twoVids {max-width: 49.789% !important;}' +
                                        '.twoVids .m-ambient-video.bgvid {position: absolute;top: 3px; left: 0px; background: white;}' +
                                        '.twoVids .zoom {display: none !important;}' +
                                        '.twoVids .theme-green.theme-dark, .twoVidsB .theme-light {background: white !important; position: relative;}' +
                                        '.twoVids .m-content-placement-item {z-index: 2;}' +
                                        '.twoVidsB .m-ambient-video.bgvid {left: 0px;}' +
                                        '.hp-mosaic .m-image-intro.f-align-bottom>div {bottom: 60px;}' +
                                        '.zoom .bgvid {left: -1%;width: 100.8%;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom ' + 
                                        '{height: 27.74vw;}' +
                                        '.iconBlade .c-image.transparentGif {position: absolute;left: 0px;top: 0px;}' +
                                        '.fullTile.fullLeftRight2 .copy {top: 50% !important;max-width: 880px;padding-right: 4vh;}' +
                                      '}' +
                                      '@media (min-width: 1084px) and (max-width: 1400px) {' +
                                        'p[data-loc-copy="keyCopymos1pos2subhead"] {padding-top: 4px !important;}' +
                                        'a.c-call-to-action[data-loc-link="keyLinkmos1pos2"] {padding-top: 0px !important; margin-top: 4px !important}' +
                                        '.largeTout1 .m-ambient-video:after {background-image: linear-gradient(0deg, rgba(0,0,0,.5) 54%, transparent 64%);display: block;height: 100%;width: 100%;position: absolute;top: 0;left: 0;}' +
                                        '.largeTout2 .m-ambient-video:after {background-image: linear-gradient(0deg, rgba(255,255,255,.5) 54%, transparent 64%);display: block;height: 100%;width: 100%;position: absolute;top: 0;left: 0;}' +
                                      '}' +
                                      '@media (max-width: 767px) {' +
                                        '.secondSmall .high-contrast, .secondSmall h2, .secondSmall p {color: white !important;}' +
                                      '}' +
                                      '@media (max-width: 1083px) { .m-ambient-video.bgvid, .transparentGif {display: none !important;} }'+
                                 '</style>')
                  }

                  if ($(".fullLeftRight").eq(0).find(".c-group a").length === 3) {
                    $("body").append('<style>' +
                                      '@media (min-width: 1084px) {' +
                                        '.fullTile section.m-hero-item>div {left: 0px !important;top: 22% !important;}' +
                                        '.fullTile .copy {max-width: 880px;padding-right: 0;}' +
                                      '}' +
                                 '</style>')
                  }
                  // $(".videohero").addClass("f-x-right").addClass("f-y-center");

                  $(".home-hero .m-hero-item").addClass("f-x-center").addClass("f-y-bottom").removeClass("f-x-right").removeClass("f-y-center");
                  setTimeout(function() {
                    $(".home-hero .high-contrast").fadeIn(1800);
                  }, 9000);


                  $("head").append('<script type="text/javascript" src="/en-US/global-shares/templates/JS/xbox-MWF-2021.js"></s' + 'cript>'); 

                  $("body").append('<style>' +
                                    '.m-ambient-video{position:relative;}' +
                                      '.m-ambient-video button:focus{outline: 2px dashed #000 !important; border:2px dashed #fff !important;}' +
                                      '.m-ambient-video button{' +
                                        'height:36px !important;width: 36px;position: absolute;color: white;background-color:rgba(0, 0, 0, 0.60);' + 
                                        'border: 1px solid white !important;bottom: 24px;display: block;padding: 2px 0px 0px 0px;margin-left: 24px;}' +
                                      '.videohero {pointer-events:none !important}' +
                                      '.videohero a, .videohero button {pointer-events:auto !important}' +
                                   '</style>')
                  $(".pp-button button").unwrap();
                }

                if (thespecials[i] === "lightboxvid") {
                  console.log("running special style " + thespecials[i]);

                  $(".fullLeftRight").eq(0).addClass("flr1");
                  $("body").append('<style>' +
                                      'button.OttoGallery.c-action-trigger.c-glyph:before {margin-left: 0px;}' +
                                      '@media (min-width: 1084px) {' +
                                        '.fullTile.flr1 section.m-hero-item>div {top: 0 !important;}' +
                                        '.fullTile.flr1 .copy {max-width: 42%;padding-right: 0;}' +
                                      '}' +
                                 '</style>')

                  $(".flr1 .fullBladeLeft").after('<button class="c-glyph glyph-play black-c c-action-trigger OttoGallery lightboxplaybutton" ' + 
                    'id="lbvideo1" data-otto-type="lightbox" data-otto-lightbox-container="body" data-otto-lightbox-vid-vertical-placement="2%" ' + 
                    'data-otto-iframe-src="' + regionContent["keyLinkfull"] + '" ' + 
                    'aria-label="' + regionContent["keyAriafull"] + '" ' + 
                    'src="https://compass-ssl.xbox.com/assets/db/5c/db5c1b59-2652-4210-81c9-73ff3b80802d.png?n=playbutton.png" ' + 
                    'data-otto-thevidname="' + regionContent["keyAriafull"] + '">' +
                      '<span>' + regionContent["keyCopyfullcta"] + '</span></button>')
                  $(".flr1 .fullBladeLeft").remove();
                  $("head").eq(0).append('<script type="text/javascript" src="/en-US/global-shares/templates/MWF/JS/OttoGallery/OttoGallery.js"></s' + 'cript>');
                  $("head").eq(0).append('<link rel="stylesheet" href="/en-US/global-shares/templates/MWF/CSS/OttoGallery/OttoGallery.css">');
                }

                if (thespecials[i] === "haloinfinite") {
                  console.log("running special style " + thespecials[i]);

                  $(".videohero").addClass("f-precise-click");
                  $(".legacyBackground .appBackground").css("background-color", "black");
                  $(".xboxSocial").css("background-color", "white");
                  $("header").removeAttr("class").addClass("c-uhfh context-uhf c-sgl-stck c-category-header f-transparent js");
                  $("header .theme-light.js-global-head.f-closed").removeAttr("class").addClass("theme-dark js-global-head f-closed f-transparent global-head-cont");
                  $("#uhfLogo img").attr("src", "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1MmB8?ver=6c43g");
                  $("#uhfCatLogo img").attr("src", "https://img-prod-cms-rt-microsoft-com.akamaized.net//cms/api/am/imageFileData/RW8TP2?ver=d2e0");
                  $(".herovideo").addClass("pp-button");

                  $(".videohero h1").addClass("c-heading-1a").removeClass("c-heading-1");
                  $(".c-heading-1a").after('<span class="jump-g jump-b"></span>');

                   var hivids = {
                    mos1: "https://assets.xboxservices.com/assets/e1/14/e114f8e5-97dd-4d1b-8c9c-33f5ae0bce68.mp4?n=230022_Large-Tout-0_Champions_1084x1222_02.mp4", //allContent.locales[urlRegion].keyImagemos1pos1,
                    mos2: allContent.locales[urlRegion].keyImagemos1pos2anim,
                    mos3: "https://assets.xboxservices.com/assets/f6/d8/f6d88804-1334-47e6-8270-02e396a81235.mp4?n=230022_Large-Tout-0_XSX_1084x1222.mp4", //allContent.locales[urlRegion].keyImagemos1pos3,
                    mos4: allContent.locales[urlRegion].keyImagemos1pos4anim
                  }

                  $('a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"]').closest("section").before('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid1" poster="" muted loop autoplay aria-label="' + regionContent["keyAltmos1pos1"] + '">' +
                        '<source src="' + hivids.mos1 + '" type="video/mp4"></video></div>') //+
                        // '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid1|0"></div>')

                  // $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom')
                  //   .append('<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid2|0"></div>')

                  $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"]').attr("href", "javascript:void(0)").css("cursor", "auto"); // only link clickable
                  $('a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom').append('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid2" poster="" muted loop autoplay aria-label="' + regionContent["keyAltmos1pos2"] + '">' +
                        '<source src="' + hivids.mos2 + '" type="video/mp4"></video></div>')

                  $('a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"]').closest("section").before('<div class="m-ambient-video bgvid pp-button">' +
                      '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid2|0"></div>' +
                      '<video id="mosvid3" poster="" muted aria-label="' + regionContent["keyAltmos1pos3"] + '">' +
                        '<source src="' + hivids.mos3 + '" type="video/mp4"></video></div>')

                  $('a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"]').attr("href", "javascript:void(0)").css("cursor", "auto");
                  $('a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom').append('<div class="m-ambient-video bgvid pp-button">' +
                      '<video id="mosvid4" poster="" muted aria-label="' + regionContent["keyAltmos1pos4"] + '">' +
                        '<source src="' + hivids.mos4 + '" type="video/mp4"></video></div>')

                  // $('a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"]')
                  $("#mosvid3")
                    .after('<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid3|0"></div>' +
                      '<div class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid4|3000"></div>')

                  // $('[data-loc-retailer="keyRetailermos1pos3"]').closest("section").addClass("theme-black").find("*").removeClass("black-c")

                  $("body").append('<style>' +
                                    'span.jump-g.jump-b {right: 1vw;}' +
                                    '.icons a p span {background: black;}' +
                                    '.intobsMarker {width: 0;height: 0;}' +
                                    '.m-ambient-video.bgvid {padding: 0;}' +
                                    '.home-hero .vidPlayPause {top: auto !important; bottom: 24px;}' +
                                    '.icons a:focus {border: 2px dashed white;outline: 2px dashed white;}' +
                                    '.c-badge {background: #107c10 !important;color: white !important;}' +
                                    '@media (min-width: 1084px) {' +
                                        'a[data-loc-link="keyLinkmos1pos1"][tabindex="-1"], a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] picture, ' + 
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom img, a[data-loc-link="keyLinkmos1pos3"][tabindex="-1"], ' + 
                                        'a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] picture, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom img, ' + 
                                        '[data-loc-image="keyImagefullanim"] {display: none !important;}' +
                                        '.hp-mosaic .m-image-intro.f-align-bottom>div {bottom: 60px;}' +
                                        '.zoom .bgvid {left: -1%;width: 100.8%;}' +
                                        'a[data-loc-link="keyLinkmos1pos2"][tabindex="-1"] .zoom, a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom ' + 
                                        '{height: 27.74vw;}' +
                                        '.iconBlade {position: relative;}' +
                                        '.icons {left: 28px;position: relative;}' +
                                        '.icons a:nth-child(6) {margin-right: 50px;}' +
                                        '.iconBlade .c-image.transparentGif {position: absolute;left: 0px;top: 0px;}' +
                                        '.fullTile section.m-hero-item>div.m-ambient-video {left: 0px;}' +
                                      '}' +
                                      '@media (max-width: 1083px) { .m-ambient-video.bgvid, .transparentGif {display: none !important;} }'+
                                      '@media (max-width: 1083px) and (min-width: 768px) { .m-hero-item.f-y-center.f-x-center>div>div {-ms-transform: none !important;transform: none !important;} }'+
                                      '@media (max-width: 859px) { header {z-index: 10 !important;}' + 
                                         '.c-uhfh.c-sgl-stck .cat-logo-button-cont {background: transparent !important;border: none !important;}' +
                                         '.c-uhfh.c-sgl-stck .global-head-cont, .c-uhfh.c-sgl-stck>div:first-child {border-bottom: none !important;}' +
                                      ' }'+
                                 '</style>')
                  $(".videohero").addClass("f-x-right").addClass("f-y-center");
                  $("#bodycolumn .theme-green").addClass("theme-black").removeClass("theme-green");
                  $("#bodycolumn .theme-dark").addClass("theme-black").removeClass("theme-dark");
                  $(".videohero .c-subheading-1").addClass("c-heading-2 zpt").removeClass("c-subheading-1");

                  if (urlRegion !== "en-us") {
                    $("#zoomImg5").closest("li").addClass("zoomImg5-parent")
                    $("body").append('<style>' +
                                    '@media (min-width: 1084px) {' +
                                        '.zoomImg5-parent .m-content-placement-item {float: right !important;}' +
                                      '}' +
                                      '</style>')
                  }
                  if (urlRegion === "pt-br") {
                    $("body").append('<style>' +
                                    '@media (min-width: 1084px) {' +
                                        'a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .zoom img {display: block !important;}' +
                                        'a[data-loc-link="keyLinkmos1pos4"][tabindex="-1"] .m-ambient-video {display: none !important;}' +
                                        '.zoomImg2-parent section {float: right !important}' +
                                      '}' +
                                      '</style>')
                    $("#mosvid4").closest("li").addClass("zoomImg2-parent");
                  }


                   var intobsMarkers = document.querySelectorAll(".intobsMarker");

                   var markerOptions = {
                      threshold: 1,
                      rootMargin: "0px 0px 600px 0px" // action happens once marker is 300px above   bottom of viewport
                    };

                    var markerObserver = new IntersectionObserver(function (entries, marker) {
                      entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                          return;
                        } else {
                         console.log("Marker intersecting! " + entry.target)
                         var behaviorContainer = $(entry.target).attr("data-container");
                         var transitionClasses = $(entry.target).attr("data-transitions");
                         var classArray = [];
                         classArray = transitionClasses.split("::");
                         classArray.forEach(function(tr) {
                          var cl = tr.split("|")[0];
                          var tm = 0;
                          if (tr.split("|")[1] !== undefined) {
                           tm = tr.split("|")[1];
                          } else {
                           console.log("Transition class " + cl + " has no timing. Defaulted to 0. Is this correct?");
                          }
                          setTimeout(function() {
                            console.log(cl)
                            if (cl.charAt(0) === "^") {
                              var fstring = cl.split("&")[0].split(".")[0].replace("^", "");
                              var fstring2 = cl.split("&")[0].split(".")[1];
                              var fparams = cl.split("&")[1];
                              if (fparams === "true") { fparams = true }
                              if (fparams === "false") { fparams = false }
                              var f = window[fstring][fstring2];
                              if (typeof f === "function") { f(fparams); }
                            } else {
                              $("." + behaviorContainer).addClass(cl);
                            }
                          }, tm)
                         })
                          marker.unobserve(entry.target);
                        }
                      });
                    }, markerOptions);

                    intobsMarkers.forEach(function (marker) {
                      markerObserver.observe(marker);
                    });
                   // end intersection observer

                   //global functions
                    if (!window.globFunctions) { window.globFunctions = {} }
                      globFunctions = globFunctions || {};
                      globFunctions.startVid =
                        function(id) {
                          // var vid = document.getElementById(id)
                          // vid.play();
                          if (id === "mosvid3") {
                            $("#" + id).next("button")[0].click();
                          } else if (id === "mosvid4") {
                            $("#" + id).next("div").find("button")[0].click();  
                          }
                          
                        }

                  $("head").append('<script type="text/javascript" src="/en-US/global-shares/templates/JS/xbox-MWF-2021.js"></s' + 'cript>'); 
                  setTimeout(function() {
                    $("#mosvid3 button").detach().insertAfter("#mosvid3");
                  } , 400)
                  
                  $("body").append('<style>' +
                                    '.m-ambient-video{position:relative;}' +
                                      '.m-ambient-video button:focus{outline: 2px dashed #000 !important; border:2px dashed #fff !important;}' +
                                      '.m-ambient-video button{' +
                                        'height:36px !important;width: 36px;position: absolute;color: white;background-color:rgba(0, 0, 0, 0.60);' + 
                                        'border: 1px solid white !important;bottom: 24px;display: block;padding: 2px 0px 0px 0px;margin-left: 24px;}' +
                                      '.videohero {pointer-events:none !important}' +
                                      '.videohero a, .videohero button {pointer-events:auto !important}' +
                                   '</style>')
                  $(".pp-button button").unwrap();

                }

            }

            // lightbox links
            if ($("a[href^='lightbox:']").length > 0) {
              $("a[href^='lightbox:']").each(function(index) {
                $(this).after('<a class="' + $(this).attr("class") + ' OttoGallery lightboxplaybutton" href="javascript:void(0)"' + 
                                'id="lbvideolink' + index + '" data-otto-type="lightbox" data-otto-lightbox-container="body" data-otto-lightbox-vid-vertical-placement="2%" ' + 
                                'data-otto-iframe-src="' + $(this).attr("href").replace("lightbox:", "") + '" ' + 
                                'aria-label="' + $(this).attr("aria-label") + '" ' + 
                                'src="https://compass-ssl.xbox.com/assets/db/5c/db5c1b59-2652-4210-81c9-73ff3b80802d.png?n=playbutton.png" ' + 
                                'data-otto-thevidname="' + $(this).attr("aria-label") + '">' +
                                  '<span>' + $(this).find("span").text() + '</span></a>')
                $(this).closest("section").addClass("f-precise-click");
                $(this).remove();
              })
              $(".fullLeftRight .m-hero-item .lightboxplaybutton").next("a").addClass("f-lightweight");
              $("body").append('<style>' +
                                '.home-hero .m-hero-item .lightboxplaybutton {position: relative;top: -3px;}' +
                                '.fullLeftRight .m-hero-item .lightboxplaybutton {margin-right: 16px;}' +
                               '</style>')
              if ($('script[src="/en-US/global-shares/templates/MWF/JS/OttoGallery/OttoGallery.js"]').length === 0) {
                $("head").eq(0).append('<script type="text/javascript" src="/en-US/global-shares/templates/MWF/JS/OttoGallery/OttoGallery.js"></s' + 'cript>');
                $("head").eq(0).append('<link rel="stylesheet" href="/en-US/global-shares/templates/MWF/CSS/OttoGallery/OttoGallery.css">');
              }
              
            }

            // FLIP FROM LEFT TO RIGHT
            // $(".m-hero-item").removeClass("f-x-left theme-dark").addClass("f-x-right theme-light")

        })();
        
    }

});