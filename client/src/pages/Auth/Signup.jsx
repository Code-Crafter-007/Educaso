import { useState } from "react";
import { useNavigate } from "react-router-dom";

import  {signupUser}  from "../../services/authService";

function Signup({switchMode}) {

  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  
  const navigate=useNavigate()

  const handleSignUp=async ()=>{

    setError("")

    if(!firstName || !lastName || !email || !password || !confirmPassword ){

      setError("Please fill all fields!")

      return 
    }

    if(password!==confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if(password.length<6){
      setError("Password must be atleast 6 characters!")
      return
    }

    try{

      setLoading(true);
      
      const data = await signupUser(firstName,lastName,email,password)

      if(!data || !data.token){

        throw new Error("Signup failed")
      }

      localStorage.setItem("token",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))

      navigate('/dashboard')
    }

    catch(err){
      setError(err.message || "Signup failed")
    }

    finally{
      setLoading(false)
    }

  }

  return (

    <div className="auth-card">

      <h1>Create Account</h1>
      <p className="subtitle">Start your learning journey today</p>

      <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

      <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} onKeyDown={(e)=>e.key==="Enter" && handleSignUp()}/>

      {error && <p className="error-msg">{error}</p>}

      <button className="primary-btn" onClick={handleSignUp} disabled={loading}>{loading?"Creating Accounts..." : "Create Account"}</button>

      <p className="switch">
        Already have an account?
        <span onClick={switchMode}>Sign in</span>
      </p>

    </div>

  );
}

export default Signup;