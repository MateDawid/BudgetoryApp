from django.db.models import QuerySet
from django_filters import rest_framework as filters
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from app_infrastructure.permissions import UserBelongsToWalletPermission
from app_infrastructure.utils.swagger_tag import swagger_tag
from entities.filtersets.entity_filterset import EntityFilterSet
from entities.models.entity_model import Entity
from entities.serializers.entity_serializer import EntitySerializer


@swagger_tag(
    tag="06. Entities",
    action_params={
        "list": {
            "operation_summary": "Entities list",
            "operation_description": "List of all Wallet Entities.",
        },
        "create": {
            "operation_summary": "Create Entity",
            "operation_description": "Creates and returns new Entity instance.",
        },
        "retrieve": {
            "operation_summary": "Entity details",
            "operation_description": "Details of single Entity.",
        },
        "partial_update": {
            "operation_summary": "Entity update",
            "operation_description": "Updates single Entity.",
        },
        "destroy": {
            "operation_summary": "Entity delete",
            "operation_description": "Removes single Entity.",
        },
    },
)
class EntityViewSet(ModelViewSet):
    """View for managing Entities."""

    serializer_class = EntitySerializer
    queryset = Entity.objects.all()
    permission_classes = [IsAuthenticated, UserBelongsToWalletPermission]
    filterset_class = EntityFilterSet
    filter_backends = (filters.DjangoFilterBackend, OrderingFilter)
    ordering_fields = ("id", "name", "is_deposit")

    def get_queryset(self) -> QuerySet:
        """
        Retrieve Entities for Wallet passed in URL.

        Returns:
            QuerySet: Filtered Entity QuerySet.
        """
        return self.queryset.filter(wallet_id=self.kwargs.get("wallet_pk")).distinct()

    def perform_create(self, serializer: EntitySerializer) -> None:
        """
        Additionally save Wallet from URL on Entity instance during saving serializer.

        Args:
            serializer [EntitySerializer]: Serializer for Entity model.
        """
        serializer.save(wallet_id=self.kwargs.get("wallet_pk"))
