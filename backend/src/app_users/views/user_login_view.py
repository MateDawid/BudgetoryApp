from rest_framework_simplejwt.views import TokenObtainPairView

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.serializers.user_login_serializer import UserLoginSerializer


@swagger_tag(
    tag="02. Login",
    action_params={
        "post": {
            "operation_summary": "User login",
            "operation_description": "Authenticates User. Returns access and refresh tokens.",
        }
    },
)
class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer
