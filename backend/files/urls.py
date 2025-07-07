from __future__ import annotations

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import FileViewSet

router = DefaultRouter()
router.register('files', FileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

