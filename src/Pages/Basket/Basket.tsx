import './Basket.css'
import { useSelector } from 'react-redux'
import { basketSelector, removeAllProduts } from '../../redux/slices/basket'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import EmptyBasket from './EmptyBasket';
import BasketItem from './BasketItem';

const Basket: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, totalPrice, totalAmount } = useSelector(basketSelector)

    if (items.length <= 0) {
        return (<EmptyBasket />)
    } else
        return (
            <main>
                <div className='container-basket'>
                    <div className='basket-title'>
                        <h2>🛒basket</h2>
                        <button className='basket-clean-all' onClick={() => dispatch(removeAllProduts())}>Clear all x</button>
                    </div>
                    <ul className='productList'>
                        {
                            items.map((item) => (
                                <BasketItem key={item.id} {...item} />
                            ))
                        }

                    </ul>
                    <div className='productList-amount'>
                        <p>Всього товарів: <span>{totalAmount} шт.</span></p>
                        <p>Загальна сума замовлення: <span>{totalPrice} грн.</span></p>
                    </div>
                    <div className='productList-amount'>
                        <Link to='/'>Go Back</Link>
                        <a>Pay Now</a>
                    </div>
                </div>
            </main>
        )
}

export default Basket;