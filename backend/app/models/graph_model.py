class GraphModel:
    def __init__(self, driver):
        # Inizializza l'istanza di GraphModel con un driver
        self.driver = driver

    def get_graph(self):
        # Crea una sessione con il driver
        with self.driver.session() as session:
            # Query per ottenere i nodi dal database
            nodes_query = "MATCH (n) RETURN n"
            nodes_result = session.run(nodes_query)
            # Estrae i nodi dal risultato della query
            nodes = [record["n"] for record in nodes_result]

            # Query per ottenere gli archi dal database
            relationships_query = "MATCH ()-[r]->() RETURN r"
            relationships_result = session.run(relationships_query)
            # Estrae gli archi dal risultato della query
            relationships = [record["r"] for record in relationships_result]

            # Ritorna un dizionario con i nodi e gli archi
            return {"nodes": nodes, "relationships": relationships}

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