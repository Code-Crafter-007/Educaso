import { DocumentArrowDownIcon, QuestionMarkCircleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import DeadlineCard from "./DeadlineCard";
import "./UpcomingDeadlines.css";

function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      icon: <DocumentArrowDownIcon width={20} height={20} />,
      title: "Final Project Submission",
      courseName: "UI/UX Design",
      dueDate: "Mar 25",
      color: "#dbeafe",
    },
    {
      id: 2,
      icon: <QuestionMarkCircleIcon width={20} height={20} />,
      title: "Quiz: JavaScript ES6",
      courseName: "Fullstack Web Dev",
      dueDate: "Mar 26",
      color: "#ede9fe",
    },
    {
      id: 3,
      icon: <ClipboardDocumentListIcon width={20} height={20} />,
      title: "Assignment: Data Analysis",
      courseName: "Data Science",
      dueDate: "Mar 30",
      color: "#ffedd5",
    },
  ];

  return (
    <div className="upcoming-deadlines">
      <h2 className="deadlines-title">Upcoming Deadlines</h2>
      <div className="deadlines-list">
        {deadlines.map((d) => (
          <DeadlineCard key={d.id} {...d} />
        ))}
      </div>
      <button className="view-calendar-btn">View Calendar</button>
    </div>
  );
}

export default UpcomingDeadlines;