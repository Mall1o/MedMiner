from flask import Blueprint, jsonify, request
from ..extensions import neo4j_db
from ..services.graph_service import GraphService
from flask_cors import CORS

graph_bp = Blueprint('graph', __name__)
CORS(graph_bp)

@graph_bp.route('/graph', methods=['GET'])
def get_graph():
    graph_service = GraphService(neo4j_db.driver)
    graph = graph_service.get_graph()
    
    return jsonify(graph), 200

@graph_bp.route('/graph/patient', methods=['POST'])
def get_patient_graph():
    codice_fiscale = request.json.get('codice_fiscale')
    if not codice_fiscale:
        return jsonify({'error': 'codice_fiscale parameter is required'}), 400

    graph_service = GraphService(neo4j_db.driver)
    graph = graph_service.get_patient_graph(codice_fiscale)
    
    return jsonify(graph), 200

@graph_bp.route('/graph/prescription', methods=['POST'])
def get_prescription_graph():
    codice_prescrizione = request.json.get('codice_prescrizione')
    print(codice_prescrizione)
    if not codice_prescrizione:
        return jsonify({'error': 'codice_prescrizione parameter is required'}), 400

    graph_service = GraphService(neo4j_db.driver)
    graph = graph_service.get_prescription_graph(codice_prescrizione)
    
    return jsonify(graph), 200

@graph_bp.route('/graph/disease', methods=['POST'])
def get_disease_graph():
    codice_malattia = request.json.get('codice_malattia')
    if not codice_malattia:
        return jsonify({'error': 'codice_malattia parameter is required'}), 400

    graph_service = GraphService(neo4j_db.driver)
    graph = graph_service.get_disease_graph(codice_malattia)
    
    return jsonify(graph), 200



