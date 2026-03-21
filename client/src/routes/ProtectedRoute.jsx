import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){

    const token=localStorage.getItem("token");

    if(!token){

        return (

            <Navigate to="/auth" replace></Navigate>

        )
        
    }

    return children;

}

export default ProtectedRoute;