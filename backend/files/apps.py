from __future__ import annotations

from django.apps import AppConfig
from django.core.exceptions import ImproperlyConfigured
import os
from pathlib import Path

class FilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'files'

    def ready(self) -> None:  # type: ignore[override]
        mount = Path('/mnt/localbox')
        if not mount.exists() or not os.access(mount, os.W_OK):
            raise ImproperlyConfigured('Mount point /mnt/localbox not writable')
