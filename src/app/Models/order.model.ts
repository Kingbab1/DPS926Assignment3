import { menuItem } from "./menuItem.model";

export interface Order {
    price: number;
    totalPrice: number;
    quantity: number;
    topping: menuItem;
    size: menuItem;
    time: string;
    id: number;
    selected: boolean;
}