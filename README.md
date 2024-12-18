#Full Stack Patient/Doctor Appointment Management App

My Patient/Doctor Appointment Management App is a full-stack web app that allows a user to create,edit,and cancel appointments for patients with their doctors. The project uses Flask for the backend and React for the frontend.

##Features
-Patients: View and create new patients
-Doctors: View and create new doctors
-Appointments: View, create, update, and delete appointments

##Installation

1. Clone the repository: git clone git@github.com:samanthav8/dr-appointments.git
2. Set up your flask backend. Navigate to the server directory and run the following in your terminal
```bash
pipenv install && pipenv shell
```
to create a virtual environment and install the dependencies.
3. Start your flask server by running 
```bash
python app.py
```
The backend database will be available at `http://localhost:5555`. 
4. Open a new terminal to set up the front end using React. Navigate to the client directory and 
install the required dependencies by running
```bash
npm install
```
5. Start your react development server by running
```bash
npm start
```
The front end database will be available at `http://localhost:5555`.
6. Both servers should now be running and the front end will make API requests to the backend.

##Usage
1.Initalize the database. Navigate to the server directory and run
```bash
flask db init
```
This will create the migration folders. 
2. Run migrations
Run the following to apply the migrations and set up the database
```bash
flask db upgrade head
```
3. Seed the data base by adding some initial data. 
```bash
python seed.py
```

##API Routes
-Patients
 GET `/patients`: Fetch all patients.
 POST `/patients`: Create a new patients
 GET `/patients/<id>`: Get a specific patient
-Doctors
 GET `/doctors`: Fetch all doctors.
 POST `/doctors`: Create a new doctor.
 GET `/doctors/<id>`: Get a specific doctor
-Appointments
 GET `/appointments`: Fetch all appointments
 POST `/appointments`: Add a new appointment
 PATCH `/appointments/<id>`: Update an existing appointment.
 DELETE `/appointments/<id>`: Delete an appointment
