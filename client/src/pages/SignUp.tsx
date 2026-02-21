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
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  async function createUser(e : any){
    e.preventDefault();
    setLoading(true);
    try{
      const response=await fetch("http://localhost:8080/signup",{
      method: "POST",
      body: JSON.stringify({email,password}),
      headers:{"Content-Type": "application/json"}
    })
    const data=await response.json();
    if(!response.ok){
      for(let err of data.error){
        toast.error(err);
        setLoading(false);
      }
    }
    else{
      setLoading(false);
      toast.success(data.msg);
      navigate('/login');
    }
    }
    catch(error){
      console.error("User Signup Failed");
    }
  }
  return (
    <div className="car flex h-screen w-full justify-center items-center">
        <Card className="w-full max-w-sm bg-[#171717]/80 border-border/40">
      <CardHeader>
        <CardTitle className="text-primary">Sign up</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign up using email and password
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
                className="placeholder:text-muted-foreground border-border/40 text-primary"
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-primary">Password</Label>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} className=" border-border/40 text-primary placeholder:text-muted-foreground" placeholder="****" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" onClick={createUser} disabled={loading} className="w-full bg-primary cursor-pointer text-background hover:bg-muted-foreground">
          {
            loading ? "Signing up..." : "Sign up"
          }
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default SignUp