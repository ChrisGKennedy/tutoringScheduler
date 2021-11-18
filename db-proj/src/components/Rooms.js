import React, { Fragment } from "react";

const Rooms = () => {
  return (
    <Fragment>
      <h2 className="text-center mt-5"> Rooms </h2>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Waiting</th>
            <th>View Room</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>5</td>
            <td>
              <button className="btn btn-primary">Room</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Rooms;
