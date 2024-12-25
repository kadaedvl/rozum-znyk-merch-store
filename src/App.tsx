import React, { useEffect, useRef, useState } from 'react'
import Categories from './components/Categories/Categories'
import Sceleton from './components/Sceleton'
import Search from './components/Search/Search'
import Card from './components/Card/Card'
import Sort from './components/Sort/Sort'
import Pagination from './components/Pagination/Pagination'
import qs from 'qs'
import './App.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filterSelector, FiltreSliceType, setFilters } from './redux/slices/filtreSlice'
import { fetchProducts, ItemType, productsSeletor, ProductsSliceType, Status } from './redux/slices/products'
import { useAppDispatch } from './redux/store'

const App: React.FC = () => {
  const isSeacrh = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [cardOnPage, setCardOnPage] = useState(3);

  const { sortType, categories, searchValue, currentPage }: FiltreSliceType = useSelector(filterSelector)
  const { items, status }: ProductsSliceType = useSelector(productsSeletor)

  const GetItems = async () => {
    const category = categories === 'all' ? '' : `category=${categories}`;
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortValue = sortType.replace('-', '')
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchProducts({ category, order, sortValue, search, currentPage }))
  }
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const filters: FiltreSliceType = {
        sortType: params.sortType as string || 'price',
        categories: params.categories as string || 'all',
        searchValue: params.searchValue as string || '',
        currentPage: Number(params.currentPage) || 1,
      };
      dispatch(setFilters(filters));
      isSeacrh.current = true;
      console.log(status)
    } else {
      GetItems();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSeacrh.current) {
      GetItems();
    }
    isSeacrh.current = false;
  }, [categories, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categories,
        currentPage
      });
      if (queryString) {
        navigate(`?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [categories, sortType, currentPage]);


  const lastPostIndex: number = Number(currentPage) * cardOnPage;
  const firstPostIndex: number = lastPostIndex - cardOnPage;
  const curenPost: ItemType[] = items.slice(firstPostIndex, lastPostIndex);

  const products = curenPost.map((element: ItemType) => (<Card key={element.id} {...element} />));
  const skeletons = [... new Array(3)].map((_, index) => (<Sceleton key={index} />));

  return (
    <main>
      <div className='container'>
        <Search />
        <Categories />
        <Sort />
      </div>
      <hr></hr>
      <ul className='maincontent'>
        {status === Status.ERROR ? <div>Сталася помилка завантаження даних з серверу спробуйте пізніше</div> : status === Status.LOADING ? skeletons : products}
      </ul>
      <Pagination length={items.length} cardOnPage={cardOnPage} />
    </main>
  )
}

export default App