#!/usr/bin/env python3

# Standard library imports
from datetime import datetime

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Patient, Doctor, Appointment

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# parse data string
def parse_date(date_str):
    return datetime.strptime(date_str, "%Y-%m-%d").date()

class PatientsResource(Resource):
    def get(self):
        patients = Patient.query.all()
        return [p.to_dict() for p in patients], 200

    def post(self):
        data = request.get_json()
        name = data.get('name')
        dob_str = data.get('dob')

        if not name or not dob_str:
            return {"error": "Name and Date of Birth are required"}, 400

        try:
            dob = parse_date(dob_str)
        except ValueError:
            return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        new_patient = Patient(name=name, dob=dob)
        db.session.add(new_patient)
        db.session.commit()
        return new_patient.to_dict(), 201

class PatientByIDResource(Resource):
    def get(self, id):
        patient = Patient.query.get(id)
        if not patient:
            return {"error": "No patient found"}, 404
        return patient.to_dict(), 200

class DoctorsResource(Resource):
    def get(self):
        doctors = Doctor.query.all()
        return [d.to_dict() for d in doctors], 200

    def post(self):
        data = request.get_json()
        name = data.get('name')
        specialty = data.get('specialty')

        if not name or not specialty:
            return {"error": "Name and Specialty are required"}, 400

        new_doctor = Doctor(name=name, specialty=specialty)
        db.session.add(new_doctor)
        db.session.commit()
        return new_doctor.to_dict(), 201

class DoctorByIDResource(Resource):
    def get(self, id):
        doctor = Doctor.query.get(id)
        if not doctor:
            return {"error": "No doctor found"}, 404
        return doctor.to_dict(), 200

class AppointmentsResource(Resource):
    def get(self):
        appointments = Appointment.query.all()
        return [a.to_dict() for a in appointments], 200

    def post(self):
        data = request.get_json()
        patient_id = data.get('patient_id')
        doctor_id = data.get('doctor_id')
        date_str = data.get('date')
        time_str = data.get('time')

        if not (patient_id and doctor_id and date_str and time_str):
            return {"error": "patient_id, doctor_id, date, and time are required"}, 400

        patient = Patient.query.get(patient_id)
        doctor = Doctor.query.get(doctor_id)
        if not patient:
            return {"error": "No patient found"}, 404
        if not doctor:
            return {"error": "No doctor found"}, 404

        # parse date and time
        try:
            appt_date = parse_date(date_str)
        except ValueError:
            return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        try:
            appt_time = datetime.strptime(time_str, "%H:%M").time()
        except ValueError:
            return {"error": "Invalid time format. Use HH:MM (24-hour format)."}, 400

        new_appt = Appointment(
            patient_id=patient_id,
            doctor_id=doctor_id,
            date=appt_date,
            time=appt_time
        )
        db.session.add(new_appt)
        db.session.commit()
        return new_appt.to_dict(), 201

class AppointmentByIDResource(Resource):
    def get(self, id):
        appt = Appointment.query.get(id)
        if not appt:
            return {"error": "No appointment found"}, 404
        return appt.to_dict(), 200

    def patch(self, id):
        appt = Appointment.query.get(id)
        if not appt:
            return {"error": "No appointmnt found"}, 404

        data = request.get_json()
        patient_id = data.get('patient_id')
        doctor_id = data.get('doctor_id')
        date_str = data.get('date')
        time_str = data.get('time')

        if patient_id:
            patient = Patient.query.get(patient_id)
            if not patient:
                return {"error": "No patient found"}, 404
            appt.patient_id = patient_id

        if doctor_id:
            doctor = Doctor.query.get(doctor_id)
            if not doctor:
                return {"error": "No doctor found"}, 404
            appt.doctor_id = doctor_id

        if date_str:
            try:
                appt.date = parse_date(date_str)
            except ValueError:
                return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        if time_str:
            try:
                appt.time = datetime.strptime(time_str, "%H:%M").time()
            except ValueError:
                return {"error": "Invalid time format. Use HH:MM (24-hour format)."}, 400

        db.session.commit()
        return appt.to_dict(), 200

    def delete(self, id):
        appt = Appointment.query.get(id)
        if not appt:
            return {"error": "No appointment found"}, 404
        db.session.delete(appt)
        db.session.commit()
        return {"message": "Appointment canceled"}, 200

# Add resources to the API
api.add_resource(PatientsResource, '/patients')
api.add_resource(PatientByIDResource, '/patients/<int:id>')

api.add_resource(DoctorsResource, '/doctors')
api.add_resource(DoctorByIDResource, '/doctors/<int:id>')

api.add_resource(AppointmentsResource, '/appointments')
api.add_resource(AppointmentByIDResource, '/appointments/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
