from __future__ import annotations

from rest_framework import serializers
from .models import File


class FileSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ['id', 'uploaded_by', 'file', 'uploaded_at', 'size', 'download_url']

    def get_download_url(self, obj: File) -> str:
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url

