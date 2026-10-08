from rest_framework import serializers
from .models import Hub, Volunteer, Student, Donation, ImpactMetrics

class HubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hub
        fields = '__all__'

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

class ImpactMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactMetrics
        fields = '__all__'
