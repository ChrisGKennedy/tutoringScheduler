import React, { Fragment, useEffect, useState } from "react";
import EditTeacher from "./EditTeacher";
import "./TeacherList.css";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [roomNames, setNames] = useState([]);

  const getTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/simpleteacher");
      const jsonData = await response.json();

      setTeachers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //not in use
  const getNames = async () => {
    try {
      const response = await fetch(`http://localhost:5000/roomnames/${10}`);
      const jsonData = await response.json();

      setNames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTeachers = async (id) => {
    try {
      const deleteReservation = await fetch(
        `http://localhost:5000/simpleteacher/${id}`,
        {
          method: "DELETE",
        }
      );

      setTeachers(teachers.filter((teacher) => teacher.teacher_id !== id));

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <Fragment>
      <div className="teacherList">
        <h2 className="text-center mt-5"> Teacher List </h2>{" "}
        <table class="table table table-dark table-striped mt-5 text-center">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Room ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
            {teachers.map((teacher) => (
              <tr key={teacher.teacher_id}>
                <td>{teacher.teacher_id}</td>
                <td>{teacher.fullname}</td>
                <td>{teacher.email}</td>
                <td>{teacher.room_id} </td>
                <td>
                  <EditTeacher teacher={teacher} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTeachers(teacher.teacher_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default TeacherList;
