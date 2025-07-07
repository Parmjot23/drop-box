from __future__ import annotations

from django.urls import reverse
from rest_framework.test import APIClient
import pytest
from files.models import File
from pathlib import Path


def test_upload_list_delete(tmp_path, settings):
    settings.MEDIA_ROOT = tmp_path
    client = APIClient()
    upload = tmp_path / 'sample.txt'
    upload.write_text('hello')
    with upload.open('rb') as fp:
        resp = client.post(reverse('file-list'), {'file': fp}, format='multipart')
    assert resp.status_code == 201
    file_id = resp.data['id']
    resp = client.get(reverse('file-list'))
    assert resp.status_code == 200
    assert resp.data['count'] == 1
    resp = client.delete(reverse('file-detail', args=[file_id]))
    assert resp.status_code == 204


def test_404(client):
    resp = client.get('/nope/')
    assert resp.status_code == 404


def test_storage_path(tmp_path, settings):
    settings.MEDIA_ROOT = tmp_path
    file = File.objects.create(file='name.txt', size=1)
    assert Path(file.file.storage.location) == tmp_path

