import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./ui/colors.css";
import "./styles/animations.css"

function App(){

  const location=useLocation();
  const isAuth=location.pathname === "/auth";

  return (
    <>
      {!isAuth && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;