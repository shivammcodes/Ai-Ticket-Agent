import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import Logo from './Logo'
const Header = () => {
  return (
    <div className='flex justify-between py-5 items-center fixed top-0 left-0 w-full bg-white/1 px-12 backdrop-blur-2xl'>
        <Link to={'/'} className='logo text-2xl text-muted flex items-center gap-x-2'>Assignfy<Logo></Logo></Link>
        <nav className='gap-x-3 flex text-lg items-center'>
            <Link to={'/login'} className='text-[#949494] text-sm'>Log in</Link>
            <Link to={'/signup'}><Button size={'sm'} className='bg-muted text-foreground rounded-2xl hover:bg-[#949494] cursor-pointer'>Signup</Button></Link>
        </nav>
    </div>
  )
}

export default Header




