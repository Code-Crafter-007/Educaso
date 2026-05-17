import { useNavigate } from "react-router-dom"

function MyCourses() {
  const navigate=useNavigate()
  return(
    <span className="become-tutor" onClick={() => navigate("/courses")}>
      My Courses
    </span>
  )
}

export default MyCourses