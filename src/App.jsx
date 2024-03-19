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
import ProductsAdminPage from "./pages/ProductsAdminPage";
import ProductAdminFormPage from "./pages/ProductAdminFormPage";

{/*aqui estaran importados los contextss */}
import { AuthProvider } from "./context/AuthContext"
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import UsersAdminPage from "./pages/UsersAdminPage";
import UserAdminFormPage from "./pages/UserAdminFormPage";
function App() {

  return (
    <>

      <AuthProvider>
        <UserProvider>
        <CategoryProvider>
          <ProductProvider>

          <Navbar />
          <Outlet />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            {/* <Route path="/contactus" element={<ContactPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/category" element={<CategoryPage />} /> */}

            {/* Futuras rutas de usuarios logueados */}

            <Route path="/profile" element={<EditPerfil />} />

                      
            {/* Futuras rutas de los admin */}
            <Route path="/categories" element={<CategoriesAdminPage />} /> {/* Ruta para ver todas las categorias */}
            <Route path="/category" element={<CategoryAdminFormPage />} /> {/* Ruta para crear una categoria */}
            <Route path="/category/:id" element={<CategoryAdminFormPage />} /> {/* Ruta para editar una categoria */}

            <Route path="/products" element={<ProductsAdminPage />} /> {/* Ruta para ver todas las productos */}
            <Route path="/product" element={<ProductAdminFormPage />} /> {/* Ruta para crear una producto */}
            <Route path="/product/:id" element={<ProductAdminFormPage />} /> {/* Ruta para editar una producto */}

            <Route path="/users" element={<UsersAdminPage />} /> {/* Ruta para ver todas las usuarios */}
            <Route path="/user" element={<UserAdminFormPage />} /> {/* Ruta para crear una usuario */}
            <Route path="/user/:id" element={<UserAdminFormPage />} /> {/* Ruta para editar una usuario */}
          </Routes>
          <WhatsAppButton />
          <Footer />

          </ProductProvider>
        </CategoryProvider>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
