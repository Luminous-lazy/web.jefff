from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from firebase_admin import auth as firebase_auth, credentials, initialize_app
from .models import Hub, Volunteer, Student, Donation, ImpactMetrics
from .serializers import HubSerializer, VolunteerSerializer, StudentSerializer, DonationSerializer, ImpactMetricsSerializer

# Initialize Firebase Admin if not already initialized
try:
    initialize_app()
except ValueError:
    pass # Already initialized

class FirebaseAuthentication(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return False
        token = auth_header.split(' ')[1]
        try:
            decoded_token = firebase_auth.verify_id_token(token)
            request.user_id = decoded_token['uid']
            return True
        except Exception:
            return False

class HubViewSet(viewsets.ModelViewSet):
    queryset = Hub.objects.all()
    serializer_class = HubSerializer
    permission_classes = [FirebaseAuthentication]

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [FirebaseAuthentication]
    
    def get_queryset(self):
        queryset = Volunteer.objects.all()
        hub = self.request.query_params.get('hub', None)
        status = self.request.query_params.get('status', None)
        if hub:
            queryset = queryset.filter(hub=hub)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [FirebaseAuthentication]

    def get_queryset(self):
        queryset = Student.objects.all()
        center = self.request.query_params.get('center', None)
        performance = self.request.query_params.get('performance', None)
        if center:
            queryset = queryset.filter(center=center)
        if performance:
            queryset = queryset.filter(performance=performance)
        return queryset

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [FirebaseAuthentication]

    def get_queryset(self):
        queryset = Donation.objects.all()
        hub = self.request.query_params.get('hub', None)
        type_ = self.request.query_params.get('type', None)
        status = self.request.query_params.get('status', None)
        if hub:
            queryset = queryset.filter(hub=hub)
        if type_:
            queryset = queryset.filter(type=type_)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

class ImpactMetricsView(APIView):
    def get(self, request):
        metrics = ImpactMetrics.objects.first()
        if not metrics:
            return Response({})
        serializer = ImpactMetricsSerializer(metrics)
        return Response(serializer.data)
