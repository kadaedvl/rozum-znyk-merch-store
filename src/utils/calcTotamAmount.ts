import { ItemType } from "../redux/slices/products";

export const calcTotamAmount = (items: ItemType[]) => {
    return items.reduce((sum, obj) => { return sum + obj.count }, 0);
}