from django.db import models


class Hub(models.Model):
    # Slug-style string IDs ("education", "clothing_drive", ...) are part of the
    # public API contract — the frontend joins volunteers/donations on them.
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=20, blank=True)
    color = models.CharField(max_length=20, default="#6366F1")
    stats = models.JSONField(default=dict, blank=True)

    objects = models.Manager()

    def __str__(self) -> str:
        return str(self.name)


class Volunteer(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    hub = models.CharField(max_length=50, db_index=True)
    role = models.CharField(max_length=50)
    skills = models.JSONField(default=list, blank=True)
    hours_contributed = models.IntegerField(default=0)
    join_date = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, default="active")
    avatar_color = models.CharField(max_length=20, default="#6366F1")
    bio = models.TextField(blank=True)

    objects = models.Manager()

    def __str__(self) -> str:
        return str(self.name)


class Student(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    grade = models.CharField(max_length=20)
    center = models.CharField(max_length=100)
    subjects = models.JSONField(default=list, blank=True)
    enrollment_date = models.CharField(max_length=50, blank=True)
    attendance_rate = models.IntegerField(default=0)
    performance = models.CharField(max_length=50, default="new")
    mentor_id = models.CharField(max_length=50, null=True, blank=True)
    guardian = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)

    objects = models.Manager()

    def __str__(self) -> str:
        return str(self.name)


class Donation(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    donor_name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)  # "monetary" | "in_kind"
    amount = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=10, null=True, blank=True)
    # Not a FK: donations may target "general", which isn't a Hub row.
    hub = models.CharField(max_length=50, db_index=True)
    date = models.CharField(max_length=50, blank=True)
    purpose = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=50, default="pledged")
    receipt_number = models.CharField(max_length=100, null=True, blank=True)
    recurring = models.BooleanField(default=False)
    items_count = models.IntegerField(null=True, blank=True)
    item_category = models.CharField(max_length=100, blank=True)

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.donor_name} ({self.id})"


class ImpactMetrics(models.Model):
    """Singleton-style row; the API exposes the first record."""

    total_beneficiaries = models.IntegerField(default=0)
    total_funds_raised = models.IntegerField(default=0)
    total_volunteer_hours = models.IntegerField(default=0)
    total_items_donated = models.IntegerField(default=0)
    communities_served = models.IntegerField(default=0)
    active_programs = models.IntegerField(default=0)
    monthly_growth_rate = models.FloatField(default=0)
    donor_retention_rate = models.FloatField(default=0)

    objects = models.Manager()

    class Meta:
        verbose_name_plural = "impact metrics"

    def __str__(self) -> str:
        return "Impact metrics"
