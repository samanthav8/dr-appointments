import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Patients from "./Patients";
import Doctors from "./Doctors";
import Appointments from "./Appointments";

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/patients" component={Patients} />
          <Route path="/doctors" component={Doctors} />
          <Route path="/appointments" component={Appointments} />
        </Switch>
      </div>
    </>
  );
}


export default App;
