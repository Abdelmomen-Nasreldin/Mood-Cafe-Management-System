export interface IMenuItem {
  id: string;
  name: string;
  english_name: string;
  price: number;
  image? : string,
  isSelected?:boolean,
  category?:string
}
