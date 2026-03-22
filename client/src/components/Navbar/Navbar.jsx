import Logo from "./Logo"
import SearchBar from "./SearchBar"
import ExploreCourses from "./ExploreCourses"
import BecomeTutor from "./BecomeTutor"
import CartIcon from "./CartIcon"
import ThemeToggle from "./ThemeToggle"
import ProfileIcon from "./ProfileIcon"
import { Bars3Icon } from "@heroicons/react/24/outline"
import "./Navbar.css"

import {useLocation} from "react-router-dom"

function Navbar({onMenuClick}) {

  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <nav className="navbar sticky-navbar">
      <div className="navbar-container">

        <div className="nav-left">
          {!isHome && (
            <button className="icon-btn" onClick={onMenuClick}>
              <Bars3Icon width={22} height={22} />
            </button>
          )}
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