import React, { useEffect, useState } from "react";
import NewPatientForm from "./NewPatientForm";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/patients")
      .then((response) => response.json())
      .then(setPatients);
  }, []);

  function addPatient(newPatient) {
    setPatients((prev) => [...prev, newPatient]);
  }

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>{p.name} - DOB: {p.dob}</li>
        ))}
      </ul>
      <h3>Add a New Patient</h3>
      <NewPatientForm onAddPatient={addPatient} />
    </div>
  );
}

export default Patients;
