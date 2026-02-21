import { Button } from "@/components/ui/button"
import video from '../assets/video.mp4';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Tickets from "@/components/Tickets";
import { TiTicket } from "react-icons/ti";

const HomePage = () => {
  const[title,setTitle]=useState('');
  const[description,setDescription]=useState('');
  const[tickets,setTickets]=useState([]);
  const[length,setLength]=useState(false);
  async function fetchTickets(){
    try{
      const response=await fetch("http://localhost:8080/getTickets",{
        method: "GET",
        credentials: "include"
      })
      const data=await response.json();
      if(response.status==404){
        setLength(false);
      }
      if(!response.ok){
        console.log(data.error);
      }
      else{
        setTickets(data.data);
        setLength(true);
      }
    }
    catch(error){
      console.log("Failed to get the tickets");
    }
  }
  useEffect(()=>{
    fetchTickets();
  },[tickets])
  async function createTicket(){
    try{
      const response=await fetch("http://localhost:8080/createTicket",{
        method: "POST",
        body: JSON.stringify({title,description}),
        headers:{"Content-type":"application/json"},
        credentials: "include"
      })
      setTitle('');
      setDescription('');
      const data=await response.json();
          console.log(data);
      if(!response.ok){
        toast.error(data.error);
      }
      else{
        toast.success(data.msg);
      }
    }
    catch(error){
       console.log("Falied to create the ticket");
    }
  }
  console.log(tickets);
  return (
    <div className="container min-h-screen w-full mt-32">
      <div className='w-full min-h-[70vh] grid grid-cols-5 gap-x-20'>
        <div className="left col-span-2">
            <h1 className='text-7xl font-medium leading-20 tracking-wide text-primary'>Create your <p className="text-chart-1">Ticket</p></h1>
            <h2 className='mt-3 text-lg text-muted-foreground'>What technical help you need ?</h2>
            <div className="con bg-card border-2 border-accent mt-10 px-5 py-5 rounded-xl">
              <div className="Ticket-info  mt-5 rounded-sm h-fit">
              <input value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Enter the tite" className="rounded-sm bg-muted  placeholder:text-muted-foreground w-full outline-none border-2 p-3 border-accent text-primary"></input>
              <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter the description" className="rounded-sm bg-muted placeholder:text-muted-foreground w-full mt-3 outline-none border-2 p-3 border-accent text-primary"></textarea>
            </div>
            <div className="btn flex justify-end w-full mt-5">
                <Button size={'sm'} onClick={createTicket} className='bg-primary text-background rounded-2xl hover:bg-muted-foreground cursor-pointer'>Create Ticket</Button>
            </div>
            </div>
        </div>
        <div className="right col-span-3 h-[75vh]">
           <div className="video w-full h-full overflow-hidden">
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src={video} type="video/mp4" />
            </video>
        </div>
      </div>
    </div>
    <div className="allTickets text-accent mt-10">
      <h1 className="text-6xl text-primary">All Tickets</h1>
      <div className="tickets mt-14">
        {
          !length ? <div className="flex items-center text-3xl text-chart-1">No Tickets <p className="mx-3"><TiTicket /></p> Found, Create One</div> 
          :
          tickets.map((e,id)=>(
            <Tickets key={id} ticket={e}></Tickets>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default HomePage