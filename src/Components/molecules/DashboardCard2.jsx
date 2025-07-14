const DashboardCard2 = ({ card }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm text-gray-500">{card.title}</h3>
      <p
        className={["text-2xl font-bold", card.color || "text-blue-700"].join(
          " "
        )}
      >
        {card.big}
      </p>
      {<p className="text-xs text-gray-400">{card.small}</p>}
    </div>
  );
};

export default DashboardCard2;
