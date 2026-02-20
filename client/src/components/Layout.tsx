import { Outlet } from "react-router-dom"
import Header from "./Header"
const Layout = () => {
  return (
    <div className="parent bg-black min-h-screen w-full px-20 relative">
        <Header></Header>
        <Outlet/>
    </div>
  )
}

export default Layout