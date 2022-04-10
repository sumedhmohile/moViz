from rest_framework import serializers


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


class MovieTopTenMostPopularSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    popularity = serializers.FloatField()


class MovieTotalRevenuesVsGenreVsYearSerializer(serializers.Serializer):
    genre__name = serializers.CharField(max_length=255)
    year = serializers.IntegerField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=True)


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


class PeopleTopTenMostPopularSerializer(serializers.Serializer):
    person_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    popularity = serializers.FloatField()
