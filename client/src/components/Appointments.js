import React, { useEffect, useState } from "react";
import NewAppointmentForm from "./NewAppointmentForm";
import EditAppointmentForm from "./EditAppointmentForm";

function Appointments({ patients, doctors }) {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/appointments")
      .then((response) => response.json())
      .then(setAppointments);
  }, []);

  function addAppointment(newAppt) {
    setAppointments((prev) => [...prev, newAppt]);
  }

  function updateAppointment(updatedAppt) {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === updatedAppt.id ? updatedAppt : appt))
    );
    setEditingId(null);
  }

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            Patient: {appt.patient.name}, Doctor: {appt.doctor.name}, Date: {appt.date}, Time: {appt.time}{" "}
            <button onClick={() => setEditingId(appt.id)}>Edit</button>
            {editingId === appt.id && (
              <EditAppointmentForm
                appointment={appt}
                onUpdateAppointment={updateAppointment}
                patients={patients}
                doctors={doctors}
              />
            )}
          </li>
        ))}
      </ul>

      <h3>Add a New Appointment</h3>
      <NewAppointmentForm onAddAppointment={addAppointment} patients={patients} doctors={doctors} />
    </div>
  );
}

export default Appointments;
