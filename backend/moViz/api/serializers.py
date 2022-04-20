from rest_framework import serializers


class GenresSerializer(serializers.Serializer):
    genre_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)


class LanguagesSerializer(serializers.Serializer):
    iso_639_1 = serializers.CharField(max_length=255)
    english_name = serializers.CharField(max_length=255)
    name = serializers.CharField(max_length=255, allow_blank=True)


class MovieTopTenMostPopularSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    popularity = serializers.FloatField()
    tagline = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    homepage = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    original_language = serializers.CharField(max_length=255)
    status = serializers.CharField(max_length=255)
    release_date = serializers.DateField(allow_null=True)
    budget = serializers.IntegerField(allow_null=True)
    revenue = serializers.IntegerField(allow_null=True)
    runtime = serializers.IntegerField(allow_null=True)
    vote_average = serializers.FloatField(allow_null=True)
    vote_count = serializers.IntegerField()
    poster_path = serializers.CharField(allow_null=True, max_length=255)


class MovieTrendsVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    genre_name = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    count = serializers.IntegerField()
    total_revenue = serializers.IntegerField()
    total_budget = serializers.IntegerField()
    avg_revenue = serializers.FloatField()
    avg_budget = serializers.FloatField()
    avg_runtime = serializers.FloatField()
    avg_popularity = serializers.FloatField()


class MovieGenreVsBudgetVsRatingSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    budget = serializers.IntegerField(allow_null=True)
    vote_average = serializers.FloatField(allow_null=True)
    vote_count = serializers.IntegerField()
    genre_name = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)


class MovieLanguageVsAvgBudgetVsAvgRevenueSerializer(serializers.Serializer):
    language = serializers.CharField(max_length=255)
    avg_budget = serializers.FloatField()
    avg_revenue = serializers.FloatField()
    avg_popularity = serializers.FloatField()
    
class MovieTopTenByRevenueSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    revenue = serializers.IntegerField(allow_null=True)
    poster_path = serializers.CharField(allow_null=True, max_length=255)

class MovieTopTenByBudgetSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    budget = serializers.IntegerField(allow_null=True)
    poster_path = serializers.CharField(allow_null=True, max_length=255)


class PeopleTopTenMostPopularSerializer(serializers.Serializer):
    person_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    known_for_department = serializers.CharField(max_length=255)
    profile_path = serializers.CharField(max_length=255)
    birthday = serializers.DateField()
    place_of_birth = serializers.CharField(max_length=255)
    popularity = serializers.FloatField()


class PeopleGenderCountSerializer(serializers.Serializer):
    known_for_department = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    gender = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    count = serializers.IntegerField()


class PeopleDepartmentCountSerializer(serializers.Serializer):
    known_for_department = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    count = serializers.IntegerField()


class PeoplePopularPlacesOfBirthSerializer(serializers.Serializer):
    place_of_birth = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    count = serializers.IntegerField()
