import { Injectable } from "@angular/core";
import { IMenuItem } from "../models/menu-item";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  selectedMenuItems = new BehaviorSubject<IMenuItem[]>([]);
  items: IMenuItem[] = [
    { id: 1, name: "شای", price: 10, english_name: "TEA", category: "مشروبات ساخنه" },
    { id: 2, name: "شاي فتلة", price: 10, english_name: "THREADING TEA", category: "مشروبات ساخنه" },
    { id: 3, name: "شاي اخضر", price: 12, english_name: "GREEN TEA", category: "مشروبات ساخنه" },
    { id: 4, name: "شاي باللبن", price: 25, english_name: "TEA WITH MILK", category: "مشروبات ساخنه" },
    { id: 5, name: "نعناع", price: 10, english_name: "MINT", category: "مشروبات ساخنه" },
    { id: 6, name: "قرفة", price: 10, english_name: "CINNAMON", category: "مشروبات ساخنه" },
    { id: 7, name: "قرفة باللبن", price: 25, english_name: "CINNAMON WITH MILK", category: "مشروبات ساخنه" },
    { id: 8, name: "قرفة تفاح", price: 25, english_name: "APPLE CINNAMON", category: "مشروبات ساخنه" },
    { id: 9, name: "ينسون", price: 10, english_name: "ANISE", category: "مشروبات ساخنه" },
    { id: 10, name: "ينسون ليمون", price: 12, english_name: "ANISE LEMON", category: "مشروبات ساخنه" },
    { id: 11, name: "جنزبيل", price: 10, english_name: "GINGER", category: "مشروبات ساخنه" },
    { id: 12, name: "جنزبيل ليمون", price: 12, english_name: "GINGER LEMON", category: "مشروبات ساخنه" },
    { id: 13, name: "اضافة عسل", price: 3, english_name: "WITH HONEY", category: "أخرى" },
    { id: 14, name: "جنزبيل حليب", price: 25, english_name: "GINGER MILK", category: "مشروبات ساخنه" },
    { id: 15, name: "حلبة ", price: 10, english_name: "HELBA", category: "مشروبات ساخنه" },
    { id: 16, name: "حلبة حليب", price: 25, english_name: "HELBA MILK", category: "مشروبات ساخنه" },
    { id: 17, name: "كاكاو", price: 15, english_name: "COCOA", category: "مشروبات ساخنه" },
    { id: 18, name: "كاكاو حليب", price: 25, english_name: "COCOA MILK", category: "مشروبات ساخنه" },
    { id: 19, name: "دوم", price: 15, english_name: "DOM", category: "مشروبات بارده" },
    { id: 20, name: "خلطة", price: 12, english_name: "MIXHERPS", category: "مشروبات ساخنه" },
    { id: 21, name: "سحلب", price: 25, english_name: "SAHLAB", category: "مشروبات ساخنه" },
    { id: 22, name: "سحلب فواكة", price: 35, english_name: "SAHLAB FRUIT", category: "مشروبات بارده" },
    { id: 23, name: "سحلب مكسرات", price: 30, english_name: "SANLAB NUTS", category: "مشروبات ساخنه" },
    { id: 24, name: "كركدية", price: 10, english_name: "KARKADIH", category: "مشروبات ساخنه" },
    { id: 25, name: "عناب ساقع", price: 30, english_name: "COLD JENNAB", category: "مشروبات بارده" },
    { id: 26, name: "قهوة  فاتح", price: 20, english_name: "LIGHT COFFEE", category: "مشروبات ساخنه" },
    { id: 27, name: "قهوة  محوج", price: 23, english_name: "COFFEE WITH CARDAMOM", category: "مشروبات ساخنه" },
    { id: 28, name: "قهوة  وسط", price: 23, english_name: "MEDIUM COFFEE", category: "مشروبات ساخنه" },
    { id: 29, name: "قهوة  غامق", price: 23, english_name: "DARK COFFEE", category: "مشروبات ساخنه" },
    { id: 30, name: "قهوة دبل", price: 33, english_name: "DOUBLE COFFEE", category: "مشروبات ساخنه" },
    { id: 31, name: "قهوة فرنساوى", price: 27, english_name: "FRENCH COFFEE", category: "مشروبات ساخنه" },
    { id: 32, name: "قهوة بندق", price: 23, english_name: "HAZELNUT COFFEE", category: "مشروبات ساخنه" },
    { id: 33, name: "أسبرسو", price: 33, english_name: "ESPRESSO", category: "مشروبات ساخنه" },
    { id: 34, name: "أسبرسو دبل", price: 43, english_name: "DOUBLE ESPRESSO", category: "مشروبات ساخنه" },
    { id: 35, name: "ميكاتو", price: 43, english_name: "MIKATO", category: "مشروبات ساخنه" },
    { id: 36, name: "لاتيه", price: 35, english_name: "LATTE", category: "مشروبات ساخنه" },
    { id: 37, name: "موكا", price: 35, english_name: "MOCHA", category: "مشروبات ساخنه" },
    { id: 38, name: "كابتشينو", price: 35, english_name: "CAPPUCCINO", category: "مشروبات ساخنه" },
    { id: 39, name: "هوت شوكليت", price: 35, english_name: "HOT CHOCOLATE", category: "مشروبات ساخنه" },
    { id: 40, name: "هوت سيدر", price: 25, english_name: "HOT CEDAR", category: "مشروبات ساخنه" },
    { id: 41, name: "نسكافيه كلاسيك", price: 20, english_name: "NESCAFE CLASSIC", category: "مشروبات ساخنه" },
    { id: 42, name: "نسكافيه حليب", price: 35, english_name: "NESCAFE WITH MILK", category: "مشروبات ساخنه" },
    { id: 43, name: "ايس كوفي", price: 35, english_name: "ICE COFFEE", category: "مشروبات بارده" },
    { id: 44, name: "كوفي ميكس", price: 20, english_name: "COFFEE MIX", category: "مشروبات ساخنه" },
    { id: 45, name: "اضافة الحليب", price: 15, english_name: "WITH MILK", category: "أخرى" },
    { id: 46, name: "مانجو", price: 35, english_name: "MANGO", category: "مشروبات بارده" },
    { id: 47, name: "فراولة", price: 35, english_name: "STRAWBERRIES", category: "مشروبات بارده" },
    { id: 48, name: "جوافة", price: 35, english_name: "GUAVA", category: "مشروبات بارده" },
    { id: 49, name: "كوكتيل", price: 45, english_name: "COCKTAIL", category: "مشروبات بارده" },
    { id: 50, name: "ليمون - نعناع", price: 25, english_name: "LEMON-MINT", category: "مشروبات بارده" },
    { id: 51, name: "كيوي", price: 65, english_name: "KIWI", category: "مشروبات بارده" },
    { id: 52, name: "موز", price: 35, english_name: "BANANA", category: "مشروبات بارده" },
    { id: 53, name: "برتقال", price: 65, english_name: "ORANGE", category: "مشروبات بارده" },
    { id: 54, name: "بطيخ", price: 25, english_name: "WATERMELON", category: "مشروبات بارده" },
    { id: 55, name: "افوكادو", price: 90, english_name: "AVOCADO", category: "مشروبات بارده" },
    { id: 56, name: "بلح", price: 35, english_name: "DATES", category: "مشروبات بارده" },
    { id: 57, name: "وافل شيكولاته دارك", price: 40, english_name: "WAFFLE DARK CHOCO", category: "حلويات" },
    { id: 58, name: "وافل شيكولاته بيضاء", price: 40, english_name: "WAFFLE WHITE CHOCO", category: "حلويات" },
    { id: 59, name: "وافل لوتس", price: 45, english_name: "WAFFLE LOTUS", category: "حلويات" },
    { id: 60, name: "وافل ميكس", price: 50, english_name: "WAFFLE MIX", category: "حلويات" },
    { id: 61, name: "وافل اوريو", price: 50, english_name: "WAFFLE OREO", category: "حلويات" },
    { id: 62, name: "وافل شيكولاته بالموز", price: 45, english_name: "WAFFLE CHOCO BANANA", category: "حلويات" },
    { id: 63, name: "عصير مودز", price: 45, english_name: "MOODS JUICE", category: "مشروبات بارده" },
    { id: 64, name: "كولا كانز", price: 23, english_name: "COLA KANZ", category: "مشروبات بارده" },
    { id: 65, name: "كولا زجاج", price: 20, english_name: "COLA MINI", category: "مشروبات بارده" },
    { id: 66, name: "مياه معدنية صغيرة", price: 8, english_name: "SMALL WATER", category: "مشروبات بارده" },
    { id: 67, name: "مياه معدنية كبيرة", price: 14, english_name: "BIG WATER", category: "مشروبات بارده" },
    { id: 68, name: "موخيتو", price: 35, english_name: "MOJITO", category: "مشروبات بارده" },
    { id: 69, name: "كوكتيل مودز", price: 60, english_name: "Cocktail moods", category: "مشروبات بارده" },
  ];
  categories: string[] = ["الجميع", "مشروبات ساخنه", "مشروبات بارده", "حلويات", "أخرى"];
  constructor() {}

  getMenuItems(): IMenuItem[] {
    this.items = this.items.map((item) => (item = { ...item, isSelected: item.isSelected ? true : false }));
    this.selectedMenuItems.next(this.items);
    return this.items;
  }

  setSelectedItems(itemName: string, isSelected: boolean) {
    let selectedItemIndex = this.items.findIndex((item) => item.english_name == itemName);
    this.items[selectedItemIndex]["isSelected"] = isSelected;
    this.selectedMenuItems.next(this.items);
  }

  resetSelectedItems() {
    this.items = this.items.map((item) => (item = { ...item, isSelected: false }));
    this.selectedMenuItems.next(this.items);
  }
}
