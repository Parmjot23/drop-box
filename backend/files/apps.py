from __future__ import annotations

from django.apps import AppConfig
from django.core.exceptions import ImproperlyConfigured
from django.conf import settings
import os
from pathlib import Path

class FilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'files'

    def ready(self) -> None:  # type: ignore[override]
        mount = Path(settings.MEDIA_ROOT)
        if not mount.exists():
            mount.mkdir(parents=True, exist_ok=True)
        if not os.access(mount, os.W_OK):
            raise ImproperlyConfigured(f'Mount point {mount} not writable')
