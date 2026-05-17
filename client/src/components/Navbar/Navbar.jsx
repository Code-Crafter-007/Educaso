import Logo from "./Logo"
import SearchBar from "./SearchBar"
import ExploreCourses from "./ExploreCourses"
import BecomeTutor from "./BecomeTutor"
import CartIcon from "./CartIcon"
import ThemeToggle from "./ThemeToggle"
import ProfileIcon from "./ProfileIcon"
import { Bars3Icon } from "@heroicons/react/24/outline"
import MyCourses from "./MyCourses"
import "./Navbar.css"
import {useLocation} from "react-router-dom"



function Navbar({onMenuClick}) {

  const token=localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  const role=user?.accountType;

  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <nav className="navbar sticky-navbar">
      <div className="navbar-container">

        <div className="nav-left">
          {!isHome && (
            <button className="icon-btn three-dot-menu" onClick={onMenuClick}>
              <Bars3Icon width={22} height={22} />
            </button>
          )}
          <Logo />
        </div>

        <div className="nav-center">
          <SearchBar />
        </div>

        <div className="nav-right">


          {user?.accountType !== "Instructor" &&  <ExploreCourses />}
          {!token && <BecomeTutor/>}      
          {token && role === "Student" && <MyCourses />} 
  
          <ThemeToggle />

          {user?.accountType !== "Instructor" && <CartIcon />}
          <ProfileIcon />
        </div>

      </div>
    </nav>
  )
}

export default Navbar