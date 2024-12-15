import React, { useState } from "react";
import NewPatientForm from "./NewPatientForm";

function Patients({ patients, onAddPatient }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedPatient, setExpandedPatient] = useState(null);

  const handleAddPatientClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleToggleDOB = (patientId) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };

  return (
    <div className="patients-container">
      <div className="patient-list">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div className="patient-header">
              <h3>{patient.name}</h3>
              <button
                className="toggle-dob-btn"
                onClick={() => handleToggleDOB(patient.id)}
              >
                {expandedPatient === patient.id ? "▲" : "▼"}
              </button>
            </div>
            {expandedPatient === patient.id && (
              <p className="patient-dob">DOB: {patient.dob}</p>
            )}
          </div>
        ))}
      </div>
      <button className="btn btn-primary add-patient-btn" onClick={handleAddPatientClick}>
        {isFormVisible ? "Cancel" : "Add New Patient"}
      </button>
      {isFormVisible && <NewPatientForm onAddPatient={onAddPatient} />}
    </div>
  );
}

export default Patients;
