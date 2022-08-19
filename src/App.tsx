import React,{useState,useEffect,useCallback} from 'react';
import './App.css';
import Axios from 'axios';
import DropDown from 'components/DropDown';
import CharactersList from 'components/CharactersList';

import {Movie} from 'types'

function App() {
  const [isMoviesLoading, setisMoviesLoading] = useState(false)
  const [movies, setMovies] = useState<null | Movie[]>(null)
  const [title, setTitle] = useState<string>('')
  const [movie, setMovie] = useState<null | Movie>(null)

  const fetchMovies = useCallback(
    async () => {
        try {

          setisMoviesLoading(true)

          const response =await Axios.get('https://swapi.dev/api/films')

          setMovies(response.data.results)

          setisMoviesLoading(false)


          
        } catch (error:any) {
          console.log(error.message)
        }
    },
    [],
  )


  useEffect(() => {
    
    fetchMovies()
  
   
  }, [fetchMovies])


  useEffect(()=>{

    const movie = movies?.find(movie => movie.title === title)

    if(movie){
      setMovie(movie)
    }

  },[title,movies])


  const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(e.target.value)
    
  }
  
  
  return (
    <div className='p-4 overflow-auto bg-black text-yellow-500 min-h-screen'>
      <div className='flex justify-between'>
        <div>Star Wars</div>
        <DropDown isMoviesLoading={isMoviesLoading} movies={movies} onChangeHandler={ onChangeHandler} />
      </div>
      <div>
        <CharactersList movie={movie} />
      </div>
    </div>
  );
}

export default App;
