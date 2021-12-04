import React, { Fragment, useState } from "react";

function EditEntry({ reservation }) {
  const [problem, setProblem] = useState(reservation.problem);
  const [studentname, setName] = useState(reservation.studentname);
  // console.log(reservation);
  // console.log("TESTING BELOW");
  // console.log(studentname);

  const bothFunctions = (sn, p) => {
    setName(sn);
    setProblem(p);
  };

  //Update reservation function
  const updateReservation = async (e) => {
    e.preventDefault();
    try {
      const body = { studentname, problem };
      const sn = studentname;
      const p = problem;

      const response = await fetch(
        `http://localhost:5000/simplereservation/${reservation.reservation_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${reservation.reservation_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${reservation.reservation_id}`}
        onClick={() => {
          bothFunctions(reservation.studentname, reservation.problem);
        }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Reservation</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                  bothFunctions(reservation.studentname, reservation.problem);
                }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={studentname}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateReservation(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  bothFunctions(reservation.studentname, reservation.problem);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditEntry;

//PROBLEMS
// update problem --> works but clears name
// update name --> completely works, but is not in inputbar
// update name and problem --> works for problem but clears name
