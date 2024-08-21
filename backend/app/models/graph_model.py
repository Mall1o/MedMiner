class GraphModel:
    def __init__(self, driver):
        self.driver = driver

    def get_graph(self):
        with self.driver.session() as session:
            # Query per ottenere i nodi
            nodes_query = "MATCH (n) RETURN n"
            nodes_result = session.run(nodes_query)
            nodes = [record["n"] for record in nodes_result]

            # Query per ottenere gli archi (relazioni)
            relationships_query = "MATCH ()-[r]->() RETURN r"
            relationships_result = session.run(relationships_query)
            relationships = [record["r"] for record in relationships_result]

            return {"nodes": nodes, "relationships": relationships}
