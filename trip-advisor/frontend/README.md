# Trip Advisor Clone - Frontend Documentation

## Overview
This project is a simple travel review clone built with AngularJS and a Node.js backend. It allows users to view travel listings, search for locations, and learn more about various travel options.

## Project Structure
```
trip-advisor
├── backend
│   ├── server.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── index.html
│   ├── app.js
│   ├── listings.html
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A web browser to view the application.

### Running the Frontend

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd trip-advisor/frontend
   ```

2. **Open the `index.html` file**:
   You can simply open the `index.html` file in your web browser to view the application. Ensure that the backend server is running to fetch data.

### Features
- **Search Functionality**: Users can search for locations by name or city.
- **Dynamic Listings**: The application fetches location data from the backend and displays it dynamically.

### Notes
- Ensure that the backend server is running on `http://localhost:3000` for the frontend to fetch data correctly.
- You can modify the `listings.html` and `app.js` files to customize the appearance and functionality of the application.

## License
This project is open-source and available under the MIT License.