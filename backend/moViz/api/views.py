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


# @method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTopTenMostPopularView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieTopTenMostPopularSerializer
    queryset = Movies \
                   .objects \
                   .values('title', 'popularity', 'tagline', 'homepage', 'original_language', 'status', 'release_date',
                           'budget', 'revenue', 'runtime', 'vote_average', 'vote_count', 'poster_path') \
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
class MovieGenreVsBudgetVsRatingView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieGenreVsBudgetVsRatingSerializer
    queryset = MovieGenres \
        .objects \
        .filter(movie__status='Released', movie__budget__isnull=False, movie__vote_average__isnull=False,
                movie__vote_count__gt=10000) \
        .values(title=F('movie__title'), budget=F('movie__budget'), vote_average=F('movie__vote_average'),
                vote_count=F('movie__vote_count'), genre_name=F('genre__name'))


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieLanguageVsAvgBudgetVsAvgRevenueView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieLanguageVsAvgBudgetVsAvgRevenueSerializer
    queryset = Movies \
        .objects \
        .filter(status='Released', budget__isnull=False, revenue__isnull=False) \
        .values(language=F('original_language__english_name')) \
        .annotate(avg_budget=Avg('budget')) \
        .annotate(avg_revenue=Avg('revenue')) \
        .annotate(avg_popularity=Avg('popularity')) \
        .order_by('language')

    print(queryset[:10])


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTopTenByRevenue(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieTopTenByRevenueSerializer
    queryset = Movies \
        .objects \
        .filter(status='Released',  revenue__isnull=False) \
        .values('title', 'revenue', 'poster_path', 'vote_average', 'release_date', 'homepage') \
        .order_by('-revenue')[:10]


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class MovieTopTenByBudget(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovieTopTenByBudgetSerializer
    queryset = Movies \
                   .objects \
                   .filter(status='Released',  revenue__isnull=False, poster_path__isnull=False) \
                   .values('title', 'budget', 'poster_path', 'vote_average', 'release_date', 'homepage') \
                   .order_by('-budget')[:10]


@method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PeopleTopTenMostPopularView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PeopleTopTenMostPopularSerializer
    queryset = People \
                   .objects \
                   .values('person_id', 'name', 'popularity', 'known_for_department', 'profile_path', 'birthday', 'place_of_birth', 'adult') \
                   .exclude(adult=1) \
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


# @method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class ComparisonDataForPerson(viewsets.ReadOnlyModelViewSet):
    serializer_class = ComparisonDataForPersonSerializer

    def get_queryset(self):
        person_name = self.request.query_params.get('person_name')
        print("PERSON:" + str(person_name))

        person_id = People \
            .objects \
            .filter(name=person_name)[0]

        person_id = person_id.person_id

        person_credits = Credits \
            .objects \
            .filter(person=person_id)

        movie_ids = set()
        for credit in person_credits:
            movie_ids.add(credit.movie.movie_id)

        movie_genres = MovieGenres \
            .objects \
            .filter(movie__release_date__isnull=False, movie__status='Released', movie__movie_id__in=movie_ids, movie__revenue__isnull=False) \
            .values(genre_name=F('genre__name')) \
            .annotate(avg_budget=Avg('movie__budget')) \
            .annotate(avg_revenue=Avg('movie__revenue')) \
            .annotate(avg_popularity=Avg('movie__popularity')) \
            .annotate(avg_rating=Avg('movie__vote_average'))

        return movie_genres


# @method_decorator(cache_page(60 * 60 * 24), name='dispatch')
class PeopleCorrelation(viewsets.ReadOnlyModelViewSet):
    serializer_class = CorrelationSerializer

    def get_queryset(self):
        person_name1 = self.request.query_params.get('person_name1')
        person_name2 = self.request.query_params.get('person_name2')
        
        print("name1: " + person_name1)
        print("name2: " + person_name2)

        person_id1 = People \
                    .objects \
                    .filter(name=person_name1)[0]

        person_id2 = People \
            .objects \
            .filter(name=person_name2)[0]

        person_id1 = person_id1.person_id
        person_id2 = person_id2.person_id

        person1_credits = Credits \
            .objects \
            .filter(person=person_id1)

        person2_credits = Credits \
            .objects \
            .filter(person=person_id2)
        
        person1_movie_ids = set()
        common_movie_ids = set()
        
        for credit in person1_credits:
            person1_movie_ids.add(credit.movie.movie_id)
        
        for credit in person2_credits:
            print(credit.movie.title)
            if credit.movie.movie_id in person1_movie_ids:
                common_movie_ids.add(credit.movie.movie_id)


        movie_genres = MovieGenres \
            .objects \
            .filter(movie__release_date__isnull=False, movie__status='Released', movie__movie_id__in=common_movie_ids, movie__revenue__isnull=False) \
            .values(genre_name=F('genre__name')) \
            .annotate(avg_budget=Avg('movie__budget')) \
            .annotate(avg_revenue=Avg('movie__revenue')) \
            .annotate(avg_popularity=Avg('movie__popularity')) \
            .annotate(avg_rating=Avg('movie__vote_average')) \


        return movie_genres
            

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
