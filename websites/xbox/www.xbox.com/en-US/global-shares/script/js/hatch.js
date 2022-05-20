(function() {
    var urlRegion = document.URL.toLowerCase().split("xbox.com/")[1].slice(0, 5);
    var userCountry = urlRegion.split("-")[1];
    hatchCSS();
    idprfx = "XB19_"
    allProdData = {};
    locstrings = {
    "locales": {
      "de-de": {
        "keyBuynow": "JETZT KAUFEN",
        "keyPreorder": "VORBESTELLEN",
        "keyGetDetails": "MEHR ERFAHREN",
        "keySoldout": " Ausverkauft",
        "keyLegaltext": "Sie sind dabei, <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> zu verlassen und auf eine externe Website zuzugreifen, deren Datenschutzerklärung und Bedingungen gelten. Microsoft ist nicht verantwortlich für die Datenschutzerklärung, den Inhalt oder die Fehlerfreiheit externer Websites. Alle Spezifikationen können ohne Vorankündigung geändert werden. Bitte erkundige dich beim jeweiligen Händler nach entsprechenden Angeboten. Produkte sind möglicherweise nicht in allen Märkten erhältlich. Die angezeigten Preise sind aktuelle Niedrigstpreise der angegebenen Händler und können sich ändern. Sofern nicht anders angegeben, werden die Preise nicht von Microsoft angeboten.",
        "keyPricestrings": "<<PLACEHOLDER>> €",
        "keyPermonth": "/month for 24 months"
      },
      "en-au": {
        "keyBuynow": "BUY NOW",
        "keyPreorder": "PRE-ORDER",
        "keyGetDetails": "GET DETAILS",
        "keySoldout": "Out of Stock",
        "keyLegaltext": "You are about to leave <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> and access an external website, whose privacy policy, term and condition will apply. Microsoft is not responsible for the privacy policy, content, or accuracy of external websites. All specifications are subject to change without notice. Please check each retailer for exact offers. Products may not be available in all markets. Displayed prices are current lowest prices offered by stated retailers and are subject to change. Prices are not offered by Microsoft unless stated.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/month for 24 months"
      },
      "en-ie": {
        "keyBuynow": "BUY NOW",
        "keyPreorder": "PRE-ORDER",
        "keyGetDetails": "GET DETAILS",
        "keySoldout": "Out of Stock",
        "keyLegaltext": "You are about to leave <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> and access an external website, whose privacy policy, term and condition will apply. Microsoft is not responsible for the privacy policy, content, or accuracy of external websites. All specifications are subject to change without notice. Please check each retailer for exact offers. Products may not be available in all markets. Displayed prices are current lowest prices offered by stated retailers and are subject to change. Prices are not offered by Microsoft unless stated.",
        "keyPricestrings": " €<<PLACEHOLDER>>",
        "keyPermonth": "/month for 24 months"
      },
      "en-nz": {
        "keyBuynow": "BUY NOW",
        "keyPreorder": "PRE-ORDER",
        "keyGetDetails": "GET DETAILS",
        "keySoldout": "Out of Stock",
        "keyLegaltext": "You are about to leave <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> and access an external website, whose privacy policy, term and condition will apply. Microsoft is not responsible for the privacy policy, content, or accuracy of external websites. All specifications are subject to change without notice. Please check each retailer for exact offers. Products may not be available in all markets. Displayed prices are current lowest prices offered by stated retailers and are subject to change. Prices are not offered by Microsoft unless stated.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/month for 24 months"
      },
      "en-us": {
        "keyBuynow": "BUY NOW",
        "keyPreorder": "PRE-ORDER",
        "keyGetDetails": "GET DETAILS",
        "keySoldout": "Out of Stock",
        "keyLegaltext": "You are about to leave <a href='https://microsoft.com' target='blank' class='c-hyperlink' data-cta='internal'>Microsoft.com</a> and access an external website, whose privacy policy, term and condition will apply. Microsoft is not responsible for the privacy policy, content, or accuracy of external websites. All specifications are subject to change without notice. Please check each retailer for exact offers. Products may not be available in all markets. Displayed prices are current lowest prices offered by stated retailers and are subject to change. Prices are not offered by Microsoft unless stated.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/month for 24 months"
      },
      "en-ca": {
        "keyBuynow": "BUY NOW",
        "keyPreorder": "PRE-ORDER",
        "keyGetDetails": "GET DETAILS",
        "keySoldout": "Out of Stock",
        "keyLegaltext": "You are about to leave <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> and access an external website, whose privacy policy, term and condition will apply. Microsoft is not responsible for the privacy policy, content, or accuracy of external websites. All specifications are subject to change without notice. Please check each retailer for exact offers. Products may not be available in all markets. Displayed prices are current lowest prices offered by stated retailers and are subject to change. Prices are not offered by Microsoft unless stated.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/month for 24 months"
      },
      "en-gb": {
        "keyBuynow": "BUY NOW",
        "keyPreorder": "PRE-ORDER",
        "keyGetDetails": "GET DETAILS",
        "keySoldout": "Out of Stock",
        "keyLegaltext": "You are about to leave <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> and access an external website, whose privacy policy, term and condition will apply. Microsoft is not responsible for the privacy policy, content, or accuracy of external websites. All specifications are subject to change without notice. Please check each retailer for exact offers. Products may not be available in all markets. Displayed prices are current lowest prices offered by stated retailers and are subject to change. Prices are not offered by Microsoft unless stated.",
        "keyPricestrings": "£<<PLACEHOLDER>>",
        "keyPermonth": "/month for 24 months"
      },
      "es-co": {
        "keyBuynow": "COMPRAR AHORA",
        "keyPreorder": "RESERVAR",
        "keyGetDetails": "MÁS INFORMACIÓN",
        "keySoldout": "Agotado",
        "keyLegaltext": "Está a punto de abandonar <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> y acceder a un sitio web externo por lo que se aplicarán la directiva de privacidad, términos y condiciones correspondientes. Microsoft no es responsable de la directiva de privacidad, el contenido o la precisión de los sitios web externos. Todas las especificaciones están sujetas a cambios sin previo aviso. Consulta con los distribuidores individuales para conocer las ofertas exactas. Es posible que los productos no estén disponibles en todos los mercados. Los precios que se muestran son los precios más bajos actuales que ofrecen los distribuidores indicados y están sujetos a cambios. Los precios no los ofrece Microsoft, a menos que se indique lo contrario.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/mes durante 24 meses "
      },
      "es-es": {
        "keyBuynow": "COMPRAR AHORA",
        "keyPreorder": "RESERVAR",
        "keyGetDetails": "MÁS INFORMACIÓN",
        "keySoldout": "Agotado",
        "keyLegaltext": "Está a punto de salir de <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> y acceder a un sitio web externo, con su propia directiva de privacidad, términos y condiciones. Microsoft no se hace responsable de la directiva de privacidad, el contenido o la precisión de los sitios web externos. Todas las especificaciones están sujetas a cambios sin previo aviso. Ponte en contacto con los distribuidores individuales para conocer las ofertas exactas. Es posible que los productos no estén disponibles en todos los mercados. Los precios que se muestran son los precios más bajos actuales que ofrecen los distribuidores indicados y están sujetos a cambios. Los precios no los ofrece Microsoft, a menos que se indique lo contrario.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/mes durante 24 meses "
      },
      "es-mx": {
        "keyBuynow": "COMPRAR AHORA",
        "keyPreorder": "RESERVAR",
        "keyGetDetails": "MÁS INFORMACIÓN",
        "keySoldout": "Agotado",
        "keyLegaltext": "Está a punto de abandonar <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> y acceder a un sitio web externo por lo que se aplicarán la directiva de privacidad, términos y condiciones correspondientes. Microsoft no es responsable de la directiva de privacidad, el contenido o la precisión de los sitios web externos. Todas las especificaciones están sujetas a cambios sin previo aviso. Consulta con los distribuidores individuales para conocer las ofertas exactas. Es posible que los productos no estén disponibles en todos los mercados. Los precios que se muestran son los precios más bajos actuales que ofrecen los distribuidores indicados y están sujetos a cambios. Los precios no los ofrece Microsoft, a menos que se indique lo contrario.",
        "keyPricestrings": "$<<PLACEHOLDER>>",
        "keyPermonth": "/mes durante 24 meses "
      },
      "fr-ca": {
        "keyBuynow": "ACHETER MAINTENANT",
        "keyPreorder": "PRÉCOMMANDER",
        "keyGetDetails": "VOIR LES DÉTAILS",
        "keySoldout": "En rupture de stock",
        "keyLegaltext": "Vous êtes sur le point de quitter <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> et d’accéder à un site Web externe dont la politique de confidentialité et les conditions générales s’appliqueront. Microsoft n’est pas responsable de la politique de confidentialité, du contenu ou de l’exactitude des sites Web externes. Toutes les spécifications sont sujettes à des changements sans préavis. Veuillez vérifier auprès de chaque détaillant les offres exactes. Les produits peuvent ne pas être disponibles dans tous les marchés. Les prix affichés sont les prix les plus bas actuellement proposés par les détaillants indiqués et sont susceptibles de changer. Les prix ne sont pas offerts par Microsoft sauf indication contraire.",
        "keyPricestrings": "<<PLACEHOLDER>> $",
        "keyPermonth": "/mois pendant 24 mois"
      },
      "fr-fr": {
        "keyBuynow": "ACHETER MAINTENANT",
        "keyPreorder": "PRÉCOMMANDER",
        "keyGetDetails": "EN SAVOIR PLUS",
        "keySoldout": "Épuisé",
        "keyLegaltext": "Vous êtes sur le point de quitter <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> et d'accéder à un site Web externe, avec sa propre politique de confidentialité et ses propres conditions générales. Microsoft n'est pas responsable de la politique de confidentialité, du contenu ou de l'exactitude des éléments présentés sur les sites Web externes. Toutes les spécifications sont sujettes à changement sans préavis. Veuillez consulter chaque détaillant pour connaître les offres exactes. Il se peut que les produits ne soient pas disponibles sur tous les marchés. Les prix affichés sont les prix les plus bas actuellement offerts par les détaillants indiqués et peuvent faire l'objet de modifications. Sauf indication contraire, les prix ne sont pas définis par Microsoft.",
        "keyPricestrings": "<<PLACEHOLDER>> €",
        "keyPermonth": "/mois pendant 24 mois"
      },
      "it-it": {
        "keyBuynow": "ACQUISTA ORA",
        "keyPreorder": "PREORDINA",
        "keyGetDetails": "SCOPRI I DETTAGLI",
        "keySoldout": "Esaurito",
        "keyLegaltext": "Stai per lasciare <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> e accedere a un sito Web esterno, di conseguenza verranno applicate le relative condizioni e norme sulla privacy. Microsoft non è responsabile delle norme sulla privacy, dei contenuti o dell'accuratezza dei siti Web esterni. Tutte le specifiche sono soggette a modifica senza preavviso. Verifica le offerte presso ciascun rivenditore. I prodotti potrebbero non essere disponibili in tutti i mercati. I prezzi visualizzati sono i prezzi più bassi offerti attualmente dai rivenditori indicati e sono soggetti a variazioni. I prezzi non sono stabiliti da Microsoft, salvo ove è indicato.",
        "keyPricestrings": " €<<PLACEHOLDER>>",
        "keyPermonth": "al mese per 24 mesi"
      },
      "nl-nl": {
        "keyBuynow": "KOOP NU",
        "keyPreorder": "RESERVEER",
        "keyGetDetails": "MEER INFORMATIE",
        "keySoldout": "Uitverkocht",
        "keyLegaltext": "Je staat op het punt <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> te verlaten en naar een externe website te gaan. Het privacybeleid, de voorwaarden en bepalingen daarvan zullen van toepassing zijn. Microsoft is niet verantwoordelijk voor het privacybeleid, de inhoud of de nauwkeurigheid van externe websites. Alle specificaties kunnen zonder voorafgaande kennisgeving worden gewijzigd. Controleer elke winkelier voor de exacte aanbiedingen. De producten zijn mogelijk niet in alle markten beschikbaar. De getoonde prijzen zijn de huidige laagste prijzen die door de vermelde winkels worden aangeboden en zijn aan wijzigingen onderhevig. Prijzen worden niet aangeboden door Microsoft, tenzij anders vermeld.",
        "keyPricestrings": " € <<PLACEHOLDER>>",
        "keyPermonth": "/maand voor 24 maanden"
      },
      "pl-pl": {
        "keyBuynow": "KUP TERAZ",
        "keyPreorder": "PRZEDSPRZEDAŻ",
        "keyGetDetails": "ZOBACZ SZCZEGÓŁY",
        "keySoldout": "Wyprzedane",
        "keyLegaltext": "Wkrótce opuścisz witrynę <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> i znajdziesz się na zewnętrznej witrynie internetowej. W takim przypadku będą obowiązywały polityka prywatności, warunki i postanowienia tej strony. Firma Microsoft nie ponosi odpowiedzialności za politykę prywatności, zawartość ani trafność treści zawartych na zewnętrznych witrynach internetowych. Wszystkie specyfikacje mogą ulec zmianie bez uprzedzenia. Szczegółowe informacje na temat ofert zamieszczane są przez sprzedawców detalicznych. Produkty mogą nie być dostępne na wszystkich rynkach. Wyświetlane ceny są obecnie najniższymi cenami oferowanymi przez sprzedawców detalicznych i mogą ulec zmianie. Ceny nie są oferowane przez firmę Microsoft, o ile nie podano inaczej.",
        "keyPricestrings": "<<PLACEHOLDER>> zł"
      },
      "pt-br": {
        "keyBuynow": "COMPRAR AGORA",
        "keyPreorder": "PRÉ-VENDA",
        "keyGetDetails": "VEJA OS DETALHES",
        "keySoldout": "Esgotado",
        "keyLegaltext": "Você está prestes a deixar a Microsoft.com e acessar um site externo, cuja política de privacidade, termos e condições se aplicam. A <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> não se responsabiliza pela política de privacidade, pelo conteúdo ou pela precisão de sites externos. Todas as especificações estão sujeitas a alteração sem aviso. Confira cada varejista para ver as ofertas exatas. Os produtos podem não estar disponíveis em todos os mercados. Os preços exibidos no momento são os preços mais baixos oferecidos pelos varejistas mencionados e estão sujeitos a alterações. Os preços não são oferecidos pela Microsoft a não ser que declarado.",
        "keyPricestrings": "R$ <<PLACEHOLDER>>"
      },
      "sv-se": {
        "keyBuynow": "KÖP NU",
        "keyPreorder": "FÖRBESTÄLL",
        "keyGetDetails": "VISA INFORMATION",
        "keySoldout": "Utsåld",
        "keyLegaltext": "Du lämnar nu <a href='https://microsoft.com' target='blank' class='c-hyperlink'>Microsoft.com</a> och öppnar en extern webbplats, där den externa webbplatsens integritetspolicy och villkor gäller. Microsoft ansvarar inte för externa webbplatsers sekretesspolicyer, innehåll eller riktighet. Alla specifikationer kan ändras utan föregående meddelande. Besök respektive återförsäljare för exakta erbjudanden. Produkterna är kanske inte tillgängliga på alla marknader. Priserna som visas är aktuella lägsta priser som erbjuds av angivna återförsäljare och kan komma att ändras. Priserna erbjuds inte av Microsoft, såvida det inte uttryckligen anges.",
        "keyPricestrings": "  <<PLACEHOLDER>> kr"
      }
    }
  }
  
    $(document).on("click", "a.hatchProd", function(e) {
      e.preventDefault();
      var buttontofocus = $(this).attr("data-hatch-mpn").split(",")[0];
      setTimeout(function() {
        document.getElementById("close_" + buttontofocus).focus();
      }, 500)
      
    })
    
    $(document).on("click", ".dialogbox button", function(e) {
        e.preventDefault();
            $(".hatchProd").focus();
      })

      $(document).on("enter", ".dialogbox button", function(e) {
        e.preventDefault();
            $(".hatchProd").focus();
      })


    // first get Store data from display catalog for MS links
    allbigids = [];
    allbigidskus = [];
    allBigIdData = {};
    $(".hatchProd").each(function() {
      var bi = $(this).attr("data-hatch-bigids");
      $(this).attr("data-hatch-bigids", bi.toUpperCase());
      var multbis = bi.split(",");
      for (var i = 0; i < multbis.length; i++) {
        if (allbigids.indexOf(multbis[i].split("/")[0].toUpperCase()) === -1) {
          allbigids.push(multbis[i].split("/")[0].toUpperCase().trim());
          allbigidskus.push(multbis[i].toUpperCase().trim());
        }
      }
    });
  
    var countryCode = urlRegion.split("-")[1].toUpperCase();
    var guidbigidarray = [];
  
    for (var i = 0; i < allbigids.length; i++) {
      guidbigidarray.push(allbigids[i].split("/")[0]);
    } 
    if (guidbigidarray[0].length > 0) {
      guidbigids = guidbigidarray.join(",");
      var guidUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + guidbigids + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
      $.get(guidUrl)
        .done(function(apiData) {
          storeData(apiData);
        })
    } else {
      runHatch();
    }
    function storeData(data) {
      for (var i = 0; i < allbigids.length; i++) {
        (function(i) {
          var itemId = data.Products[i].ProductId.toUpperCase();
          if (allbigidskus[i].indexOf("/") > -1) {
            var thesku = allbigidskus[i].split("/")[1].toUpperCase();
          } else {
            var thesku = "";
          }
  
          var itemTitle = data.Products[i].LocalizedProperties[0].ProductTitle;
          if (itemTitle === undefined) {
            itemTitle = "";
          }
          var titleClickname = itemTitle.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/gi,'');
          if (titleClickname === "") {
            titleClickname = "-";
          }
  
  
          // get boxshot
          if (data.Products[i].LocalizedProperties[0].Images !== undefined) {
            var imagesNum = data.Products[i].LocalizedProperties[0].Images.length;
            var imageInd = 999;
            for (var j = 0; j < imagesNum; j++) {
              if (data.Products[i].LocalizedProperties[0].Images[j].ImagePurpose === "screenshot") { 
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
            if (data.Products[i].LocalizedProperties[0].Images[imageInd]) {
              var itemBoxshot = data.Products[i].LocalizedProperties[0].Images[imageInd].Uri.replace("http:", "https:");
              var itemBoxshotSmall;
            } else {
              var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
              var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }
            if (itemBoxshot.indexOf("xboxlive.com") !== -1) {
              itemBoxshotSmall = itemBoxshot + "&w=250&format=jpg";
              itemBoxshot = itemBoxshot + "&w=250&format=jpg"; 
            } else {
              itemBoxshotSmall = itemBoxshot;
            }
          }  else {
              var itemBoxshot = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
              var itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/3b/7a/3b7a3497-fc6a-4cae-b37e-48c487b084c5.jpg?n=X1-Standard-digital-boxshot_584x800.jpg";
            }      
          
          var releaseDate = data.Products[i].MarketProperties[0].OriginalReleaseDate;
          if (releaseDate === undefined) {
            releaseDate = data.Products[i].MarketProperties[0].PlannedReleaseDate;
          }
          if (releaseDate === undefined) {
            releaseDate = 0;
          }
  
          //get prices
          var listprice;
          var msrpprice;
          var currencycode;
          var onsale = "false";
          var gwg = "false";
          var golddiscount = "false"; // deals with gold ... and gold member sale prices?
          var goldandsilversale = "false";
          var goldandsilversalegoldprice = 100000000;
          var specialprice = 100000000;
          var eaaccessgame = "false";
          var gamepassgame = "false";
          var purchasable = "false";
          var tempea = "false"
          var tempgs = "false";
          var goldaffids = [];
          var platxbox = "false";
          var platpc = "false";
          var outStock = "false";
  
          for (var t = 0; t < data.Products[i].DisplaySkuAvailabilities.length; t++) {
            var availId = data.Products[i].DisplaySkuAvailabilities[t].Availabilities[0].AvailabilityId;
          }
  
          if (data.Products[i].LocalizedProperties[0].EligibilityProperties !== null && data.Products[i].LocalizedProperties[0].EligibilityProperties !== undefined && 
              data.Products[i].LocalizedProperties[0].EligibilityProperties !== "undefined") {
            if (data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.length > 0) {
              data.Products[i].LocalizedProperties[0].EligibilityProperties.Affirmations.forEach(function(aff) {
                if (aff.Description.toLowerCase().indexOf("ea access") !== -1) {
                  tempea = "true";
                }
                if (aff.Description.toLowerCase().indexOf("game pass") !== -1) {
                  gamepassgame = "true";
                }
                if (aff.Description.toLowerCase().indexOf("gold") !== -1) {
                  tempgs = "true";
                  goldaffids.push(aff.AffirmationProductId);
                }
              })
            }
          }
          var skuind = 999;
          data.Products[i].DisplaySkuAvailabilities.forEach(function(skui, ind) {
            if (skui.Sku.SkuId === thesku) {
              if (skuind === 999) {
                skuind = ind;
              }
            }
          })
          if (skuind === 999) {
            console.log(itemId + " sku " + thesku + " not found. Using first available sku instead.");
            skuind = 0;
            thesku = data.Products[i].DisplaySkuAvailabilities[skuind].Sku.SkuId;
          }
  
          var sku = data.Products[i].DisplaySkuAvailabilities[skuind];
          var purchnum = 0;
          sku.Availabilities.forEach(function(av, ind) {
            if (av.Actions.indexOf("Purchase") !== -1) {
              purchasable = "true";
              purchnum++;
              if (purchnum > 1 && tempgs === "true" && av.RemediationRequired === true && goldaffids.indexOf(av.Remediations[0].BigId) !== -1) {
                goldandsilversale = "true";
              }
              // get platform info
              av.Conditions.ClientConditions.AllowedPlatforms.forEach(function(plat) {
                if (plat.PlatformName === "Windows.Xbox") {
                  platxbox = "true";
                } 
                if (plat.PlatformName === "Windows.Desktop") {
                  platpc = "true";
                } 
              })
            }
            if (av.Actions.indexOf("Purchase") !== -1 && (av.OrderManagementData.Price.MSRP !== 0 || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && 
                sku.Sku.Properties.IsTrial === false) {
              if ((av.OrderManagementData.Price.ListPrice !== av.OrderManagementData.Price.MSRP || (av.OrderManagementData.Price.MSRP === 0 && av.OrderManagementData.Price.ListPrice === 0)) && ind !== 0) {
                if (specialprice === 100000000) {
                  specialprice = av.OrderManagementData.Price.ListPrice;
                }
              } else {
                if (listprice === undefined) {
                  listprice = av.OrderManagementData.Price.ListPrice;
                }
              }
              if (ind === 0) {
                if (msrpprice === undefined) {
                  msrpprice = av.OrderManagementData.Price.MSRP;
                }
              }
              currencycode = av.OrderManagementData.Price.CurrencyCode;
              if (av.Properties.MerchandisingTags !== undefined) {
                if (av.Properties.MerchandisingTags.indexOf("LegacyGamesWithGold") !== -1) {
                  gwg = "true";
                  specialprice = listprice;
                  listprice = msrpprice;
                }
                if (av.Properties.MerchandisingTags.indexOf("LegacyDiscountGold") !== -1) {
                  golddiscount = "true";
  
                }
              }
              if (goldandsilversale === "true" && av.DisplayRank === 1) {
                goldandsilversalegoldprice = av.OrderManagementData.Price.ListPrice;
              }
              if (tempea === "true" && av.Actions.length === 2) {
                eaaccessgame = "true";
              }
              if (listprice < msrpprice) { 
                onsale = "true";
              }
            }
          })    
  
          if (listprice === undefined) {
            console.log("NOTE: BigID " + itemId + " has no price information.");
            listprice = 0;
            msrpprice = 0;
            currencycode = "USD";
          }
  
          // var rating = "none";
          // var ratingcode = "";
          // var ratingage  = 99;
          // var ratingsystem = "none";
          // var kidfamilyratings = ["ESRB:T", "ESRB:E10", "ESRB:E", "PEGI:3", "PEGI:7", "PEGI:12", "COB-AU:G", "COB-AU:PG", "OFLC-NZ:G", "OFLC-NZ:PG", "OFLC-NZ:R13", "USK:Everyone", "USK:6", "USK:12", 
          //                         "PCBP:0", "PCBP:6", "PCBP:12", "DJCTQ:L", "DJCTQ:10", "DJCTQ:12", "DJCTQ:14", "CSRR:G", "CSRR:PG12", "CSRR:PG15"]
          // var rawdescriptors = "none";
          // if (data.Products[i].MarketProperties[0].ContentRatings !== undefined && data.Products[i].MarketProperties[0].ContentRatings !== null && data.Products[i].MarketProperties[0].ContentRatings.length > 0) {
          //   ratingcode = data.Products[i].MarketProperties[0].ContentRatings[0].RatingId;
          //   if (ratingcode.indexOf(":RP") === -1) {
          //     ratingage = osgratings["ageRatings"][ratingcode];
          //   }
          //   if (osgratings["displayData"][ratingcode][urlRegion] !== undefined) {
          //     var osgregion = urlRegion;
          //   } else {
          //     var osgregion = "en-us";
          //   }
          //   rating = osgratings["displayData"][ratingcode][osgregion].longName;
          //   ratingsystem = data.Products[i].MarketProperties[0].ContentRatings[0].RatingSystem;
          //   if (kidfamilyratings.indexOf(rating) !== -1) {
          //     gameIdArrays["kidsfamily"].push(itemId);
          //   }
          //   rawdescriptors = data.Products[i].MarketProperties[0].ContentRatings[0].RatingDescriptors.join(", ");
          // } 
          // if (urlRegion === "ja-jp" || urlRegion === "ko-kr") {
          //   $(".c-label[data-game='kids and family']").remove()
          // }
  
          // if (biuArray.indexOf(itemId) === -1 || bigidUrls[itemId].toLowerCase().indexOf(urlRegion) !== -1) {
          //   var itemhref = 'https://www.microsoft.com/' + urlRegion + '/p/' + titleClickname + '/' + itemId;
          // } else {
          //   var itemhref = bigidUrls[itemId].split("<exc>")[0];
          //   var splitHref = itemhref.split("/");
          //   splitHref.splice(3, 0, urlRegion);
          //   itemhref = splitHref.join("/");
          // }
  
          // var avgstars = 0;
          // var ratingcount = 0;
          // if (data.Products[i].MarketProperties[0].UsageData[0]) {
          //   avgstars = data.Products[i].MarketProperties[0].UsageData[0].AverageRating;
          //   ratingcount = data.Products[i].MarketProperties[0].UsageData[0].RatingCount;
          // } 
  
          // custom boxshots
          // if (itemId === "9NBLGGH1Z6FQ") {
          //   itemBoxshot =  "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
          //   itemBoxshotSmall =  "https://compass-ssl.xbox.com/assets/31/f7/31f7fa75-a7ec-4769-893f-12cc0752373e.jpg?n=ReCore_Boxshot-digital-X1_294x215.jpg";
          // }
          // if (itemId === "BZFK7WNK7R4M") {
          //   itemBoxshot = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
          //   itemBoxshotSmall = "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc6LYEXhNheFwp2halN6MiJq0hK8tHwcOslhHzFcqc.uw90wjv2YtwC_mZJs.lEh1cto.K33xsXgRNctiGCKrDjVsG9PhS5GzkLXFMF5wlXsJAfaI6.Hc6zR2KrB00Sjgkn0kvJZv.PD1.7g.ytDgP368SN3vocTlHhhyS_BQ8qZs-&w=200&format=jpg";
          // }   
          // if (itemId === "C2320MJQP0MS") {
          //   itemBoxshot = "https://compass-ssl.xbox.com/assets/34/5f/345f7fde-2407-475a-9a16-5fac1ad986ab.jpg?n=DwG_Boxshot-digital-X1_Plants-Vs-Zombies-Deluxe_584x800.jpg";
          //   itemBoxshotSmall = "https://compass-ssl.xbox.com/assets/34/5f/345f7fde-2407-475a-9a16-5fac1ad986ab.jpg?n=DwG_Boxshot-digital-X1_Plants-Vs-Zombies-Deluxe_584x800.jpg";
          // }   
  
          // genres
          if (data.Products[i].Properties.Categories !== undefined && data.Products[i].Properties.Categories !== null) {
            var gamegenres = data.Products[i].Properties.Categories.join(", ").toLowerCase();
          } else if (data.Products[i].Properties.Category !== undefined && data.Products[i].Properties.Category !== null) {
            var gamegenres = data.Products[i].Properties.Category.toLowerCase();
          } else {
            var gamegenres = "unlisted";
          }
  
          var itemhref = "https://www.microsoft.com/" + urlRegion + "/d/" + titleClickname + "/" + itemId + "/" + thesku;
          var reldate = new Date(releaseDate);
          var nowdate = new Date();
          if (reldate > nowdate) {
            var upcoming = "true";
          } else {
            var upcoming = "false";
          }
  
          allBigIdData[itemId] = {releasedate: releaseDate, itemsku: thesku, produrl: itemhref, titleclickname: titleClickname, boxshot: itemBoxshot, boxshotsmall: itemBoxshotSmall, 
                              title: itemTitle, msrpprice: msrpprice, listprice: listprice, currencycode: currencycode, onsale: onsale, upcoming: upcoming, newrelease: "false", 
                              gameswithgold: gwg, golddiscount: golddiscount, goldandsilversale: goldandsilversale, goldandsilversalegoldprice: goldandsilversalegoldprice, 
                              specialprice: specialprice, eaaccessgame: eaaccessgame, gamepassgame: gamepassgame, purchasable: purchasable, platformpc: platpc, oStock: outStock,
                              sku: thesku, availId: availId};
  
        })(i);   
      }
      
      runInventory();
      // runHatch();
    }
  
    function runInventory() {
      var thebigids = Object.keys(allBigIdData);
        
      for (var i = 0; i < thebigids.length; i++) {
        (function(i) { 
          var countryCode = urlRegion.split("-")[1].toUpperCase();
          var thesku = allBigIdData[thebigids[i]].sku;
          var availId = allBigIdData[thebigids[i]].availId;
          var stockUrl = "https://inv.mp.microsoft.com/v2.0/inventory/" + countryCode + "/" + thebigids[i] + "/" + thesku + "/" + availId;
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
  
                //MAY NEED TO UPDATE THIS CODE THE NEXT TIME THERE IS  A PRE-ORDER CONSOLE BUNDLE
                if ((instock.toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() !== "true" */ ) && (futureInstock.toString().toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() === "true"*/ )) {
                     allBigIdData[thebigids[i]].oStock = "true"
                }
              })
              .fail(function() {
                console.log("inventory call failure")
                var instock = "false";
                allBigIdData[thebigids[i]].oStock = "false"
              })
          if (i === thebigids.length - 1) {
            var recoactivecheck = setInterval(function() {
                                var recoactiveAjax = $.active;
                                if (recoactiveAjax === 0) {
                                  runHatch();
                                  clearInterval(recoactivecheck);
                                }
                              }, 500);
          }
        })(i)
      }
  
    }
  
    function runHatch() {
      $(".hatchProd").each(function() {
        var lightboxidexist = false;
        var thempn = $(this).attr("data-hatch-mpn");
        var thempn2;
        var thespecs = $(this).attr("data-hatch-mult-labels");
        if (thespecs === undefined) { thespecs = ""; }
        if (thempn.indexOf(",") !== -1) {
          thempn2 = thempn.split(",")[1];
          thempn = thempn.split(",")[0];
        }
        $(this).attr("data-js-dialog-show", idprfx + thempn);
        if ($("#" + idprfx + thempn).length === 0) {
          $("body").append('<div class="c-dialog f-flow hatchDialog" id="' + idprfx + thempn + '" aria-hidden="true" data-product-spec="' + thespecs + '" data-product-name="">' +
                              '<div role="presentation" tabindex="-1"></div>' +
                                '<div class="dialogbox" role="dialog" aria-label="Flow scroll" tabindex="-1">' +
                                  '<button id="close_' + thempn + '" class="c-glyph glyph-cancel high-contrast" data-js-dialog-hide="close-button" aria-label="Close dialog" tabindex="0"></button>' +
                                  '<div role="document">' +
                                      '<div class="lbheader"></div>' +
                                      '<div class="lbbody"></div>' +
                                      '<div class="lblegal">' + locstrings.locales[urlRegion]["keyLegaltext"] + '</div>' +
                                  '</div></div></div>')
          $(this).addClass(idprfx + thempn + "_button");
        } else {
          lightboxidexist = true;
        }
        if (thempn2 === undefined) {
          if (lightboxidexist === false) {
            getHatchData(userCountry, thempn);
          }
        } else {
          if (lightboxidexist === false) {
            getHatchData(userCountry, thempn, thempn2);
          }
        }
        
      })
    }
  })();
  
  function getHatchData(country, mpn, mpn2) {
    allProdData[mpn] = {};
    if (mpn2 !== undefined && mpn2.length > 0) {
      allProdData[mpn2] = {};
      doAjax(mpn + "," + mpn2, false, false);
      doAjax(mpn + "," + mpn2, true, true);
    } else {
      doAjax(mpn + "," + mpn2, false, true);
    }
    function doAjax(mpnraw, multiple, lastone) {
      if (multiple === false) {
        var mpn = mpnraw.split(",")[0];
      } else {
        var mpn = mpnraw.split(",")[1];
      }
      var button = $('.' + idprfx + mpnraw.split(",")[0] + '_button')
      priceOverrides = {};
      var priceoverridesraw = ""; 
      if ($(button).attr("data-hatch-retailer-price-overrides") !== undefined) {
        priceoverridesraw = $(button).attr("data-hatch-retailer-price-overrides");
      }
      var porarray = priceoverridesraw.split("||");
      porarray.forEach(function(ov) {
        var mpn = ov.split("|")[0];
        var priority = parseInt(ov.split("|")[1]);
        var newprice = ov.split("|")[2];
        if (!priceOverrides[mpn]) {
          priceOverrides[mpn] = {};
        }
        priceOverrides[mpn][priority] = newprice; 
      })
      var hatchUrl = "https://gethatch.com/5daeff3f46e0fb0001fe560e/affiliate/53055/json?region=" + country + "&mpn=" + mpn + "&sort=conversion&callback=?";
      var includerets = $(button).attr("data-hatch-include-only-retailers");

      console.log(hatchUrl)
      
    if (includerets === undefined) { includerets = ""; }
      $.ajax({
          url : hatchUrl,
          type: 'GET',
          dataType:'jsonp',
          success: function(data) {
            var status = data.iceleads_interface.status;
            var mpn = data.iceleads_interface.mpn;
            if (status === 200) {
              data.iceleads_interface.retailers.retailer.forEach(function(ret) {
                var href = ret.purchase_link;
                var logo = ret.logo;
                var stock_qty = ret.stock_qty;
                var priority = ret.suggested_sorting;
                var currency = ret.currency;
                var currencySymbol = ret.currencySymbol;
                var priceNum = ret.price;
                if (priceOverrides[mpn] && priceOverrides[mpn][priority]) {
                  priceNum = priceOverrides[mpn][priority];
                }
                var retailer = ret.name;
                if (retailer.toLowerCase() !== "microsoft store") {
                  if (includerets.length < 3 || includerets.toLowerCase().indexOf(retailer.toLowerCase()) !== -1) { 
                    allProdData[mpn][retailer] = {href: href, logo: logo, stock_qty: stock_qty, priority: priority, currency: currency, currencySymbol: currencySymbol, priceNum: priceNum};
                  }
                }
                
              })
              populate(mpnraw, multiple, lastone);
              
            } else {
              var statustext = data.iceleads_interface.status_desc;
              console.log("Hatch API issue, altering Hatch link - Status: " + status + " Status Description: " + statustext);
              //removeHatchLink(mpn);
              if (lastone === true) {
                if ($("#" + idprfx + mpn).find(".hatchretailer").length === 0) {
                  var retirebutton = $("." + idprfx + mpn + "_button");
                  if (document.URL.indexOf("xbox-series-") !== -1) {
                    $(retirebutton).removeClass("hatchProd").attr("href", "https://www.xbox.com/where-to-buy").attr("target", "blank");
                    $("#XB19_" + mpn).remove();
                  } else {
                    $(retirebutton).remove();
                  }
                  $(".gotoRetailer").removeClass("hiddenImp");
                }
              }
              populate(mpnraw, multiple, lastone);
            }
          },
          error: function (jqXHR, status, err) {
            throw("Hatch API ajax failure, no error returned. Removing Hatch link.");
            removeHatchLink(mpn);
          },
      })
    }
  }
  
  function removeHatchLink(mpn) {
    if (document.URL.indexOf("xbox-series-") !== -1) {
      $("[data-hatch-mpn='" + mpn + "']").removeClass("hatchProd").attr("href", "https://www.xbox.com/where-to-buy").attr("target", "blank");
      $("#XB19_" + mpn).remove();
    } else {
      $("[data-hatch-mpn='" + mpn + "']").remove();
    }
  }
  
  function populate(mpnfull, multiple, lastone) {
    var mpnsecondary = "";
    if (multiple === true) {
      mpn = mpnfull.split(",")[0];
      mpnsecondary = mpnfull.split(",")[1];
    } else {
      mpn = mpnfull.split(",")[0];
    }
    if (mpnfull.indexOf(",undefined") > -1) {
      mpnfull = mpnfull.replace(",undefined", "");
    }
  
    var button = $('[data-hatch-mpn="' + mpnfull + '"]')
    var thisprodbigid = "";
    var msrpdata = "";
  
    var durl = document.URL.toLowerCase();
  
    if ($(button).length > 0) { 
      if ($(button).attr("data-hatch-msmsrpprice") !== undefined) { msrpdata = $(button).attr("data-hatch-msmsrpprice"); }
      if (multiple === false) {
        if ($(button).attr("data-hatch-bigids").length > 0) {
          thisprodbigid = $(button).attr("data-hatch-bigids").split(",")[0].toUpperCase().split("/")[0];
          console.log(thisprodbigid)
        }
        var title = $(button).attr("data-hatch-title").split(",")[0];
        var prodImage = $(button).attr("data-hatch-image").split(",")[0];
        var mslink = $(button).attr("data-hatch-mslink").split(",")[0];
        var msprice = $(button).attr("data-hatch-msprice").split(",")[0];
        var msmsrpprice = msrpdata.split(",")[0];
        var msaction = $(button).attr("data-hatch-msaction").split(",")[0];
      } else {
        if ($(button).attr("data-hatch-bigids").indexOf(",") > -1) {
          thisprodbigid = $(button).attr("data-hatch-bigids").split(",")[1].toUpperCase().split("/")[0];
        }
        var prod1 = $(button).attr("data-hatch-mult-labels").split(",")[0];
        var prod2 = $(button).attr("data-hatch-mult-labels").split(",")[1];
        if ($(button).attr("data-hatch-title").indexOf(",") > -1) {
          var title2 = $(button).attr("data-hatch-title").split(",")[1];
        } else {
          var title2 = "";
        }
        if ($(button).attr("data-hatch-image").indexOf(",") > -1) {
          var prodImage2 = $(button).attr("data-hatch-image").split(",")[1];
        } else {
          var prodImage2 = "";
        }
        if ($(button).attr("data-hatch-mslink").indexOf(",") > -1) {
          var mslink2 = $(button).attr("data-hatch-mslink").split(",")[1];
        } else {
          var mslink2 = "";
        }
        if ($(button).attr("data-hatch-msprice").indexOf(",") > -1) {
          var msprice2 = $(button).attr("data-hatch-msprice").split(",")[1];
        } else {
          var msprice2 = "";
        }
        if (msrpdata.indexOf(",") > -1) {
          var msmsrpprice2 = msrpdata.split(",")[1];
        } else {
          var msmsrpprice2 = "";
        }
        if ($(button).attr("data-hatch-msaction").indexOf(",") > -1) {
          var msaction2 = $(button).attr("data-hatch-msaction").split(",")[1];
        } else {
          var msaction2 = "";
        }
      }
  
    
      if (multiple === false) {
        if (title.indexOf("CONT|") !== -1) {
          var titlecontainer = title.replace("CONT|", "");
          title = $(titlecontainer).text();
        }
        if (prodImage.indexOf("CONT|") !== -1) {
          var prodimgcontainer = prodImage.replace("CONT|", "");
          prodImage = $(prodimgcontainer).attr("src");
        }
        if (mslink.indexOf("CONT|") !== -1) {
          var mslinkcontainer = mslink.replace("CONT|", "");
          mslink = $(mslinkcontainer).attr("href");
        }
        if (msprice.indexOf("CONT|") !== -1) {
          var mspricecontainer = msprice.replace("CONT|", "");
          msprice = $(mspricecontainer).text();
        }
        if (msmsrpprice.indexOf("CONT|") !== -1) {
          var msmsrppricecontainer = msmsrpprice.replace("CONT|", "");
          msmsrpprice = $(msmsrppricecontainer).text();
        }
        if (msaction.indexOf("CONT|") !== -1) {
          var msactioncontainer = msaction.replace("CONT|", "");
          msaction = $(msactioncontainer).text();
        }
      } else {
        if (title2.indexOf("CONT|") !== -1) {
          var titlecontainer = title2.replace("CONT|", "");
          title2 = $(titlecontainer).text();
        }
        if (prodImage2.indexOf("CONT|") !== -1) {
          var prodimgcontainer = prodImage2.replace("CONT|", "");
          prodImage2 = $(prodimgcontainer).attr("src");
        }
        if (mslink2.indexOf("CONT|") !== -1) {
          var mslinkcontainer = mslink2.replace("CONT|", "");
          mslink2 = $(mslinkcontainer).attr("href");
        }
        if (msprice2.indexOf("CONT|") !== -1) {
          var mspricecontainer = msprice2.replace("CONT|", "");
          msprice2 = $(mspricecontainer).text();
        }
        if (msmsrpprice2.indexOf("CONT|") !== -1) {
          var msmsrppricecontainer2 = msmsrpprice2.replace("CONT|", "");
          msmsrpprice2 = $(msmsrppricecontainer2).text();
        }
        if (msaction2.indexOf("CONT|") !== -1) {
          var msactioncontainer = msaction2.replace("CONT|", "");
          msaction2 = $(msactioncontainer).text();
        }
      }
    }
    if (allBigIdData[thisprodbigid] !== undefined) {
      var curformatter = new Intl.NumberFormat(urlRegion, {
        style: 'currency',
        currency: allBigIdData[thisprodbigid].currencycode,
        minimumFractionDigits: 2
      })
      if (multiple === false) {
        if (title === "") {
          title = allBigIdData[thisprodbigid].title;
        }
        if (prodImage === "" || typeof prodImage === "undefined") {
          prodImage = allBigIdData[thisprodbigid].boxshot;
        }
        if (mslink === "" || typeof mslink === "undefined") {
          mslink = allBigIdData[thisprodbigid].produrl;
        }
        if (msprice === "") {
          if (allBigIdData[thisprodbigid].listprice !== 0) {
            //msprice = locstrings.locales[urlRegion]["keyPricestrings"].replace("<<PLACEHOLDER>>", allBigIdData[thisprodbigid].listprice);
            msprice = curformatter.format(allBigIdData[thisprodbigid].listprice);
          } else {
            msprice = "0";
          }
          
        }
        if (msmsrpprice === "") {
          if (allBigIdData[thisprodbigid].msrpprice !== 0) {
            // msmsrpprice = locstrings.locales[urlRegion]["keyPricestrings"].replace("<<PLACEHOLDER>>", allBigIdData[thisprodbigid].msrpprice);
            msmsrpprice = curformatter.format(allBigIdData[thisprodbigid].msrpprice);
          } else {
            msmsrpprice = "0";
          }
        }
        if (msmsrpprice === "") {
          if (allBigIdData[thisprodbigid].listprice !== 0) {
            // msmsrpprice = locstrings.locales[urlRegion]["keyPricestrings"].replace("<<PLACEHOLDER>>", allBigIdData[thisprodbigid].listprice);
            msmsrpprice = curformatter.format(allBigIdData[thisprodbigid].listprice);
          } else {
            msmsrpprice = "0";
          }
        }
        if (msaction === "") {
          if (allBigIdData[thisprodbigid].upcoming === "false") {
            msaction = locstrings.locales[urlRegion]["keyBuynow"];
            if ((durl.indexOf("xbox-series") !== -1) && (urlRegion === "en-gb")) {
              msaction = locstrings.locales[urlRegion]["keyGetDetails"];
            }
          } else {
            msaction = locstrings.locales[urlRegion]["keyBuynow"]; 
            if ((durl.indexOf("xbox-series") !== -1) && (urlRegion === "en-gb")) {
              msaction = locstrings.locales[urlRegion]["keyGetDetails"];
            }
          }
        }
      } else {
        if (title2 === "") {
          title2 = allBigIdData[thisprodbigid].title;
        }
        if (prodImage2 === "" || typeof prodImage2 === "undefined") {
          prodImage2 = allBigIdData[thisprodbigid].boxshot;
        }
        if (mslink2 === "" || typeof mslink2 === "undefined") {
          mslink2 = allBigIdData[thisprodbigid].produrl;
        }
        if (msprice2 === "") {
          if (allBigIdData[thisprodbigid].listprice !== 0) {
            // msprice2 = locstrings.locales[urlRegion]["keyPricestrings"].replace("<<PLACEHOLDER>>", allBigIdData[thisprodbigid].listprice);
            msprice2 = curformatter.format(allBigIdData[thisprodbigid].listprice);
          } else {
            msprice2 = "0";
          }
        }
        if (msmsrpprice2 === "") {
          if (allBigIdData[thisprodbigid].msrpprice !== 0) {
            // msmsrpprice2 = locstrings.locales[urlRegion]["keyPricestrings"].replace("<<PLACEHOLDER>>", allBigIdData[thisprodbigid].msrpprice);
            msmsrpprice2 = curformatter.format(allBigIdData[thisprodbigid].msrpprice);
          } else {
            msmsrpprice2 = "0";
          }
        }
        if (msaction2 === "") {
          if (allBigIdData[thisprodbigid].upcoming === "false") {
            msaction2 = locstrings.locales[urlRegion]["keyBuynow"];
          } else {
            msaction2 = locstrings.locales[urlRegion]["keyBuynow"]; 
          }
        }
      }
    }
    var lightbox = $("#" + idprfx + mpn);
    if (multiple === false) {
      $(lightbox).find(".lbheader").append('<div class="prod1"><div class="hatchProdImg"><img src="' + prodImage + '" alt="boxshot of ' + title + '"></div>' +
                                             '<div class="hatchProdTitle"><h2>' + title + '</h2></div></div>');
      if ($(lightbox).attr("data-product-name").indexOf(title) === -1) { $(lightbox).attr("data-product-name", title) }
    } else {
      $(lightbox).find(".lbheader").append('<div class="prod2 prodhidden"><div class="hatchProdImg"><img src="' + prodImage2 + '" alt="boxshot of ' + title2 + '"></div>' +
                                             '<div class="hatchProdTitle"><h2>' + title2 + '</h2></div></div>');
      if ($(lightbox).attr("data-product-name").indexOf(title2) === -1) { $(lightbox).attr("data-product-name", $(lightbox).attr("data-product-name") + "," + title2) }
    }
  
    if (multiple === false) {
      var mpnprod = mpn;
    } else {
      mpnprod = mpnsecondary;
    }
    var theretailers = Object.keys(allProdData[mpnprod]);
    var soldOutText = locstrings.locales[urlRegion].keySoldout.toUpperCase();
    theretailers.sort(ret_sort);
    function ret_sort(a, b){
      return (allProdData[mpnprod][b]["priority"]) < (allProdData[mpnprod][a]["priority"]) ? 1 : -1;
    }
    if (multiple === false) {
      var microsoftlink = mslink;
    } else {
      var microsoftlink = mslink2;
    }
    var excluderets = $(button).attr("data-hatch-exclude-retailers");
    if (excluderets === undefined) { excluderets = ""; }
    
    if ((microsoftlink !== undefined && microsoftlink.toLowerCase().indexOf("http") === -1) || excluderets.toLowerCase().indexOf("microsoft") !== -1) {
      var rethtml = '';
      console.log("Microsoft link missing, removing Microsoft Store.");
    } else {
      if (multiple === false) {
        if (msprice !== msmsrpprice) {
          var priceshown = '<s><span class="x-screen-reader">' + msmsrpprice + '</span>' + msmsrpprice + '</s><span itemprop="price">' + msprice + '</span>';
        } else {
          var priceshown = '<span itemprop="price">' + msprice + '</span>'
        }
        var rethtml = '<div class="hatchretailer" data-retailerpriority="0"><span class="retline retlogo"><img src="https://compass-ssl.xbox.com/assets/43/2b/432bc885-aa0a-48f7-be3d-41e6b696ab61.png?n=mLogo92853.png" alt="Microsoft logo"></span>' +
                      '<span class="retline retprice">' + priceshown + '</span>' +
                      '<span class="retline retstockbuy">' + 
                      '<a href="' + mslink + '" class="c-call-to-action c-glyph f-lightweight" aria-label="' + msaction + ' from Microsoft" target="blank" data-retailer="MS Store"><span>' + msaction + '</span></a></span>' +
                      '</div><hr>'
        if (msprice === "0") {
          rethtml = '';
        }
        if (allBigIdData[thisprodbigid] !== undefined) {
          if ((allBigIdData[thisprodbigid].oStock === "true") && (msprice === "0")) {
              var rethtml = '<div class="hatchretailer" data-retailerpriority="0"><span class="retline retlogo"><img src="https://compass-ssl.xbox.com/assets/43/2b/432bc885-aa0a-48f7-be3d-41e6b696ab61.png?n=mLogo92853.png" alt="Microsoft logo"></span>' +
                          '<span class="retline retprice">' + '</span>' +
                          '<span class="retline retstockbuy">' + 
                          '<span class="oostext">' + soldOutText + '</span>' +
                          '</div><hr>'
  
          } else if ((allBigIdData[thisprodbigid].oStock === "true") && (msprice !== "0")) {
              var rethtml = '<div class="hatchretailer" data-retailerpriority="0"><span class="retline retlogo"><img src="https://compass-ssl.xbox.com/assets/43/2b/432bc885-aa0a-48f7-be3d-41e6b696ab61.png?n=mLogo92853.png" alt="Microsoft logo"></span>' +
              '<span class="retline retprice">' + priceshown + '</span>' +
              '<span class="retline retstockbuy">' + 
              '<span class="oostext">' + soldOutText + '</span>' +
              '</div><hr>'
          }
        }
  
      } else {
        if (msprice2 !== msmsrpprice2) {
          var priceshown = '<s><span class="x-screen-reader">' + msmsrpprice2 + '</span>' + msmsrpprice2 + '</s><span itemprop="price">' + msprice2 + '</span>';
        } else {
          var priceshown = '<span itemprop="price">' + msprice2 + '</span>'
        }
        var rethtml = '<div class="hatchretailer" data-retailerpriority="0"><span class="retline retlogo"><img src="https://compass-ssl.xbox.com/assets/43/2b/432bc885-aa0a-48f7-be3d-41e6b696ab61.png?n=mLogo92853.png" alt="Microsoft logo"></span>' +
                      '<span class="retline retprice">' + priceshown + '</span>' +
                      '<span class="retline retstockbuy">' + 
                      '<a href="' + mslink2 + '" class="c-call-to-action c-glyph f-lightweight" aria-label="' + msaction2 + ' from Microsoft" target="blank"><span>' + msaction2 + '</span></a></span>' +
                      '</div><hr>'
        if (msprice2 === "0") {
          rethtml = '';
        }
        if ((allBigIdData[thisprodbigid].oStock === "true") && (msprice2 === "0")) {
            var rethtml = '<div class="hatchretailer" data-retailerpriority="0"><span class="retline retlogo"><img src="https://compass-ssl.xbox.com/assets/43/2b/432bc885-aa0a-48f7-be3d-41e6b696ab61.png?n=mLogo92853.png" alt="Microsoft logo"></span>' +
                        '<span class="retline retprice">' + '</span>' +
                        '<span class="retline retstockbuy">' + 
                        '<span class="oostext">' + soldOutText + '</span>' +
                        '</div><hr>'
  
        } else if ((allBigIdData[thisprodbigid].oStock === "true") && (msprice2 !== "0")) {
            var rethtml = '<div class="hatchretailer" data-retailerpriority="0"><span class="retline retlogo"><img src="https://compass-ssl.xbox.com/assets/43/2b/432bc885-aa0a-48f7-be3d-41e6b696ab61.png?n=mLogo92853.png" alt="Microsoft logo"></span>' +
            '<span class="retline retprice">' + priceshown + '</span>' +
            '<span class="retline retstockbuy">' + 
            '<span class="oostext">' + soldOutText + '</span>' +
            '</div><hr>'
        }
      }
     
  
  
  
   
    }
    
    for (var i = 0; i < theretailers.length; i++) {
      var curformatter = new Intl.NumberFormat(urlRegion, {
        style: 'currency',
        currency: allProdData[mpnprod][theretailers[i]].currency,
        minimumFractionDigits: 2
      })
      var href = allProdData[mpnprod][theretailers[i]].href;
      var logo = allProdData[mpnprod][theretailers[i]].logo;
      var currencySymbol = allProdData[mpnprod][theretailers[i]].currencySymbol;
      //var price = allProdData[mpnprod][theretailers[i]].priceNum;
      var thepricenum = 0;
      if (mpnprod.indexOf("-") === -1) {
        thepricenum = allProdData[mpnprod][theretailers[i]].priceNum / 24;
      } else {
        thepricenum = allProdData[mpnprod][theretailers[i]].priceNum;
      }
      var price = curformatter.format(thepricenum);
      var priority = allProdData[mpnprod][theretailers[i]].priority;
      var stock_qty = allProdData[mpnprod][theretailers[i]].stock_qty;
      var retname = theretailers[i];
      var dataRetailer = retname.replace(".com", "");
      var stockaction = '';
      if (stock_qty >= 1) {
        stockaction = '<a href="' + href + '" class="c-call-to-action c-glyph f-lightweight" aria-label="' + locstrings.locales[urlRegion]["keyBuynow"] + ' ' + retname + '" data-retailer="' + dataRetailer + '" target="blank"><span>' + locstrings.locales[urlRegion]["keyBuynow"] + '</span></a>';
        if (durl.indexOf("xbox-series") !== -1) {
          stockaction = '<a href="' + href + '" class="c-call-to-action c-glyph f-lightweight" aria-label="' + locstrings.locales[urlRegion]["keyGetDetails"] + ' ' + retname + '" data-retailer="' + dataRetailer + '" target="blank"><span>' + locstrings.locales[urlRegion]["keyGetDetails"] + '</span></a>';
        }
      } else if (stock_qty === -99) {
        stockaction = '<a href="' + href + '" class="c-call-to-action c-glyph f-lightweight" aria-label="' + locstrings.locales[urlRegion]["keyPreorder"] + ' ' + retname + '" data-retailer="' + dataRetailer + '" target="blank"><span>' + locstrings.locales[urlRegion]["keyPreorder"] + '</span></a>';
      } else {
        stockaction = '<span class="oostext">' + soldOutText + '</span>';
      }
      var monthlytext = "";
      if (mpnprod.indexOf("-") === -1) {
        monthlytext = locstrings.locales[urlRegion].keyPermonth;
      }
      
      if (excluderets.toLowerCase().indexOf(retname.toLowerCase()) === -1) {
        rethtml += '<div class="hatchretailer" data-retailerpriority="' + priority + '"><span class="retline retlogo"><img src="' + logo + '" alt="' + retname + ' logo"></span>' +
                   //'<span class="retline retprice">' + currencySymbol + price + '</span>' +
                   '<span class="retline retprice">' + price + monthlytext  + '</span>' +
                   '<span class="retline retstockbuy">' + stockaction + '</span>' +
                   '</div><hr>'
      }
    }
    if (multiple === false) {
      $(lightbox).find(".lbbody").append('<div class="prod1">' + rethtml + '</div>');
      $(lightbox).find(".prod1 hr").last().remove();
    } else {
      $(lightbox).find(".lbbody").append('<div class="prod2 prodhidden">' + rethtml + '</div>');
      $(lightbox).find(".prod2 hr").last().remove();
    }
  
    if (multiple === true) {
      $(lightbox).find(".lbheader").after('<fieldset class="c-radio" aria-label="Choose a console to see participating retailers">' +
                                              '<div><div>' +
                                                '<label class="c-label">' +
                                                  '<input aria-posinset="1" aria-setsize="2" type="radio" aria-label="see ' + prod1 + ' retailers" name="' + mpn + '" value="prod1" checked="checked">' +
                                                    '<span>' + prod1 + '</span>' +
                                                '</label>' +
                                                  '<label class="c-label">' +
                                                    '<input aria-posinset="2" aria-setsize="2" type="radio" aria-label="see ' + prod2 + ' retailers" name="' + mpn + '" value="prod2">' +
                                                      '<span>' + prod2 + '</span>' +
                                                  '</label></div></div></fieldset>')    
      
      $(document).on("click", "#" + idprfx + mpn + " .c-radio input", function(e) {
        if ($(this).val() === "prod2") {
          $(lightbox).find(".prod1").addClass("prodhidden");
          $(lightbox).find(".prod2").removeClass("prodhidden");        
        } else if ($(this).val() === "prod1") {
          $(lightbox).find(".prod2").addClass("prodhidden");
          $(lightbox).find(".prod1").removeClass("prodhidden");
        }
      })
    }
    if (lastone === true) {
      if ($(lightbox).find(".hatchretailer").length === 0) {
        var retirebutton = $("." + idprfx + mpn + "_button");
        if (document.URL.indexOf("xbox-series-") !== -1) {
          $(retirebutton).removeClass("hatchProd").attr("href", "https://www.xbox.com/where-to-buy").attr("target", "blank");
        } else {
          $(retirebutton).remove();
        }
        $(".gotoRetailer").removeClass("hiddenImp");
      }
      $("body").append('<script async="async" src="https://mwf-service.akamaized.net/mwf/js/bundle/1.57.8/mwf-auto-init-main.var.min.js"></scr' + 'ipt>')
    }
    
  }
  
  function hatchCSS() {
    $("body").append( '<style>' +
                        '.hatchDialog .dialogbox[role="dialog"] { border: 0; max-width: 1000px; min-width: 820px; height: auto !important; }' +
                        '.hatchDialog [role="presentation"] { background: rgba(0,0,0,0.6); }' +
                        '.dialogbox:focus { border: 2px dotted #000 !Important; }' +
                        '.dialogbox:focus { outline: 2px dotted #FFF !Important; }' +
                        '.hatchProdImg { width: 45%; max-width: 250px; display: inline-block; vertical-align: middle; margin-left: 6%; }' +
                        '.hatchProdImg img { width: 100%; }' +
                        '.hatchProdTitle { width: 54%; display: inline-block; vertical-align: middle; margin-left: 48px; }' +
                        '.lbheader { height: 100%; }' +
                        '.hatchDialog .c-glyph.glyph-cancel:focus:before { background: rgba(125,125,125,.5); }' +
                        '.dialogbox .lbheader .hatchProdTitle h2 { font-size: 24px; text-align: left; font-weight: 100; }' +
                        '.oostext { color: #6d6d6d; }' +
                        '.hatchretailer { padding: 4px 0; }' +
                        '.retline { vertical-align: middle; width: 33.333%; display: inline-block; text-align: center; }' +
                        '.retlogo img { max-width: 120px; }' +
                        '.retprice { font-size: 18px; }' +
                        '.hatchDialog hr { width: 88%; }' +
                        '.lblegal { font-size: 13px; margin-top: 30px; }' +
                        '.prodhidden { display: none !important; }' +
                        '.lbbody { margin-top: 30px; }' +
                        '.dialogbox fieldset { position: relative; left: 38%; bottom: 48px; width: 43%;}' +
                        '.dialogbox label.c-label { display: inline-block; font-size: 18px; font-weight: 700; }' +
                        '.retline s { margin-right: 8px; }' +
                        '@media (max-width: 1000px) {' +
                        '.dialogbox fieldset { position: static; margin: 0 auto; width: auto; }' +
                        '}' +
                        '@media (max-width: 860px) {' +
                          '.hatchDialog .dialogbox[role="dialog"] { border: 0; max-width: 90%; min-width: 0; }' +
                          '.hatchProdImg { width: 100%; display: block; margin: 0 auto 20px !important;}' +
                          '.hatchProdTitle { width: 100%; display: block; margin-left: 0;}' +
                          '.dialogbox .lbheader .hatchProdTitle h2 { text-align: center; }' +
                          '.dialogbox label.c-label { margin-top: 0; }' +
                        '}' +
                        '@media (max-width: 539px) {' +
                          '.hatchDialog .dialogbox[role="dialog"] { margin: 2vh auto }' +
                          '.retline { width: 100%; display: block; }' +
                          '.retline.retprice { margin-top: 12px; }' +
                        '}' +
                        '.customradio input {-webkit-appearance: radio;-moz-appearance: radio;appearance: radio;}' +
                      '</style>'
                      )
  }
  