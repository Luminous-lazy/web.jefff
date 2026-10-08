
from django.db import models

class Hub(models.Model):
    hub_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    description = models.TextField()
    theme_color = models.CharField(max_length=20)
    image_url = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Volunteer(models.Model):
    volunteer_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    hub = models.CharField(max_length=50) # foreign key could be used but simple string for now
    role = models.CharField(max_length=50)
    skills = models.JSONField(default=list)
    hours_contributed = models.IntegerField(default=0)
    join_date = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, default='active')
    avatar_color = models.CharField(max_length=20, default='#6366F1')
    bio = models.TextField(blank=True)

class Student(models.Model):
    student_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    grade = models.CharField(max_length=20)
    center = models.CharField(max_length=100)
    subjects = models.JSONField(default=list)
    enrollment_date = models.CharField(max_length=50, blank=True)
    attendance_rate = models.IntegerField(default=0)
    performance = models.CharField(max_length=50, default='new')
    mentor_id = models.CharField(max_length=50, null=True, blank=True)
    guardian = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)

class Donation(models.Model):
    donation_id = models.CharField(max_length=50, unique=True)
    donor_name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    amount = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=10, default='INR')
    hub = models.CharField(max_length=50)
    date = models.CharField(max_length=50, blank=True)
    purpose = models.CharField(max_length=200)
    status = models.CharField(max_length=50, default='pledged')
    receipt_number = models.CharField(max_length=100, null=True, blank=True)
    recurring = models.BooleanField(default=False)
    items_count = models.IntegerField(default=0, null=True, blank=True)
    item_category = models.CharField(max_length=100, blank=True)

class ImpactMetrics(models.Model):
    total_beneficiaries = models.IntegerField(default=0)
    total_volunteers = models.IntegerField(default=0)
    active_centers = models.IntegerField(default=0)
    funds_raised = models.IntegerField(default=0)
    trees_planted = models.IntegerField(default=0)
    meals_served = models.IntegerField(default=0)
    monthly_growth_rate = models.FloatField(default=0)
    donor_retention_rate = models.FloatField(default=0)
