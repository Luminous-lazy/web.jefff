"""Seed the database from mock_db.json.

Idempotent: re-running updates existing rows instead of duplicating/crashing.
Usage:  python load_data.py
"""

import json
import os
from pathlib import Path

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "aashraya_backend.settings")
django.setup()

from api.models import Donation, Hub, ImpactMetrics, Student, Volunteer  # noqa: E402

DATA_FILE = Path(__file__).resolve().parent / "mock_db.json"


def pick(source: dict, model) -> dict:
    """Keep only keys that are concrete fields on `model` (excluding the PK)."""
    names = {f.name for f in model._meta.concrete_fields if not f.primary_key}
    return {k: v for k, v in source.items() if k in names}


def load() -> None:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))

    for hub_id, hub in data.get("hubs", {}).items():
        Hub.objects.update_or_create(id=hub_id, defaults=pick(hub, Hub))

    for model, key in ((Volunteer, "volunteers"), (Student, "students"), (Donation, "donations")):
        for row in data.get(key, []):
            model.objects.update_or_create(id=row["id"], defaults=pick(row, model))

    metrics = data.get("impact_metrics")
    if metrics:
        existing = ImpactMetrics.objects.first()
        if existing:
            for k, v in pick(metrics, ImpactMetrics).items():
                setattr(existing, k, v)
            existing.save()
        else:
            ImpactMetrics.objects.create(**pick(metrics, ImpactMetrics))

    counts = {m.__name__: m.objects.count() for m in (Hub, Volunteer, Student, Donation, ImpactMetrics)}
    print(f"Data loaded successfully: {counts}")


if __name__ == "__main__":
    load()
