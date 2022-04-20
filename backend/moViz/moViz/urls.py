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
router.register(r'genres', views.GenresView, basename='genres')
router.register(r'languages', views.LanguagesView, basename='languages')
router.register(r'movieTopTenMostPopular', views.MovieTopTenMostPopularView, basename='movieTopTenMostPopular')
router.register(r'movieTrendsVsYear', views.MovieTrendsVsYearView, basename='movieTrendsVsYear')
router.register(r'movieGenreVsBudgetVsRating', views.MovieGenreVsBudgetVsRatingView,
                basename='movieGenreVsBudgetVsRating')
router.register(r'movieLanguageVsAvgBudgetVsAvgRevenue', views.MovieLanguageVsAvgBudgetVsAvgRevenueView,
                basename='movieLanguageVsAvgBudgetVsAvgRevenue')
router.register(r'movieTopTenByRevenue', views.MovieTopTenByRevenue,
                basename='movieTopTenByRevenue')
router.register(r'peopleTopTenMostPopular', views.PeopleTopTenMostPopularView, basename='peopleTopTenMostPopular')
router.register(r'peopleGenderCount', views.PeopleGenderCountView, basename='peopleGenderCount')
router.register(r'peopleDepartmentCount', views.PeopleDepartmentCountView, basename='peopleDepartmentCount')
router.register(r'peoplePopularPlacesOfBirth', views.PeoplePopularPlacesOfBirthView,
                basename='peoplePopularPlacesOfBirth')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('moviz/', include('api.urls')),
]
