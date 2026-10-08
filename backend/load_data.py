import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aashraya_backend.settings')
django.setup()

from api.models import Hub, Volunteer, Student, Donation, ImpactMetrics

def load():
    with open('mock_db.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    for k, hub_data in data.get('hubs', {}).items():
        Hub.objects.create(
            hub_id=k,
            name=hub_data['name'],
            tagline=hub_data['tagline'],
            description=hub_data['description'],
            theme_color=hub_data['theme_color'],
            image_url=hub_data['image_url']
        )
    
    for v_data in data.get('volunteers', []):
        Volunteer.objects.create(
            volunteer_id=v_data['id'],
            name=v_data['name'],
            email=v_data['email'],
            phone=v_data.get('phone', ''),
            hub=v_data['hub'],
            role=v_data['role'],
            skills=v_data.get('skills', []),
            hours_contributed=v_data.get('hours_contributed', 0),
            join_date=v_data.get('join_date', ''),
            status=v_data.get('status', 'active'),
            avatar_color=v_data.get('avatar_color', '#6366F1'),
            bio=v_data.get('bio', '')
        )

    for s_data in data.get('students', []):
        Student.objects.create(
            student_id=s_data['id'],
            name=s_data['name'],
            age=s_data['age'],
            grade=s_data['grade'],
            center=s_data['center'],
            subjects=s_data.get('subjects', []),
            enrollment_date=s_data.get('enrollment_date', ''),
            attendance_rate=s_data.get('attendance_rate', 0),
            performance=s_data.get('performance', 'new'),
            mentor_id=s_data.get('mentor_id'),
            guardian=s_data.get('guardian', ''),
            notes=s_data.get('notes', '')
        )

    for d_data in data.get('donations', []):
        Donation.objects.create(
            donation_id=d_data['id'],
            donor_name=d_data['donor_name'],
            type=d_data['type'],
            amount=d_data.get('amount'),
            currency=d_data.get('currency', 'INR'),
            hub=d_data['hub'],
            date=d_data.get('date', ''),
            purpose=d_data.get('purpose', ''),
            status=d_data.get('status', 'pledged'),
            receipt_number=d_data.get('receipt_number'),
            recurring=d_data.get('recurring', False),
            items_count=d_data.get('items_count', 0),
            item_category=d_data.get('item_category', '')
        )

    metrics_data = data.get('impact_metrics', {})
    if metrics_data:
        ImpactMetrics.objects.create(
            total_beneficiaries=metrics_data.get('total_beneficiaries', 0),
            total_volunteers=metrics_data.get('total_volunteers', 0),
            active_centers=metrics_data.get('active_centers', 0),
            funds_raised=metrics_data.get('funds_raised', 0),
            trees_planted=metrics_data.get('trees_planted', 0),
            meals_served=metrics_data.get('meals_served', 0),
            monthly_growth_rate=metrics_data.get('monthly_growth_rate', 0),
            donor_retention_rate=metrics_data.get('donor_retention_rate', 0)
        )
    print("Data loaded successfully.")

if __name__ == '__main__':
    load()
