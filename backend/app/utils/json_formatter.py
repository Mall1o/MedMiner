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
    added_prescriptions = set()  # Set per tenere traccia delle prescrizioni già aggiunte

    for record in nodes_result:
        # Gestione della malattia (disease1_elementId)
        disease1_elementId = record.get("disease1_elementId")
        codice_malattia_input = record.get("codice_malattia_input")
        if disease1_elementId and codice_malattia_input and disease1_elementId not in added_diseases:
            nodes.append({
                "id": disease1_elementId,
                "type": "Malattia",
                "properties": {
                    "codice": codice_malattia_input
                }
            })
            added_diseases.add(disease1_elementId)

        # Gestione della malattia associata (disease2_elementId)
        disease2_elementId = record.get("disease2_elementId")
        codice_malattia_associata = record.get("codice_malattia_associata")
        if disease2_elementId and codice_malattia_associata and disease2_elementId not in added_diseases:
            nodes.append({
                "id": disease2_elementId,
                "type": "Malattia",
                "properties": {
                    "codice": codice_malattia_associata
                }
            })
            added_diseases.add(disease2_elementId)

        # Gestione delle prescrizioni (prescription_elementId)
        prescription_elementId = record.get("prescription_elementId")
        codice_prescrizione = record.get("codice_prescrizione")
        if prescription_elementId and codice_prescrizione and prescription_elementId not in added_prescriptions:
            nodes.append({
                "id": prescription_elementId,
                "type": "Prescrizione",
                "properties": {
                    "codice": codice_prescrizione
                }
            })
            added_prescriptions.add(prescription_elementId)

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
        other_disease_id = record.get("other_disease_elementId")
        descrizione_prescrizione = record.get("descrizione_prescrizione")
        numero_di_cure = record.get("NumeroDiCure")
        associata_relationship = record.get("r1")  # Relazione ASSOCIATA_A opzionale
        
        # Gestione della relazione CURATA_CON
        curata_key = (disease_id, prescription_id, "CURATA_CON")
        
        if disease_id and prescription_id and curata_key not in added_relationships:
            relationships.append({
                "start_id": disease_id,
                "end_id": prescription_id,
                "type": "CURATA_CON",
                "properties": {
                    "NumeroDiCure": numero_di_cure,
                    "DescrizionePrescrizione": descrizione_prescrizione
                }
            })
            added_relationships.add(curata_key)
        
        # Gestione della relazione ASSOCIATA_A se esiste
        if disease_id and other_disease_id and associata_relationship:
            associata_key = (disease_id, other_disease_id, "ASSOCIATA_A")
            
            if associata_key not in added_relationships:
                relationships.append({
                    "start_id": disease_id,
                    "end_id": other_disease_id,
                    "type": "ASSOCIATA_A",
                    "properties": dict(associata_relationship)  # Aggiunge tutte le proprietà della relazione
                })
                added_relationships.add(associata_key)

    return relationships


def format_disease_relationships(relationships_result):
    added_relationships = set()  # Set per evitare duplicati
    relationships = []  # Lista finale delle relazioni

    for record in relationships_result:
        # Gestione delle relazioni tra malattie (ASSOCIATA_A)
        disease1_elementId = record.get("disease1_elementId")
        disease2_elementId = record.get("disease2_elementId")
        numero_associazioni = record.get("numero_associazioni")
        
        if disease1_elementId and disease2_elementId:
            associata_key = (disease1_elementId, disease2_elementId, "ASSOCIATA_A")
            if associata_key not in added_relationships:
                relationships.append({
                    "start_id": disease1_elementId,
                    "end_id": disease2_elementId,
                    "type": "ASSOCIATA_A",
                    "properties": {
                        "numero_associazioni": numero_associazioni if numero_associazioni else 1
                    }
                })
                added_relationships.add(associata_key)

        # Gestione delle relazioni tra malattia e prescrizione (CURATA_CON)
        disease_elementId = record.get("disease_elementId")
        prescription_elementId = record.get("prescription_elementId")
        numero_prescrizioni = record.get("numero_prescrizioni")
        descrizione_piu_frequente = record.get("descrizione_piu_frequente")

        if disease_elementId and prescription_elementId:
            curata_key = (disease_elementId, prescription_elementId, "CURATA_CON")
            if curata_key not in added_relationships:
                relationships.append({
                    "start_id": disease_elementId,
                    "end_id": prescription_elementId,
                    "type": "CURATA_CON",
                    "properties": {
                        "numero_prescrizioni": numero_prescrizioni if numero_prescrizioni else 1,
                        "descrizione_piu_frequente": descrizione_piu_frequente or "N/A"
                    }
                })
                added_relationships.add(curata_key)

    return relationships
