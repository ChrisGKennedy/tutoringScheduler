import React, { Fragment } from "react";
import Particles from "react-particles-js";
import ParticleConfig from "./config/particle-config";
import "./ParticleBackground.css";

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
import EstimatedWait from "./components/EstimatedWait";

export default function ParticleBackground() {
  return <Particles className="pg" params={ParticleConfig}></Particles>;
}
