$(document).ready(function() {
  var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
  function makedc(title) {
    return title.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi,'');
  }

  var populateHero = (function() {
    var regHeroContent = allHeroes.locales[urlRegion] 

// Dark on Dark Heroes
setTimeout(function() {
    if (regHeroContent.keyHero1link.toLowerCase().indexOf("cyberpunk-2077-1tb-le") !== -1) {
        $("#hero-1 .m-hero-item div > div").addClass("darkOnDark");
    }
    if (regHeroContent.keyHero2link.toLowerCase().indexOf("cyberpunk-2077-1tb-le") !== -1) {
        $("#hero-2 .m-hero-item div > div").addClass("darkOnDark");
    }
    if (regHeroContent.keyHero3link.toLowerCase().indexOf("cyberpunk-2077-1tb-le") !== -1) {
        $("#hero-3 .m-hero-item div > div").addClass("darkOnDark");
    }
}, 150);

// Hero Scrolling
function clickAndScroll(herobutton, filterbutton) {
    $(document).on("click", herobutton, function() {
        $(filterbutton).click().click();
        var element = document.querySelector("#xosFilterButton");
        element.scrollIntoView();
    });
}
if (regHeroContent.keyHero1link.indexOf("#xbox-one-x") !== -1) {
    clickAndScroll(".sl-hero #hero-1 a.cta1", "#xoFilterButton a");
} else if (regHeroContent.keyHero1link.indexOf("#xbox-one-s") !== -1) {
    clickAndScroll(".sl-hero #hero-1 a.cta1", "#xosFilterButton a");
}
if (regHeroContent.keyHero2link.indexOf("#xbox-one-x") !== -1) {
    clickAndScroll(".sl-hero #hero-2 a.cta1", "#xoFilterButton a");
} else if (regHeroContent.keyHero2link.indexOf("#xbox-one-s") !== -1) {
    clickAndScroll(".sl-hero #hero-2 a.cta1", "#xosFilterButton a");
}
if (regHeroContent.keyHero3link.indexOf("#xbox-one-x") !== -1) {
    clickAndScroll(".sl-hero #hero-3 a.cta1", "#xoFilterButton a");
} else if (regHeroContent.keyHero3link.indexOf("#xbox-one-s") !== -1) {
    clickAndScroll(".sl-hero #hero-3 a.cta1", "#xosFilterButton a");
}
// Hero Scrolling End


// Hero Types
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
                                 '<picture>' +
                                  '<source class="logoImg" srcset="" media="(min-width:0)">' +
                                  '<img src="" src="" alt="">' +
                                  '</picture>' +
                                  '<strong class="c-badge f-small zpt"><span></span></strong>' +
                                  '<h1 class="c-heading"></h1>' +
                                  '<p class="c-subheading x-visible-inline-block"></p>' +
                                  '<div>' +
                                      '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                          '<span></span>' +
                                      '</a>' +
                                      '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
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
                                 '<picture>' +
                                  '<source class="logoImg" srcset="" media="(min-width:0)">' +
                                  '<img src="" src="" alt="">' +
                                  '</picture>' +
                                    '<strong class="c-badge f-small"><span></span></strong>' +
                                    '<h1 class="c-heading zpt"></h1>' +
                                    '<p class="c-subheading x-visible-inline-block"></p>' +
                                    '<div>' +
                                        '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                            '<span></span>' +
                                        '</a>' +
                                        '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
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
                                 '<picture>' +
                                  '<source class="logoImg" srcset="" media="(min-width:0)">' +
                                  '<img src="" src="" alt="">' +
                                  '</picture>' +
                                '<strong class="c-badge f-small"><span></span></strong>' +
                                '<h1 class="c-heading zpt"></h1>' +
                                '<p class="c-subheading x-visible-inline-block"></p>' +
                                '<div>' +
                                    '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                        '<span></span>' +
                                    '</a>' +
                                    '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
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
                                 '<picture>' +
                                  '<source class="logoImg" srcset="" media="(min-width:0)">' +
                                  '<img src="" src="" alt="">' +
                                  '</picture>' +
                                '<strong class="c-badge f-small"><span></span></strong>' +
                                '<h1 class="c-heading zpt"></h1>' +
                                '<p class="c-subheading x-visible-inline-block"></p>' +
                                '<div>' +
                                    '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                        '<span></span>' +
                                    '</a>' +
                                    '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                        '<span></span>' +
                                    '</a>' +
                                '</div>' +
                              '</div>' +
                            '</div>' +
                          '</section>'

        heroTypes["righttop"] = '<section class="m-hero-item f-x-right f-y-top context-accessory" role="tabpanel" tabindex="-1">' +
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
            '<div>' +
            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>home>hero-slide>click" data-cta="learn">' +
            '<span></span>' +
            '</a>' +
            '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>home>hero-slide>click" data-cta="learn" >' +
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
                                 '<picture>' +
                                  '<source class="logoImg" srcset="" media="(min-width:0)">' +
                                  '<img src="" src="" alt="">' +
                                  '</picture>' +
                                        '<strong class="c-badge f-small"><span></span></strong>' +
                                        '<h1 class="c-heading zpt"></h1>' +
                                        '<p class="c-subheading x-visible-inline-block"></p>' +
                                        '<div>' +
                                            '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                                '<span></span>' +
                                            '</a>' +
                                            '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                                '<span></span>' +
                                            '</a>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>' +
                                  '</section>'

    heroTypes["centertop"] = '<section class="m-hero-item f-x-center f-y-top context-accessory" role="tabpanel" tabindex="-1">' +
                                '<picture class="c-image">' +
                                  '<source class="heroImgDesktop" srcset="" media="(min-width:1084px)">' +
                                  '<source class="heroImgTablet" srcset="" media="(min-width:768px)">' +
                                  '<source class="heroImgMobile" srcset="" media="(min-width:0)">' +
                                  '<img srcset="" src="" alt="">' +
                            '</picture>' +
                              '<div>' +
                                  '<div class="high-contrast">' +
                                 '<picture>' +
                                  '<source class="logoImg" srcset="" media="(min-width:0)">' +
                                  '<img class="spAlt" src="" src="" alt="">' +
                                  '</picture>' +
                                      '<strong class="c-badge f-small"><span></span></strong>' +
                                      '<h1 class="c-heading zpt"></h1>' +
                                      '<p class="c-subheading x-visible-inline-block"></p>' +
                                      '<div>' +
                                          '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                              '<span></span>' +
                                          '</a>' +
                                          '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
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
                                          '<div>' +
                                              '<a href="" class="c-call-to-action c-glyph f-heavyweight cta1" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
                                                  '<span></span>' +
                                              '</a>' +
                                              '<a href="" class="c-call-to-action c-glyph cta2" data-clickname="www>xbox-one>accessories>hero-slide>click" data-cta="learn" aria-label="">' +
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
      $(".sl-hero .heroImgDesktop picture img").attr("src", regHeroContent["keyHero1imagedesktop"]).attr("srcset", regHeroContent["keyHero1imagedesktop"])
      $(".sl-hero video source").attr("src", regHeroContent["keyHero1imagedesktop"]); // for video
      $(".sl-hero picture.c-image img").attr("src", regHeroContent["keyHero1imagedesktop"])
      $(".sl-hero picture.c-image img").attr("alt", regHeroContent["keyHero1alt"])
      $(".sl-hero .logoImg").attr("srcset", regHeroContent["keyHero1logo"])
      $(".sl-hero .spAlt").attr("alt", regHeroContent["keyHero1altlogo"])
      $(".sl-hero div > div picture img").attr("src", regHeroContent["keyHero1logo"]).attr("srcset", regHeroContent["keyHero1logo"])
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
      $(".sl-hero p.c-subheading").html(regHeroContent["keyHero1subheading"])
      $(".sl-hero a.cta1").attr("href", regHeroContent["keyHero1link"])
      $(".sl-hero a.cta1 span").text(regHeroContent["keyHero1cta"])
      if (regHeroContent["keyHero1dataretailer"] !== "####") { $(".sl-hero a.cta1").attr("data-retailer", regHeroContent["keyHero1dataretailer"]) }
      $(".sl-hero a.cta1").attr("aria-label", regHeroContent["keyHero1arialabel"])
      $(".sl-hero a.cta1").attr("data-clickname", regHeroContent["keyHero1clickname"])

      $(".sl-hero a.cta2").attr("href", regHeroContent["keyHero1link2"])
      $(".sl-hero a.cta2 span").text(regHeroContent["keyHero1cta2"])
      if (regHeroContent["keyHero1dataretailer2"] !== "####") { $(".sl-hero a.cta2").attr("data-retailer", regHeroContent["keyHero1dataretailer2"]) }
      $(".sl-hero a.cta2").attr("aria-label", regHeroContent["keyHero1arialabel2"])
      $(".sl-hero a.cta2").attr("data-clickname", regHeroContent["keyHero1clickname2"])
    } else {
      var herotooltip = $("#herotooltiptext").text();
      $(".sl-hero").append('<div class="c-carousel f-multi-slide  f-auto-play" role="region" aria-label="Slideshow: Featured accessories" data-js-interval="6000">' +
                    '<div class="c-group">' +
                        '<button class="c-action-toggle high-contrast c-glyph glyph-play f-toggle" data-toggled-label="Pause" data-toggled-glyph="glyph-pause" aria-label="Play" ' +
                        'aria-describedby="heroTooltip" data-toggle="tooltip"></button>' +
                        '<div class="c-sequence-indicator" role="tablist">' +
                            '<button role="tab" aria-selected="true" aria-label="' + regHeroContent["keyHero1headline"].replace("<br>", " ") + '" title="' + 
                            regHeroContent["keyHero1headline"].replace("<br>", " ") + '"></button>' +
                            '<button role="tab" aria-selected="false" aria-label="' + regHeroContent["keyHero2headline"].replace("<br>", " ") + '" title="' + 
                            regHeroContent["keyHero2headline"].replace("<br>", " ") + '"></button>' +
                        '</div>' +
                        '<span id="heroTooltip" class="c-tooltip" role="tooltip" aria-hidden="true">Pause/Play</span>' +
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
        $(".sl-hero li").eq(i - 1).find(".logoImg").attr("srcset", regHeroContent[heroPre + "logo"])
        $(".sl-hero li").eq(i - 1).find("picture.c-image img").attr("src", regHeroContent[heroPre + "imagedesktop"]).attr("srcset", regHeroContent[heroPre + "imagedesktop"])
        $(".sl-hero li").eq(i - 1).find("div > div picture img").attr("src", regHeroContent[heroPre + "logo"]).attr("srcset", regHeroContent[heroPre + "logo"])
        $(".sl-hero li").eq(i - 1).find("video source").attr("src", regHeroContent[heroPre + "imagedesktop"]); // for video
        $(".sl-hero li").eq(i - 1).find("picture.c-image img").attr("alt", regHeroContent[heroPre + "alt"])
        $(".sl-hero li").eq(i - 1).find("div > div picture img").attr("alt", regHeroContent[heroPre + "altlogo"])
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
        $(".sl-hero li").eq(i - 1).find("p.c-subheading").html(regHeroContent[heroPre + "subheading"])
        $(".sl-hero li").eq(i - 1).find("a.cta1").attr("href", regHeroContent[heroPre + "link"])
        $(".sl-hero li").eq(i - 1).find("a.cta1 span").text(regHeroContent[heroPre + "cta"])
        if (regHeroContent[heroPre + "dataretailer"] !== "####") {
          $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-retailer", regHeroContent[heroPre + "dataretailer"])
        }
        $(".sl-hero li").eq(i - 1).find("a.cta1").attr("aria-label", regHeroContent[heroPre + "arialabel"])
        $(".sl-hero li").eq(i - 1).find("a.cta1").attr("data-clickname", regHeroContent[heroPre + "clickname"]);

        $(".sl-hero li").eq(i - 1).find("a.cta2").attr("href", regHeroContent[heroPre + "link2"])
        $(".sl-hero li").eq(i - 1).find("a.cta2 span").text(regHeroContent[heroPre + "cta2"])
        if (regHeroContent[heroPre + "dataretailer2"] !== "####") {
          $(".sl-hero li").eq(i - 1).find("a.cta2").attr("data-retailer", regHeroContent[heroPre + "dataretailer2"])
        }
        $(".sl-hero li").eq(i - 1).find("a.cta2").attr("aria-label", regHeroContent[heroPre + "arialabel2"])
        $(".sl-hero li").eq(i - 1).find("a.cta2").attr("data-clickname", regHeroContent[heroPre + "clickname2"]);
        if ($(".sl-hero li").eq(i - 1).find("p.c-subheading").text() === "####") {
          $(".sl-hero li").eq(i - 1).find("p.c-subheading").remove();
        }
        if ($(".sl-hero li").eq(i - 1).find("h1").text() === "####") {
          $(".sl-hero li").eq(i - 1).find("h1").remove();
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
    $(".sl-hero .logoImg").each(function() {
      if ($(this).attr("srcset") === "####") {
        $(this).closest("picture").remove();
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
          $(this).removeClass("f-heavyweight").addClass("customize-button").addClass("cta-btn-dark");
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
  $(".legal1").html(regionStrings["keyCopylegal1"]);
  $(".legal2").html(regionStrings["keyCopylegal2"]);
  $(".legal3").html(regionStrings["keyCopylegal3"]);

    if ($(".legal .legal1").text() === "####") {
        $('.legal').remove();
      }

    if ($(".legal .legal1").text() === "KEEPXXA") {
        $('.legal1').remove();
      }

    if ($(".legal .legal2").text() === "####") {
        $('.legal2').remove();
      }

    if ($(".legal .legal3").text() === "####") {
        $('.legal3').remove();
      }

  })();

});


