import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
const Layout = () => {
  return (
    <div className='min-h-screen bg-stone-800 text-white px-10'>
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}

export default Layout;