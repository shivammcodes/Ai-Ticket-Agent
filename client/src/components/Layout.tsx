import { Outlet } from "react-router-dom"
import Header from "./Header"
const Layout = () => {
  return (
    <div className="parent bg-black min-h-screen w-full px-32 relative pb-20">
        <Header></Header>
        <Outlet/>
    </div>
  )
}

export default Layout