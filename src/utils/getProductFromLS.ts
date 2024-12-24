import { calcTotalPrice } from "./calcTotalPrice";
import { calcTotamAmount } from "./calcTotamAmount";

export const getProductFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const totalAmount = calcTotamAmount(items);
    return {
        items,
        totalPrice,
        totalAmount
    }
}