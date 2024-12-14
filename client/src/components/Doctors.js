import React, { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/doctors")
      .then((r) => r.json())
      .then(setDoctors);
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.name} - Specialty: {doctor.specialty}</li>
        ))}
      </ul>
    </div>
  );
}

export default Doctors;
