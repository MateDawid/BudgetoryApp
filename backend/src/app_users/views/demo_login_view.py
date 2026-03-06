from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.services.demo_login_service import get_demo_user_token
from app_users.views.swagger_setup import DEMO_LOGIN_ACTIONS, LOGIN_TAG


@swagger_tag(tag=LOGIN_TAG, action_params=DEMO_LOGIN_ACTIONS)
class DemoLoginView(APIView):
    """
    View for creating demo User and returning its credentials.
    """

    permission_classes = ()

    def post(self, request: Request) -> Response:
        if token := get_demo_user_token():
            return Response(token, status=status.HTTP_200_OK)
        return Response({"error": "Demo login failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
