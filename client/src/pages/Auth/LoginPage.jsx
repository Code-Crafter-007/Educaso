import {loginUser} from "../../services/authService";

import logo from "../../assets/logo.png";
import google from "../../assets/icons/google.svg";
import facebook from "../../assets/icons/facebook.png";
import x from "../../assets/icons/x.png";
import twitter from "../../assets/icons/twitter.png"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({switchMode}){

  const [email,setEmail]=useState("")
  const [password, setPassword]=useState("");
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  const handleLogin = async()=>{

    setError("")

    if(!email || !password){
      setError("Please fill all fields!.")
      return;
    }

    try{
      setLoading(true)

      const data=await loginUser(email,password);

      if(!data || !data.token){

        throw new Error("Invalid credentials")
      }

      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data.user))

      navigate("/dashboard");
    }

    catch(err){

      setError(err.message || "Login Failed");
    }

    finally{
      setLoading(false);

    }

};


  return (

    <div className="login-page">

      <div className="auth-header"></div>

        <div className="logo-container">

          <img className='logo' src={logo} alt="Logo"/>
          <span className="brand-name">
                EDUCA<span className="brand-highlight">SO</span>
            </span>

        </div>
        <div className="auth-info">
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-subtitle">Sign in to continue your learning journey</p>
        </div>
    

      <div className="auth-card">

      <label htmlFor="email">Email Adress</label>

      <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <span><label htmlFor="password" >Password</label></span>
      <input id="password" type="password" placeholder="password..." value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={(e)=>e.key==="Enter" && handleLogin()}/>

      {error && <p className="error-msg">{error}</p>}

      <div className="options">

  <label className="remember">
    <input type="checkbox" />
    Remember me
  </label>

  <span className="link">Forgot Password?</span>

</div>

      <button className="primary-btn" onClick={handleLogin} disabled={loading}>{loading?"Signing in...":"Sign In"}</button>

      <div className="divider">
        <span className="line"></span>
        <p>Or continue with</p>
        <span className="line"></span>
</div>

      <div className="social">
        <button>
          <img src={google}/>
        </button>
        <button>
          <img src={facebook}/>
        </button>
        <button>
          <img className="x-icon" src={twitter}/>
        </button>
      </div>

      <p className="switch">
        Don't have an account? 
        <span onClick={switchMode}> Sign up for free</span>
      </p>

    </div>

    </div>

  );
}

export default LoginPage;