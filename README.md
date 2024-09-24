# Jobetus

Jobetus is a web application designed to connect students with recruiters, allowing students to browse and apply for jobs in development, while recruiters can post job listings.

## Technologies Used
- **Frontend**: Vue.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Store Management**: Pinia
- **End-to-End Testing**: Cypress
- **Unit Testing**: Jest

## Functionalities
- Browse for available jobs
- User authentication (login, register, logout)
- Add jobs (once logged in)
- Edit jobs (users can only edit jobs they have added)
- Edit/delete user profile
- Responsive web design

## Project Structure
The project structure is organized as follows:

### Backend
- `index.js`: The main entry point of the backend application.
- `config/`: Contains configuration files (database setup).
- `controllers/`: Responsible for handling incoming requests and orchestrating data flow.
- `models/`: Data models and schema definitions for the database.
- `repositories/`: Manages the data access layer, interacting with the database.
- `services/`: Contains business logic and service-layer code.
- `test/`: Test files for unit testing controller logic.

### Frontend
- `App.vue`: The root Vue component that serves as the main application wrapper.
- `main.js`: The main entry point for the frontend application.
- `assets/`: Contains static assets such as images, fonts, etc.
- `components/`: Reusable UI components.
- `router/`: Defines routes for the frontend application.
- `stores/`: State management logic.
- `views/`: Page-level components representing distinct views.


## API Documentation

### Job Routes

```GET```
**/jobs** : Get all jobs.

```GET```
**/jobs/:id** : Get the job with the specified {id}.

```PUT```
**/jobs/:id** : Update the job with the specified {id}.

```POST```
**/jobs** : Add a new job.

```DELETE```
**/jobs/:id** : Delete the job with the specified {id}.

### Auth Routes

```POST```
**/users/register** : Register a new user.

```POST```
**/authenticate** : Log in a user.

### User Routes

```GET```
**/user/:id** : Get the user with the specified {id}.

```GET```
**/user/:id/jobs** : Get all jobs posted by the user with the specified {id}.

```PUT```
**/user/edit/:id** : Update the user with the specified {id}.

```DELETE```
**/user/:id** : Delete the user with the specified {id}.


## Installation Guide

### Prerequisites
- Linux OS / WSL
- npm (Node Package Manager)
- MongoDB Server

### Steps
1. **Clone the project**
   ```bash
   git clone https://github.com/Quanghng/Jobetus.git
   ```
2. **Navigate to the project directory**
   ```bash
   cd Jobetus
   ```
3. **Install the dependencies**
   - For frontend
   ```bash
   cd front
   npm ci
   ```
   - For backend
   ```bash
   cd ../back
   npm ci
   ```
*Note* :  ```npm ci``` will install exact dependency versions from the lockfile (package-lock.json) which is recommended for ensuring reproducibility.

## Running the Project

### Backend
1. **Start MongoDB service**
   ```bash
   sudo service mongod start
   ```
2. **Load the initial data into the database**
   ```bash
   npm run loadDb
   ```
3. **Start the server**
   ```bash
   npm start
   ```

### Frontend
1. **Run the application**
   ```bash
   npm run dev
   ```
2. **Access the application**
   
Open your browser and go to ```http://localhost:5173/``` to view the page.

## Testing

### Backend
- **Unit Testing**
  ```bash
  npm test
  ```

### Frontend
- **End-to-End Testing**
  ```bash
  npm run cy:open
  ```
