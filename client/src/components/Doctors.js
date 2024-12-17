import React, { useState } from "react";
import NewDoctorForm from "./NewDoctorForm";

function Doctors({ doctors, appointments, onAddDoctor }) {
  const [expandDoctor, setExpandDoctor] = useState(null);

  const getAppointmentsForDoctor = (doctorId) => {
    return appointments.filter((appt) => appt.doctor_id === doctorId);
  };

  const handleToggleAppointments = (doctorId) => {

    setExpandDoctor(expandDoctor === doctorId ? null : doctorId);
  };

  return (
    <div>
      <h2>Doctors</h2>
      <div>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div>
              <h3>{doctor.name} - Specialty: {doctor.specialty}</h3>
              <button onClick={() => handleToggleAppointments(doctor.id)}>
                {expandDoctor === doctor.id ? "▲" : "▼"} Show Appointments
              </button>
            </div>

            {/* Display appointments for this doctor */}
            {expandDoctor === doctor.id && (
              <div>
                {getAppointmentsForDoctor(doctor.id).map((appt) => (
                  <div key={appt.id} className="appointment">
                    <p>
                      Patient: {appt.patient.name} on {appt.date} at {appt.time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3>Add a New Doctor</h3>
      <NewDoctorForm onAddDoctor={onAddDoctor} />
    </div>
  );
}

export default Doctors;
