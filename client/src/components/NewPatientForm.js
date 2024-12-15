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
        const newPatient = { ...values, id: Date.now() };
        
        onAddPatient(newPatient);

        resetForm();
      }}
    >
      {() => (
        <Form className="new-patient-form">
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
