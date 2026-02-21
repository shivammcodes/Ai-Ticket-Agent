import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "@/components/UserContext";

const LoginPage = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  const context=useContext(UserContext);
  if(!context){
    return <h1>UserContext not found</h1>;
  }
  const{setUserIsAuthenticated,setUser}=context;
  async function setLogin(e: any){
    e.preventDefault();
    setLoading(true);
    try{
      const response=await fetch("http://localhost:8080/login",{
        method: "POST",
        body:JSON.stringify({email,password}),
        headers: {"Content-type": "application/json"},
        credentials: 'include'
      })
      const data=await response.json();
      if(!response.ok){
        setLoading(false);
        toast.error(data.error);
      }
      else{
        setLoading(false);
        toast.success(data.msg);
        setUserIsAuthenticated(true);
        setUser({email:data.user.email,_id:data.user._id});
        navigate('/')
      }
    }
    catch(error){
      toast.error("User Login falied");
    }
  }
  return (
    <div className="car flex h-screen w-full justify-center items-center">
        <Card className="w-full max-w-sm bg-[#171717]/80 border-border/40">
      <CardHeader>
        <CardTitle className="text-primary">Login to your account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-primary">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                className="placeholder:text-muted-foreground text-primary border-border/40"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-primary">Password</Label>
              </div>
              <Input id="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required className="border-border/40 placeholder:text-muted-foreground text-primary" placeholder="****" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={setLogin} type="submit" disabled={loading} className="cursor-pointer w-full bg-primary text-background hover:bg-muted-foreground">
          {
            loading ? "Logging In..." : "Log in"
          }
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default LoginPage