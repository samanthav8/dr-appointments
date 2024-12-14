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
      .then((r) => r.json())
      .then(setPatients)
      .catch((err) => console.error("Error fetching patients:", err));

    fetch("http://127.0.0.1:5555/doctors")
      .then((r) => r.json())
      .then(setDoctors)
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  function onAddPatient(newPatient) {
    setPatients((prev) => [...prev, newPatient]);
  }

  function onAddDoctor(newDoctor) {
    setDoctors((prev) => [...prev, newDoctor]);
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
            <Patients patients={patients} onAddPatient={onAddPatient} />
          </Route>
          <Route path="/doctors">
            <Doctors doctors={doctors} onAddDoctor={onAddDoctor} />
          </Route>
          <Route path="/appointments">
            <Appointments patients={patients} doctors={doctors} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
