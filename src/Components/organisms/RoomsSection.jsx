import Table from "./Table/Table";
import DropdownList from "../../Components/atoms/DropdownList";
import {
  getAllRoomData,
  getRoomStatusTypes,
  updateRoomStatus,
} from "../../services/roomService";
import { useEffect, useState } from "react";

function RoomsSection() {
  const [roomData, setRoomData] = useState([]);
  const [roomStatusTypes, setRoomStatusTypes] = useState([]);

  const handleUpdateRoomStatus = async (event, roomNumber) => {
    const newStatus = event.target.value;
    const updatedRooms = await updateRoomStatus(roomNumber, newStatus);

    setRoomData(updatedRooms);
  };

  useEffect(() => {
    getAllRoomData().then((roomData) => {
      setRoomData(roomData);
    });

    getRoomStatusTypes().then((statusTypes) => {
      setRoomStatusTypes(
        statusTypes.map((statusType) => ({
          label: statusType,
          value: statusType,
          disabled: statusType === "Maintenance",
        }))
      );
    });
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Manage Rooms</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {roomData ? (
          <Table
            columns={[
              { header: "Room Number", accessor: "roomNumber" },
              { header: "Room Type", accessor: "roomType" },
              {
                header: "Status",
                renderCell: (room) => {
                  console.log(room);
                  return (
                    <DropdownList
                      name={`status-${room.roomNumber}`}
                      value={room.roomStatus}
                      onChange={(e) =>
                        handleUpdateRoomStatus(e, room.roomNumber)
                      }
                      options={roomStatusTypes}
                      disabled={room.roomStatus === "Maintenance"}
                    />
                  );
                },
              },
            ]}
            data={roomData}
          />
        ) : (
          <>No Data</>
        )}
      </div>
    </div>
  );
}

export default RoomsSection;
