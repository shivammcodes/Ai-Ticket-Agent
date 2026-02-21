import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext'
import { useNavigate } from 'react-router-dom';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const context=useContext(UserContext);
     if (!context) {
        return <h1>UserContext not found</h1>;
    }
    const{userIsAuthenticated,loading}=context;
    const navigate=useNavigate()
    useEffect(()=>{
        if(!loading && !userIsAuthenticated){
            navigate('/login');
        }        
    },[navigate,userIsAuthenticated,loading])
    if(loading){
        return <h1 className='h-screen w-full flex items-center justify-center'>Loading ...</h1>
        }
    return userIsAuthenticated ? children : null
}

export default AuthChecker