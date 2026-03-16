import { useState } from "react";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import AuthIllustration from "./AuthIllustration";
import "./Auth.css";

function AuthPage() {

  const [mode,setMode]=useState("login");

  return (
    <div className={`auth-container ${mode==="signup"?"signup-mode":""}`}>

      <div className="panel left-panel">
        {mode==="login"
          ? <LoginPage switchMode={()=>setMode("signup")}/>
          : <AuthIllustration />
        }
      </div>

      <div className="panel right-panel">
        {mode=="login"
          ? <AuthIllustration/>
          : <Signup switchMode={()=>setMode("login")}/>
        }
      </div>

    </div>
  );
}

export default AuthPage;