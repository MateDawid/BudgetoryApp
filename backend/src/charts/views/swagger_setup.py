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

CATEGORY_RESULTS_AND_PREDICTIONS_IN_PERIODS_ACTIONS = {
    "get": {
        "operation_summary": "Category results and predictions in Periods Chart data.",
        "operation_description": "Chart data about Category results and predictions in Periods",
        "manual_parameters": [
            openapi.Parameter(
                "category",
                openapi.IN_QUERY,
                description="Category ID.",
                type=openapi.TYPE_STRING,
                format="int64",
            ),
            openapi.Parameter(
                "periods_count",
                openapi.IN_QUERY,
                description="Number of Periods included in Chart.",
                type=openapi.TYPE_STRING,
                format="int64",
            ),
            openapi.Parameter(
                "display_value",
                openapi.IN_QUERY,
                description=(
                    "Display value.\n\n"
                    "**Allowed values:**\n"
                    "- `1` – Category Transfers sums in Periods\n"
                    "- `2` – Category Predictions in Periods\n"
                ),
                type=openapi.TYPE_STRING,
                format="int64",
                enum=[1, 2],
            ),
        ],
    }
}

DEPOSITS_IN_PERIODS_ACTIONS = {
    "get": {
        "operation_summary": "Deposits in Periods Chart data.",
        "operation_description": "Chart data about Deposits results in Periods",
        "manual_parameters": [
            openapi.Parameter(
                "display_value",
                openapi.IN_QUERY,
                description=(
                    "Value to be displayed.\n\n"
                    "**Allowed values:**\n"
                    "- `1` – INCOME Transfers sum.\n"
                    "- `2` – EXPENSE Transfers sum.\n"
                    "- `null` – Difference between INCOME Transfers sum and EXPENSE Transfers sum.\n"
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
