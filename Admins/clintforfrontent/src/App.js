import React from 'react'
import Admin from './Components/Admin'
// import Dasboard from './Components/Dasboard'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard1 from './Components/Dashboard1';


const App = () => {
  return (
    <div>
     <BrowserRouter>
      <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/dashbord' element={<Dashboard1 />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

