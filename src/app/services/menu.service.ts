import { Injectable } from '@angular/core';
import { IMenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuItems() : IMenuItem[] {
    return [
      {"id": 1, "name": "شاي", "price": 10, "english_name": "TEA"},
      {"id": 2, "name": "شاي فتلة", "price": 10, "english_name": "THREADING TEA"},
      {"id": 3, "name": "شاي اخضر", "price": 12, "english_name": "GREEN TEA"},
      {"id": 4, "name": "شاي باللبن", "price": 25, "english_name": "TEA WITH MILK"},
      {"id": 5, "name": "نعناع", "price": 10, "english_name": "MINT"},
      {"id": 6, "name": "قرفة", "price": 10, "english_name": "CINNAMON"},
      {"id": 7, "name": "قرفة باللبن", "price": 25, "english_name": "CINNAMON WITH MILK"},
      {"id": 8, "name": "قرفة تفاح", "price": 25, "english_name": "APPLE CINNAMON"},
      {"id": 9, "name": "ينسون", "price": 10, "english_name": "ANISE"},
      {"id": 10, "name": "ينسون ليمون", "price": 12, "english_name": "ANISE LEMON"},
      {"id": 11, "name": "جنزبيل", "price": 10, "english_name": "GINGER"},
      {"id": 12, "name": "جنزبيل ليمون", "price": 12, "english_name": "GINGER LEMON"},
      {"id": 13, "name": "اضافة عسل", "price": 3, "english_name": "WITH HONEY"},
      {"id": 14, "name": "جنزبيل حليب", "price": 25, "english_name": "GINGER MILK"},
      {"id": 15, "name": "حلبة", "price": 10, "english_name": "HELBA"},
      {"id": 16, "name": "حلبة حليب", "price": 25, "english_name": "HELBA MILK"},
      {"id": 17, "name": "كاكاو", "price": 15, "english_name": "COCOA"},
      {"id": 18, "name": "كاكاو حليب", "price": 25, "english_name": "COCOA MILK"},
      {"id": 19, "name": "دوم", "price": 15, "english_name": "DOM"},
      {"id": 20, "name": "خلطة", "price": 12, "english_name": "MIXHERPS"},
      {"id": 21, "name": "سحلب", "price": 25, "english_name": "SAHLAB"},
      {"id": 22, "name": "سحلب فواكة", "price": 35, "english_name": "SAHLAB FRUIT"},
      {"id": 23, "name": "سحلب مكسرات", "price": 30, "english_name": "SANLAB NUTS"},
      {"id": 24, "name": "كركدية", "price": 10, "english_name": "KARKADIH"},
      {"id": 25, "name": "عناب ساقع", "price": 30, "english_name": "COLD JENNAB"},
      {"id": 26, "name": "قهوة  فاتح", "price": 20, "english_name": "LIGHT COFFEE"},
      {"id": 27, "name": "قهوة  محوج", "price": 23, "english_name": "COFFEE WITH CARDAMOM"},
      {"id": 28, "name": "قهوة  وسط", "price": 23, "english_name": "MEDIUM COFFEE"},
      {"id": 29, "name": "قهوة  غامق", "price": 23, "english_name": "DARK COFFEE"},
      {"id": 30, "name": "قهوة دبل", "price": 33, "english_name": "DOUBLE COFFEE"},
      {"id": 31, "name": "قهوة فرنساوى", "price": 27, "english_name": "FRENCH COFFEE"},
      {"id": 32, "name": "قهوة بندق", "price": 23, "english_name": "HAZELNUT COFFEE"},
      {"id": 33, "name": "أسبرسو", "price": 33, "english_name": "ESPRESSO"},
      {"id": 34, "name": "أسبرسو دبل", "price": 43, "english_name": "DOUBLE ESPRESSO"},
      {"id": 35, "name": "ميكاتو", "price": 43, "english_name": "MIKATO"},
      {"id": 36, "name": "لاتيه", "price": 35, "english_name": "LATTE"},
      {"id": 37, "name": "موكا", "price": 35, "english_name": "MOCHA"},
      {"id": 38, "name": "كابتشينو", "price": 35, "english_name": "CAPPUCCINO"},
      {"id": 39, "name": "هوت شوكليت", "price": 35, "english_name": "HOT CHOCOLATE"},
      {"id": 40, "name": "هوت سيدر", "price": 25, "english_name": "HOT CEDAR"},
      {"id": 41, "name": "نسكافيه كلاسيك", "price": 20, "english_name": "NESCAFE CLASSIC"},
      {"id": 42, "name": "نسكافيه حليب", "price": 35, "english_name": "NESCAFE WITH MILK"},
      {"id": 43, "name": "ايس كوفي", "price": 35, "english_name": "ICE COFFEE"},
      {"id": 44, "name": "كوفي ميكس", "price": 20, "english_name": "COFFEE MIX"},
      {"id": 45, "name": "اضافة الحليب", "price": 15, "english_name": "WITH MILK"},
      {"id": 46, "name": "مانجو", "price": 35, "english_name": "MANGO"},
      {"id": 47, "name": "فراولة", "price": 35, "english_name": "STRAWBERRIES"},
      {"id": 48, "name": "جوافة", "price": 35, "english_name": "GUAVA"},
      {"id": 49, "name": "كوكتيل", "price": 45, "english_name": "COCKTAIL"},
      {"id": 50, "name": "ليمون - نعناع", "price": 25, "english_name": "LEMON-MINT"},
      {"id": 51, "name": "كيوي", "price": 65, "english_name": "KIWI"},
      {"id": 52, "name": "موز", "price": 35, "english_name": "BANANA"},
      {"id": 53, "name": "برتقال", "price": 65, "english_name": "ORANGE"},
      {"id": 54, "name": "بطيخ", "price": 25, "english_name": "WATERMELON"},
      {"id": 55, "name": "افوكادو", "price": 90, "english_name": "AVOCADO"},
      {"id": 56, "name": "بلح", "price": 35, "english_name": "DATES"},
      {"id": 57, "name": "وافل شيكولاته دارك", "price": 40, "english_name": "WAFFLE DARK CHOCO"},
      {"id": 58, "name": "وافل شيكولاته بيضاء", "price": 40, "english_name": "WAFFLE WHITE CHOCO"},
      {"id": 59, "name": "وافل لوتس", "price": 45, "english_name": "WAFFLE LOTUS"},
      {"id": 60, "name": "وافل ميكس", "price": 50, "english_name": "WAFFLE MIX"},
      {"id": 61, "name": "وافل اوريو", "price": 50, "english_name": "WAFFLE OREO"},
      {"id": 62, "name": "وافل شيكولاته بالموز", "price": 45, "english_name": "WAFFLE CHOCO BANANA"},
      {"id": 63, "name": "عصير مودز", "price": 45, "english_name": "MOODS JUICE"},
      {"id": 64, "name": "كريب", "price": 45, "english_name": "CREPE"}
    ]
    ;
  }
}
