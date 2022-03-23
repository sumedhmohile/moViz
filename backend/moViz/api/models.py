# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Actors(models.Model):
    actor_id = models.IntegerField(primary_key=True)
    name = models.CharField(db_column='NAME', max_length=255)  # Field name made lowercase.
    popularity = models.FloatField(db_column='POPULARITY', blank=True, null=True)  # Field name made lowercase.
    birthday = models.CharField(db_column='BIRTHDAY', max_length=255, blank=True, null=True)  # Field name made lowercase.
    department = models.CharField(db_column='DEPARTMENT', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gender = models.IntegerField(db_column='GENDER', blank=True, null=True)  # Field name made lowercase.
    place_of_birth = models.CharField(db_column='PLACE_OF_BIRTH', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'actors'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Countries(models.Model):
    iso_3166_1 = models.CharField(primary_key=True, max_length=255)
    english_name = models.CharField(max_length=255)
    native_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'countries'


class Credits(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING, blank=True, null=True)
    actor = models.ForeignKey(Actors, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'credits'


class CreditsDev(models.Model):
    movie = models.OneToOneField('MoviesDev', models.DO_NOTHING, primary_key=True)
    person = models.ForeignKey('People', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'credits_dev'
        unique_together = (('movie', 'person'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FactTable(models.Model):
    backdrop_path = models.CharField(max_length=255, blank=True, null=True)
    budget = models.IntegerField(blank=True, null=True)
    movie_homepage = models.CharField(max_length=255, blank=True, null=True)
    movie_id = models.IntegerField(blank=True, null=True)
    movie_imdb_id = models.CharField(max_length=255, blank=True, null=True)
    original_language = models.CharField(max_length=255, blank=True, null=True)
    original_title = models.CharField(max_length=255, blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    movie_popularity = models.FloatField(blank=True, null=True)
    poster_path = models.CharField(max_length=255, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    revenue = models.IntegerField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    tagline = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    vote_average = models.FloatField(blank=True, null=True)
    vote_count = models.IntegerField(blank=True, null=True)
    person_id = models.IntegerField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    known_for_department = models.CharField(max_length=255, blank=True, null=True)
    deathday = models.DateField(blank=True, null=True)
    person_name = models.CharField(max_length=255)
    gender = models.IntegerField()
    biography = models.TextField()
    person_popularity = models.FloatField()
    place_of_birth = models.CharField(max_length=255, blank=True, null=True)
    profile_path = models.CharField(max_length=255, blank=True, null=True)
    person_imdb_id = models.CharField(max_length=255, blank=True, null=True)
    person_homepage = models.CharField(max_length=255, blank=True, null=True)
    genre_id = models.IntegerField(blank=True, null=True)
    genre = models.CharField(max_length=255, blank=True, null=True)
    production_company_id = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    headquarters = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=255, blank=True, null=True)
    logo_path = models.CharField(max_length=255, blank=True, null=True)
    production_company_name = models.CharField(max_length=255, blank=True, null=True)
    origin_country = models.CharField(max_length=255, blank=True, null=True)
    parent_company_id = models.IntegerField(blank=True, null=True)
    iso_3166_1 = models.CharField(max_length=255, blank=True, null=True)
    english_country_name = models.CharField(max_length=255, blank=True, null=True)
    native_name = models.CharField(max_length=255, blank=True, null=True)
    iso_639_1 = models.CharField(max_length=255, blank=True, null=True)
    english_language_name = models.CharField(max_length=255, blank=True, null=True)
    language = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fact_table'


class GenreMapping(models.Model):
    genre = models.OneToOneField('Genres', models.DO_NOTHING, primary_key=True)
    movie = models.ForeignKey('Movies', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'genre_mapping'
        unique_together = (('genre', 'movie'),)


class GenreMappingDev(models.Model):
    genre = models.OneToOneField('Genres', models.DO_NOTHING, primary_key=True)
    movie = models.ForeignKey('MoviesDev', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'genre_mapping_dev'
        unique_together = (('genre', 'movie'),)


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


class Movies(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    budget = models.DecimalField(db_column='BUDGET', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    language = models.CharField(db_column='LANGUAGE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    popularity = models.FloatField(db_column='POPULARITY', blank=True, null=True)  # Field name made lowercase.
    release_date = models.DateField(db_column='RELEASE_DATE', blank=True, null=True)  # Field name made lowercase.
    revenue = models.DecimalField(db_column='REVENUE', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    runtime = models.IntegerField(db_column='RUNTIME', blank=True, null=True)  # Field name made lowercase.
    rating = models.FloatField(db_column='RATING', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'movies'


class MoviesDev(models.Model):
    backdrop_path = models.CharField(max_length=255, blank=True, null=True)
    budget = models.IntegerField()
    homepage = models.CharField(max_length=255, blank=True, null=True)
    movie_id = models.IntegerField(primary_key=True)
    imdb_id = models.CharField(max_length=255, blank=True, null=True)
    original_language = models.CharField(max_length=255)
    original_title = models.CharField(max_length=255)
    overview = models.TextField(blank=True, null=True)
    popularity = models.FloatField()
    poster_path = models.CharField(max_length=255, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    revenue = models.IntegerField()
    runtime = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255)
    vote_average = models.FloatField()
    vote_count = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'movies_dev'


class People(models.Model):
    birthday = models.DateField(blank=True, null=True)
    known_for_department = models.CharField(max_length=255, blank=True, null=True)
    deathday = models.DateField(blank=True, null=True)
    person_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    gender = models.IntegerField()
    biography = models.TextField()
    popularity = models.FloatField()
    place_of_birth = models.CharField(max_length=255, blank=True, null=True)
    profile_path = models.CharField(max_length=255, blank=True, null=True)
    imdb_id = models.CharField(max_length=255, blank=True, null=True)
    homepage = models.CharField(max_length=255, blank=True, null=True)
    birthday_temp = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'people'


class ProductionCompanies(models.Model):
    description = models.CharField(max_length=255)
    headquarters = models.CharField(max_length=255)
    homepage = models.CharField(max_length=255)
    production_company_id = models.IntegerField(primary_key=True)
    logo_path = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    origin_country = models.CharField(max_length=255, blank=True, null=True)
    parent_company_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'production_companies'


class ProductionCompanyMapping(models.Model):
    production_company = models.OneToOneField(ProductionCompanies, models.DO_NOTHING, primary_key=True)
    movie = models.ForeignKey(MoviesDev, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'production_company_mapping'
        unique_together = (('production_company', 'movie'),)


class ProductionCountryMapping(models.Model):
    iso_3166_1 = models.OneToOneField(Countries, models.DO_NOTHING, db_column='iso_3166_1', primary_key=True)
    movie = models.ForeignKey(MoviesDev, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'production_country_mapping'
        unique_together = (('iso_3166_1', 'movie'),)


class SpokenLanguageMapping(models.Model):
    iso_639_1 = models.OneToOneField(Languages, models.DO_NOTHING, db_column='iso_639_1', primary_key=True)
    movie = models.ForeignKey(MoviesDev, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'spoken_language_mapping'
        unique_together = (('iso_639_1', 'movie'),)


class Test(models.Model):
    a = models.CharField(db_column='A', max_length=255, blank=True, null=True)  # Field name made lowercase.
    b = models.IntegerField(db_column='B', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'test'
