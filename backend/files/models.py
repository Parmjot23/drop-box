from __future__ import annotations

import uuid
from pathlib import Path
from django.db import models
from django.core.files.storage import FileSystemStorage


class ExternalStorage(FileSystemStorage):
    """Storage on mounted drive with UUID filenames."""

    def __init__(self, *args: str, **kwargs: str) -> None:
        super().__init__(location='/mnt/localbox', *args, **kwargs)

    def get_available_name(self, name: str, max_length: int | None = None) -> str:
        ext = Path(name).suffix
        original = Path(name).name
        return f"{uuid.uuid4()}_{original}"


storage = ExternalStorage()


class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uploaded_by = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(storage=storage)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    size = models.BigIntegerField()

    def save(self, *args, **kwargs) -> None:
        if self.file and not self.size:
            self.size = self.file.size
        super().save(*args, **kwargs)

    def __str__(self) -> str:  # pragma: no cover
        return self.file.name

