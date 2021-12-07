import React, { Fragment, useState } from "react";

function InputRoom() {
  const [room_name, setName] = useState("");
  const [room_id, setId] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { room_name, room_id };
      const response = await fetch("http://localhost:5000/simpleroom", {
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
      <h1 className="text-center mt-5"> Create a Room </h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">
              Room Name and Number
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            value={room_name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />

          <button className="btn btn-success"> Add </button>
        </div>
      </form>
    </Fragment>
  );
}

export default InputRoom;
