from __future__ import annotations

from ratelimit.decorators import ratelimit
from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser

from .models import File
from .serializers import FileSerializer


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all().order_by('-uploaded_at')
    serializer_class = FileSerializer
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['file']

    def get_queryset(self):
        qs = super().get_queryset()
        ext = self.request.query_params.get('ext')
        if ext:
            qs = qs.filter(file__iendswith=ext)
        return qs

    @ratelimit(key='ip', rate='20M/s', method='POST', block=True)
    def create(self, request, *args, **kwargs):  # noqa: D401
        """Handle file upload."""
        return super().create(request, *args, **kwargs)

