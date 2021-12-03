import React, { Fragment, useEffect, useState } from "react";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/simpleroom");
      const jsonData = await response.json();

      setRooms(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteRooms = async (id) => {
    try {
      const deleteRooms = await fetch(
        `http://localhost:5000/simpleroom/${id}`,
        {
          method: "DELETE",
        }
      );

      setRooms(rooms.filter((room) => room.room_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //CREATING A FUNCTION TO RETURN ALL
  //RESERVATION IDS ASSOCIATED WITH A ROOM ID/NAME
  const getARoom = async (id) => {
    try {
      const deleteRooms = await fetch(
        `http://localhost:5000/simpleroom/${id}`,
        {
          method: "GET",
        }
      );

      setRooms(rooms.filter((room) => room.room_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center mt-5"> Rooms </h2>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Room ID (Testing)</th>
            <th>Room Name</th>
            <th>Room Number</th>
            <th>View Room</th>
            <th>Delete Room</th>
          </tr>
        </thead>
        {rooms.map((room) => (
          <tr key={room.room_id}>
            <td>{room.room_id}</td>
            <td>{room.room_name}</td>
            <td>{room.room_number}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => deleteRooms(room.room_id)}
              >
                DELETE(view)
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteRooms(room.room_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </Fragment>
  );
};

export default Rooms;
