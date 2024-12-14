import React, { useEffect, useState } from "react";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/patients")
      .then((r) => r.json())
      .then(setPatients);
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.name} - DOB: {patient.dob}</li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
