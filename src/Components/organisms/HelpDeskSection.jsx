import React, { useEffect, useState } from "react";
import DashboardCard2 from "../molecules/DashboardCard2";
import { getRoomDashboardData } from "../../services/roomService";

const HelpDeskSection = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    getRoomDashboardData().then((roomData) => {
      const formatedData = [
        { title: "Total Rooms", big: roomData.totalRooms, small: "" },
        {
          title: "Available Single Rooms",
          big: roomData.availableSingleRooms,
          small: `Total: ${roomData.totalSingleRooms}`,
        },
        {
          title: "Available Double Rooms",
          big: roomData.availableDoubleRooms,
          small: `Total: ${roomData.totalDoubleRooms}`,
        },
        {
          title: "Available Twin Rooms",
          big: roomData.availableTwinRooms,
          small: `Total: ${roomData.totalTwinRooms}`,
        },
        {
          title: "Available Suite Rooms",
          big: roomData.availableSuiteRooms,
          small: `Total: ${roomData.totalSuiteRooms}`,
        },
        {
          title: "Available Deluxe Rooms",
          big: roomData.availableDeluxeRooms,
          small: `Total: ${roomData.totalDeluxeRooms}`,
        },
        {
          title: "Available Family Rooms",
          big: roomData.availableFamilyRooms,
          small: `Total: ${roomData.totalFamilyRooms}`,
        },
        {
          title: "Rooms Under Maintenance",
          big: roomData.roomsUnderMaintenance,
          small: "",
          color: "text-red-700",
        },
      ];
      setCards(formatedData);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards && cards.length !== 0 ? (
        cards.map((card, idx) => <DashboardCard2 key={idx} card={card} />)
      ) : (
        <>No Data</>
      )}
    </div>
  );
};

export default HelpDeskSection;
