import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { EditPerfil } from "./pages/EditPerfil";
import { CategoryPage } from "./pages/CategoryPage";
import "./index.css"


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
      <Route path="/category" element= {<CategoryPage/>}/>
      
      {/* Futuras rutas de usuarios logueados */}
      
      <Route path="/profile" element= {<EditPerfil/>}/>
      

      {/* Futuras rutas de los admin */}
      
    </Routes>
   <WhatsAppButton/> 
    <Footer/>

      
    </>
  )
}

export default App
