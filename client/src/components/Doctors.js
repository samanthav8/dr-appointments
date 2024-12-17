import React, {useState} from "react";
import NewDoctorForm from "./NewDoctorForm";

function Doctors({ doctors, onAddDoctor }) {

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
      <NewDoctorForm onAddDoctor={onAddDoctor} />
    </div>
  );
}

export default Doctors;