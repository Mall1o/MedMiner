
# MedMiner Backend

## Overview

The backend of **MedMiner** serves as the core engine for the platform, handling the data retrieval, storage, and interaction with the **Neo4j** graph database. It powers the application's ability to visualize and analyze the relationships between patients, diseases, and prescriptions, providing APIs that the frontend can consume to dynamically fetch and manipulate data. The backend is also responsible for executing algorithms and metrics on the medical data, such as **centrality** measures, **k-core decomposition**, and other **Social Network Analysis (SNA)** techniques.

### Key Features

- **RESTful API**: Provides APIs for querying patients, diseases, and prescriptions stored in the Neo4j graph database.
- **Integration with Neo4j**: Interacts with the Neo4j graph database to handle complex queries and analysis of medical data.
- **Algorithm Execution**: Executes graph algorithms, such as betweenness centrality, degree centrality, and k-core, directly on the data stored in Neo4j.
- **Python and Flask-based**: Built using Flask for routing and API development, with Python handling the logic for data processing and interaction with Neo4j.

## Technologies Used

- **Flask**: A lightweight Python web framework for building RESTful APIs.
- **Neo4j**: A graph database used to model relationships between patients, diseases, and prescriptions.

## Folder Structure

The backend is organized as follows:

```
backend/
│
├── app/                  # Main application logic
│   ├── __init__.py       # Initializes the Flask app and database connection
│   ├── routes.py         # Defines the API endpoints
│   ├── models.py         # Defines the data models for patients, diseases, prescriptions
│   ├── services.py       # Core logic for interacting with Neo4j
│   └── utils.py          # Utility functions (helper methods, data formatting, etc.)
│
├── config.py             # Configuration settings (API keys, database credentials)
├── requirements.txt      # Project dependencies
├── run.py                # Main entry point to run the Flask app
└── tests/                # Test cases for the backend
```

## Installation

To set up and run the backend locally, follow these steps:

1. **Clone the repository**:

   ```

   git clone https://github.com/Mall1o/medminer-backend.git

cd medminer-backend
   ```

2. **Create and activate a virtual environment** (optional but recommended):

   ```
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts ctivate
   ```

3. **Install dependencies**:

   All required dependencies are listed in `requirements.txt`. Install them using pip:

   ```
   pip install -r requirements.txt
   ```

4. **Configure the environment variables**:

   Create a `.env` file in the root directory with the following content (adjust to your settings):

   ```
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USERNAME=neo4j
   NEO4J_PASSWORD=your_password
   ```

5. **Run the application**:

   Start the Flask server with the following command:

   ```
   python run.py
   ```

   The API will be available at `http://localhost:5000`.
