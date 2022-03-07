from django.urls import path

from . import views

urlpatterns = [
    path('graph/', views.request_resolver, name='request_resolver'),
    path('', views.index, name='index'),
]