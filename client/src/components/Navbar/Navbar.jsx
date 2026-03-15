import Logo from "./Logo"
import SearchBar from "./SearchBar"
import ExploreCourses from "./ExploreCourses"
import BecomeTutor from "./BecomeTutor"
import CartIcon from "./CartIcon"
import ThemeToggle from "./ThemeToggle"
import ProfileIcon from "./ProfileIcon"
import "./Navbar.css"

function Navbar() {
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
          <CartIcon />
          <ThemeToggle />
          <ProfileIcon />
        </div>

      </div>
    </nav>
  )
}

export default Navbar