from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics

from app_users.serializers.user_register_serializer import UserRegisterSerializer


@method_decorator(
    swagger_auto_schema(
        tags=["01. Register"],
        operation_summary="Register regular user",
        operation_description="Creates a new user account.",
    ),
    name="post",
)
class UserRegisterView(generics.CreateAPIView):
    """View to register new User."""

    serializer_class = UserRegisterSerializer
    permission_classes = ()
