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
router.register(r'movieCountVsYear', views.MovieCountVsYearView, basename='movieCountVsYear')
router.register(r'movieTotalRevenueVsYear', views.MovieTotalRevenueVsYearView, basename='movieTotalRevenueVsYear')
router.register(r'movieAvgRevenueVsYear', views.MovieAvgRevenueVsYearView, basename='movieAvgRevenueVsYear')
router.register(r'movieTotalBudgetVsYear', views.MovieTotalBudgetVsYearView, basename='movieTotalBudgetVsYear')
router.register(r'movieAvgBudgetVsYear', views.MovieAvgBudgetVsYearView, basename='movieAvgBudgetVsYear')
router.register(r'movieAvgRuntimeVsYear', views.MovieAvgRuntimeVsYearView, basename='movieAvgRuntimeVsYear')
router.register(r'movieTopTenMostPopular', views.MovieTopTenMostPopularView, basename='movieTopTenMostPopular')
router.register(r'actorGenderCount', views.ActorGenderCountView, basename='actorGenderCount')
router.register(r'peopleGenderCount', views.PeopleGenderCountView, basename='peopleGenderCount')
router.register(r'peopleDepartmentCount', views.PeopleDepartmentCountView, basename='peopleDepartmentCount')
router.register(r'peoplePopularPlacesOfBirth', views.PeoplePopularPlacesOfBirthView,
                basename='peoplePopularPlacesOfBirth')
router.register(r'peopleTopTenMostPopular', views.PeopleTopTenMostPopularView, basename='peopleTopTenMostPopular')
# router.register(r'movieTotalRevenuesVsGenreVsYear', views.MovieTotalRevenuesVsGenreVsYearView, basename='movieTotalRevenuesVsGenreVsYear')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('moviz/', include('api.urls')),
]
