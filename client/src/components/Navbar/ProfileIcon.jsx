import {useNavigate} from "react-router-dom";
function ProfileIcon() {

  const navigate=useNavigate();

  return (
    <button className="icon-btn" onClick={()=>navigate('/auth')}>
      <svg width="22" height="22" fill="none" stroke="#1f2937" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </button>
  )
}
export default ProfileIcon