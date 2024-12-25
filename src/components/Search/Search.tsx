import './Search.css'
import close from './close.svg'
import searchImg from './search.svg'
import { setSearchValue } from '../../redux/slices/filtreSlice'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '../../redux/store'


const Search: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()

    const onInputClearCkick = () => {
        dispatch(setSearchValue(''));
        setInputValue('');
        inputRef.current?.focus();
    }

    const upDataSearchValue = useCallback(debounce((str) => { dispatch(setSearchValue(str)) }, 1000), [])
    const OnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        upDataSearchValue(e.target.value);
    }
    return (
        <div className='search'>
            <img className='search-placeholder-icon' src={searchImg} />
            <input ref={inputRef} onChange={OnChangeInput} type="text" placeholder="White some product name..." value={inputValue} />
            {inputValue && (<img className='clean-placeholder-icon' src={close} onClick={() => onInputClearCkick()} />)}
        </div>

    )
}

export default Search;