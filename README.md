# Full-Stack Appointment Management System

This is a full-stack web application that manages patient appointments with doctors. The app allows users to manage patients, doctors, and appointments, with the ability to create, edit, and delete records. The project is built with a Flask backend and a React frontend.

## Features
- **Patients**: View, add, and manage patients. Each patient has a list of appointments.
- **Doctors**: View, add, and manage doctors. Each doctor has a list of upcoming appointments.
- **Appointments**: Schedule, view, update, and delete appointments. Each appointment is associated with a patient and a doctor.

## Technologies Used
- **Frontend**: React.js
  - React Router for navigation
  - Axios for making HTTP requests to the Flask backend
  - Formik and Yup for form validation
- **Backend**: Flask
  - Flask-RESTful for API routes
  - Flask-SQLAlchemy for database integration
  - Flask-Migrate for database migrations
  - Flask-CORS to allow communication between frontend and backend

## Project Structure

The project is divided into two main directories:
----------------------------------

### `client/`
Contains the React frontend of the application:
- `src/`: Contains the main React application files.
- `package.json`: Lists the dependencies and configuration for the React app.

### `server/`
Contains the Flask backend:
- `app.py`: The main Flask application file with routes and API configurations.
- `config.py`: Configuration settings for Flask and SQLAlchemy.
- `models.py`: Defines the models for patients, doctors, and appointments.
- `seed.py`: Used to seed the database with initial data.
- `migrations/`: Holds migration files for managing the database schema changes.

## Installation

### Backend Setup (Flask)
1. **Install dependencies**:
   - Navigate to the `server/` directory and install the required dependencies:
     ```bash
     pipenv install
     ```
     This will create a virtual environment and install the necessary Python dependencies.

2. **Run the Flask server**:
   - Start the Flask backend:
     ```bash
     python app.py
     ```
     The backend will be available at `http://localhost:5555`.

### Frontend Setup (React)
1. **Install dependencies**:
   - Navigate to the `client/` directory and install the required dependencies:
     ```bash
     npm install
     ```
     This will install all dependencies needed for the React app.

2. **Start the React development server**:
   - Start the React frontend:
     ```bash
     npm start
     ```
     The frontend will be available at `http://localhost:3000`.

### Running the Full Application
Once both servers are running, the app can be accessed in a web browser at `http://localhost:3000`. The frontend will make API requests to the Flask backend (running on `http://localhost:5555`) to fetch and update data.

## Database Setup

1. **Initialize the database**:
   - Navigate to the `server/` directory and run:
     ```bash
     flask db init
     ```
     This will create the necessary migration folders.

2. **Run migrations**:
   - Run the following command to apply the migrations and set up the database schema:
     ```bash
     flask db upgrade head
     ```

3. **Seed the database** (optional):
   - To add some initial data, you can use the `seed.py` script to populate the database:
     ```bash
     python seed.py
     ```

## API Routes

The Flask backend exposes the following API routes:

### **Patients**
- **GET** `/patients`: Fetch all patients.
- **POST** `/patients`: Add a new patient.
- **PUT** `/patients/<id>`: Update an existing patient.
- **DELETE** `/patients/<id>`: Delete a patient.

### **Doctors**
- **GET** `/doctors`: Fetch all doctors.
- **POST** `/doctors`: Add a new doctor.
- **PUT** `/doctors/<id>`: Update an existing doctor.
- **DELETE** `/doctors/<id>`: Delete a doctor.

### **Appointments**
- **GET** `/appointments`: Fetch all appointments.
- **POST** `/appointments`: Add a new appointment.
- **PUT** `/appointments/<id>`: Update an existing appointment.
- **DELETE** `/appointments/<id>`: Delete an appointment.

## Contributing

Feel free to contribute to this project! To get started:
1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch for your feature or bugfix.
4. Make your changes and commit them.
5. Push your changes to your fork and create a pull request.

## License

This project is licensed under the MIT License.

.
├── app.py
├── config.py
├── instance
│   └── app.db
├── migrations
│   ├── README
│   ├── __pycache__
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions
├── models.py
└── seed.py
