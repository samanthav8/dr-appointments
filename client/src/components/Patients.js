import React, { useState } from "react";
import NewPatientForm from "./NewPatientForm";
import EditAppointmentForm from "./EditAppointmentForm";

function Patients({ patients, appointments, onAddPatient, onDeleteAppointment, onUpdateAppointment, doctors }) {
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
      <div className="card-container">
        {patients.map((patient) => {
          const patientAppointments = appointments.filter(
            (appt) => appt.patient_id === patient.id
          );

          return (
            <div key={patient.id} className="card">
              <h3>{patient.name}</h3>
              <p>DOB: {patient.dob}</p>
              <ul>
                {patientAppointments.length > 0 ? (
                  patientAppointments.map((appt) => (
                    <li key={appt.id}>
                      Appointment with Dr. {appt.doctor.name} on {appt.date} at {appt.time}
                      <div className="appointment-actions">
                        <button onClick={() => handleEditClick(appt.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteAppointment(appt.id)}>
                          Delete
                        </button>
                      </div>

                      {editingId === appt.id && (
                        <EditAppointmentForm
                          appointment={appt}
                          onUpdateAppointment={handleUpdateAppointment}
                          patients={patients}
                          doctors={doctors} 
                        />
                      )}
                    </li>
                  ))
                ) : (
                  <li>No appointments scheduled</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="form-container">
        <div className="form-card">
          <h3>Add a New Patient</h3>
          <NewPatientForm onAddPatient={onAddPatient} />
        </div>
      </div>
    </div>
  );
}

export default Patients;

