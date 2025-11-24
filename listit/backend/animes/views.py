from rest_framework import viewsets, permissions
from .models import Anime
from .serializers import AnimeSerializer

class AnimeViewSet(viewsets.ModelViewSet):
    serializer_class = AnimeSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Anime.objects.filter(dono=self.request.user)
    def perform_create(self, serializer):
        serializer.save(dono=self.request.user)