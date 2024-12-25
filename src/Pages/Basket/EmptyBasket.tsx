import { Link } from 'react-router-dom';
import './EmptyBasket.css';

const EmptyBasket: React.FC = () => {
    return (
        <div className="empty-cart">
            <div className="empty-cart-content">
                <h2 className="empty-cart-title">Ваш кошик порожній</h2>
                <p className="empty-cart-text">Додайте товари, щоб продовжити покупки.</p>
                <Link to='/' className="empty-cart-button">
                    Повернути до покупок
                </Link>
            </div>
        </div>
    );
};

export default EmptyBasket;
