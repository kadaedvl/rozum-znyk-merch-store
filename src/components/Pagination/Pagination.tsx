import './Pagination.css'
import { filterSelector, setCurrentPage } from '../../features/counter/filtreSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/store';

type PaginationParamsType = {
    length: number;
    cardOnPage: number;
}

const Pagination: React.FC<PaginationParamsType> = ({ length, cardOnPage }) => {


    const dispatch = useAppDispatch();
    const { currentPage } = useSelector(filterSelector);


    let paginationArray = [];

    for (let i = 1; i <= Math.ceil(length / cardOnPage); i++) {
        paginationArray.push(i);
    }
    return (
        <div className="container-pagination">
            <ul className='pagination-list'>
                {(paginationArray.length > 1) && (currentPage !== 1) ? <li onClick={() => { dispatch(setCurrentPage(currentPage - 1)) }}>&lt;</li> : <li className='disabled'>&lt;</li>}
                {paginationArray.map((index) => (
                    <li
                        key={index}
                        className={index === currentPage ? 'active' : ''}
                        onClick={() => dispatch(setCurrentPage(index))}
                    >{index}</li>
                ))}
                {(paginationArray.length > 1) && (currentPage !== Math.ceil(length / cardOnPage)) ? <li onClick={() => { dispatch(setCurrentPage(currentPage + 1)) }}>&gt;</li> : <li className='disabled'>&gt;</li>}
            </ul>
        </div>
    )
}

export default Pagination;