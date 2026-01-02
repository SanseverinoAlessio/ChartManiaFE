import JwtService from "../services/JwtService";
import { Navigate,Outlet } from "react-router";

function PublicRoute(){
    if(JwtService.getAccessToken()){
        return <Navigate to="/personal-area" />
    }
    
    return <Outlet />;
}

export default PublicRoute;