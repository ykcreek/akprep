from flask import Flask
from flask_cors import CORS
from .config import load_config
from .routes.payments import payments_bp
from .routes.email import email_bp
from .routes.interest_form import interest_form
from .routes.admin import admin_bp

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='public')
    load_config(app)

    CORS(app)

    app.register_blueprint(payments_bp)
    app.register_blueprint(email_bp)
    app.register_blueprint(interest_form)
    app.register_blueprint(admin_bp)

    @app.route("/")
    def root():
        return {"message": "You have reached vita-prep server API"}

    return app
