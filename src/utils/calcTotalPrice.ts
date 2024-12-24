import { ItemType } from "../features/counter/products";

export const calcTotalPrice = (items: ItemType[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0);
}