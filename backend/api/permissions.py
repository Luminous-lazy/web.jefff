from rest_framework import permissions


def _is_admin(request) -> bool:
    user = request.user
    return bool(user and user.is_authenticated and user.is_staff)


class IsAdminOrReadOnly(permissions.BasePermission):
    """Anyone can read; only admins (is_staff / Firebase `admin` claim) can write."""

    def has_permission(self, request, view) -> bool:
        return request.method in permissions.SAFE_METHODS or _is_admin(request)


class IsAdmin(permissions.BasePermission):
    """Admins only, for both reads and writes (e.g. minors' records)."""

    def has_permission(self, request, view) -> bool:
        return _is_admin(request)
