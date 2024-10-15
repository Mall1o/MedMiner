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
│
├── medminer/            # Study of machine learning models for comorbidity prediction
│   └── AI_Study/        # Scripts and models developed separately using PyTorch Geometric
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
# Med Miner 2.0

Med Miner 2.0 è una web app che analizza la comorbidità di ogni singolo paziente partendo dal suo grafo. I nodi rappresentano le malattie e gli archi le prescrizioni in comune.

## Prerequisiti

Assicurati di avere installato i seguenti strumenti:

- Python
- Node.js
- npm (Node Package Manager)
- Flask

## Installazione

### Backend

1. Clona il repository:
	```bash
	git clone <repository-url>
	cd <repository-directory>
	```

2. Installa le dipendenze di Python:
	```bash
	pip install -r requirements.txt
	```

3. Avvia il server Flask:
	```bash
	flask run
	```

### Frontend

1. Vai nella directory del progetto frontend:
	```bash
	cd frontend
	```

2. Installa le dipendenze di npm:
	```bash
	npm install
	```

3. Avvia l'app in modalità di sviluppo:
	```bash
	npm start
	```

	Apri [http://localhost:3000](http://localhost:3000) per visualizzarla nel tuo browser. La pagina si ricaricherà quando apporti modifiche. Potresti anche vedere eventuali errori di lint nella console.

## Scripts Disponibili

Nella directory del progetto, puoi eseguire:

### [`npm start`](command:_github.copilot.openSymbolFromReferences?%5B%22npm%20start%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Ctulli%5C%5CDesktop%5C%5CTesi%5C%5Cprove%5C%5Cprivate_tesi%5C%5Cmedminer%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A9%7D%7D%5D%5D "Go to definition")

Esegue l'app in modalità di sviluppo.\
Apri [http://localhost:3000](http://localhost:3000) per visualizzarla nel tuo browser.

La pagina si ricaricherà quando apporti modifiche.\
Potresti anche vedere eventuali errori di lint nella console.

### [`npm test`](command:_github.copilot.openSymbolFromReferences?%5B%22npm%20test%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Ctulli%5C%5CDesktop%5C%5CTesi%5C%5Cprove%5C%5Cprivate_tesi%5C%5Cmedminer%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A9%7D%7D%5D%5D "Go to definition")

Avvia il test runner in modalità interattiva.\
Consulta la sezione su [esecuzione dei test](https://facebook.github.io/create-react-app/docs/running-tests) per ulteriori informazioni.

### [`npm run build`](command:_github.copilot.openSymbolFromReferences?%5B%22npm%20run%20build%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Ctulli%5C%5CDesktop%5C%5CTesi%5C%5Cprove%5C%5Cprivate_tesi%5C%5Cmedminer%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A13%7D%7D%5D%5D "Go to definition")

Compila l'app per la produzione nella cartella [`build`](command:_github.copilot.openSymbolFromReferences?%5B%22build%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Ctulli%5C%5CDesktop%5C%5CTesi%5C%5Cprove%5C%5Cprivate_tesi%5C%5Cmedminer%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Ftulli%2FDesktop%2FTesi%2Fprove%2Fprivate_tesi%2Fmedminer%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A13%7D%7D%5D%5D "Go to definition").\
Raggruppa correttamente React in modalità di produzione e ottimizza la build per ottenere le migliori performance.
