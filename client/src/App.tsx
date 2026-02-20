import { Route,Routes } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUp from "./pages/SignUp"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Route>
    </Routes>
  )
}

export default App