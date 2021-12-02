import React, { Fragment, useState } from "react";

const InputEntry = () => {
  const [problem, setProblem] = useState("");
  const [studentName, setName] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { problem, studentName };
      const response = await fetch("http://localhost:5000/simplereservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {""}
      <h1 className="text-center mt-5"> CS Dept Queue </h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">
              Name and problem
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
          <button className="btn btn-success"> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default InputEntry;
