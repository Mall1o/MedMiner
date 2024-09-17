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

