from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from animes.views import AnimeViewSet
router = DefaultRouter()
router.register(r'animes', AnimeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]