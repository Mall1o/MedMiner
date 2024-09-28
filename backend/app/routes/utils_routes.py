import os
import time
import shutil
from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
from ..extensions import neo4j_db
from ..services.utils_service import UtilsService
from flask_cors import CORS

utils_bp = Blueprint('utils', __name__)
CORS(utils_bp)

# Definiamo il percorso della cartella dove memorizzare i CSV
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../../uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


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

@utils_bp.route('/diseases_groups', methods=['GET'])
def get_disease_group_list():
    service = UtilsService(neo4j_db.driver)
    disease_group_list = service.get_disease_group_list()
    
    return jsonify(disease_group_list), 200

@utils_bp.route('/diseases', methods=['POST'])
def get_disease_group():
    group_name = request.json.get('gruppo')
    if not group_name:
        return jsonify({'error': 'Missing group name'}), 400
    
    service = UtilsService(neo4j_db.driver)
    disease_group = service.get_disease_group(group_name)
    print(disease_group)
    return jsonify(disease_group), 200

@utils_bp.route('/create-database', methods=['POST'])
def create_database():
    data = request.json
    db_name = data.get('dbName')
    
    if not db_name:
        return jsonify({'error': 'Missing database name'}), 400

    service = UtilsService(neo4j_db.driver)
    service.create_and_switch_database(db_name)
    
    return jsonify({'message': f"Database '{db_name}' creato e attivato con successo"}), 200

@utils_bp.route('/load-csv', methods=['POST'])
def load_csv_to_neo4j():
    data = request.json
    file_path = data.get('filePath')
    db_name = data.get('dbName')

    if not file_path or not db_name:
        return jsonify({'error': 'Missing file path or database name'}), 400

    service = UtilsService(neo4j_db.driver)
    result = service.load_csv_to_neo4j(file_path, db_name)
    
    return jsonify(result), 200

@utils_bp.route('/upload-file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Nessun file caricato'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'Nessun file selezionato'}), 400

    # Crea un nome di file unico
    service = UtilsService(neo4j_db.driver)
    unique_filename = service.get_unique_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)

    try:
        # Salva il file nella cartella uploads
        file.save(file_path)

        # Copia il file nella cartella di importazione di Neo4j
        service = UtilsService(neo4j_db.driver)
        neo4j_file_path = service.model.copy_to_neo4j_import(file_path)

        if neo4j_file_path:
            print(f"File copiato in {neo4j_file_path}")
            return jsonify({'message': 'File caricato con successo', 'filePath': neo4j_file_path}), 200
        else:
            return jsonify({'error': 'Errore nella copia del file in Neo4j'}), 500

    except Exception as e:
        print(f"Errore nel caricamento del file: {e}")
        return jsonify({'error': str(e)}), 500

@utils_bp.route('/db-list', methods=['GET'])
def get_db_list():
    service = UtilsService(neo4j_db.driver)
    db_list = service.get_db_list()
    
    return jsonify(db_list), 200