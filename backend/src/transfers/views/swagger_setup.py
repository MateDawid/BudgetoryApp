from drf_yasg import openapi

from categories.models.choices.category_type import CategoryType

INCOME_TAG = "09. Incomes"
EXPENSE_TAG = "10. Expenses"


def get_action_params(transfer_type: CategoryType) -> dict:
    """
    Build action params for Swagger Income and Expense views.

    Args:
        transfer_type (CategoryType): Transfer type.
    Returns:
        dict: Action params.
    """
    transfer_label = "Expense" if transfer_type == CategoryType.EXPENSE else "Income"
    return {
        "list": {
            "operation_summary": f"{transfer_label}s list",
            "operation_description": f"List of all Wallet {transfer_label}s.",
        },
        "create": {
            "operation_summary": f"Create {transfer_label}",
            "operation_description": f"Creates and returns new {transfer_label} instance.",
        },
        "retrieve": {
            "operation_summary": f"{transfer_label} details",
            "operation_description": f"Details of single {transfer_label}.",
        },
        "partial_update": {
            "operation_summary": f"{transfer_label} update",
            "operation_description": f"Updates single {transfer_label}.",
        },
        "destroy": {
            "operation_summary": f"{transfer_label} delete",
            "operation_description": f"Removes single {transfer_label}.",
        },
        "bulk_delete": {
            "operation_summary": f"{transfer_label}s bulk delete",
            "operation_description": f"Removes multiple {transfer_label}s.",
            "request_body": openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "objects_ids": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Items(type=openapi.TYPE_INTEGER),
                        description="List of IDs to delete.",
                    )
                },
                required=["objects_ids"],
            ),
        },
        "copy": {
            "operation_summary": f"{transfer_label}s copy",
            "operation_description": f"Copies indicated {transfer_label}s.",
            "request_body": openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "objects_ids": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Items(type=openapi.TYPE_INTEGER),
                        description="List of IDs to copy.",
                    )
                },
                required=["objects_ids"],
            ),
        },
    }
