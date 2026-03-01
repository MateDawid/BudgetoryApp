from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView

from app_infrastructure.utils.swagger_tag import swagger_tag


@swagger_tag(
    tag="02. Login",
    action_params={
        "post": {
            "operation_summary": "Token refresh",
            "operation_description": "Takes a refresh token and returns a new access token.",
        }
    },
)
class TokenRefreshView(BaseTokenRefreshView):
    pass
