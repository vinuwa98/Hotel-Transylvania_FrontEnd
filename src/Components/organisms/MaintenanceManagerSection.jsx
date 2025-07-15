import { useEffect, useState } from "react";
import Card from "../molecules/Card";
import { fetchDashboardSummary } from "../../services/jobService";

function MaintenanceManagerSection({ title, label }) {
  const [summaryStats, setSummaryStats] = useState([]);

  const actionCards = [
    { title: "View All Jobs", label: "View All", path: "/dashboard/jobs" },
  ];

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchDashboardSummary(token);

        setSummaryStats([
          { title: "Total Jobs", count: data.totalJobs || 0 },
          { title: "Active Jobs", count: data.activeJobs || 0 },
          { title: "Completed Jobs", count: data.completedJobs || 0 },
          { title: "Total Workers", count: data.totalWorkers || 0 },
          { title: "Total Workers", count: data.totalWorkers || 0 },
        ]);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
      }
    };

    loadSummary();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-medium mb-6">
        Maintenance Manager
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {actionCards.map((card, index) => (
          <Card
            key={`action-${index}`}
            title={card.title}
            label={card.label}
            path={card.path}
          />
        ))}
        {summaryStats.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            label={`${item.count}`}
            path={null}
          />
        ))}
      </div>
    </div>
  );
}

export default MaintenanceManagerSection;
