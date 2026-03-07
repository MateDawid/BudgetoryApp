from rest_framework import generics

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.serializers.user_register_serializer import UserRegisterSerializer
from app_users.views.swagger_setup import REGISTER_TAG, USER_REGISTER_ACTIONS


@swagger_tag(tag=REGISTER_TAG, action_params=USER_REGISTER_ACTIONS)
class UserRegisterView(generics.CreateAPIView):
    """View to register new User."""

    serializer_class = UserRegisterSerializer
    permission_classes = ()
