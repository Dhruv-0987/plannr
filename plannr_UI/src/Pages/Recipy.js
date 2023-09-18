import React from 'react'
import RecipeInput from '../Components/RecipeInput'
import RecipeResult from '../Components/RecipeResult'

function Recipy() {
  return (
    <div className='recipy'>
      <div className='flex items-center align-middle justify-center m-10'>
        <RecipeInput/>
      </div>

      <div className='flex items-center align-middle justify-center m-10'>
        <RecipeResult/>
      </div>
    </div>
  )
}

export default Recipy
