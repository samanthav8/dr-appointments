import React from "react";
import NewAppointmentForm from "./NewAppointmentForm";

function Appointments({ onAddAppointment, patients, doctors }) {
  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Create a New Appointment</h2>
        <NewAppointmentForm onAddAppointment={onAddAppointment} patients={patients} doctors={doctors} />
      </div>
    </div>
  );
}

export default Appointments;
