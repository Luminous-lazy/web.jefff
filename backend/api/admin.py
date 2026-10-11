from django.contrib import admin

from .models import Donation, Hub, ImpactMetrics, Student, Volunteer

# Options passed as kwargs (instead of ModelAdmin subclasses) — Django builds the
# admin class for us, and it keeps the type checker happy with untyped Django.
admin.site.register(Hub, list_display=("id", "name", "tagline"))
admin.site.register(
    Volunteer,
    list_display=("id", "name", "hub", "role", "status", "hours_contributed"),
    list_filter=("hub", "status"),
    search_fields=("name", "email"),
)
admin.site.register(
    Student,
    list_display=("id", "name", "grade", "center", "performance"),
    list_filter=("center", "performance"),
    search_fields=("name",),
)
admin.site.register(
    Donation,
    list_display=("id", "donor_name", "type", "amount", "hub", "status", "date"),
    list_filter=("type", "hub", "status"),
    search_fields=("donor_name", "receipt_number"),
)
admin.site.register(ImpactMetrics)
