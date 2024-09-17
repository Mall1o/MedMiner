from ..models.utils_model import UtilsModel

class UtilsService:
    def __init__(self, driver):
        self.model = UtilsModel(driver)
    
    def get_patient_count(self):
        return self.model.get_patient_count()
    
    def get_disease_count(self):    
        return self.model.get_disease_count()
    
    def get_prescription_count(self):
        return self.model.get_prescription_count()
    
    def get_patient_list(self):
        return self.model.get_patient_list()
    
    def get_degree_centrality_malattia_patient(self, codice_fiscale):
        return self.model.get_degree_centrality_malattia_patient(codice_fiscale)

    def get_degree_centrality_prescrizione_malattia(self, codice_malattia):
        return self.model.get_degree_centrality_prescrizione_malattia(codice_malattia)