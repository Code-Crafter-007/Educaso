import StudentDashboard from "./Student/StudentDashboard";
import TutorDashboard from "./Tutor/TutorDashboard";

import { Navigate } from "react-router-dom";

const Dashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // INSTRUCTOR
  if (user.accountType === "Instructor") {
    return <TutorDashboard />;
  }

  // STUDENT
  return <StudentDashboard />;
};

export default Dashboard;