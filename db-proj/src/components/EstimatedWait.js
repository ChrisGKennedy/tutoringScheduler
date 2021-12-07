import React, { Fragment, useState } from "react";

function EstimatedWait() {
  //const [reservations, setReservations2] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [waitTime, setWaitTime] = useState("");

  // const getReservationsInFront = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/simplereservationsearchname/${roomName}`
  //     );
  //     const jsonData = await response.json();

  //     console.log(jsonData);
      
  //     setReservations2(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const messageToMinutes = (msg) => {
    return (msg.length / 50 + 5).toFixed();
  };

  const calculateWaitTime = async () => {
    //doesn't work on first click. Is most likely not waiting for result before reservation
    //to compute before calculating wait time
    //getReservationsInFront();
    var reservations;
    try {
      const response = await fetch(
        `http://localhost:5000/simplereservationsearchname/${roomName}`
      );
      reservations = await response.json();

      //console.log(jsonData);
      
      //setReservations2(jsonData);
    } catch (err) {
      console.error(err.message);
    }

    var time = 0;
    for (let i = 0; i < reservations.length; i++){
      time += messageToMinutes((reservations[i].problem).toString()) * (reservations[i].score/reservations[i].num_problems_done);
    }
    console.log(reservations);
    time = (time + .4999 ).toFixed();

    setWaitTime("Estimated Wait Time: " + time.toString() + " minutes");
    console.log(reservations);

  };

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
          <button
            type="button"
            className="btn btn-success"
            onClick={calculateWaitTime}
          >
            Calculate
          </button>
        </div>
      </form>
      <h5>{waitTime}</h5>
    </Fragment>
  );
}

export default EstimatedWait;
