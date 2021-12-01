import React, { Fragment, useEffect, useState } from "react";

function Waitlist() {
  const [reservation, setReservations] = useState([]);

  const getReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplereservation");
      const jsonData = await response.json();

      setReservations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  console.log(reservation);

  return (
    <Fragment>
      <h2 className="text-center mt-5"> Waiting List </h2>{" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Problem</th>
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
          {reservation.map((res) => (
            <tr>
              <td>{res.studentname}</td>
              <td>{res.problem}</td>
              <td>edit</td>
              <td>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Waitlist;
