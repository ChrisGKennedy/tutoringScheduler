import React, { Fragment, useEffect, useState } from "react";
import RoomWaitList from "./RoomWaitlist";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [newRooms, setNewRooms] = useState([]);

  const getRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/simpleroom");
      const jsonData = await response.json();

      setRooms(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplereservation");
      const jsonData = await response.json();

      setReservations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //CREATING A FUNCTION TO RETURN ALL
  //RESERVATION IDS ASSOCIATED WITH A ROOM ID/NAME
  var roomReservations;

  const viewARoomList = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/simplereservationsearch/${id}`,
        {
          method: "GET",
        }
      );

      // roomReservations = getRooms;
      const jsonData = await response.json();
      setNewRooms(jsonData);
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

  useEffect(() => {
    getRooms();
    viewARoomList();
    getReservations();
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
            <td>
              <RoomWaitList reservations={roomReservations} />
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => viewARoomList(room.room_id)}
              >
                view
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
