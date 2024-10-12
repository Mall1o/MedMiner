from neo4j import GraphDatabase

class Neo4jDB:
    def __init__(self):
        self.driver = None
        self.uri = None  # Memorizziamo l'URI
        self.user = None
        self.password = None
        self.database_name = "comorbidity"

    def init_app(self, app, database_name=None):
        self.uri = app.config['NEO4J_URI']
        self.user = app.config['NEO4J_USERNAME']
        self.password = app.config['NEO4J_PASSWORD']
        
        self.database_name = database_name or self.database_name
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password), database=self.database_name)

    def switch_database(self, new_database_name):
        if self.driver:
            self.driver.close()
        self.database_name = new_database_name
        # Usa l'URI memorizzato invece di accedere a self.driver.uri
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password), database=self.database_name)

    def close(self):
        if self.driver:
            self.driver.close()

neo4j_db = Neo4jDB()
