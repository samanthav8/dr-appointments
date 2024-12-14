import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const patientSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dob: Yup.date().required("DOB is required (format: YYYY-MM-DD)"),
});

function NewPatientForm({ onAddPatient }) {
  return (
    <Formik
      initialValues={{ name: "", dob: "" }}
      validationSchema={patientSchema}
      onSubmit={(values, { resetForm }) => {
        fetch("http://127.0.0.1:5555/patients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((newPatient) => {
            onAddPatient(newPatient);
            resetForm();
          })
          .catch((error) => console.error("Error adding patient:", error));
      }}
    >
      {() => (
        <Form>
          <div>
            <label>Name: </label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" style={{ color: "red" }} />
          </div>
          <div>
            <label>DOB (YYYY-MM-DD): </label>
            <Field name="dob" />
            <ErrorMessage name="dob" component="div" style={{ color: "red" }} />
          </div>
          <button type="submit">Add Patient</button>
        </Form>
      )}
    </Formik>
  );
}

export default NewPatientForm;
