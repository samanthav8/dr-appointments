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

  // Fetch patients, doctors, and appointments
  useEffect(() => {
    fetch("http://127.0.0.1:5555/patients")
      .then((response) => response.json())
      .then(setPatients)
      .catch((err) => console.error("Error fetching patients:", err));

    fetch("http://127.0.0.1:5555/doctors")
      .then((response) => response.json())
      .then(setDoctors)
      .catch((err) => console.error("Error fetching doctors:", err));

    fetch("http://127.0.0.1:5555/appointments")
      .then((response) => response.json())
      .then(setAppointments)
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  function onAddPatient(newPatient) {
    setPatients((prev) => [...prev, newPatient]);
  }

  function onAddDoctor(newDoctor) {
    setDoctors((prev) => [...prev, newDoctor]);
  }

  function onAddAppointment(newAppt) {
    setAppointments((prev) => [...prev, newAppt]);
  }

  function onUpdateAppointment(updatedAppt) {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === updatedAppt.id ? updatedAppt : appt))
    );
  }

  function onDeleteAppointment(id) {
    fetch(`http://127.0.0.1:5555/appointments/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete appointment");
        return response.json();
      })
      .then(() => {
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/patients">
            <Patients
              patients={patients}
              appointments={appointments}
              onAddPatient={onAddPatient}
              onAddAppointment={onAddAppointment}
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
              appointments={appointments}
              onAddAppointment={onAddAppointment}
            />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
