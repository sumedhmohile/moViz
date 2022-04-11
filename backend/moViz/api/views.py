from .models import *
from .serializers import *
from django.db.models import Avg, Count, Min, Sum, F
from django.db.models.functions import ExtractYear
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets

from django.views.decorators.csrf import csrf_exempt
from api.utils import get_graph
from django.http import HttpResponse
import json


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class GenresView(viewsets.ReadOnlyModelViewSet):
    serializer_class = GenresSerializer
    queryset = Genres \
        .objects \
        .all() \
        .order_by('name')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class LanguagesView(viewsets.ReadOnlyModelViewSet):
    serializer_class = LanguagesSerializer
    queryset = Languages \
        .objects \
        .all() \
        .order_by('english_name')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTopTenMostPopularView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieTopTenMostPopularSerializer
    queryset = Movies \
                   .objects \
                   .values('title', 'popularity', 'tagline', 'homepage', 'original_language', 'status', 'release_date',
                           'budget', 'revenue', 'runtime', 'vote_average', 'vote_count') \
                   .order_by('-popularity')[:10]


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTrendsVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieTrendsVsYearSerializer
    queryset = MovieGenres \
        .objects \
        .filter(movie__release_date__isnull=False, movie__status='Released') \
        .values(year=ExtractYear('movie__release_date'), genre_name=F('genre__name')) \
        .annotate(count=Count('movie__release_date')) \
        .annotate(total_revenue=Sum('movie__revenue')) \
        .annotate(avg_revenue=Avg('movie__revenue')) \
        .annotate(total_budget=Sum('movie__budget')) \
        .annotate(avg_budget=Avg('movie__budget')) \
        .annotate(avg_runtime=Avg('movie__runtime')) \
        .annotate(avg_popularity=Avg('movie__popularity')) \
        .order_by('-year')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PeopleTopTenMostPopularView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PeopleTopTenMostPopularSerializer
    queryset = People \
                   .objects \
                   .values('person_id', 'name', 'popularity') \
                   .order_by('-popularity')[:10]


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PeopleGenderCountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PeopleGenderCountSerializer
    queryset = People \
        .objects \
        .filter(known_for_department__isnull=False, gender__isnull=False) \
        .values('known_for_department', 'gender') \
        .annotate(count=Count('gender')) \
        .order_by('known_for_department', 'gender')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PeopleDepartmentCountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PeopleDepartmentCountSerializer
    queryset = People \
        .objects \
        .filter(known_for_department__isnull=False) \
        .values('known_for_department') \
        .annotate(count=Count('known_for_department')) \
        .order_by('-count')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PeoplePopularPlacesOfBirthView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PeoplePopularPlacesOfBirthSerializer
    queryset = People \
        .objects \
        .filter(place_of_birth__isnull=False) \
        .values('place_of_birth') \
        .annotate(count=Count('place_of_birth')) \
        .order_by('-count')


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def request_resolver(request):
    print("Request is: " + str(request.POST))
    print(json.loads(request.body))

    request_data = json.loads(request.body)

    graph_id = request_data['graphID']
    graph_data = None

    if 'graphData' in request_data:
        graph_data = request_data['graphData']

    result = get_graph(graph_id, graph_data)

    print(result)

    return HttpResponse(json.dumps(result), content_type='application/json', status=200)
