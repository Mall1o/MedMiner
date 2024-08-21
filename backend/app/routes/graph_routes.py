from flask import Blueprint, jsonify
from ..extensions import neo4j_db
from ..services.graph_service import GraphService

graph_bp = Blueprint('graph', __name__)

@graph_bp.route('/graph', methods=['GET'])
def get_graph():
    graph_service = GraphService(neo4j_db.driver)
    graph = graph_service.get_graph()
    
    # Formattazione della risposta
    formatted_graph = {
        "nodes": [dict(node) for node in graph["nodes"]],
        "relationships": [dict(relationship) for relationship in graph["relationships"]]
    }
    
    return jsonify(formatted_graph), 200
