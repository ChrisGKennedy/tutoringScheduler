import React, { Fragment, useState, useEffect } from "react";
import "./SearchReservationWithRoomInput.css";

function SearchReservationWithRoomInput() {
  const [theReservations, setSpecificReservations] = useState([]);
  const [allReservation, setAllReservations] = useState([]);
  const [roomid, setRoomid] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { theReservations };
      const response = await fetch(
        `http://localhost:5000/simplereservationsearchbyname/${roomid}`
      );

      const jsonData = await response.json();
      setSpecificReservations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(roomid);

  useEffect(() => {
    setAllReservations();
  }, []);

  return (
    <Fragment>
      <div className="roomTable">
        <h1 className="text-center mt-5">
          {" "}
          Search for the Reservations by Room Name{" "}
        </h1>

        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="">
                Name of Room
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              // value={}
              onChange={(e) => setRoomid(e.target.value)}
              placeholder="name"
            />

            <button className="btn btn-success"> search </button>
          </div>
        </form>

        {/* TABLE */}

        <table class="table table table-dark table-striped mt-5 text-center">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Problem</th>
              <th scope="col">Room ID</th>
              <th scope="col">Reservation Status</th>
            </tr>
          </thead>
          <tbody>
            {theReservations.map((res) => (
              <tr key={res.reservation_id}>
                <td>{res.studentname}</td>
                <td>{res.problem}</td>
                <td>{res.room_id}</td>
                <td>{res.reservation_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default SearchReservationWithRoomInput;
