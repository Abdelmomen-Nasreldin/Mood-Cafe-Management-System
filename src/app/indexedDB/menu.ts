const menu = [
  {
      id: "1",
      name: "شای",
      price: 10,
      english_name: "TEA",
      category: "hot"
  },
  {
      id: "2",
      name: "شاي فتلة",
      price: 10,
      english_name: "THREADING TEA",
      category: "hot"
  },
  {
      id: "3",
      name: "شاي اخضر",
      price: 12,
      english_name: "GREEN TEA",
      category: "hot"
  },
  {
      id: "4",
      name: "شاي باللبن",
      price: 25,
      english_name: "TEA WITH MILK",
      category: "hot"
  },
  {
      id: "5",
      name: "نعناع",
      price: 10,
      english_name: "MINT",
      category: "hot"
  },
  {
      id: "6",
      name: "قرفة",
      price: 10,
      english_name: "CINNAMON",
      category: "hot"
  },
  {
      id: "7",
      name: "قرفة باللبن",
      price: 25,
      english_name: "CINNAMON WITH MILK",
      category: "hot"
  },
  {
      id: "8",
      name: "قرفة تفاح",
      price: 25,
      english_name: "APPLE CINNAMON",
      category: "hot"
  },
  {
      id: "9",
      name: "ينسون",
      price: 10,
      english_name: "ANISE",
      category: "hot"
  },
  {
      id: "10",
      name: "ينسون ليمون",
      price: 12,
      english_name: "ANISE LEMON",
      category: "hot"
  },
  {
      id: "11",
      name: "جنزبيل",
      price: 10,
      english_name: "GINGER",
      category: "hot"
  },
  {
      id: "12",
      name: "جنزبيل ليمون",
      price: 12,
      english_name: "GINGER LEMON",
      category: "hot"
  },
  {
      id: "13",
      name: "اضافة عسل",
      price: 3,
      english_name: "WITH HONEY",
      category: "others"
  },
  {
      id: "14",
      name: "جنزبيل حليب",
      price: 25,
      english_name: "GINGER MILK",
      category: "hot"
  },
  {
      id: "15",
      name: "حلبة ",
      price: 10,
      english_name: "HELBA",
      category: "hot"
  },
  {
      id: "16",
      name: "حلبة حليب",
      price: 25,
      english_name: "HELBA MILK",
      category: "hot"
  },
  {
      id: "17",
      name: "كاكاو",
      price: 15,
      english_name: "COCOA",
      category: "hot"
  },
  {
      id: "18",
      name: "كاكاو حليب",
      price: 25,
      english_name: "COCOA MILK",
      category: "hot"
  },
  {
      id: "19",
      name: "دوم",
      price: 15,
      english_name: "DOM",
      category: "hot"
  },
  {
      id: "20",
      name: "خلطة",
      price: 12,
      english_name: "MIXHERPS",
      category: "hot"
  },
  {
      id: "21",
      name: "سحلب",
      price: 25,
      english_name: "SAHLAB",
      category: "hot"
  },
  {
      id: "22",
      name: "سحلب فواكة",
      price: 35,
      english_name: "SAHLAB FRUIT",
      category: "hot"
  },
  {
      id: "23",
      name: "سحلب مكسرات",
      price: 30,
      english_name: "SANLAB NUTS",
      category: "hot"
  },
  {
      id: "24",
      name: "كركدية",
      price: 10,
      english_name: "KARKADIH",
      category: "hot"
  },
  {
      id: "25",
      name: "عناب ساقع",
      price: 25,
      english_name: "COLD JENNAB",
      category: "cold"
  },
  {
      id: "26",
      name: "قهوة  فاتح",
      price: 20,
      english_name: "LIGHT COFFEE",
      category: "hot"
  },
  {
      id: "27",
      name: "قهوة  محوج",
      price: 23,
      english_name: " COFFEE WITH CARDAMOM",
      category: "hot"
  },
  {
      id: "28",
      name: "قهوة  وسط",
      price: 23,
      english_name: "MEDIUM COFFEE",
      category: "hot"
  },
  {
      id: "29",
      name: "قهوة  غامق",
      price: 23,
      english_name: "DARK COFFEE",
      category: "hot"
  },
  {
      id: "30",
      name: "قهوة دبل",
      price: 33,
      english_name: "DOUBLE COFFEE",
      category: "hot"
  },
  {
      id: "31",
      name: "قهوة فرنساوى",
      price: 27,
      english_name: "FRENCH COFFEE",
      category: "hot"
  },
  {
      id: "32",
      name: "قهوة بندق",
      price: 27,
      english_name: "HAZELNUT COFFEE",
      category: "hot"
  },
  {
      id: "33",
      name: "أسبرسو",
      price: 33,
      english_name: "ESPRESSO",
      category: "hot"
  },
  {
      id: "34",
      name: "أسبرسو دبل",
      price: 43,
      english_name: "DOUBLE ESPRESSO",
      category: "hot"
  },
  {
      id: "35",
      name: "ميكاتو",
      price: 45,
      english_name: "MIKATO",
      category: "hot"
  },
  {
      id: "36",
      name: "لاتيه",
      price: 35,
      english_name: "LATTE",
      category: "hot"
  },
  {
      id: "37",
      name: "موكا",
      price: 35,
      english_name: "MOCHA",
      category: "hot"
  },
  {
      id: "38",
      name: "كابتشينو",
      price: 35,
      english_name: "CAPPUCCINO",
      category: "hot"
  },
  {
      id: "39",
      name: "هوت شوكليت",
      price: 35,
      english_name: "HOT CHOCOLATE",
      category: "hot"
  },
  {
      id: "40",
      name: "هوت سيدر",
      price: 25,
      english_name: "HOT CEDAR",
      category: "hot"
  },
  {
      id: "41",
      name: "نسكافيه كلاسيك",
      price: 20,
      english_name: "NESCAFE CLASSIC",
      category: "hot"
  },
  {
      id: "42",
      name: "نسكافيه حليب",
      price: 35,
      english_name: "NESCAFE WITH MILK",
      category: "hot"
  },
  {
      id: "43",
      name: "ايس كوفي",
      price: 35,
      english_name: "ICE COFFEE",
      category: "cold"
  },
  {
      id: "44",
      name: "كوفي ميكس",
      price: 20,
      english_name: "COFFEE MIX",
      category: "hot"
  },
  {
      id: "45",
      name: "اضافة الحليب",
      price: 15,
      english_name: "WITH MILK",
      category: "others"
  },
  {
      id: "46",
      name: "مانجو",
      price: 35,
      english_name: "MANGO",
      category: "cold"
  },
  {
      id: "47",
      name: "فراولة",
      price: 35,
      english_name: "STRAWBERRIES",
      category: "cold"
  },
  {
      id: "48",
      name: "جوافة",
      price: 35,
      english_name: "GUAVA",
      category: "cold"
  },
  {
      id: "49",
      name: "كوكتيل",
      price: 45,
      english_name: "COCKTAIL",
      category: "cold"
  },
  {
      id: "50",
      name: "ليمون - نعناع",
      price: 25,
      english_name: "LEMON-MINT",
      category: "cold"
  },
  {
      id: "51",
      name: "كيوي",
      price: 65,
      english_name: "KIWI",
      category: "cold"
  },
  {
      id: "52",
      name: "موز",
      price: 35,
      english_name: "BANANA",
      category: "cold"
  },
  {
      id: "53",
      name: "برتقال",
      price: 35,
      english_name: "ORANGE",
      category: "cold"
  },
  {
      id: "54",
      name: "بطيخ",
      price: 25,
      english_name: "WATERMELON",
      category: "cold"
  },
  {
      id: "55",
      name: "افوكادو",
      price: 65,
      english_name: "AVOCADO",
      category: "cold"
  },
  {
      id: "56",
      name: "بلح",
      price: 35,
      english_name: "DATES",
      category: "cold"
  },
  {
      id: "57",
      name: "وافل شيكولاته دارك",
      price: 40,
      english_name: "WAFFLE DARK CHOCO",
      category: "sweets"
  },
  {
      id: "58",
      name: "وافل شيكولاته بيضاء ",
      price: 40,
      english_name: "WAFFLE WHITE CHOCO",
      category: "sweets"
  },
  {
      id: "59",
      name: "وافل لوتس",
      price: 45,
      english_name: "WAFFLE LOTUS",
      category: "sweets"
  },
  {
      id: "60",
      name: "وافل ميكس",
      price: 50,
      english_name: "WAFFLE MIX",
      category: "sweets"
  },
  {
      id: "61",
      name: "وافل اوريو",
      price: 50,
      english_name: "WAFFLE OREO",
      category: "sweets"
  },
  {
      id: "62",
      name: "وافل شيكولاته بالموز",
      price: 45,
      english_name: "WAFFLE CHOCO BANANA",
      category: "sweets"
  },
  {
      id: "63",
      name: "عصير مودز",
      price: 45,
      english_name: "MOODS JUICE",
      category: "cold"
  },
  {
      id: "64",
      name: "كولا كانز",
      price: 23,
      english_name: "COLA KANZ",
      category: "cold"
  },
  {
      id: "65",
      name: "كولا زجاج",
      price: 20,
      english_name: "COLA MINI",
      category: "cold"
  },
  {
      id: "66",
      name: "مياه معدنية صغيرة",
      price: 8,
      english_name: "SMALL WATER",
      category: "cold"
  },
  {
      id: "67",
      name: "مياه معدنية كبيرة",
      price: 14,
      english_name: "BIG WATER",
      category: "cold"
  },
  {
      id: "68",
      name: "موخيتو",
      price: 35,
      english_name: "MOJITO",
      category: "cold"
  },
  {
      id: "69",
      name: "زبادي خلاط",
      price: 35,
      english_name: "YOGURT",
      category: "cold"
  },
  {
      id: "70",
      name: "زبادي مانجا",
      price: 40,
      english_name: "YOGURT  MANGO",
      category: "cold"
  },
  {
      id: "71",
      name: "زبادي موز",
      price: 35,
      english_name: "YOGURT BANANA",
      category: "cold"
  },
  {
      id: "72",
      name: "زبادي فراولة",
      price: 40,
      english_name: "YOGURT STRAWBERRY",
      category: "cold"
  },
  {
      id: "73",
      name: "زبادي فواكه",
      price: 45,
      english_name: "YOGURT FRUIT MIX",
      category: "cold"
  },
  {
      id: "74",
      name: "زبادي بلح ",
      price: 40,
      english_name: "YOGURT DATES",
      category: "cold"
  },
  {
      id: "75",
      name: "زبادي عسل",
      price: 40,
      english_name: "YOGURT WITH HONEY",
      category: "cold"
  },
  {
      id: "76",
      name: "ميلك شيك فانليا ",
      price: 40,
      english_name: "MILK SHAKE VANILLA",
      category: "cold"
  },
  {
      id: "77",
      name: "ميلك شيك شوكليت",
      price: 40,
      english_name: "MILK SHAKE CHOCOLATE",
      category: "cold"
  },
  {
      id: "78",
      name: "ميلك شيك مانجا",
      price: 45,
      english_name: "MILK SHAKE MANGO",
      category: "cold"
  },
  {
      id: "79",
      name: "ميلك شيك فراولة",
      price: 45,
      english_name: "MILK SHAKE STRAWBERRY",
      category: "cold"
  },
  {
      id: "80",
      name: "ميلك شيك اوريو",
      price: 50,
      english_name: "MILK SHAKE OREO",
      category: "cold"
  },
  {
      id: "81",
      name: "وافل ايس كريم",
      price: 45,
      english_name: "WAFFLE ICE CREAM",
      category: "cold"
  },
  {
      id: "82",
      name: "ايس كريم فانليا- بولا",
      price: 15,
      english_name: "ICE CREAM VANILLA",
      category: "cold"
  },
  {
      id: "83",
      name: "ايس كريم شوكليت -بولا",
      price: 15,
      english_name: "ICE CREAM CHOCOLATE",
      category: "cold"
  },
  {
      id: "84",
      name: "ايس كريم فراولة  -بولا",
      price: 15,
      english_name: "ICE CREAM STRAWBERRY",
      category: "cold"
  },
  {
      id: "85",
      name: "ايس كريم مانجا -بولا",
      price: 15,
      english_name: "ICE CREAM MANGO",
      category: "cold"
  },
  {
      id: "86",
      name: "ايس كريم اوريو  -بولا",
      price: 20,
      english_name: "ICE CREAM OREO",
      category: "cold"
  },
  {
      id: "87",
      name: "ايس كريم ميكس- بولا",
      price: 25,
      english_name: "ICE CREAM MIX",
      category: "cold"
  },
  {
      id: "88",
      name: "فرابتشينو",
      price: 45,
      english_name: "FRAPPUCCINO",
      category: "hot"
  },
  {
      id: "89",
      name: "قهوة نوتيلا",
      price: 25,
      english_name: "NUTELLA COFFEE",
      category: "hot"
  },
  {
      id: "90",
      name: "كوكتيل بالكيوي",
      price: 55,
      english_name: "COCKTAIL WITH KIWI",
      category: "cold"
  },
  {
      id: "91",
      name: "كوكتيل بالافوكادو",
      price: 65,
      english_name: "COCKTAIL WITH AVOCADO",
      category: "cold"
  },
  {
      id: "92",
      name: "قرفة جنزبيل حليب",
      price: 25,
      english_name: "CINNAMON-GINGER WITH MILK",
      category: "hot"
  },
  {
      id: "93",
      name: "جنزبيل فريش",
      price: 25,
      english_name: "FRESH GINGER",
      category: "hot"
  },
  {
      id: "94",
      name: "ليمون سخن",
      price: 12,
      english_name: "HOT LEMON",
      category: "hot"
  },
  {
      id: "95",
      name: "شاي ليمون",
      price: 12,
      english_name: "TEA WITH LEMON",
      category: "hot"
  },
  {
      id: "96",
      name: "جنزبيل فريش ليمون",
      price: 30,
      english_name: "FRESH GINGER WITH LEMON",
      category: "hot"
  },
  {
      id: "97",
      name: "بلايستيشن ربع ساعة",
      price: 7.5,
      english_name: "PLAYSTATION",
      category: "others"
  },
  {
      id: "98",
      name: "عصير لارج ",
      price: 45,
      english_name: "LARGE GUICE ",
      category: "cold"
  },
  {
      id: "99",
      name: "كوكتيل لارج",
      price: 60,
      english_name: "LARGE COCKTAIL",
      category: "cold"
  },
  {
      id: "100",
      name: "كوكتيل بالكيوي لارج",
      price: 70,
      english_name: "LARGE COCKTAIL WITH KIWI",
      category: "cold"
  },
  {
      id: "101",
      name: "كوكتيل بالافوكادو لارج",
      price: 75,
      english_name: "LARGE COCKTAIL WITH AVOCADO",
      category: "cold"
  },
  {
      id: "102",
      name: " دوم ساقع",
      price: 20,
      english_name: "COLD DOM",
      category: "cold"
  },
  {
      id: "103",
      name: "دوم حليب",
      price: 30,
      english_name: "DOM WITH MILK",
      category: "cold"
  },
  {
      id: "104",
      name: "ام علي سادة",
      price: 30,
      english_name: "OM ALI",
      category: "others"
  },
  {
      id: "105",
      name: "ام علي قشطة",
      price: 40,
      english_name: "OM ALI WITH CREAM",
      category: "others"
  },
  {
      id: "106",
      name: "ام علي مكسرات",
      price: 35,
      english_name: "OM ALI WITH NUTS",
      category: "others"
  },
  {
      id: "107",
      name: "ام علي قشطة-مكسرات",
      price: 45,
      english_name: "OM ALI WITH CREAM-NUTS",
      category: "others"
  },
  {
      id: "108",
      name: "نسكافيه 3x1",
      price: 20,
      english_name: "NESCAFE 3X1",
      category: "hot"
  },
  {
      id: "109",
      name: "لاتيه بدون حليب",
      price: 25,
      english_name: "LATTE WITHOUT MILK",
      category: "hot"
  },
  {
      id: "110",
      name: "قهوة اسبرسو",
      price: 40,
      english_name: " COFFEE ESPRESSO",
      category: "hot"
  },
  {
      id: "111",
      name: "امريكانو اسبرسو",
      price: 35,
      english_name: " AMERICAN ESPRESSO",
      category: "hot"
  },
  {
      id: "112",
      name: "قرفة-جنزبيل -ليمون",
      price: 15,
      english_name: "CINNAMON-GINGER WITH LEMON",
      category: "hot"
  },
  {
      id: "113",
      name: "خدمة",
      price: 10,
      english_name: "SERVICE",
      category: "others"
  },
  {
      id: "114",
      name: "لاتيه حليب اسبرسو",
      price: 50,
      english_name: "LATTE ESPRESSO",
      category: "hot"
  },
  {
      id: "115",
      name: "كابتشينو  اسبرسو",
      price: 50,
      english_name: "CAPPUCCINO ESPRESSO",
      category: "hot"
  },
  {
      id: "116",
      name: "كابتشينو بدون حليب",
      price: 25,
      english_name: "CAPPUCCINO WITHOUT MILK",
      category: "hot"
  },
  {
      id: "117",
      name: "سكلانس",
      price: 20,
      english_name: "SKALANS",
      category: "hot"
  },
  {
      id: "118",
      name: "اناناس",
      price: 70,
      english_name: "PINEAPPLE",
      category: "cold"
  },
  {
      id: "119",
      name: "كوكتيل بالبلح",
      price: 45,
      english_name: " COCKTAIL WITH DATES",
      category: "cold"
  },
  {
      id: "120",
      name: "كوكتيل بالبلح لارج",
      price: 60,
      english_name: "LARGE COCKTAIL WITH DATES",
      category: "cold"
  },
  {
      id: "121",
      name: "قهوة بندق دوبل",
      price: 45,
      english_name: "DOUBLE HAZELNUT COFFEE",
      category: "hot"
  },
  {
      id: "122",
      name: "قهوة فرنساوي دوبل",
      price: 40,
      english_name: "DOUBLE FRENCH COFFEE",
      category: "hot"
  }
]
