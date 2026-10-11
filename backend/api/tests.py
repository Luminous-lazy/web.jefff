from unittest.mock import patch

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase

from .models import Donation, Hub, ImpactMetrics, Student, Volunteer

VERIFY = "api.authentication.firebase_auth.verify_id_token"


class ApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        Hub.objects.create(id="education", name="Education Hub", icon="📚", stats={"centers": 12})
        Volunteer.objects.create(id="vol-001", name="Priya", email="p@x.com", phone="1", hub="education", role="Tutor")
        Student.objects.create(id="stu-001", name="Aarav", age=14, grade="9th", center="Andheri")
        Donation.objects.create(id="don-001", donor_name="Tata", type="monetary", amount=100, hub="education")
        ImpactMetrics.objects.create(total_beneficiaries=10, active_programs=3)

    def setUp(self):
        self.api = APIClient()

    def auth(self, claims):
        self.api.credentials(HTTP_AUTHORIZATION="Bearer fake-token")
        return patch(VERIFY, return_value=claims)

    # ── Public reads keep the contract the frontend expects ──
    def test_hubs_use_string_ids(self):
        res = self.api.get("/api/hubs")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()[0]["id"], "education")
        self.assertEqual(res.json()[0]["stats"], {"centers": 12})

    def test_impact_shape(self):
        data = self.api.get("/api/impact").json()
        self.assertEqual(data["total_beneficiaries"], 10)
        self.assertNotIn("id", data)

    def test_filters(self):
        self.assertEqual(len(self.api.get("/api/donations?hub=education").json()), 1)
        self.assertEqual(len(self.api.get("/api/donations?hub=nope").json()), 0)

    # ── Privacy ──
    def test_volunteer_contact_hidden_from_public(self):
        vol = self.api.get("/api/volunteers").json()[0]
        self.assertNotIn("email", vol)
        self.assertNotIn("phone", vol)

    def test_students_require_admin(self):
        self.assertEqual(self.api.get("/api/students").status_code, 401)
        with self.auth({"uid": "u1"}):
            self.assertEqual(self.api.get("/api/students").status_code, 403)
        with self.auth({"uid": "admin1", "admin": True}):
            self.assertEqual(self.api.get("/api/students").status_code, 200)

    # ── Writes ──
    def test_anonymous_write_rejected(self):
        self.assertEqual(self.api.post("/api/hubs", {"id": "x", "name": "X"}).status_code, 401)

    def test_non_admin_write_forbidden(self):
        with self.auth({"uid": "u1", "email": "u@x.com"}):
            self.assertEqual(self.api.post("/api/hubs", {"id": "x", "name": "X"}).status_code, 403)
        self.assertTrue(get_user_model().objects.filter(username="u1", email="u@x.com").exists())

    def test_admin_claim_can_write_and_sees_contact(self):
        with self.auth({"uid": "admin1", "admin": True}):
            res = self.api.post("/api/hubs", {"id": "x", "name": "X"}, format="json")
            self.assertEqual(res.status_code, 201)
            self.assertIn("email", self.api.get("/api/volunteers").json()[0])

    def test_invalid_token_rejected(self):
        from firebase_admin import auth as fb

        self.api.credentials(HTTP_AUTHORIZATION="Bearer bad")
        with patch(VERIFY, side_effect=fb.InvalidIdTokenError("bad")):
            self.assertEqual(self.api.get("/api/hubs").status_code, 401)
