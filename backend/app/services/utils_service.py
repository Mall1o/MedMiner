import os
import shutil
import time
from werkzeug.utils import secure_filename
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
    
    def get_prescription_list(self):
        return self.model.get_prescription_list()
    
    def get_degree_centrality_malattia(self):
        return self.model.get_degree_centrality_malattia()

    def get_degree_centrality_prescrizione_malattia(self):
        return self.model.get_degree_centrality_prescrizione_malattia()
    
    def get_betweenness_malattia(self):
        return self.model.get_betweenness_malattia() 
    
    def get_disease_group_list(self):
        return self.model.get_disease_group_list()
    
    def get_disease_group(self, group_name):
        return self.model.get_disease_group(group_name)

    def create_and_switch_database(self, db_name):
        # Creazione del nuovo database
        self.model.create_database(db_name)
        # Cambia al nuovo database
        self.switch_database(db_name)

    def switch_database(self, db_name):
        from ..extensions import neo4j_db
        neo4j_db.switch_database(db_name)

    def load_csv_to_neo4j(self, file_path, db_name):
        # Assicura che stiamo usando il database corretto prima di caricare il CSV
        self.switch_database(db_name)
        return self.model.load_csv_to_neo4j(file_path, db_name)
    
    def get_unique_filename(self,filename):
        timestamp = int(time.time())  # Usa il timestamp per creare un nome unico
        filename_base, filename_ext = os.path.splitext(secure_filename(filename))
        return f"{filename_base}_{timestamp}{filename_ext}"

    def get_db_list(self):
        return self.model.get_db_list()