# json_formatter.py

def format_nodes(nodes_result):
    added_patients = set()
    added_diseases = set()
    added_prescriptions = set()
    nodes = []
    
    for record in nodes_result:
        if record.get("patient_elementId") and record["patient_elementId"] not in added_patients:
            if record.get("p"):  # Verifica se esiste 'p'
                nodes.append({
                    "id": record["patient_elementId"],
                    "type": "Paziente",
                    "properties": dict(record["p"])
                })
                added_patients.add(record["patient_elementId"])
        
        if record.get("disease_elementId") and record["disease_elementId"] not in added_diseases:
            if record.get("m"):  # Verifica se esiste 'm'
                nodes.append({
                    "id": record["disease_elementId"],
                    "type": "Malattia",
                    "properties": dict(record["m"])
                })
                added_diseases.add(record["disease_elementId"])
        
        if record.get("prescription_elementId") and record["prescription_elementId"] not in added_prescriptions:
            if record.get("pr"):  # Verifica se esiste 'pr'
                nodes.append({
                    "id": record["prescription_elementId"],
                    "type": "Prescrizione",
                    "properties": dict(record["pr"])
                })
                added_prescriptions.add(record["prescription_elementId"])

    return nodes

def format_disease_nodes(nodes_result):
    nodes = []  # Lista per contenere i nodi formattati
    added_diseases = set()  # Set per tenere traccia delle malattie già aggiunte

    # Itera attraverso i risultati della query
    for record in nodes_result:
        # Verifica se la prima malattia 'm' è già stata aggiunta
        disease_elementId = record.get("disease_elementId")
        if disease_elementId and disease_elementId not in added_diseases:
            nodes.append({
                "id": disease_elementId,
                "type": "Malattia",
                "properties": {
                    "codice": record.get("codiceMalattia"),
                    "descrizione": record.get("descrizioneMalattia")
                }
            })
            added_diseases.add(disease_elementId)

        # Verifica se la seconda malattia 'm2' è già stata aggiunta
        disease2_elementId = record.get("disease2_elementId")
        if disease2_elementId and disease2_elementId not in added_diseases:
            nodes.append({
                "id": disease2_elementId,
                "type": "Malattia",
                "properties": {
                    "codice": record.get("codiceMalattia2"),
                    "descrizione": record.get("descrizioneMalattia2")
                }
            })
            added_diseases.add(disease2_elementId)

    return nodes


def format_relationships(relationships_result):
    added_relationships = set()
    relationships = []
    
    for record in relationships_result:
        # ID separati per una gestione più pulita
        patient_id = record.get("patient_elementId")
        disease_id = record.get("disease_elementId")
        prescription_id = record.get("prescription_elementId")
        other_disease_id = record.get("other_disease_elementId")
        
        diagnosticato_key = (patient_id, disease_id, "DIAGNOSTICATO_CON")
        curata_key = (disease_id, prescription_id, "CURATA_CON")
        
        # Gestione della relazione DIAGNOSTICATO_CON
        if patient_id and disease_id and diagnosticato_key not in added_relationships:
            if record.get("r1"):  # Verifica se esiste 'r1'
                relationships.append({
                    "start_id": patient_id,
                    "end_id": disease_id,
                    "type": "DIAGNOSTICATO_CON",
                    "properties": dict(record["r1"])
                })
                added_relationships.add(diagnosticato_key)
        
        # Gestione della relazione CURATA_CON
        if disease_id and prescription_id and curata_key not in added_relationships:
            if record.get("r2"):  # Verifica se esiste 'r2'
                relationships.append({
                    "start_id": disease_id,
                    "end_id": prescription_id,
                    "type": "CURATA_CON",
                    "properties": dict(record["r2"])
                })
                added_relationships.add(curata_key)

        # Gestione della relazione ASSOCIATA_A
        if disease_id and other_disease_id:
            normalized_key = tuple(sorted([disease_id, other_disease_id]))  # Normalizzazione per evitare duplicati
            if normalized_key not in added_relationships:
                if record.get("r3"):  # Verifica se esiste 'r3'
                    relationships.append({
                        "start_id": disease_id,
                        "end_id": other_disease_id,
                        "type": "ASSOCIATA_A",
                        "properties": dict(record["r3"])
                    })
                    added_relationships.add(normalized_key)
    
    return relationships

def format_curata_relationships(relationships_result):
    added_relationships = set()
    relationships = []
    
    for record in relationships_result:
        disease_id = record.get("disease_elementId")
        prescription_id = record.get("prescription_elementId")
        numero_di_cure = record.get("NumeroDiCure")  # Conteggio delle relazioni
        descrizione_prescrizione = record.get("descrizione_prescrizione")  # Descrizione della prescrizione
        
        # Chiave per evitare duplicati
        curata_key = (disease_id, prescription_id, "CURATA_CON")
        
        # Gestione della relazione CURATA_CON
        if disease_id and prescription_id and curata_key not in added_relationships:
            relationships.append({
                "start_id": disease_id,
                "end_id": prescription_id,
                "type": "CURATA_CON",
                "properties": {
                    "NumeroDiCure": numero_di_cure,  # Numero di cure
                    "DescrizionePrescrizione": descrizione_prescrizione  # Descrizione della prescrizione
                }
            })
            added_relationships.add(curata_key)

    return relationships

def format_associata_relationships(relationships_result):
    added_relationships = set()  # Set per evitare duplicati
    relationships = []  # Lista finale delle relazioni

    for record in relationships_result:
        disease_id = record.get("disease_elementId")
        disease2_id = record.get("disease2_elementId")
        somma_counter = record.get("SommaCounter")  # Somma dei contatori delle relazioni

        # Chiave per evitare duplicati
        associata_key = (disease_id, disease2_id, "ASSOCIATA_A")
        
        # Gestione della relazione ASSOCIATA_A
        if disease_id and disease2_id and associata_key not in added_relationships:
            relationships.append({
                "start_id": disease_id,
                "end_id": disease2_id,
                "type": "ASSOCIATA_A",
                "properties": {
                    "SommaCounter": somma_counter  # Somma del contatore delle relazioni
                }
            })
            added_relationships.add(associata_key)

    return relationships

