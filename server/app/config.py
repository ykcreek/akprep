import os
from dotenv import load_dotenv
from google.cloud import firestore
from flask_mail import Mail

load_dotenv()

mail = Mail()

SECRET = os.getenv("JWT_SECRET")

def load_config(app):
    app.db = firestore.Client()

    app.config["STRIPE_SECRET_KEY"] = os.getenv("STRIPE_SECRET_KEY")
    app.config["YOUR_DOMAIN"] = os.getenv("YOUR_DOMAIN", "http://localhost:5173")

    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USERNAME"] = os.getenv("EMAIL_ADDRESS")
    app.config["MAIL_PASSWORD"] = os.getenv("EMAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.getenv("EMAIL_ADDRESS")

    app.config["PLAN_URL_STARTER"] = os.getenv("PLAN_URL_STARTER")
    app.config["PLAN_URL_GROWTH"] = os.getenv("PLAN_URL_GROWTH")
    app.config["PLAN_URL_PREMIUM"] = os.getenv("PLAN_URL_PREMIUM")


    # Firestore client
    app.db = firestore.Client()

    # Initialize mail extension
    mail.init_app(app)
