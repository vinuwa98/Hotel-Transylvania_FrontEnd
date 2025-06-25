import React from 'react'

const cards = [
  { title: 'Total Rooms', value: 120 },
  { title: 'Active Staff', value: 34 },
  { title: 'Open Requests', value: 8 },
  { title: 'Completed Tasks', value: 112 },
];

const DashboardCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {cards.map((card, idx) => (
      <div key={idx} className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm text-gray-500">{card.title}</h3>
        <p className="text-2xl font-bold text-blue-700 mt-2">{card.value}</p>
      </div>
    ))}
  </div>
);

export default DashboardCards