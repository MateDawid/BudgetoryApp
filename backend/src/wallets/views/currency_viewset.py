from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from app_infrastructure.utils.swagger_tag import swagger_tag
from wallets.models import Currency
from wallets.serializers.currency_serializer import CurrencySerializer


@swagger_tag(
    tag="03. Wallets",
    action_params={
        "list": {
            "operation_summary": "Currencies list",
            "operation_description": "List of all Currencies.",
        },
    },
)
class CurrencyViewSet(ListModelMixin, GenericViewSet):
    """View for retrieving list Currencies."""

    serializer_class = CurrencySerializer
    queryset = Currency.objects.all().order_by("name")
    permission_classes = []
