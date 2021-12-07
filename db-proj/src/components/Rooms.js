import React, { Fragment, useEffect, useState } from "react";
import "./Rooms.css";

import RoomsAndWaitlist from "./RoomsAndWaitlist";

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
    getReservations();
  }, []);

  return (
    <Fragment>
      <div className="rooms">
        <h2 className="text-center mt-5"> Rooms </h2>
        <table class="table table table-dark table-striped mt-5 text-center">
          <thead>
            <tr>
              <th>Room ID (Testing)</th>
              <th>Room Name</th>

              <th>Delete Room</th>
            </tr>
          </thead>
          {rooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.room_id}</td>
              <td>{room.room_name}</td>

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
      </div>
    </Fragment>
  );
};

export default Rooms;
