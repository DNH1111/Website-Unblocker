$(document).ready(function() {
    var priceFormat = {
  "locales": {
    "en-us": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "$#",
      "keyHasdecimal": true,
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " MSRP",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "XboxOneInterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "ar-ae": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "AED #",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "ar-sa": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "SR.#",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "cs-cz": {
      "keyPreorder": "Předobjednat",
      "keyPriceformat": "# Kč",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": " ",
      "keyMsrpbefore": "Doporučená maloobchodní cena ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Ihned k dispozici",
      "keyInterstitial": "X1SGenericInterstitial",
      "keyJumpdown": "Chcete-li se dozvědět více o cenách, přejděte do části právní upozornění."
    },
    "da-dk": {
      "keyPreorder": "Forudbestil",
      "keyPriceformat": "# kr",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (vejl. udsalgspris)",
      "keyAvailablenow": "Kan fås nu",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Gå til juridisk ansvarsfraskrivelse for at få mere at vide om priser"
    },
    "de-at": {
      "keyPreorder": "Vorbestellen",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "Geschätzter Verkaufspreis: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Jetzt erhältlich.",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Über den Haftungsausschluss weiter unten sind weitere Informationen zur Preisgestaltung erhältlich"
    },
    "de-ch": {
      "keyPreorder": "Vorbestellen",
      "keyPriceformat": "CHF #",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "Geschätzter Verkaufspreis: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Jetzt erhältlich.",
      "keyInterstitial": "x1sgenericinterstitial",
      "keyJumpdown": "Über den Haftungsausschluss weiter unten sind weitere Informationen zur Preisgestaltung erhältlich"
    },
    "de-de": {
      "keyPreorder": "Vorbestellen",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "Geschätzter Verkaufspreis: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Jetzt erhältlich.",
      "keyInterstitial": "X1XInterstitial",
      "keyJumpdown": "Über den Haftungsausschluss weiter unten sind weitere Informationen zur Preisgestaltung erhältlich"
    },
    "el-gr": {
      "keyPreorder": "Προπαραγγελία",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Διαθέσιμο τώρα",
      "keyInterstitial": "",
      "keyJumpdown": "Μεταβείτε στη νομική αποποίηση ευθυνών για να μάθετε περισσότερα σχετικά με την τιμολόγηση"
    },
    "en-au": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "$# ",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "RRP: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "Xboxoneconsoles500gbinterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-ca": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "$#",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " MSRP",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "xboxoneconsolenonrefurbinterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-gb": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "£#",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " MSRP",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "X1GenericInterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-hk": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "HK$#",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-ie": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "€ #",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " MSRP",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-in": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "₹ #",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-nz": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "$# ",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "RRP: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "Xboxoneconsoles500gbinterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-sg": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "SG$#",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "XboxInterstitial",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "en-za": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "es-ar": {
      "keyPreorder": "Reservar",
      "keyPriceformat": "",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Disponible ahora",
      "keyInterstitial": "",
      "keyJumpdown": "Ve al aviso de declinación de responsabilidades para obtener más información sobre los precios"
    },
    "es-cl": {
      "keyPreorder": "Reservar",
      "keyPriceformat": "",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Disponible ahora",
      "keyInterstitial": "",
      "keyJumpdown": "Ve al aviso de declinación de responsabilidades para obtener más información sobre los precios"
    },
    "es-co": {
      "keyPreorder": "Reservar",
      "keyPriceformat": "",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Disponible ahora",
      "keyInterstitial": "",
      "keyJumpdown": "Ve al aviso de declinación de responsabilidades para obtener más información sobre los precios"
    },
    "es-es": {
      "keyPreorder": "Reservar",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "PVPr: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Ya disponible",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Accede al aviso de declinación de responsabilidades para obtener más información sobre los precios"
    },
    "es-mx": {
      "keyPreorder": "Reservar",
      "keyPriceformat": "$#",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " Precio de lista",
      "keyAvailablenow": "Disponible ahora",
      "keyInterstitial": "",
      "keyJumpdown": "Ve al aviso de declinación de responsabilidades para obtener más información sobre los precios"
    },
    "fi-fi": {
      "keyPreorder": "Tilaa ennakkoon",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (valmistajan OVH)",
      "keyAvailablenow": "Nyt saatavilla",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Siirry lakisääteiseen vastuuvapauslausekkeeseen saadaksesi lisätietoja hinnoittelusta"
    },
    "fr-be": {
      "keyPreorder": "Précommander",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " PDSF",
      "keyAvailablenow": "Déjà disponible",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Accédez à l'avis de non-responsabilité pour en savoir plus sur les prix"
    },
    "fr-ca": {
      "keyPreorder": "Précommander",
      "keyPriceformat": "# $",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": " ",
      "keyMsrpbefore": "Prix de détail suggéré : ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Maintenant offert",
      "keyInterstitial": "xboxoneconsolenonrefurbinterstitial ",
      "keyJumpdown": "Accédez aux mentions légales pour en savoir plus sur la tarification"
    },
    "fr-fr": {
      "keyPreorder": "Précommander",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " PDSF",
      "keyAvailablenow": "Déjà disponible",
      "keyInterstitial": "X1SGenericInterstitial",
      "keyJumpdown": "Accédez à l'avis de non-responsabilité pour en savoir plus sur les prix"
    },
    "fr-ch": {
      "keyPreorder": "Précommander",
      "keyPriceformat": "CHF #",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " PDSF",
      "keyAvailablenow": "Déjà disponible",
      "keyInterstitial": "x1sgenericinterstitial",
      "keyJumpdown": "Accédez à l'avis de non-responsabilité pour en savoir plus sur les prix"
    },
    "he-il": {
      "keyPreorder": "Pre-order",
      "keyPriceformat": "# NIS",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Available Now",
      "keyInterstitial": "",
      "keyJumpdown": "Jump down to the legal disclaimer to learn more about pricing"
    },
    "hu-hu": {
      "keyPreorder": "Előrendelés",
      "keyPriceformat": "# HUF",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": "",
      "keyMsrpbefore": "Listaár: ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Már megjelent",
      "keyInterstitial": "",
      "keyJumpdown": "Ugrás a jogi nyilatkozatra, hogy többet megtudj az árakról"
    },
    "it-it": {
      "keyPreorder": "Preordina",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " Prezzo al dettaglio stimato dal produttore",
      "keyAvailablenow": "Disponibile",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Passa alle note legali qui sotto per ulteriori informazioni sui prezzi"
    },
    "ja-jp": {
      "keyPreorder": "予約",
      "keyPriceformat": "# 円",
      "keyHasdecimal": false,
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (税込)",
      "keyAvailablenow": "発売中",
      "keyInterstitial": "",
      "keyJumpdown": "免責事項に移動して価格設定の詳細をご覧ください"
    },
    "ko-kr": {
      "keyPreorder": "미리 주문하기",
      "keyPriceformat": "₩#",
      "keyHasdecimal": false,
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "지금 구매 가능",
      "keyInterstitial": "",
      "keyJumpdown": "법적 고지 사항으로 이동하여 가격에 대해 자세히 알아보십시오."
    },
    "nb-no": {
      "keyPreorder": "Forhåndsbestill",
      "keyPriceformat": "# kr",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (anbefalt utsalgspris)",
      "keyAvailablenow": "Tilgjengelig nå",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Hopp ned til den juridiske ansvarsfraskrivelsen for å lære mer om priser"
    },
    "nl-be": {
      "keyPreorder": "Reserveer",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (aanbevolen verkoopprijs)",
      "keyAvailablenow": "Nu beschikbaar",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Ga naar de juridische disclaimer om meer te weten te komen over de prijzen"
    },
    "nl-nl": {
      "keyPreorder": "Reserveer",
      "keyPriceformat": "€ #",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (aanbevolen verkoopprijs)",
      "keyAvailablenow": "Nu beschikbaar",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Ga naar de juridische disclaimer om meer te weten te komen over de prijzen"
    },
    "pl-pl": {
      "keyPreorder": "Zamów w przedsprzedaży",
      "keyPriceformat": "# zł",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": " ",
      "keyMsrpbefore": "",
      "keyMsrpafter": " MSRP",
      "keyAvailablenow": "Dostępny już teraz",
      "keyInterstitial": "X1SGenericInterstitial",
      "keyJumpdown": "Przejdź w dół i przeczytaj zastrzeżenia prawne, aby dowiedzieć się więcej na temat cen"
    },
    "pt-br": {
      "keyPreorder": "Pré-venda",
      "keyPriceformat": "R$ #",
      "keyHasdecimal": false,
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Disponível agora",
      "keyInterstitial": "",
      "keyJumpdown": "Acesse a isenção de responsabilidade jurídica para saber mais sobre os preços"
    },
    "pt-pt": {
      "keyPreorder": "Pré-encomendar",
      "keyPriceformat": "#€",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " PRVP",
      "keyAvailablenow": "Já Disponível",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Aceder à exclusão de responsabilidades legais para obter mais informações sobre preços"
    },
    "ru-ru": {
      "keyPreorder": "Предзаказ",
      "keyPriceformat": "# ₽",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": "",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Уже в продаже",
      "keyInterstitial": "",
      "keyJumpdown": "Перейти к заявлению об отказе от ответственности, чтобы узнать больше о ценообразовании"
    },
    "sk-sk": {
      "keyPreorder": "Rezervovať",
      "keyPriceformat": "# €",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ".",
      "keyMsrpbefore": "",
      "keyMsrpafter": " (odporúčaná maloobchodná cena výrobcu)",
      "keyAvailablenow": "Teraz k dispozícii",
      "keyInterstitial": "",
      "keyJumpdown": "Ak sa chcete dozvedieť viac o cenách, prejdite dole na právne vyhlásenie"
    },
    "sv-se": {
      "keyPreorder": "Förbeställ",
      "keyPriceformat": "# kr",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": "",
      "keyMsrpbefore": "Rek. pris ",
      "keyMsrpafter": "",
      "keyAvailablenow": "Finns nu",
      "keyInterstitial": "XboxOneSInterstitial",
      "keyJumpdown": "Gå till ansvarsfriskrivningen för att läsa mer om prissättning"
    },
    "tr-tr": {
      "keyPreorder": "Ön sipariş verin",
      "keyPriceformat": "",
      "keyHasdecimal": "TRUE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "Şimdi Satışta",
      "keyInterstitial": "",
      "keyJumpdown": "Fiyatlandırma hakkında daha fazla bilgi edinmek için yasal uyarı bölümüne gidin"
    },
    "zh-cn": {
      "keyPreorder": "预订",
      "keyPriceformat": "undefined",
      "keyHasdecimal": "undefined",
      "keyThousandcharacter": "undefined",
      "keyMsrpbefore": "undefined",
      "keyMsrpafter": "undefined",
      "keyAvailablenow": "",
      "keyInterstitial": "",
      "keyJumpdown": "向下跳到法律免責聲明，以深入了解定價"
    },
    "zh-hk": {
      "keyPreorder": "預先訂購",
      "keyPriceformat": "HK$#",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "現已推出",
      "keyInterstitial": "",
      "keyJumpdown": "向下跳到法律免責聲明，以深入了解定價"
    },
    "zh-tw": {
      "keyPreorder": "預購",
      "keyPriceformat": "NT$#",
      "keyHasdecimal": "FALSE",
      "keyThousandcharacter": ",",
      "keyMsrpbefore": "",
      "keyMsrpafter": "",
      "keyAvailablenow": "現已推出",
      "keyInterstitial": "",
      "keyJumpdown": "向下跳至法律免責聲明，以深入了解定價"
    }
  }
  }

  var globalSoldout = {
    "locales": {
        "en-us": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "ar-ae": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "ar-sa": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "cs-cz": {
            "keySoldout": " Vyprodáno",
            "keyComingsoon": "Již brzy k předobjednání"
        },
        "da-dk": {
            "keySoldout": "Udsolgt",
            "keyComingsoon": "Kommer snart"
        },
        "de-at": {
            "keySoldout": " Ausverkauft",
            "keyComingsoon": "Demnächst verfügbar"
        },
        "de-ch": {
            "keySoldout": " Ausverkauft",
            "keyComingsoon": "Demnächst verfügbar"
        },
        "de-de": {
            "keySoldout": " Ausverkauft",
            "keyComingsoon": "Demnächst verfügbar"
        },
        "el-gr": {
            "keySoldout": " Έχει εξαντληθεί",
            "keyComingsoon": "Προσεχώς προπαραγγελίες"
        },
        "en-au": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-ca": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-gb": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-hk": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-ie": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-in": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-nz": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-sg": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "en-za": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "es-ar": {
            "keySoldout": "Agotado",
            "keyComingsoon": "Reservas disponibles próximamente"
        },
        "es-cl": {
            "keySoldout": "Agotado",
            "keyComingsoon": "Reservas disponibles próximamente"
        },
        "es-co": {
            "keySoldout": "Agotado",
            "keyComingsoon": "Reservas disponibles próximamente"
        },
        "es-es": {
            "keySoldout": " Agotado",
            "keyComingsoon": "Próximamente"
        },
        "es-mx": {
            "keySoldout": "Agotado",
            "keyComingsoon": "Reservas disponibles próximamente"
        },
        "fi-fi": {
            "keySoldout": " Loppuunmyyty",
            "keyComingsoon": "Tulossa pian"
        },
        "fr-be": {
            "keySoldout": "Épuisé",
            "keyComingsoon": "Bientôt en précommande"
        },
        "fr-ca": {
            "keySoldout": "En rupture de stock",
            "keyComingsoon": "Précommande bientôt offerte"
        },
        "fr-ch": {
            "keySoldout": " Épuisé",
            "keyComingsoon": "Bientôt en précommande"
        },
        "fr-fr": {
            "keySoldout": " Épuisé",
            "keyComingsoon": "Bientôt en précommande"
        },
        "he-il": {
            "keySoldout": "Sold Out",
            "keyComingsoon": "Pre-order coming soon"
        },
        "hu-hu": {
            "keySoldout": "Elfogyott",
            "keyComingsoon": "Hamarosan előrendelhető"
        },
        "it-it": {
            "keySoldout": "Esaurito",
            "keyComingsoon": "Disponibile a breve",
        },
        "ja-jp": {
            "keySoldout": " 完売",
            "keyComingsoon": "間もなく予約開始"
        },
        "ko-kr": {
            "keySoldout": "품절",
            "keyComingsoon": "사전 주문이 곧 시작됩니다."
        },
        "nb-no": {
            "keySoldout": "Utsolgt",
            "keyComingsoon": "Kommer snart"
        },
        "nl-be": {
            "keySoldout": "Uitverkocht",
            "keyComingsoon": "Binnenkort beschikbaar"
        },
        "nl-nl": {
            "keySoldout": "Uitverkocht",
            "keyComingsoon": "Binnenkort beschikbaar"
        },
        "pl-pl": {
            "keySoldout": " Wyprzedane",
            "keyComingsoon": "Wkrótce w sprzedaży"
        },
        "pt-br": {
            "keySoldout": "Esgotado",
            "keyComingsoon": "Pré-venda em breve"
        },
        "pt-pt": {
            "keySoldout": "Esgotado",
            "keyComingsoon": "Brevemente disponível"
        },
        "ru-ru": {
            "keySoldout": " Распродано",
            "keyComingsoon": "Скоро в продаже"
        },
        "sk-sk": {
            "keySoldout": " Vypredané",
            "keyComingsoon": "Pripravujeme"
        },
        "sv-se": {
            "keySoldout": " Utsåld",
            "keyComingsoon": "Kan snart förbeställas"
        },
        "tr-tr": {
            "keySoldout": " Tükendi",
            "keyComingsoon": "Çok yakında"
        },
        "zh-hk": {
            "keySoldout": "售罄",
            "keyComingsoon": "即將推出預購"
        },
        "zh-tw": {
            "keySoldout": "售罄",
            "keyComingsoon": "即將推出預購"
        }
    }
}
  
    var API_pop = (function() {
        var stripQueryString = document.URL.split("?");
        var currentUrl = stripQueryString[0].split("/");
        var pageId = currentUrl[currentUrl.length - 1];
        if (pageId.toLowerCase() === "home") {
            pageId = currentUrl[currentUrl.length - 2];
        }
        if (pageId.indexOf("#") !== -1) {
            pageId = pageId.split("#")[0];
        }
        var urlRegion = document.URL.split("/")[3].toLowerCase();
        var countryCode = urlRegion.split("-")[1].toUpperCase();
        var prodId = $(".accInfo").attr("data-productId");
        var hasCTA = true;
        var sheetDataLoc = allAccessories.locales[urlRegion];
        var regionSoldout = globalSoldout.locales[urlRegion];
        var currentProduct;
        var apiMSRPPrice = "";
        var apiListPrice = "";
        for (var i = 0; i < sheetDataLoc.length; i++) {
            prodId = undefined;
            if (sheetDataLoc[i].id.toLowerCase() === pageId.toLowerCase()) {
                currentProduct = sheetDataLoc[i];
                prodId = sheetDataLoc[i].productId.toUpperCase();
                if (currentProduct.retailer === "retailers-page") {
                    $(".gotoRetailer").attr("href", "https://www.xbox.com/" + urlRegion + "/where-to-buy#accessory");
                    $(".gotoRetailer").removeClass("hiddenImp")
                } else if (currentProduct.retailer === "lightbox") {
                    $(".retailerLB").removeClass("hiddenImp")
                } else if (currentProduct.retailer === "no-retailers") {
                    $(".gotoRetailer").css("display", "none")
                } else {
                    hasCTA = false;
                    if (currentProduct.productId === "") {
                        $(".greenBar").remove();
                    }
                }
                break;
            }
        }
        if (prodId === undefined) { throw ("New Product ID " + pageId + " not found in Accessories Hub JSON allAccessories.js. Please check spreadsheet.") }
  
  
        var prodIdUpd = $(".accInfo").attr("data-updated-productId");
        var specIdBig = $(".accInfo").attr("data-special-productId");
        var currencyFormat = priceFormat.locales[urlRegion];
        var priceAsterisks = ($(".accInfo").attr("data-num-asterisk") == "2") ? "<a class='c-hyperlink' href='#price-legal' style='margin: 0' aria-label='" + priceFormat.locales[urlRegion]["keyJumpdown"] + "'><sup>**</sup></a>" : "<a class='c-hyperlink' href='#price-legal' style='margin: 0;' aria-label='" + priceFormat.locales[urlRegion]["keyJumpdown"] + "'><sup>*</sup></a>";
  
         // Adding Price Legal ID Dynamically
            $(".legal .c-caption-1").eq(1).attr("id", "price-legal");
  
  
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
  
        // check to see if updated bigid is live
        if (prodId !== undefined && prodId !== "" && prodId !== "####") {
            if (prodId.length === 12) {
                var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodId + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
                $.get(apiUrlTest)
                    .done(function(responseData) {
                        apiDataTest = responseData;
                        if (apiDataTest.Products.length === 0) {
                            idFound();
                        } else {
                            idFound("true");
                        }
                    })
                    .fail(function() {
                        idFound();
                    })
            } else {
                var testSku = prodId.split("/")[1];
                var apiUrlTest = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodId.split("/")[0] + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
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
                                    if ((z.SkuId === testSku) && stillLooking) {
                                        skuFound = true;
                                        apiMSRPPrice = z.OrderManagementData.Price.MSRP;
                                        apiListPrice = z.OrderManagementData.Price.ListPrice;
                                        //console.log(apiMSRPPrice + " - " + apiListPrice);
                                        stillLooking = false; //Leave loop, there may be multiple matches but the first one is ususally the one you want.
                                    }
                                })
                            })
                            if (skuFound === false) {
                                idFound();
                            } else {
                                var ispreorder = responseData.Products[0].DisplaySkuAvailabilities[0].Sku.Properties.IsPreOrder;
                                if (ispreorder.toString().toLowerCase() === "true") {
                                    var potext = priceFormat.locales[urlRegion].keyPreorder.toUpperCase();
                                    $(".addToCartBtn").text(potext);
                                    $(".purchRow1 .addToCartBtn").removeClass("hiddenImp");
                                    idFound("preorder");
                                } else {
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
            idFound();
        }
  
        function idFound(useupdated) {
            var prodIdBig = prodId.split("/")[0];
            var apiUrl = 'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=' + prodIdBig + '&market=' + countryCode + '&languages=' + urlRegion + '&MS-CV=DGU1mcuYo0WMMp+F.1'
            //console.log(apiUrl);
            var guidIds = [];
            var apiData;
            var customATC = $(".accInfo").attr("data-custom-addtocart-url");
            if (customATC === undefined) { customATC = ""; }
  
            var sheetDataLoc = allAccessories.locales[urlRegion];
  
            // Add to Cart if in new store
            if (prodIdBig.length > 10) {
                $.get(apiUrl)
                    .done(function(responseData) {
                        apiData = responseData;
                        populate();
                    })
            } else {
  
            }
  
            if (currentProduct === undefined) {
                throw ("The ProductID " + prodId + " is not found in the console JSON. Please check the spreadsheet.");
            }
            var buytext = currentProduct.buyText; // USE THIS ONE
  
            $(".buyText").text(buytext);
  
            if ($(".buyText").text() === "####") {
                $(".buyText").hide();
            }
  
            var priceNumber = currentProduct.priceNumber;
            var priceText = currentProduct.priceText;
            var tprNumber = currentProduct.tprPriceNumber;
            var beforeMSRP = priceFormat.locales[urlRegion].keyMsrpbefore;
            var afterMSRP = priceFormat.locales[urlRegion].keyMsrpafter;
  
            var useAPIPrice = true; // Using a '!' character at the beginning of the priceText in the allConsoles.js price to override the API price.
            if (priceText !== "" && priceText !== undefined && priceText.indexOf('!') != -1) {
                useAPIPrice = false;
            }
  
            var canUseAPI_MSRP = (apiMSRPPrice !== "" && apiMSRPPrice != "0" && apiMSRPPrice != "100000" && useAPIPrice == true);
  
            if (priceNumber != "####") {
                var priceText = formatCurrency(priceNumber, currencyFormat);
                if (tprNumber != "####") {
                    var discountedPriceText = formatCurrency(tprNumber, currencyFormat);
                }
            }
            if (canUseAPI_MSRP) {
                priceText = formatCurrency(apiMSRPPrice, currencyFormat);
                //console.log("msrp price= " + apiMSRPPrice);
                //console.log("list price = " + apiListPrice);
                if (apiListPrice !== "" && (apiListPrice < apiMSRPPrice)) {
                    discountedPriceText = formatCurrency(apiListPrice, currencyFormat);
                    //console.log("discount price = " + discountedPriceText);
                }
            }
  
            if (priceText && priceText.indexOf("####") == -1) {
                if (!discountedPriceText && urlRegion !== "ja-jp") {
                    $(".price-msrp").append(beforeMSRP + priceText + priceAsterisks + afterMSRP);
                    console.log(urlRegion + " " + priceText);
                }else if (!discountedPriceText && urlRegion === "ja-jp"){
                    $(".price-msrp").append(beforeMSRP + priceText + afterMSRP + priceAsterisks);
                } 
                else {
                    $(".price-msrp").append('<span class="x-screen-reader">' + 'Full price was'+ '</span>' + beforeMSRP + '<span style="text-decoration: line-through;"> ' + priceText + afterMSRP + ' </span> ' + '<span class="x-screen-reader">' + 'New price is'+ '</span>' + discountedPriceText + priceAsterisks);
                }
  
            }
  
  
            // $(".addToCartBtn").attr("data-clickname", $(".addToCartBtn").attr("data-clickname").replace("ACCESSORYNAME", currentProduct.id));

            var addToCartAria = $(".addToCartBtn").attr("aria-label").replace("PRODUCT", currentProduct.headline)
            if (useupdated.toString().toLowerCase() === "preorder") {
                var potext = priceFormat.locales[urlRegion].keyPreorder;
                $(".addToCartBtn").attr("aria-label", addToCartAria.replace("Add", potext));
            
            } else {
                $(".addToCartBtn").attr("aria-label", addToCartAria);
            }
  
            var populate = function() {
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
                        if (apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].SkuId === sid) {
                            var availId = apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].AvailabilityId;
                            var ispreorder = apiData.Products[0].DisplaySkuAvailabilities[t].Sku.Properties.IsPreOrder;
                            if (ispreorder.toString().toLowerCase() === "true") {
                                buttonPreorder();
                            }
                            if ($(".availableDate").length === 0) {
                                $(".buyText").before('<h3 class="c-subheading-2 availableDate"></h3>');
                            }
                            if (apiData.Products[0].DisplaySkuAvailabilities[t].Availabilities[0].Properties.PreOrderReleaseDate) {
                                //moved buytext availabledate from here
  
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
                                    availConvert("Ab ", "daymonth", " erhältlich");
                                } else if (nlArray.indexOf(urlRegion) > -1) {
                                    availConvert("Verkrijgbaar op ", "daymonth");
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
                                    availConvert("Disponibile dal ", "daymonth");
                                } else if (urlRegion === "nb-no") {
                                    availConvert("Tilgjengelig ", "daymonth");
                                } else if (urlRegion === "pl-pl") {
                                    availConvert("W sprzedaży od ", "daymonth", " r.");
                                } else if (urlRegion === "pt-pt") {
                                    availConvert("Disponível a ", "daymonth");
                                } else if (urlRegion === "ru-ru") {
                                    availConvert("В продаже ", "daymonth");
                                } else if (urlRegion === "sk-sk") {
                                    availConvert("K dispozícii ", "daymonth");
                                } else if (urlRegion === "sv-se") {
                                    availConvert("Tillgänglig ", "daymonth");
                                } else if (urlRegion === "ja-jp") {
                                    availConvert("発売日 ", "ja");
                                } else if (urlRegion === "pt-br") {
                                    availConvert("Disponível ", "daymonth");
                                }
  
                                function availConvert(word, monthday, postWord) {
                                    if (!postWord) { postWord = ""; } //Check if postWord is undefined
                                    var slashdate = releasedateraw.toLocaleDateString(urlRegion, monthday);
                                    $(".availableDate").text(word + slashdate + postWord);
                                    var nowDate = new Date();
                                    if (currentProduct.availability !== "####") {
                                        $(".availableDate").text(currentProduct.availability);
                                    }
                                    if (releasedateraw < nowDate) {
                                        hideDate();
                                    }
  
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
                var interstitial = "" /*priceFormat.locales[urlRegion].keyInterstitial;    Add this back in if it is requested*/ ;
                if (interstitial !== "") {
                    cartURL = cartURL + "&aid=" + availId + "&cid=" + interstitial;
                }
                if (specIdBig !== "" && specIdBig !== undefined) {
                    cartURL = "https://www.microsoft.com/" + urlRegion + "/store/build/" + "xbox-one-s-bundle" + "/" + specIdBig;
                }
                if (customATC !== "") {
                    cartURL = customATC;
                }
                $(".addToCartBtn").attr("href", cartURL);
  
                var stockUrl = "https://inv.mp.microsoft.com/v2.0/inventory/" + countryCode + "/" + prodIdBig + "/" + sid + "/" + availId;
                //console.log(stockUrl);
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
                        //console.log("instock= " + instock);
                        //console.log("future instock= " + futureInstock.toString());
                        $(".addToCartBtn").removeClass("hiddenImp");
                        //console.log("ispreorder= " + ispreorder)
  
                        //MAY NEED TO UPDATE THIS CODE THE NEXT TIME THERE IS  A PRE-ORDER CONSOLE BUNDLE
                        if ((instock.toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() !== "true" */ ) && (futureInstock.toString().toLowerCase() !== "true" /*&& ispreorder.toString().toLowerCase() === "true"*/ )) {
                            console.log("OOS");
                            $(".retailerBlade .addToCartBtn").css("background-color", "#505050").attr("tabindex", "-1").css("color", "#FFFFFF").css("pointer-events", "none").text(regionSoldout["keySoldout"].toUpperCase());
                            $(".m-in-page-navigation .addToCartBtn").addClass("hiddenImp");
                            outOfStock();
                        }
                    })
                    .fail(function() {
                        outOfStock();
                    })
                $(".addToCartBtn").css("visibility", "visible");
            }
  
            function outOfStock() {
                //console.log("running OOS");
                if (customATC === "") {
                    // $(".addToCartBtn").addClass("hiddenImp");
                    if (hasCTA === false) {
                        $(".greenBar").remove();
                    }
                }
            }
  
            function hideDate(alternateText) {
                $(".availableDate").remove();
            }
  
            function buttonPreorder() {
                var text = priceFormat.locales[urlRegion].keyPreorder.toUpperCase();
                $(".addToCartBtn").text(text);
            }
            //If you don't send in the format from the PriceFormat JSON, you're going to have a bad time.
            function formatCurrency(price, format) {
                var formattedPrice = "" + price;
                if (!format.keyHasdecimal) {
                    formattedPrice = formattedPrice.split(".")[0];
                } else if (formattedPrice.split(".")[1] > 0) {
                    formattedPrice = formattedPrice.split(".")[0] + "." + formattedPrice.split(".")[1];
                    if (formattedPrice.split(".")[1].length < 2) {
                        formattedPrice = formattedPrice + "0"
                    }
                } else if (formattedPrice.indexOf(".99") === -1) {
                    formattedPrice = formattedPrice.split(".")[0] + ".00";
                } else {
                    formattedPrice = formattedPrice.split(".")[0] + "." + formattedPrice.split(".")[1];
                }
                if (formattedPrice.split(".")[0].length > 3) { // Needs to figure out thousands
                    if (!format.keyHasdecimal) {
                        formattedPrice = formattedPrice.substring(0, formattedPrice.length - 3) + "*" + formattedPrice.substring(formattedPrice.length - 3, formattedPrice.length);
                    } else {
                        formattedPrice = formattedPrice.substring(0, formattedPrice.length - 6) + "*" + formattedPrice.substring(formattedPrice.length - 6, formattedPrice.length);
                    }
                }
                if (format.keyThousandcharacter === ",") {
                    formattedPrice = formattedPrice.replace("*", format.keyThousandcharacter);
                } else {
                    formattedPrice = formattedPrice.replace(".", ",");
                    formattedPrice = formattedPrice.replace("*", format.keyThousandcharacter);
                }
                formattedPrice = "" + format.keyPriceformat.replace("#", formattedPrice);
  
                return formattedPrice;
            }
  
            // clone to bottom purchase section
            $(".purchRow1").clone().appendTo(".duplicateBuy");
            $(".purchRow2").clone().appendTo(".duplicateBuy");
            $(".duplicateHeading").text(currentProduct.headline);
            if (currentProduct.availability !== "####" && $(".availableDate") !== undefined) {
                $(".buyText").before('<h3 class="c-subheading-2 availableDate">' + currentProduct.availability + '</h3>');
            }
        }
  
    })();
  
  });