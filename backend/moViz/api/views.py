from .models import *
from .serializers import *
from django.db.models import Avg, Count, Min, Sum
from django.db.models.functions import ExtractYear
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from api.utils import get_graph
from django.http import HttpResponse
import json


class MoviesCountVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MoviesCountVsYearSerializer
    queryset = MoviesDev.objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(count=Count('release_date')) \
        .order_by('-year')


class MovieTotalRevenuesVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieRevenuesVsYearSerializer
    queryset = MoviesDev.objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(revenue=Sum('revenue')) \
        .order_by('-year')


class MovieAvgRevenuesVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieRevenuesVsYearSerializer
    queryset = MoviesDev.objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(revenue=Avg('revenue')) \
        .order_by('-year')


class MovieTotalBudgetVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieBudgetVsYearSerializer
    queryset = MoviesDev.objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(budget=Sum('budget')) \
        .order_by('-year')


class MovieAvgBudgetVsYearView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieBudgetVsYearSerializer
    queryset = MoviesDev.objects \
        .exclude(release_date__isnull=True) \
        .values(year=ExtractYear('release_date')) \
        .annotate(budget=Avg('budget')) \
        .order_by('-year')

    # @method_decorator(cache_page(60 * 60 * 24))
    # def dispatch(self, *args, **kwargs):
    #     return super(MovieAvgBudgetVsYearView, self).dispatch(*args, **kwargs)


class ActorGenderCountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActorGenderCountSerializer
    queryset = People.objects \
        .filter(known_for_department='Acting') \
        .values('gender') \
        .annotate(count=Count('gender'))

    @method_decorator(cache_page(60 * 60 * 24))
    def dispatch(self, *args, **kwargs):
        return super(ActorGenderCountView, self).dispatch(*args, **kwargs)


# class RevenueByGenreAndYearView(viewsets.ReadOnlyModelViewSet):
#     serializer_class = RevenuesSerializer
#     queryset = Movies.objects.all()
# print(queryset)
# .annotate(revenue=Sum('revenue')).order_by()


class PopularPlacesOfBirthView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PopularPlacesOfBirthSerializer
    queryset = People.objects \
        .filter(known_for_department='Acting') \
        .values('place_of_birth') \
        .annotate(count=Count('place_of_birth')).order_by('-count')

    @method_decorator(cache_page(60 * 60 * 24))
    def dispatch(self, *args, **kwargs):
        return super(PopularPlacesOfBirthView, self).dispatch(*args, **kwargs)


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