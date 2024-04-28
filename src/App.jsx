import React from 'react'
import MainContent from './MainContent'
import Navbar from './Navbar'
import Camapigns from './Camapigns'


const App = () => {
  return (
    <div>
      <Navbar/>
      <div className='gradient-bg-services'>
      <MainContent/>
      </div>
      <Camapigns/>
    </div>
  
  )
}

export default App