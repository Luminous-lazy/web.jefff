from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Donation, Hub, ImpactMetrics, Student, Volunteer
from .permissions import IsAdmin, IsAdminOrReadOnly
from .serializers import (
    DonationSerializer,
    HubSerializer,
    ImpactMetricsSerializer,
    StudentSerializer,
    VolunteerSerializer,
)


class FilteredViewSet(viewsets.ModelViewSet):
    """ModelViewSet that applies `?field=value` filters listed in `filter_fields`."""

    filter_fields: tuple[str, ...] = ()

    def get_queryset(self):
        queryset = super().get_queryset()
        for field in self.filter_fields:
            value = self.request.query_params.get(field)
            if value:
                queryset = queryset.filter(**{field: value})
        return queryset


class HubViewSet(viewsets.ModelViewSet):
    queryset = Hub.objects.all()
    serializer_class = HubSerializer
    permission_classes = [IsAdminOrReadOnly]


class VolunteerViewSet(FilteredViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_fields = ("hub", "status")


class StudentViewSet(FilteredViewSet):
    # Records of minors (names, guardians) — never public.
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdmin]
    filter_fields = ("center", "performance")


class DonationViewSet(FilteredViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_fields = ("hub", "type", "status")


class ImpactMetricsView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        metrics = ImpactMetrics.objects.first()
        if metrics is None:
            return Response({})
        return Response(ImpactMetricsSerializer(metrics).data)
