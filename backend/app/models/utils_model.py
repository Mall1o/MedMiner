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

    def get_prescription_list(self):
        with self.driver.session() as session:
            query = """
            MATCH (pr:Prescrizione)
            RETURN pr
            """
            result = session.run(query)
            prescriptions_list = []
            for record in result:
                node = record["pr"]
                prescriptions_list.append(dict(node))
            return prescriptions_list
        
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
            MATCH (m:Malattia)-[:DIAGNOSTICATO_CON]-(p:Paziente)
            WITH m, COUNT(p) AS degree_centrality
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
    
    def get_degree_centrality_prescrizione_malattia(self):
        with self.driver.session() as session:
            # Qui calcoliamo la prescrizione più frequente per una malattia
            query = """
            MATCH (m:Malattia)-[r:CURATA_CON]->(p:Prescrizione)
            WITH p, m, COUNT(p) AS prescrizione_count
            UNWIND labels(m) AS etichetta
            WITH etichetta, p, prescrizione_count
            WHERE etichetta <> 'Malattia'
            WITH etichetta, p, SUM(prescrizione_count) AS totale_prescrizioni
            ORDER BY etichetta, totale_prescrizioni DESC
            WITH etichetta, COLLECT({prescrizione: p.codice, count: totale_prescrizioni}) AS prescrizioni
            RETURN etichetta, prescrizioni[0].prescrizione AS prescrizione_piu_frequente, prescrizioni[0].count AS frequenza
            """
            
            # Esegui la query
            result = session.run(query)

            records = list(result)
            
            if records:
                prescrizioni = []
                for record in records:
                    prescrizione_info = {
                        "etichetta": record['etichetta'],
                        "codice_prescrizione": record['prescrizione_piu_frequente'],
                        "frequenza": record['frequenza']
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
            
    def get_disease_group_list(self):
        with self.driver.session() as session:
            query = """
            MATCH (m:Malattia)
            WITH DISTINCT [label IN labels(m) WHERE label <> 'Malattia'] AS additional_labels, m.descrizione AS Descrizione
            UNWIND additional_labels AS Gruppo
            RETURN DISTINCT Gruppo, Descrizione
            ORDER BY Gruppo

            """
            result = session.run(query)
            disease_groups = []
            if result:
                for record in result:
                    disease_info = {
                        "gruppo": record["Gruppo"],
                        "descrizione": record["Descrizione"]
                        
                    }
                    disease_groups.append(disease_info)
                return disease_groups
            else:
                return "Nessun risultato trovato."

    def get_disease_group(self, group_name):
        with self.driver.session() as session:
            query = """
            MATCH (m:Malattia)
            WHERE $group_name IN labels(m)
            RETURN m.codice AS CodiceMalattia, m.descrizione AS DescrizioneMalattia

            """
            
            result = session.run(query, group_name=group_name)
            print(query)
            diseases_list = []
            if result:
                for record in result:
                    diseases_info={
                        "codice": record["CodiceMalattia"],
                        "descrizione": record["DescrizioneMalattia"]
                    }
                    diseases_list.append(diseases_info)
                return diseases_list  
            else:
                return "Nessun risultato trovato."   