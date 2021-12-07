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

  const makeScoreboard = (data) => {
    var dataCopy = data.slice();
    var scoreBoard = new Array();
    var indexesToDelete = new Array();

    while (dataCopy.length > 0) {
      while (dataCopy[0].room_id == null) {
        dataCopy.shift();
      }

      var currentRoom_id = dataCopy[0].room_id;
      var currentScore = 0;
      var num_problems_done = 0;

      //gets total score for the current room_id and pushes the indexes to a delete array
      for (let index = 0; index < dataCopy.length; index++) {
        if (dataCopy[index].room_id == currentRoom_id) {
          currentScore += 1 + dataCopy[index].problem.length / (255 / 5);
          indexesToDelete.push(index);
        }
      }

      num_problems_done = indexesToDelete.length;

      //deletes all used data from array
      var i = 0;
      while (indexesToDelete.length > 0) {
        dataCopy.splice(indexesToDelete[0] - i, 1);
        i++;
        indexesToDelete.shift();
      }

      //adds current values to scoreboard array
      scoreBoard.push({
        room_id: currentRoom_id,
        totalScore: currentScore,
        num_problems_done: num_problems_done,
      });
    }

    return scoreBoard;
  };
  //console.log will print whatever in

  const calculateNewScores = () => {
    console.log("WORKING");
    console.log(reservations);
    console.log(makeScoreboard(reservations));
  };

  return (
    <Fragment>
      <h2 className="text-center mt-5"> Update Scoreboard </h2>
      <div className="text-center mt-5">
        <button
          type="button"
          class="btn btn-warning"
          onClick={() => {
            calculateNewScores();
          }}
        >
          Update (WARNING: Will delete all reservations)
        </button>
      </div>
    </Fragment>
  );
}

export default UpdateScoreBoard;
