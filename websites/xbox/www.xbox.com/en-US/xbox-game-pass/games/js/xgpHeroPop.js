$(document).ready(function() {
    var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
    function makedc(title) {
      return title.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi,'');
    }
  
    var populateHero = (function() {
      var regHeroContent = allHeroes.locales[urlRegion] 
  
      var heroTypes = {};
      heroTypes["center"] = '<section class="m-hero-item f-x-center f-y-center context-accessory" role="tabpanel" tabindex="-1">' +
                             '<picture class="c-image">' +
                                '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                                '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                                '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                                '<img srcset="" src="" alt="">' +
                          '</picture>' +
                            '<div>' +
                                '<div class="high-contrast">' +
                                    '<strong class="c-badge f-small"><span></span></strong>' +
                                    '<h1 class="c-heading"></h1>' +
                                    '<p class="c-subheading x-visible-inline-block"></p>' +
                                    '<div class="c-group">' +
                                        '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" aria-label="">' +
                                            '<span></span>' +
                                        '</a>' +
                                        '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
                                            '<span></span>' +
                                        '</a>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>' +
                              '</section>'
  
      heroTypes["centerlogo"] = '<section class="m-hero-item f-x-center f-y-center context-accessory" role="tabpanel" tabindex="-1">' +
                             '<picture class="c-image">' +
                                  '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                                  '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                                  '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                                  '<img srcset="" src="" alt="">' +
                            '</picture>' +
                              '<div>' +
                                  '<div class="high-contrast">' +
                                      '<strong class="c-badge f-small"><span></span></strong>' +
                                      '<h1 class="c-heading"></h1>' +
                                      '<p class="c-subheading x-visible-inline-block"></p>' +
                                      '<div class="c-group">' +
                                          '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" target="_blank" aria-label="">' +
                                              '<span></span>' +
                                          '</a>' +
                                          '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
                                              '<span></span>' +
                                          '</a>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</section>'
  
      heroTypes["right"] = '<section class="m-hero-item f-x-right f-y-center context-accessory" role="tabpanel" tabindex="-1">' +
                        '<picture class="c-image">' +
                              '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                              '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                              '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                              '<img srcset="" src="" alt="">' +
                        '</picture>' +
                          '<div>' +
                              '<div class="high-contrast">' +
                                  '<strong class="c-badge f-small"><span></span></strong>' +
                                  '<h1 class="c-heading zpt"></h1>' +
                                  '<p class="c-subheading x-visible-inline-block"></p>' +
                                  '<div class="c-group">' +
                                      '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" target="_blank" aria-label="">' +
                                          '<span></span>' +
                                      '</a>' +
                                      '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
                                          '<span></span>' +
                                      '</a>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                            '</section>'
  
      heroTypes["left"] = '<section class="m-hero-item f-x-left f-y-center context-accessory" role="tabpanel" tabindex="-1">' +
                           '<picture class="c-image">' +
                              '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                              '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                              '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                              '<img srcset="" src="" alt="">' +
                        '</picture>' +
                          '<div>' +
                              '<div class="high-contrast">' +
                                  '<strong class="c-badge f-small"><span></span></strong>' +
                                  '<h1 class="c-heading zpt"></h1>' +
                                  '<p class="c-subheading x-visible-inline-block"></p>' +
                                  '<div class="c-group">' +
                                      '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" target="_blank" aria-label="">' +
                                          '<span></span>' +
                                      '</a>' +
                                      '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
                                          '<span></span>' +
                                      '</a>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                            '</section>'
  
      heroTypes["centerbottom"] = '<section class="m-hero-item f-x-center f-y-bottom context-accessory" role="tabpanel" tabindex="-1">' +
                                    '<picture class="c-image">' +
                                      '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                                      '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                                      '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                                      '<img srcset="" src="" alt="">' +
                                '</picture>' +
                                  '<div>' +
                                      '<div class="high-contrast">' +
                                          '<strong class="c-badge f-small"><span></span></strong>' +
                                          '<h1 class="c-heading zpt"></h1>' +
                                          '<p class="c-subheading x-visible-inline-block"></p>' +
                                          '<div class="c-group">' +
                                              '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" target="_blank" aria-label="">' +
                                                  '<span></span>' +
                                              '</a>' +
                                              '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
                                                  '<span></span>' +
                                              '</a>' +
                                          '</div>' +
                                        '</div>' +
                                      '</div>' +
                                    '</section>'
  
      heroTypes["centertop"] = '<section class="m-hero-item f-x-center f-y-top context-accessory" itemscope itemtype="http://schema.org/Product" tabindex="-1">' +
                                  '<picture class="c-image">' +
                                    '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                                    '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                                    '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                                    '<img srcset="" src="" alt="">' +
                              '</picture>' +
                                '<div>' +
                                    '<div class="high-contrast">' +
                                        '<strong class="c-badge f-small"><span></span></strong>' +
                                        '<h1 class="c-heading"></h1>' +
                                        '<p class="c-subheading x-visible-inline-block"></p>' +
                                        '<div class="c-group">' +
                                            '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" target="_blank" aria-label="">' +
                                                '<span></span>' +
                                            '</a>' +
                                            '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
                                                '<span></span>' +
                                            '</a>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>' +
                                  '</section>'
  
      heroTypes["video"] = '<section class="m-hero-item context-device videohero" role="tabpanel" tabindex="-1">' +
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
                                            '<h1 class="c-heading"></h1>' +
                                            '<p class="c-subheading x-visible-inline-block"></p>' +
                                            '<div class="c-group">' +
                                                '<a href="" class="c-call-to-action c-glyph cta1 green-brdr" target="_blank" aria-label="">' +
                                                    '<span></span>' +
                                                '</a>' +
                                                '<a href="" class="c-call-to-action c-glyph cta2" data-cta="learn" aria-label="">' +
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
        if (regHeroContent["keyHero1badgecolor"].toLowerCase() === "green") {
            $(".sl-hero .c-badge").css("background-color", "#107c10");
         }
        $(".sl-hero .c-badge").attr("data-loc-color", "keyHero1badgecolor");
        $(".sl-hero .c-badge span").text(regHeroContent["keyHero1badgecopy"]);
        $(".sl-hero h1").html(regHeroContent["keyHero1headline"])
        $(".sl-hero p.c-subheading").html(regHeroContent["keyHero1subheading"])
        $(".sl-hero a.cta1").attr("href", regHeroContent["keyHero1link"])
        $(".sl-hero a.cta1 span").text(regHeroContent["keyHero1cta"])
        if (regHeroContent["keyHero1dataretailer"] !== "####") { 
          $(".sl-hero a.cta1").attr("data-retailer", regHeroContent["keyHero1dataretailer"]) 
        } else {
         // $(".sl-hero a.cta1").attr("data-cta", "learn") 
        }
        $(".sl-hero a.cta1").attr("aria-label", regHeroContent["keyHero1arialabel"])
  
        $(".sl-hero a.cta2").attr("href", regHeroContent["keyHero1link2"])
        $(".sl-hero a.cta2 span").text(regHeroContent["keyHero1cta2"])
        if (regHeroContent["keyHero1dataretailer2"] !== "####") { $(".sl-hero a.cta2").attr("data-retailer", regHeroContent["keyHero1dataretailer2"]) }
        $(".sl-hero a.cta2").attr("aria-label", regHeroContent["keyHero1arialabel2"])
      } else {
        var herotooltip = $("#herotooltiptext").text();
  
        var playslidetext = { "locales": {
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
            var controllab = regHeroContent[heroPre + "headline"].replace("<br>", " ");
            if (controllab.length === 0) {
              controllab = regHeroContent[heroPre + "subheading"].replace("<br>", " ");
            }
            $(".sl-hero .c-sequence-indicator button").last().after('<button role="tab" aria-selected="false" aria-label="' + 
              controllab + '" title="' + controllab + '"></button>')
          }
          var heroInsert = heroTypes[regHeroContent[heroPre + "type"].toLowerCase()];
          $(".sl-hero .heroList").append('<li id="hero-' + i + '">' + 
                                  heroInsert + 
                                  '</li>')
          if (regHeroContent[heroPre + "extraclasses"] !== "####") {
            $(".sl-hero li").eq(i - 1).find(".m-hero-item").addClass(regHeroContent[heroPre + "extraclasses"])
          }
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
          if (regHeroContent["keyHero" + i + "badgecolor"].toLowerCase() === "green") {
            $(".sl-hero li").eq(i - 1).find(".c-badge").css("background-color", "#107c10");
          }
          $(".sl-hero li").eq(i - 1).find(".c-badge span").text(regHeroContent["keyHero" + i + "badgecopy"]);
          $(".sl-hero li").eq(i - 1).find("h1").html(regHeroContent[heroPre + "headline"])
          $(".sl-hero li").eq(i - 1).find("p.c-subheading").html(regHeroContent[heroPre + "subheading"])
          $(".sl-hero li").eq(i - 1).find("a.cta1").attr("href", regHeroContent[heroPre + "link"])
          $(".sl-hero li").eq(i - 1).find("a.cta1 span").text(regHeroContent[heroPre + "cta"])
          
          if (regHeroContent[heroPre + "dataretailer"] !== "####") {
            $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-retailer", regHeroContent[heroPre + "dataretailer"])

          } else {
            $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-cta", "learn") 
          }
          $(".sl-hero li").eq(i - 1).find("a.cta1").attr("aria-label", regHeroContent[heroPre + "arialabel"])
  
          $(".sl-hero li").eq(i - 1).find("a.cta2").attr("href", regHeroContent[heroPre + "link2"])
          $(".sl-hero li").eq(i - 1).find("a.cta2 span").text(regHeroContent[heroPre + "cta2"])
          if (regHeroContent[heroPre + "dataretailer2"] !== "####") {
            $(".sl-hero li").eq(i - 1).find("a.cta2").attr("data-retailer", regHeroContent[heroPre + "dataretailer2"])
          }
          $(".sl-hero li").eq(i - 1).find("a.cta2").attr("aria-label", regHeroContent[heroPre + "arialabel2"])
          if ($(".sl-hero li").eq(i - 1).find("p.c-subheading").text() === "####") {
            $(".sl-hero li").eq(i - 1).find("p.c-subheading").remove();
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
      $(".sl-hero span").each(function() {
        if ($(this).text() === "####") {
          $(this).closest(".c-badge").remove();
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
  
      $(".sl-hero h1").each(function() {
        var head = $(this);
        var temphead = $(head).html();
        var headarr = temphead.toLowerCase().replace("<br>", " ").split(" ");
        headarr.forEach(function(word) {
          if (word.length > 11) { 
            $(head).removeClass("c-heading-1").addClass("c-heading-2");
          }
        })
      })
  
      $(".m-hero-item a").each(function () {
        var ctaTextDL = $(this).attr("href").toLowerCase()
        if (ctaTextDL.indexOf("xboxdesignlab") !== -1) {
            $(this).addClass("customize-button").addClass("cta-btn-dark");
            $(this).closest(".m-hero-item").find(".c-subheading").addClass("c-subheading-2").removeClass("c-subheading");
        } 
      });
  
      $(".m-hero-item h1").each(function(index) { 
        if (index !== 0) {
          var newhtext = $(this).html();
          var newhclasses = $(this).attr("class");
          $(this).after('<h2 class="' + newhclasses + ' x-hidden-focus">' + newhtext + '</h2>');
          $(this).remove();
        }
      });
  
      setTimeout(function() {
        $("body").css("visibility", "visible");
      }, 100)
    })();
  
    var translate = (function() {
    var regionStrings = allHeroes.locales[urlRegion]
    $(".legal1").text(regionStrings["keyCopylegal1"]);
    $(".legal2").text(regionStrings["keyCopylegal2"]);
    $(".legal3").text(regionStrings["keyCopylegal3"]);
    })();

    $(document).on("click", ".heroList a", function() {
      if ($(this).attr("href").toLowerCase().indexOf("xbox-game-pass/games#") !== -1) {
        var btttop = $(".thecatalog").position().top;
        $("HTML, BODY").animate({
            scrollTop: btttop
        }, 100);
      }
    })
  
  });
  
  
  