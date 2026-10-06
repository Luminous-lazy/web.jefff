# pyrefly: ignore [missing-import]
"""
Aashraya Impact Hub — Flask Backend API
========================================
Serves volunteer, student, donation, hub, and impact data
from a local mock_db.json file. CORS is enabled for the
Vite dev-server origin (http://localhost:5173).
"""

import json
import os
import datetime
from functools import wraps
from flask import Flask, jsonify, request  # type: ignore
from flask_cors import CORS  # type: ignore
import jwt  # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash  # type: ignore


# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("JWT_SECRET", "aashraya-super-secret-key-2026-production")

CORS(app, resources={r"/api/*": {
    "origins": ["http://localhost:5173"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

DATA_FILE = os.path.join(os.path.dirname(__file__), "mock_db.json")


def _load_db():
    """Read the JSON seed file and return the parsed dict."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_db(data):
    """Persist changes back to the JSON file."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
            else:
                token = auth_header

        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            db = _load_db()
            current_user = next((u for u in db.get("users", []) if u["email"] == data["sub"]), None)
            if not current_user:
                return jsonify({"error": "Invalid token user"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)
    return decorated



# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "aashraya-impact-hub-api"})


# ---------------------------------------------------------------------------
# Authentication & Admin
# ---------------------------------------------------------------------------
@app.route("/api/login", methods=["POST"])
def login():
    """Handle login and return a signed JWT token."""
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400

    db = _load_db()
    users = db.get("users", [])
    user = next((u for u in users if u["email"] == data["email"]), None)

    if not user or not check_password_hash(user["password_hash"], data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = jwt.encode(
        {
            "sub": user["email"],
            "role": user.get("role", "user"),
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
        },
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user": {
            "email": user["email"],
            "role": user.get("role")
        }
    })


@app.route("/api/admin/stats", methods=["GET"])
@token_required
def get_admin_stats(current_user):
    """Return administrative overview statistics."""
    db = _load_db()
    volunteers = db["volunteers"]
    students = db["students"]
    donations = db["donations"]
    impact_metrics = db["impact_metrics"]

    active_volunteers = len([v for v in volunteers if v["status"] == "active"])
    total_students = len(students)
    total_donations = len(donations)
    total_funds_raised = sum([d["amount"] for d in donations if d["type"] == "monetary" and d["amount"] is not None])

    return jsonify({
        "total_volunteers": len(volunteers),
        "active_volunteers": active_volunteers,
        "total_students": total_students,
        "total_donations": total_donations,
        "total_funds_raised": total_funds_raised,
        "monthly_growth_rate": impact_metrics.get("monthly_growth_rate", 0),
        "donor_retention_rate": impact_metrics.get("donor_retention_rate", 0)
    })



# ---------------------------------------------------------------------------
# Hubs
# ---------------------------------------------------------------------------
@app.route("/api/hubs", methods=["GET"])
def get_hubs():
    """Return all three hub summaries."""
    db = _load_db()
    hubs = list(db["hubs"].values())
    return jsonify(hubs)


@app.route("/api/hubs/<hub_id>", methods=["GET"])
def get_hub(hub_id):
    """Return a single hub by its ID."""
    db = _load_db()
    hub = db["hubs"].get(hub_id)
    if hub is None:
        return jsonify({"error": "Hub not found"}), 404
    return jsonify(hub)


# ---------------------------------------------------------------------------
# Volunteers
# ---------------------------------------------------------------------------
@app.route("/api/volunteers", methods=["GET"])
def get_volunteers():
    """
    Return volunteers, optionally filtered by hub or status.
    Query params: ?hub=education&status=active
    """
    db = _load_db()
    volunteers = db["volunteers"]

    hub_filter = request.args.get("hub")
    status_filter = request.args.get("status")

    if hub_filter:
        volunteers = [v for v in volunteers if v["hub"] == hub_filter]
    if status_filter:
        volunteers = [v for v in volunteers if v["status"] == status_filter]

    return jsonify(volunteers)


@app.route("/api/volunteers/<volunteer_id>", methods=["GET"])
def get_volunteer(volunteer_id):
    """Return a single volunteer by ID."""
    db = _load_db()
    volunteer = next((v for v in db["volunteers"] if v["id"] == volunteer_id), None)
    if volunteer is None:
        return jsonify({"error": "Volunteer not found"}), 404
    return jsonify(volunteer)


@app.route("/api/volunteers", methods=["POST"])
def create_volunteer():
    """Add a new volunteer record."""
    db = _load_db()
    data = request.get_json()

    required = ["name", "email", "hub", "role"]
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_id = f"vol-{len(db['volunteers']) + 1:03d}"
    volunteer = {
        "id": new_id,
        "name": data["name"],
        "email": data["email"],
        "phone": data.get("phone", ""),
        "hub": data["hub"],
        "role": data["role"],
        "skills": data.get("skills", []),
        "hours_contributed": 0,
        "join_date": data.get("join_date", ""),
        "status": "active",
        "avatar_color": data.get("avatar_color", "#6366F1"),
        "bio": data.get("bio", ""),
    }

    db["volunteers"].append(volunteer)
    _save_db(db)
    return jsonify(volunteer), 201


# ---------------------------------------------------------------------------
# Students
# ---------------------------------------------------------------------------
@app.route("/api/students", methods=["GET"])
def get_students():
    """
    Return students, optionally filtered by center or performance.
    Query params: ?center=Dharavi+Learning+Hub&performance=excellent
    """
    db = _load_db()
    students = db["students"]

    center = request.args.get("center")
    perf = request.args.get("performance")

    if center:
        students = [s for s in students if s["center"] == center]
    if perf:
        students = [s for s in students if s["performance"] == perf]

    return jsonify(students)


@app.route("/api/students/<student_id>", methods=["GET"])
def get_student(student_id):
    """Return a single student by ID."""
    db = _load_db()
    student = next((s for s in db["students"] if s["id"] == student_id), None)
    if student is None:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student)


@app.route("/api/students", methods=["POST"])
def create_student():
    """Enrol a new student."""
    db = _load_db()
    data = request.get_json()

    required = ["name", "age", "grade", "center"]
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_id = f"stu-{len(db['students']) + 1:03d}"
    student = {
        "id": new_id,
        "name": data["name"],
        "age": data["age"],
        "grade": data["grade"],
        "center": data["center"],
        "subjects": data.get("subjects", []),
        "enrollment_date": data.get("enrollment_date", ""),
        "attendance_rate": 0,
        "performance": "new",
        "mentor_id": data.get("mentor_id"),
        "guardian": data.get("guardian", ""),
        "notes": data.get("notes", ""),
    }

    db["students"].append(student)
    _save_db(db)
    return jsonify(student), 201


# ---------------------------------------------------------------------------
# Donations
# ---------------------------------------------------------------------------
@app.route("/api/donations", methods=["GET"])
def get_donations():
    """
    Return donations, optionally filtered by hub, type, or status.
    Query params: ?hub=education&type=monetary&status=received
    """
    db = _load_db()
    donations = db["donations"]

    hub_filter = request.args.get("hub")
    type_filter = request.args.get("type")
    status_filter = request.args.get("status")

    if hub_filter:
        donations = [d for d in donations if d["hub"] == hub_filter]
    if type_filter:
        donations = [d for d in donations if d["type"] == type_filter]
    if status_filter:
        donations = [d for d in donations if d["status"] == status_filter]

    return jsonify(donations)


@app.route("/api/donations/<donation_id>", methods=["GET"])
def get_donation(donation_id):
    """Return a single donation by ID."""
    db = _load_db()
    donation = next((d for d in db["donations"] if d["id"] == donation_id), None)
    if donation is None:
        return jsonify({"error": "Donation not found"}), 404
    return jsonify(donation)


@app.route("/api/donations", methods=["POST"])
def create_donation():
    """Record a new donation."""
    db = _load_db()
    data = request.get_json()

    required = ["donor_name", "type", "hub", "purpose"]
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_id = f"don-{len(db['donations']) + 1:03d}"
    donation = {
        "id": new_id,
        "donor_name": data["donor_name"],
        "type": data["type"],
        "amount": data.get("amount"),
        "currency": data.get("currency", "INR"),
        "hub": data["hub"],
        "date": data.get("date", ""),
        "purpose": data["purpose"],
        "status": data.get("status", "pledged"),
        "receipt_number": None,
        "recurring": data.get("recurring", False),
    }

    if data["type"] == "in_kind":
        donation["items_count"] = data.get("items_count", 0)
        donation["item_category"] = data.get("item_category", "")

    db["donations"].append(donation)
    _save_db(db)
    return jsonify(donation), 201


# ---------------------------------------------------------------------------
# Impact metrics
# ---------------------------------------------------------------------------
@app.route("/api/impact", methods=["GET"])
def get_impact():
    """Return aggregate impact metrics."""
    db = _load_db()
    return jsonify(db["impact_metrics"])


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
