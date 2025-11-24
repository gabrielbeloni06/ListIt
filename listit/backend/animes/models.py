from django.db import models

class Anime(models.Model):
    titulo = models.CharField(max_length=200)
    api_id = models.IntegerField(unique=True, help_text="ID do anime no MyAnimeList/Jikan")
    capa_url = models.URLField(max_length=500, blank=True, null=True)
    nota_pessoal = models.IntegerField(default=0, choices=[(i, str(i)) for i in range(1, 11)])
    comentario = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.titulo} - Nota: {self.nota_pessoal}"