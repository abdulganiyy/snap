import React from 'react'
import {CharacterType} from 'types'

type CharacterPropsType = {
    character:CharacterType,
   
}



const Character = ({character}:CharacterPropsType) => {
  

  return (
    <>{character && 
    <tr><td className='border border-slate-300 bg-black p-4'>{character.name}</td><td className='border border-slate-300 bg-black p-4'>{character.gender}</td><td className='border border-slate-300 bg-black p-4'>{character.height}</td></tr>}
    </>
  )
}

export default Character