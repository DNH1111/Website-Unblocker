$(document).ready(function() {
  var x1Pop = (function() {
    var urlRegion = document.URL.split("/")[3].toLowerCase();
   // $(".gameDiv a").each(function() {
     // var rawHref = $(this).attr("href")
     // var splitHref = rawHref.split("/")
     // splitHref.splice(3, 0, urlRegion)
     // var newHref = splitHref.join("/")
     // $(this).attr("href", newHref)
    //})
  })();

  var GUID_pop = (function() {
    var urlRegion = document.URL.split("/")[3].toLowerCase();
    var countryCode = urlRegion.split("-")[1].toUpperCase();
    var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
    var rawGuids = []
    $(".gameDivsWrapper .gameDiv[data-bigid]").each(function() {
      var biRaw = $(this).attr("data-bigid")
      rawGuids.push(biRaw)
    });

    var first12 = rawGuids.slice(0,12)
    rawGuids = rawGuids.slice(12)

    // var apiData

    var firstToUrl = first12.join(",");
    guidUrl = guidUrl.replace("GAMEIDS", firstToUrl)
    $.get(guidUrl)
        .done(function(responseData) {
          var apiData = responseData;
          populate(apiData, 0);
          guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
          restPop();
        })

    var restPop = function() {
      var m,n,temparray,chunk = 20;
      var arrayCount = 1
      for (m=0,n=rawGuids.length; m<n; m+=chunk) {
        temparray = rawGuids.slice(m,m+chunk);
        var guidsToUrl = temparray.join(",");
        guidUrl = guidUrl.replace("GAMEIDS", guidsToUrl)

        $.get(guidUrl)
          .done(function(responseData) {
            var apiData = responseData;
            populate(apiData, arrayCount);
            arrayCount++
          })
        guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=GAMEIDS&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
      }
    }

    

    var populate = function(data, count) {
      var productQuantity = data.Products.length
      for (var i = 0; i < productQuantity; i ++) {
        var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle
        // get boxshot
        var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
        var imageInd = 1;
        for (var j = 0; j < imagesNum; j++) {
          if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "Poster") {
            imageInd = j;
            break;
          }
        }
          if (imageInd === 999) {
            for (var j = 0; j < imagesNum; j++) {
              if (data.Products[i].LocalizedProperties[0].Images[j].Width < data.Products[i].LocalizedProperties[0].Images[j].Height) {
                imageInd = j;
                break;
              }
            }
          }
          if (imageInd === 999) {
            imageInd = 1
          }
        var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri
        if (itemBoxshot.indexOf("xboxlive.com") !== -1) {itemBoxshot = itemBoxshot + "&w=300&format=jpg"; }
        var itemId = data.Products[i].ProductId.toUpperCase();

        $(".gameDiv[data-bigid=" + itemId + "] .x1GameName").text(itemTitle);
        $(".gameDiv[data-bigid=" + itemId + "] .containerIMG img").eq(0).attr("src", itemBoxshot);
       if (itemId === "9NBLGGH1Z6FQ") {
         $(".gameDiv[data-bigid=9NBLGGH1Z6FQ] .containerIMG img").eq(0).attr("src", "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg");
       }
       if (itemId === "BZFK7WNK7R4M") {
         $(".gameDiv[data-bigid=BZFK7WNK7R4M] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-");
       }   
       if (itemId === "BPRBLWPLFRV9") {
         $(".gameDiv[data-bigid=BPRBLWPLFRV9] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcbjCWpWN_wuCtVI2oZGvzJrMh9RtT6puJeT9ykqv0ymrmAqohL2OtVJm9ntr_fvyyZjdqkWmcWDEdQLRej28UxqHegadN2DLj8yGNYAuuGbNmREkWnGsVRT5G.FM08ISP3ZH.3m_17uorGvkeaMRY_QRHMkTsqQ4Q8Yp6weCKeyM-");
       }  
       if (itemId === "9NBLGGH515BD") {
         $(".gameDiv[data-bigid=9NBLGGH515BD] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcjeeFHhdIgBoZS9Q4bvDyus8WGsjkEG9X5wm5NEgcMHdbYltp78TVxyUdcNGcUa7YsM839UDRUdgWRmj7uB1dq20Xspnkagyf53k5voenJRpajm8RJlZpzKlXOYTWeJfT0.O67o9hVqSYllDpJkeNyRD6_1s9k3ysDddea3Ii3KE-");
       } 
       if (itemId === "9NBLGGH515DC") {
         $(".gameDiv[data-bigid=9NBLGGH515DC] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTczrno_XEgWQv6tG5joAa0ybIbTffOPxH1jo745jlmxEKA8BGkYMUPh_T9e6AIDQZLpqiizsE1IQ4VfmGJ2hGXxxxx4UOeXAEEfVznH4R2IIGR8YBkc05gwkwxv67lkzVlPHtYx5JZpReM_6ew_v4v8Oxr0UFnh6Cu5u6LufX2pUE-");
       }     
       if (itemId === "BTVFFDDZ0TL4") {
         $(".gameDiv[data-bigid=BTVFFDDZ0TL4] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcoYBrJRe6ocDBW_8MGfBUlzYTrjKUmdO25Ts6oNYyGWBtEY9HgSGz4ZKupxorSQ7UyZgBxgjAaqPdoRmuz_9XsG.VD0RyWDPCQERXAG2Wt5C_EYElS.BvrYWObRm5e9Ju.yJyBvQ1BURryRnZ5OxijggG0w0xy3en6t6.k8cXXcg-&w=300&format=jpg");
       } 
       if (itemId === "BZG2WCMLWJKR") {
         $(".gameDiv[data-bigid=BZG2WCMLWJKR] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcGB4JGulVw8lYpem21FP1DH1yyJD3h4U98HTCmgpZrHTfkyWpwughVrsv6URQ.mWgJotfP0cOks05Kr_8ofEt2IjFLIxkLLeJZhnByJ5ay8DKvNH1ZfC1D4YO.wodSamcB9s9QqROlkugivrOY.Qbeh_57imb8cnM.7BiqmhEWWI-&w=300&format=jpg");
       }  
       if (itemId === "C4CXKS1DSMLB") {
         $(".gameDiv[data-bigid=C4CXKS1DSMLB] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTceENxw7j5Y1Udtm8b29u05VImA3zzXtK9X6vGb3PrvvsISbrX_aq5ltmpjeLO20TB.nL71U7dVZL025UGeo7jJRPk.eEnpGXQ9JthBcNy6uw8HNyZZ5Ma_4Li7c6sn6GxIG5UhLS14jCjnoFURtprCUJ7mfAIUq0kG2kpgV3HMNE-&w=300&format=jpg");
       }  
       if (itemId === "BZ7982MK3FWD") {
         $(".gameDiv[data-bigid=BZ7982MK3FWD] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcT56MVvhD0ANIHQZuherZ7oZ3.lrIObTGXqX._idjQxppfUNDMENrJzP7SbpAPug1sDEozmCeUdG3esTIKkv6oIPuEBfc.Dm_ROUd6qoTm8a0f2i7Ufzd3zqBixhve1TGmjEzvDbA6XGcVr9Ihap81hBUN5rYupqeGeP4WYL5neI-&w=300&format=jpg");
       }  
       if (itemId === "BPKVH4C4XV4N") {
         $(".gameDiv[data-bigid=BPKVH4C4XV4N] .containerIMG img").attr("src", "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcI1EC6UO.aAqbDtyIDQVzAfcMusrAw9Tyzr8qAp7wcMyfHpiIbLrNDCuBvG6kb8Cc5YjTtE3p9uxmBF9cgO.OtE90HiydOx60xlp4qYq_iC1r7NSKHjsAYU0bGJmT7AcYxHyVXxIwYLbIGBUt1orWJu1Lh3a6V1WoiIw6vlePnbo-&w=300&format=jpg");
       }    
      }
      if (count === 2) {
        setTimeout(function() {
          GAMES_SHOWHIDE.init()
        }, 1000)
      }
    
    }
   // if (urlRegion === "en-us") {
      //$(".gameDiv").each(function() {
       // var pricefull = $(this).attr("data-pricefull");
        //var pricediscount = $(this).attr("data-pricediscount");
        //$(this).find(".badge-silver").text("").html('<span><del>' + pricefull + '</del></span><span style="margin-left:10px">' + pricediscount + '</span>');
      //})
   // }
    $(".badge-silver").css("visibility", "visible");
    
  })();
});