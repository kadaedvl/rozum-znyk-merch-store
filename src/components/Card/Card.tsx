import './Card.css'
import { useSelector } from 'react-redux'
import { addProduct, basketSelector } from '../../features/counter/basket'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { ItemType } from '../../features/counter/products';

const Card: React.FC<ItemType> = ({ id, name, description, price, rating, images, sizes, count }) => {
    const dispatch = useAppDispatch();

    const { items } = useSelector(basketSelector)

    const oneItemAmountFn = () => {
        if (items.length > 0) {
            const findItem = items.find((obj: { id: string; }) => obj.id === id);
            if (findItem) {
                return findItem.count;
            }
        }
        return 0;
    }
    const item = {
        id,
        name,
        description,
        price,
        images: images[0],
        count
    }
    const onClickAddProduct = () => {
        dispatch(addProduct(item))
    }

    const sizerItem = () => {
        if (sizes) {
            return sizes.map((el, index) => (<li key={index}>{el}</li>))
        }

    }
    return (
        <li className='product-card'>
            <Link to={`product/${item.id}`}>
                <div className="product-images">
                    <img src={images[0]} alt="Футболка 'Розум Зник'" className="main-image" />
                </div>

                <div className="product-info">
                    <ul className='product-size'>
                        {sizerItem()}
                    </ul>
                    <h3 className="product-name">{name}</h3>
                    <p className="product-description">{description}</p>
                    <p className="product-price">Ціна: {price} грн</p>
                    <div className="product-rating">
                        <span>Рейтинг:</span>
                        <span className="stars">
                            <div className="stars-bg">
                                <div
                                    className="stars-fill"
                                    style={{ width: `${(Number(rating) / 5) * 100}%` }}
                                ></div>
                            </div>
                        </span>
                        <span>({rating})</span>
                    </div>
                </div>
            </Link>
            <button onClick={onClickAddProduct} className="buy-button">В корзину {oneItemAmountFn() !== 0 && (<span>{oneItemAmountFn()}</span>)}</button>

        </li>
    )
};

export default Card;