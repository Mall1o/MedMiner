
# MedMiner Frontend

## Overview

The frontend of **MedMiner** is a web-based application built to provide doctors and medical professionals with an intuitive and interactive interface for exploring the comorbidity relationships between patients, diseases, and prescriptions. It offers an easy-to-navigate visualization of the medical data graph, helping users to analyze complex health information quickly and effectively.

### Key Features

- **Interactive Graph Visualization**: Visualize relationships between patients, diseases, and prescriptions using an interactive graph.
- **Dynamic Data Filtering**: Filter nodes and edges dynamically to focus on specific patients or disease groups.
- **Responsive Design**: The frontend is optimized for various devices and screen sizes.
- **React Components**: Modular and reusable React components for easy development and maintenance.
- **API Integration**: Seamless communication with the backend (Neo4j, Flask) for querying and fetching data in real-time.

## Technologies Used

- **React**: A JavaScript library for building user interfaces, providing a fast and responsive user experience.
- **Vis.js**: A dynamic, browser-based data visualization library for creating network graphs.
- **React Router**: For client-side routing to handle multiple pages and navigation seamlessly.

## Folder Structure

The structure of the frontend project is as follows:

```
frontend/
│
├── public/                # Public directory for index.html and static assets
│
├── src/                   # Source files for the React application
│   ├── components/        # Reusable React components
│   ├── pages/             # Individual page components (Home, Graph, Patient Details, etc.)
│   ├── styles/            # CSS files for styling components
│   ├── services/          # API integration and data fetching logic
│   ├── App.jsx            # Main application component
│   └── index.js           # Application entry point
│
└── package.json           # Project dependencies and scripts
```

## Installation

To set up and run the frontend locally, follow these steps:


1. **Install dependencies**:

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the necessary packages:

   ```
   npm install
   ```

2. **Run the development server**:

   Start the development server using the command below. The application will be available at `http://localhost:3000` by default.

   ```
   npm start
   ```

3. **Build for production**:

   To create a production build, run:

   ```
   npm run build
   ```

   This will generate a `build/` folder containing optimized production files.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- `npm run build`: Builds the app for production, minifying and optimizing the code for deployment.
- `npm test`: Launches the test runner in interactive watch mode (if you have tests set up).


