import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './OneItemPage.css'
import { addProduct } from "../../../features/counter/basket";
import Loading from "../../Loading";
import { useAppDispatch } from "../../../app/store";
import { ItemType } from "../../../features/counter/products";


const OneItemPage: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<ItemType>()

    useEffect((() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get<ItemType>('https://6751caa4d1983b9597b45cbe.mockapi.io/RZShopBase/' + id)
                if (data) {
                    setProduct(data);
                }
            }
            catch {
                alert('Помилка завантаження сторінки')
                navigate('/')
            }

        }
        fetchProduct();
    }), [])

    const onClickAddProduct = () => {
        if (product) {
            const selected = (({ id, description, name, images, price, count }: ItemType) => ({ id, description, name, images: images[0], price, count }))(product);
            dispatch(addProduct(selected))
        }
    }

    if (!product) {
        return (<Loading />)
    } else
        return (
            <div className="container container-one-cart">
                <img src={product.images[0]} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Ціна: {product.price} грн</p>
                    <p className="product-stock">На складі: {product.stock} шт</p>
                    <a className="add-to-cart" onClick={() => onClickAddProduct()}>Додати до кошика</a>
                </div>
            </div>
        )
}

export default OneItemPage;