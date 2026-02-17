import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-sky-200 w-full flex items-center justify-between'>
        <Link to="/" className="logo">Assignify</Link>
        <nav className='bg-red-500 w-1/3'>
            <ul>
                <Link>Login</Link>
                <Link>Sign Up</Link>

            </ul>
        </nav>
    </div>
  )
}

export default Header