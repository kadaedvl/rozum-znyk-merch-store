import './Basket.css'
import Item from './Item';
import { useSelector } from 'react-redux'
import { basketSelector, removeAllProduts } from '../../../features/counter/basket'
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import { useAppDispatch } from '../../../app/store';

const Basket: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, totalPrice, totalAmount } = useSelector(basketSelector)

    if (items.length <= 0) {
        return (<EmptyCart />)
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
                                <Item key={item.id} {...item} />
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