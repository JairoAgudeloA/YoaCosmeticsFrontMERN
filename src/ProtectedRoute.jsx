import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"


export function ProtectedRoute() {
    const {loading, isAuthenticated } = useAuth();
    console.log(loading,isAuthenticated);
    if (loading) {
        return <h1>Loading ...</h1>;
    }
    if (!loading && !isAuthenticated) {
        return (
            <Navigate to="/login" replace />
        )
    }
  return <Outlet />
}


export function ProtectedRouteAdmin() {
    const { loading, isAuthenticated, user } = useAuth();
    console.log(loading, isAuthenticated, user);
    
    if (loading) {
        return <h1>Loading ...</h1>;
    }

    // Verifica si el usuario está autenticado y tiene el rol de administrador
    if (!loading && !isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    if (user && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
}

