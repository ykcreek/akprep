import requests
import os

PROJECT_ID = os.getenv("PROJECT_ID")
API_KEY = os.getenv("API_KEY")
BASE_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents"


def firestore_get_collection(collection):
    url = f"{BASE_URL}/{collection}"
    res = requests.get(url)
    data = res.json()

    documents = []

    for doc in data.get("documents", []):
        doc_id = doc["name"].split("/")[-1]

        fields = {
            key: list(value.values())[0]
            for key, value in doc["fields"].items()
        }

        documents.append({"id": doc_id, **fields})

    return documents

def firestore_get_doc(collection, doc_id):
    url = f"{BASE_URL}/{collection}/{doc_id}"

    res = requests.get(url)
    data = res.json()

    if "fields" not in data:
        return None

    fields = {
        key: list(value.values())[0]
        for key, value in data["fields"].items()
    }

    return {"id": doc_id, **fields}

def firestore_update_doc(collection: str, doc_id: str, data: dict):
    """
    Update Firestore document fields dynamically using updateMask.
    - collection: Firestore collection name (e.g., 'students')
    - doc_id: Firestore document ID
    - data: { fieldName: value }
    """

    if not data:
        return {"success": False, "error": "No fields provided"}

    # Build update mask params
    mask = "&".join([f"updateMask.fieldPaths={key}" for key in data.keys()])

    # Build Firestore REST payload in correct format
    firestore_data = {
        "fields": {}
    }

    for key, value in data.items():
        if isinstance(value, bool):
            firestore_data["fields"][key] = {"booleanValue": value}
        elif isinstance(value, int) or isinstance(value, float):
            firestore_data["fields"][key] = {"integerValue": value}
        else:
            firestore_data["fields"][key] = {"stringValue": str(value)}

    url = f"{BASE_URL}/{collection}/{doc_id}?{mask}"

    res = requests.patch(url, json=firestore_data)

    if res.status_code not in (200, 201):
        return {
            "success": False,
            "error": f"Firestore error: {res.text}"
        }

    # Clean response fields
    updated_fields = res.json().get("fields", {})
    cleaned = {k: v.get(list(v.keys())[0]) for k, v in updated_fields.items()}
    cleaned["id"] = doc_id

    return {"success": True, "data": cleaned}

def create_firebase_user(email, password):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}"

    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }

    res = requests.post(url, json=payload)
    data = res.json()

    if res.status_code != 200:
        raise Exception(data.get("error", {}).get("message", "Signup failed"))

    return data

def save_user_to_firestore(uid, name, email, role, linked_form_id):
    url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/users/{uid}?key={API_KEY}"

    payload = {
        "fields": {
            "email": {"stringValue": email},
            "name": {"stringValue": name},
            "role": {"stringValue": role},
            "linkedFormId": {"stringValue": linked_form_id},
        }
    }

    res = requests.patch(url, json=payload)

    if res.status_code not in (200, 201):
        print("Firestore Error:", res.text)
        raise Exception("Firestore write failed")

    return True

def email_exists(email):
    url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents:runQuery?key={API_KEY}"

    payload = {
        "structuredQuery": {
            "from": [{"collectionId": "users"}],
            "where": {
                "fieldFilter": {
                    "field": {"fieldPath": "email"},
                    "op": "EQUAL",
                    "value": {"stringValue": email}
                }
            }
        }
    }

    res = requests.post(url, json=payload)
    results = res.json()

    for doc in results:
        if "document" in doc:
            return True

    return False