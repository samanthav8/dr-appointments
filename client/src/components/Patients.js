import React from "react";
import NewPatientForm from "./NewPatientForm";

function Patients({ patients, appointments, onAddPatient }) {
  return (
    <div>
      <div className="card-container">
        {patients.map((patient) => {
          const patientAppointments = appointments.filter(
            (appt) => appt.patient_id === patient.id
          );

          return (
            <div key={patient.id} className="card">
              <h2>{patient.name}</h2>
              <p>DOB: {patient.dob}</p>
              <ul>
                {patientAppointments.length > 0 ? (
                  patientAppointments.map((appt) => (
                    <li key={appt.id}>
                      Appointment with Dr. {appt.doctor.name} on {appt.date} at {appt.time}
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
