var GAMEBOXSHOT_SHOWHIDE;
(function ($) {
'use strict';

setTimeout( function() {

var _desktop = 3840,
    _tablet = 3840,
    maxHeight,
    origPos = {},
    scrollOffset = 300; // Allows collapsed CTA to be more in middle of ViewPort to show what section belongs to above it.


GAMEBOXSHOT_SHOWHIDE = function() {
  var init = function() {
    setParentHeight();
    
    $(document).on('click', '.gameDivCTA', function() {
      var $gameDiv = $(this).parents('.boxShots-gallery').find('.gameDivsWrapper').not(".ignoreSeeMore");

      if( $gameDiv.hasClass('expanded') ) {
        collapseGames( $gameDiv );
        $(window).scrollTop( $gameDiv.offset().top - scrollOffset );
      } else {
        expandGames( $gameDiv );
      }

    });
  
  };

  /*
  * Set's collapsed state if mobile else removes max height
  */
  var setParentHeight = function() {
    var $mainWrapper = $('.boxShots-gallery .gameDivsWrapper').not(".ignoreSeeMore");
    maxHeight = $(document).height();
    if( $(window).width() < _desktop ) {
      $mainWrapper.each( function() {
        /* 
        * Mobile safari triggered resize.
        * Saftey conditional to account 
        */
        if( !$(this).hasClass('expanded') ) {
          collapseGames( $(this) ); // resets to original state to show games properly
        } else {
          expandGames( $(this) ); // resets height to show all games
        }

      });
    } else {
      $mainWrapper.css('max-height', maxHeight );
      $mainWrapper.closest('.boxShots-gallery').find('.showMore').addClass('hide');
      $mainWrapper.closest('.boxShots-gallery').find('.showLess').addClass('hide');
    }
  };

 /* Collapse section */
  var collapseGames = function( el ) {
    // var $firstBoxShot = $(el).find('.gameDiv')[0],
    // firstBoxHeight = $($firstBoxShot).outerHeight(false);

    var row1top = $(el).find('.gameDiv').not(".catHide").not(".ratingHide").eq(0).offset().top;
    var row3top = 0;
    var gamesPerRow = 0

    for (var i = 0; i < 8; i++) {
      var offtop = $(el).find('.gameDiv').not(".catHide").not(".ratingHide").eq(i).offset().top;
      if (offtop > row1top) {
        gamesPerRow = i;
        break;
      }
    }
    row3top = $(el).find('.gameDiv').not(".catHide").not(".ratingHide").eq(gamesPerRow * 2).offset().top;

    var showArea = row3top - row1top;

    if( $(window).width() < _tablet ) {
      $(el).css('max-height', ( showArea ) );
    } else {
      $(el).css('max-height', ( showArea ) );
    }

    $(el).removeClass('expanded');

    $(el).closest('.boxShots-gallery').find('.showLess').addClass('hide');
    $(el).closest('.boxShots-gallery').find('.showMore').removeClass('hide');
  };

  /* Expand Section */
  var expandGames = function( el ) {
    maxHeight = $(document).height()
    $(el).css('max-height', maxHeight * 150 );
    $(el).addClass('expanded');

    $(el).closest('.boxShots-gallery').find('.showMore').addClass('hide');
    $(el).closest('.boxShots-gallery').find('.showLess').removeClass('hide');
  };

  return { 
    init: init, 
    recalculate: setParentHeight 
  };

}(jQuery);



$(document).ready(function() {
  GAMEBOXSHOT_SHOWHIDE.init();
  $(window).resize( function() {
    GAMEBOXSHOT_SHOWHIDE.recalculate();
  });
});
}, 1500)

})(jQuery);
