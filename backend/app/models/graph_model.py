class GraphModel:
    def __init__(self, driver):
        # Inizializza l'istanza di GraphModel con un driver
        self.driver = driver

    def get_graph(self):
        # Crea una sessione con il driver
        with self.driver.session() as session:
            # Query per ottenere un sottoinsieme di nodi e i loro elementId dal database
            nodes_query = """
            MATCH (p:Paziente)-[r1:DIAGNOSTICATO_CON]->(m:Malattia),
                (p)-[r2:RICEVE_PRESCRIZIONE]->(pr:Prescrizione)
            RETURN elementId(p) AS patient_elementId, p, 
                elementId(m) AS disease_elementId, m, 
                elementId(pr) AS prescription_elementId, pr
            LIMIT 50
            """
            nodes_result = session.run(nodes_query)
            
            # Set per tenere traccia dei nodi già aggiunti
            added_patients = set()
            added_diseases = set()
            added_prescriptions = set()
            
            # Lista per memorizzare i nodi senza duplicati
            nodes = []
            
            # Processa i nodi restituiti dalla query
            for record in nodes_result:
                # Aggiungi il nodo Paziente solo se non è già stato aggiunto
                if record["patient_elementId"] not in added_patients:
                    nodes.append({
                        "id": record["patient_elementId"],
                        "type": "Paziente",
                        "properties": dict(record["p"])
                    })
                    added_patients.add(record["patient_elementId"])
                
                # Aggiungi il nodo Malattia solo se non è già stato aggiunto
                if record["disease_elementId"] not in added_diseases:
                    nodes.append({
                        "id": record["disease_elementId"],
                        "type": "Malattia",
                        "properties": dict(record["m"])
                    })
                    added_diseases.add(record["disease_elementId"])
                
                # Aggiungi il nodo Prescrizione solo se non è già stato aggiunto
                if record["prescription_elementId"] not in added_prescriptions:
                    nodes.append({
                        "id": record["prescription_elementId"],
                        "type": "Prescrizione",
                        "properties": dict(record["pr"])
                    })
                    added_prescriptions.add(record["prescription_elementId"])

            # Query per ottenere le relazioni tra i nodi con elementId
            relationships_query = """
            MATCH (p:Paziente)-[r1:DIAGNOSTICATO_CON]->(m:Malattia),
                (p)-[r2:RICEVE_PRESCRIZIONE]->(pr:Prescrizione)
            RETURN elementId(p) AS patient_elementId, 
                elementId(m) AS disease_elementId, 
                elementId(pr) AS prescription_elementId, r1, r2
            LIMIT 50
            """
            relationships_result = session.run(relationships_query)
            
            # Set per tenere traccia delle relazioni già aggiunte
            added_relationships = set()
            
            # Lista per memorizzare le relazioni senza duplicati
            relationships = []
            
            # Processa le relazioni restituite dalla query
            for record in relationships_result:
                # Crea una tupla unica per ogni relazione per evitare duplicati
                diagnosticato_key = (record["patient_elementId"], record["disease_elementId"], "DIAGNOSTICATO_CON")
                prescrizione_key = (record["patient_elementId"], record["prescription_elementId"], "RICEVE_PRESCRIZIONE")
                
                # Aggiungi la relazione DIAGNOSTICATO_CON solo se non è già stata aggiunta
                if diagnosticato_key not in added_relationships:
                    relationships.append({
                        "start_id": record["patient_elementId"],
                        "end_id": record["disease_elementId"],
                        "type": "DIAGNOSTICATO_CON",
                        "properties": dict(record["r1"])
                    })
                    added_relationships.add(diagnosticato_key)
                
                # Aggiungi la relazione RICEVE_PRESCRIZIONE solo se non è già stata aggiunta
                if prescrizione_key not in added_relationships:
                    relationships.append({
                        "start_id": record["patient_elementId"],
                        "end_id": record["prescription_elementId"],
                        "type": "RICEVE_PRESCRIZIONE",
                        "properties": dict(record["r2"])
                    })
                    added_relationships.add(prescrizione_key)

            # Ritorna un dizionario con i nodi e le relazioni
            return {"nodes": nodes, "relationships": relationships}










    #Roba vecchia da aggiustare!!!!!
    
    
    def get_user_graph(self, codice_fiscale_assistito):
        with self.driver.session() as session:
            # Query per ottenere i nodi e le relazioni associati a un codice fiscale specifico
            query = """
            MATCH (n)-[r]->(m)
            WHERE r.codice_fiscale_assistito = $codice_fiscale_assistito
            RETURN n, r, m
            """
            result = session.run(query, codice_fiscale_assistito=codice_fiscale_assistito)

            # Estrai nodi e relazioni dai risultati
            nodes = set()
            relationships = []
            for record in result:
                nodes.add(record["n"])
                nodes.add(record["m"])
                relationships.append(record["r"])

            # Converti il set in una lista e ritorna il risultato
            return {"nodes": list(nodes), "relationships": relationships}
        
    def get_all_dates(self):
        with self.driver.session() as session:
            query = """
            MATCH ()-[r:PRESCRIPTION]->()
            RETURN DISTINCT r.data_prescrizione AS date
            ORDER BY date
            """
            result = session.run(query)
            return [record["date"] for record in result]

    def get_prescriptions_by_date(self, selected_date):
        with self.driver.session() as session:
            query = """
            MATCH (u:User)-[r:PRESCRIPTION {data_prescrizione: $selected_date}]->(a:Assistito)
            RETURN u, r, a
            """
            result = session.run(query, selected_date=selected_date)
            nodes = set()
            relationships = []
            for record in result:
                nodes.add(record["u"])
                nodes.add(record["a"])
                relationships.append(record["r"])

            return {"nodes": list(nodes), "relationships": relationships}

    def get_prescriptions_by_date_range(self, start_date, end_date):
        with self.driver.session() as session:
            query = """
            MATCH (u:User)-[r:PRESCRIPTION]->(a:Assistito)
            WHERE r.data_prescrizione >= $start_date AND r.data_prescrizione <= $end_date
            RETURN u, r, a
            """
            result = session.run(query, start_date=start_date, end_date=end_date)
            nodes = set()
            relationships = []
            for record in result:
                nodes.add(record["u"])
                nodes.add(record["a"])
                relationships.append(record["r"])

            return {"nodes": list(nodes), "relationships": relationships}