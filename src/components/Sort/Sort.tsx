import { useEffect, useRef, useState } from 'react';
import './Sort.css'

import { useSelector } from 'react-redux'
import { filterSelector, setSortType } from '../../features/counter/filtreSlice'
import { useAppDispatch } from '../../app/store';

type SortTypeBase = {
  id: string;
  name: string;
  sortProperty: string;
}

const Sort: React.FC = () => {
  const { sortType } = useSelector(filterSelector)
  const dispatch = useAppDispatch()

  const sortRef = useRef<HTMLDivElement>(null)
  const [isSortOpen, setIsSortOpen] = useState(false);


  const sortTypeBase: SortTypeBase[] = [
    {
      'id': '0',
      'name': 'Від A до Я',
      'sortProperty': 'name',
    },
    {
      'id': '1',
      'name': 'Від Я до А',
      'sortProperty': '-name',
    },
    {
      'id': '3',
      'name': 'Від дорогих до дешевих',
      'sortProperty': 'price',
    },
    {
      'id': '4',
      'name': 'Від дешевих до дорогих',
      'sortProperty': '-price',
    },
    {
      'id': '5',
      'name': 'Популярність',
      'sortProperty': 'rating',
    }
  ];

  const ChangeName = () => {
    return sortTypeBase.find((el) => el.sortProperty === sortType && (el.name))
  }

  const ChangeSortType = (el: string) => {
    dispatch(setSortType(el));
    setIsSortOpen(false);
  }

  useEffect(() => {
    const clickOutSide = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsSortOpen(false);
      }
    }

    document.body.addEventListener('click', clickOutSide)
    return () => {
      document.body.removeEventListener('click', clickOutSide);
    }
  }, [])
  return (
    <div className='sort' ref={sortRef}>
      <p>Сотрувати за <span onClick={() => setIsSortOpen(!isSortOpen)}>{ChangeName()?.name}</span></p>
      {isSortOpen && (<ul className='sort-popap'>
        {sortTypeBase.map((el: SortTypeBase, index: number) => (
          <li key={index} onClick={() => ChangeSortType(el.sortProperty)}
            className={sortType === el.sortProperty ? 'active' : ''}>{el.name}</li>
        ))}
      </ul>)}
    </div>
  )
};

export default Sort;