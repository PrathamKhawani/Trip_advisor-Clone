# Trip Advisor Clone

## Overview
This project is a Trip Advisor clone built using AngularJS for the frontend and Node.js with Express for the backend. It allows users to view travel listings, including attractions, hotels, and restaurants.

## Project Structure
```
trip-advisor
├── backend
│   ├── server.js          # Entry point for the backend application
│   ├── package.json       # Configuration file for the backend
│   └── README.md          # Documentation for the backend
├── frontend
│   ├── index.html         # Main HTML file for the frontend application
│   ├── app.js             # AngularJS application module and routing
│   ├── listings.html      # Template for displaying travel listings
│   └── README.md          # Documentation for the frontend
└── README.md              # Main documentation for the entire project
```

## Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. The backend API will be available at `http://localhost:3000/api/locations`.

## Frontend Setup
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Open `index.html` in a web browser to view the application.

## Features
- View travel listings with details such as name, city, type, and average rating.
- Search functionality to filter listings by name or city.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features.