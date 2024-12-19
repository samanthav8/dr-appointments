import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Patients from "./Patients";
import Doctors from "./Doctors";
import Appointments from "./Appointments";

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/patients")
      .then((response) => response.json())
      .then(setPatients)
      .catch((error) => console.error("Error fetching patients:", error));

    fetch("http://127.0.0.1:5555/doctors")
      .then((response) => response.json())
      .then(setDoctors)
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  function onAddPatient(newPatient) {
    setPatients((prev) => [...prev, newPatient]);
  }

  function onAddDoctor(newDoctor) {
    setDoctors((prev) => [...prev, newDoctor]);
  }

  function onAddAppointment(newAppointment) {
    setPatients((prevPatients) =>
      prevPatients.map((patient) => {
        if (patient.id === newAppointment.patient_id) {
          return {
            ...patient,
            appointments: patient.appointments
              ? [...patient.appointments, newAppointment]
              : [newAppointment],
          };
        }
        return patient;
      })
    );

    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) => {
        if (doctor.id === newAppointment.doctor_id) {
          return {
            ...doctor,
            appointments: doctor.appointments
              ? [...doctor.appointments, newAppointment]
              : [newAppointment],
          };
        }
        return doctor;
      })
    );
  }

  function onUpdateAppointment(updatedAppointment) {
    setPatients((prevPatients) =>
      prevPatients.map((patient) => {
        if (patient.id === updatedAppointment.patient_id && patient.appointments) {
          const updatedAppointments = patient.appointments.map((appt) =>
            appt.id === updatedAppointment.id ? updatedAppointment : appt
          );
          return { ...patient, appointments: updatedAppointments };
        }
        return patient;
      })
    );

    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) => {
        if (doctor.id === updatedAppointment.doctor_id && doctor.appointments) {
          const updatedAppointments = doctor.appointments.map((appt) =>
            appt.id === updatedAppointment.id ? updatedAppointment : appt
          );
          return { ...doctor, appointments: updatedAppointments };
        }
        return doctor;
      })
    );
  }

  function onDeleteAppointment(deletedAppointmentId) {
    setPatients((prevPatients) =>
      prevPatients.map((patient) => {
        if (patient.appointments) {
          const updatedAppointments = patient.appointments.filter(
            (appt) => appt.id !== deletedAppointmentId
          );
          return { ...patient, appointments: updatedAppointments };
        }
        return patient;
      })
    );

    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) => {
        if (doctor.appointments) {
          const updatedAppointments = doctor.appointments.filter(
            (appt) => appt.id !== deletedAppointmentId
          );
          return { ...doctor, appointments: updatedAppointments };
        }
        return doctor;
      })
    );
  }

  return (
    <>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/patients">
            <Patients
              patients={patients}
              doctors={doctors}
              onAddPatient={onAddPatient}
              onDeleteAppointment={onDeleteAppointment}
              onUpdateAppointment={onUpdateAppointment}
            />
          </Route>
          <Route path="/doctors">
            <Doctors doctors={doctors} onAddDoctor={onAddDoctor} />
          </Route>
          <Route path="/appointments">
            <Appointments
              patients={patients}
              doctors={doctors}
              onAddAppointment={onAddAppointment}
            />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
