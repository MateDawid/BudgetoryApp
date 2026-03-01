from rest_framework import generics

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.serializers.user_register_serializer import UserRegisterSerializer


@swagger_tag(
    tag="01. Register",
    action_params={
        "post": {"operation_summary": "Register regular User", "operation_description": "Creates a new User account."}
    },
)
class UserRegisterView(generics.CreateAPIView):
    """View to register new User."""

    serializer_class = UserRegisterSerializer
    permission_classes = ()
