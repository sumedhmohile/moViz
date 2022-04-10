from rest_framework import serializers


class GenresSerializer(serializers.Serializer):
    genre_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)


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


class MovieTotalRevenueVsGenreVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    genre__name = serializers.CharField(max_length=255)
    revenue = serializers.IntegerField()


class MovieCountVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    count = serializers.IntegerField()


class MovieRevenueVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    revenue = serializers.IntegerField()


class MovieBudgetVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    budget = serializers.IntegerField()


class MovieRuntimeVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    runtime = serializers.IntegerField()


class MovieTotalRevenuesVsGenreVsYearSerializer(serializers.Serializer):
    genre__name = serializers.CharField(max_length=255)
    year = serializers.IntegerField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=True)


class PeopleTopTenMostPopularSerializer(serializers.Serializer):
    person_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
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
