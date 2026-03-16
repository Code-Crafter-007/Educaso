import{Routes,Route} from "react-router-dom"
import Home from "../pages/Home"
import AuthPage from "../pages/Auth/AuthPage"


function AppRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
        </Routes>
    );
}

export default AppRoutes;