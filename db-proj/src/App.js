import "./App.css";
import EditEntry from "./components/EditEntry";
import InputEntry from "./components/InputEntry";
import Waitlist from "./components/Waitlist";
import Room from "./components/Rooms";
import Scoreboard from "./components/ScoreBoard";
import InputRoom from "./components/InputRoom";
import InputTeacher from "./components/InputTeacher";
import TeacherList from "./components/TeacherList";
import UpdateScoreBoard from "./components/UpdateScoreBoard";
import Divide from "./components/Divide";
import SearchReservationWithRoomInput from "./components/SearchReservationWithRoomInput";
import React, { Fragment } from "react";
import EstimatedWait from "./components/EstimatedWait";

import ParticleBackground from "./ParticleBackground";

function App() {
  return (
    <Fragment>
      <div className="components">
        <InputEntry />
        <EstimatedWait />
        <Waitlist />
        <Divide />
        <InputRoom />
        <Room />
        <Divide />
        <SearchReservationWithRoomInput />
        <Divide />
        <InputTeacher />
        <TeacherList />
        <UpdateScoreBoard />
        <Scoreboard />
      </div>
    </Fragment>
  );
}

export default App;
