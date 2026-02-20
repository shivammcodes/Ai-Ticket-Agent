import { Button } from "@/components/ui/button"
import video from '../assets/video.mp4';

const HomePage = () => {
  return (
    <div className="container min-h-screen w-full mt-32">
      <div className='w-full min-h-[70vh] grid grid-cols-5 gap-x-20'>
        <div className="left col-span-2">
            <h1 className='text-7xl font-medium leading-20 tracking-wide text-muted'>Create your Ticket</h1>
            <h2 className='mt-3 text-lg text-[#949494]'>What technical help you need ?</h2>
            <div className="Ticket-info bg-[#0d0d0d] mt-5 rounded-sm h-fit">
              <input placeholder="Enter the tite" className="rounded-sm  placeholder:text-[#949494] placeholder:bg-[#0d0d0d] w-full outline-none border-2 p-3 border-[#949494]/50 text-muted"></input>
              <textarea placeholder="Enter the description" className="rounded-sm  placeholder:text-[#949494] placeholder:bg-[#0d0d0d] w-full mt-3 outline-none border-2 p-3 border-[#949494]/50 text-muted"></textarea>
            </div>
            <div className="btn flex justify-end w-full mt-5">
                <Button size={'sm'} className='bg-muted text-foreground rounded-2xl hover:bg-[#949494] cursor-pointer'>Create Ticket</Button>
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
    </div>
  )
}

export default HomePage