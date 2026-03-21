import{Routes,Route} from "react-router-dom"
import Home from "../pages/Home"
import AuthPage from "../pages/Auth/AuthPage"
import Dashboard from "../pages/Dashboard/Dashboard"
import ProtectedRoute from "./ProtectedRoute"

function AppRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }/>

        </Routes>
    );
}

export default AppRoutes;