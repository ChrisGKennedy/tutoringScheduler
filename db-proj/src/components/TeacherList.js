import React, { Fragment, useEffect, useState } from "react";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const getTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/simpleteacher");
      const jsonData = await response.json();

      setTeachers(jsonData);
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
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center mt-5"> Teacher List </h2>{" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Problem</th>
            <th>Room</th>
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
              <td>{teacher.fullname}</td>
              <td>{teacher.email}</td>
              <td>{teacher.room_id} </td>
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
    </Fragment>
  );
}

export default TeacherList;
