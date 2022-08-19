import React,{useState,useEffect,useCallback} from 'react'
import {Movie,CharacterType} from 'types'
import Character from 'components/Character'
import Marquee from "react-fast-marquee";
import Axios from 'axios'

type CharactersListPropsType = {
   movie:null | Movie
}

const CharactersList = ({movie}:CharactersListPropsType) => {
    let [characters, setCharacters] = useState<null | CharacterType[]>(null)
    const [filterByGender, setfilterByGender] = useState('')
    const [sortConfig, setSortConfig] = useState({key:'',direction:''})


    const requestSort = (key:string) => {
        let direction = 'ascending'

        if(sortConfig.key === key && sortConfig.direction === 'ascending'){
            direction = 'descending'
        }

        setSortConfig({key,direction})
    }

    const fetchCharacters = useCallback(async ()=> {
        try {
          
            if(movie){
                const responses = await Promise.all(movie.characters.map(charurl => {
                    const response = Axios.get(charurl)

                    return response
                }))

                let data = responses.map(response => {
                    return {name:response.data.name,
                            gender:response.data.gender,
                            height:response.data.height}
                })

              
                setCharacters(data)
            }
            
        } catch (error) {
            
        }
    },[movie])


    useEffect(()=>{
          fetchCharacters()
    },[fetchCharacters])


   

    const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setfilterByGender(e.target.value)
        
      }



      let filteredCharacters:CharacterType[] = []
      if(characters){
       filteredCharacters = [...characters]
          
      }

      if(filterByGender){
        filteredCharacters = filteredCharacters.filter(char => char.gender === filterByGender)
      }

      let sortedCharacters:CharacterType[] = []
      if(filteredCharacters){
        sortedCharacters = [...filteredCharacters]
           
       }

       if(sortConfig.key){
        let key = sortConfig.key
        sortedCharacters.sort((a:any,b:any) => {

            if(a[key] < b[key]){
                return sortConfig.direction === 'ascending' ? -1 : 1
            }

            if(a[key] > b[key]){
                return sortConfig.direction === 'ascending' ? 1 : -1
            }

            return 0
        })
      }

      let h = 0

      sortedCharacters.forEach(char => {
          h += parseInt(char.height) > 0 ? parseInt(char.height) : 0
      })

     





  return (
    <div>
        {!movie && <img src='https://pyxis.nymag.com/v1/imgs/314/20c/5e25fc541fc4e0b84bc393e1e316f07b40-18-Star-Wars-Logo.rsquare.w330.jpg' alt='logo' />}
        {movie && 
    <>
    <div className='my-4'><Marquee  direction="left" >{movie.opening_crawl}</Marquee></div>
    <div>
    <select className='rounded p-2 outline-none' value={filterByGender} onChange={onChangeHandler}>
        <option hidden>filter by gender</option>
        <option value='male'>Male</option>
        <option value='female'>Female</option>
    </select>
    <table className='mt-8 table-auto border-separate border-spacing-2 border-spacing-2 border border-slate-500'><thead><tr>
    <th onClick={() => requestSort('name')} className='border border-slate-300 bg-black p-4'>Name</th>
    <th onClick={() => requestSort('gender')} className='border border-slate-300 bg-black p-4'>Gender</th>
    <th onClick={() => requestSort('height')} className='border w-10 border-slate-300 bg-black p-4'>Height</th>
  </tr></thead>
  <tbody>{sortedCharacters && sortedCharacters.map(character =>  <Character key={character.name}  character={character} />)}</tbody>
  <tfoot>
    <tr>
        <td className='border border-slate-100 bg-black p-4'>Total</td>
        <td className='border border-slate-100 bg-black p-4'>characters : {sortedCharacters?.reduce((sum,_) => sum + 1,0)}</td>
        <td className='border border-slate-100 bg-black p-4'>Heights : {h}cm ({(h/30.48).toFixed(0)}ft/{(h/2.54).toFixed(2)}in)</td>
    </tr>
  </tfoot>
  </table>
  </div>
        </>
        }
    </div>
  )
}

export default CharactersList