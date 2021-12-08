import React, { Fragment, useState } from "react";

function EditTeacher({ teacher }) {
  const [room_id, setRoom] = useState(teacher.room_id);
  const [email, setEmail] = useState(teacher.email);
  const [fullname, setFullname] = useState(teacher.fullname);

  const allFunctions = (rid, e, n) => {
    setFullname(n);
    setEmail(e);
    setRoom(rid);
  };

  //Update reservation function
  const updateTeacher = async (e) => {
    e.preventDefault();
    try {
      const body = { fullname, email, room_id };

      const response = await fetch(
        `http://localhost:5000/simpleteacherupdate/${teacher.teacher_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(JSON.stringify(body));

      //   window.location = "/";
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
        data-target={`#id${teacher.teacher_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${teacher.teacher_id}`}
        onClick={() => {
          allFunctions(teacher.room_id, teacher.email, teacher.fullname);
        }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Teacher</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                  allFunctions(
                    teacher.room_id,
                    teacher.email,
                    teacher.fullname
                  );
                }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={room_id}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateTeacher(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  allFunctions(
                    teacher.room_id,
                    teacher.email,
                    teacher.fullname
                  );
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

export default EditTeacher;
