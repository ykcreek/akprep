import requests
import os

PROJECT_ID = os.getenv("PROJECT_ID")
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


# -------------------------
# Get single document
# -------------------------
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


# -------------------------
# Update document
# -------------------------
def firestore_update_doc(collection, doc_id, data: dict):
    url = f"{BASE_URL}/{collection}/{doc_id}?updateMask.fieldPaths=*"

    firestore_data = {
        "fields": {
            key: {"stringValue": str(value)}  # simple conversion
            for key, value in data.items()
        }
    }

    res = requests.patch(url, json=firestore_data)

    return res.status_code == 200
