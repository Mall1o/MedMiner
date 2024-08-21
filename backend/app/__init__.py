from flask import Flask
from .extensions import neo4j_db
from .routes.graph_routes import graph_bp
#from .routes.user_routes import user_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Inizializza le estensioni
    neo4j_db.init_app(app)

    # Registra le blueprint
    app.register_blueprint(graph_bp)
    #app.register_blueprint(user_bp)

    return app
