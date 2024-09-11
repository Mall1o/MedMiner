class UtilsModel:
    def __init__(self, driver):
        self.driver = driver
    
    def get_patient_list(self):
        with self.driver.session() as session:
            query = """
            MATCH (p:Paziente)
            RETURN p
            """
            result = session.run(query)
            patients_list = []
            for record in result:
                node = record["p"]  # Questo è il nodo
                patients_list.append(dict(node))  # Converte il nodo in un dizionario
            return patients_list

    def get_patient_count(self):
        with self.driver.session() as session:
            query = """
            MATCH (p:Paziente)
            RETURN count(p) AS patientCount
            """
            result = session.run(query)
            return result.single()["patientCount"]
            
    def get_disease_count(self):
        with self.driver.session() as session:
            query = """
            MATCH (m:Malattia)
            RETURN count(m) AS diseaseCount
            """
            result = session.run(query)
            return result.single()["diseaseCount"]
                
    def get_prescription_count(self):
        with self.driver.session() as session:
            query = """
            MATCH (pr:Prescrizione)
            RETURN count(pr) AS prescriptionCount
            """
            result = session.run(query)
            return result.single()["prescriptionCount"]
            