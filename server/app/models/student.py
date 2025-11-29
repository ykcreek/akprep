import requests
import uuid
import os

PROJECT_ID = os.getenv("PROJECT_ID")
API_KEY = os.getenv("API_KEY")

def save_student_to_db(form):
    url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/students?key={API_KEY}"

    # Convert Python dict → Firestore REST format
    fields = {}

    for key, value in form.items():
        if isinstance(value, bool):
            fields[key] = {"booleanValue": value}
        else:
            fields[key] = {"stringValue": str(value)}
    fields["seen"] = {"booleanValue": False}
    payload = {
        "fields": fields
    }

    response = requests.post(url, json=payload)

    if response.status_code not in (200, 201):
        print("Firestore Error:", response.text)
        raise Exception("Firestore write failed")

    data = response.json()

    # Firestore returns full document path
    document_name = data["name"]

    # extract ID from: projects/.../documents/students/<ID>
    document_id = document_name.split("/")[-1]

    return document_id
