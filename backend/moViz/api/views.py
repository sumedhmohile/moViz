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
class MoviesCountVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MoviesCountVsYearSerializer
    queryset = Movies \
        .objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(count=Count('release_date')) \
        .order_by('-year')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTotalRevenuesVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieRevenuesVsYearSerializer
    queryset = Movies \
        .objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(revenue=Sum('revenue')) \
        .order_by('-year')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieAvgRevenuesVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieRevenuesVsYearSerializer
    queryset = Movies \
        .objects \
        .exclude(release_date__isnull=True) \
        .exclude(revenue=0) \
        .values(year=ExtractYear('release_date')) \
        .annotate(revenue=Avg('revenue')) \
        .order_by('-year')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTotalBudgetVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieBudgetVsYearSerializer
    queryset = Movies \
        .objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(budget=Sum('budget')) \
        .order_by('-year')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieAvgBudgetVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieBudgetVsYearSerializer
    queryset = Movies \
        .objects \
        .exclude(release_date__isnull=True) \
        .exclude(budget=0) \
        .values(year=ExtractYear('release_date')) \
        .annotate(budget=Avg('budget')) \
        .order_by('-year')


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class ActorGenderCountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActorGenderCountSerializer
    queryset = People \
        .objects \
        .filter(known_for_department='Acting') \
        .values('gender') \
        .annotate(count=Count('gender'))


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PopularPlacesOfBirthView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PopularPlacesOfBirthSerializer
    queryset = People \
        .objects \
        .filter(known_for_department='Acting') \
        .values('place_of_birth') \
        .annotate(count=Count('place_of_birth')) \
        .order_by('-count')


# # @method_decorator(cache_page(60 * 60 * 24), name='dispatch')
# class MovieTotalRevenuesVsGenreVsYearView(viewsets.ReadOnlyModelViewSet):
#     serializer_class = MovieTotalRevenuesVsGenreVsYearSerializer
#     queryset = MovieGenres \
#         .objects \
#         .values('genre__name', year=ExtractYear('movie__release_date')) \
#         .annotate(revenue=Sum('movie__revenue'))
#
#     print(len(queryset))


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
