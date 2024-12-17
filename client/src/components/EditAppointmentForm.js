import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function generateTimes() {
  const times = [];
  let hour = 8;
  let minute = 0;
  while (hour < 17 || (hour === 17 && minute === 0)) {
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    times.push(`${hh}:${mm}`);
    minute += 15;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return times;
}
const timeOptions = generateTimes();

const appointmentSchema = Yup.object().shape({
  patient_id: Yup.number().required("Patient is required"),
  doctor_id: Yup.number().required("Doctor is required"),
  date: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
    .required("Date is required"),
  time: Yup.string().required("Time is required"),
});

function EditAppointmentForm({ appointment, onUpdateAppointment, patients, doctors }) {
  return (
    <Formik
      initialValues={{
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id,
        date: appointment.date,
        time: appointment.time,
      }}
      validationSchema={appointmentSchema}
      onSubmit={(values, { setSubmitting }) => {
        fetch(`http://127.0.0.1:5555/appointments/${appointment.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((updatedAppt) => {
            onUpdateAppointment(updatedAppt);
            setSubmitting(false);
          })
          .catch((error) => {
            console.error("Error updating appointment:", error);
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h4>Edit Appointment</h4>
          <div>
            <label>Patient: </label>
            <Field as="select" name="patient_id">
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="patient_id" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Doctor: </label>
            <Field as="select" name="doctor_id">
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </Field>
            <ErrorMessage name="doctor_id" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Date (YYYY-MM-DD): </label>
            <Field name="date" />
            <ErrorMessage name="date" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Time: </label>
            <Field as="select" name="time">
              <option value="">Select a time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage name="time" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit" disabled={isSubmitting}>Update Appointment</button>
        </Form>
      )}
    </Formik>
  );
}

export default EditAppointmentForm;