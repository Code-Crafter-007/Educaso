import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import AuthIllustration from "./AuthIllustration";
import "./Auth.css";



function AuthPage() {
  const [mode,setMode]=useState("login");
  const [displayMode,setDisplayMode] = useState("login");
  const [animationIn,setAnimationIn]=useState(false)
  const [animating,setAnimating]=useState(false);
  


  // const switchMode=(newMode)=>{
  //   setAnimating(true);
  //   setTimeout(()=>{
  //     setDisplayMode(newMode);       
  //     setAnimating(false);          
  //   }, 500);                  
  // };

  

  useEffect(()=>{
    setAnimationIn(true)
  },[])

  return (
    <div className="auth-container">
      
      <div className="panel">
        <div className={`panel-content ${animationIn? "fade-in" : ""}`}>
          {mode==="login"
            ?<LoginPage switchMode={() => setMode("signup")} />
            : <AuthIllustration />
          }
        </div>
      </div>

      <div className="panel">
        <div className={`panel-content ${animationIn ? "fade-in" : ""}`}>
          {mode === "login"
            ? <AuthIllustration />
            : <Signup switchMode={()=>setMode("login")} />
          }
        </div>
      </div>

    </div>
  );
}

export default AuthPage;