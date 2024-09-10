from ..utils.json_formatter import format_nodes, format_relationships

class GraphModel:
    def __init__(self, driver):
        # Inizializza l'istanza di GraphModel con un driver
        self.driver = driver

    def get_graph(self):
        with self.driver.session() as session:
            nodes_query = """
            MATCH (p:Paziente)-[r1:DIAGNOSTICATO_CON]->(m:Malattia),
                (p)-[r2:RICEVE_PRESCRIZIONE]->(pr:Prescrizione)
            RETURN elementId(p) AS patient_elementId, p, 
                elementId(m) AS disease_elementId, m, 
                elementId(pr) AS prescription_elementId, pr
            LIMIT 50
            """
            nodes_result = session.run(nodes_query)
            nodes = format_nodes(nodes_result)
            
            relationships_query = """
            MATCH (p:Paziente)-[r1:DIAGNOSTICATO_CON]->(m:Malattia),
                (p)-[r2:RICEVE_PRESCRIZIONE]->(pr:Prescrizione)
            RETURN elementId(p) AS patient_elementId, 
                elementId(m) AS disease_elementId, 
                elementId(pr) AS prescription_elementId, r1, r2
            LIMIT 50
            """
            relationships_result = session.run(relationships_query)
            relationships = format_relationships(relationships_result)

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