from rest_framework import serializers


class MoviesCountVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    count = serializers.IntegerField()


class MovieRevenuesVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    revenue = serializers.IntegerField()


class MovieBudgetVsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    budget = serializers.IntegerField()


class ActorGenderCountSerializer(serializers.Serializer):
    gender = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    count = serializers.IntegerField()


class PopularPlacesOfBirthSerializer(serializers.Serializer):
    place_of_birth = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    count = serializers.IntegerField()


class MovieTotalRevenuesVsGenreVsYearSerializer(serializers.Serializer):
    genre__name = serializers.CharField(max_length=255)
    year = serializers.IntegerField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=True)
