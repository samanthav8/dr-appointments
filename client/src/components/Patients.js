import React, {useState} from "react";
import NewPatientForm from "./NewPatientForm";

function Patients({ patients, onAddPatient }) {
  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} - DOB: {patient.dob}
          </li>
        ))}
      </ul>
      <h3>Add a New Patient</h3>
      <NewPatientForm onAddPatient={onAddPatient} />
    </div>
  );
}

export default Patients;
