import React, { useEffect, useState } from "react";
import NewDoctorForm from "./NewDoctorForm";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/doctors")
      .then((response) => response.json())
      .then(setDoctors);
  }, []);

  function addDoctor(newDoctor) {
    setDoctors((prev) => [...prev, newDoctor]);
  }

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - Specialty: {doctor.specialty}
          </li>
        ))}
      </ul>
      <h3>Add a New Doctor</h3>
      <NewDoctorForm onAddDoctor={addDoctor} />
    </div>
  );
}

export default Doctors;
