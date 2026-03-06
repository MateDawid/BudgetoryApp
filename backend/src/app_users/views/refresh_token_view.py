from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.views.swagger_setup import LOGIN_TAG, TOKEN_REFRESH_ACTIONS


@swagger_tag(tag=LOGIN_TAG, action_params=TOKEN_REFRESH_ACTIONS)
class TokenRefreshView(BaseTokenRefreshView):
    pass
