import React from "react";
import NewDoctorForm from "./NewDoctorForm";

function Doctors({ doctors, onAddDoctor }) {
  return (
    <div>
      <div className="card-container">
        {doctors.map(({ id, name, specialty, appointments = [] }) => {
          const doctorAppointments = appointments.filter(
            (appt) => new Date(appt.date) > new Date()
          );

          return (
            <div key={id} className="card">
              <h2>{name}</h2>
              <p>Specialty: {specialty}</p>
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
            </div>
          );
        })}
      </div>
      <div className="form-container">
        <div className="form-card">
          <h3>Add a New Doctor</h3>
          <NewDoctorForm onAddDoctor={onAddDoctor} />
        </div>
      </div>
    </div>
  );
}

export default Doctors;
