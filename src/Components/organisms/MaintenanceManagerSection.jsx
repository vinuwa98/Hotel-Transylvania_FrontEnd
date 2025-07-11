import Card from "../molecules/Card";
import CardRow from "../atoms/CardRow";

function MaintenanceManagerSection({ title, label }) {
  const cards = [
    { title: "View All Jobs", label: "View All", path: "/assign" },
    { title: "Assign Workers", label: "Assign", path: "/assign" },
  ];

  const summaryStats = [
    { title: "Total Jobs", count: 10 },
    { title: "Active Jobs", count: 5 },
    { title: "Completed Jobs", count: 5 },
    { title: "Total Workers", count: 10 },
  ];

  return (
    <div>
      <h1 className="text-center text-2xl font-medium">Maintenance Manager</h1>
      <div className="flex justify-center mt-5">
        <div className="flex flex-col justify-between h-full bg-white p-6 rounded-lg shadow m-2 text-left w-80 space-y-2">
          {summaryStats.map((item, index) => (
            <CardRow key={index} title={item.title} count={item.count} />
          ))}
        </div>

        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            label={card.label}
            path={card.path}
          />
        ))}
      </div>
    </div>
  );
}

export default MaintenanceManagerSection;
