import React, { Fragment, useState, useEffect } from "react";

function UpdateScoreBoard() {
  const [reservations, setReservations1] = useState([]);

  const getReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplereservation");
      const jsonData = await response.json();

      setReservations1(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  const calculateNewScores = () => {
    console.log("WORKING");
    console.log(reservations);

  }

  return (
    <Fragment>
        <h2 className="text-center mt-5"> Update Scoreboard </h2>
        <div className="text-center mt-5">
          <button type="button" class="btn btn-warning"
          onClick={() => {
            calculateNewScores();
          }}> 
            Update (WARNING: Will delete all reservations) 
          </button>
        </div>
    </Fragment>
  );
}

export default UpdateScoreBoard;