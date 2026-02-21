import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserContextType = {
  userIsAuthenticated: boolean;
  setUserIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  async function checkUser(){
    try{
        setLoading(true);
        const response=await fetch("http://localhost:8080/checkUser",{
            method: "GET",
            credentials: 'include'
        })
        const data=await response.json();
        if(!response.ok){
            console.error(data.error);
            setUserIsAuthenticated(false);
            setLoading(false)
            setUser(null);
        }
        else{
            const{email,_id}=data;
            setLoading(false);
            setUserIsAuthenticated(true);
            setUser({email,_id});
        }
    }
    catch(error){
        setLoading(false);
        toast.error("Something went wrong");
    }
  }
  useEffect(()=>{
    checkUser()
  },[])

  return (
    <UserContext.Provider
      value={{
        userIsAuthenticated,
        setUserIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;