import React, { Fragment, useState, useEffect } from "react";

function UpdateScoreBoard() {
  const [reservations, setReservations1] = useState([]);
  const [scores, setScores] = useState([]);

  const getReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplereservation");
      const jsonData = await response.json();

      setReservations1(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplescores");
      const jsonData = await response.json();

      setScores(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getReservations();
    getScores();
  }, []);

  const makeScoreboard = (data) => {
    var dataCopy = data.slice();
    var scoreBoard = new Array();
    var indexesToDelete = new Array();
  
    while (dataCopy.length > 0) {
  
      while(dataCopy[0].room_id == null) {
        dataCopy.shift();
      }
  
      var currentRoom_id = dataCopy[0].room_id;
      var currentScore = 0;
      var num_problems_done = 0;
  
      //gets total score for the current room_id and pushes the indexes to a delete array
      for(let index = 0; index < dataCopy.length; index++) {
        if(dataCopy[index].room_id == currentRoom_id) {
          currentScore += 1 + dataCopy[index].problem.length/(255/5);
          indexesToDelete.push(index);
        }
      }
  
      num_problems_done = indexesToDelete.length;
  
      //deletes all used data from array
      var i = 0;
      while(indexesToDelete.length > 0) {
        dataCopy.splice(indexesToDelete[0] - i, 1);
        i++;
        indexesToDelete.shift();
      }
  
      //adds current values to scoreboard array
      scoreBoard.push({
        "room_id": currentRoom_id,
        "totalScore": currentScore,
        "num_problems_done": num_problems_done
      });
    }
  
    
  
    return scoreBoard;
  };
  //console.log will print whatever in

 //Update score function
  const updateScore = async (teacher_id, num_problems_done, score) => {
    try {
      const body = { teacher_id, num_problems_done, score};

      const response = await fetch(
        "http://localhost:5000/simpleupdatescore",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }; 
  
  //Update score function
  const createScore = async (teacher_id, num_problems_done, score) => {
    try {
      const body = { teacher_id, num_problems_done, score};

      const response = await fetch(
        "http://localhost:5000/simplecreatescore",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }; 

  const calculateNewScores = async () => {
    console.log(reservations);
    var results = makeScoreboard(reservations)
    console.log(scores)
    for (let x = 0; x < results.length; x++) {
      var id = -1;
      var scoreInd = -1;
      for (let y = 0; y < scores.length; y++){
        if (results[x].room_id == scores[y].room_id){
          id = scores[y].teacher_id;
          scoreInd = y;
        }
      }
      console.log(id);
      if (id >= 0){
        var sumProblemsDone = results[x].num_problems_done + scores[scoreInd].num_problems_done;
        var sumScore = results[x].totalScore + scores[scoreInd].score;
        updateScore(id, sumProblemsDone, sumScore);
        console.log("working try");
      } else {
        try{
          const response = await fetch(
            `http://localhost:5000/teacheridsearchroom_id/${results[x].room_id}`
          );
          var teacherID = await response.json();
          console.log(teacherID);
  
          var sumProblemsDone = results[x].num_problems_done;
          var sumScore = results[x].totalScore;
          createScore(teacherID[0].teacher_id, sumProblemsDone, sumScore);
          console.log(teacherID[0].teacher_id);
          console.log("working catch");
        } catch (err) {
          console.log(err);
        }
      }
    }


    //DELETE ALL RESERVATIONS AFTER CALCULATIONS
    try {
      const response = await fetch(
        "http://localhost:5000/simpledeleteall",
        {
          method: "DELETE",
        }
      );
    } catch (err){
      console.log(err);
    }
    window.location = "/";
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