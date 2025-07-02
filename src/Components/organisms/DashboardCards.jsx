import React, { useEffect, useState } from 'react';
import { getUserCount } from '../../services/countService';

const DashboardCards = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const data = await getUserCount();
        setUserCount(data.totalUsers);
      } catch (err) {
        console.error("Error fetching user count", err);
      }
    };

    fetchUserCount();
  }, []);

  const cards = [
    { title: 'Total Users', value: userCount },
    { title: 'Total Rooms', value: 120 },
    { title: 'Open Requests', value: 34 },
    { title: 'Close Requests', value: 8 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">{card.title}</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
