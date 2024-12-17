import React from "react";
import NewDoctorForm from "./NewDoctorForm";

function Doctors({ doctors, appointments, onAddDoctor }) {
  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => {
          const doctorAppointments = appointments.filter(
            (appt) => appt.doctor_id === doctor.id && new Date(appt.date) > new Date()
          );

          return (
            <li key={doctor.id}>
              {doctor.name} - Specialty: {doctor.specialty}
              <ul>
                {doctorAppointments.length > 0 ? (
                  doctorAppointments.map((appt) => (
                    <li key={appt.id}>
                      {appt.patient.name} on {appt.date} at {appt.time}
                    </li>
                  ))
                ) : (
                  <li>No upcoming appointments</li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
      <h3>Add a New Doctor</h3>
      <NewDoctorForm onAddDoctor={onAddDoctor} />
    </div>
  );
}

export default Doctors;
