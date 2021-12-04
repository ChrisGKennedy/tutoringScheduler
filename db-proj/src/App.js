import "./App.css";
import EditEntry from "./components/EditEntry";
import InputEntry from "./components/InputEntry";
import Waitlist from "./components/Waitlist";
import Room from "./components/Rooms";
import Scoreboard from "./components/ScoreBoard";
import InputRoom from "./components/InputRoom";
import InputTeacher from "./components/InputTeacher";
import TeacherList from "./components/TeacherList";
import RoomWaitlist from "./components/RoomWaitlist";
import React, { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <InputEntry />
      <Waitlist />
      <InputRoom />
      <Room />

      <InputTeacher />
      <TeacherList />
      <Scoreboard />
    </Fragment>
  );
}

export default App;
