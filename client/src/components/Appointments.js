import React, { useEffect, useState } from "react";
import NewAppointmentForm from "./NewAppointmentForm";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/appointments")
      .then((r) => r.json())
      .then(setAppointments);
  }, []);

  function addAppointment(newAppt) {
    setAppointments((prev) => [...prev, newAppt]);
  }

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            Patient: {appt.patient.name}, Doctor: {appt.doctor.name}, Date: {appt.date}, Time: {appt.time}
          </li>
        ))}
      </ul>
      
      <h3>Add a New Appointment</h3>
      <NewAppointmentForm onAddAppointment={addAppointment} />
    </div>
  );
}

export default Appointments;
