# files/apps.py
import os
from django.core.exceptions import ImproperlyConfigured


def ready(self):
    # Change to a Windows-friendly path for local dev
    mount_point = 'C:\\localbox'  # You can set this to anywhere you want
    if not os.path.exists(mount_point):
        os.makedirs(mount_point, exist_ok=True)
    if not os.access(mount_point, os.W_OK):
        raise ImproperlyConfigured(f'Mount point {mount_point} not writable')
