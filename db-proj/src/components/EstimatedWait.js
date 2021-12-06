import React, {Fragment, useState} from "react";

function EstimatedWait() {
  const [reservations, setReservations2] = useState([]);
  const [roomName, setRoomName] = useState("");

  const getReservationsInFront = async (roomName) => {
    try {
      const response = await fetch(`http://localhost:5000//simplereservationsearch/${roomName}`);
      const jsonData = await response.json();

      setReservations2(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const calculateWaitTime = async () => {
    console.log("WORKING");
    console.log(reservations);

  }

  return (
    <Fragment>
        <form className="d-flex mt-5" onSubmit={calculateWaitTime}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">
              Calculate Wait Time
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="room name"
          />
          <button className="btn btn-success"> Calculate </button>
        </div>
      </form>
    </Fragment>
  );
}

export default EstimatedWait;