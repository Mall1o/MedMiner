from ..models.graph_model import GraphModel

class GraphService:
    def __init__(self, driver):
        self.model = GraphModel(driver)

    def get_graph(self):
        return self.model.get_graph()

    def get_patient_graph(self, codice_fiscale):
        return self.model.get_patient_graph(codice_fiscale)
    
    def get_prescription_graph(self, codice_prescrizione):
        return self.model.get_prescription_graph(codice_prescrizione)