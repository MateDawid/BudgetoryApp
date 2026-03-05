from drf_yasg import openapi

from categories.models.choices.category_type import CategoryType

CHARTS_TAG = "11. Charts"

CATEGORIES_IN_PERIODS_ACTIONS = {
    "get": {
        "operation_summary": "Categories in Periods Chart data.",
        "operation_description": "Chart data about Categories results in Periods",
        "manual_parameters": [
            openapi.Parameter(
                "transfer_type",
                openapi.IN_QUERY,
                description=(
                    "Transfer type.\n\n"
                    "**Allowed values:**\n"
                    "- `1` – INCOME Transfer Category\n"
                    "- `2` – EXPENSE Transfer Category\n"
                ),
                type=openapi.TYPE_STRING,
                format="int64",
                enum=CategoryType.values,
            ),
            openapi.Parameter(
                "period_from",
                openapi.IN_QUERY,
                description="Start Period ID for Chart range.",
                type=openapi.TYPE_STRING,
                format="int64",
            ),
            openapi.Parameter(
                "period_to",
                openapi.IN_QUERY,
                description="End Period ID for Chart range.",
                type=openapi.TYPE_STRING,
                format="int64",
            ),
            openapi.Parameter(
                "deposit",
                openapi.IN_QUERY,
                description="Single Deposit ID.",
                type=openapi.TYPE_STRING,
                format="int64",
            ),
        ],
    }
}
