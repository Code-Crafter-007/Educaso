import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./ui/colors.css";
import "./styles/animations.css";
import "./App.css";

function App() {
  const location = useLocation();
  const isAuth = location.pathname === "/auth";
  const hasSidebar = location.pathname !== "/" && location.pathname !== "/auth";

  return (
    <>
      {!isAuth && <Navbar />}
      <div className="app-body">
        {hasSidebar && <Sidebar />}
        <main className="app-main">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

export default App;