import './Categories.css'

import { useSelector } from 'react-redux'
import { filterSelector, setCategories } from '../../features/counter/filtreSlice'
import { useAppDispatch } from '../../app/store';

const Categories: React.FC = () => {

  const { categories } = useSelector(filterSelector)
  const dispatch = useAppDispatch()

  const CategoriesBase: string[] = ['all', 'Одяг', 'Аксесуари', 'Сувеніри', 'CD'];

  return (
    <ul className='categories-list'>
      {CategoriesBase.map((elment, index) => (
        <li key={index}
          className={categories === elment ? 'active' : ''}
          onClick={() => dispatch(setCategories(elment))}>{elment}</li>))
      }
    </ul>
  )
};

export default Categories;