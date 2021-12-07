import React, { Fragment, useEffect, useState } from "react";
import EditEntry from "./EditEntry";
import "./Waitlist.css";
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

  const deleteReservation = async (id) => {
    try {
      const deleteReservation = await fetch(
        `http://localhost:5000/simplereservation/${id}`,
        {
          method: "DELETE",
        }
      );

      setReservations(reservation.filter((res) => res.reservation_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log(reservation);
  useEffect(() => {
    getReservations();
  }, []);
  return (
    <Fragment>
      <div className="waitlist">
        <h2 className="text-center mt-5"> Waiting List </h2>{" "}
        <table class="table table-dark table-striped mt-5 text-center">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Problem</th>
              <th scope="col">room id (testing)</th>
              <th scope="col">status</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
            {reservation.map((res) => (
              <tr key={res.reservation_id}>
                <td>{res.studentname}</td>
                <td className="problem">{res.problem}</td>
                <td>{res.room_id}</td>
                <td>{res.reservation_status}</td>
                <td>
                  <EditEntry reservation={res} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteReservation(res.reservation_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default Waitlist;
