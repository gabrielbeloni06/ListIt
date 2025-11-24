from django.db import models
from django.contrib.auth.models import User

class Filme(models.Model):
    dono = models.ForeignKey(User, on_delete=models.CASCADE, related_name='filmes')
    
    titulo = models.CharField(max_length=200)
    api_id = models.IntegerField()
    capa_url = models.URLField(max_length=500, blank=True, null=True)
    nota_pessoal = models.IntegerField(default=0)
    comentario = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.titulo} ({self.dono.username})"