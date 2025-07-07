"""URL configuration for LocalBox."""
from django.http import HttpResponse
from __future__ import annotations

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('files.urls')),
    path('auth/', include('knox.urls')),
]
urlpatterns += [path('healthz', lambda r: HttpResponse('ok'))]

