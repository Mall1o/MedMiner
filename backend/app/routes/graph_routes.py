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


#roba vecchia

@graph_bp.route('/graph/user', methods=['GET'])
def get_user_graph():
    codice_fiscale_assistito = request.args.get('codice_fiscale_assistito')
    if not codice_fiscale_assistito:
        return jsonify({'error': 'codice_fiscale_assistito parameter is required'}), 400

    graph_service = GraphService(neo4j_db.driver)
    user_graph = graph_service.get_user_graph(codice_fiscale_assistito)

    formatted_graph = {
        "nodes": [dict(node) for node in user_graph["nodes"]],
        "relationships": [dict(relationship) for relationship in user_graph["relationships"]]
    }

    return jsonify(formatted_graph), 200

@graph_bp.route('/graph/prescription_dates', methods=['GET'])
def get_all_dates():
    graph_service = GraphService(neo4j_db.driver)
    dates = graph_service.get_all_dates()
    return jsonify(dates), 200

@graph_bp.route('/graph/prescriptions', methods=['GET'])
def get_prescriptions_by_date():
    selected_date = request.args.get('date')
    if not selected_date:
        return jsonify({'error': 'date parameter is required'}), 400

    graph_service = GraphService(neo4j_db.driver)
    prescriptions = graph_service.get_prescriptions_by_date(selected_date)
    
    formatted_graph = {
        "nodes": [dict(node) for node in prescriptions["nodes"]],
        "relationships": [dict(relationship) for relationship in prescriptions["relationships"]]
    }

    return jsonify(formatted_graph), 200

@graph_bp.route('/graph/prescriptions_range', methods=['GET'])
def get_prescriptions_by_date_range():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    if not start_date or not end_date:
        return jsonify({'error': 'start_date and end_date parameters are required'}), 400

    graph_service = GraphService(neo4j_db.driver)
    prescriptions = graph_service.get_prescriptions_by_date_range(start_date, end_date)
    
    formatted_graph = {
        "nodes": [dict(node) for node in prescriptions["nodes"]],
        "relationships": [dict(relationship) for relationship in prescriptions["relationships"]]
    }

    return jsonify(formatted_graph), 200
