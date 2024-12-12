#!/usr/bin/env python3

# Standard library imports
from random import choice, randint
from datetime import datetime, timedelta, time

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Patient, Doctor, Appointment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Dropping all tables...")
        db.drop_all()
        print("Creating all tables...")
        db.create_all()

        # doctors
        specialties = [
            'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics',
            'Oncology', 'Radiology', 'Endocrinology', 'Gastroenterology', 'Psychiatry'
        ]

        doctors = []
        for _ in range(10):
            doctor = Doctor(
                name=fake.name(),
                specialty=choice(specialties)
            )
            doctors.append(doctor)

        db.session.add_all(doctors)
        db.session.commit()


        # patients
        patients = []
        for _ in range(20):
            # genertae birthday
            birthdate = fake.date_of_birth(minimum_age=0, maximum_age=90)

            patient = Patient(
                name=fake.name(),
                dob=birthdate 
            )
            patients.append(patient)

        db.session.add_all(patients)
        db.session.commit()


        # appointments
        appointments = []
        for patient in patients:
            for _ in range(randint(1, 5)):
                # randomize doctor
                doctor = choice(doctors)

                # generate random date in next 30 days
                appt_date = datetime.utcnow() + timedelta(days=randint(1, 30))
                # generate random time between + 5pm 15 min intervals
                appt_time = time(hour=randint(8, 17), minute=choice([0, 15, 30, 45]))

                appointment = Appointment(
                    date=appt_date.date(),
                    time=appt_time,
                    patient_id=patient.id,
                    doctor_id=doctor.id
                )
                appointments.append(appointment)

        db.session.add_all(appointments)
        db.session.commit()

