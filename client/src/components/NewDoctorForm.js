import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const specialties = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Radiology",
  "Endocrinology",
  "Gastroenterology",
  "Psychiatry"
];

const doctorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  specialty: Yup.string().required("Specialty is required"),
});

function NewDoctorForm({ onAddDoctor }) {
  return (
    <Formik
      initialValues={{ name: "", specialty: "" }}
      validationSchema={doctorSchema}
      onSubmit={(values, { resetForm }) => {
        fetch("http://127.0.0.1:5555/doctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((newDoctor) => {
            onAddDoctor(newDoctor);
            resetForm();
          })
          .catch((error) => console.error("Error adding doctor:", error));
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
            <label>Specialty: </label>
            <Field as="select" name="specialty">
              <option value="">Select a specialty</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </Field>
            <ErrorMessage name="specialty" component="div" style={{ color: "red" }} />
          </div>
          
          <button type="submit">Add Doctor</button>
        </Form>
      )}
    </Formik>
  );
}

export default NewDoctorForm;