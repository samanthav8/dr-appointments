import React, { useState } from "react";
import NewPatientForm from "./NewPatientForm";
import EditAppointmentForm from "./EditAppointmentForm";

function Patients({
  patients,
  appointments,
  onAddPatient,
  onDeleteAppointment,
  onUpdateAppointment,
  doctors,
}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedPatientId, setExpandedPatientId] = useState(null); 
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const handleAddPatientClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const getAppointmentsForPatient = (patientId) => {
    return appointments.filter((appt) => appt.patient_id === patientId);
  };

  const handleToggleAppointments = (patientId) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  const handleEditAppointmentClick = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
  };

  const handleCloseEditForm = () => {
    setEditingAppointmentId(null); 
  };

  return (
    <div>
      <h2>Patients</h2>
      <div>
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div>
              <h3>{patient.name}</h3>
              <button onClick={() => handleToggleAppointments(patient.id)}>
                {expandedPatientId === patient.id ? "▲" : "▼"} Show Appointments
              </button>
            </div>
            {expandedPatientId === patient.id && (
              <div>
                <p>DOB: {patient.dob}</p>

                {getAppointmentsForPatient(patient.id).map((appt) => (
                  <div key={appt.id} className="appointment">
                    <p>
                      Doctor: {appt.doctor.name}, Date: {appt.date}, Time: {appt.time}
                    </p>
                    <button onClick={() => onDeleteAppointment(appt.id)} style={{ color: "red" }}>
                      Delete
                    </button>
                    <button onClick={() => handleEditAppointmentClick(appt.id)}>Edit</button>

                    {editingAppointmentId === appt.id && (
                      <div>
                        <EditAppointmentForm
                          appointment={appt}
                          onUpdateAppointment={onUpdateAppointment}
                          patients={patients}
                          doctors={doctors}
                          onClose={handleCloseEditForm} 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleAddPatientClick}>
        {isFormVisible ? "Cancel" : "Add New Patient"}
      </button>
      {isFormVisible && <NewPatientForm onAddPatient={onAddPatient} />}
    </div>
  );
}

export default Patients;
