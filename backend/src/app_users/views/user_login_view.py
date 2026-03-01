from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.views import TokenObtainPairView

from app_users.serializers.user_login_serializer import UserLoginSerializer


@method_decorator(
    swagger_auto_schema(
        tags=["02. Login"],
        operation_summary="User login",
        operation_description="Authenticates User. Returns access and refresh tokens.",
    ),
    name="post",
)
class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer
