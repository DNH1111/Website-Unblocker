$(document).ready(function () {
    var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
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

    // var sec = 0;
    //  var checklogin = setInterval(function() {
    //    if (document.getElementById('mectrl_headerPicture')) {
    //        var iconImage = document.getElementById('mectrl_headerPicture').style.backgroundImage.replace(/url\(|\)|"/gi, '')
    //       $('.myAccount img').attr("srcset", iconImage);
    //       $('.myAccount img').attr("src", iconImage);
    //       $('.myAccount img').css("border-radius", "50%");
    //       clearInterval(checklogin)
    //    }
    //    sec++;
    //    if (sec === 6) {clearInterval(checklogin)}
    // }, 1000)

    var populateHero = (function () {
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
            '</section>'

        heroTypes["video"] = '<section class="m-hero-item context-device videohero" itemscope itemtype="http://schema.org/Product" role="tabpanel" tabindex="-1">' +
            '<div class="m-ambient-video vid herovideo">' +
            '<video role="img" alt="Ambient video alt text" poster="" muted autoplay loop>' +
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
            '<h1 class="c-heading-2"></h1>' +
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
            $(".sl-hero picture img").attr("alt", regHeroContent["keyHero1headline"])
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
            $(".sl-hero .c-badge").attr("data-loc-color", "keyHero1badgecolor");
            $(".sl-hero .c-badge span").text(regHeroContent["keyHero1badgecopy"]);
            $(".sl-hero h1").html(regHeroContent["keyHero1headline"])
            $(".sl-hero p.c-subheading-1").html(regHeroContent["keyHero1subheading"])
            $(".sl-hero p.c-subheading-2").html(regHeroContent["keyHero1subheading"])
            $(".sl-hero a.cta1").attr("href", regHeroContent["keyHero1link"])
            $(".sl-hero a.cta1 span").text(regHeroContent["keyHero1cta"])
            if (regHeroContent["keyHero1dataretailer"] !== "####" && regHeroContent["keyHero1dataretailer"] !== "") { $(".sl-hero a.cta1").attr("data-retailer", regHeroContent["keyHero1dataretailer"]) }
            if (regHeroContent["keyHero1datacta"] !== "####" && regHeroContent["keyHero1datacta"] !== "") { $(".sl-hero a.cta1").attr("data-cta", regHeroContent["keyHero1datacta"]) }
            $(".sl-hero a.cta1").attr("aria-label", regHeroContent["keyHero1arialabel"])
            $(".sl-hero a.cta1").attr("data-clickname", regHeroContent["keyHero1clickname"])

            $(".sl-hero a.cta2").attr("href", regHeroContent["keyHero1link2"])
            $(".sl-hero a.cta2 span").text(regHeroContent["keyHero1cta2"])
            if (regHeroContent["keyHero1dataretailer2"] !== "####" && regHeroContent["keyHero1dataretailer2"] !== "") { $(".sl-hero a.cta2").attr("data-retailer", regHeroContent["keyHero1dataretailer2"]) }
            if (regHeroContent["keyHero1datacta2"] !== "####" && regHeroContent["keyHero1datacta2"] !== "") { $(".sl-hero a.cta2").attr("data-cta", regHeroContent["keyHero1datacta2"]) }
            $(".sl-hero a.cta2").attr("aria-label", regHeroContent["keyHero1arialabel2"])
            $(".sl-hero a.cta2").attr("data-clickname", regHeroContent["keyHero1clickname2"])
        } else {
            String.prototype.replaceAll = function (search, replacement) {
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
                '<button class="c-action-toggle high-contrast c-glyph glyph-play f-toggle" data-toggled-label="Play" data-toggled-glyph="glyph-pause" ' +
                'aria-label="' + playslidetext.locales[urlRegion].keyPlayslideshow + '" aria-pressed="false"></button>' +
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
                var ariasectionhelp = regHeroContent[heroPre + "headline"].replace("<br>", " ");
                if (ariasectionhelp.length === 0) {
                    ariasectionhelp = regHeroContent[heroPre + "subheading"].replace("<br>", " ");
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
                $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-clickname", regHeroContent[heroPre + "clickname"]);

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
                $(".sl-hero li").eq(i - 1).find("a.cta2").attr("data-clickname", regHeroContent[heroPre + "clickname2"]);
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

        $(document).on("click", ".c-carousel .c-action-toggle.c-glyph.glyph-pause", function (e) {
            $(this).attr("aria-label", "Pause slideshow");
        })

        $(document).on("keydown", ".c-carousel .c-action-toggle.c-glyph.glyph-pause", function (e) {
            if ((e.keyCode == 13) || (e.keyCode == 32)) {
                $(this).attr("aria-label", "Pause slideshow");
            }
        })

        $(document).on("click", ".c-carousel .c-action-toggle.c-glyph.glyph-play", function (e) {
            $(this).attr("aria-label", "Play slideshow");
        })
        $(document).on("keydown", ".c-carousel .c-action-toggle.c-glyph.glyph-play", function (e) {

            if ((e.keyCode == 13) || (e.keyCode == 32)) {

                $(this).attr("aria-label", "Play slideshow");

            }

        })

        $(".sl-hero a").each(function () {
            if ($(this).text() === "####" || $(this).text() === "") {
                $(this).remove();
            }
        })
        $(".sl-hero p").each(function () {
            if ($(this).text() === "####") {
                $(this).remove();
            }
        })
        $(".sl-hero h1").each(function () {
            if ($(this).text() === "####") {
                $(this).remove();
            }
        })



        $(".sl-hero ul li").eq(0).addClass("f-active");

        $(".heroList section").each(function () {
            if ($(this).hasClass("theme-dark")) {
                $(this).parents("li").attr("data-f-theme", "dark")
            } else {
                $(this).parents("li").attr("data-f-theme", "light")
            }
        })

        $(".sl-hero h1").each(function (index) {
            var head = $(this);
            var temphead = $(head).html();
            var headarr = temphead.toLowerCase().replace("<br>", " ").split(" ");
            headarr.forEach(function (word) {
                if (word.length > 11) {
                    $(head).removeClass("c-heading-1").addClass("c-heading-2");
                }
            })
        })

        $(".m-hero-item h1").each(function (index) {
            if (index !== 0) {
                var newhtext = $(this).html();
                var newhclasses = $(this).attr("class");
                $(this).after('<h2 class="' + newhclasses + ' x-hidden-focus">' + newhtext + '</h2>');
                $(this).remove();
            }
        });

        $(".m-hero-item p").each(function () {
            if ($(this).text().length === 0) {
                $(this).remove();
            }
        })

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

        setTimeout(function () {
            populateContent();
            $("body").css("visibility", "visible");
        }, 100)
    })();

    var populateContent = function () {

        var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
        if (urlRegion === "en-ae") {
            urlRegion = "ar-ae";
        } else if (urlRegion === "en-sa") {
            urlRegion = "ar-sa";
        } else if (urlRegion === "en-il") {
            urlRegion = "he-il";
        }

        var popJSON = (function () {
            var regionContent = allContent.locales[urlRegion];
            var allKeys = Object.keys(regionContent)
            var keysLength = allKeys.length
            for (var i = 0; i < keysLength; i++) {
                if (allKeys[i].indexOf("keyCopy") !== -1) {
                    $("[data-loc-copy=" + allKeys[i] + "]").html(regionContent[allKeys[i]]);
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

            // copy color
            var copycolors = ["Mos1pos1copycolor", "Mos1pos2copycolor", "Mos1pos3copycolor", "Mos1pos4copycolor", "Mos2pos1copycolor", "Mos2pos2copycolor", "Mos2pos3copycolor", "Mos2pos4copycolor"]

            copycolors.forEach(function (b) {
                var bc = "keyCopy" + b.toLowerCase().replace("copy", "badge").replace("color", "");
                var color = regionContent["key" + b].toLowerCase();
                if (color === "white") {
                    if (!$("[data-loc-copy='" + bc + "']").closest("section").hasClass("greenthm")) {
                        $("[data-loc-copy='" + bc + "']").closest("section").removeClass("theme-dark").removeClass("theme-light").addClass("theme-dark");
                        $("[data-loc-copy='" + bc + "']").closest(".theme-light").removeClass("theme-light").addClass("theme-dark");
                    }
                    $("[data-loc-copy='" + bc + "']").closest("section").find("h2, h3, p, span, a").not(".c-badge span").removeClass("white-c").removeClass("black-c").not(".c-call-to-action span").addClass("white-c");
                } else {
                    if (!$("[data-loc-copy='" + bc + "']").closest("section").hasClass("greenthm")) {
                        $("[data-loc-copy='" + bc + "']").closest("section").removeClass("theme-dark").removeClass("theme-light");
                    }
                    $("[data-loc-copy='" + bc + "']").closest("section").find("h2, h3, p, span, a").not(".c-badge span").removeClass("white-c").removeClass("black-c").addClass("black-c");
                }
            })

            // badge color
            var badgecolors = ["Mos1pos1badgecolor", "Mos1pos2badgecolor", "Mos1pos3badgecolor", "Mos1pos4badgecolor", "Dq1leftbadgecolor", "Dq1rightbadgecolor",
                "Dq2bleftbadgecolor", "Dq2brightbadgecolor", "Mos2pos1badgecolor", "Mos2pos2badgecolor", "Mos2pos3badgecolor", "Mos2pos4badgecolor"]

            badgecolors.forEach(function (b) {
                var bc = "keyCopy" + b.toLowerCase().replace("color", "");
                var color = regionContent["key" + b].toLowerCase();
                if (color === "gold") {
                    $("[data-loc-copy='" + bc + "']").closest(".c-badge").removeClass("f-highlight").removeClass("f-lowlight").addClass("f-highlight");
                } else {
                    $("[data-loc-copy='" + bc + "']").closest(".c-badge").removeClass("f-highlight").removeClass("f-lowlight").addClass("f-lowlight");
                }
            })

            //snowbird
            $('[data-loc-cta="keyCtamos1pos2"]').removeClass("f-lightweight");
            $('[data-loc-cta="keyCtadq2left"]').removeClass("f-lightweight").addClass("white-c");
            $('[data-loc-cta="keyCtadq1left"]').removeClass("f-lightweight");
            $('[data-loc-cta="keyCtadq1right"]').removeClass("f-lightweight");
            $('[data-loc-cta="keyCtadq2bleft"]').removeClass("f-lightweight");
            $('[data-loc-cta="keyCtadq2bright"]').removeClass("f-lightweight");

            $(".icons a").each(function () {
                if ($(this).attr("href") === "####") {
                    $(this).remove();
                }
            })

            $(".hp-mosaic li a.c-call-to-action span.secondcta").each(function () {
                if ($(this).text() === "####") {
                    $(this).closest("a").remove();
                }
            })

            $(".hp-mosaic li a.c-call-to-action span").not(".secondcta").each(function () {
                if ($(this).text() === "####") {
                    $(this).closest("li").remove()
                }
            })

            $(".c-badge span").each(function () {
                if ($(this).text() === "####") {
                    $(this).closest(".c-badge").remove()
                }
            })

            $(".m-content-placement-item p").each(function () {
                if ($(this).text() === "####") {
                    $(this).remove();
                }
            })

            $(".m-content-placement-item span").each(function () {
                if ($(this).text() === "####") {
                    $(this).closest("a").remove();
                }
            })

            $("#zoomImg1 img").attr("src", regionContent["keyImagemos1pos2anim"]);
            $("#zoomImg2 img").attr("src", regionContent["keyImagemos1pos4anim"]);
            $("#zoomImg3 img").attr("src", regionContent["keyImagedq1leftanim"]);
            $("#zoomImg4 img").attr("src", regionContent["keyImagedq1rightanim"]);
            $("#zoomImg5 img").attr("src", regionContent["keyImagedq2bleftanim"]);
            $("#zoomImg6 img").attr("src", regionContent["keyImagedq2brightanim"]);
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
                'background: url(' + regionContent["keyImagedq2bleftanim"] + ');' +
                '}' +
                '#zoomImg6 {' +
                'background: url(' + regionContent["keyImagedq2brightanim"] + ');' +
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
                '</style>'
            )*/

            // First Full

            if (regionContent["keyTypefull"].toLowerCase().trim() === "centertop") {
                $("[data-loc-aria='keyAriafull']").closest(".fullTile").addClass("fullTileCenterTop");
                $(".fullTileCenterTop section .copy").prepend('<picture class="c-image fulltilelogo">' +
                    '<source class="heroImgMobile" srcset="' + regionContent["keyImagefulllogo"] + '" media="(min-width:0)">' +
                    '<img srcset="' + regionContent["keyImagefulllogo"] + '" src="' + regionContent["keyImagefulllogo"] + '" alt="' + regionContent["keyImagefulllogoalt"] + '">' +
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
            } else if (regionContent["keyTypefull"].toLowerCase().trim() === "left") {
              $(".fullLeftRight section").addClass("f-x-left").removeClass("f-x-right");
              $(".fullLeftRight section .copy").css("float", "none");
            } else if (regionContent["keyTypefull"].toLowerCase().trim() === "####") {
              $(".fullLeftRight").remove();
            } 

            if (regionContent["keyImagefulllogo"].toLowerCase().trim() !== "####") {
              $(".fullLeftRight section .copy").prepend('<picture class="c-image fulltilelogo">' +
                    '<source class="heroImgMobile" srcset="' + regionContent["keyImagefulllogo"] + '" media="(min-width:0)">' +
                    '<img srcset="' + regionContent["keyImagefulllogo"] + '" src="' + regionContent["keyImagefulllogo"] + '" alt="' + regionContent["keyImagefulllogoalt"] + '">' +
                    '</picture>');
            }

            if (regionContent["keyFullcopycolor"].toLowerCase().trim() === "white") {
                $(".fullLeftRight .copy").not(".fullLeftRight2 .copy").find("h2, h3, p, span").not(".c-badge span").removeClass("white-c").removeClass("black-c").addClass("white-c");
                // $(".fullLeftRight .copy").not(".fullLeftRight2 .copy").find("a").not(".c-badge span").removeClass("f-lightweight");
                $(".fullLeftRight").not(".fullLeftRight2").addClass("theme-dark");
                $(".fullLeftRight .c-call-to-action").addClass("white-c");
            } else {
                $(".fullLeftRight section").not(".fullLeftRight2 section").removeClass("theme-dark");
                $(".fullLeftRight .c-call-to-action span").addClass("black-c");
                $(".fullLeftRight .c-call-to-action").addClass("black-c");
            }


            // Second Full
            if (regionContent["keyTypefulltwo"].toLowerCase().trim() === "centertop") {
                $("[data-loc-aria='keyAriafulltwo']").closest(".fullTile").addClass("fullTileCenterTop");
                $(".fullTileCenterTop section .copy").prepend('<picture class="c-image fulltilelogo">' +
                    '<source class="heroImgMobile" srcset="' + regionContent["keyImagefulllogo"] + '" media="(min-width:0)">' +
                    '<img srcset="' + regionContent["keyImagefulllogo"] + '" src="' + regionContent["keyImagefulllogo"] + '" alt="' + regionContent["keyImagefulllogoalt2"] + '">' +
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
            } else if (regionContent["keyTypefulltwo"].toLowerCase().trim() === "left") {
              $(".fullLeftRightTwo section").addClass("f-x-left").removeClass("f-x-right");
              $(".fullLeftRightTwo section .copy").css("float", "none");
            } else if (regionContent["keyTypefulltwo"].toLowerCase().trim() === "####") {
              $(".fullLeftRightTwo").remove();
            }

            if (regionContent["keyImagefulllogotwo"].toLowerCase().trim() !== "####") {
              $(".fullLeftRightTwo section .copy").prepend('<picture class="c-image fulltilelogo">' +
                    '<source class="heroImgMobile" srcset="' + regionContent["keyImagefulllogotwo"] + '" media="(min-width:0)">' +
                    '<img srcset="' + regionContent["keyImagefulllogotwo"] + '" src="' + regionContent["keyImagefulllogotwo"] + '">' +
                    '</picture>');
            }

            if (regionContent["keyCopyfullcta2two"].toLowerCase().trim() !== "####") {
                $(".fullLeftRightTwo .secondCTA").remove();
            }

            if (regionContent["keyFullcopycolortwo"].toLowerCase().trim() === "white") {
                $(".fullLeftRightTwo .copy").not(".fullLeftRight2Two .copy").find("h2, h3, p").not(".c-badge span").removeClass("white-c").removeClass("black-c").addClass("white-c");
                // $(".fullLeftRight .copy").not(".fullLeftRight2 .copy").find("a").not(".c-badge span").removeClass("f-lightweight");
                $(".fullLeftRightTwo").not(".fullLeftRight2Two").addClass("theme-dark");
            } else {
                $(".fullLeftRightTwo section").not(".fullLeftRight2Two section").removeClass("theme-dark");
                $(".fullLeftRightTwo .c-call-to-action span").addClass("black-c");
                $(".fullLeftRightTwo .c-call-to-action").addClass("black-c");
            }


            // SPECIAL STYLES

            var thespecials = regionContent["keySpecialstyles"].replace(/\s+/g, '').split(",");
            for (var i = 0; i < thespecials.length; i++) {

            if (thespecials[i] === "fullanimation") {

                if (regionContent["keyTypefull"].toLowerCase().trim() === "center") {
                    $("body").append('<style>' +
                        '@media screen and (min-width: 1084px) {' +
                        '.fullTile .m-hero-item.f-x-right.f-y-center .copy {transform: translate(-50%,-50%) !important; left: calc(50%) !important; min-width: 80% !important; position: absolute !important; padding-right: 0 !important;}' +
                        '.fullTile section.m-hero-item.f-x-right.f-y-center {text-align: center !important;}' +
                        '.fullTile section.m-hero-item>div>div>div {margin-top: 0; padding-top: 0;}' +
                        '.fullTile section.m-hero-item.f-x-right>div {left: 0 !important;}' +
                        '.fullTile section.m-hero-item.f-x-right .fulltilelogo {display: inline-block !important;;}' +
                        '}' +
                        '@media screen and (max-width: 1300px) and (min-width: 1084px) {' +
                        '.fullTile .m-hero-item.f-x-right.f-y-center .copy {transform: translate(-50%,-60%) !important;}' +
                        '}' +
                        '</style>'
                    )
                }
                



                
                $('.fullLeftRight').not(".fullLeftRight2").find("section").prepend('<div class="m-ambient-video pp-button bgvid">' +
                    '<video role="img" id="mosvid5" poster="" muted="" aria-label="' + regionContent["keyAltfull"] + '">' +
                        '<source src="' + regionContent["keyImagefullanim"] + '" type="video/mp4"></video></div>')

                $('.fullLeftRight').not(".fullLeftRight2").find("section")
                    .after('<span class="intobsMarker" data-container="bgvid" data-transitions="^globFunctions.startVid&mosvid5|0"></span>')
                




                  $("body").append('<style>' +
                                    '.intobsMarker {width: 0;height: 0;}' +
                                    '.m-ambient-video.bgvid {padding: 0;}' +
                                    '@media (min-width: 1084px) {' +
                                        '[data-loc-image="keyImagefullanim"] {display: none !important;}' +

                                        '.fullTile section.m-hero-item>div.m-ambient-video {left: 0px;}' +
                                      '}' +
                                      '@media (max-width: 1083px) { .m-ambient-video.bgvid, .transparentGif {display: none !important;} }'+
                                 '</style>')
                  $(".videohero").addClass("f-x-right").addClass("f-y-center");



                   // INTERSECTION OBSERVER
                   /**
                    * Copyright 2016 Google Inc. All Rights Reserved.
                    *
                    * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
                    *
                    *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
                    *
                    */
                   (function() {
                   'use strict';

                   // Exit early if we're not running in a browser.
                   if (typeof window !== 'object') {
                     return;
                   }

                   // Exit early if all IntersectionObserver and IntersectionObserverEntry
                   // features are natively supported.
                   if ('IntersectionObserver' in window &&
                       'IntersectionObserverEntry' in window &&
                       'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

                     // Minimal polyfill for Edge 15's lack of `isIntersecting`
                     // See: https://github.com/w3c/IntersectionObserver/issues/211
                     if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
                       Object.defineProperty(window.IntersectionObserverEntry.prototype,
                         'isIntersecting', {
                         get: function () {
                           return this.intersectionRatio > 0;
                         }
                       });
                     }
                     return;
                   }


                   /**
                    * A local reference to the document.
                    */
                   var document = window.document;


                   /**
                    * An IntersectionObserver registry. This registry exists to hold a strong
                    * reference to IntersectionObserver instances currently observing a target
                    * element. Without this registry, instances without another reference may be
                    * garbage collected.
                    */
                   var registry = [];


                   /**
                    * Creates the global IntersectionObserverEntry constructor.
                    * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
                    * @param {Object} entry A dictionary of instance properties.
                    * @constructor
                    */
                   function IntersectionObserverEntry(entry) {
                     this.time = entry.time;
                     this.target = entry.target;
                     this.rootBounds = entry.rootBounds;
                     this.boundingClientRect = entry.boundingClientRect;
                     this.intersectionRect = entry.intersectionRect || getEmptyRect();
                     this.isIntersecting = !!entry.intersectionRect;

                     // Calculates the intersection ratio.
                     var targetRect = this.boundingClientRect;
                     var targetArea = targetRect.width * targetRect.height;
                     var intersectionRect = this.intersectionRect;
                     var intersectionArea = intersectionRect.width * intersectionRect.height;

                     // Sets intersection ratio.
                     if (targetArea) {
                       // Round the intersection ratio to avoid floating point math issues:
                       // https://github.com/w3c/IntersectionObserver/issues/324
                       this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
                     } else {
                       // If area is zero and is intersecting, sets to 1, otherwise to 0
                       this.intersectionRatio = this.isIntersecting ? 1 : 0;
                     }
                   }


                   /**
                    * Creates the global IntersectionObserver constructor.
                    * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
                    * @param {Function} callback The function to be invoked after intersection
                    *     changes have queued. The function is not invoked if the queue has
                    *     been emptied by calling the `takeRecords` method.
                    * @param {Object=} opt_options Optional configuration options.
                    * @constructor
                    */
                   function IntersectionObserver(callback, opt_options) {

                     var options = opt_options || {};

                     if (typeof callback != 'function') {
                       throw new Error('callback must be a function');
                     }

                     if (options.root && options.root.nodeType != 1) {
                       throw new Error('root must be an Element');
                     }

                     // Binds and throttles `this._checkForIntersections`.
                     this._checkForIntersections = throttle(
                         this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

                     // Private properties.
                     this._callback = callback;
                     this._observationTargets = [];
                     this._queuedEntries = [];
                     this._rootMarginValues = this._parseRootMargin(options.rootMargin);

                     // Public properties.
                     this.thresholds = this._initThresholds(options.threshold);
                     this.root = options.root || null;
                     this.rootMargin = this._rootMarginValues.map(function(margin) {
                       return margin.value + margin.unit;
                     }).join(' ');
                   }


                   /**
                    * The minimum interval within which the document will be checked for
                    * intersection changes.
                    */
                   IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


                   /**
                    * The frequency in which the polyfill polls for intersection changes.
                    * this can be updated on a per instance basis and must be set prior to
                    * calling `observe` on the first target.
                    */
                   IntersectionObserver.prototype.POLL_INTERVAL = null;

                   /**
                    * Use a mutation observer on the root element
                    * to detect intersection changes.
                    */
                   IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


                   /**
                    * Starts observing a target element for intersection changes based on
                    * the thresholds values.
                    * @param {Element} target The DOM element to observe.
                    */
                   IntersectionObserver.prototype.observe = function(target) {
                     var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
                       return item.element == target;
                     });

                     if (isTargetAlreadyObserved) {
                       return;
                     }

                     if (!(target && target.nodeType == 1)) {
                       throw new Error('target must be an Element');
                     }

                     this._registerInstance();
                     this._observationTargets.push({element: target, entry: null});
                     this._monitorIntersections();
                     this._checkForIntersections();
                   };


                   /**
                    * Stops observing a target element for intersection changes.
                    * @param {Element} target The DOM element to observe.
                    */
                   IntersectionObserver.prototype.unobserve = function(target) {
                     this._observationTargets =
                         this._observationTargets.filter(function(item) {

                       return item.element != target;
                     });
                     if (!this._observationTargets.length) {
                       this._unmonitorIntersections();
                       this._unregisterInstance();
                     }
                   };


                   /**
                    * Stops observing all target elements for intersection changes.
                    */
                   IntersectionObserver.prototype.disconnect = function() {
                     this._observationTargets = [];
                     this._unmonitorIntersections();
                     this._unregisterInstance();
                   };


                   /**
                    * Returns any queue entries that have not yet been reported to the
                    * callback and clears the queue. This can be used in conjunction with the
                    * callback to obtain the absolute most up-to-date intersection information.
                    * @return {Array} The currently queued entries.
                    */
                   IntersectionObserver.prototype.takeRecords = function() {
                     var records = this._queuedEntries.slice();
                     this._queuedEntries = [];
                     return records;
                   };


                   /**
                    * Accepts the threshold value from the user configuration object and
                    * returns a sorted array of unique threshold values. If a value is not
                    * between 0 and 1 and error is thrown.
                    * @private
                    * @param {Array|number=} opt_threshold An optional threshold value or
                    *     a list of threshold values, defaulting to [0].
                    * @return {Array} A sorted list of unique and valid threshold values.
                    */
                   IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
                     var threshold = opt_threshold || [0];
                     if (!Array.isArray(threshold)) threshold = [threshold];

                     return threshold.sort().filter(function(t, i, a) {
                       if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
                         throw new Error('threshold must be a number between 0 and 1 inclusively');
                       }
                       return t !== a[i - 1];
                     });
                   };


                   /**
                    * Accepts the rootMargin value from the user configuration object
                    * and returns an array of the four margin values as an object containing
                    * the value and unit properties. If any of the values are not properly
                    * formatted or use a unit other than px or %, and error is thrown.
                    * @private
                    * @param {string=} opt_rootMargin An optional rootMargin value,
                    *     defaulting to '0px'.
                    * @return {Array<Object>} An array of margin objects with the keys
                    *     value and unit.
                    */
                   IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
                     var marginString = opt_rootMargin || '0px';
                     var margins = marginString.split(/\s+/).map(function(margin) {
                       var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
                       if (!parts) {
                         throw new Error('rootMargin must be specified in pixels or percent');
                       }
                       return {value: parseFloat(parts[1]), unit: parts[2]};
                     });

                     // Handles shorthand.
                     margins[1] = margins[1] || margins[0];
                     margins[2] = margins[2] || margins[0];
                     margins[3] = margins[3] || margins[1];

                     return margins;
                   };


                   /**
                    * Starts polling for intersection changes if the polling is not already
                    * happening, and if the page's visibility state is visible.
                    * @private
                    */
                   IntersectionObserver.prototype._monitorIntersections = function() {
                     if (!this._monitoringIntersections) {
                       this._monitoringIntersections = true;

                       // If a poll interval is set, use polling instead of listening to
                       // resize and scroll events or DOM mutations.
                       if (this.POLL_INTERVAL) {
                         this._monitoringInterval = setInterval(
                             this._checkForIntersections, this.POLL_INTERVAL);
                       }
                       else {
                         addEvent(window, 'resize', this._checkForIntersections, true);
                         addEvent(document, 'scroll', this._checkForIntersections, true);

                         if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
                           this._domObserver = new MutationObserver(this._checkForIntersections);
                           this._domObserver.observe(document, {
                             attributes: true,
                             childList: true,
                             characterData: true,
                             subtree: true
                           });
                         }
                       }
                     }
                   };


                   /**
                    * Stops polling for intersection changes.
                    * @private
                    */
                   IntersectionObserver.prototype._unmonitorIntersections = function() {
                     if (this._monitoringIntersections) {
                       this._monitoringIntersections = false;

                       clearInterval(this._monitoringInterval);
                       this._monitoringInterval = null;

                       removeEvent(window, 'resize', this._checkForIntersections, true);
                       removeEvent(document, 'scroll', this._checkForIntersections, true);

                       if (this._domObserver) {
                         this._domObserver.disconnect();
                         this._domObserver = null;
                       }
                     }
                   };


                   /**
                    * Scans each observation target for intersection changes and adds them
                    * to the internal entries queue. If new entries are found, it
                    * schedules the callback to be invoked.
                    * @private
                    */
                   IntersectionObserver.prototype._checkForIntersections = function() {
                     var rootIsInDom = this._rootIsInDom();
                     var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

                     this._observationTargets.forEach(function(item) {
                       var target = item.element;
                       var targetRect = getBoundingClientRect(target);
                       var rootContainsTarget = this._rootContainsTarget(target);
                       var oldEntry = item.entry;
                       var intersectionRect = rootIsInDom && rootContainsTarget &&
                           this._computeTargetAndRootIntersection(target, rootRect);

                       var newEntry = item.entry = new IntersectionObserverEntry({
                         time: now(),
                         target: target,
                         boundingClientRect: targetRect,
                         rootBounds: rootRect,
                         intersectionRect: intersectionRect
                       });

                       if (!oldEntry) {
                         this._queuedEntries.push(newEntry);
                       } else if (rootIsInDom && rootContainsTarget) {
                         // If the new entry intersection ratio has crossed any of the
                         // thresholds, add a new entry.
                         if (this._hasCrossedThreshold(oldEntry, newEntry)) {
                           this._queuedEntries.push(newEntry);
                         }
                       } else {
                         // If the root is not in the DOM or target is not contained within
                         // root but the previous entry for this target had an intersection,
                         // add a new record indicating removal.
                         if (oldEntry && oldEntry.isIntersecting) {
                           this._queuedEntries.push(newEntry);
                         }
                       }
                     }, this);

                     if (this._queuedEntries.length) {
                       this._callback(this.takeRecords(), this);
                     }
                   };


                   /**
                    * Accepts a target and root rect computes the intersection between then
                    * following the algorithm in the spec.
                    * TODO(philipwalton): at this time clip-path is not considered.
                    * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
                    * @param {Element} target The target DOM element
                    * @param {Object} rootRect The bounding rect of the root after being
                    *     expanded by the rootMargin value.
                    * @return {?Object} The final intersection rect object or undefined if no
                    *     intersection is found.
                    * @private
                    */
                   IntersectionObserver.prototype._computeTargetAndRootIntersection =
                       function(target, rootRect) {

                     // If the element isn't displayed, an intersection can't happen.
                     if (window.getComputedStyle(target).display == 'none') return;

                     var targetRect = getBoundingClientRect(target);
                     var intersectionRect = targetRect;
                     var parent = getParentNode(target);
                     var atRoot = false;

                     while (!atRoot) {
                       var parentRect = null;
                       var parentComputedStyle = parent.nodeType == 1 ?
                           window.getComputedStyle(parent) : {};

                       // If the parent isn't displayed, an intersection can't happen.
                       if (parentComputedStyle.display == 'none') return;

                       if (parent == this.root || parent == document) {
                         atRoot = true;
                         parentRect = rootRect;
                       } else {
                         // If the element has a non-visible overflow, and it's not the <body>
                         // or <html> element, update the intersection rect.
                         // Note: <body> and <html> cannot be clipped to a rect that's not also
                         // the document rect, so no need to compute a new intersection.
                         if (parent != document.body &&
                             parent != document.documentElement &&
                             parentComputedStyle.overflow != 'visible') {
                           parentRect = getBoundingClientRect(parent);
                         }
                       }

                       // If either of the above conditionals set a new parentRect,
                       // calculate new intersection data.
                       if (parentRect) {
                         intersectionRect = computeRectIntersection(parentRect, intersectionRect);

                         if (!intersectionRect) break;
                       }
                       parent = getParentNode(parent);
                     }
                     return intersectionRect;
                   };


                   /**
                    * Returns the root rect after being expanded by the rootMargin value.
                    * @return {Object} The expanded root rect.
                    * @private
                    */
                   IntersectionObserver.prototype._getRootRect = function() {
                     var rootRect;
                     if (this.root) {
                       rootRect = getBoundingClientRect(this.root);
                     } else {
                       // Use <html>/<body> instead of window since scroll bars affect size.
                       var html = document.documentElement;
                       var body = document.body;
                       rootRect = {
                         top: 0,
                         left: 0,
                         right: html.clientWidth || body.clientWidth,
                         width: html.clientWidth || body.clientWidth,
                         bottom: html.clientHeight || body.clientHeight,
                         height: html.clientHeight || body.clientHeight
                       };
                     }
                     return this._expandRectByRootMargin(rootRect);
                   };
 

                   /**
                    * Accepts a rect and expands it by the rootMargin value.
                    * @param {Object} rect The rect object to expand.
                    * @return {Object} The expanded rect.
                    * @private
                    */
                   IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
                     var margins = this._rootMarginValues.map(function(margin, i) {
                       return margin.unit == 'px' ? margin.value :
                           margin.value * (i % 2 ? rect.width : rect.height) / 100;
                     });
                     var newRect = {
                       top: rect.top - margins[0],
                       right: rect.right + margins[1],
                       bottom: rect.bottom + margins[2],
                       left: rect.left - margins[3]
                     };
                     newRect.width = newRect.right - newRect.left;
                     newRect.height = newRect.bottom - newRect.top;

                     return newRect;
                   };


                   /**
                    * Accepts an old and new entry and returns true if at least one of the
                    * threshold values has been crossed.
                    * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
                    *    particular target element or null if no previous entry exists.
                    * @param {IntersectionObserverEntry} newEntry The current entry for a
                    *    particular target element.
                    * @return {boolean} Returns true if a any threshold has been crossed.
                    * @private
                    */
                   IntersectionObserver.prototype._hasCrossedThreshold =
                       function(oldEntry, newEntry) {

                     // To make comparing easier, an entry that has a ratio of 0
                     // but does not actually intersect is given a value of -1
                     var oldRatio = oldEntry && oldEntry.isIntersecting ?
                         oldEntry.intersectionRatio || 0 : -1;
                     var newRatio = newEntry.isIntersecting ?
                         newEntry.intersectionRatio || 0 : -1;

                     // Ignore unchanged ratios
                     if (oldRatio === newRatio) return;

                     for (var i = 0; i < this.thresholds.length; i++) {
                       var threshold = this.thresholds[i];

                       // Return true if an entry matches a threshold or if the new ratio
                       // and the old ratio are on the opposite sides of a threshold.
                       if (threshold == oldRatio || threshold == newRatio ||
                           threshold < oldRatio !== threshold < newRatio) {
                         return true;
                       }
                     }
                   };


                   /**
                    * Returns whether or not the root element is an element and is in the DOM.
                    * @return {boolean} True if the root element is an element and is in the DOM.
                    * @private
                    */
                   IntersectionObserver.prototype._rootIsInDom = function() {
                     return !this.root || containsDeep(document, this.root);
                   };


                   /**
                    * Returns whether or not the target element is a child of root.
                    * @param {Element} target The target element to check.
                    * @return {boolean} True if the target element is a child of root.
                    * @private
                    */
                   IntersectionObserver.prototype._rootContainsTarget = function(target) {
                     return containsDeep(this.root || document, target);
                   };


                   /**
                    * Adds the instance to the global IntersectionObserver registry if it isn't
                    * already present.
                    * @private
                    */
                   IntersectionObserver.prototype._registerInstance = function() {
                     if (registry.indexOf(this) < 0) {
                       registry.push(this);
                     }
                   };


                   /**
                    * Removes the instance from the global IntersectionObserver registry.
                    * @private
                    */
                   IntersectionObserver.prototype._unregisterInstance = function() {
                     var index = registry.indexOf(this);
                     if (index != -1) registry.splice(index, 1);
                   };


                   /**
                    * Returns the result of the performance.now() method or null in browsers
                    * that don't support the API.
                    * @return {number} The elapsed time since the page was requested.
                    */
                   function now() {
                     return window.performance && performance.now && performance.now();
                   }


                   /**
                    * Throttles a function and delays its execution, so it's only called at most
                    * once within a given time period.
                    * @param {Function} fn The function to throttle.
                    * @param {number} timeout The amount of time that must pass before the
                    *     function can be called again.
                    * @return {Function} The throttled function.
                    */
                   function throttle(fn, timeout) {
                     var timer = null;
                     return function () {
                       if (!timer) {
                         timer = setTimeout(function() {
                           fn();
                           timer = null;
                         }, timeout);
                       }
                     };
                   }


                   /**
                    * Adds an event handler to a DOM node ensuring cross-browser compatibility.
                    * @param {Node} node The DOM node to add the event handler to.
                    * @param {string} event The event name.
                    * @param {Function} fn The event handler to add.
                    * @param {boolean} opt_useCapture Optionally adds the even to the capture
                    *     phase. Note: this only works in modern browsers.
                    */
                   function addEvent(node, event, fn, opt_useCapture) {
                     if (typeof node.addEventListener == 'function') {
                       node.addEventListener(event, fn, opt_useCapture || false);
                     }
                     else if (typeof node.attachEvent == 'function') {
                       node.attachEvent('on' + event, fn);
                     }
                   }


                   /**
                    * Removes a previously added event handler from a DOM node.
                    * @param {Node} node The DOM node to remove the event handler from.
                    * @param {string} event The event name.
                    * @param {Function} fn The event handler to remove.
                    * @param {boolean} opt_useCapture If the event handler was added with this
                    *     flag set to true, it should be set to true here in order to remove it.
                    */
                   function removeEvent(node, event, fn, opt_useCapture) {
                     if (typeof node.removeEventListener == 'function') {
                       node.removeEventListener(event, fn, opt_useCapture || false);
                     }
                     else if (typeof node.detatchEvent == 'function') {
                       node.detatchEvent('on' + event, fn);
                     }
                   }


                   /**
                    * Returns the intersection between two rect objects.
                    * @param {Object} rect1 The first rect.
                    * @param {Object} rect2 The second rect.
                    * @return {?Object} The intersection rect or undefined if no intersection
                    *     is found.
                    */
                   function computeRectIntersection(rect1, rect2) {
                     var top = Math.max(rect1.top, rect2.top);
                     var bottom = Math.min(rect1.bottom, rect2.bottom);
                     var left = Math.max(rect1.left, rect2.left);
                     var right = Math.min(rect1.right, rect2.right);
                     var width = right - left;
                     var height = bottom - top;

                     return (width >= 0 && height >= 0) && {
                       top: top,
                       bottom: bottom,
                       left: left,
                       right: right,
                       width: width,
                       height: height
                     };
                   }


                   /**
                    * Shims the native getBoundingClientRect for compatibility with older IE.
                    * @param {Element} el The element whose bounding rect to get.
                    * @return {Object} The (possibly shimmed) rect of the element.
                    */
                   function getBoundingClientRect(el) {
                     var rect;

                     try {
                       rect = el.getBoundingClientRect();
                     } catch (err) {
                       // Ignore Windows 7 IE11 "Unspecified error"
                       // https://github.com/w3c/IntersectionObserver/pull/205
                     }

                     if (!rect) return getEmptyRect();

                     // Older IE
                     if (!(rect.width && rect.height)) {
                       rect = {
                         top: rect.top,
                         right: rect.right,
                         bottom: rect.bottom,
                         left: rect.left,
                         width: rect.right - rect.left,
                         height: rect.bottom - rect.top
                       };
                     }
                     return rect;
                   }


                   /**
                    * Returns an empty rect object. An empty rect is returned when an element
                    * is not in the DOM.
                    * @return {Object} The empty rect.
                    */
                   function getEmptyRect() {
                     return {
                       top: 0,
                       bottom: 0,
                       left: 0,
                       right: 0,
                       width: 0,
                       height: 0
                     };
                   }

                   /**
                    * Checks to see if a parent element contains a child element (including inside
                    * shadow DOM).
                    * @param {Node} parent The parent element.
                    * @param {Node} child The child element.
                    * @return {boolean} True if the parent node contains the child node.
                    */
                   function containsDeep(parent, child) {
                     var node = child;
                     while (node) {
                       if (node == parent) return true;

                       node = getParentNode(node);
                     }
                     return false;
                   }


                   /**
                    * Gets the parent node of an element or its host element if the parent node
                    * is a shadow root.
                    * @param {Node} node The node whose parent to get.
                    * @return {Node|null} The parent node or null if no parent exists.
                    */
                   function getParentNode(node) {
                     var parent = node.parentNode;

                     if (parent && parent.nodeType == 11 && parent.host) {
                       // If the parent is a shadow root, return the host element.
                       return parent.host;
                     }

                     if (parent && parent.assignedSlot) {
                       // If the parent is distributed in a <slot>, return the parent of a slot.
                       return parent.assignedSlot.parentNode;
                     }

                     return parent;
                   }


                   // Exposes the constructors globally.
                   window.IntersectionObserver = IntersectionObserver;
                   window.IntersectionObserverEntry = IntersectionObserverEntry;

                   }());

                    if ('NodeList' in window && !NodeList.prototype.forEach) {
                      console.info('polyfill for IE11');
                      NodeList.prototype.forEach = function (callback, thisArg) {
                        thisArg = thisArg || window;
                        for (var i = 0; i < this.length; i++) {
                          callback.call(thisArg, this[i], i, this);
                        }
                      };
                    }

                    // end ie11 intersection observer polyfill

                   var intobsMarkers = document.querySelectorAll(".intobsMarker");

                   var markerOptions = {
                      threshold: .98,
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

            
         }


            // FLIP FROM LEFT TO RIGHT
            // $(".m-hero-item").removeClass("f-x-left theme-dark").addClass("f-x-right theme-light")


        })();

    }
});