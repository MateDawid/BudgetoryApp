import pytest
from django.conf import settings
from django.contrib.auth import get_user_model
from django.urls import reverse
from factory.base import FactoryMetaClass
from rest_framework import status
from rest_framework.test import APIClient

SUPERUSER_REGISTER_URL = reverse("app_users:register-superuser")
VALID_AUTH_HEADER = f"KEY {settings.SUPERUSER_API_KEY}"


@pytest.mark.django_db
class TestSuperuserRegisterView:
    """Tests for SuperuserRegisterView"""

    payload = {
        "email": "superuser@example.com",
        "password_1": "testpass123",
        "password_2": "testpass123",
    }

    def test_create_superuser_successful(self, api_client: APIClient):
        """
        GIVEN: Valid payload and valid API key.
        WHEN: POST request on SuperuserRegisterView.
        THEN: HTTP 201 returned, superuser created with is_staff and is_superuser flags.
        """
        response = api_client.post(SUPERUSER_REGISTER_URL, self.payload, HTTP_AUTHORIZATION=VALID_AUTH_HEADER)

        assert response.status_code == status.HTTP_201_CREATED
        user = get_user_model().objects.get(email=self.payload["email"])
        assert user.check_password(self.payload["password_1"])
        assert user.is_staff is True
        assert user.is_superuser is True
        assert "password" not in response.data
        assert "password_1" not in response.data
        assert "password_2" not in response.data

    def test_create_superuser_missing_api_key_error(self, api_client: APIClient):
        """
        GIVEN: Valid payload but no API key.
        WHEN: POST request on SuperuserRegisterView.
        THEN: HTTP 403 returned, user not created.
        """
        response = api_client.post(SUPERUSER_REGISTER_URL, self.payload)

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert str(response.data["detail"]) == "Invalid or missing API key."
        assert not get_user_model().objects.filter(email=self.payload["email"]).exists()

    def test_create_superuser_invalid_api_key_error(self, api_client: APIClient):
        """
        GIVEN: Valid payload but invalid API key.
        WHEN: POST request on SuperuserRegisterView.
        THEN: HTTP 403 returned, user not created.
        """
        response = api_client.post(SUPERUSER_REGISTER_URL, self.payload, HTTP_AUTHORIZATION="KEY invalid-key")

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert str(response.data["detail"]) == "Invalid or missing API key."
        assert not get_user_model().objects.filter(email=self.payload["email"]).exists()

    def test_superuser_with_email_exists_error(self, api_client: APIClient, user_factory: FactoryMetaClass):
        """
        GIVEN: Valid API key but payload with duplicated email.
        WHEN: POST request on SuperuserRegisterView.
        THEN: HTTP 400 returned.
        """
        user_factory(email=self.payload["email"])
        response = api_client.post(SUPERUSER_REGISTER_URL, self.payload, HTTP_AUTHORIZATION=VALID_AUTH_HEADER)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert str(response.data["detail"]["email"][0]) == "user with this email already exists."

    def test_password_too_short_error(self, api_client: APIClient):
        """
        GIVEN: Valid API key but payload with password too short.
        WHEN: POST request on SuperuserRegisterView.
        THEN: HTTP 400 returned, user not created.
        """
        payload = self.payload.copy()
        payload["password_1"] = payload["password_2"] = "new"
        response = api_client.post(SUPERUSER_REGISTER_URL, payload, HTTP_AUTHORIZATION=VALID_AUTH_HEADER)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert str(response.data["detail"]["password_1"][0]) == "Ensure this field has at least 8 characters."
        assert str(response.data["detail"]["password_2"][0]) == "Ensure this field has at least 8 characters."
        assert not get_user_model().objects.filter(email=payload["email"]).exists()

    def test_passwords_not_the_same_error(self, api_client: APIClient):
        """
        GIVEN: Valid API key but payload with two different passwords.
        WHEN: POST request on SuperuserRegisterView.
        THEN: HTTP 400 returned, user not created.
        """
        payload = self.payload.copy()
        payload["password_2"] = "anoth3r_p4ssword"
        response = api_client.post(SUPERUSER_REGISTER_URL, payload, HTTP_AUTHORIZATION=VALID_AUTH_HEADER)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert str(response.data["detail"]["non_field_errors"][0]) == "Provided passwords are not the same."
        assert not get_user_model().objects.filter(email=payload["email"]).exists()
