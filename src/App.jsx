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
// import { CategoryPage } from "./pages/CategoryPage";
import "./index.css"
import CategoriesAdminPage from "./pages/CategoriesAdminPage";
import CategoryAdminFormPage from "./pages/CategoryAdminFormPage";

{/*aqui estaran importados los contextss */}
import { AuthProvider } from "./context/AuthContext"
import { CategoryProvider } from "./context/CategoryContext";
function App() {

  return (
    <>

      <AuthProvider>
        <CategoryProvider>
          <Navbar />
          <Outlet />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/category" element={<CategoryPage />} /> */}

            {/* Futuras rutas de usuarios logueados */}

            <Route path="/profile" element={<EditPerfil />} />

                      
            {/* Futuras rutas de los admin */}
            <Route path="/categories" element={<CategoriesAdminPage />} /> {/* Ruta para ver todas las categorias */}
            <Route path="/category" element={<CategoryAdminFormPage />} /> {/* Ruta para crear una categoria */}
            <Route path="/category/:id" element={<CategoryAdminFormPage />} /> {/* Ruta para editar una categoria */}

          </Routes>
          <WhatsAppButton />
          <Footer />
        </CategoryProvider>
      </AuthProvider>
    </>
  )
}

export default App
