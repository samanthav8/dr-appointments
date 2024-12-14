from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!
class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    dob = db.Column(db.Date, nullable=False)

    appointments = db.relationship("Appointment", back_populates="patient")

    def __repr__(self):
        return f'<Patient id={self.id}, name={self.name}, dob={self.dob}>'
    
    serialize_rules = ('-appointments.patient',)

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    specialty = db.Column(db.String, nullable=False)

    appointments = db.relationship("Appointment", back_populates="doctor")

    def __repr__(self):
        return f'<Doctor id={self.id}, name={self.name}, specialty={self.specialty}>'
    
    serialize_rules = ('-appointments.doctor',)

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)

    patient = db.relationship("Patient", back_populates="appointments")
    doctor = db.relationship("Doctor", back_populates="appointments")

    def __repr__(self):
        return f'<Appointment id={self.id}, date={self.date}, time={self.time}, patient_id={self.patient_id}, doctor_id={self.doctor_id}>'
    
    serialize_rules = ('-patient.appointments', '-doctor.appointments',)