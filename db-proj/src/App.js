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

import SearchReservationWithRoomInput from "./components/SearchReservationWithRoomInput";
import React, { Fragment } from "react";
import EstimatedWait from "./components/EstimatedWait";

function App() {
  return (
    <Fragment>
      <InputEntry />
      <EstimatedWait />
      <Waitlist />
      <InputRoom />
      <Room />
      <SearchReservationWithRoomInput />

      <InputTeacher />
      <TeacherList />
      <UpdateScoreBoard />
      <Scoreboard />
    </Fragment>
  );
}

export default App;
