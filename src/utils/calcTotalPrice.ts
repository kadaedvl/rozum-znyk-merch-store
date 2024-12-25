import { ItemType } from "../redux/slices/products";

export const calcTotalPrice = (items: ItemType[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0);
}