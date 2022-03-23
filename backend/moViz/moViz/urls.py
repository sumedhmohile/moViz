"""moViz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'moviesCountVsYear', views.MoviesCountVsYearView, basename='moviesCountVsYear')
router.register(r'movieTotalRevenuesVsYear', views.MovieTotalRevenuesVsYearView, basename='movieTotalRevenuesVsYear')
router.register(r'movieAvgRevenuesVsYear', views.MovieAvgRevenuesVsYearView, basename='movieAvgRevenuesVsYear')
router.register(r'movieTotalBudgetVsYear', views.MovieTotalBudgetVsYearView, basename='movieTotalBudgetVsYear')
router.register(r'movieAvgBudgetVsYear', views.MovieAvgBudgetVsYearView, basename='movieAvgBudgetVsYear')
router.register(r'popularPlacesOfBirth', views.PopularPlacesOfBirthView, basename='popularPlacesOfBirth')
router.register(r'actorGenderCount', views.ActorGenderCountView, basename='actorGenderCount')
# router.register(r'movieTotalRevenuesVsGenreVsYear', views.MovieTotalRevenuesVsGenreVsYearView, basename='movieTotalRevenuesVsGenreVsYear')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('moviz/', include('api.urls')),
]