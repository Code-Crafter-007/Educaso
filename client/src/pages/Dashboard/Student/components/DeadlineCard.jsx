import "./DeadlineCard.css";

function DeadlineCard({icon,title,courseName,dueDate,color}){
  return(
    <div className="deadline-item">
      <div className="deadline-icon" style={{backgroundColor:color}}>
        {icon}
      </div>
      <div className="deadline-info">
        <h4 className="deadline-title">{title}</h4>
        <p className="deadline-course">{courseName}</p>
        <span className="deadline-date">{dueDate}</span>
      </div>
    </div>
  );
}

export default DeadlineCard;