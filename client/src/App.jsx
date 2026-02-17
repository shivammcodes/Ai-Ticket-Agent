import React from 'react'
import Layout from './pages/Layout';
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}></Route>
        </Route>
      </Routes>
  )
}

export default App