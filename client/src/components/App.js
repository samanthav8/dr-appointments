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
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/patients")
      .then((response) => response.json())
      .then(setPatients)
      .catch((error) => console.error("Error fetching patients:", error));

    fetch("http://127.0.0.1:5555/doctors")
      .then((response) => response.json())
      .then(setDoctors)
      .catch((error) => console.error("Error fetching doctors:", error));

    fetch("http://127.0.0.1:5555/appointments")
      .then((response) => response.json())
      .then(setAppointments)
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  function onAddPatient(newPatient) {
    setPatients((prev) => [...prev, newPatient]);
  }

  function onAddDoctor(newDoctor) {
    setDoctors((prev) => [...prev, newDoctor]);
  }

  function onAddAppointment(newAppointment) {
    setAppointments((prev) => [...prev, newAppointment]);
  }

  function onDeleteAppointment(deletedAppointmentId) {
    setAppointments((prev) => prev.filter((appt) => appt.id !== deletedAppointmentId));
  }

  function onUpdateAppointment(updatedAppointment) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt.id === updatedAppointment.id ? updatedAppointment : appt
      )
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
              appointments={appointments}
              doctors={doctors}
              onAddPatient={onAddPatient}
              onDeleteAppointment={onDeleteAppointment}
              onUpdateAppointment={onUpdateAppointment}
            />
          </Route>
          <Route path="/doctors">
            <Doctors
              doctors={doctors}
              appointments={appointments}
              onAddDoctor={onAddDoctor}
            />
          </Route>
          <Route path="/appointments">
            <Appointments onAddAppointment={onAddAppointment} patients={patients} doctors={doctors} />
          </Route>
        </Switch>
      </div>
    </>
  );  
}

export default App