import { useNavigate } from "react-router-dom"

function Dashboard() {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/auth")
    }

    return (
        <div style={{ padding: "40px" }}>

            <h1>Welcome, {user?.firstName} {user?.lastName} 👋</h1>
            <p>Email: {user?.email}</p>
            <p>Account Type: {user?.accountType}</p>

            <button onClick={handleLogout} style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
            }}>
                Logout
            </button>

        </div>
    )
}

export default Dashboard