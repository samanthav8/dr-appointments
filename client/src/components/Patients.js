import React, { useState } from "react";
import NewPatientForm from "./NewPatientForm";
import EditAppointmentForm from "./EditAppointmentForm";

function Patients({ patients, appointments, onAddPatient, onDeleteAppointment, onUpdateAppointment }) {
  const [editingId, setEditingId] = useState(null);

  const handleDeleteAppointment = (appointmentId) => {
    fetch(`http://127.0.0.1:5555/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete appointment");
        onDeleteAppointment(appointmentId);
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  const handleEditClick = (appointmentId) => {
    setEditingId((prevId) => (prevId === appointmentId ? null : appointmentId));
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    onUpdateAppointment(updatedAppointment);
    setEditingId(null);
  };

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => {
          const patientAppointments = appointments.filter(
            (appt) => appt.patient_id === patient.id
          );

          return (
            <li key={patient.id}>
              {patient.name} - DOB: {patient.dob}
              <ul>
                {patientAppointments.length > 0 ? (
                  patientAppointments.map((appt) => (
                    <li key={appt.id}>
                      Appointment with Dr. {appt.doctor.name} on {appt.date} at {appt.time}
                      <button onClick={() => handleEditClick(appt.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteAppointment(appt.id)}>
                        Delete
                      </button>

                      {editingId === appt.id && (
                        <EditAppointmentForm
                          appointment={appt}
                          onUpdateAppointment={handleUpdateAppointment} 
                          patients={patients}
                          doctors={appointments} 
                        />
                      )}
                    </li>
                  ))
                ) : (
                  <li>No appointments scheduled</li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
      <h3>Add a New Patient</h3>
      <NewPatientForm onAddPatient={onAddPatient} />
    </div>
  );
}

export default Patients;
