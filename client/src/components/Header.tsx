import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import Logo from './Logo'
import { useContext } from 'react';
import { UserContext } from './UserContext';
import toast from 'react-hot-toast';
const Header = () => {
  const navigate=useNavigate();
  const context=useContext(UserContext);
    if(!context){
      return <h1>UserContext not found</h1>;
    }
    const{user,setUserIsAuthenticated,setUser,setLoading}=context;
    async function logout(){
      const response=await fetch("http://localhost:8080/logout",{
        method: "POST",
        credentials: "include"
      })
      const data=await response.json();
      if(!response.ok){
        console.log(data.error);
      }
      else{
        toast.success(data.msg);
        navigate('/login');
        setUserIsAuthenticated(false);
        setLoading(false)
        setUser(null);

      }
    }
  return (
    <div className='flex justify-between py-5 items-center fixed top-0 left-0 w-full bg-white/1 px-32 backdrop-blur-2xl'>
        <Link to={'/'} className='logo text-2xl text-primary flex items-center gap-x-2'>Assignfy<Logo></Logo></Link>
        <nav className='gap-x-3 flex text-lg items-center'>
            {
              user==null ? (
            <>
              <Link to={'/login'} className='text-muted-foreground hover:text-primary text-sm'>Log in</Link>
            <Link to={'/signup'}><Button size={'sm'} className='bg-primary text-background rounded-2xl hover:bg-muted-foreground cursor-pointer'>Signup</Button></Link>
            </>
              ):
              <>
               <Link to={'/'} className='text-muted-foreground text-sm'>Hello, {user.email}</Link>
               <Link to={'/signup'}><Button size={'sm'} className='bg-primary text-background rounded-2xl hover:bg-muted-foreground cursor-pointer' onClick={logout}>Logout</Button></Link>
              </>
            }
        </nav>
    </div>
  )
}

export default Header




