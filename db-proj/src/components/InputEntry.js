import React, { Fragment, useState } from "react";
import "./InputEntry.css";

const InputEntry = () => {
  const [problem, setProblem] = useState("");
  const [studentName, setName] = useState("");
  const [room_name, setRoom] = useState("");
  var out;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { room_name, problem, studentName };
      const response = await fetch(
        "http://localhost:5000/simplereservationadvanced",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      out = body;

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log("TESTING");
  console.log(out);
  return (
    <Fragment>
      {""}
      <h1 className="title"> CS Dept Queue </h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">
              Input a reservation
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            value={studentName}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
          <input
            type="text"
            className="form-control"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="problem"
          />
          <input
            type="text"
            className="form-control"
            value={room_name}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="room name"
          />
          <button className="btn btn-success"> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default InputEntry;
