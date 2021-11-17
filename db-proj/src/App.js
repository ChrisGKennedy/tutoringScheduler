import "./App.css";
import EditEntry from "./components/EditEntry";
import InputEntry from "./components/InputEntry";
import Waitlist from "./components/Waitlist";
import React, { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <InputEntry />
      <Waitlist />
      <EditEntry />
    </Fragment>
  );
}

export default App;
