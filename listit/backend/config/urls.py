from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from animes.views import AnimeViewSet
from filmes.views import FilmeViewSet

router = DefaultRouter()
router.register(r'animes', AnimeViewSet)
router.register(r'filmes', FilmeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]