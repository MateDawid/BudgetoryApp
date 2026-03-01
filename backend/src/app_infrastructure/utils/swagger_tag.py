from typing import Callable

from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView

ACTIONS = ["list", "retrieve", "create", "update", "partial_update", "destroy", "get", "post", "put", "patch", "delete"]


def swagger_tag(tag: str, action_params: dict | None = None) -> Callable:
    """
    Decorator extending API view with given Swagger tag.

    Args:
        tag (str): Swagger tag
        action_params (dict | None): Additional swagger_auto_schema params for particular action type.

    Returns:
        Callable: Decorator function.
    """
    action_params = action_params or {}

    def decorator(cls: APIView) -> APIView:
        for action in ACTIONS:
            try:
                cls = method_decorator(swagger_auto_schema(tags=[tag], **action_params.get(action, {})), name=action)(
                    cls
                )
            except ValueError:
                pass
        return cls

    return decorator
