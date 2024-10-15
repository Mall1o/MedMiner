# AI Study: Predicting Disease Development with GATConv and SAGEConv Models

## Overview
This project focuses on predicting the probability that a patient will develop diseases they currently do not have. The study utilizes two distinct models: 
- **SAGEConv**: A model that applies GraphSAGE convolution layers.
- **GATConv**: A model that uses Graph Attention Network (GAT) convolution layers.

Both models aim to analyze patients' medical histories, represented as graphs, and predict future disease links.

## Repository Structure
- **models/**  
  This folder contains saved checkpoints of the models, which can be reloaded to continue training or perform evaluation.
  - `model_checkpoint_SAGE.pth`: Checkpoint for the SAGEConv model.
  - `modelGATConv_checkpoint.pth`: Checkpoint for the GATConv model.

- **notebooks/**  
  This folder contains Jupyter notebooks that walk through the process of preparing the graph, training the models, and evaluating their performance.
  - `Modello_GATConv.ipynb`: Notebook with the GATConv model pipeline.
  - `Modello_tesi_SAGEConv.ipynb`: Notebook with the SAGEConv model pipeline.

## Models
### GATConv and SAGEConv
The difference between the two models lies in the type of graph convolution layers used:
- **SAGEConv**: Uses aggregation functions (mean, max, etc.) to propagate information across nodes.
- **GATConv**: Uses attention mechanisms to weigh the importance of neighbors' information.

Both models have been trained on a graph representation of patient medical data, where nodes represent diseases and patients, and edges represent relationships between them.

## Data Preparation
The data preparation phase is performed in the notebooks and consists of:
1. **Graph Construction**: Creating a graph where nodes represent diseases and patients, with relationships representing disease comorbidities.
2. **Feature Extraction**: Extracting patient features and disease connections to serve as input for the models.
3. **Train-Test Split**: Splitting the data into training and testing sets to evaluate the models' performance.

## Model Training
Both models are trained using PyTorch, and the notebooks provide the following steps:
- **Graph Data Input**: Feeding the prepared graph data to the model.
- **Model Instantiation**: Initializing either the SAGEConv or GATConv model.
- **Training Loop**: Running the model through multiple epochs, updating the weights based on loss calculations.
- **Evaluation and Testing**: After training, the model is evaluated on a test set to measure its accuracy and predictive performance.

## Loading a Saved Model
You can reload a saved model checkpoint to continue training or evaluate it further. Here's how to load a checkpoint:

```python
import torch

# Load the checkpoint
checkpoint = torch.load("model_checkpoint.pth")

# Load the model state
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss_fn = checkpoint['loss']

# Set the model to evaluation mode
model.eval()
```

The saved model will restore the state at the point where it was saved, including the model's weights, optimizer state, epoch number, and loss function.

## How to Run the Notebooks
1. **Clone the repository**:
   ```bash
   git clone <https://github.com/Mall1o/MedMiner.git>
    ```
## How to Run the Notebooks
1. **Navigate to the notebooks folder**:
   ```bash
   cd AI_Study/notebooks
2. **Open one of the provided Jupyter notebooks**:
   - `Modello_GATConv.ipynb`
   - `Modello_tesi_SAGEConv.ipynb`

3. **You can open the notebooks using Jupyter**:
   ```bash
   jupyter notebook
    ```
4. **Follow the steps inside the notebook to**:
   - Load the data.
   - Train the model.
   - Evaluate the results.
