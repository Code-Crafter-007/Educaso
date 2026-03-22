import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./ui/colors.css";
import "./styles/animations.css";
import "./App.css";

function App() {

  const [sidebarOpen,setSidebarOpen]=useState(false);

  const location=useLocation();

  const isAuth = location.pathname==="/auth"
  const hasSidebar = location.pathname!=="/" && location.pathname!=="/auth"

  return(

    <>
    {!isAuth && <Navbar onMenuClick={()=>setSidebarOpen(true)}/>}
    
    {hasSidebar &&
    
      <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)}/>
      )}
      
      {<Sidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>}
      </>
    }

    <main className="app-main">
      <AppRoutes/>

    </main>

    </>
  )
}

export default App;