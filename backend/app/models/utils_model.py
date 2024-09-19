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
    
    def get_degree_centrality_malattia(self):
        with self.driver.session() as session:
            #qui calcoliamo quante altre persone hanno la stessa malattia
            query = """
            MATCH (m:Malattia)-[:ASSOCIATA_A]-(altreMalattie:Malattia)
            WITH m, COUNT(altreMalattie) AS degree_centrality
            UNWIND labels(m) AS etichetta
            WITH etichetta, degree_centrality
            WHERE etichetta <> 'Malattia'
            RETURN etichetta, SUM(degree_centrality) AS degree_centrality
            ORDER BY degree_centrality DESC
            """
            
            # Esegui la query
            result = session.run(query)

            records = list(result)
            
            if records:
                malattie = []
                for record in records:
                    malattia_info = {
                        "codice_malattia": record['etichetta'],
                        "degree_centrality": record['degree_centrality']
                    }
                    malattie.append(malattia_info)
                return malattie
            else:
                 return "Nessun risultato trovato."  
    
    def get_degree_centrality_prescrizione_malattia(self, codice_malattia):
        with self.driver.session() as session:
            # Qui calcoliamo quante altre malattie condividono la stessa prescrizione
            query = """
            MATCH (m:Malattia)-[:CURATA_CON]->(presc:Prescrizione)
            WHERE m.codice = $codice_malattia
            WITH presc
            MATCH (presc)<-[:CURATA_CON]-(altreMalattie:Malattia)
            RETURN presc.codice AS nome_prescrizione, COUNT(DISTINCT altreMalattie) AS degree_centrality
            ORDER BY degree_centrality DESC
            """
            
            # Esegui la query
            result = session.run(query, codice_malattia=codice_malattia)

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
            
    def get_betweenness_malattia(self):
        with self.driver.session() as session:
            # Proietta il grafo
            session.run("""
            CALL gds.graph.project(
                'malattiaGraph',
                'Malattia',
                {
                ASSOCIATA_A: {
                    type: 'ASSOCIATA_A'
                }
                }
            )
            """)
            # Qui calcoliamo la betweenness delle malattie
            result = session.run("""
                CALL gds.betweenness.stream('malattiaGraph')
                YIELD nodeId, score
                RETURN gds.util.asNode(nodeId).codice AS id, score
                """)

            # Droppa la proiezione
            session.run("CALL gds.graph.drop('malattiaGraph')")
            
            records = list(result)
            
            if records:
                risultati = []
                for record in records:
                    malattia_info = {
                        "icd9cm": record['id'],
                        "betweeness": record['score']
                    }
                    risultati.append(malattia_info)
                return risultati
            else:
                return "Nessun risultato trovato."
            