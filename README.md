# MedMiner

## Introduction

**MedMiner** is a platform designed to assist doctors in analyzing medical records, with a focus on patient comorbidities. Using graph-based representations, MedMiner provides a clear and intuitive visualization of the relationships between patients, diseases, and prescriptions, enabling a comprehensive view of connections between various medical conditions. This graph representation helps identify relevant disease associations, aiding doctors in exploring comorbidity patterns and potentially improving clinical management.

The project leverages **Social Network Analysis (SNA)** techniques to analyze health networks, applying metrics such as centrality, clustering, and other connectivity measures to identify key diseases in comorbidity networks.

### Separate AI Study

Alongside the MedMiner project, a separate artificial intelligence study has been conducted to explore the use of machine learning models aimed at predicting new relationships between patients and diseases. This study, developed separately using **PyTorch Geometric**, aims to enhance the platform's predictive and analytical capabilities but is not directly integrated into the main platform.

### Technologies Used:

- **Frontend**: Developed using **React**, the frontend manages the user interface and allows doctors to dynamically interact with the graph. It offers a smooth and interactive experience for visualizing medical data.
  
- **Backend**: Implemented in **Python**, the backend communicates with a **Neo4j** graph database, optimized for handling graph-structured data. Through the backend, complex queries can be executed, and network analysis algorithms can be applied to extract meaningful insights from the graph.
  
- **Database**: **Neo4j** is used to store the relationships between patients, diseases, and prescriptions, representing them as a graph that can be queried and analyzed to uncover comorbidity patterns and other relevant information.

### Project Structure

The project is organized as follows:
```
MedMiner/
│           # Study of machine learning models for comorbidity prediction
|── AI_Study/        # Scripts and models developed separately using PyTorch Geometric
│
├── backend/             # Backend server implementation (Python, Flask, Neo4j)
│
├── frontend/            # User interface implementation (React)
│
└── README.md            # This file

```

## Separate Guides

Detailed instructions for dependency installation and configuration will be provided in separate README files located in the `backend` and `frontend` directories.
=======
