
function _onPageDOMContentLoaded(callback) {
    if (typeof onPageDOMContentLoaded !== "undefined") {
      return onPageDOMContentLoaded(callback);
    }
  
    var totalTime = 0;
    var interval = setInterval(function() {
      if ($("#BodyContent").length > 0) {
        clearInterval(interval);
        callback();
      } else {
        totalTime = totalTime + 200;
        if (totalTime > 10000) {
          clearInterval(interval);
        }
      }
    }, 200);
  }
  
  _onPageDOMContentLoaded(function () {
  
    if (window.innerWidth >= 1400) {
        shareHeight = $('.mosaic__box').outerHeight(false);
        $('.scroll__box').css("height", shareHeight)
    }
  
    $(window).resize(function () {
        shareHeight = $('.mosaic__box').outerHeight(false);
        $('.scroll__box').css("height", shareHeight)
    
        if (window.innerWidth >= 1400) {// only do this business on desktop. window.innerWidth aligns with how browsers measure for breakpoints
            shareHeight = $('.mosaic__box').outerHeight(false);
            $('.scroll__box').css("height", shareHeight)
        } else {
            $('.scroll__box').removeAttr("style")
        }    
  
    });
  
    // END header scroll 
  
  
    // BEGIN video controls 
    $(".buttonswap__button").click(function (e) {
        e.stopPropagation(); //if button is triggered elsewhere, this prevents the __panel from registering a click
  
        if ($(this).hasClass('glyph-play')) {
  
            //stop other .expanded videos before playing this one
            $(".triptych__panel.expanded video.playing").each(function() {
                $(this).removeClass('playing').get(0).pause();
                //$(this).closest(".m-ambient-video").find(".pause").css("display", "none");
                //$(this).closest(".m-ambient-video").find(".play").css("display", "block");
            });
    
            // ordinary play functionality
            theVideo = $(this).closest(".m-ambient-video").find("video");
            $(theVideo).addClass("playing").get(0).play(); // .get(0) is necessary in this instance
  
            //FIX THIS BIT
            $(this).removeClass("glyph-play").addClass("glyph-pause").attr({"aria-pressed" : "true"});
            $(this).find("span").text("PAUSE ANIMATION");
  
        } else if ($(this).hasClass('glyph-pause')) {
  
            e.stopPropagation(); //if button is triggered elsewhere, this prevents the __panel from registering a click
            theVideo = $(this).closest(".m-ambient-video").find("video");
            $(theVideo).removeClass("playing").get(0).pause(); // .get(0) is necessary in this instance
  
            //FIX THIS BIT
            $(this).removeClass("glyph-pause").addClass("glyph-play").attr({"aria-pressed" : "false"});
            $(this).find("span").text("PLAY ANIMATION");
        }
  
    });
  
    // END video controls 
  
  
    // BEGIN tryptich wrangling 
    
    // panels and videos are stored in arrays
  
    thePanels = $('.triptych__panel');
    theVideoBox = $('.triptych__panel .triptych__video');
    theVideos = $('.triptych__video > *:first-child');// :first-child so it gets both <video> and <iframe> elements
  
    // clearVids removes videos/iframes from the DOM to KEEP THEM QUIET and associates them with their panels.
    function clearVids(){
        $(thePanels).each(function() {
            theIndex = thePanels.index(this);
            targetVid = $(theVideos)[theIndex]; //must set this as a variable for IE
            if (!$(this).hasClass('expanded')){
                $(targetVid).remove(); //remove vids from dom if they're not already showing.
            }
        });
    }
    //clearVids(); // enable this when this page has videos in the triptychs rather than clickable images
  
    $(".triptych__thumb").blur(function(){
      $(".triptych__panel").removeClass("triptych__panel--focus");
    });
    $(".triptych__thumb").focus(function(){
      $(this).closest(".triptych__panel").addClass("triptych__panel--focus");
    });
  
    $('.triptych__panel').on("keydown", function (e) {
        (13 == e.keyCode || 32 == e.keyCode) && $(this).click()
    }),
    $('.triptych__panel').click(function () {
  
        if (!$(this).hasClass('expanded')) {
            // if the open sibling has a pause button, pause it and show the play button before it closes
            // (this is necessary: removing videos from the DOM pauses them, so we want the .play button back)
            openVid = $(this).siblings(".expanded");
  
            // this is in case we get videos we can control
            if ($(openVid).find('.pause').length){ // so we don't get an error if it's an iframe with no accessible pause button
                $("video" , openVid).get(0).pause(); // .get(0) is necessary in this instance
                $(".pause" , openVid).css("display", "none");
                $(".play" , openVid).css("display", "block");
            }
  
            $("triptych__details").attr("aria-hidden", "true");
            $(this).find(".triptych__details").attr("aria-hidden", "false");
            $(".triptych__thumb").attr("aria-expanded" , "false");
            $(this).find(".triptych__thumb").attr("aria-expanded" , "true");
            $(this).siblings().removeClass('expanded').find('.triptych__thumb').attr("tabindex" , "0");
            $(this).addClass('expanded').find('.triptych__thumb').attr("tabindex" , "-1");
  
  
            //clearVids(); // enable this when this page has videos in the triptychs rather than clickable images
  
            //this section puts the videos back when the panel expands, but we're not clearing them out so no need right now
            /*theIndex = thePanels.index(this);
            setTimeout(function(){ 
                $(theVideoBox[theIndex]).append(theVideos[theIndex]);
            }, 200);*/
            // same duration as .expanded transition 
        }
    });
    // END tryptich onclick 
  
  
  });
  
  // Game club API
  
  $(document).ready(function() {
    var gameClubURL = "https://xboxambassadors.flywheelsites.com/graphql?query={communityCampaignBy(slug:%22game-club%22){gameSection{games{isfeaturedgame,gameTitle,startDate,endDate,featuredGameVp5Vp4Vp3Vp2Vp1{sourceUrl}}}}}";
  
    $.get(gameClubURL)
      .done(function(gameClubData) {
    
        var gameClubGames = gameClubData.data.communityCampaignBy.gameSection.games;
    
        var numberOfGames = gameClubGames.length;
    
        for(var i = 0; i < numberOfGames; i++){
    
            if (gameClubGames[i].isfeaturedgame.toLowerCase() == "true") {
    
                var start = Date.parse(gameClubGames[i].startDate);
                var startDateObject = new Date(start);
                var startDay = startDateObject.getDate();
                var startMonth = startDateObject.getMonth() + 1;// months are 0-11
                formattedStart = startMonth + "/" + startDay;
    
                var end = Date.parse(gameClubGames[i].endDate);
                var endDateObject = new Date(end);
                var endDay = endDateObject.getDate();
                var endMonth = endDateObject.getMonth() + 1;// months are 0-11
                formattedEnd = endMonth + "/" + endDay;
   
                $(".game-club .m-feature img").attr("src", gameClubGames[i].featuredGameVp5Vp4Vp3Vp2Vp1.sourceUrl);
                $(".game-club .m-feature picture source").attr("srcset", gameClubGames[i].featuredGameVp5Vp4Vp3Vp2Vp1.sourceUrl);
                $(".game-club .m-feature img").attr("alt", "Image from " + gameClubGames[i].gameTitle);
                $(".game-club .m-feature h3").text(gameClubGames[i].gameTitle);
                $(".game-club .m-feature .start-date").text(formattedStart);
                $(".game-club .m-feature .end-date").text(formattedEnd);
                $(".game-club").attr("style" , "display: block");
    
            }
        };
    
      })
      .fail(function() {
          //$(".game-club").hide();
          return false;
      });

console.log($('.high-contrast-test').css('color'));
  });