export interface IMenuItem {
  id: number;
  name: string;
  english_name: string;
  price: number;
  image? : string,
  selected?:boolean,
  category?:string
}
