from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView


@method_decorator(
    swagger_auto_schema(
        tags=["02. Login"],
        operation_summary="Token refresh",
        operation_description="Takes a refresh token and returns a new access token.",
    ),
    name="post",
)
class TokenRefreshView(BaseTokenRefreshView):
    pass
