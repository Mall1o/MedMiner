from ..utils.json_formatter import format_nodes, format_relationships, format_curata_relationships, format_disease_nodes, format_disease_relationships

class GraphModel:
    def __init__(self, driver):
        # Inizializza l'istanza di GraphModel con un driver
        self.driver = driver

    def get_graph(self):
        with self.driver.session() as session:
            nodes_query = """
            MATCH (p:Paziente)-[r1:DIAGNOSTICATO_CON]->(m:Malattia)
            OPTIONAL MATCH (m)-[r2:CURATA_CON]->(pr:Prescrizione)
            OPTIONAL MATCH (m)-[r3:ASSOCIATA_A]-(other_m:Malattia)
            RETURN DISTINCT 
                elementId(p) AS patient_elementId, p, 
                elementId(m) AS disease_elementId, m, 
                elementId(pr) AS prescription_elementId, pr, 
                elementId(other_m) AS other_disease_elementId, other_m
            LIMIT 50
            """
            nodes_result = session.run(nodes_query)
            nodes = format_nodes(nodes_result)
            
            relationships_query = """
            MATCH (p:Paziente)-[r1:DIAGNOSTICATO_CON]->(m:Malattia)
            OPTIONAL MATCH (m)-[r2:CURATA_CON]->(pr:Prescrizione)
            OPTIONAL MATCH (m)-[r3:ASSOCIATA_A]-(other_m:Malattia)
            RETURN DISTINCT 
                elementId(p) AS patient_elementId, 
                elementId(m) AS disease_elementId, 
                elementId(pr) AS prescription_elementId, 
                elementId(other_m) AS other_disease_elementId, 
                r1, r2, r3
            LIMIT 50
            """
            relationships_result = session.run(relationships_query)
            relationships = format_relationships(relationships_result)
            return {"relationships": relationships, "nodes": nodes}



    def get_patient_graph(self, codice_fiscale):
        with self.driver.session() as session:
            # Query per i nodi: Paziente -> Malattia -> Prescrizione
            nodes_query = """
            MATCH (p:Paziente {codice_fiscale_assistito: $codice_fiscale})-[r1:DIAGNOSTICATO_CON]->(m:Malattia)
            OPTIONAL MATCH (m)-[r2:CURATA_CON {codice_fiscale_assistito: $codice_fiscale}]->(pr:Prescrizione)
            RETURN elementId(p) AS patient_elementId, p, 
                elementId(m) AS disease_elementId, m, 
                elementId(pr) AS prescription_elementId, pr
            """
            nodes_result = session.run(nodes_query, codice_fiscale=codice_fiscale)
            nodes = format_nodes(nodes_result)
            
            # Query per le relazioni: Paziente -> Malattia -> Prescrizione
            relationships_query = """
            MATCH (p:Paziente {codice_fiscale_assistito: $codice_fiscale})-[r1:DIAGNOSTICATO_CON]->(m:Malattia)
            OPTIONAL MATCH (m)-[r2:CURATA_CON {codice_fiscale_assistito: $codice_fiscale}]->(pr:Prescrizione)
            OPTIONAL MATCH (m)-[r3:ASSOCIATA_A{codice_fiscale_assistito: $codice_fiscale}]-(other_m:Malattia)
            RETURN elementId(p) AS patient_elementId, 
                elementId(m) AS disease_elementId, 
                elementId(pr) AS prescription_elementId, 
                elementId(other_m) AS other_disease_elementId, r1, r2, r3
            """
            relationships_result = session.run(relationships_query, codice_fiscale=codice_fiscale)
            relationships = format_relationships(relationships_result)

            return {"nodes": nodes, "relationships": relationships}
    
    def get_prescription_graph(self, codice_prescrizione):
        with self.driver.session() as session:
            # Query per i nodi: Malattia -> Prescrizione (Distintamente)
            nodes_query = """
            MATCH (m:Malattia)-[:CURATA_CON]->(pr:Prescrizione {codice: $codice_prescrizione})
            WITH DISTINCT m, pr
            RETURN elementId(m) AS disease_elementId, m, 
                elementId(pr) AS prescription_elementId, pr
            """
            nodes_result = session.run(nodes_query, codice_prescrizione=codice_prescrizione)
            nodes = format_nodes(nodes_result)
            
            # Query per le relazioni: Prescrizione -> Malattia con counter
            relationships_query = """
            MATCH (m:Malattia)-[r:CURATA_CON]->(pr:Prescrizione {codice: $codice_prescrizione})
            WITH m, pr, r.descrizione_prescrizione AS descrizione_prescrizione, COUNT(r) AS NumeroDiCure
            RETURN elementId(m) AS disease_elementId, 
                elementId(pr) AS prescription_elementId, 
                descrizione_prescrizione, 
                NumeroDiCure
            ORDER BY descrizione_prescrizione
            """
            relationships_result = session.run(relationships_query, codice_prescrizione=codice_prescrizione)
            relationships = format_curata_relationships(relationships_result)

            return {"nodes": nodes, "relationships": relationships}
    
    def get_disease_graph(self, codice_malattia):
        with self.driver.session() as session:
            
            # Parte 1: Query per i nodi delle malattie associate
            nodes_query1 = """
            MATCH (m:Malattia {codice: $codice_malattia})-[r:ASSOCIATA_A]-(m2:Malattia)
            RETURN elementId(m) AS disease1_elementId, m.codice AS codice_malattia_input,
                elementId(m2) AS disease2_elementId, m2.codice AS codice_malattia_associata
            """
            nodes_result1 = session.run(nodes_query1, codice_malattia=codice_malattia)  # Parametro passato correttamente
            nodes1 = format_disease_nodes(nodes_result1)

            # Parte 2: Query per i nodi delle prescrizioni
            nodes_query2 = """
            MATCH (m:Malattia {codice: $codice_malattia})-[r:CURATA_CON]->(p:Prescrizione)
            RETURN elementId(p) AS prescription_elementId, p.codice AS codice_prescrizione
            """
            nodes_result2 = session.run(nodes_query2, codice_malattia=codice_malattia)  # Parametro passato correttamente
            nodes2 = format_disease_nodes(nodes_result2)
            
            # Parte 1: Query per le relazioni tra malattie
            relationships_query1 = """
            MATCH (m:Malattia {codice: $codice_malattia})-[r:ASSOCIATA_A]-(m2:Malattia)
            RETURN elementId(m) AS disease1_elementId, elementId(m2) AS disease2_elementId, SUM(r.count) AS numero_associazioni
            """
            relationships_result1 = session.run(relationships_query1, codice_malattia=codice_malattia)  # Parametro passato correttamente
            relationships1 = format_disease_relationships(relationships_result1)

            # Parte 2: Query per le relazioni tra malattia e prescrizioni
            relationships_query2 = """
            MATCH (m:Malattia {codice: $codice_malattia})-[r:CURATA_CON]->(p:Prescrizione)
            RETURN elementId(m) AS disease_elementId, elementId(p) AS prescription_elementId, COUNT(r) AS numero_prescrizioni, 
                COLLECT(r.descrizione_prescrizione)[0] AS descrizione_piu_frequente
            """
            relationships_result2 = session.run(relationships_query2, codice_malattia=codice_malattia)  # Parametro passato correttamente
            relationships2 = format_disease_relationships(relationships_result2)

            return {
                "nodes": nodes1+nodes2, 
                "relationships": relationships1+relationships2
            }
