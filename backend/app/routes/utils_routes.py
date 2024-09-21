from flask import Blueprint, jsonify, request
from ..extensions import neo4j_db
from ..services.utils_service import UtilsService
from flask_cors import CORS

utils_bp = Blueprint('utils', __name__)
CORS(utils_bp)

@utils_bp.route('/degree-centrality/prescription', methods=['GET'])
def get_degree_centrality_prescription():
    service = UtilsService(neo4j_db.driver)
    result = service.get_degree_centrality_prescrizione_malattia()
    
    return jsonify(result), 200

@utils_bp.route('/degree-centrality/disese', methods=['GET'])
def get_degree_centrality_disease():
    service = UtilsService(neo4j_db.driver)
    result = service.get_degree_centrality_malattia()
    
    return jsonify(result), 200

@utils_bp.route('/stats', methods=['GET'])
def get_graph_stats():
    service = UtilsService(neo4j_db.driver)
    patient_count = service.get_patient_count()
    disease_count = service.get_disease_count()
    prescription_count = service.get_prescription_count()
    
    stats = {
        "patientCount": patient_count,
        "diseaseCount": disease_count,
        "prescriptionCount": prescription_count
    }
    
    return jsonify(stats), 200

@utils_bp.route('/patients', methods=['GET'])
def get_patient_list():
    service = UtilsService(neo4j_db.driver)
    patient_list = service.get_patient_list()
    
    return jsonify(patient_list), 200

@utils_bp.route('/betweenness/disease', methods=['GET'])
def get_betweenness_disease():
    service = UtilsService(neo4j_db.driver)
    result = service.get_betweenness_malattia()
    
    return jsonify(result), 200

@utils_bp.route('/prescriptions', methods=['GET'])
def get_prescription_list():
    service = UtilsService(neo4j_db.driver)
    prescription_list = service.get_prescription_list()
    
    return jsonify(prescription_list), 200