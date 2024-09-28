import os
import shutil

class UtilsModel:
    # Definiamo il percorso della cartella di importazione di Neo4j
    NEO4J_IMPORT_FOLDER = os.path.expanduser("~/.Neo4jDesktop/relate-data/dbmss/dbms-b5482354-1dbb-4741-b951-fcc24bdeb90f/import")
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
            WITH DISTINCT [label IN labels(m) WHERE label <> 'Malattia'] AS additional_labels, m.descrizione_malattia AS Descrizione
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
            RETURN m.codice AS CodiceMalattia, m.descrizione_malattia AS DescrizioneMalattia

            """
            
            result = session.run(query, group_name=group_name)
            diseases_list = []
            if result:
                for record in result:
                    diseases_info={
                        "codice": record["CodiceMalattia"],
                        "descrizione_malattia": record["DescrizioneMalattia"]
                    }
                    diseases_list.append(diseases_info)
                return diseases_list  
            else:
                return "Nessun risultato trovato."  

    
    def create_database(self, db_name):
        with self.driver.session(database="system") as session:
            # Verifica se il database esiste già
            result = session.run("SHOW DATABASES YIELD name")
            databases = [record["name"] for record in result]
            if db_name not in databases:
                session.run(f"CREATE DATABASE {db_name}")
                print(f"Database '{db_name}' creato con successo.")
            else:
                print(f"Database '{db_name}' esiste già.")
    
    def execute_query(self, query):
        try:
            with self.driver.session() as session:
                result = session.run(query)
                return result
        except Exception as e:
            print(f"Errore nell'esecuzione della query: {str(e)}")
            return None
    
    def get_neo4j_import_path(self):
        # Imposta il percorso della cartella di importazione di Neo4j in modo dinamico
        import_path = os.path.expanduser("~/.Neo4jDesktop/relate-data/dbmss/dbms-b5482354-1dbb-4741-b951-fcc24bdeb90f/import")
        return import_path

    def copy_to_neo4j_import(self, file_path):
        # Definiamo il percorso della cartella di importazione di Neo4j
        NEO4J_IMPORT_FOLDER = os.path.expanduser("~/.Neo4jDesktop/relate-data/dbmss/dbms-b5482354-1dbb-4741-b951-fcc24bdeb90f/import")
        file_name = os.path.basename(file_path)
        destination_path = os.path.join(NEO4J_IMPORT_FOLDER, file_name)

        # Verifica se il file di origine e destinazione sono gli stessi
        if os.path.abspath(file_path) == os.path.abspath(destination_path):
            print(f"Il file '{file_path}' è già nella destinazione di importazione Neo4j.")
            return destination_path  # Restituisci il percorso, senza copiare nuovamente il file

        try:
            shutil.copy(file_path, destination_path)
            print(f"File copiato con successo in {destination_path}")
            return destination_path
        except Exception as e:
            print(f"Errore nel copiare il file: {e}")
            return None



    def load_csv_to_neo4j(self, file_path, db_name):
        # Copia il file nella directory di importazione di Neo4j
        csv_path_in_neo4j = self.copy_to_neo4j_import(file_path)

        if not csv_path_in_neo4j:
            return "Errore nella copia del file CSV."

        # Usa solo il nome del file nella query
        file_name = os.path.basename(csv_path_in_neo4j)
        file_path = file_path.replace("\\", "/")
        queries = [
            f"""
            // Creazione Paziente
            LOAD CSV WITH HEADERS FROM 'file:///{file_name}' AS row
            WITH DISTINCT row.CODICE_FISCALE_ASSISTITO AS codice_fiscale_assistito,
                row.ANNO_NASCITA AS anno_nascita, 
                row.SESSO AS sesso, 
                row.CAP_RESIDENZA AS cap_residenza
            WHERE codice_fiscale_assistito IS NOT NULL
            MERGE (p:Paziente {{codice_fiscale_assistito: codice_fiscale_assistito}})
            ON CREATE SET p.anno_nascita = toInteger(anno_nascita),
                        p.sesso = sesso,
                        p.cap_residenza = toInteger(cap_residenza)
            """,

            f"""
            // Creazione Prescrizione
            LOAD CSV WITH HEADERS FROM 'file:///{file_name}' AS row
            WITH DISTINCT row.CODICE_PRESCRIZIONE AS codice_prescrizione
            WHERE codice_prescrizione IS NOT NULL
            MERGE (pr:Prescrizione {{codice: codice_prescrizione}})
            """,

            f"""
            // Creazione Malattia
            LOAD CSV WITH HEADERS FROM 'file:///{file_name}' AS row
            WITH DISTINCT row.ICD9_CM AS codice_malattia, row.DESCRIZIONE_MALATTIA AS descrizione_malattia
            WHERE codice_malattia IS NOT NULL
            MERGE (m:Malattia {{codice: codice_malattia}})
            ON CREATE SET m.descrizione_malattia = descrizione_malattia
            """,

            f"""
            // Creazione relazione DIAGNOSTICATO_CON tra Paziente e Malattia
            LOAD CSV WITH HEADERS FROM 'file:///{file_name}' AS row
            WITH row.CODICE_FISCALE_ASSISTITO AS codice_fiscale_assistito,
                row.ICD9_CM AS codice_malattia, 
                row.DATA_PRESCRIZIONE AS data_prescrizione,
                row.DATA_PRIMA_DIAGNOSI AS data_prima_diagnosi,
                row.DATA_ULTIMA_DIAGNOSI AS data_ultima_diagnosi
            WHERE codice_fiscale_assistito IS NOT NULL AND codice_malattia IS NOT NULL
            MERGE (p:Paziente {{codice_fiscale_assistito: codice_fiscale_assistito}})
            MERGE (m:Malattia {{codice: codice_malattia}})
            MERGE (p)-[r:DIAGNOSTICATO_CON]->(m)
            ON CREATE SET r.num_diagnosi = 1,
                        r.data_prima_diagnosi = data_prima_diagnosi,
                        r.data_ultima_diagnosi = data_ultima_diagnosi
            ON MATCH SET r.data_prima_diagnosi = CASE 
                                                    WHEN r.data_prima_diagnosi > data_prescrizione THEN data_prescrizione 
                                                    ELSE r.data_prima_diagnosi 
                                                END,
                        r.data_ultima_diagnosi = CASE 
                                                    WHEN r.data_ultima_diagnosi < data_prescrizione THEN data_prescrizione 
                                                    ELSE r.data_ultima_diagnosi 
                                                END,
                        r.num_diagnosi = r.num_diagnosi + CASE 
                                                            WHEN r.data_prima_diagnosi <> data_prescrizione 
                                                            AND r.data_ultima_diagnosi <> data_prescrizione THEN 1 
                                                            ELSE 0 
                                                            END
            """,

            f"""
            // Creazione relazione CURATA_CON tra Malattia e Prescrizione
            LOAD CSV WITH HEADERS FROM 'file:///{file_name}' AS row
            WITH row.ICD9_CM AS codice_malattia, 
                row.CODICE_PRESCRIZIONE AS codice_prescrizione,
                row.DESCRIZIONE_PRESCRIZIONE AS descrizione_prescrizione,
                row.CODICE_REGIONALE_MEDICO AS codice_regionale_medico,
                row.DATA_PRESCRIZIONE AS data_prescrizione,
                row.TIPO_PRESCRIZIONE AS tipo_prescrizione,
                row.QUANTITA_PRESCRIZIONE AS quantita_prescrizione,
                row.CODICE_FISCALE_ASSISTITO AS codice_fiscale_assistito,
                row.ETA AS eta_al_momento
            WHERE codice_malattia IS NOT NULL AND codice_prescrizione IS NOT NULL
            MATCH (m:Malattia {{codice: codice_malattia}})
            MATCH (pr:Prescrizione {{codice: codice_prescrizione}})
            CREATE (m)-[r:CURATA_CON]->(pr)
            SET r.descrizione_prescrizione = descrizione_prescrizione,
                r.codice_regionale_medico = codice_regionale_medico,
                r.data_prescrizione = data_prescrizione,
                r.tipo_prescrizione = tipo_prescrizione,
                r.quantita_prescrizione = toFloat(quantita_prescrizione),
                r.codice_fiscale_assistito = codice_fiscale_assistito,
                r.eta_al_momento = toInteger(eta_al_momento)
            """,

            f"""
            // Creazione relazione ASSOCIATA_A tra Malattie
            LOAD CSV WITH HEADERS FROM 'file:///{file_name}' AS row
            WITH row.CODICE_FISCALE_ASSISTITO AS codice_fiscale_assistito,
                row.CODICE_PRESCRIZIONE AS codice_prescrizione,
                row.ICD9_CM AS codice_malattia,
                row.DATA_PRESCRIZIONE AS data_prescrizione
            WHERE codice_fiscale_assistito IS NOT NULL AND codice_prescrizione IS NOT NULL AND codice_malattia IS NOT NULL
            WITH codice_fiscale_assistito, codice_prescrizione, collect(DISTINCT codice_malattia) AS malattie, max(data_prescrizione) AS data_ultima_associazione
            UNWIND range(0, size(malattie) - 2) AS i
            UNWIND range(i + 1, size(malattie) - 1) AS j
            WITH codice_fiscale_assistito, codice_prescrizione, malattie[i] AS malattia1, malattie[j] AS malattia2, data_ultima_associazione
            MATCH (m1:Malattia {{codice: malattia1}}), (m2:Malattia {{codice: malattia2}})
            MERGE (m1)-[r:ASSOCIATA_A {{codice_fiscale_assistito: codice_fiscale_assistito, codice_prescrizione: codice_prescrizione}}]->(m2)
            ON CREATE SET r.count = 1,
                        r.data_ultima_associazione = data_ultima_associazione
            ON MATCH SET r.count = r.count + 1,
                        r.data_ultima_associazione = data_ultima_associazione
            """
        ]

        # Esegui ogni query separatamente e verifica se funziona
        for i, query in enumerate(queries, 1):
            print(f"Eseguendo query {i}...")
            result = self.execute_query(query)
            if result is None:
                print(f"Errore nella query {i}.")
                return f"Errore durante l'esecuzione della query {i}"
            else:
                print(f"Query {i} eseguita con successo.")

        return "Tutte le query eseguite con successo."
    
    def get_db_list(self):
        with self.driver.session(database="system") as session:
            result = session.run("SHOW DATABASES YIELD name")
            databases = [record["name"] for record in result]
            return databases