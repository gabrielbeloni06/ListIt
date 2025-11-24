from rest_framework import viewsets, permissions
from .models import Filme
from .serializers import FilmeSerializer

class FilmeViewSet(viewsets.ModelViewSet):
    serializer_class = FilmeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Filme.objects.filter(dono=self.request.user)

    def perform_create(self, serializer):
        serializer.save(dono=self.request.user)