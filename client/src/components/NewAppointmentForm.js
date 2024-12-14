import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const appointmentSchema = Yup.object().shape({
  patient_id: Yup.number().required("Patient is required"),
  doctor_id: Yup.number().required("Doctor is required"),
  date: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").required("Date is required"),
  time: Yup.string().required("Time is required"),
});

// generate 15-min intervals between 8:00 and 17:00
function generateTimes() {
  const times = [];
  let hour = 8;
  let minute = 0;

  while (hour < 17 || (hour === 17 && minute === 0)) {
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    times.push(`${hh}:${mm}`);

    // increment by 15 minutes
    minute += 15;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return times;
}

const timeOptions = generateTimes();

function NewAppointmentForm({ onAddAppointment }) {
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

  return (
    <Formik
      initialValues={{ patient_id: "", doctor_id: "", date: "", time: "" }}
      validationSchema={appointmentSchema}
      onSubmit={(values, { resetForm }) => {
        fetch("http://127.0.0.1:5555/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((newAppt) => {
            onAddAppointment(newAppt);
            resetForm();
          })
          .catch((error) => console.error("Error adding appointment:", error));
      }}
    >
      {() => (
        <Form>
          <div>
            <label>Patient: </label>
            <Field as="select" name="patient_id">
              <option value="">Select a patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="patient_id" component="div" style={{ color: "red" }} />
          </div>
          
          <div>
            <label>Doctor: </label>
            <Field as="select" name="doctor_id">
              <option value="">Select a doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} - {d.specialty}
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
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="time" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit">Add Appointment</button>
        </Form>
      )}
    </Formik>
  );
}

export default NewAppointmentForm;
