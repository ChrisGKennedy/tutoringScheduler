import React, { Fragment } from "react";

function Waitlist() {
  return (
    <Fragment>
      <h2 className="text-center mt-5"> Waiting List </h2>{" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Waitlist;
