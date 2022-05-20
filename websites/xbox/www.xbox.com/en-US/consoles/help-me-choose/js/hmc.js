$(document).ready(function() {
  // Legal
   var HMC = (function() {
  // Anchor Links
  // setTimeout(function() {
  //     var docurl = document.URL.toLowerCase();
  //     if (docurl.indexOf("caret") > -1) {
  //         var topofshop = $("#caret").offset().top;
  //         $("HTML, BODY").animate({
  //           scrollTop: topofcaret
  //         }, 300);
  //     }
  // }, 1500)
    var aaRegions = "en-us, en-au, en-ca, en-nz, en-gb, fr-fr";
    setTimeout(function() {
     scrolltotop();
    }, 750)
    var urlRegion = document.URL.split("/")[3].toLowerCase();
    // dev area
    $(".showxsx").click(function() {
     $(".questions").hide();
     $(".recs").show();
     $(".xss").remove();
     $(".xsx").removeClass("hidden");
     $(".metext").removeClass("hidden");
     purchSetup();
    })
    $(".showxss").click(function() {
     $(".questions").hide();
     $(".recs").show();
     $(".xsx").remove();
     $(".xss").removeClass("hidden");
     $(".metext").removeClass("hidden");
     purchSetup();
    })
    $(".showanim").click(function() {
     $(".questions").hide();
     $(".metext").removeClass("hidden");
     $(".gifttext").addClass("hidden");
     $(".calculating").show();
      var q1response = "forme";
      var q2response = [];
      var q3response = "a";
      var q4response = "a";
      var q5response = [];
      var q6response = "a";
      var q7response = "a";
     calculate();
    })
    //////////////////////
    // high contrast accessibility
    $(".question .c-select-button").addClass("high-contrast");
    $(".welcomearea").fadeIn(1200);
    var changedelay = 800;
    var q1response = "";
    var q2response = [];
    var q3response = "";
    var q4response = "";
    var q5response = [];
    var q6response = "";
    var q7response = "";
    var score_x = 0;
    var score_s = 0;
    var score_hvg = 0;
    var score_ntc = 0;
  
    highestq = 0;
  
    $(".qoption").attr("aria-pressed", "false").attr("aria-live", "assertive")//.attr("role", "alert");
    $(".qoption").closest("div").each(function() {
      var ariatomove = $(this).attr("aria-label");
      $(this).removeAttr("role");
      $(this).find(".qoption").attr("aria-label", ariatomove).attr("role", "button");
    })
  
    function scrolltotop() {
     var winwidth = $(window).width();  
     if (winwidth > 199) { // was 1299
      if ($(window).scrollTop() > 0) {
         $("HTML, BODY").animate({
             scrollTop: 0
         }, 500);
      }
     }
    }
  
    function continuecheck() {
      var newqnum = parseInt($(".qfooterarea").attr("data-currentq"));
      if ($("#question" + newqnum + " [aria-pressed='true']").length > 0) {
        $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
      } else {
        $(".qcontinue").addClass("f-disabled").attr("aria-disabled", "true").attr("tabindex", "-1");
      }
    }
  
    function animatein(question) {
      $(".qfooterarea").attr("data-currentq", parseInt(question[9]));
      continuecheck();
     $(".bouncedfast").removeClass("bouncedfast");
     setTimeout(function() {
      $(question).find(".textbounce.bounced").removeClass("bounced");
     }, 50);
     setTimeout(function() {
      $(question).find(".buttonbounce.bounced").removeClass("bounced");
      $(question).find(".imgbounce.bounced").removeClass("bounced");
      $(".qfooterarea").removeClass("bounced");
     }, 250);
     var newq = "#question" + parseInt(question[9]);
      // setTimeout(function() {
        $(newq).find(".qprognumber").focus();
      // }, 550)
    }
    function animateout(question) {
     setTimeout(function() {
      $(question).find(".textbounce").addClass("bouncedfast").addClass("bounced");
     }, 50);
     setTimeout(function() {
      $(question).find(".buttonbounce").addClass("bouncedfast").addClass("bounced");
      $(question).find(".imgbounce").addClass("bouncedfast").addClass("bounced");
     }, 150);
    }
  
    // $(document).on("click", "[data-currentq=1] .qbackbutton", function(e) {
    // })
  
    $(".startquestions").on("click", function(e) {
     e.preventDefault()
     // $("#headerArea").hide();
     var btttop = $(".welcomearea").offset().top;
       $("HTML, BODY").animate({
           scrollTop: btttop
       }, 500);
      $(".welcomearea").fadeOut(700, function() {
        $("#question1").show();
        $(".qfooterarea").show();
        animatein("#question1");
      });
     setTimeout(function() {
      $(".proghider").removeClass("phbegin");
     }, 1250)
    })
    $(".progressarea a").on("click", function(e) {
     e.preventDefault();
     var thisq = $(this).closest(".question").attr("id");
     var target = $(this).data("target");
     scrolltotop();
     animateout("#" + thisq);
     setTimeout(function() {
      $("#" + thisq).hide();
      $("#" + target).show();
      animatein("#" + target);
     }, changedelay);
    })
  
    $(".qbackbutton").on("click", function(e) {
      e.preventDefault();
      var thisq = $(".qfooterarea").attr("data-currentq");
      var target = parseInt(thisq) - 1;
      if (target === 0) {
        e.preventDefault();
        $(".question").hide();
        $(".qfooterarea").hide();
        //$(".qfooterarea").addClass("bounced");
        $(".welcomearea").fadeIn(700);
        var toout = $(".qfooterarea").attr("data-currentq");
        animateout("#question" + toout)
        // $("#headerArea").show();
        setTimeout(function() {
          $(".qfooterarea").addClass("bounced");
          $(".startquestions").focus();
        }, 1200);
        target = 1
      } else {
        scrolltotop();
        animateout("#question" + thisq);
        setTimeout(function() {
          $("#question" + thisq).hide();
          $("#question" + target.toString()).show();
          animatein("#question" + target.toString());
        }, changedelay);
      }
    })
  
    $(".qcontinue").on("click", function(e) {
      e.preventDefault();
      var thisq = $(".qfooterarea").attr("data-currentq");
      var thisqnum = parseInt(thisq);
      if (thisqnum === 1) {
        q1response = "";
        $("#question1 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q1response = ans;
        })
        if (q1response === "forme") {
          $(".gifttext").addClass("hidden");
          $(".metext").removeClass("hidden");
         } else {
          $(".metext").addClass("hidden");
          $(".gifttext").removeClass("hidden");
         }
        scrolltotop();
        animateout("#question1");
        setTimeout(function() {
          $("#question1").hide();
          $("#question2").show();
          animatein("#question2");
        }, changedelay);
      } else if (thisqnum === 2) {
        q2response = [];
        $("#question2 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q2response.push(ans);
        })
        scrolltotop();
        animateout("#question2");
        setTimeout(function() {
          $("#question2").hide();
          $("#question3").show();
          animatein("#question3");
        }, changedelay);
      } else if (thisqnum === 3) {
        q3response = "";
        $("#question3 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q3response = ans;
        })
        scrolltotop();
        animateout("#question3");
        setTimeout(function() {
          $("#question3").hide();
          $("#question4").show();
          animatein("#question4");
        }, changedelay);
      } else if (thisqnum === 4) {
        q4response = "";
        $("#question4 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q4response = ans;
        })  
        scrolltotop();
        animateout("#question4");
        setTimeout(function() {
          $("#question4").hide();
          $("#question5").show();
          animatein("#question5");
        }, changedelay);
      } else if (thisqnum === 5) {
        q5response = [];
        $("#question5 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q5response.push(ans);
        })
       scrolltotop();
       animateout("#question5");
       setTimeout(function() {
        $("#question5").hide();
        $("#question6").show();
        animatein("#question6");
       }, changedelay);
      } else if (thisqnum === 6) {
        q6response = "";
        $("#question6 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q6response = ans;
        })  
        scrolltotop();
        animateout("#question6");
        if (aaRegions.indexOf(urlRegion) !== -1) {
          setTimeout(function() {
            $("#question6").hide();
            $("#question7").show();
            animatein("#question7");
          }, changedelay);
        } else {
          setTimeout(function() {
          $(".questions").fadeOut(700, function() {
            $(".calculating").show();
            calculate();
          });
          }, changedelay);
        }
        
      } else if (thisqnum === 7) {
        q7response = "";
        $("#question7 button[aria-pressed='true']").each(function() {
          var ans = $(this).data("answer");
          q7response = ans;
        })  
        scrolltotop();
        animateout("#question7");
        setTimeout(function() {
          $(".questions").fadeOut(700, function() {
            $(".calculating").show();
            setTimeout(function() {
              $(".bbptLarge h2").focus();
              console.log("tha man")
            }, 4000);

            calculate();
          });
         }, changedelay);
  
  
        // setTimeout(function() {
        //   $("#question7").hide();
        //   $("#question8").show();
        //   animatein("#question8");
        // }, changedelay);
      // } else if (thisqnum === 8) {
      //   q8response = "";
      //   $("#question8 .qoption.optionSelected").each(function() {
      //     var ans = $(this).data("answer");
      //     q8response = ans;
      //   })
      //   scrolltotop();
      //   animateout("#question8");
      //   setTimeout(function() {
      //     $("#question8").hide();
      //     $("#question9").show();
      //     animatein("#question9");
      //   }, changedelay);
      // } else if (thisqnum === 9) {
      //   e.preventDefault();
      //   scrolltotop();
      //   animateout("#question9");
      //   setTimeout(function() {
      //     $(".questions").hide();
      //     $(".calculating").show();
      //     calculate();
      //   }, changedelay);
      } else {
        var nextq = thisqnum + 1;
        scrolltotop();
        animateout("#question" + thisq);
        setTimeout(function() {
          $("#question" + thisq).hide();
          $("#question" + nextq.toString()).show();
          animatein("#question" + nextq.toString());
        }, changedelay);
      }
    })
  
    $(".question .buttons-singleselect button").click(function() {
      $(this).closest(".buttons-singleselect").find("button").attr("aria-pressed", "false");
      $(this).attr("aria-pressed", "true");
    })
    $(".question .buttons-checkboxes button").click(function() {
      $(this).closest(".buttons-checkboxes").find("button").attr("aria-pressed", "false");
      $(this).attr("aria-pressed", "true");
    })
    // $(".question .buttons-multiselect button").click(function() {
    //   $(this).closest(".buttons-singleselect").find("button").attr("aria-pressed", "false");
    //   $(this).attr("aria-pressed", "true");
    // })
  
    $("#question1 .qoption").on("click", function(e) {
      setTimeout(function() {
       if ($("#question1 [aria-pressed='true']").length > 0) {
        $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
       } 
     }, 150)
    })
  
    $("#question2 .qoption").on("click", function(e) {
      setTimeout(function() {
        if ($("#question2 [aria-pressed='true']").length > 0) {
          $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
        } else {
          $(".qcontinue").addClass("f-disabled").attr("aria-disabled", "true").attr("tabindex", "-1");
        }
      }, 50)
    })
  
    $("#question3 .qoption").on("click", function(e) {
      setTimeout(function() {
       if ($("#question3 [aria-pressed='true']").length > 0) {
        $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
       } 
      }, 150)
    })
  
    $("#question4 .qoption").on("click", function(e) {
      setTimeout(function() {
       if ($("#question4 [aria-pressed='true']").length > 0) {
        $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
       } 
      }, 150)
    })
  
    $("#question5 .qoption").on("click", function(e) {
      setTimeout(function() {
        if ($("#question5 [aria-pressed='true']").length > 0) {
          $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
        } else {
          $(".qcontinue").addClass("f-disabled").attr("aria-disabled", "true").attr("tabindex", "-1");
        }
      }, 50)
    })
  
    $("#question6 .qoption").on("mousedown", function(e) {
      setTimeout(function() {
       if ($("#question6 [aria-pressed='true']").length > 0) {
        $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
       } 
      }, 150)
    })
  
    $("#question7 .qoption").on("mousedown", function(e) {
      setTimeout(function() {
       if ($("#question7 [aria-pressed='true']").length > 0) {
        $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
       }
      }, 150) 
    })
  
    // $("#question7 .qcontinue").on("click", function(e) {
    //  e.preventDefault();
    //  scrolltotop();
    //  animateout("#question7");
    //  setTimeout(function() {
    //   $(".questions").fadeOut(700, function() {
    //     $(".calculating").show();
    //     calculate();
    //   });
    //  }, changedelay);
    // })
  
    // $("#question8 .qoption").on("mousedown", function(e) {
    //  e.preventDefault();
    //  if ($("#question8 .optionSelected").length === 0) {
    //   $(this).addClass("optionSelected").attr("aria-pressed", "true");
    //   $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
    //  } else {
    //   $("#question8 .qoption").removeClass("optionSelected").attr("aria-pressed", "false");
    //   $(this).addClass("optionSelected").attr("aria-pressed", "true").attr("aria-pressed", "true");
    //   $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
    //  };
    // })
  
    // $("#question9 .qoption").on("mousedown", function(e) {
    //  e.preventDefault();
    //  if ($(this).hasClass("optionSelected")) {
    //   $(this).removeClass("optionSelected").attr("aria-pressed", "false");
    //   q9response = "";
    //  } else {
    //   $("#question9 .qoption").removeClass("optionSelected").attr("aria-pressed", "false");
    //   $(this).addClass("optionSelected").attr("aria-pressed", "true");
    //   q9response = $("#question9 .optionSelected").data("answer");
    //  }
    //  if ($("#question9 .optionSelected").length > 0) {
    //   $(".qcontinue").removeClass("f-disabled").attr("aria-disabled", "false").attr("tabindex", "0");
    //  } else {
    //   $(".qcontinue").addClass("f-disabled").attr("aria-disabled", "true").attr("tabindex", "-1");
    //  }
    // })
    // $("#question9 .skipfinish").on("click", function(e) {
    //  e.preventDefault();
    //  q9response = "";
    //  scrolltotop();
    //  animateout("#question9");
    //  setTimeout(function() {
    //   $(".questions").fadeOut(700, function() {
    //     $(".calculating").show();
    //     calculate();
    //   });
    //  }, changedelay);
    // })
    // $("#question9 .finish").on("click", function(e) {
     
    // })
  
    // $(".qstartover").on("click", function(e) {
    //   e.preventDefault();
    //   q1response = "";
    //   q2response = [];
    //   q3response = "";
    //   q4response = "";
    //   q5response = [];
    //   q6response = "";
    //   q7response = "";
    //   q8response = "";
    //   q9response = "";
    //   highestq = 0;
    //   $(".optionSelected").removeClass("optionSelected");
    //   $(".qoption").attr("aria-pressed", "false");
    //   var thisq = $(".qfooterarea").attr("data-currentq");
    //   var hideq = "#question" + thisq;
    //   scrolltotop();
    //   animateout(hideq);
    //   setTimeout(function() {
    //     $(".qfooterarea").addClass("bounced");
    //   }, 100);
    //   setTimeout(function() {
    //     $(hideq).hide();
    //     $(".welcomearea").fadeIn(700);
    //     // $("#headerArea").show();
    //     target = 1
    //   }, changedelay);
    // })
  
    $(".qoption").on("keydown", function(event) {
      if((event.keyCode == 13) || (event.keyCode== 32)){
        // event.preventDefault();
        $(this).trigger("mousedown");
      }
    });
  
    // dev area #2 //////////
    if (document.URL.toLowerCase().indexOf("preview") !== -1) { // only in preview
      var keyh = 0;
      var keym = 0;
      var keyc = 0;
      var keyx = 0;
      $(document).on("keydown", function(e) {
        if (e.which == 72) {
          if (keyh === 0) {keyh++}
        } else if (e.which == 77) {
          if (keym === 0) {keym++}
        } else if (e.which == 67) {
          if (keyc === 0) {keyc++}
        } else if (e.which == 88) {
          if (keyx === 0) {keyx++}
        }
  
        if (keyh + keym + keyc + keyx === 4) {
          console.log("Opening QA tool");
          qabegin();
        }
      })
      $(document).on("keyup", function(e) {
        if (e.which == 72) {
          if (keyh === 1) {keyh--}
        } else if (e.which == 77) {
          if (keym === 1) {keym--}
        } else if (e.which == 67) {
          if (keyc === 1) {keyc--}
        } else if (e.which == 88) {
          if (keyx === 1) {keyx--}
        }
      })
      function qabegin() {
        $("body").append('<div class="qatool" style="position:fixed; display: block; left: 0; right: 0; margin: 0 auto; top: 150px; text-align: center;' + 
          'z-index: 5; background-color: #eeeeee; width: 70%; padding: 12px; border: 2px darkblue solid">' +
            '<h2>QA Quick Picks</h2>' +
            '<p style="color: brown;">Instructions: In the text box below, enter the question numbers and responses as indicated by the summary below. Press "Submit" to load results screen.<p><br>' +
            '<p>Question 1: A - for me ::: B - gift</p>' +
            '<p>Question 2: A - kids ::: B - teens ::: C - adults (MULTI)</p>' +
            '<p>Question 3: A - want it all ::: B - best value ::: C - don\'t know</p>' +
            '<p>Question 4: A - physical ::: B - digital ::: C - either</p>' +
            '<p>Question 5: A - action & adventure ::: B - family & kids ::: C - fighting ::: D - racing & flying ::: E - roleplaying ::: F - shooter ::: G - sports ::: H - strategy ::: S - skip (MULTI)</p>' +
            '<p>Question 6: A - couple games ::: B - handful of games ::: C - ton of games ::: D - don\'t know</p>' +
            '<p>Question 7: A - yes xaa ::: B - no xaa ::: C - don\'t know</p><br><br>' +
            '<textarea class="qaenter" style="display: inline-block; margin-left: 8px; width:280px; height: 26px;"></textarea><br><br>' +
            '<button class="qaenterbutton">Submit</button>' +
          '</div>'
          )
        $(".qaenter").val("1A-2A-3A-4A-5A-6A-7A");
        $(".qaenterbutton").click(function() {
          qaentered();
        })
      }
      function qaentered() {
        var qaentryraw = $(".qaenter").val().toLowerCase();
        var qaentry = qaentryraw.split("-");
        qaentry.forEach(function(ent) {
          var entryraw = ent.trim();
          var thenumber = parseInt(entryraw);
          if (thenumber === 1) {
            entryraw = entryraw.replace("1", "");
            if (entryraw.indexOf("a") !== -1) {
              q1response = "forme";
            } else {
              q1response = "gift";
            }
          }
          if (thenumber === 2) {
            entryraw = entryraw.replace("2", "");
            if (entryraw.indexOf("a") !== -1) {
              q2response.push("kids");
            } 
            if (entryraw.indexOf("b") !== -1) {
              q2response.push("teens");
            } 
            if (entryraw.indexOf("c") !== -1) {
              q2response.push("adults");
            }
          }
          if (thenumber === 3) {
            entryraw = entryraw.replace("3", "");
            if (entryraw.indexOf("a") !== -1) {
              q3response = "wantitall";
            } else if (entryraw.indexOf("b") !== -1) {
              q3response = "bestvalue";
            } else {
              q3response = "dontknowvalue";
            }
          }
          if (thenumber === 4) {
            entryraw = entryraw.replace("4", "");
            if (entryraw.indexOf("a") !== -1) {
              q4response = "physical";
            } else if (entryraw.indexOf("b") !== -1) {
              q4response = "digital";
            } else {
              q4response = "either";
            }
          }
          if (thenumber === 5) {
            entryraw = entryraw.replace("5", "");
            if (entryraw.indexOf("s") === -1) {
              if (entryraw.indexOf("a") !== -1) {
                q5response.push("actionadventure");
              } 
              if (entryraw.indexOf("b") !== -1) {
                q5response.push("familykids");
              } 
              if (entryraw.indexOf("c") !== -1) {
                q5response.push("fighting");
              }
              if (entryraw.indexOf("d") !== -1) {
                q5response.push("racingflying");
              } 
              if (entryraw.indexOf("e") !== -1) {
                q5response.push("roleplaying");
              } 
              if (entryraw.indexOf("f") !== -1) {
                q5response.push("shooter");
              }
              if (entryraw.indexOf("g") !== -1) {
                q5response.push("sports");
              } 
              if (entryraw.indexOf("h") !== -1) {
                q5response.push("strategy");
              }
            }
          }
          if (thenumber === 6) {
            entryraw = entryraw.replace("6", "");
            if (entryraw.indexOf("a") !== -1) {
              q6response = "couple";
            } else if (entryraw.indexOf("b") !== -1) {
              q6response = "handful";
            } else if (entryraw.indexOf("c") !== -1) {
              q6response = "ton";
            } else {
              q6response = "notsure";
            }
          }
          if (thenumber === 7) {
            entryraw = entryraw.replace("7", "");
            if (entryraw.indexOf("a") !== -1) {
              q7response = "yesaa";
            } else if (entryraw.indexOf("b") !== -1) {
              q7response = "noaa";
            } else {
              q7response = "dontknowaa";
            }
          }
        })
        if (q1response === "forme") {
          $(".gifttext").addClass("hidden");
          $(".metext").removeClass("hidden");
        } else {
          $(".metext").addClass("hidden");
          $(".gifttext").removeClass("hidden");
        }
        console.log("q1response:" + q1response);
        console.log("q2response:" + q2response);
        console.log("q3response:" + q3response);
        console.log("q4response:" + q4response);
        console.log("q5response:" + q5response);
        console.log("q6response:" + q6response);
        console.log("q7response:" + q7response);
  
        calculate("qa");
        $(".questions").hide();
        $(".qatool").remove();
      }
    }
    /////////////////////////
  
    var attributes_x = [];
    var attributes_s = [];
    var showxaa = false;
    function calculate(mode) {
     // calculate scores question by question
     if (q3response === "wantitall") {
      score_x += 50;
      attributes_x.push("mostpowerful");
     } else if (q3response === "bestvalue") {
      score_s += 3;
      attributes_s.push("upgrading");
     }
     if (q4response === "physical") {
      score_x += 50;
      attributes_x.push("discdrive");
     } else if (q4response === "digital") {
      score_s += 3;
      attributes_s.push("alldigital");
     }
     if (q6response === "couple" || q6response === "notsure") {
      score_s += 1;
     } else if (q6response === "ton") {
      score_x += 3;
      attributes_x.push("1tb");
     }
     if (q7response === "yesaa") {
      score_x += 2;
      showxaa = true;
     } else if (q7response === "noaa") {
      score_s += 1;
     }
  
     // populating consoles
     var xors = "xsx";
     if (score_s > score_x) {
      xors = "xss";
     }
     console.log("score_s: " + score_s + " score_x: " + score_x);
     // if (score_m > 1) {
     //  xors = "x1m";
     // }
  
     // if (xors !== "x1m") {
     //   if (q3response.length === 0 || q3response.indexOf("kids") !== -1) {
     //    var ratingsort = "all";
     //   } else {
     //    var ratingsort = "teen";
     //   }
     //   regConsoles = [];
     //   var starterConsole = {};
     //   var regConsolesRaw = allConsoles.locales[urlRegion];
     //   for (var i = 0; i < regConsolesRaw.length; i++) {
     //    if (regConsolesRaw[i].hmc.toLowerCase() === "true" && regConsolesRaw[i].product.toLowerCase().indexOf(xors) !== -1) {
     //     regConsoles.push(regConsolesRaw[i]);
     //    } else if (regConsolesRaw[i].hmc.toLowerCase() === "starter" && regConsolesRaw[i].product.toLowerCase().indexOf(xors) !== -1) {
     //     starterConsole = regConsolesRaw[i];
     //    }
     //   }
       
     //   var storageans = "low";
     //   if (q9response === "6-10" || q9response === "eleven") {
     //    storageans = "high";
     //   }
     //   var sortedConsoles = regConsoles.sort(function(a,b) {
     //    var agenrematch = 0;
     //    var bgenrematch = 0;
     //    for (var i = 0; i < q5response.length; i ++) {
     //     if (a.genres.toLowerCase().indexOf(q5response[i]) !== -1) {
     //      agenrematch = 1;
     //     }
     //     if (b.genres.toLowerCase().indexOf(q5response[i]) !== -1) {
     //      bgenrematch = 1;
     //     }
     //    }
     //    var astoragematch = 0;
     //    var bstoragematch = 0;
     //    if (storageans === "low" && a.storage.toLowerCase() === "500gb") {
     //     astoragematch = 1;
     //    }
     //    if (storageans === "high" && a.storage.toLowerCase() !== "500gb") {
     //     astoragematch = 1;
     //    }
     //    if (storageans === "low" && b.storage.toLowerCase() === "500gb") {
     //     bstoragematch = 1;
     //    }
     //    if (storageans === "high" && b.storage.toLowerCase() !== "500gb") {
     //     bstoragematch = 1;
     //    }
     //    if (ratingsort === "teen") {
     //     return bgenrematch - agenrematch || bstoragematch - astoragematch || parseInt(a.position) - parseInt(b.position)
     //    } else {
     //     return b.rating.toLowerCase().indexOf(ratingsort) - a.rating.toLowerCase().indexOf(ratingsort) || bgenrematch - agenrematch || bstoragematch - astoragematch || parseInt(a.position) - parseInt(b.position)
     //    }
        
     //   })
  
     //    var nostarterlocales = "en-gb,en-us";
     //   if (q2response === "firstconsole" && nostarterlocales.indexOf(urlRegion) === -1) {
     //    sortedConsoles.unshift(starterConsole);
     //   }
  
     //   var bundlenum = 3;
     //   if (sortedConsoles.length < 3) {
     //    bundlenum = sortedConsoles.length;
     //   }
     //   var giftpost = "-me";
     //   if (q1response !== "forme") {
     //    giftpost = "-gift";
     //   }
     //   for (var i = 0; i < bundlenum; i++) {
     //    if (sortedConsoles[i].tprPriceText === "####") {
     //     var theprice = '<span itemprop="price">' + sortedConsoles[i].priceText + '</span>';
     //    } else {
     //     var theprice = '<span itemprop="price" style="text-decoration: line-through;">' + sortedConsoles[i].priceText + 
     //                    '</span><span itemprop="price" style="margin-left: 8px;">' + sortedConsoles[i].tprPriceText + '</span>';
     //    }
  
     //    var thebadge = "";
     //    console.log(sortedConsoles[i])
     //    if (sortedConsoles[i].genres.length > 0) {
     //     for (var j = 0; j < q5response.length; j++) {
     //      if (sortedConsoles[i].genres.indexOf(q5response[j]) !== -1) {
     //       var thebadge = $(".phrases [data-because='" + q5response[j] + giftpost + "']").text();
     //      }
     //     }
     //    }
     //    if (i === 0 && q2response === "firstconsole") {
     //     var thebadge = $(".phrases [data-because='new" + giftpost + "']").text();
     //    }
        
     //    $(".thebundles").append('<div data-grid="col-4 pad-6x"><div data-grid="col-12">' +
     //                 '<section class="m-content-placement-item f-size-medium">' +
     //                   '<a href="' + sortedConsoles[i].detailsURL + '" target="_blank" aria-label="learn more about ' + sortedConsoles[i].headline + '">' +
     //                     '<picture>' +
     //                         //<source srcset="http://placehold.it/491x276" media="(min-width:0)">
     //                         '<img srcset="' + sortedConsoles[i].image + '" src="' + sortedConsoles[i].image + '" alt="' + sortedConsoles[i].headline + '">' +
     //                     '</picture>' +
     //                     '</a>' +
     //                     '<div>' +
     //                         '<p class="c-paragraph-3" style="font-weight: 600;">' + thebadge + '</p>' +
     //                         '<h3 class="c-heading">' + sortedConsoles[i].headline + '</h3>' +
     //                         '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
     //                      theprice +
     //                   '</div>' +
     //                         '<a href="' + sortedConsoles[i].detailsURL + '" target="_blank" class="c-call-to-action c-glyph" aria-label="learn more about ' + sortedConsoles[i].headline + '">' +
     //                             '<span>' + sortedConsoles[i].detailsCTA + '</span>' +
     //                         '</a>' +
     //                     '</div></section></div></div>')
     //   }
  
     // }
  
     // remove the badge if not all 3 have them
     // $(".thebundles .c-paragraph-3").each(function() {
     //  if ($(this).text() === "") {
     //   $(".thebundles .c-paragraph-3").remove();
     //   return false;
     //  }
     // })
     // fill in x1s, x1x blurb
     var attstoshow = [];
     var mainblurb = "";
     console.log("xors: " + xors);
     if (xors === "xsx") {
      attstoshow = attributes_x;
      if (q1response === "forme") {
        if (attstoshow.length > 0) {
          mainblurb = $(".phrases [data-blurb='xsx-me']").text();
        } else {
          mainblurb = $(".phrases [data-blurb='xsx-me-noatt']").text();
        }
      } else {
        if (attstoshow.length > 0) {
          mainblurb = $(".phrases [data-blurb='xsx-gift']").text();
        } else {
          mainblurb = $(".phrases [data-blurb='xsx-gift-noatt']").text();
        }
      }
     } else {
      attstoshow = attributes_s;
      if (q1response === "forme") {
        if (attstoshow.length > 0) {
          mainblurb = $(".phrases [data-blurb='xss-me']").text();
        } else {
          mainblurb = $(".phrases [data-blurb='xss-me-noatt']").text();
        }
      } else {
        if (attstoshow.length > 0) {
          mainblurb = $(".phrases [data-blurb='xss-gift']").text();
        } else {
          mainblurb = $(".phrases [data-blurb='xss-gift-noatt']").text();
        }
      }
     }
  
     var numphrase = "";
     if (attstoshow.length > 2) {
      numphrase = $(".phrases [data-attributes='threeattributes']").text().replace("--PLACEHOLDER1--", $("[data-attribute='" + attstoshow[0] + "']").text())
                                                                 .replace("--PLACEHOLDER2--", $("[data-attribute='" + attstoshow[1] + "']").text())
                                                                 .replace("--PLACEHOLDER3--", $("[data-attribute='" + attstoshow[2] + "']").text());
     } else if (attstoshow.length === 2) {
      numphrase = $(".phrases [data-attributes='twoattributes']").text().replace("--PLACEHOLDER1--", $("[data-attribute='" + attstoshow[0] + "']").text())
                                                                 .replace("--PLACEHOLDER2--", $("[data-attribute='" + attstoshow[1] + "']").text());
     } else if (attstoshow.length === 1) {
      numphrase = $(".phrases [data-attributes='oneattribute']").text().replace("--PLACEHOLDER1--", $("[data-attribute='" + attstoshow[0] + "']").text());
     }
     else if (attstoshow.length === 0) {
      numphrase = $(".phrases [data-attributes='oneattribute']").text().replace("--PLACEHOLDER1--", $("[data-attribute='" + attstoshow[0] + "']").text());
     }
     mainblurb = mainblurb.replace("--PLACEHOLDER1--", numphrase);
  
     if (showxaa === false) {
      mainblurb = mainblurb.replace("--PLACEHOLDER2--", "");
     } else {
      if (xors === "xsx") {
        var xaatext = $(".phrases [data-attribute='xsx-xaa']").html();
      } else {
        var xaatext = $(".phrases [data-attribute='xss-xaa']").html();
      }
      mainblurb = mainblurb.replace("--PLACEHOLDER2--", xaatext);
     }
     $(".dynamicText").html(mainblurb);
     console.log(mainblurb)
  
  
     // var genresloc = {};
     // $(".phrases [data-genretype]").each(function() {
     //  genresloc[$(this).attr("data-genretype")] = $(this).text();
     // })
     // var genrephrase = "";
     // if (q5response.length > 2) {
     //  var genrephrase = $(".phrases [data-genres='threegenres']").text().replace("--PLACEHOLDER1--", genresloc[q5response[0]])
     //                                                             .replace("--PLACEHOLDER2--", genresloc[q5response[1]])
     //                                                             .replace("--PLACEHOLDER3--", genresloc[q5response[2]]);
     // } else if (q5response.length === 2) {
     //  var genrephrase = $(".phrases [data-genres='twogenres']").text().replace("--PLACEHOLDER1--", genresloc[q5response[0]])
     //                                                           .replace("--PLACEHOLDER2--", genresloc[q5response[1]]);
     // } else if (q5response.length === 1) {
     //  var genrephrase = $(".phrases [data-genres='onegenre']").text().replace("--PLACEHOLDER1--", genresloc[q5response[0]]);
     // }
  
     // var storagestring = sortedConsoles[0].storage;
     // $(".x1ssum .storagesum").each(function() {
     //  var storagesentence = $(this).text().replace("--STORAGE-- ", storagestring + " ");
     //  $(this).text(storagesentence);
     // })
     
  
     // if (q5response.length > 0) {
     //  var rangenre = q5response[Math.floor(Math.random() * q5response.length)];
     //  var genstring = $("[data-answer='" + rangenre + "']").find(".metext").text().toLowerCase();
     // } else {
     //  var genstring = "";
     // }
  
     // if (storageans === "high") {
     //  $(".metext.x1ssum").text($('.phrases [data-blurb="lots-x1s-me"]').text().replace("--GENRES--", genrephrase + " "));
     //  $(".gifttext.x1ssum").text($('.phrases [data-blurb="lots-x1s-gift"]').text().replace("--GENRES--", genrephrase + " "));
     //  $(".metext.x1xsum").text($('.phrases [data-blurb="lots-x1x-me"]').text().replace("--GENRES--", genrephrase + " "));
     //  $(".gifttext.x1xsum").text($('.phrases [data-blurb="lots-x1x-gift"]').text().replace("--GENRES--", genrephrase + " "));
     // } else if (storageans === "low") {
     //  $(".metext.x1ssum").text($('.phrases [data-blurb="few-x1s-me"]').text().replace("--GENRES--", genrephrase + " "));
     //  $(".gifttext.x1ssum").text($('.phrases [data-blurb="few-x1s-gift"]').text().replace("--GENRES--", genrephrase + " "));
     //  $(".metext.x1xsum").text($('.phrases [data-blurb="few-x1x-me"]').text().replace("--GENRES--", genrephrase + " "));
     //  $(".gifttext.x1xsum").text($('.phrases [data-blurb="few-x1x-gift"]').text().replace("--GENRES--", genrephrase + " "));
     // }
  
     // $(".metext.x1msum").text($('.phrases [data-blurb="lots-x1m-me"]').text().replace("--GENRES--", genrephrase + " "));
     // $(".gifttext.x1msum").text($('.phrases [data-blurb="lots-x1m-gift"]').text().replace("--GENRES--", genrephrase + " "));
     // $(".genresum").each(function() {
     //  var genresentence = $(this).text().replace("--GENRES-- ", genstring + " ");
     //  $(this).text(genresentence);
     // })
  
     //populating accessories
     // allAccessories.locales[urlRegion].forEach(function(c) {
     //  c.hmc.forEach(function(h) {
     //   var xdlclass = "";
     //   if (c.product === "Xbox Design Lab") {
     //    xdlclass = " customize-button cta-btn-dark";
     //   }
     //   var accbigid = "";
     //   if (c.productId.length > 5) { accbigid = 'data-accbigid="' + c.productId.split("/")[0].toUpperCase() + '"' }
     //   if (h.toLowerCase().indexOf("me-") !== -1 || h.toLowerCase().indexOf("gift-") !== -1) {
     //    $("." + h.toLowerCase()).append('<div data-grid="col-12">' +
     //               '<section class="m-content-placement-item f-size-medium" ' + accbigid + '>' +
     //                 '<a href="' + c.detailsURL + '" target="_blank" aria-label="learn more about ' + c.headline + '">' +
     //                 '<picture>' +
     //                       //<source srcset="http://placehold.it/491x276" media="(min-width:0)">
     //                       '<img srcset="' + c.image + '" src="' + c.image + '" alt="box and console shot of ' + c.headline + '">' +
     //                   '</picture>' +
     //                   '</a>' +
     //                   '<div>' +
     //                       '<h3 class="c-heading">' + c.headline + '</h3>' +
     //                 //       '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
     //                 //    '<span itemprop="price">' + c.priceText + '</span>' +
     //                 // '</div>' +
     //                       '<a href="' + c.detailsURL + '" target="_blank" class="c-call-to-action c-glyph' + xdlclass + '" aria-label="learn more about ' + c.headline + '">' +
     //                           '<span>' + c.detailsCTA + '</span>' +
     //                       '</a>' +
     //                   '</div></section></div>');
     //   } else if (h.toLowerCase().indexOf("xme-") !== -1 || h.toLowerCase().indexOf("xgift-") !== -1) {
     //    $("." + h.toLowerCase()).append('<div data-grid="col-12">' +
     //               '<section class="m-content-placement-item f-size-medium" ' + accbigid + '>' +
     //                 '<a href="' + c.detailsURL + '" target="_blank" aria-label="learn more about ' + c.headline + '">' +
     //                 '<picture>' +
     //                       //<source srcset="http://placehold.it/491x276" media="(min-width:0)">
     //                       '<img srcset="' + c.image + '" src="' + c.image + '" alt="box and console shot of ' + c.headline + '">' +
     //                   '</picture>' +
     //                   '</a>' +
     //                   '<div>' +
     //                       '<h3 class="c-heading">' + c.headline + '</h3>' +
     //                 //       '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
     //                 //    '<span itemprop="price">' + c.priceText + '</span>' +
     //                 // '</div>' +
     //                       '<a href="' + c.detailsURL + '" target="_blank" class="c-call-to-action c-glyph' + xdlclass + '" aria-label="learn more about ' + c.headline + '">' +
     //                           '<span>' + c.detailsCTA + '</span>' +
     //                       '</a>' +
     //                   '</div></section></div>');
     //   }
     //  })
     // })
  
     // var therelaccs = [];
     // if (xors !== "x1m") {
     //   for (var i = 0; i < 3; i++) {
     //    var relaccs = sortedConsoles[i].relatedAccs.replace(/\s/g, "").split(",");
     //    if (relaccs.length > 0) {
     //     relaccs.forEach(function(acc) {
     //      if (therelaccs.indexOf(acc) === -1 && acc.length > 0) {
     //       therelaccs.push(acc);
     //      }
     //     })
     //    }
     //   }
     // }
  
     // if (therelaccs.length > 0) {
     //  allAccessories.locales[urlRegion].forEach(function(c) {
     //   var xdlclass = "";
     //   if (c.product === "Xbox Design Lab") {
     //    xdlclass = " customize-button cta-btn-dark";
     //   }
     //   var accbigid = "";
     //   if (c.productId.length > 5) { accbigid = 'data-accbigid="' + c.productId.split("/")[0].toUpperCase() + '"' }
     //   therelaccs.forEach(function(h) {
     //    if (c.hmc.indexOf(h) !== -1) {
     //     $(".metext .me-1").before('<div data-grid="col-3 pad-6x"><div data-grid="col-12">' +
     //                '<section class="m-content-placement-item f-size-medium" ' + accbigid + '>' +
     //                  '<a href="' + c.detailsURL + '" target="_blank" aria-label="learn more about ' + c.headline + '">' +
     //                  '<picture>' +
     //                        //<source srcset="http://placehold.it/491x276" media="(min-width:0)">
     //                        '<img srcset="' + c.image + '" src="' + c.image + '" alt="' + c.headline + '">' +
     //                    '</picture>' +
     //                    '</a>' +
     //                    '<div>' +
     //                        '<h3 class="c-heading">' + c.headline + '</h3>' +
     //                  //       '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
     //                  //    '<span itemprop="price">' + c.priceText + '</span>' +
     //                  // '</div>' +
     //                        '<a href="' + c.detailsURL + '" target="_blank" class="c-call-to-action c-glyph' + xdlclass + '" aria-label="learn more, ' + c.headline + '">' +
     //                            '<span>' + c.detailsCTA + '</span>' +
     //                        '</a>' +
     //                    '</div></section></div></div>');
     //     $(".theaccessories_x1s.metext [data-grid='col-3 pad-6x']").last().remove(); // remove last accessory in forme group
     //     $(".gifttext .gift-1").after('<div data-grid="col-3 pad-6x"><div data-grid="col-12">' +
     //                '<section class="m-content-placement-item f-size-medium" ' + accbigid + '>' +
     //                  '<a href="' + c.detailsURL + '" target="_blank" aria-label="learn more about ' + c.headline + '">' +
     //                  '<picture>' +
     //                        //<source srcset="http://placehold.it/491x276" media="(min-width:0)">
     //                        '<img srcset="' + c.image + '" src="' + c.image + '" alt="' + c.headline + '">' +
     //                    '</picture>' +
     //                    '</a>' +
     //                    '<div>' +
     //                        '<h3 class="c-heading">' + c.headline + '</h3>' +
     //                  //       '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
     //                  //    '<span itemprop="price">' + c.priceText + '</span>' +
     //                  // '</div>' +
     //                        '<a href="' + c.detailsURL + '" target="_blank" class="c-call-to-action c-glyph' + xdlclass + '" aria-label="learn more, ' + c.headline + '">' +
     //                            '<span>' + c.detailsCTA + '</span>' +
     //                        '</a>' +
     //                    '</div></section></div></div>');
     //     $(".theaccessories_x1s.gifttext [data-grid='col-3 pad-6x']").last().remove(); // remove last accessory in gift group
     //    }
     //   })
     //  })
     // }
  
     // // external hd accessory
     // if (storageans === "high") {
     //  allAccessories.locales[urlRegion].forEach(function(c) {
     //    c.hmc.forEach(function(h) {
     //     var xdlclass = "";
     //     var accbigid = "";
     //     if (c.productId.length > 5) { accbigid = 'data-accbigid="' + c.productId.split("/")[0].toUpperCase() + '"' }
     //     if (h.toLowerCase().indexOf("hdd-stor") !== -1) {
     //      $(".theaccessories_x1s, .theaccessories_x1x").prepend('<div data-grid="col-3 pad-6x"><div data-grid="col-12">' +
     //                 '<section class="m-content-placement-item f-size-medium" ' + accbigid + '>' +
     //                   '<a href="' + c.detailsURL + '" target="_blank" aria-label="learn more, ' + c.headline + '">' +
     //                   '<picture>' +
     //                         //<source srcset="http://placehold.it/491x276" media="(min-width:0)">
     //                         '<img srcset="' + c.image + '" src="' + c.image + '" alt="' + c.headline + '">' +
     //                     '</picture>' +
     //                     '</a>' +
     //                     '<div>' +
     //                         '<h3 class="c-heading">' + c.headline + '</h3>' +
     //                   //       '<div class="c-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">' +
     //                   //    '<span itemprop="price">' + c.priceText + '</span>' +
     //                   // '</div>' +
     //                         '<a href="' + c.detailsURL + '" target="_blank" class="c-call-to-action c-glyph' + xdlclass + '" aria-label="learn more, ' + c.headline + '">' +
     //                             '<span>' + c.detailsCTA + '</span>' +
     //                         '</a>' +
     //                     '</div></section></div></div>');
     //      $(".theaccessories_x1s, .theaccessories_x1x, .theaccessories_x1m").each(function() {
     //        $(this).find("[data-grid='col-3 pad-6x']").last().remove();
     //      });
     //     } 
     //    })
     //   })
     // }
  
     // // accessories prices
     // var accprices = {}
     // var accpricebigids = [];
     // $("[data-accbigid]").each(function() {
     //  var bi = $(this).data("accbigid");
     //  accprices[bi] = {};
     //  if (accpricebigids.indexOf(bi) === -1) { accpricebigids.push(bi); }
     // })
  
     // var bigIdStringList = accpricebigids.join(",");
     // var countryCode = urlRegion.split("-")[1].toUpperCase();
     // var apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + bigIdStringList + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
  
     // if (accpricebigids.length > 0) {
     //  $.get(apiUrl)
     //    .done(function (responseData) {
     //        responseData.Products.forEach(function (product) {
     //          product.DisplaySkuAvailabilities.forEach(function (skuAvailability) {
     //            skuAvailability.Availabilities.forEach(function(av) {
     //              if (av.Actions.indexOf("Purchase") !== -1) {
     //                var tempbi = product.ProductId;
     //                accprices[tempbi].MSRP = av.OrderManagementData.Price.MSRP;
     //                accprices[tempbi].listPrice = av.OrderManagementData.Price.ListPrice;
     //                accprices[tempbi].currencycode = av.OrderManagementData.Price.CurrencyCode;
     //              }
     //            });
     //          });
     //        });
     //        var fullpricetext = $(".phrases [data-fullprice]").text()
     //        for (var i = 0; i < accpricebigids.length; i++) {
     //          var thebigid = accpricebigids[i];
     //          var msrpshown = accprices[thebigid]["MSRP"].toLocaleString(urlRegion, { style: 'currency', currency: accprices[thebigid]["currencycode"] });
     //          var listshown = accprices[thebigid]["listPrice"].toLocaleString(urlRegion, { style: 'currency', currency: accprices[thebigid]["currencycode"] });
     //          if (accprices[thebigid]["MSRP"] !== accprices[thebigid]["listPrice"]) {
     //            var accpriceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
     //                              //'<s aria-label="' + regionContent["keyFullprice"].replace("<PLACEHOLDER>", msrpshown) + '">' + msrpshown + '</s>' +
     //                              '<s><span class="x-screen-reader">' + fullpricetext + '</span> ' + msrpshown + '</s>' +
     //                              '<meta itemprop="priceCurrency" content="' + accprices[thebigid]["currencycode"] + '">' +
     //                              '<span class="textpricenew x-hidden-focus" itemprop="price">' + listshown + '</span>' +
     //                             '</div>';
     //          } else {
     //            var accpriceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
     //                              '<meta itemprop="priceCurrency" content="' + accprices[thebigid]["currencycode"] + '">' +
     //                              '<span class="textpricenew x-hidden-focus" itemprop="price">' + msrpshown + '</span>' +
     //                             '</div>';
     //          }
     //          $("[data-accbigid='" + thebigid + "'] h3.c-heading").after(accpriceshown);
     //        }
     //        // console.log(accprices)
     //        // console.log(accpricebigids)
     //    })
  
     // } else {
     //  //$(".theaccessories_x1s .c-price, .theaccessories_x1x .c-price").remove();
     // }
  
  
     // GUID_pop(fullGameArray);
  
     // var genrelist = {"actionadventure" : "action & adventure", "familykids" : "family & kids", "fighting" : "fighting", "racingflying" : "racing & flying", "roleplaying" : "role playing", 
     //                  "shooter" : "shooter", "sports" : "sports", "strategy" : "strategy"};
  
     // function popgamesSetup() {
     //  if (score_s >= score_x) { // x1s game pop
     //   if (q1response === "forme") { // me games
     //    if ((q3response.indexOf("kids") !== -1 && q3response.length === 1) || (q5response.indexOf("familykids") !== -1 && q5response.length === 1)) { // everyone games
     //     games4all("false", "false", "true");
     //    } else { // teen or mature games
     //     games4all("false", "false", "false");
     //    }
     //   } else { // gift games
     //    if ((q3response.indexOf("kids") !== -1 && q3response.length === 1 ) || (q5response.indexOf("familykids") !== -1 && q5response.length === 1)) { // everyone games
     //     games4all("true", "false", "true");
     //    } else { // teen or mature games
     //     games4all("true", "false", "false");
     //    }
     //   }
     //  } else { // x1x game pop
     //   if (q1response === "forme") { // me games
     //    if ((q3response.indexOf("kids") !== -1 && q3response.length === 1) || (q5response.indexOf("familykids") !== -1 && q5response.length === 1)) { // everyone games
     //     games4all("false", "true", "true");
     //    } else { // teen or mature games
     //     games4all("false", "true", "false");
     //    }
     //   } else { // gift games
     //    if ((q3response.indexOf("kids") !== -1 && q3response.length === 1 ) || (q5response.indexOf("familykids") !== -1 && q5response.length === 1)) { // everyone games
     //     games4all("true", "true", "true");
     //    } else { // teen or mature games
     //     games4all("true", "true", "false");
     //    }
     //   }
  
      // x1x game pop //
     //  }
     // }
  
     // function games4kids(gift, enhanced) {
     //  var gameids = [];
     //  var gameidcount = 0;
     //  var allcount = 0;
     //  if (enhanced === "true") {
     //   while (gameidcount < 6) {
     //    if (allcount === gameIdArrays["kidsfamily"].length) { break; }
     //    var ran = Math.floor(Math.random() * gameIdArrays["kidsfamily"].length);
     //    var addgame = gameIdArrays["kidsfamily"][ran];
     //    if (gameids.indexOf(addgame) === -1 && allGames[addgame].physical === gift && gameIdArrays["enhanced"].indexOf(addgame) !== -1 && gameIdArrays["editors"].indexOf(addgame) !== -1) {
     //     gameids.push(addgame);
     //     gameidcount++;
     //    }
     //    allcount++;
     //   }
     //   if (gameids.length < 6) {
     //    while (gameidcount < 6) {
     //     if (allcount === gameIdArrays["kidsfamily"].length) { break; }
     //     var ran = Math.floor(Math.random() * gameIdArrays["kidsfamily"].length);
     //     var addgame = gameIdArrays["kidsfamily"][ran];
     //     if (gameids.indexOf(addgame) === -1 && allGames[addgame].physical === gift) {
     //      gameids.push(addgame);
     //      gameidcount++;
     //     }
     //     allcount++;
     //    }
     //   }
     //  } else { 
     //   while (gameidcount < 6) {
     //    if (allcount === gameIdArrays["kidsfamily"].length) { break; }
     //    var ran = Math.floor(Math.random() * gameIdArrays["kidsfamily"].length);
     //    var addgame = gameIdArrays["kidsfamily"][ran];
     //    if (gameids.indexOf(addgame) === -1 && allGames[addgame].physical === gift && gameIdArrays["editors"].indexOf(addgame) !== -1) {
     //     gameids.push(addgame);
     //     gameidcount++;
     //    }
     //    allcount++;
     //   }
     //   if (gameids.length < 6) {
     //    while (gameidcount < 6) {
     //     if (allcount === gameIdArrays["kidsfamily"].length) { break; }
     //     var ran = Math.floor(Math.random() * gameIdArrays["kidsfamily"].length);
     //     var addgame = gameIdArrays["kidsfamily"][ran];
     //     if (gameids.indexOf(addgame) === -1 && allGames[addgame].physical === gift) {
     //      gameids.push(addgame);
     //      gameidcount++;
     //     }
     //     allcount++;
     //    }
     //   }
     //  }
     //  popgames(gameids);
     // }
  
     // function games4all(gift, enhanced, kids) {
     //  var possibleids = [];
     //  var gameids = [];
     //  var gameidcount = 0;
     //  var allcount = 0;
     //  var apigenres = [];
  
     //  q5response.forEach(function(g) {
     //   var apigenre = genrelist[g];
     //   apigenres.push(apigenre);
     //  })
     //  if (gift === "false") {
     //   fullGameArray.forEach(function(g) {
     //    if (parseFloat(allGames[g]["starcount"]) > 4 && parseFloat(allGames[g]["stars"]) > 3.3) {
     //     var ratingshow = "true";
     //    } else if (parseFloat(allGames[g]["starcount"]) <= 4) {
     //     var ratingshow = "true";
     //    } else {
     //     var ratingshow = "true"; // change to false to enable star rating filtering
     //    }
     //    if (allGames[g]["physical"] === "false" && ratingshow === "true") {
     //     if (apigenres.length === 0) {
     //      possibleids.push(g)
     //     } else {
     //      apigenres.forEach(function(gen) {
     //       if (allGames[g]["genres"].indexOf(gen) !== -1) {
     //        possibleids.push(g);
     //       }
     //      })
     //     }
     //    }
     //   })
     //  } else if (gift === "true") {
     //   fullGameArray.forEach(function(g) {
     //    if (allGames[g]["physical"] === "true") {
     //     if (apigenres.length === 0) {
     //      possibleids.push(g)
     //     } else {
     //      apigenres.forEach(function(gen) {
     //       if (allGames[g]["genres"].indexOf(gen) !== -1) {
     //        possibleids.push(g);
     //       }
     //      })
     //     }
     //    }
     //   })
     //  }
  
     //  if (kids === "true") {
     //   var temppossibleids = possibleids.filter(function(el) {
     //    if (gameIdArrays["kidsfamily"].indexOf(el) !== -1) {
     //     return true;
     //    } else {
     //     return false;
     //    }
     //   })
       
     //   if (temppossibleids.length >= 6) {
     //    possibleids = temppossibleids;
     //   } else {
     //    if (gift === "true") {
     //     var tempselection = fullGameArray.filter(function(el) {
     //      if (gameIdArrays["kidsfamily"].indexOf(el) !== -1 && gameIdArrays["physical"].indexOf(el) !== -1) {
     //       return true;
     //      } else {
     //       return false;
     //      }
     //     })
     //    } else {
     //     var tempselection = fullGameArray.filter(function(el) {
     //      if (gameIdArrays["kidsfamily"].indexOf(el) !== -1 && gameIdArrays["physical"].indexOf(el) === -1) {
     //       return true;
     //      } else {
     //       return false;
     //      }
     //     })
     //    }
     //    possibleids = tempselection;
     //   }
     //  }
  
     //  if (enhanced === "true") {
     //   allcount = 0;
     //   while (gameidcount < 6) {
     //    if (allcount === possibleids.length) { break; }
     //    var ran = Math.floor(Math.random() * possibleids.length);
     //    var addgame = possibleids[ran];
     //    if (gameids.indexOf(addgame) === -1 && gameIdArrays["enhanced"].indexOf(addgame) !== -1 && gameIdArrays["editors"].indexOf(addgame) !== -1) {
     //     gameids.push(addgame);
     //     gameidcount++;
     //    }
     //    allcount++;
     //   }
     //   if (gameids.length < 6) {
     //    allcount = 0;
     //    while (gameidcount < 6) {
     //     if (allcount === possibleids.length) { break; }
     //     var ran = Math.floor(Math.random() * possibleids.length);
     //     var addgame = possibleids[ran];
     //     if (gameids.indexOf(addgame) === -1) {
     //      gameids.push(addgame);
     //      gameidcount++;
     //     }
     //     allcount++;
     //    }
     //   }
     //  } else {
     //   while (gameidcount < 6) {
     //    if (allcount === possibleids.length) { break; }
     //    var ran = Math.floor(Math.random() * possibleids.length);
     //    var addgame = possibleids[ran];
     //    if (gameids.indexOf(addgame) === -1 && gameIdArrays["editors"].indexOf(addgame) !== -1) {
     //     gameids.push(addgame);
     //     gameidcount++;
     //    }
     //    allcount++;
     //   }
     //   if (gameids.length < 6) {
     //    allcount = 0;
     //    while (gameidcount < 6) {
     //     if (allcount === possibleids.length) { break; }
     //     var ran = Math.floor(Math.random() * possibleids.length);
     //     var addgame = possibleids[ran];
     //     if (gameids.indexOf(addgame) === -1) {
     //      gameids.push(addgame);
     //      gameidcount++;
     //     }
     //     allcount++;
     //    }
     //   }
     //  }
     //  popgames(gameids);
     // }
  
  
     // $(".q1").text(q1response);
     // $(".q2").text(q2response);
     // $(".q3").text(q3response.join(", "));
     // $(".q4").text(q4response);
     // $(".q5").text(q5response.join(", "));
     // $(".q6").text(q8response);
     // $(".q7").text(q9response);
     // $(".qs").text(score_s);
     // $(".qx").text(score_x);
     // $(".qntc").text(score_ntc);
     // $(".qhvg").text(score_hvg);
     // for (var i = 0; i < 7; i++) {
     //  (function() {
     //   var num = (7 - i);
     //   var time = (i * 1000) + 1000
     //   setTimeout(function() {
     //    $(".countdownnum").text(num)
     //   }, time)
     //  })();
     // }
  
  
     // animation
     for (var i = 0; i < 6; i++) {
      (function() {
       var time = (i * 3500);
       setTimeout(function() {
        $(".bottomglow").removeClass("botglowfade");
       }, time)
      })();
     }
     for (var i = 1; i < 7; i++) {
      (function() {
       var time = (i * 3500) - 1750;
       setTimeout(function() {
        $(".bottomglow").addClass("botglowfade");
       }, time)
      })();
     }
     for (var i = 1; i < 4; i++) {
      (function() {
       var theclass = ".calcphrase" + i;
       var time = (i * 3000) - 3000;
       setTimeout(function() {
        $(theclass).not(".hidden").fadeIn(600);
        setTimeout(function() {
         $(theclass).not(".hidden").fadeOut(700);
        }, 1699)
       }, time)
      })();
     }
     // for (var i = 1; i < 5; i++) {
     //  (function() {
     //   var theclass = ".mg" + i.toString();
     //   var time = (i * 1500) - 1500;
     //   setTimeout(function() {
     //    $(theclass).removeClass("mgstart").addClass("mgmiddle");
     //   }, time)
     //  })();
     // }
     // for (var i = 2; i < 6; i++) {
     //  (function() {
     //   var theclass = ".mg" + (i - 1).toString();
     //   var time = (i * 1500) - 1500;
     //   setTimeout(function() {
     //    $(theclass).removeClass("mgmiddle").addClass("mgend");
     //   }, time)
     //  })();
     // }
  
     // setTimeout(function() {  // for timed page
     //  $(".calculating").hide();
     //  $(".recs").show();
     //  if (score_x > score_s) {
     //   $(".x1x").removeClass("hidden");
     //  } else {
     //   $(".x1s").removeClass("hidden");
     //  }
     // }, 5000)
     $(".gotoresults").click(function() {
      $(".calculating").hide();
      $(".recs").show();
      if (xors === "xsx") {
       $(".xsx").removeClass("hidden");
       $(".xss").remove();
       purchSetup();
      } else {
       $(".xss").removeClass("hidden");
       $(".xsx").remove();
       purchSetup();
      }
     })
  
     // function GUID_pop(rawGuids) {
     //    var countryCode = urlRegion.split("-")[1].toUpperCase();
     //    var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
  
     //    var first12 = rawGuids.slice(0,12)
     //    rawGuids = rawGuids.slice(12)
  
     //    var firstToUrl = first12.join(",");
     //    guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
     //    $.get(guidUrl)
     //        .done(function(responseData) {
     //          var apiData = responseData;
     //          populate(apiData, 0, firstToUrl);
     //          guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
     //          restPop();
     //        })
  
     //    function restPop() {
     //      var m,n,temparray,chunk = 20;
     //      var arrayCount = 1
     //      for (m=0,n=rawGuids.length; m<n; m+=chunk) {
     //        (function(m,n) {
     //        temparray = rawGuids.slice(m,m+chunk);
     //        var guidsToUrl = temparray.join(",");
     //        guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)
  
     //        $.get(guidUrl)
     //          .done(function(responseData) {
     //            var apiData = responseData;
     //            populate(apiData, arrayCount, guidsToUrl);
     //            arrayCount++
     //          })
     //        guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
     //      })(m,n);
     //      }
     //    }
  
     //    var gamehtml = '';
     //    var popcounter = 0;
     //    var bigidUrls = biUrls.items.urls;
     //    var biuArray = Object.keys(bigidUrls);
     //    allGames = {};
     //    gameIdArrays["exclusives"] = [];
     //    gameIdArrays["newreleases"] = [];
     //    gameIdArrays["multiplayer"] = [];
     //    gameIdArrays["upcoming"] = [];
     //    gameIdArrays["kidsfamily"] = [];
     //    gameIdArrays["onsale"] = [];
  
     //    selectedGames = [];
     //    prunedGames = [];
     //    shownGames = [];
  
     //    var nowdate = new Date();
     //    var nowmonthsdate = new Date();
     //    var monthsagofilterdate = new Date(nowmonthsdate.setMonth(nowmonthsdate.getMonth() - 2));
  
     //    function populate(data, count, bigidsgiven) {
     //      // var now = new Date();
     //      // var monthsago = new Date(now.setMonth(now.getMonth() - 9));
     //      var productQuantity = data.Products.length;
  
     //      bigidsgiven = bigidsgiven.split(",");
     //      var allprodids = [];
     //      for (var s = 0; s < productQuantity; s++) {
     //        allprodids.push(data.Products[s].ProductId);
     //      }
  
     //      if (allprodids.length !== bigidsgiven.length) {
     //        for (var t = 0; t < bigidsgiven.length; t++) {
     //          if (allprodids.indexOf(bigidsgiven[t]) === -1) {
     //            console.log("NOTE: BigID " + bigidsgiven[t] + " is not found in the API. Removing from game lists.");
     //            var idind = fullGameArray.indexOf(bigidsgiven[t]);
     //            if (idind !== -1) { fullGameArray.splice(idind, 1); }
     //            var idind1 = gameIdArrays["HDRGaming"].indexOf(bigidsgiven[t]);
     //            if (idind1 !== -1) { gameIdArrays["HDRGaming"].splice(idind1, 1); }
     //            var idind2 = gameIdArrays["TryForFree.homepage"].indexOf(bigidsgiven[t]);
     //            if (idind2 !== -1) { gameIdArrays["TryForFree.homepage"].splice(idind2, 1); }
     //            var idind3 = gameIdArrays["enhanced"].indexOf(bigidsgiven[t]);
     //            if (idind3 !== -1) { gameIdArrays["enhanced"].splice(idind3, 1); }
     //            var idind4 = gameIdArrays["fourk"].indexOf(bigidsgiven[t]);
     //            if (idind4 !== -1) { gameIdArrays["fourk"].splice(idind4, 1); }
     //            var idind5 = gameIdArrays["IDXPAgaming.homepage"].indexOf(bigidsgiven[t]);
     //            if (idind5 !== -1) { gameIdArrays["IDXPAgaming.homepage"].splice(idind5, 1); }
     //            var idind6 = gameIdArrays["exclusives"].indexOf(bigidsgiven[t]);
     //            if (idind6 !== -1) { gameIdArrays["exclusives"].splice(idind6, 1); }
     //            var idind7 = gameIdArrays["kidsfamily"].indexOf(bigidsgiven[t]);
     //            if (idind7 !== -1) { gameIdArrays["kidsfamily"].splice(idind7, 1); }
     //            var idind8 = gameIdArrays["newreleases"].indexOf(bigidsgiven[t]);
     //            if (idind8 !== -1) { gameIdArrays["newreleases"].splice(idind8, 1); }
     //            var idind9 = gameIdArrays["multiplayer"].indexOf(bigidsgiven[t]);
     //            if (idind9 !== -1) { gameIdArrays["multiplayer"].splice(idind9, 1); }
     //            var idind10 = gameIdArrays["upcoming"].indexOf(bigidsgiven[t]);
     //            if (idind10 !== -1) { gameIdArrays["upcoming"].splice(idind10, 1); }
     //            var idind11 = gameIdArrays["editors"].indexOf(bigidsgiven[t]);
     //            if (idind11 !== -1) { gameIdArrays["editors"].splice(idind11, 1); }
     //            var idind12 = gameIdArrays["onsale"].indexOf(bigidsgiven[t]);
     //            if (idind12 !== -1) { gameIdArrays["onsale"].splice(idind12, 1); }
     //            var idind13 = gameIdArrays["physical"].indexOf(bigidsgiven[t]);
     //            if (idind13 !== -1) { gameIdArrays["physical"].splice(idind13, 1); }
     //          }
     //        }
     //      }
          
     //      for (var i = 0; i < productQuantity; i++) {
     //        var itemId = data.Products[i].ProductId.toUpperCase();
  
     //        var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle;
     //        if (itemTitle === undefined) {
     //          itemTitle = "";
     //        }
     //        var titleClickname = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^>a-z0-9-]/gi,'');
  
     //        // determine physical or download
     //        if (gameIdArrays["physical"].indexOf(itemId) !== -1) {
     //          var phys = "true";
     //        } else {
     //          var phys = "false";
     //        }
  
     //        // get boxshot
     //        if (phys === "false") {
     //          var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
     //          var imageInd = 1;
     //          for (var j = 0; j < imagesNum; j++) {
     //            if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "BrandedKeyArt") {
     //              imageInd = j;
     //              break;
     //            }
     //          }
     //          if (data.Products[i].LocalizedProperties[0].Images[imageInd]) {
     //            var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri;
     //            var itemBoxshotSmall;
     //          } else {
     //            var itemBoxshot = "http://compass.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
     //            var itemBoxshotSmall = "http://compass.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
     //          }
     //          if (itemBoxshot.indexOf("xboxlive.com") !== -1) {
     //            itemBoxshotSmall = itemBoxshot + "&w=140&format=jpg";
     //            itemBoxshot = itemBoxshot + "&w=230&format=jpg"; 
     //          }
     //        } else {
     //          if (data.Products[i].LocalizedProperties[0].Images[0]) {
     //            var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[0].Uri + "&w=231&h=197&q=90&m=6&b=%23FFFFFFFF&o=f";
     //            var itemBoxshotSmall = itemBoxshot;
     //          } else {
     //            var itemBoxshot = "http://compass.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
     //            var itemBoxshotSmall = "http://compass.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
     //          }
     //        }
  
     //        // get screenshot
     //        if (phys === "false") {
     //          var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
     //          var imageInd = 1;
     //          for (var j = 0; j < imagesNum; j++) {
     //            var im = data.Products[i].LocalizedProperties[0].Images[j];
     //            if ((im.ImagePurpose === "ImageGallery" || im.ImagePurpose === "Screenshot") && (im.Height < im.Width)) {
     //              imageInd = j;
     //              break;
     //            }
     //          }
     //          if (data.Products[i].LocalizedProperties[0].Images[imageInd]) {
     //            var itemScreenshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri;
     //          } else {
     //            var itemScreenshot = "http://compass.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
     //          }
     //          if (itemScreenshot.indexOf("xboxlive.com") !== -1) {
     //            itemScreenshot = itemScreenshot + "&w=480&format=jpg"; 
     //          }
     //        } else {
     //          if (data.Products[i].LocalizedProperties[0].Images[0]) {
     //            var itemScreenshot = data.Products[i].LocalizedProperties[0].Images[0].Uri + "&w=231&h=197&q=90&m=6&b=%23FFFFFFFF&o=f";
     //          } else {
     //            var itemScreenshot = "http://compass.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
     //          }
     //        }
            
            
     //        var releaseDate = data.Products[i].MarketProperties[0].OriginalReleaseDate;
     //        if (releaseDate === undefined) {
     //          releaseDate = 0;
     //        }
     //        var msproduct = data.Products[i].IsMicrosoftProduct;
     //        var multiplayer = "false";
     //        var coop = "false";
     //        var mptest = data.Products[i].Properties;
     //        if (mptest.Attributes) {
     //          for (var n = 0; n < mptest.Attributes.length; n++) {
     //            if (mptest.Attributes[n].Name.toLowerCase().indexOf("multiplayer") !== -1) {
     //              multiplayer = "true";
     //            }
     //            if (mptest.Attributes[n].Name.toLowerCase().indexOf("coop") !== -1) {
     //              coop = "true";
     //            }
     //          }
     //        }
  
     //        //get prices
     //        var listprice;
     //        var msrpprice;
     //        var currencycode;
     //        var onsale = "false";
     //        var gwg = "false";
     //        var golddiscount = "false"; // deals with gold ... and gold member sale prices?
     //        var specialprice = 100000000;
     //        var eaaccessgame = "false";
     //        var gamepassgame = "false";
     //        if (phys === "false") {
     //          if (data.Products[i].LocalizedProperties[0].EligibilityProperties !== null && data.Products[i].LocalizedProperties[0].EligibilityProperties !== undefined && 
     //              data.Products[i].LocalizedProperties[0].EligibilityProperties !== "undefined") {
     //            if (data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.length > 0) {
     //              data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.forEach(function(aff) {
     //                if (aff.Description.toLowerCase().indexOf("ea access") !== -1) {
     //                  eaaccessgame = "true";
     //                }
     //                if (aff.Description.toLowerCase().indexOf("game pass") !== -1) {
     //                  gamepassgame = "true";
     //                }
     //              })
     //            }
     //          }
     //          data.Products[i].DisplaySkuAvailabilities.forEach(function(sku) {
     //            sku.Availabilities.forEach(function(av, ind) {
     //              if (av.Actions.indexOf("Purchase") !== -1 && (av.OrderManagementData.Price.MSRP !== 0 || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && 
     //                  sku.Sku.Properties.IsTrial === false) {
     //                if ((av.OrderManagementData.Price.ListPrice !== av.OrderManagementData.Price.MSRP || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && ind !== 0) {
     //                  specialprice = av.OrderManagementData.Price.ListPrice;
     //                } else {
     //                  listprice = av.OrderManagementData.Price.ListPrice;
     //                }
     //                if (ind === 0) {
     //                  msrpprice = av.OrderManagementData.Price.MSRP;
     //                }
     //                currencycode = av.OrderManagementData.Price.CurrencyCode;
     //                if (av.Properties.MerchandisingTags !== undefined) {
     //                  if (av.Properties.MerchandisingTags.indexOf("LegacyGamesWithGold") !== -1) {
     //                    gwg = "true";
     //                    specialprice = listprice;
     //                    listprice = msrpprice;
     //                  }
     //                  if (av.Properties.MerchandisingTags.indexOf("LegacyDiscountGold") !== -1) {
     //                    golddiscount = "true";
     //                  }
     //                }
     //                if (listprice < msrpprice) { 
     //                  onsale = "true";
     //                  if (gameIdArrays["onsale"].indexOf(itemId) === -1) {
     //                    gameIdArrays["onsale"].push(itemId); 
     //                  }
     //                };
     //              }
     //            })
     //          })
     //        } else {
     //          data.Products[i].DisplaySkuAvailabilities.forEach(function(sku) {
     //            sku.Availabilities.forEach(function(av) {
     //              if (av.Actions.indexOf("Purchase") !== -1 && av.OrderManagementData.Price.MSRP !== 0 && av.Actions.length > 2) {
     //                listprice = av.OrderManagementData.Price.ListPrice;
     //                msrpprice = av.OrderManagementData.Price.MSRP;
     //                currencycode = av.OrderManagementData.Price.CurrencyCode;
     //                if (listprice < msrpprice) { 
     //                  onsale = "true";
     //                  if (gameIdArrays["onsale"].indexOf(itemId) === -1) {
     //                    gameIdArrays["onsale"].push(itemId); 
     //                  }
     //                };
     //              }
     //            })
     //          })
     //        }
            
  
     //        if (listprice === undefined) {
     //          console.log("NOTE: BigID " + itemId + " has no price information.");
     //          listprice = 100000000;
     //          msrpprice = 100000000;
     //          currencycode = "USD";
     //        }
  
     //        var rating = "none";
     //        var ratingsystem = "none";
     //        var kidfamilyratings = ["ESRB:E10", "ESRB:E", "PEGI:3", "PEGI:7", "PEGI:12", "COB-AU:G", "COB-AU:PG", "OFLC-NZ:G", "OFLC-NZ:PG", "USK:Everyone", "USK:6", "USK:12", 
     //                                "PCBP:0", "PCBP:6", "PCBP:12", "DJCTQ:L", "DJCTQ:10", "DJCTQ:12", "CSRR:G", "CSRR:PG12", "Microsoft:3"] // eliminated teen ratings (different from catalog page)
     //        var rawdescriptors = "none";
     //        if (data.Products[i].MarketProperties[0].ContentRatings && data.Products[i].MarketProperties[0].ContentRatings.length !== 0) {
     //          rating = data.Products[i].MarketProperties[0].ContentRatings[0].RatingId;
     //          ratingsystem = data.Products[i].MarketProperties[0].ContentRatings[0].RatingSystem;
     //          if (kidfamilyratings.indexOf(rating) !== -1) {
     //            gameIdArrays["kidsfamily"].push(itemId);
     //          }
     //          rawdescriptors = data.Products[i].MarketProperties[0].ContentRatings[0].RatingDescriptors.join(", ");
     //        } 
     //        if (urlRegion === "ja-jp" || urlRegion === "ko-kr") {
     //          $(".c-label[data-game='kids and family']").remove()
     //        }
  
     //        if (biuArray.indexOf(itemId) === -1) {
     //          var itemhref = 'https://www.microsoft.com/' + urlRegion + '/store/p/' + titleClickname + '/' + itemId;
     //        } else {
     //          var itemhref = bigidUrls[itemId];
     //          var splitHref = itemhref.split("/")
     //          splitHref.splice(3, 0, urlRegion)
     //          itemhref = splitHref.join("/")
     //        }
  
     //        var avgstars = 0;
     //        var ratingcount = 0;
     //        if (data.Products[i].MarketProperties[0].UsageData[0]) {
     //          avgstars = data.Products[i].MarketProperties[0].UsageData[0].AverageRating;
     //          ratingcount = data.Products[i].MarketProperties[0].UsageData[0].RatingCount;
     //        } 
  
  
     //        if (itemId === "9NBLGGH1Z6FQ") {
     //          itemBoxshot =  "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
     //          itemBoxshotSmall =  "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
     //        }
     //        if (itemId === "BZFK7WNK7R4M") {
     //          itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
     //          itemBoxshotSmall = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
     //        }    
  
     //        // genres
     //        if (data.Products[i].Properties.Categories !== undefined && data.Products[i].Properties.Categories !== null) {
     //          var gamegenres = data.Products[i].Properties.Categories.join(", ").toLowerCase();
     //        } else {
     //          var gamegenres = "unlisted";
     //        }
     //        if (data.Products[i].Properties.Category !== undefined && data.Products[i].Properties.Category !== null) {
     //          var singlegamegenres = data.Products[i].Properties.Category.toLowerCase();
     //        } else {
     //          var singlegamegenres = "unlisted";
     //        }
     //        if (gamegenres === "unlisted") {
     //         gamegenres = singlegamegenres;
     //        }
     //        if (phys === "true" && data.Products[i].LocalizedProperties[0].SearchTitles) {
     //         var physsearches = [];
     //         data.Products[i].LocalizedProperties[0].SearchTitles.forEach(function(st) {
     //          var starray = st.SearchTitleString.toLowerCase().split(" ");
     //          starray.forEach(function(arr) {
     //           if (physsearches.indexOf(arr) === -1) {
     //            physsearches.push(arr);
     //           }
     //          })
              
     //         })
     //         if (physsearches.length > 0) {
     //          physsearches = physsearches.join(", ")
     //         } else {
     //          physsearches = "unlisted"
     //         }
     //        } else {
     //         var physsearches = "unlisted";
     //        }
  
     //        var srcharray = [];
     //        var genrearray = [];
     //        if (physsearches !== "unlisted") { // add proper genres AND REMOVE SEARCHHINTS FROM ALLGAMES WHEN DONE
     //         var genrepop = {"fps" : "action & adventure, shooter",
     //                 "battle" : "action & adventure, shooter",
     //                 "battles" : "action & adventure, shooter",
     //                 "army" : "action & adventure, shooter",
     //                 "superhero" : "action & adventure",
     //                 "superheroes" : "action & adventure",
     //                 "jurassic" : "action & adventure",
     //                 "movie" : "action & adventure",
     //                 "undead" : "action & adventure", 
     //                 "pirates" : "action & adventure", 
     //                 "hostage" : "action & adventure", 
     //                 "marvel" : "action & adventure", 
     //                 "spider-man" : "action & adventure",
     //                 "spiderman" : "action & adventure", 
     //                 "platformer" : "action & adventure", 
     //                 "action-platformer" : "action & adventure", 
     //                 "transformer" : "action & adventure", 
     //                 "platform" : "action & adventure",
     //                 "ori" : "action & adventure",
     //                 "limbo" : "action & adventure", 
     //                 "stealth" : "action & adventure",
     //                 "adventure" : "action & adventure",
     //                 "survive" : "action & adventure",
     //                 "hack" : "action & adventure",
     //                 "mob" : "action & adventure",
     //                 "cops" : "action & adventure",
     //                 "nightmares" : "action & adventure",
     //                 "underworld" : "action & adventure",
     //                 "fractured" : "action & adventure",
     //                 "survival" : "action & adventure",
     //                 "undercover" : "action & adventure",
     //                 "open-world" : "action & adventure",
     //                 "tomb" : "action & adventure",
     //                 "thrills" : "action & adventure",
     //                 "action" : "action & adventure", 
     //                 "armor" : "action & adventure",
     //                 "crime" : "action & adventure",
     //                 "robbers" : "action & adventure", 
     //                 "dragons" : "action & adventure", 
     //                 "tmnt" : "action & adventure", 
     //                 "rockstar" : "action & adventure", 
     //                 "warriors" : "action & adventure", 
     //                 "mayhem" : "action & adventure", 
     //                 "exploration" : "action & adventure", 
     //                 "fight" : "action & adventure",
     //                 "open" : "action & adventure", 
     //                 "destruction" : "action & adventure",
     //                 "halo" : "action & adventure, shooter",
     //                 "tale" : "action & adventure",
     //                 "stealth" : "action & adventure",
     //                 "hobbit" : "action & adventure",
     //                 "hell" : "action & adventure",
     //                 "survive" : "action & adventure",
     //                 "warfare" : "action & adventure",
     //                 "combat" : "action & adventure",
     //                 "warrior" : "action & adventure",
     //                 "suspense" : "action & adventure",
     //                 "ninjago" : "family & kids, action & adventure",
     //                 "scary" : "action & adventure",
     //                 "hitman" : "action & adventure",
     //                 "titanfall" : "action & adventure",
     //                 "action-adventure" : "action & adventure",
     //                 "farm" : "family & kids, strategy", 
     //                 "farming" : "family & kids, strategy", 
     //                 "minecraft" : "family & kids",
     //                 "sonic" : "family & kids, action & adventure", 
     //                 "peanuts" : "family & kids", 
     //                 "nickelodeon" : "family & kids", 
     //                 "drawing" : "family & kids", 
     //                 "monopoly" : "family & kids", 
     //                 "scrabble" : "family & kids", 
     //                 "dance" : "family & kids",
     //                 "dancing" : "family & kids", 
     //                 "kid" : "family & kids",
     //                 "guitar" : "family & kids",
     //                 "guitars" : "family & kids",
     //                 "lego" : "family & kids",
     //                 "sing" : "family & kids",
     //                 "singing" : "family & kids",
     //                 "rhythm" : "family & kids",
     //                 "karaoke" : "family & kids",
     //                 "musical" : "family & kids",
     //                 "disney" : "family & kids, action & adventure", 
     //                 "ninja" : "fighting",
     //                 "fighting" : "fighting",
     //                 "fighter" : "fighting",
     //                 "kombat" : "fighting",
     //                 "sword" : "fighting",
     //                 "wrestling" : "fighting, sports", 
     //                 "cars" : "racing & flying, family & kids",
     //                 "car" : "racing & flying, family & kids",
     //                 "speed" : "racing & flying",
     //                 "bikes" : "racing & flying",
     //                 "autos" : "racing & flying",
     //                 "atv" : "racing & flying",
     //                 "supercross" : "racing & flying",
     //                 "race" : "racing & flying",
     //                 "racer" : "racing & flying",
     //                 "driver" : "racing & flying",
     //                 "off-road" : "racing & flying",
     //                 "ride" : "racing & flying",
     //                 "truck" : "racing & flying",
     //                 "driving" : "racing & flying",
     //                 "rallying" : "racing & flying",
     //                 "derby" : "racing & flying",
     //                 "motorsport" : "racing & flying",
     //                 "motorcross" : "racing & flying",
     //                 "track" : "racing & flying",
     //                 "racing" : "racing & flying",
     //                 "racetrack" : "racing & flying",
     //                 "racing" : "racing & flying",
     //                 "battle-cars" : "racing & flying, action & adventure",
     //                 "action-role" : "role playing, action & adventure",
     //                 "combat-rpg" : "role playing, action & adventure", 
     //                 "bioshock" : "role playing, action & adventure", 
     //                 "role-playing" : "role playing",
     //                 "rpg" : "role playing",
     //                 "scrolls" : "role playing, action & adventure",
     //                 "role-playing" : "role playing", 
     //                      "shooter": "shooter",
     //                      "first": "shooter",
     //                      "person": "shooter",
     //                      "weapons": "shooter, action & adventure",
     //                      "shooting": "shooter, action & adventure",
     //                      "third-person shooter game": "shooter",
     //                      "first-persom": "shooter, action & adventure",
     //                      "first-person": "shooter, action & adventure",
     //                      "third-person": "shooter, action & adventure",
     //                      "gow": "shooter, action & adventure",
     //                      "shooter": "shooter",
     //                      "shooters": "shooter",
     //                      "gun": "shooter",
     //                      "sniper": "shooter",
     //                      "sport" : "sports",
     //                      "sports" : "sports",
     //                      "wwe" : "sports, fighting",
     //                      "wrestlers" : "sports, fighting",
     //                      "soccer" : "sports",
     //                      "nfl" : "sports",
     //                      "pga" : "sports",
     //                      "baseball" : "sports",
     //                      "golf" : "sports",
     //                      "r.b.i." : "sports",
     //                      "mls" : "sports",
     //                      "premiership" : "sports",
     //                      "nba" : "sports",
     //                      "skate" : "sports",
     //                      "skateboard" : "sports",
     //                      "usain" : "sports",
     //                      "basketball" : "sports",
     //                      "snowboarding" : "sports",
     //                      "hockey" : "sports",
     //                      "sports game" : "sports",
     //                      "sports" : "sports",
     //                      "football" : "sports",
     //                      "ski" : "sports",
     //                      "skiing" : "sports",
     //                      "fishing" : "sports",
     //                      "footie" : "sports",
     //                      "ufc" : "sports, fighting",
     //                      "martial" : "sports, fighting",
     //                      "kickboxing" : "sports, fighting",
     //                      "brawler" : "fighting",
     //                      "hunting" : "sports", 
     //                      "strategy" : "strategy",
     //                      "management" : "strategy",
     //                      "constructing" : "strategy",
     //                      "sims" : "strategy",
     //                      "worms" : "strategy",
     //                      "city-building" : "strategy",
     //                      "turn" : "strategy",
     //                      "settlers" : "strategy",
     //                       "building" : "strategy, family & kids",
     //                     };
  
     //         srcharray = physsearches.split(", ");
     //         srcharray.forEach(function(s) {
     //          if (genrepop[s] !== undefined && typeof genrepop[s] === "string") {
     //           var gens = genrepop[s];
     //           gens = gens.split(", ")
     //           gens.forEach(function(eg) {
     //            if (genrearray.indexOf(eg) === -1) {
     //             genrearray.push(eg);
     //            }
     //           })
     //          }
     //         })
     //         gamegenres = genrearray.join(", ");
     //         if (gamegenres === "") { gamegenres = "unlisted"}
     //        }
  
     //        allGames[itemId] = {releasedate : releaseDate, msproduct : msproduct, multiplayer : multiplayer, coop: coop, rating : rating, ratingsystem : ratingsystem, gameurl : itemhref, 
     //                            titleclickname : titleClickname, boxshot : itemBoxshot, boxshotsmall : itemBoxshotSmall, title : itemTitle, msrpprice: msrpprice, listprice: listprice, 
     //                            currencycode: currencycode, onsale: onsale, upcoming: "false", newrelease: "false", physical: phys, genres: gamegenres, screenshot: itemScreenshot, 
     //                            descriptors: rawdescriptors, stars: avgstars, starcount: ratingcount, searchhints: physsearches, gameswithgold: gwg, golddiscount: golddiscount,
     //                            specialprice: specialprice, eaaccessgame: eaaccessgame, gamepassgame: gamepassgame};
  
     //        //make API-provided lists        
     //        if (msproduct === true) {
     //          gameIdArrays["exclusives"].push(itemId);
     //        }
     //        if (multiplayer === "true") {
     //          gameIdArrays["multiplayer"].push(itemId);
     //        }
     //        var reldate = new Date(releaseDate);
     //        if (reldate > nowdate) {
     //          gameIdArrays["upcoming"].push(itemId);
     //          allGames[itemId]["upcoming"] = "true";
     //        }
     //        if (reldate < nowdate && monthsagofilterdate < reldate) {
     //          gameIdArrays["newreleases"].push(itemId);
     //          allGames[itemId]["newrelease"] = "true";
     //        }
  
     //        popcounter++;
            
     //        if ((i === (productQuantity - 1)) && (popcounter === fullGameArray.length)) {
     //          var x1RegionPop = (function() {
     //            popgamesSetup();
     //          })();
     //        }
     //      }    
     //    }
  
     //  }
  
     //  function popgames(gamearray) {
     //   for (var i = 0; i < gamearray.length; i++) {
     //    var thebigid = gamearray[i];
     //    var thestars = '';
     //      if (allGames[thebigid]["starcount"] > 0) {
     //        var totalratings = allGames[thebigid]["starcount"];
     //        var avgrating = allGames[thebigid]["stars"];
     //        var percentfilled = (avgrating / 5) * 100;
     //        var offset;
     //        if (percentfilled <= 20) {
     //            offset = 0;
     //        } else if (percentfilled > 20 && percentfilled <= 40) {
     //            offset = 12;
     //        } else if (percentfilled > 40 && percentfilled <= 60) {
     //            offset = 24;
     //        } else if (percentfilled > 60 && percentfilled <= 80) {
     //            offset = 36;
     //        } else if (percentfilled > 80 && percentfilled <= 100) {
     //            offset = 48;
     //        }
     //        var starsfilled = ((percentfilled / 100) * 90) + offset;
     //        thestars = '<div class="ratingstars" data-starpercent="' + starsfilled + '"><div class="c-rating f-individual emptystars" data-value="' + avgrating + 
     //            '" data-max="5" itemscope itemtype="https://schema.org/Rating">' +
     //            '<p class="x-screen-reader">User rating:' +
     //            '<span itemprop="ratingValue">' + avgrating + '</span>/' +
     //            '<span itemprop="bestRating">5</span>' +
     //            '</p>' +
     //            // '</div>' + 
     //            '<div class="c-rating f-individual filledstars" data-value="5" data-max="5" itemscope itemtype="https://schema.org/Rating">' +
     //            '<p class="x-screen-reader">' +
     //            '<span itemprop="ratingValue">5</span>/' +
     //            '<span itemprop="bestRating">5</span>' +
     //            '</p>' +
     //            '<div></div>' +
     //            '</div></div></div>'
     //      }
  
     //      var msrpshown = allGames[thebigid]["msrpprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
     //      var listshown = allGames[thebigid]["listprice"].toLocaleString(urlRegion, { style: 'currency', currency: allGames[thebigid]["currencycode"] });
     //      if (allGames[thebigid]["listprice"] !== 100000000) {
     //        if (allGames[thebigid]["msrpprice"] !== allGames[thebigid]["listprice"] && allGames[thebigid]["specialprice"] === 100000000 && allGames[thebigid]["gameswithgold"] === "false") {
     //          var priceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
     //                            '<s>' + msrpshown + '</s>' +
     //                            '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
     //                            '<span class="textpricenew x-hidden-focus" itemprop="price">' + listshown + '</span>' +
     //                           '</div>';
     //        } else {
     //          var priceshown = '<div class="c-price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">' +
     //                            '<meta itemprop="priceCurrency" content="' + allGames[thebigid]["currencycode"] + '">' +
     //                            '<span class="textpricenew x-hidden-focus" itemprop="price">' + listshown + '</span>' +
     //                           '</div>';
     //        }
     //      } else {
     //        var priceshown = "";
     //      }
  
     //      if (gameIdArrays["upcoming"].indexOf(thebigid) !== -1) {
     //        priceshown = '';
     //      }
          
     //    var gindex = i + 1;
     //    $(".game-" + gindex).append('<section class="m-product-placement-item f-size-medium context-game gameDiv" itemscope="" itemtype="http://schema.org/Product" data-bigid="' + thebigid + '" ' +
     //              'data-listprice="' + allGames[thebigid]["listprice"] + '">' +
     //               '<a href="' + allGames[thebigid]["gameurl"] + '" target="_blank" data-clickname="www>games>xbox-one>' + allGames[thebigid]["titleclickname"] + '>click" data-retailer="ms store">' +
     //                '<picture class="containerIMG">' +
     //                  '<img class="c-image" aria-hidden="true" srcset="" src="' + allGames[thebigid]["boxshot"] + '">' +
     //                '</picture>' +
     //                '<div>' +
     //                 '<h3 class="c-heading x1GameName" itemprop="product name">' + allGames[thebigid]["title"] + '</h3>' +
     //                 thestars + 
     //                 priceshown + 
     //                '</div>' +
     //               '</a></section>');
     //   }
     //   // star percentages
     //   $(".recgame").each(function() {
     //    var starperc = $(this).find(".ratingstars").attr("data-starpercent") || "0";
     //      $(this).find(".c-rating[data-value].f-individual.filledstars div").css("width", starperc + "px");
     //   })
  
     //   if (gamearray.length === 0) {
     //    $(".recgames").remove();
     //   }
     //  }
  
      // seconds to rec screen
      if (xors === "xsx") {
        $(".xsx").removeClass("hidden");
        $(".xss").remove();
        purchSetup();
      } else {
        $(".xss").removeClass("hidden");
        $(".xsx").remove();
        purchSetup();
      }
      if (mode === "qa") { var delaytime = 0 } else { delaytime = 0 }
     setTimeout(function() {
      $(".calculating").fadeOut(700, function() {
        $("body").append('<scr' + 'ipt src="/en-US/global-resources/script/js/hatch.js"></script>');
        $(".recs").fadeIn(400);
        // $("#headerArea").slideDown();
        // $("#headerArea").css("overflow", "initial");
      })
      var currenturl = window.location.href;
      var tempurl = currenturl.split("#")[0]
      var btttoprec = $(".recs").offset().top;
        $("HTML, BODY").animate({
            scrollTop: btttoprec
        }, 500);
        console.log("q1response:" + q1response);
        console.log("q2response:" + q2response);
        console.log("q3response:" + q3response);
        console.log("q4response:" + q4response);
        console.log("q5response:" + q5response);
        console.log("q6response:" + q6response);
        console.log("q7response:" + q7response);
      if (score_x > score_s) {
       $(".xsx").removeClass("hidden");
       var newurl = tempurl + "#x";
       window.history.replaceState(currenturl, "Xbox Series X", newurl);
       // setTimeout(function() {
       //    $(".x1x").find(".recpretitle").focus();
       //  }, 2050)
      } else {
       $(".x1s").removeClass("hidden");
       var newurl = tempurl + "#s";
       window.history.replaceState(currenturl, "Xbox Series S", newurl);
       // setTimeout(function() {
       //    $(".x1s").find(".recpretitle").focus();
       //  }, 2050)
      }
     }, delaytime)
  
    }
  
    })();
  
   // purchase section
   function purchSetup() {
   $(document).ready(function() {
      consSoldOut = "f";
        var API_pop = (function() {
            var urlRegion = document.URL.split("/")[3].toLowerCase();
            // page bar price
            var startingatLocales = "en-us, en-gb, en-au, en-nz"
            if ($(".price-callout").length === 0) {
                $(".m-in-page-navigation .CTAdiv").prepend('<span class="price-callout"> <span class="price-msrp"></span></span>');
            }
            $(".price-callout").clone().appendTo(".heroPrice");
    
            var stripQueryString = document.URL.split("?");
            var currentUrl = stripQueryString[0].split("/");
            var countryCode = urlRegion.split("-")[1].toUpperCase();
            var prodId = $(".standalonePurchBox").attr("data-productId");
            var prodIdUpd = $(".standalonePurchBox").attr("data-updated-productId");
            var specIdBig = $(".standalonePurchBox").attr("data-special-productId");
            if (specIdBig === undefined)
                var specIdBig = "";
            var psSku = $(".price-spider .ps-widget").attr("ps-sku");
            var currencyFormat = priceFormat.locales[urlRegion];
            var regionSoldout = globalSoldout.locales[urlRegion];
            var sheetDataLoc = allConsoles.locales[urlRegion];
            var pageId = currentUrl[currentUrl.length - 1];
               pageId = pageId.split("#")[0];
            var consoleVersion = currentUrl[currentUrl.length - 2];
            if (pageId.toLowerCase() === "home" || pageId == "") {
                pageId = currentUrl[currentUrl.length - 2];
                consoleVersion = currentUrl[currentUrl.length - 3];
            }
            console.log(consoleVersion);
            var apiMSRPPrice = "";
            var apiListPrice = "";
            if (psSku !== "") {
                $(".price-spider").css("display", "inline-block");
            }
    
            //Grab the product ID from the sheet
            for (var i = 0; i < sheetDataLoc.length; i++) {
                var splitCurrentProductURL = sheetDataLoc[i].detailsURL.split("/");
                var currentProductPageId = splitCurrentProductURL[splitCurrentProductURL.length - 1];
                var currentProductConsoleVersion = splitCurrentProductURL[splitCurrentProductURL.length - 2];
                if (currentProductPageId.toLowerCase() === "home" || currentProductPageId == "") {
                    currentProductPageId = splitCurrentProductURL[splitCurrentProductURL.length - 2];
                    currentProductConsoleVersion = splitCurrentProductURL[splitCurrentProductURL.length - 3];
                }
                console.log("console version from sheet: " + currentProductConsoleVersion.toLowerCase());
                console.log("actual console version: " + consoleVersion.toLowerCase())
                //prodId = undefined;
                if (sheetDataLoc[i].itemId.toLowerCase() === pageId.toLowerCase() && consoleVersion.toLowerCase() === currentProductConsoleVersion.toLowerCase()) {
                    console.log("using id from sheet");
                    currentProduct = sheetDataLoc[i];
                    if (currentProduct.productId.indexOf("/") !== -1) {
                        prodId = currentProduct.productId.toUpperCase();
                    }
                    if (currentProduct.updProductId.indexOf("/") !== -1) {
                        prodIdUpd = currentProduct.updProductId.toUpperCase();
                        console.log("FOUND UPDATED PRODUCT ID upd id= " + prodIdUpd);
                    }
                    if (currentProduct.specIdBig.length > 0) {
                        specIdBig = currentProduct.specIdBig.toUpperCase();
                        console.log("FOUND SPECIAL PRODUCT ID upd id= " + specIdBig);
                    }
    
                    break;
                }
            }
            if (prodId === undefined) { throw ("New Product ID " + pageId + " not found in Console Hub JSON. Please check spreadsheet.") }
            //console.log("upd id= " + prodIdUpd);
            //console.log("spec id= " + specIdBig);
    
            // detect daylight saving
            Date.prototype.stdTimezoneOffset = function() {
                var jan = new Date(this.getFullYear(), 0, 1);
                var jul = new Date(this.getFullYear(), 6, 1);
                return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            }
            Date.prototype.dst = function() {
                return this.getTimezoneOffset() < this.stdTimezoneOffset();
            }
            var pacificoffset = 8;
            var dsttest = new Date();
            var usertzhours = dsttest.getTimezoneOffset() / 60;
            if (dsttest.dst()) {
                pacificoffset = 7;
            }
            console.log(prodId + " - " + prodIdUpd + "-" + specIdBig);
            // check to see if updated bigid is live
            if (prodIdUpd !== undefined && prodIdUpd !== "") {
                if (prodIdUpd.length === 12 && prodIdUpd.indexOf("-") === -1) {
                    var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdUpd + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
                    console.log(apiUrlTest);
                    if (specIdBig !== "") {
                        var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                    }
                    $.get(apiUrlTest)
                        .done(function(responseData) {
                            apiDataTest = responseData;
                            if (apiDataTest.Products.length === 0) {
                                idFound();
                            } else {
                                prodId = prodIdUpd;
                                idFound("true");
                            }
                        })
                        .fail(function() {
                            idFound();
                        })
                } else {
                    var testSku = prodIdUpd.split("/")[1];
                    var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdUpd.split("/")[0] + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
                    console.log(apiUrlTest);
                    if (specIdBig !== "") {
                        var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                    }
    
                    $.get(apiUrlTest)
                        .done(function(responseData) {
                            apiDataTest = responseData;
                            if (apiDataTest.Products.length === 0) {
                                idFound();
                            } else {
                                var skuFound = false;
                                apiDataTest.Products[0].DisplaySkuAvailabilities.forEach(function(y) {
                                    var stillLooking = true;
                                    y.Availabilities.forEach(function(z) {
                                        if ((z.SkuId === testSku.toUpperCase()) && stillLooking) {
                                            console.log("sku= " + testSku);
                                            skuFound = true;
                                            apiMSRPPrice = z.OrderManagementData.Price.MSRP;
                                            apiListPrice = z.OrderManagementData.Price.ListPrice;
                                            stillLooking = false; //Leave loop, there may be multiple matches but the first one is ususally the one you want.
                                        }
                                    })
                                })
                                if (skuFound === false) {
                                    idFound();
                                } else {
                                    var ispreorder = responseData.Products[0].DisplaySkuAvailabilities[0].Sku.Properties.IsPreOrder;
                                    if (ispreorder.toString().toLowerCase() === "true") {
                                        var potext = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
                                        $(".purchButton span").text(potext);
                                        $(".purchButton").attr("aria-label", potext + ", " + responseData.Products[0].LocalizedProperties[0].ShortTitle);
                                        $(".purchButtonPB span").text(potext);
                                        // $(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
                                        if (prodIdUpd !== undefined && prodIdUpd !== "") {
                                            prodId = prodIdUpd;
                                            idFound("true");
                                        } else {
                                            idFound();
                                        }
                                    } else {
                                        prodId = prodIdUpd;
                                        idFound("true");
                                    }
    
                                }
                            }
                        })
                        .fail(function() {
                            idFound();
                        })
                }
            } else {
                var testSku = prodId.split("/")[1];
                var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodId.split("/")[0] + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
                if (specIdBig !== "") {
                    var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                }
                $.get(apiUrlTest)
                    .done(function(responseData) {
                        apiDataTest = responseData;
                        if (apiDataTest.Products.length === 0) {
                            idFound();
                        } else {
                            var skuFound = false;
                            apiDataTest.Products[0].DisplaySkuAvailabilities.forEach(function(y) {
                                var stillLooking = true;
                                y.Availabilities.forEach(function(z) {
                                    if ((z.SkuId === testSku.toUpperCase()) && stillLooking) {
                                        console.log("sku= " + testSku);
                                        skuFound = true;
                                        apiMSRPPrice = z.OrderManagementData.Price.MSRP;
                                        apiListPrice = z.OrderManagementData.Price.ListPrice;
                                        stillLooking = false; //Leave loop, there may be multiple matches but the first one is ususally the one you want.
                                    }
                                })
                            })
                            if (skuFound === false) {
                                idFound();
                            } else {
                                var ispreorder = responseData.Products[0].DisplaySkuAvailabilities[0].Sku.Properties.IsPreOrder;
                                if (ispreorder.toString().toLowerCase() === "true") {
                                    var potext = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
                                    // $(".addToCartBtn").text(potext);
                                    // $(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
                                    $(".purchButton span").text(potext);
                                    $(".purchButton").attr("aria-label", potext + ", " + sheetProductInfo.product);
                                    $(".purchButtonPB span").text(potext);
                                }
                                idFound();
                            }
                        }
                    })
                    .fail(function() {
                        idFound();
                    })
            }
            //Check to see if there is legal, and if there is append it to the legal section of the page.
            // if (sheetDataLoc[i].legal1 !== ""){addLegal();}
    
            function idFound(useupdated) {
                var customATC = $(".standalonePurchBox").attr("data-custom-addtocart-url");
                if (customATC === undefined) { customATC = ""; }
                var sheetDataLoc = allConsoles.locales[urlRegion];
                var sheetProdInd;
    
                if (useupdated === "true") {
                    console.log("Using new Product ID.")
                    for (var i = 0; i < sheetDataLoc.length; i++) {
                        if (sheetDataLoc[i].updProductId.toLowerCase() === prodId.toLowerCase()) {
                            sheetProdInd = i;
                        }
                    }
                    if (sheetProdInd === undefined) { throw ("New Product ID " + prodId + " not found in Console Hub JSON. Please check spreadsheet.") }
                    sheetProductInfo = sheetDataLoc[sheetProdInd];
                } else {
                    for (var i = 0; i < sheetDataLoc.length; i++) {
                        if (sheetDataLoc[i].productId.toLowerCase() === prodId.toLowerCase()) {
                            sheetProdInd = i;
                        }
                    }
                    sheetProductInfo = sheetDataLoc[sheetProdInd];
                }
                consSoldOut = sheetProductInfo.soldOut;
                if (consSoldOut === "t") {
          console.log("console sold out " + consSoldOut)
          var lm = lmCopy.locales[urlRegion].keyLearnmore;
          var consText = $(".c-in-page-navigation .c-heading-6").first().text();
          $(".CTAdiv button span").text(lm);
          $(".CTAdiv button span").attr("aria-label", lm + ", " + consText)
          $(".CTAdiv button span").css("visibility", "visible");
          $(".page-hero .fade-in .heroPrice").remove();
          $(".page-hero .fade-in [href='#purchase']").remove();
          $(".buy-group").replaceWith('<div class="buy-group" style="visibility:visible">' + tempOos.locales[urlRegion].keyTemporarilyoutofstock + '</div>');
        }
                var prodIdBig = sheetProductInfo.updProductId.split("/")[0];
                var apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1';
                if (specIdBig !== "") {
                    apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + specIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                }
                var guidIds = [];
                var apiData;
                var useAPIPrice = true; // Using a '!' character at the beginning of the priceText in the allConsoles.js price to override the API price.
                // console.log(sheetProductInfo.priceText)
                if (sheetProductInfo.priceText.charAt(0) === "!") {
                    useAPIPrice = false;
                    sheetProductInfo.priceNumber = sheetProductInfo.priceText.replace("!", "");
                    sheetProductInfo.priceText = sheetProductInfo.priceText.replace("!", "");
                    console.log(sheetProductInfo.priceText);
                    if (sheetProductInfo.tprPriceText.charAt(0) === "!") {
                        sheetProductInfo.tprPriceNumber = sheetProductInfo.tprPriceText.replace("!", "");
                        sheetProductInfo.tprPriceText = formatCurrency(sheetProductInfo.tprPriceText.replace("!", ""), currencyFormat);
                    }
                }
                // Add to Cart if in new store
                if (prodIdBig.length > 10) {
                    $.get(apiUrl)
                        .done(function(responseData) {
                            apiData = responseData;
                            populate();
                        })
                    //$(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
                } else {
                    //$(".purchRow1 .f-heavyweight.retailerLB").removeClass("hiddenImp");
    
                }
    
                if (sheetProductInfo === undefined) {
                    throw ("The ProductID " + prodId + " is not found in the console JSON. Please check the spreadsheet.");
                }
                var buytext = sheetProductInfo.buyText; // USE THIS ONE
                //var buytext = "TEMPORARY TEXT ABOVE PURCHASE AREA";
                //var buyTextLoc = buyText.locales[urlRegion];
                //var buytext = buyTextLoc[Object.keys(buyTextLoc)[0]];
                $(".buyText").text(buytext);
    
                if ($(".buyText").text() === "####") {
                    $(".buyText").hide();
                }
    
                if (sheetProductInfo.priceText.length !== 0) {
                    var priceText = formatCurrency(sheetProductInfo.priceText, currencyFormat);
                    // var priceText = sheetProductInfo.priceText;
                    $(".price-msrp").text(priceText);
                } else {
                    $(".monthlyPrice").remove();
                }
                if (sheetProductInfo.priceAA.indexOf("#") === -1 && sheetProductInfo.priceAA.length > 1) {
                    var aaText = sheetProductInfo.priceAA.split(" ")[0];
                    // var priceText = sheetProductInfo.priceText;
                    $(".price-xaa-lc").text(aaText);
                } 
    
                // if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
                //   var xsxString = "xbox-series-x";
                // } else {
                //   var xsxString = "xbox-series-s";
                // }
    
                var preorderURL = 'https://xbox.com/' + urlRegion + '/configure/' + sheetProductInfo.specIdBig.split("/")[0];
                // var preorderURL = 'https://www.microsoft.com/' + urlRegion + '/store/configure/' + xsxString + '-console/' + sheetProductInfo.specIdBig.split("/")[0];
                if (sheetProductInfo.updProductId.indexOf("#") === -1 && sheetProductInfo.updProductId.length > 1) {
                    preorderURL = 'https://xbox.com/' + urlRegion + '/configure/' + sheetProductInfo.updProductId.split("/")[0];
                    // preorderURL = 'https://www.microsoft.com/' + urlRegion + '/store/configure/' + xsxString + '-console/' + sheetProductInfo.updProductId.split("/")[0];
                }
                $(".purchButton").attr("href", preorderURL);
    
                if (sheetProductInfo.specIdBig.split("/")[0].length < 12 && sheetProductInfo.updProductId.split("/")[0].length < 12) {
                  $(".purchButton").remove();
                }
    
                var canUseAPI_MSRP = (apiMSRPPrice !== "" && apiMSRPPrice != "0" && apiMSRPPrice != "100000" && useAPIPrice);
    
                if (canUseAPI_MSRP) { //added
                    $(".price-msrp").text(formatCurrency(apiMSRPPrice, currencyFormat));
                    console.log("msrp price= " + apiMSRPPrice);
                    console.log("list price = " + apiListPrice);
                } else {
                    if (priceText === "####") {
                        $(".price-msrp").siblings().hide();
                        $(".price-msrp").hide();
                    }
                }
    
                var discountedPriceText = sheetProductInfo.tprPriceText;
    
                if (canUseAPI_MSRP && apiListPrice !== "" && (apiListPrice < apiMSRPPrice)) { //added
                    discountedPriceText = formatCurrency(apiListPrice, currencyFormat);
                    console.log("discount price = " + discountedPriceText);
                }
    
                if (discountedPriceText !== "####") {
                    $(".price-msrp").before('<span class="x-screen-reader">' + 'Regularly'+ '</span>');
                    $(".price-msrp").closest("strong").css("text-decoration", "line-through").css("margin-right", "12px");
                    $(".price-msrp").closest(".c-caption").append('<strong><span class="price-msrp">' + discountedPriceText + '</span></strong>');
                // $(".price-msrp").closest(".c-caption").append('<strong><span class="price-msrp">$250.00</span></strong>'); for testing
                    $(".price-msrp").closest(".c-caption").css("margin-bottom", "12px");
    
                    // XAA
                    // $(".consolePurchase .price-msrp").closest("span").css("text-decoration", "line-through").css("margin-right", "12px");
                    // $(".consolePurchase .price-msrp").after('<span class="price-msrp">' + discountedPriceText + '</span>');
                }
    
                var clickTitle = sheetProductInfo.itemId;
                //$(".addToCartBtn").attr("aria-label", $(".addToCartBtn").attr("aria-label").replace("consoleName", clickTitle));
    
    
                // XAA Controls
                // if (sheetProductInfo.switchAA === "TRUE") {
                //     $(".hero-pricing p:nth-child(1)").remove();
                //     $(".hero-pricing .addToCartBtn").remove();
                //     $(".buyText").remove();
                //     $(".gotoRetailer").remove();
                //     } else {
                //         $(".hero-pricing p:nth-child(2)").remove();
                //         $(".purchRow2 .hatchProd").removeClass("hiddenImp");
                //         $(".buttonAA").remove();
                //         $(".bannerAA").remove();
                //         $(".purchaseAA").remove();
                //         $("#caret-footnote").remove();
                //         $("#cross-footnote").remove();
                //     }
    
                if (urlRegion === "en-au") {
                    $(".purchaseAA").addClass("enAU");
                }
              
    
                function populate() {
                    if (prodId.split("/")[1] !== undefined) {
                        var sid = prodId.split("/")[1];
                    } else {
                        if (apiData.Products[0]) {
                            var sid = apiData.Products[0].DisplaySkuAvailabilities[0].Sku.SkuId;
                        } else {
                            outOfStock();
                            return false;
                        }
                    }
    
                    if (apiData.Products[0]) {
                        for (var t = 0; t < apiData.Products[0].DisplaySkuAvailabilities.length; t++) {
                            if (apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].SkuId === sid.toUpperCase()) {
                                var availId = apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].AvailabilityId;
                                var ispreorder = apiData.Products[0].DisplaySkuAvailabilities[t].Sku.Properties.IsPreOrder;
                                if (ispreorder.toString().toLowerCase() === "true") {
                                    buttonPreorder();
                                }
                                if (apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].Properties.PreOrderReleaseDate) {
                                    $(".buyText").before('<h3 class="c-heading-3 availableDate"></h3>');
    
                                    var releasedateraw = apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].Properties.PreOrderReleaseDate;
                                    releasedateraw = new Date(releasedateraw);
                                    releasedateraw.setHours(releasedateraw.getHours() + pacificoffset - usertzhours)
                                    var rdYear = releasedateraw.getYear() + 1900;
                                    var rdMonth = releasedateraw.getMonth() + 1;
                                    var rdDay = releasedateraw.getDate();
                                    var zhArray = ["zh-hk", "zh-tw"];
                                    var frArray = ["fr-ca", "fr-be", "fr-ch", "fr-fr"];
                                    var deArray = ["de-at", "de-ch", "de-de"];
                                    var nlArray = ["nl-be", "nl-nl"];
                                    var esArray = ["es-ar", "es-cl", "es-co", "es-mx"];
    
                                    // Available and date groups
                                    var esAvailArray = ["es-ar", "fr-be", "es-cl", "es-co", "es-es", "fr-fr", "es-mx", "fr-ch"];
                                    var engDMAvailArray = ["en-ie", "he-il", "en-nz", "ar-sa", "en-za", "ar-ae", "en-gb"];
                                    var singAvailArray = ["en-hk", "en-in", "en-sg"];
    
                                    if (esAvailArray.indexOf(urlRegion) > -1) {
                                        availConvert("Disponible ", "daymonth");
                                    } else if (engDMAvailArray.indexOf(urlRegion) > -1) {
                                        availConvert("Available ", "daymonth");
                                    } else if (urlRegion === "en-us" || urlRegion === "en-ca") {
                                        availConvert("Available ", "monthday");
                                    } else if (singAvailArray.indexOf(urlRegion) > -1) {
                                        availConvert("Available ", "daymonth");
                                    } else if (urlRegion === "zh-cn") {
                                        availConvert("发布日期", "daymonth");
                                    } else if (urlRegion === "fr-ca") {
                                        availConvert("Disponible ", "monthday");
                                    } else if (urlRegion === "tr-tr") {
                                        availConvert("Satışta ", "daymonth");
                                    } else if (urlRegion === "zh-tw") {
                                        availConvert("金會員免費遊戲 ", "monthday");
                                    }
    
                                    if (deArray.indexOf(urlRegion) > -1) {
                                        availConvert("Erhältlich ", "daymonth");
                                    } else if (nlArray.indexOf(urlRegion) > -1) {
                                        availConvert("Beschikbaar ", "daymonth");
                                    } else if (urlRegion === "ko-kr") {
                                        availConvert("멤버에게 무료 증정", "monthday");
                                    } else if (urlRegion === "cs-cz") {
                                        availConvert("Dostupné ", "daymonth");
                                    } else if (urlRegion === "da-dk") {
                                        availConvert("Tilgængelig ", "daymonth");
                                    } else if (urlRegion === "el-gr") {
                                        availConvert("Διαθέσιμα ", "daymonth");
                                    } else if (urlRegion === "fi-fi") {
                                        availConvert("Saatavilla ", "daymonth");
                                    } else if (urlRegion === "hu-hu") {
                                        availConvert("Elérhető ", "daymonth");
                                    } else if (urlRegion === "it-it") {
                                        availConvert("Disponibile ", "daymonth");
                                    } else if (urlRegion === "nb-no") {
                                        availConvert("Tilgængelig ", "daymonth");
                                    } else if (urlRegion === "pl-pl") {
                                        availConvert("Dostępne ", "daymonth");
                                    } else if (urlRegion === "pt-pt") {
                                        availConvert("Disponível ", "daymonth");
                                    } else if (urlRegion === "ru-ru") {
                                        availConvert("В продаже ", "daymonth");
                                    } else if (urlRegion === "sk-sk") {
                                        availConvert("K dispozícii ", "daymonth");
                                    } else if (urlRegion === "sv-se") {
                                        availConvert("Tillgängligt ", "daymonth");
                                    } else if (urlRegion === "ja-jp") {
                                        availConvert("発売日: ", "ja");
                                    } else if (urlRegion === "pt-br") {
                                        availConvert("Disponível ", "daymonth");
                                    }
    
                                    function availConvert(word, monthday) {
                                        if (monthday === "daymonth") {
                                            var slashdate = rdDay + "/" + rdMonth + "/" + rdYear;
                                        } else if (monthday === "monthday") {
                                            var slashdate = rdMonth + "/" + rdDay + "/" + rdYear;
                                        } else { // for ja-jp
                                            var slashdate = releasedateraw.toLocaleDateString(monthday);
                                        }
                                        var nowDate = new Date();
                                        if (releasedateraw < nowDate) {
                                            hideDate();
                                        }
                                        $(".availableDate").text(word + slashdate);
                                    }
                                } else {
                                    hideDate();
                                }
    
    
                            }
                        }
                    } else {
                        outOfStock();
                        return false;
                    }
    
                    var cartURL = "https://www.microsoft.com/" + urlRegion + "/store/buy?pid=" + prodIdBig + "&sid=" + sid;
                    var interstitial = interstitialText.locales[urlRegion].KeyInterstitial;
                    if (interstitial !== "") {
                        cartURL = cartURL + "&aid=" + availId + "&crosssellid=" + interstitial;
                    }
                    if (sheetProductInfo.switchPurchase === "TRUE") {
                       cartURL =  "https://www.microsoft.com/" + urlRegion + "/p" + "/xbox-one-offer/" + prodIdBig + "/" + sid;
                       }
                    if (specIdBig !== "" && specIdBig !== undefined) {
                        cartURL = "https://www.microsoft.com/" + urlRegion + "/store/build/" + "xbox-one-s-bundle" + "/" + specIdBig;
                    }
                    if (specIdBig !== "" && specIdBig !== undefined && sheetProductInfo.switchPurchase === "TRUE") {
                       cartURL =  "https://www.microsoft.com/" + urlRegion + "/p" + "/xbox-one-offer/" + specIdBig;
                    }
                    if (customATC !== "") {
                        cartURL = customATC;
                    }
                    // $(".purchButton a").attr("href", cartURL);
    
                    var stockUrl = "https://inv.mp.microsoft.com/v2.0/inventory/" + countryCode + "/" + prodIdBig + "/" + sid + "/" + availId;
                    if (specIdBig !== "") {
                        stockUrl = "https://inv.mp.microsoft.com/v2.0/inventory/" + countryCode + "/" + specIdBig + "/" + sid + "/" + availId;
                    }
                    console.log(stockUrl);
                    $.get(stockUrl)
                        .done(function(stockData) {
                            var shipTimes = Object.keys(stockData.futureLots);
                            var futureInstock = "";
                            if (shipTimes.length > 0) {
                                $.each(shipTimes, function() { // Cycles through all future lots to see if in stock.
                                    futureInstock = stockData.futureLots[this]["9000000013"].inStock;
                                    if (futureInstock.toLowerCase() === "true") {
                                        false; // This breaks out of the foreach loop
                                    }
                                });
                            }
                            var instock = stockData.availableLots["0001-01-01T00:00:00.0000000Z"]["9000000013"].inStock;
                            console.log("instock= " + instock);
                            console.log("future instock= " + futureInstock.toString());
                            console.log("pre-order sold out, removing Store button");
                            if (futureInstock.toString().toLowerCase() === "false") {
                              $(".purchButton").remove();
                              $(".hatchProd").removeClass("f-lightweight").addClass("f-heavyweight").css("color", "#054b16");
                            }
                            //console.log("ispreorder= " + ispreorder)
    
                            //MAY NEED TO UPDATE THIS CODE THE NEXT TIME THERE IS  A PRE-ORDER CONSOLE BUNDLE
                            if ((instock.toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() !== "true" */ ) && (futureInstock.toString().toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() === "true"*/ )) {
                                console.log("OOS")
                                outOfStock();
                            }
                        })
                        .fail(function() {
                            outOfStock();
                        })
                    $(".addToCartBtn").css("visibility", "visible").removeClass("hiddenImp");
                    
                }
    
                function outOfStock() {
    
                    if (customATC === "") {
                        $(".addToCartBtn").addClass("hiddenImp");
                        $(".ps-widget").removeClass("ps-theme-1");
                    // All Digital Edition
                         $(".triggerMain").addClass("hiddenImp");
                    }
    
                    if (sheetProductInfo.soldOut === "t") {
                        $(".hero-pricing .c-caption").hide();
                        $(".hatchProd").hide();
                        $(".gotoRetailer").hide();
                        $(".purchRow2").append('<h3 class="c-heading-3">' + regionSoldout["keySoldout"] + '</h3>');
                    }
                }
    
                function hideDate() {
                    $(".availableDate").remove();
                }
    
                function buttonPreorder() {
                    var text = preordertext.locales[urlRegion].keyPreorder.toUpperCase();
                    $(".addToCartBtn").text(text);
                }
    
                // clone to bottom purchase section
                // $(".purchRow1").clone().appendTo(".duplicateBuy");
                // $(".purchRow2").clone().appendTo(".duplicateBuy");
                $(".purchButton").show();
                $(".purchButtonPB").show();
    
            }
    
            // function addLegal() {
            //     console.log("adding first legal");
            //     if (sheetDataLoc[i].legal1.indexOf('*') !== -1) {
            //         if (sheetDataLoc[i].switchAA === "TRUE") {
            //             $(".legalStart").before('<p class="c-caption-1" id="price-legal"><i>' + sheetDataLoc[i].legal1 + '</i></p>');
            //         } else {
            //             $(".legal div div").first().prepend('<p class="c-caption-1" id="price-legal"><i>' + sheetDataLoc[i].legal1 + '</i></p>');
            //         } 
            //     } else {
            //         $(".legal div div").first().append('<p class="c-caption-1"><i>' + sheetDataLoc[i].legal1 + '</i></p>');
            //     }
                
            //     if (sheetDataLoc[i].legal2 !== "") {
            //         console.log("adding second legal");
            //         $(".legal div div").first().append('<p class="c-caption-1"><i>' + sheetDataLoc[i].legal2 + '</i></p>');
            //     }
            //     if (sheetDataLoc[i].legal3 !== "") {
            //         console.log("adding third legal");
            //         $(".legal div div").first().append('<p class="c-caption-1"><i>' + sheetDataLoc[i].legal3 + '</i></p>');
            //     }
            // }
            
            var preordertext = {
                "locales": {
                    "en-us": {
                        "keyPreorder": "Pre-order"
                    },
                    "ar-ae": {
                        "keyPreorder": "Pre-order"
                    },
                    "ar-sa": {
                        "keyPreorder": "Pre-order"
                    },
                    "cs-cz": {
                        "keyPreorder": "Předobjednat"
                    },
                    "da-dk": {
                        "keyPreorder": "Forudbestil"
                    },
                    "de-at": {
                        "keyPreorder": "Vorbestellen"
                    },
                    "de-ch": {
                        "keyPreorder": "Vorbestellen"
                    },
                    "de-de": {
                        "keyPreorder": "Vorbestellen"
                    },
                    "el-gr": {
                        "keyPreorder": "Προπαραγγελία"
                    },
                    "en-au": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-ca": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-gb": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-hk": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-ie": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-in": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-nz": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-sg": {
                        "keyPreorder": "Pre-order"
                    },
                    "en-za": {
                        "keyPreorder": "Pre-order"
                    },
                    "es-ar": {
                        "keyPreorder": "Reservar"
                    },
                    "es-cl": {
                        "keyPreorder": "Reservar"
                    },
                    "es-co": {
                        "keyPreorder": "Reservar"
                    },
                    "es-es": {
                        "keyPreorder": "Reservar"
                    },
                    "es-mx": {
                        "keyPreorder": "Reservar"
                    },
                    "fi-fi": {
                        "keyPreorder": "Tilaa ennakkoon"
                    },
                    "fr-be": {
                        "keyPreorder": "Précommander"
                    },
                    "fr-ca": {
                        "keyPreorder": "Précommander"
                    },
                    "fr-fr": {
                        "keyPreorder": "Précommander"
                    },
                    "fr-ch": {
                        "keyPreorder": "Précommander"
                    },
                    "he-il": {
                        "keyPreorder": "Pre-order"
                    },
                    "hu-hu": {
                        "keyPreorder": "Előrendelés"
                    },
                    "it-it": {
                        "keyPreorder": "Preordina"
                    },
                    "ja-jp": {
                        "keyPreorder": "予約"
                    },
                    "ko-kr": {
                        "keyPreorder": "미리 주문하기"
                    },
                    "nb-no": {
                        "keyPreorder": "Forhåndsbestill"
                    },
                    "nl-be": {
                        "keyPreorder": "Reserveer"
                    },
                    "nl-nl": {
                        "keyPreorder": "Reserveer"
                    },
                    "pl-pl": {
                        "keyPreorder": "przedsprzedaż"
                    },
                    "pt-br": {
                        "keyPreorder": "Pré-venda"
                    },
                    "pt-pt": {
                        "keyPreorder": "Pré-encomendar"
                    },
                    "ru-ru": {
                        "keyPreorder": "Предзаказ"
                    },
                    "sk-sk": {
                        "keyPreorder": "Rezervovať"
                    },
                    "sv-se": {
                        "keyPreorder": "Förbeställ"
                    },
                    "tr-tr": {
                        "keyPreorder": "Ön sipariş verin"
                    },
                    "zh-cn": {
                        "keyPreorder": "预订"
                    },
                    "zh-hk": {
                        "keyPreorder": "預先訂購"
                    },
                    "zh-tw": {
                        "keyPreorder": "預購"
                    }
                }
            }
    
            var interstitialText = {
                "locales": {
                    "en-us": {
                        "KeyInterstitial": "XboxOneInterstitial"
                    },
                    "ar-ae": {
                        "KeyInterstitial": ""
                    },
                    "ar-sa": {
                        "KeyInterstitial": ""
                    },
                    "cs-cz": {
                        "KeyInterstitial": "X1SGenericInterstitial"
                    },
                    "da-dk": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "de-at": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "de-ch": {
                        "KeyInterstitial": "x1sgenericinterstitial"
                    },
                    "de-de": {
                        "KeyInterstitial": "X1XInterstitial"
                    },
                    "el-gr": {
                        "KeyInterstitial": ""
                    },
                    "en-au": {
                        "KeyInterstitial": "Xboxoneconsoles500gbinterstitial"
                    },
                    "en-ca": {
                        "KeyInterstitial": "xboxoneconsolenonrefurbinterstitial "
                    },
                    "en-gb": {
                        "KeyInterstitial": "X1GenericInterstitial"
                    },
                    "en-hk": {
                        "KeyInterstitial": ""
                    },
                    "en-ie": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "en-in": {
                        "KeyInterstitial": ""
                    },
                    "en-nz": {
                        "KeyInterstitial": "Xboxoneconsoles500gbinterstitial"
                    },
                    "en-sg": {
                        "KeyInterstitial": "XboxInterstitial"
                    },
                    "en-za": {
                        "KeyInterstitial": ""
                    },
                    "es-ar": {
                        "KeyInterstitial": ""
                    },
                    "es-cl": {
                        "KeyInterstitial": ""
                    },
                    "es-co": {
                        "KeyInterstitial": ""
                    },
                    "es-es": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "es-mx": {
                        "KeyInterstitial": ""
                    },
                    "fi-fi": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "fr-be": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "fr-ca": {
                        "KeyInterstitial": "xboxoneconsolenonrefurbinterstitial "
                    },
                    "fr-fr": {
                        "KeyInterstitial": "X1SGenericInterstitial"
                    },
                    "fr-ch": {
                        "KeyInterstitial": "x1sgenericinterstitial"
                    },
                    "he-il": {
                        "KeyInterstitial": ""
                    },
                    "hu-hu": {
                        "KeyInterstitial": ""
                    },
                    "it-it": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "ja-jp": {
                        "KeyInterstitial": ""
                    },
                    "ko-kr": {
                        "KeyInterstitial": ""
                    },
                    "nb-no": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "nl-be": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "nl-nl": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "pl-pl": {
                        "KeyInterstitial": "X1SGenericInterstitial"
                    },
                    "pt-br": {
                        "KeyInterstitial": ""
                    },
                    "pt-pt": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "ru-ru": {
                        "KeyInterstitial": ""
                    },
                    "sk-sk": {
                        "KeyInterstitial": ""
                    },
                    "sv-se": {
                        "KeyInterstitial": "XboxOneSInterstitial"
                    },
                    "tr-tr": {
                        "KeyInterstitial": ""
                    },
                    "zh-cn": {
                        "KeyInterstitial": ""
                    },
                    "zh-hk": {
                        "KeyInterstitial": ""
                    },
                    "zh-tw": {
                        "KeyInterstitial": ""
                    }
                }
            }
    
        })();
    
      // Cross Sell will return
      //   var urlRegion = document.URL.split("/")[3].toLowerCase();
    
      //   var translate = (function() {
      //     regionStrings = allBundleStrings.locales[urlRegion]
    
      //      var threeimg1 = regionStrings["keyThreeupimg1"];
      //      var threeimg2 = regionStrings["keyThreeupimg2"];
      //      var threeimg3 = regionStrings["keyThreeupimg3"];
    
      //      $(".threeUp1 h3").html(regionStrings["keyThreeupheadline1"])
      //      $(".threeUp1 a span").text(regionStrings["keyDetailscta1"])
      //      $(".threeUp1 a").attr("href", regionStrings["keyThreeuphref1"])
      //      $(".threeUp1 a").attr("aria-label", regionStrings["keyArialabel1"].replace(/<[^>]*>/g, ""))
      //      $(".threeUp1 img").attr("alt", regionStrings["keyThreeupheadline1"].replace(/<[^>]*>/g, ""))
    
      //      $(".threeUp2 h3").html(regionStrings["keyThreeupheadline2"])
      //      $(".threeUp2 a span").text(regionStrings["keyDetailscta2"])
      //      $(".threeUp2 a").attr("href", regionStrings["keyThreeuphref2"])
      //      $(".threeUp2 a").attr("aria-label", regionStrings["keyArialabel2"].replace(/<[^>]*>/g, ""))
      //      $(".threeUp2 img").attr("alt", regionStrings["keyThreeupheadline2"].replace(/<[^>]*>/g, ""))
    
      //      $(".threeUp3 h3").html(regionStrings["keyThreeupheadline3"])
      //      $(".threeUp3 a span").text(regionStrings["keyDetailscta3"])
      //      $(".threeUp3 a").attr("href", regionStrings["keyThreeuphref3"])
      //      $(".threeUp3 a").attr("aria-label", regionStrings["keyArialabel3"].replace(/<[^>]*>/g, ""))
      //      $(".threeUp3 img").attr("alt", regionStrings["keyThreeupheadline3"].replace(/<[^>]*>/g, ""))
    
      //    // Bundle One Offs
      //     var regionCode = document.URL.split("/")[6];
      //     var bundleCode1 = regionStrings["keyThreeuphref1"].toLowerCase().split("/")[5];
      //     var bundleCode2 = regionStrings["keyThreeuphref2"].toLowerCase().split("/")[5];
      //     var bundleCode3 = regionStrings["keyThreeuphref3"].toLowerCase().split("/")[5];
    
      //       if (regionCode === bundleCode1) {
      //         threeimg1 = regionStrings["keyThreeupimgaltern"]
      //        $(".threeUp1 h3").html(regionStrings["keyThreeupheadlinealtern"])
      //        $(".threeUp1 a").attr("href", regionStrings["keyThreeuphrefaltern"])
      //        $(".threeUp1 a").attr("aria-label", regionStrings["keyArialabel4"])
      //        $(".threeUp1 img").attr("alt", regionStrings["keyThreeupheadlinealtern"])
      //       }
    
      //       if (regionCode === bundleCode2) {
      //         threeimg2 = regionStrings["keyThreeupimgaltern"]
      //        $(".threeUp2 h3").html(regionStrings["keyThreeupheadlinealtern"])
      //        $(".threeUp2 a").attr("href", regionStrings["keyThreeuphrefaltern"])
      //        $(".threeUp2 a").attr("aria-label", regionStrings["keyArialabel4"])
      //        $(".threeUp2 img").attr("alt", regionStrings["keyThreeupheadlinealtern"])
      //       }
    
      //       if (regionCode === bundleCode3) {
      //         threeimg3 = regionStrings["keyThreeupimgaltern"]
      //        $(".threeUp3 h3").html(regionStrings["keyThreeupheadlinealtern"])
      //        $(".threeUp3 a").attr("href", regionStrings["keyThreeuphrefaltern"])
      //        $(".threeUp3 a").attr("aria-label", regionStrings["keyArialabel4"])
      //        $(".threeUp3 img").attr("alt", regionStrings["keyThreeupheadlinealtern"])
      //       }
    
      //      $(".threeUp1 source").attr("srcset", threeimg1)
      //      $(".threeUp1 img").attr("srcset", threeimg1).attr("src", threeimg1)
    
      //      $(".threeUp2 source").attr("srcset", threeimg2)
      //      $(".threeUp2 img").attr("srcset", threeimg2).attr("src", threeimg2)
    
      //      $(".threeUp3 source").attr("srcset", threeimg3)
      //      $(".threeUp3 img").attr("srcset", threeimg3).attr("src", threeimg3)
    
    
      //   })();
    
      // pre-order for x and s
      $(".buy-group a.purchButton").attr("target", "blank");
    
      var preorderLocales = "en-au, en-hk, en-in, en-nz, en-sg, zh-hk, zh-tw, ko-kr, •ar-ae, ar-sa, cs-cz, da-dk, de-at, de-ch, de-de, el-gr, en-gb, en-ie, es-es, fi-fi, fr-be, fr-ch, fr-fr, he-il, hu-hu, it-it, nb-no, nl-be, nl-nl, pl-pl, pt-pt, sk-sk, sv-se, tr-tr, en-us, en-ca, fr-ca, ja-jp, es-co, pt-br,es-ar";
      if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
        preorderLocales = "en-au, en-hk, en-in, en-nz, en-sg, zh-hk, zh-tw, ko-kr, •ar-ae, ar-sa, cs-cz, da-dk, de-at, de-ch, de-de, el-gr, en-gb, en-ie, es-es, fi-fi, fr-be, fr-ch, fr-fr, he-il, hu-hu, it-it, nb-no, nl-be, nl-nl, pl-pl, pt-pt, sk-sk, sv-se, tr-tr, en-us, en-ca, fr-ca, es-co, ja-jp, pt-br,es-ar";
      }
    
      if (preorderLocales.indexOf(urlRegion) === -1) {
        var lm = lmCopy.locales[urlRegion].keyLearnmore;
        var consText = $(".c-in-page-navigation .c-heading-6").first().text();
        $(".CTAdiv button span").text(lm);
        $(".CTAdiv button span").attr("aria-label", lm + ", " + consText)
        $(".CTAdiv button span").css("visibility", "visible");
        $(".page-hero .fade-in .heroPrice").remove();
        $(".page-hero .fade-in [href='#purchase']").remove();
        $(".buy-group").remove();
      } else {
        $(".buy-group").removeClass("hidden");
        $(".CTAdiv button span").css("visibility", "visible");
        $(".page-hero .fade-in .heroPrice").css("visibility", "visible");
        $(".page-hero .fade-in [href='#purchase']").css("visibility", "visible");
        $(".buy-group").css("visibility", "visible");
      }
      var hatchlocs = ["de-de", "en-au", "en-ie", "en-nz", "en-us", "en-ca", "en-gb", "es-co", "es-es", "es-mx", "fr-ca", "fr-fr", "it-it", "nl-nl", "sv-se", "pt-br", "pl-pl"];
      if (hatchlocs.indexOf(urlRegion) === -1) {
        $(".hatchProd").removeClass("hatchProd"); 
      }
      if (document.URL.toLowerCase().indexOf("xbox-series-x") !== -1) {
        $(".buy-group a.c-call-to-action.f-lightweight").css("color", "#9bf00b");
      }
      var hidePricelocs = ["tr-tr","el-gr"];
      if (hidePricelocs.indexOf(urlRegion) !== -1) {
          $(".page-hero .fade-in .heroPrice").remove();
          $(".monthlyPrice.price-msrp").remove();
          $(".CTAdiv .price-callout").remove();
        }
      var xaaLocales = ["da-dk","en-au","en-ca","en-gb","en-us","en-nz","fi-fi","nb-no","sv-se"];
      if (xaaLocales.indexOf(urlRegion) !== -1) {
          $(".buy-group .hatchProd").removeClass("f-lightweight").addClass("f-heavyweight").css("color", "#054b16");
        }
    
    });
  
    
    
    //If you don't send in the format from the PriceFormat JSON, you're going to have a bad time.
    function formatCurrency(price, format) {
        var formattedPrice = "" + price;
        if (!format.keyHasDecimal) {
            formattedPrice = formattedPrice.split(".")[0];
        } else if (formattedPrice.indexOf(".99") === -1) {
            formattedPrice = formattedPrice.split(".")[0] + ".00";
        }
        if (formattedPrice.split(".")[0].length > 3) { // Needs to figure out thousands
            //console.log("splitting thousands");
            if (!format.keyHasDecimal) {
                formattedPrice = formattedPrice.substring(0, formattedPrice.length - 3) + "*" + formattedPrice.substring(formattedPrice.length - 3, formattedPrice.length);
            } else {
                formattedPrice = formattedPrice.substring(0, formattedPrice.length - 6) + "*" + formattedPrice.substring(formattedPrice.length - 6, formattedPrice.length);
            }
        }
        if (formattedPrice.split(".")[0].length > 7) { // Needs to figure out millions
            //console.log("splitting millions");
            if (!format.keyHasDecimal) {
                formattedPrice = formattedPrice.substring(0, formattedPrice.length - 7) + "MMM" + formattedPrice.substring(formattedPrice.length - 7, formattedPrice.length);
            } else {
                formattedPrice = formattedPrice.substring(0, formattedPrice.length - 10) + "MMM" + formattedPrice.substring(formattedPrice.length - 10, formattedPrice.length);
            }
        }
        
        if (format.keyThousandCharacter === ",") {
            //console.log("replacing thousand");
            formattedPrice = formattedPrice.replace("*", format.keyThousandCharacter);
            formattedPrice = formattedPrice.replace("MMM", format.keyThousandCharacter);
        } else {
            //console.log("replacing period");
            formattedPrice = formattedPrice.replace(".", ",");
            formattedPrice = formattedPrice.replace("*", format.keyThousandCharacter);
            formattedPrice = formattedPrice.replace("MMM", format.keyThousandCharacter);
        }
    
        formattedPrice = "" + format.keyPriceFormat.replace("#", formattedPrice);
    
        return formattedPrice;
    }
    
    }



      // SHARE button functionality 
  
      $(".shareLink").click(function() {
          shareboxTarget = "#" + $(this).attr("aria-controls");
          if ($(shareboxTarget).hasClass("open")) {
              $(shareboxTarget).removeClass("open").attr("aria-hidden", "true");
              $(".copy-block").removeClass("copied");
              $(".copy").each(function() {
                  $(this).attr("tabindex", "0").text($(this).attr("data-copy-default"));
              })
              $(this).attr("aria-expanded", "false");
          } else {
              $(shareboxTarget).addClass("open").attr("aria-hidden", "false");
              $(this).attr("aria-expanded", "true");
          }
      });
      $(".share-close").click(function() {
          parentLink = $(this).closest(".sharelink-wrapper").find(".shareLink");
          shareboxTarget = "#" + $(parentLink).attr("aria-controls");
          if ($(shareboxTarget).hasClass("open")) {
              $(shareboxTarget).removeClass("open").attr("aria-hidden", "true");
              $(".copy-block").removeClass("copied");
              $(".copy").each(function() {
                  $(this).attr("tabindex", "0").text($(this).attr("data-copy-default"));
              })
              $(parentLink).attr("aria-expanded", "false").focus();
          } else {
              $(shareboxTarget).addClass("open").attr("aria-hidden", "false");
              $(parentLink).attr("aria-expanded", "true");
          }
      });
      $(".copy").click(function() {
          $(".copy").each(function() {
            $(this).attr("aria-live" , "");
            $(this).attr("tabindex", "0").text($(this).attr("data-copy-default"));
          })
          $(this).attr("aria-live" , "assertive");
          $(this).attr("tabindex", "-1").text($(this).attr("data-copy-copied"));
     
          copiedText = "https://www." + $(this).prev(".share-textbox").find(".sharelink-link").text() + "\n" + $(this).prev(".share-textbox").find(".sharelink-text").text();
          console.log("copiedText " + copiedText);
          $(".copy-temp").text(copiedText);
          $(".copy-temp").select();
          document.execCommand("copy");
          //$(".copy-temp").text("");
          $(".copy-block").removeClass("copied");
          $(this).closest(".copy-block").addClass("copied");
          $(this).focus();
      
      });
  
  });
  
  priceFormat = {
        "locales": {
            "en-us": {
                "keyPriceFormat": "$# ",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "ar-ae": {
                "keyPriceFormat": "AED #",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "ar-sa": {
                "keyPriceFormat": "SR #",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," //no decimal
            },
            "cs-cz": {
                "keyPriceFormat": "# Kč",
                "keyHasDecimal": false,
                "keyThousandCharacter": " " //space replace comma, no decimal
            },
            "da-dk": {
                "keyPriceFormat": "# kr",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "de-at": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "de-ch": {
                "keyPriceFormat": "CHF #",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "de-de": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "el-gr": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-au": {
                "keyPriceFormat": "$# ",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-ca": {
                "keyPriceFormat": "$# ",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-gb": {
                "keyPriceFormat": "£#",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-hk": {
                "keyPriceFormat": "HK$#",
                "keyHasDecimal": true,
                "keyThousandCharacter": "," //no decimal
            },
            "en-ie": {
                "keyPriceFormat": "€ #",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-in": {
                "keyPriceFormat": "₹ #",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-nz": {
                "keyPriceFormat": "$# ",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "en-sg": {
                "keyPriceFormat": "SG$#",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," // no decimal
            },
            "en-za": {
                "keyPriceFormat": "R#",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "es-ar": {
                "keyPriceFormat": "$ #",
                "keyHasDecimal": false,
                "keyThousandCharacter": "."
            },
            "es-cl": {
                "keyPriceFormat": "$#",
                "keyHasDecimal": false,
                "keyThousandCharacter": "."
            },
            "es-co": {
                "keyPriceFormat": "$#",
                "keyHasDecimal": false,
                "keyThousandCharacter": "."
            },
            "es-es": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "es-mx": {
                "keyPriceFormat": "$#",
                "keyHasDecimal": false,
                "keyThousandCharacter": ","
            },
            "fi-fi": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "."
            },
            "fr-be": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "."
            },
            "fr-ca": {
                "keyPriceFormat": "# $",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," //no decimal
            },
            "fr-ch": {
                "keyPriceFormat": "CHF #",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "fr-fr": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "he-il": {
                "keyPriceFormat": "₪‎#",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "hu-hu": {
                "keyPriceFormat": "# HUF",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "it-it": {
                "keyPriceFormat": "€#",
                "keyHasDecimal": true,
                "keyThousandCharacter": "."
            },
            "ja-jp": {
                "keyPriceFormat": "¥# (税抜)",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," //no decimal
            },
            "ko-kr": {
                "keyPriceFormat": "₩#",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," //no decimal
            },
            "nb-no": {
                "keyPriceFormat": "# kr",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "nl-be": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "nl-nl": {
                "keyPriceFormat": "€ #",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "pl-pl": {
                "keyPriceFormat": "# zł",
                "keyHasDecimal": true,
                "keyThousandCharacter": " " // comma replace period, space replace comma
            },
            "pt-br": {
                "keyPriceFormat": "R$ #",
                "keyHasDecimal": false,
                "keyThousandCharacter": "."
            },
            "pt-pt": {
                "keyPriceFormat": "#€",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." //period comma reversed
            },
            "ru-ru": {
                "keyPriceFormat": "# ₽",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "sk-sk": {
                "keyPriceFormat": "# €",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," // no decimal
            },
            "sv-se": {
                "keyPriceFormat": "# kr",
                "keyHasDecimal": true,
                "keyThousandCharacter": "." // no comma
            },
            "tr-tr": {
                "keyPriceFormat": "# ₺",
                "keyHasDecimal": true,
                "keyThousandCharacter": ","
            },
            "zh-hk": {
                "keyPriceFormat": "HK$#",
                "keyHasDecimal": true,
                "keyThousandCharacter": "," //no decimal
            },
            "zh-tw": {
                "keyPriceFormat": "NT$#",
                "keyHasDecimal": false,
                "keyThousandCharacter": "," //no decimal
            }
        }
    }
    
    globalSoldout = {
      "locales": {
        "en-us": {
          "keySoldout": "Sold Out"
        },
        "ar-ae": {
          "keySoldout": "Sold Out"
        },
        "ar-sa": {
          "keySoldout": "Sold Out"
        },
        "cs-cz": {
          "keySoldout": " Vyprodáno"
        },
        "da-dk": {
          "keySoldout": "Udsolgt"
        },
        "de-at": {
          "keySoldout": " Ausverkauft"
        },
        "de-ch": {
          "keySoldout": " Ausverkauft"
        },
        "de-de": {
          "keySoldout": " Ausverkauft"
        },
        "el-gr": {
          "keySoldout": " Έχει εξαντληθεί"
        },
        "en-au": {
          "keySoldout": "Sold Out"
        },
        "en-ca": {
          "keySoldout": "Sold Out"
        },
        "en-gb": {
          "keySoldout": "Sold Out"
        },
        "en-hk": {
          "keySoldout": "Sold Out"
        },
        "en-ie": {
          "keySoldout": "Sold Out"
        },
        "en-in": {
          "keySoldout": "Sold Out"
        },
        "en-nz": {
          "keySoldout": "Sold Out"
        },
        "en-sg": {
          "keySoldout": "Sold Out"
        },
        "en-za": {
          "keySoldout": "Sold Out"
        },
        "es-ar": {
          "keySoldout": "Agotado"
        },
        "es-cl": {
          "keySoldout": "Agotado"
        },
        "es-co": {
          "keySoldout": "Agotado"
        },
        "es-es": {
          "keySoldout": " Agotado"
        },
        "es-mx": {
          "keySoldout": "Agotado"
        },
        "fi-fi": {
          "keySoldout": " Loppuunmyyty"
        },
        "fr-be": {
          "keySoldout": " Épuisé"
        },
        "fr-ca": {
          "keySoldout": " En rupture de stock"
        },
        "fr-ch": {
          "keySoldout": " Épuisé"
        },
        "fr-fr": {
          "keySoldout": " Épuisé"
        },
        "he-il": {
          "keySoldout": "Sold Out"
        },
        "hu-hu": {
          "keySoldout": "Elfogyott"
        },
        "it-it": {
          "keySoldout": " Esaurito"
        },
        "ja-jp": {
          "keySoldout": " 完売"
        },
        "ko-kr": {
          "keySoldout": " 품절"
        },
        "nb-no": {
          "keySoldout": "Utsolgt "
        },
        "nl-be": {
          "keySoldout": "Uitverkocht"
        },
        "nl-nl": {
          "keySoldout": "Uitverkocht"
        },
        "pl-pl": {
          "keySoldout": " Wyprzedane"
        },
        "pt-br": {
          "keySoldout": " Esgotado"
        },
        "pt-pt": {
          "keySoldout": " Esgotado"
        },
        "ru-ru": {
          "keySoldout": " Распродано"
        },
        "sk-sk": {
          "keySoldout": " Vypredané"
        },
        "sv-se": {
          "keySoldout": " Utsåld"
        },
        "tr-tr": {
          "keySoldout": " Tükendi"
        },
        "zh-hk": {
          "keySoldout": "售罄"
        },
        "zh-tw": {
          "keySoldout": "售罄"
        }
      }
    }
  
  lmCopy = {
      "locales": {
        "en-us": {
          "keyLearnmore": "LEARN MORE"
        },
        "ar-ae": {
          "keyLearnmore": "LEARN MORE"
        },
        "ar-sa": {
          "keyLearnmore": "LEARN MORE"
        },
        "cs-cz": {
          "keyLearnmore": "DALŠÍ INFORMACE"
        },
        "da-dk": {
          "keyLearnmore": "FÅ MERE AT VIDE"
        },
        "de-at": {
          "keyLearnmore": "MEHR ERFAHREN"
        },
        "de-ch": {
          "keyLearnmore": "MEHR ERFAHREN"
        },
        "de-de": {
          "keyLearnmore": "MEHR ERFAHREN"
        },
        "el-gr": {
          "keyLearnmore": "ΜΑΘΕΤΕ ΠΕΡΙΣΣΟΤΕΡΑ"
        },
        "en-au": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-ca": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-gb": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-hk": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-ie": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-in": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-nz": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-sg": {
          "keyLearnmore": "LEARN MORE"
        },
        "en-za": {
          "keyLearnmore": "LEARN MORE"
        },
        "es-ar": {
          "keyLearnmore": "MÁS INFORMACIÓN"
        },
        "es-cl": {
          "keyLearnmore": "MÁS INFORMACIÓN"
        },
        "es-co": {
          "keyLearnmore": "MÁS INFORMACIÓN"
        },
        "es-es": {
          "keyLearnmore": "DESCUBRE MÁS"
        },
        "es-mx": {
          "keyLearnmore": "MÁS INFORMACIÓN"
        },
        "fi-fi": {
          "keyLearnmore": "LUE LISÄÄ"
        },
        "fr-be": {
          "keyLearnmore": "EN SAVOIR PLUS"
        },
        "fr-ca": {
          "keyLearnmore": "EN SAVOIR PLUS"
        },
        "fr-ch": {
          "keyLearnmore": "EN SAVOIR PLUS"
        },
        "fr-fr": {
          "keyLearnmore": "EN SAVOIR PLUS"
        },
        "he-il": {
          "keyLearnmore": "LEARN MORE"
        },
        "hu-hu": {
          "keyLearnmore": "TOVÁBBI INFORMÁCIÓ"
        },
        "it-it": {
          "keyLearnmore": "SCOPRI DI PIÙ"
        },
        "ja-jp": {
          "keyLearnmore": "詳細について"
        },
        "ko-kr": {
          "keyLearnmore": "자세한 정보"
        },
        "nb-no": {
          "keyLearnmore": "FINN UT MER"
        },
        "nl-be": {
          "keyLearnmore": "MEER INFO"
        },
        "nl-nl": {
          "keyLearnmore": "MEER INFO"
        },
        "pl-pl": {
          "keyLearnmore": "DOWIEDZ SIĘ WIĘCEJ"
        },
        "pt-br": {
          "keyLearnmore": "SAIBA MAIS"
        },
        "pt-pt": {
          "keyLearnmore": "SABER MAIS"
        },
        "ru-ru": {
          "keyLearnmore": "ПОДРОБНОСТИ"
        },
        "sk-sk": {
          "keyLearnmore": "ZISTIŤ VIAC"
        },
        "sv-se": {
          "keyLearnmore": "LÄS MER"
        },
        "tr-tr": {
          "keyLearnmore": "DAHA FAZLA BILGI EDININ"
        },
        "zh-hk": {
          "keyLearnmore": "詳細介紹"
        },
        "zh-tw": {
          "keyLearnmore": "詳細介紹"
        }
      }
      }
    
      tempOos = {
      "locales": {
        "en-us": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "ar-ae": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "ar-sa": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "cs-cz": {
          "keyTemporarilyoutofstock": "Dočasně není skladem."
        },
        "da-dk": {
          "keyTemporarilyoutofstock": "Midlertidigt udsolgt."
        },
        "de-at": {
          "keyTemporarilyoutofstock": "Vorübergehend nicht auf Lager."
        },
        "de-ch": {
          "keyTemporarilyoutofstock": "Vorübergehend nicht auf Lager."
        },
        "de-de": {
          "keyTemporarilyoutofstock": "Vorübergehend nicht auf Lager."
        },
        "el-gr": {
          "keyTemporarilyoutofstock": "Προσωρινά χωρίς απόθεμα."
        },
        "en-au": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-ca": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-gb": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-hk": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-ie": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-in": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-nz": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-sg": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "en-za": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "es-ar": {
          "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "es-cl": {
          "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "es-co": {
          "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "es-es": {
          "keyTemporarilyoutofstock": "Temporalmente agotado."
        },
        "es-mx": {
          "keyTemporarilyoutofstock": "Temporalmente fuera de stock."
        },
        "fi-fi": {
          "keyTemporarilyoutofstock": "Tilapäisesti loppu."
        },
        "fr-be": {
          "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "fr-ca": {
          "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "fr-ch": {
          "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "fr-fr": {
          "keyTemporarilyoutofstock": "Temporairement en rupture de stock."
        },
        "he-il": {
          "keyTemporarilyoutofstock": "Temporarily out of stock."
        },
        "hu-hu": {
          "keyTemporarilyoutofstock": "Jelenleg nincs raktáron."
        },
        "it-it": {
          "keyTemporarilyoutofstock": "Temporaneamente esaurito."
        },
        "ja-jp": {
          "keyTemporarilyoutofstock": "ただいま在庫はありません。"
        },
        "ko-kr": {
          "keyTemporarilyoutofstock": "일시적으로 재고가 없습니다."
        },
        "nb-no": {
          "keyTemporarilyoutofstock": "Midlertidig utsolgt."
        },
        "nl-be": {
          "keyTemporarilyoutofstock": "Tijdelijk niet op voorraad."
        },
        "nl-nl": {
          "keyTemporarilyoutofstock": "Tijdelijk niet op voorraad."
        },
        "pl-pl": {
          "keyTemporarilyoutofstock": "Tymczasowo niedostępny."
        },
        "pt-br": {
          "keyTemporarilyoutofstock": "Temporariamente fora de estoque."
        },
        "pt-pt": {
          "keyTemporarilyoutofstock": "Temporariamente esgotado."
        },
        "ru-ru": {
          "keyTemporarilyoutofstock": "Временно нет в наличии."
        },
        "sk-sk": {
          "keyTemporarilyoutofstock": "Dočasne nie je na sklade."
        },
        "sv-se": {
          "keyTemporarilyoutofstock": "Tillfälligt slut."
        },
        "tr-tr": {
          "keyTemporarilyoutofstock": "Geçici olarak stokta yok."
        },
        "zh-hk": {
          "keyTemporarilyoutofstock": "暫時缺貨。"
        },
        "zh-tw": {
          "keyTemporarilyoutofstock": "暫時缺貨。"
        }
      }
    } 