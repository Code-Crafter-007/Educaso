import Logo from "./Logo"
import MessageIcon from "./MessageIcon"
import Bell from "./Bell"
import SearchBar from "./SearchBar"
import ExploreCourses from "./ExploreCourses"
import BecomeTutor from "./BecomeTutor"
import CartIcon from "./CartIcon"
import ThemeToggle from "./ThemeToggle"
import ProfileIcon from "./ProfileIcon"
import MyCourses from "./MyCourses"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { useLocation } from "react-router-dom"
import "./Navbar.css"


const NavRight = ({ role }) => {
  if (role === "Student") {
    return (
      <div className="nav-right">
         <div className="nav-icon-group">
        <ExploreCourses />
        <MyCourses />
        <ThemeToggle />
        <CartIcon />
        </div>
        <ProfileIcon />
      </div>
    )
  }

  if (role === "Instructor") {
    return (
      <div className="nav-right">
        <div className="nav-icon-group">
          <Bell count={3} />
          <MessageIcon count={2} />
          <ThemeToggle />
        </div>
        <ProfileIcon />
      </div>
    )
  }

  if (role === "Admin") {
    return (
      <div className="nav-right">
        <ProfileIcon />
      </div>
    )
  }

  return (
    <div className="nav-right">
      <ExploreCourses />
      <BecomeTutor />
      <ThemeToggle />
      <CartIcon />
      <ProfileIcon />
    </div>
  )
}

function Navbar({ onMenuClick }) {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  const role = user?.accountType
  const isHome = useLocation().pathname === "/"

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

        <NavRight role={token ? role : null} />

      </div>
    </nav>
  )
}

export default Navbar