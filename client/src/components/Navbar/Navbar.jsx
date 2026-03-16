import Logo from "./Logo"
import SearchBar from "./SearchBar"
import ExploreCourses from "./ExploreCourses"
import BecomeTutor from "./BecomeTutor"
import CartIcon from "./CartIcon"
import ThemeToggle from "./ThemeToggle"
import ProfileIcon from "./ProfileIcon"
import "./Navbar.css"

import { useLocation } from "react-router-dom"

function Navbar() {

  const location=useLocation()

  const isHome=location.pathname==="/"
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="nav-left">
          <Logo />                       
        </div>

        <div className="nav-center">
          <SearchBar />
        </div>

        <div className="nav-right">
          <ExploreCourses />
          <BecomeTutor />
          <ThemeToggle />
          <CartIcon />
          <ProfileIcon />
        </div>

      </div>
    </nav>
  )
}

export default Navbar