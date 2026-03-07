from app_infrastructure.utils.swagger_tag import swagger_tag
from categories.models.choices.category_type import CategoryType
from transfers.filtersets.expense_filterset import ExpenseFilterSet
from transfers.serializers.expense_serializer import ExpenseSerializer
from transfers.views.swagger_setup import EXPENSE_TAG, get_action_params
from transfers.views.transfer_viewset import TransferViewSet


@swagger_tag(tag=EXPENSE_TAG, action_params=get_action_params(CategoryType.INCOME))
class ExpenseViewSet(TransferViewSet):
    """ViewSet for managing Expense."""

    serializer_class = ExpenseSerializer
    filterset_class = ExpenseFilterSet
