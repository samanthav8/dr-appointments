import React, { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/appointments")
      .then((r) => r.json())
      .then((data) => setAppointments(data));
  }, []);

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
    </div>
  );
}

export default Appointments;
