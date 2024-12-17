import React, { useState } from "react";
import NewAppointmentForm from "./NewAppointmentForm";

function Appointments({ patients, doctors }) {
  const [appointments, setAppointments] = useState([]);

  function addAppointment(newAppt) {
    setAppointments((prev) => [...prev, newAppt]);
  }

  return (
    <div>
      <h3>Create a New Appointment</h3>
      <NewAppointmentForm onAddAppointment={addAppointment} patients={patients} doctors={doctors} />
    </div>
  );
}

export default Appointments;
