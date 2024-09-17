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

def format_relationships(relationships_result):
    added_relationships = set()
    relationships = []
    
    for record in relationships_result:
        diagnosticato_key = (record.get("patient_elementId"), record.get("disease_elementId"), "DIAGNOSTICATO_CON")
        curata_key = (record.get("disease_elementId"), record.get("prescription_elementId"), "CURATA_CON")
        associata_key = (record.get("disease_elementId"), record.get("disease_elementId"), "ASSOCIATA_A")
        
        if diagnosticato_key[0] and diagnosticato_key[1] and diagnosticato_key not in added_relationships:
            if record.get("r1"):  # Verifica se esiste 'r1'
                relationships.append({
                    "start_id": record["patient_elementId"],
                    "end_id": record["disease_elementId"],
                    "type": "DIAGNOSTICATO_CON",
                    "properties": dict(record["r1"])
                })
                added_relationships.add(diagnosticato_key)
        
        if curata_key[0] and curata_key[1] and curata_key not in added_relationships:
            if record.get("r2"):  # Verifica se esiste 'r2'
                relationships.append({
                    "start_id": record["disease_elementId"],
                    "end_id": record["prescription_elementId"],
                    "type": "CURATA_CON",
                    "properties": dict(record["r2"])
                })
                added_relationships.add(curata_key)

        if associata_key[0] and associata_key[1] and associata_key not in added_relationships:
            if record.get("r3"):  # Verifica se esiste 'r3'
                relationships.append({
                    "start_id": record["disease_elementId"],
                    "end_id": record["disease_elementId"],
                    "type": "ASSOCIATA_A",
                    "properties": dict(record["r3"])
                })
                added_relationships.add(associata_key)
    
    return relationships
