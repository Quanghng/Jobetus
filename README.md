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
*To be filled later*

## API Documentation
*To be filled later*

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
   cd jobetus
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

## Testing

### Backend
- **Unit Testing**
  ```bash
  npm test
  ```

### Frontend
- **End-to-End Testing**
  ```bash
  npm run run:cypress
  ```
