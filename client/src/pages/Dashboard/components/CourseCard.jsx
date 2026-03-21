import { useEffect,useState } from "react";
import "./CourseCard.css";


function CourseCard({thumbnail,title,instructor,progress,totalLessons,completedLessons,dueDate}){
    
    const [active, setActive] = useState(false);
    const [currentProgress,setCurrentProgress]=useState(0);
    
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setCurrentProgress(progress)
        },300);
        return ()=> clearTimeout(timer)
    },[progress])

  return(
    <div className="course-card">

      <img className="course-thumbnail" src={thumbnail} alt={title} />

      <div className="course-info">
        <div className="course-top">
          <div>
            <h3 className="course-title">{title}</h3>
            <p className="course-instructor">by {instructor}</p>
          </div>
          <span className="course-progress-value">{progress}%</span>
        </div>

        <div className="course-progress-bar">
          <div className="course-progress-fill" style={{ width: `${currentProgress}%` }}></div>
        </div>

        <div className="course-bottom">
          <span className="course-meta">{completedLessons}/{totalLessons} lessons · Due {dueDate}</span>
          <button className="course-btn">Continue</button>
        </div>
      </div>

    </div>
  );
}

export default CourseCard;