import React, { Fragment } from "react";
import EditEntry from "./EditEntry";

const InputEntry = () => {
  return (
    <Fragment>
      {" "}
      <h1 className="text-center mt-5"> CS Dept Queue </h1>
      <form className="d-flex mt-5">
        <input type="text" className="form-control" />
        <button className="btn btn-success"> Add </button>
      </form>
    </Fragment>
  );
};

export default InputEntry;
