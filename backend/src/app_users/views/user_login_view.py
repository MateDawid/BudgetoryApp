from rest_framework_simplejwt.views import TokenObtainPairView

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.serializers.user_login_serializer import UserLoginSerializer
from app_users.views.swagger_setup import LOGIN_ACTIONS, LOGIN_TAG


@swagger_tag(tag=LOGIN_TAG, action_params=LOGIN_ACTIONS)
class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer
