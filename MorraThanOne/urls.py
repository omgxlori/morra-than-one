from django.urls import path
from .views import poll_api

urlpatterns = [
    path("api/poll/", poll_api, name="poll_api"),
]