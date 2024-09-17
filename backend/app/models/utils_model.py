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
    
    def get_degree_centrality_malattia_patient(self, codice_fiscale):
        with self.driver.session() as session:
            #qui calcoliamo quante altre persone hanno la stessa malattia
            query = """
            MATCH (p:Paziente)-[:DIAGNOSTICATO_CON]->(m:Malattia)
            WHERE p.codice_fiscale_assistito = $codice_fiscale_assistito
            WITH m
            MATCH (m)<-[:DIAGNOSTICATO_CON]-(altriPazienti:Paziente)
            RETURN m.codice AS nome_malattia, COUNT(altriPazienti) AS degree_centrality
            ORDER BY degree_centrality DESC
            """
            
            # Esegui la query
            result = session.run(query, codice_fiscale_assistito=codice_fiscale)

            records = list(result)
            
            if records:
                malattie = []
                for record in records:
                    malattia_info = {
                        "codice_malattia": record['nome_malattia'],
                        "degree_centrality": record['degree_centrality']
                    }
                    malattie.append(malattia_info)
                return malattie
            else:
                 return "Nessun risultato trovato."  
    
    def get_degree_centrality_prescrizione_patient(self, codice_fiscale):
        with self.driver.session() as session:
            #qui calcoliamo quante altre persone hanno la stessa prescrizione
            query = """
            MATCH (p:Paziente)-[:RICEVE_PRESCRIZIONE]->(presc:Prescrizione)
            WHERE p.codice_fiscale_assistito = $codice_fiscale_assistito
            WITH presc
            MATCH (presc)<-[:RICEVE_PRESCRIZIONE]-(altriPazienti:Paziente)
            RETURN presc.codice AS nome_prescrizione, COUNT(DISTINCT altriPazienti) AS  degree_centrality
            ORDER BY degree_centrality DESC
            """
            
            # Esegui la query
            result = session.run(query, codice_fiscale_assistito=codice_fiscale)

            records = list(result)
            
            if records:
                prescrizioni = []
                for record in records:
                    prescrizione_info = {
                        "codice_prescrizione": record['nome_prescrizione'],
                        "degree_centrality": record['degree_centrality']
                    }
                    prescrizioni.append(prescrizione_info)
                return prescrizioni
            else:
                 return "Nessun risultato trovato."