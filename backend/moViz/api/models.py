# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Countries(models.Model):
    iso_3166_1 = models.CharField(primary_key=True, max_length=255)
    english_name = models.CharField(max_length=255)
    native_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'countries'


class Credits(models.Model):
    movie = models.OneToOneField('Movies', models.DO_NOTHING, primary_key=True)
    person = models.ForeignKey('People', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'credits'
        unique_together = (('movie', 'person'),)


class Genres(models.Model):
    genre_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genres'


class Languages(models.Model):
    iso_639_1 = models.CharField(primary_key=True, max_length=255)
    english_name = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'languages'


class MovieGenres(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)
    genre = models.OneToOneField(Genres, models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'movie_genres'
        unique_together = (('genre', 'movie'),)


class MovieLanguages(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)
    iso_639_1 = models.OneToOneField(Languages, models.DO_NOTHING, db_column='iso_639_1', primary_key=True)

    class Meta:
        managed = False
        db_table = 'movie_languages'
        unique_together = (('iso_639_1', 'movie'),)


class MovieProductionCompanies(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)
    production_company = models.OneToOneField('ProductionCompanies', models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'movie_production_companies'
        unique_together = (('production_company', 'movie'),)


class MovieProductionCountries(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)
    iso_3166_1 = models.OneToOneField(Countries, models.DO_NOTHING, db_column='iso_3166_1', primary_key=True)

    class Meta:
        managed = False
        db_table = 'movie_production_countries'
        unique_together = (('iso_3166_1', 'movie'),)


class Movies(models.Model):
    backdrop_path = models.CharField(max_length=255, blank=True, null=True)
    budget = models.IntegerField(blank=True, null=True)
    homepage = models.CharField(max_length=255, blank=True, null=True)
    movie_id = models.IntegerField(primary_key=True)
    imdb_id = models.CharField(max_length=255, blank=True, null=True)
    original_language = models.ForeignKey(Languages, models.DO_NOTHING, db_column='original_language')
    original_title = models.CharField(max_length=255)
    overview = models.TextField(blank=True, null=True)
    popularity = models.FloatField()
    poster_path = models.CharField(max_length=255, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    revenue = models.IntegerField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255)
    vote_average = models.FloatField(blank=True, null=True)
    vote_count = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'movies'


class People(models.Model):
    birthday = models.DateField(blank=True, null=True)
    known_for_department = models.CharField(max_length=255, blank=True, null=True)
    deathday = models.DateField(blank=True, null=True)
    person_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=255, blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    popularity = models.FloatField()
    place_of_birth = models.CharField(max_length=255, blank=True, null=True)
    profile_path = models.CharField(max_length=255, blank=True, null=True)
    adult = models.IntegerField()
    imdb_id = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'people'


class ProductionCompanies(models.Model):
    description = models.CharField(max_length=255, blank=True, null=True)
    headquarters = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=255, blank=True, null=True)
    production_company_id = models.IntegerField(primary_key=True)
    logo_path = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    origin_country = models.CharField(max_length=255, blank=True, null=True)
    parent_company_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'production_companies'
