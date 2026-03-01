from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from app_infrastructure.utils.swagger_tag import swagger_tag
from app_users.services.demo_login_service import get_demo_user_token


@method_decorator(
    swagger_auto_schema(
        tags=["02. Login"],
        operation_summary="Demo User login",
        operation_description="Creates and authenticates demo User. Returns access and refresh tokens.",
    ),
    name="post",
)
@swagger_tag(
    tag="02. Login",
    action_params={
        "post": {
            "operation_summary": "Demo User login",
            "operation_description": "Creates and authenticates demo User. Returns access and refresh tokens.",
        }
    },
)
class DemoLoginView(APIView):
    """
    View for creating demo User and returning its credentials.
    """

    permission_classes = ()

    def post(self, request: Request) -> Response:
        if token := get_demo_user_token():
            return Response(token, status=status.HTTP_200_OK)
        return Response({"error": "Demo login failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
