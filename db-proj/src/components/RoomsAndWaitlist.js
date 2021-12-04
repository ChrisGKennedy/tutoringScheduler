import React, { useState, useEffect, Fragment } from "react";

function RoomsAndWaitlist(theRoom) {
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([]);

  //Getting all reservations
  const getAllReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/simplereservation");
      const jsonData = await response.json();

      setAllReservations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(allReservations);
  console.log(theRoom);

  useEffect(() => {
    setAllReservations();
  }, []);

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${theRoom.reservation_id}`}
      >
        search
      </button>
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RoomsAndWaitlist;
