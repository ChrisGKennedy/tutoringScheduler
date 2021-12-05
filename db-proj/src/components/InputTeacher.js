import React, { Fragment, useState } from "react";

function InputTeacher() {
  const [email, setEmail] = useState("");
  const [fullname, setName] = useState("");
  const [room_name, setID] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { fullname, email, room_name };
      const response = await fetch("http://localhost:5000/simpleteacher", {
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
      <h1 className="text-center mt-5"> Create a Teacher </h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">
              Name and email
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            value={fullname}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="text"
            className="form-control"
            value={room_name}
            onChange={(e) => setID(e.target.value)}
            placeholder="room name"
          />
          <button className="btn btn-success"> Add </button>
        </div>
      </form>
    </Fragment>
  );
}

export default InputTeacher;
