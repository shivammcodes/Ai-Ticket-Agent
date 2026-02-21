import { Route,Routes } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"
import UserProvider from "./components/UserContext"

const App = () => {
  return (
    <UserProvider>
    <Toaster></Toaster>
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Route>
    </Routes>
    </UserProvider>
  )
}

export default App