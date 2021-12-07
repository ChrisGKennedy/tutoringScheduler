import React, { Fragment, useState, useEffect } from "react";
//import "../styles/scoreboard.css";
import "./Scoreboard.css";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  const getScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplescoresandteachers");
      const jsonData = await response.json();

      setScores(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <Fragment>
      <div className="scoreboard">
        <h2 className="text-center mt-5"> Scoreboard </h2>
        <table class="table table table-dark table-striped mt-5 text-center">
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>number of problems done</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((res) => (
              <tr key={res.scoreboard_id}>
                <td>{res.fullname}</td>
                <td>{res.num_problems_done}</td>
                <td>{res.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

// CREATE TABLE scoreboard(
//   scoreboard_id SERIAL PRIMARY KEY,
//   teacher_id int,
//   num_problems_done int,
//   score float,
//   FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
// );

export default Scoreboard;
