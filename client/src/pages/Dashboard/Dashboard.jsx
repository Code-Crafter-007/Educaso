import { BookOpenIcon, CheckCircleIcon ,HandThumbUpIcon,StarIcon,XMarkIcon} from "@heroicons/react/24/outline";
import UpcomingDeadlines from "./components/UpcomingDeadlines";
import StatsCard from "./components/StatsCard";
import CourseCard from "./components/CourseCard";
import RecentActivity from "./components/RecentActivity";

import "./Dashboard.css";
import ActivityCard from "./components/ActivityCard";

import {useState} from "react";

function Dashboard() {

  const user=JSON.parse(localStorage.getItem("user"))

  const[showBanner,setShowBanner]=useState(true);

  return (
    <div className="dashboard">
      
      {showBanner && 
      (
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2 className="welcome-title">Welcome back, {user?user.firstName:""}! 👋</h2>
            <p className="welcome-subtitle">Continue your learning journey</p>
          </div>
          <button className="welcome-close" onClick={()=>setShowBanner(false)}>
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
      )}

      <div className="stats-container">

        <StatsCard
          Statsicon={<BookOpenIcon width={22} height={22}/>}
          percentageValue="+12%"
          labelValue="3"
          labelName="Active Courses"
          color="#dbeafe"
          accentColor="rgba(45,92,243,1)"
        />

        <StatsCard
          Statsicon={<CheckCircleIcon width={22} height={22} />}
          percentageValue="+8"
          labelValue="79"
          labelName="Completed Lessons"
          color="#dcfce7"
          accentColor="rgba(49, 146, 62, 1)"
        />

        <StatsCard
          Statsicon={<HandThumbUpIcon width={22} height={22} />}
          percentageValue="Top 5%"
          labelValue="62%"
          labelName="Avg. Progress"
          color="#ede9fe" 
          accentColor="rgba(140,33,243,1)" 
        />
        <StatsCard
        Statsicon={<StarIcon width={22} height={22} />}
        percentageValue="+2"
        labelValue="12"
        labelName="Certificates Earned"
        color="rgba(255, 237, 213, 1)" 
        accentColor="rgba(277,87,6,1)"
      />
        
      </div>

      <div className="learning-details">

      <div className="learning-section">

        <div className="learning-section-header">

        <h1 className="learning-section-title">Continue Learning</h1>
        <span className="view-all">View All →</span></div>

         <div className="courses-list">
    <CourseCard
      thumbnail="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400"
      title="Advanced Fullstack Web Development"
      instructor="Sarah Jenkins"
      progress={10}
      completedLessons={31}
      totalLessons={48}
      dueDate="Mar 28, 2026"
    />
    <CourseCard
      thumbnail="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
      title="Data Science Fundamentals"
      instructor="David Smith"
      progress={42}
      completedLessons={15}
      totalLessons={36}
      dueDate="Apr 5, 2026"
    />

    </div>
  </div>


    <UpcomingDeadlines />
</div>


    <div className="Dashboard-bottom">

    <h2>Recent Activity</h2>
    </div>

      <RecentActivity></RecentActivity>

      </div>

  );
}

export default Dashboard;