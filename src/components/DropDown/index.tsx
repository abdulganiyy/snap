import React from 'react'

import {Movie} from 'types'

type DropDownPropsType = {
    isMoviesLoading:boolean;
    movies:null | Movie[],
    onChangeHandler:React.ChangeEventHandler
}

const DropDown = ({isMoviesLoading,movies,onChangeHandler}:DropDownPropsType) => {
  return (
    <div>
        {isMoviesLoading && <svg className="animate-spin h-5 w-5 mr-3 rounded-full border-2 border-blue-500 " viewBox="0 0 24 24"></svg>}
        {movies && <select onChange={onChangeHandler} className='border-2 rounded outline-none'>
            <option hidden >Select movie...</option>
            {movies.sort((a,b) => Date.parse(a.release_date) - Date.parse(b.release_date)).map(movie => <option key={movie.title} value={movie.title}>{movie.title}</option>)}
            </select>}
    </div>
  )
}

export default DropDown