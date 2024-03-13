import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import { Footer } from "./components/Footer";
import "./index.css"
import { EditPerfil } from "./pages/EditPerfil";


function App() {
  
  return (
    <>
    <Navbar/>
    <Outlet/>

    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/cart" element= {<CartPage/>}/>
      <Route path="/favorites" element= {<FavoritePage/>}/>
      <Route path="/contactus" element ={<ContactPage/>}/>
      <Route path="/login" element= {<LoginPage/>}/>
      <Route path="/register" element= {<RegisterPage/>}/>
      
      {/* Futuras rutas de usuarios logueados */}
      
      <Route path="/profile" element= {<EditPerfil/>}/>
      

      {/* Futuras rutas de los admin */}
      
    </Routes>

    <Footer/>

      
    </>
  )
}

export default App
