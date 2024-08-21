from neo4j import GraphDatabase

class Neo4jDB:
    def __init__(self):
        self.driver = None

    def init_app(self, app):
        uri = app.config['NEO4J_URI']
        user = app.config['NEO4J_USERNAME']
        password = app.config['NEO4J_PASSWORD']
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        if self.driver:
            self.driver.close()

neo4j_db = Neo4jDB()
