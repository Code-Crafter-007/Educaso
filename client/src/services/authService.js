const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api"

export const loginUser = async(email,password)=>{

    const res = await fetch(`${API_BASE}/auth/login`,{

        method:"POST",
        headers:{"Content-Type" : "application/json"},
        credentials:"include",
        body:JSON.stringify({email,password})
    })

    const data = await res.json();
    
    if(!res.ok) throw new Error(data.message || "login failed");

    return data;
}

export const signupUser= async(firstName,lastName,email,password)=>{

    const res = await fetch(`${API_BASE}/auth/signup`,{

        method:"POST",
        headers:{"Content-Type" : "application/json"},
        credentials:"include",
        body:JSON.stringify({firstName, lastName, email, password})
    })

    const data = await res.json()

    if(!res.ok) throw new Error(data.message || "Signup Failed")
    return data
}