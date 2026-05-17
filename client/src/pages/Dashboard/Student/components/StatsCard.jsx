import "./StatsCard.css";

function StatsCard({Statsicon,percentageValue,labelValue,labelName,color,accentColor}){

  return(
    <div className="stats-card">
      
      <div className="stats-heading">
        <div className="stats-icon" style={{backgroundColor:color}}>
          {Statsicon}
        </div>

        <div className="stats-per" style={{backgroundColor:color,color:accentColor}}>{percentageValue}</div>
      </div>

      <div className="stats-value">{labelValue}</div>

      <div className="stats-label">{labelName}</div>

    </div>
  );
}

export default StatsCard;