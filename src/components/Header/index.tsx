import './style.css'
import logo from './logo.svg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { basketSelector } from '../../features/counter/basket';
import { useEffect, useRef } from 'react';
import { ItemType } from '../../features/counter/products';

type HeaderPropsType = {
  items: ItemType[];
  totalPrice: number;
  totalAmount: number;
}

const Header: React.FC = () => {
  const { items, totalPrice, totalAmount }: HeaderPropsType = useSelector(basketSelector)

  const isMounted = useRef(false);

  useEffect((() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json);
    } else {
      isMounted.current = true
    }
  }), [totalPrice])
  return (
    <header>
      <div className='header-container'>
        <Link className='logo-main' to='/'><img className='logo' src={logo} /><b className='logo-title'>Розум Зник Shop</b></Link>
        <Link to='/basket' className='cart-button-modern'>
          <span className="cart-text">{totalPrice} грн.</span>
          <span className='cart-line'></span>
          <span className="cart-icon">🛒</span>
          <span className="cart-text">{totalAmount}</span>
        </Link>
      </div>
    </header>
  )
};

export default Header;