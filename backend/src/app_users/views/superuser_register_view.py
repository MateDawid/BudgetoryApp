from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response

from app_users.serializers.user_register_serializer import UserRegisterSerializer


class SuperuserRegisterView(generics.CreateAPIView):
    """View to register Superuser."""

    serializer_class = UserRegisterSerializer
    permission_classes = ()

    def create(self, request, *args, **kwargs):
        if request.headers.get("Authorization") == f"KEY {settings.SUPERUSER_API_KEY}":
            return super().create(request, *args, **kwargs)
        return Response({"detail": "Invalid or missing API key."}, status=status.HTTP_403_FORBIDDEN)

    def perform_create(self, serializer):
        serializer.save(is_staff=True, is_superuser=True)
