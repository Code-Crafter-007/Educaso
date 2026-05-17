import {CheckCircleIcon,PlayCircleIcon,StarIcon,ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import ActivityCard from "./ActivityCard";
import "./RecentActivity.css";

function RecentActivity(){

  const activities=[
    {
        id: 1,
        status: "Completed",
        module: "React State Management",
        courseName: "Fullstack Web Dev",
        time: "2 hours ago",
        activityIcon: <CheckCircleIcon width={20} height={20} />,
        color: "#dcfce7",
    },
    {
        id: 2,
        status: "Started",
        module: "Machine Learning Intro",
        courseName: "Data Science",
        time: "5 hours ago",
        activityIcon: <PlayCircleIcon width={20} height={20} />,
        color: "#dbeafe",
    },
    {
      id: 3,
        status: "Earned Badge",
        module: "Design Thinking Pro",
        courseName: "UI/UX Masterclass",
        time: "1 day ago",
        activityIcon: <StarIcon width={20} height={20} />,
        color: "#ede9fe",
    },
    {
        id: 4,
        status: "Submitted",
        module: "Portfolio Project",
        courseName: "Fullstack Web Dev",
        time: "2 days ago",
        activityIcon: <ArrowUpCircleIcon width={20} height={20} />,
        color: "#ffedd5",
    },
  ];

  return (
    <div className="recent-activity">
      <h2 className="recent-activity-title">Recent Activity</h2>
      <div className="activity-list">
        
        {activities.map((a)=>(

            <ActivityCard key={a.id} {...a}></ActivityCard>
        ))}

      </div>
    </div>
  );
}

export default RecentActivity;