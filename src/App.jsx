import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
// import { ContactPage } from "./pages/ContactPage";
import {SearchResultsPage } from "./pages/SearchResultsPage"
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { EditPerfil } from "./pages/EditPerfil";

import "./index.css"

{/*estas son las rutas del admin*/ }
import CategoriesAdminPage from "./pages/AdminPages/CategoriesAdminPage";
import CategoryAdminFormPage from "./pages/AdminPages/CategoryAdminFormPage";
import ProductsAdminPage from "./pages/AdminPages/ProductsAdminPage";
import ProductAdminFormPage from "./pages/AdminPages/ProductAdminFormPage";
import UsersAdminPage from "./pages/AdminPages/UsersAdminPage";
import UserAdminFormPage from "./pages/AdminPages/UserAdminFormPage";
import DashboardAdminPage from "./pages/AdminPages/DashboardAdminPage";

{/*aqui estaran importados los contextss */ }
import { AuthProvider } from "./context/AuthContext"
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <CategoryProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>

                <Navbar setSearch={setSearch} />
                <Outlet />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="//:search" element={<HomePage search={search} />} />
                  <Route path="/search/:search" element={<SearchResultsPage search={search} />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/favorites" element={<FavoritePage />} />
                  {/* <Route path="/contactus" element={<ContactPage />} /> */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Futuras rutas de usuarios logueados */}

                  <Route path="/profile" element={<EditPerfil />} />
                  {/* <Route path="/profile/:id" element={<EditPerfil />} /> */}

                  {/* Futuras rutas de los admin */}
                  <Route path="/admin/dashboard" element={<DashboardAdminPage/>} /> {/* Ruta para ver el dashboard */}

                  <Route path="/admin/categories" element={<CategoriesAdminPage />} /> {/* Ruta para ver todas las categorias */}
                  <Route path="/admin/category" element={<CategoryAdminFormPage />} /> {/* Ruta para crear una categoria */}
                  <Route path="/admint/category/:id" element={<CategoryAdminFormPage />} /> {/* Ruta para editar una categoria */}

                  <Route path="/admin/products" element={<ProductsAdminPage />} /> {/* Ruta para ver todas las productos */}
                  <Route path="/admin/product" element={<ProductAdminFormPage />} /> {/* Ruta para crear una producto */}
                  <Route path="/admin/product/:id" element={<ProductAdminFormPage />} /> {/* Ruta para editar una producto */}

                  <Route path="/admin/users" element={<UsersAdminPage />} /> {/* Ruta para ver todas las usuarios */}
                  <Route path="/admin/user" element={<UserAdminFormPage />} /> {/* Ruta para crear una usuario */}
                  <Route path="/admin/user/:id" element={<UserAdminFormPage />} /> {/* Ruta para editar una usuario */}
                </Routes>
                <WhatsAppButton />
                <Footer />

                </OrderProvider>              
              </CartProvider>
            </ProductProvider>
          </CategoryProvider>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
