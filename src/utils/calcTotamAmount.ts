import { ItemType } from "../features/counter/products";

export const calcTotamAmount = (items: ItemType[]) => {
    return items.reduce((sum, obj) => { return sum + obj.count }, 0);
}