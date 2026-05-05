# TripAdvisor Clone Backend

## Overview
This is the backend for a TripAdvisor clone built using Node.js and Express. It serves as the API for the frontend AngularJS application, providing location data for travel listings.

## Getting Started

### Prerequisites
- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd trip-advisor/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Server
To start the backend server, run the following command:
```
npm start
```
The server will start on `http://localhost:3000`.

### API Endpoints
- **GET /api/locations**: Fetches a list of travel locations.

### Sample Data
The API returns a sample dataset of locations, including attributes such as name, city, type, average rating, and description.

## License
This project is licensed under the MIT License.