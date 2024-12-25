import { useAppDispatch } from '../../redux/store';
import { removeItem, addProduct, minusCountOneItem } from '../../redux/slices/basket'
import { ItemType } from '../../redux/slices/products';


const BasketItem: React.FC<ItemType> = ({ id, name, description, images, price, count }) => {
    const dispatch = useAppDispatch();

    const onClickRemoveItemById = () => {
        dispatch(removeItem(id));
    }

    const addAmount = () => {
        const incItem = {
            id
        } as ItemType;
        dispatch(addProduct(incItem))
    }

    const removeAmount = () => {
        dispatch(minusCountOneItem(id))
    }
    return (
        <li className='productList-item'>
            <img className='productList-img' src={images}></img>
            <div className='productList-description'>
                <h3 className='productList-description-name'>{name}</h3>
                <p className='productList-description-text'>{description}</p>
            </div>
            <div className='productList-ink-dec'>
                <button disabled={count === 1} onClick={() => removeAmount()}>-</button>
                <span>{count}</span>
                <button onClick={() => addAmount()}>+</button>
            </div>
            <p className='productList-price'>{price * count} грн.</p>
            <button onClick={() => onClickRemoveItemById()} className='productList-delete-item'>x</button>
        </li>
    )
}

export default BasketItem;