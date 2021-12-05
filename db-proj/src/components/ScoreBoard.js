import React, { Fragment, useState } from "react";
//import "../styles/scoreboard.css";

const Scoreboard = () => {
  return (
    <Fragment>
      <h2 className="text-center mt-5"> Scoreboard </h2>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Today</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Scoreboard;
