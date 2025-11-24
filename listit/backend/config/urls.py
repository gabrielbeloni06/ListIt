from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from animes.views import AnimeViewSet
from filmes.views import FilmeViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'animes', AnimeViewSet, basename='Anime')
router.register(r'filmes', FilmeViewSet, basename='Filme')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]