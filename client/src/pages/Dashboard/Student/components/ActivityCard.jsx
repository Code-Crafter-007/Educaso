import "./ActivityCard.css";

function ActivityCard({status,module,courseName,time,activityIcon,color}){

  return(
    <div className="activity-card">
      <div className="activity-icon" style={{backgroundColor:color}}>
        {activityIcon}
      </div>
      <div className="activity-details">
        <div className="activity-details-head">
          <span className="activity-status">{status}</span>
          <span className="activity-module-name">{module}</span>
        </div>
        <div className="activity-details-bottom">
          <span>{courseName}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;