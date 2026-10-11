from rest_framework import serializers

from .models import Donation, Hub, ImpactMetrics, Student, Volunteer


class HubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hub
        fields = "__all__"


class VolunteerSerializer(serializers.ModelSerializer):
    PRIVATE_FIELDS = ("email", "phone")

    class Meta:
        model = Volunteer
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        user = getattr(request, "user", None)
        # Contact details are only visible to admins.
        if not (user and user.is_authenticated and user.is_staff):
            for field in self.PRIVATE_FIELDS:
                data.pop(field, None)
        return data


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"


class ImpactMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactMetrics
        exclude = ("id",)
