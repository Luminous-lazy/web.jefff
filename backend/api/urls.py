from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HubViewSet, VolunteerViewSet, StudentViewSet, DonationViewSet, ImpactMetricsView

router = DefaultRouter(trailing_slash=False)
router.register(r'hubs', HubViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'students', StudentViewSet)
router.register(r'donations', DonationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('impact', ImpactMetricsView.as_view(), name='impact'),
]
