REGISTER_TAG = "01. Register"
LOGIN_TAG = "02. Login"

USER_REGISTER_ACTIONS = {
    "post": {"operation_summary": "Register regular User", "operation_description": "Creates a new User account."}
}

SUPERUSER_REGISTER_ACTIONS = {
    "post": {
        "operation_summary": "Register admin User",
        "operation_description": "Creates a new admin User account.",
    }
}

LOGIN_ACTIONS = {
    "post": {
        "operation_summary": "User login",
        "operation_description": "Authenticates User. Returns access and refresh tokens.",
    }
}

DEMO_LOGIN_ACTIONS = {
    "post": {
        "operation_summary": "Demo User login",
        "operation_description": "Creates and authenticates demo User. Returns access and refresh tokens.",
    }
}

TOKEN_REFRESH_ACTIONS = {
    "post": {
        "operation_summary": "Token refresh",
        "operation_description": "Takes a refresh token and returns a new access token.",
    }
}
