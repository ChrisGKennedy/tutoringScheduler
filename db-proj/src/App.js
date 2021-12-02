import "./App.css";
import EditEntry from "./components/EditEntry";
import InputEntry from "./components/InputEntry";
import Waitlist from "./components/Waitlist";
import Room from "./components/Rooms";
import Scoreboard from "./components/ScoreBoard";
import React, { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <InputEntry />
      <Waitlist />
      <Room />
      <Scoreboard />
    </Fragment>
  );
}

export default App;
