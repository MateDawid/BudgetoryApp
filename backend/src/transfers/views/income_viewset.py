from app_infrastructure.utils.swagger_tag import swagger_tag
from categories.models.choices.category_type import CategoryType
from transfers.filtersets.income_filterset import IncomeFilterSet
from transfers.serializers.income_serializer import IncomeSerializer
from transfers.views.swagger_setup import INCOME_TAG, get_action_params
from transfers.views.transfer_viewset import TransferViewSet


@swagger_tag(tag=INCOME_TAG, action_params=get_action_params(CategoryType.INCOME))
class IncomeViewSet(TransferViewSet):
    """ViewSet for managing Incomes."""

    serializer_class = IncomeSerializer
    filterset_class = IncomeFilterSet
