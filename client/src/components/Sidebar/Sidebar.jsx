import {HomeIcon,BookOpenIcon,CalendarIcon,ChartBarIcon,UserIcon,CogIcon,XMarkIcon,FireIcon} from "@heroicons/react/24/outline";
import {HomeIcon as HomeIconSolid,BookOpenIcon as BookOpenIconSolid,CalendarIcon as CalendarIconSolid,ChartBarIcon as ChartBarIconSolid,UserIcon as UserIconSolid,CogIcon as CogIconSolid} from "@heroicons/react/24/solid";
import {useLocation,useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Sidebar.css";

const navList=[
  {label:"Dashboard",icon:<HomeIcon width={20} height={20}/>,activeIcon:<HomeIconSolid width={20} height={20}/>,path: "/dashboard"},
  {label: "My Courses",icon:<BookOpenIcon width={20} height={20}/>,activeIcon:<BookOpenIconSolid width={20} height={20}/>,path: "/courses"},
  {label: "Schedule",icon:<CalendarIcon width={20} height={20}/>,activeIcon:<CalendarIconSolid width={20} height={20}/>,path: "/schedule"},
  {label: "Progress",icon:<ChartBarIcon width={20} height={20}/>,activeIcon:<ChartBarIconSolid width={20} height={20}/>,path: "/progress"},
  {label: "Profile",icon:<UserIcon width={20} height={20}/>,activeIcon:<UserIconSolid width={20} height={20}/>,path: "/profile"},
  {label: "Settings",icon:<CogIcon width={20} height={20}/>,activeIcon:<CogIconSolid width={20} height={20}/>,path: "/settings"},
];

function Sidebar({isOpen,onClose}){
  const location=useLocation(); 
  const navigate=useNavigate();

  return(
    
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

      <div className="sidebar-header">
      <button className="icon-btn" onClick={onClose}>
        <XMarkIcon height={20} width={20}></XMarkIcon>
      </button>
      </div>

    <nav className="sidebar-nav">

      {navList.map((item)=>{

        const isActive = location.pathname===item.path

        return(
          <div key={item.label} 
            className={`sidebar-nav-item ${isActive? "active" : ""}`} 
            onClick={()=>navigate(item.path)}>

              <span className="sidebar-nav-icon">
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              <span className="sidebar-nav-label">{
              item.label}
              </span>

            </div>
        )
      })}
    </nav>
    </aside>
  )
}

export default Sidebar