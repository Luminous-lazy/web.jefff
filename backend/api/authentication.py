"""Firebase ID-token authentication for Django REST Framework.

Clients send `Authorization: Bearer <firebase-id-token>`. Valid tokens are mapped
to a Django `User` (username = Firebase UID) so `request.user` works normally.
Users with the Firebase custom claim `admin: true` are promoted to `is_staff`.
"""

from __future__ import annotations

import logging
from typing import Any

import firebase_admin
from django.conf import settings
from django.contrib.auth import get_user_model
from firebase_admin import auth as firebase_auth
from firebase_admin import credentials
from rest_framework import authentication, exceptions

logger = logging.getLogger(__name__)


def get_firebase_app() -> firebase_admin.App:
    """Initialise the Firebase Admin SDK once, lazily."""
    try:
        return firebase_admin.get_app()
    except ValueError:
        pass

    options: dict[str, Any] = {}
    if settings.FIREBASE_PROJECT_ID:
        options["projectId"] = settings.FIREBASE_PROJECT_ID

    cred = None
    if settings.FIREBASE_CREDENTIALS_FILE:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_FILE)

    # Verifying ID tokens only needs the project ID; a service account is optional.
    return firebase_admin.initialize_app(cred, options or None)


class FirebaseAuthentication(authentication.BaseAuthentication):
    keyword = "Bearer"

    def authenticate(self, request):
        header = authentication.get_authorization_header(request).split()
        if not header or header[0].lower() != self.keyword.lower().encode():
            return None  # No credentials -> anonymous; permissions decide.
        if len(header) != 2:
            raise exceptions.AuthenticationFailed("Invalid Authorization header.")

        token = header[1].decode()
        try:
            decoded = firebase_auth.verify_id_token(token, app=get_firebase_app())
        except (
            firebase_auth.InvalidIdTokenError,
            firebase_auth.ExpiredIdTokenError,
            firebase_auth.RevokedIdTokenError,
        ) as exc:
            raise exceptions.AuthenticationFailed("Invalid or expired token.") from exc
        except (ValueError, firebase_auth.CertificateFetchError) as exc:
            # Misconfiguration (e.g. missing FIREBASE_PROJECT_ID) or network issue.
            logger.error("Firebase token verification failed: %s", exc)
            raise exceptions.AuthenticationFailed("Authentication unavailable.") from exc

        return self._get_or_create_user(decoded), decoded

    def authenticate_header(self, request) -> str:
        # Makes DRF return 401 (not 403) for unauthenticated requests.
        return self.keyword

    @staticmethod
    def _get_or_create_user(decoded: dict[str, Any]):
        User = get_user_model()
        user, _ = User.objects.get_or_create(
            username=decoded["uid"],
            defaults={"email": decoded.get("email", "")},
        )
        if decoded.get("admin") and not user.is_staff:
            user.is_staff = True
            user.save(update_fields=["is_staff"])
        return user
