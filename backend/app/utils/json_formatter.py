# json_formatter.py

def format_nodes(nodes_result):
    added_patients = set()
    added_diseases = set()
    added_prescriptions = set()
    nodes = []
    
    for record in nodes_result:
        if record["patient_elementId"] not in added_patients:
            nodes.append({
                "id": record["patient_elementId"],
                "type": "Paziente",
                "properties": dict(record["p"])
            })
            added_patients.add(record["patient_elementId"])
        
        if record["disease_elementId"] not in added_diseases:
            nodes.append({
                "id": record["disease_elementId"],
                "type": "Malattia",
                "properties": dict(record["m"])
            })
            added_diseases.add(record["disease_elementId"])
        
        if record["prescription_elementId"] not in added_prescriptions:
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
        diagnosticato_key = (record["patient_elementId"], record["disease_elementId"], "DIAGNOSTICATO_CON")
        prescrizione_key = (record["patient_elementId"], record["prescription_elementId"], "RICEVE_PRESCRIZIONE")
        
        if diagnosticato_key not in added_relationships:
            relationships.append({
                "start_id": record["patient_elementId"],
                "end_id": record["disease_elementId"],
                "type": "DIAGNOSTICATO_CON",
                "properties": dict(record["r1"])
            })
            added_relationships.add(diagnosticato_key)
        
        if prescrizione_key not in added_relationships:
            relationships.append({
                "start_id": record["patient_elementId"],
                "end_id": record["prescription_elementId"],
                "type": "RICEVE_PRESCRIZIONE",
                "properties": dict(record["r2"])
            })
            added_relationships.add(prescrizione_key)

    return relationships
