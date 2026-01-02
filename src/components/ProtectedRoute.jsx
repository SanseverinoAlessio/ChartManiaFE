import JwtService from "../services/JwtService";
import { Navigate,Outlet } from "react-router";

function ProtectedRoute(){
    if(!JwtService.getAccessToken()){
        return <Navigate to="/login" />
    }

    return <Outlet />;
}

export default ProtectedRoute;