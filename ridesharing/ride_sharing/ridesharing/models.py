from django.db import models
import dpath.util
from django.contrib.postgres.fields import JSONField

# Create your models here.
class AppUser(models.Model):
    email = models.CharField('Email', max_length=255, null=False, blank=False)
    password = models.CharField('Password', max_length=255, null=False, blank=False)
    first_name = models.CharField('First Name', max_length=255, null=False, blank=False)
    last_name = models.CharField('Last Name', max_length=255, null=False, blank=False)
    rating = models.IntegerField(default=0)
    no_votes = models.IntegerField(default=0)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.first_name + " " + self.last_name

class Ride(models.Model):
    CREATED = "Created"
    IN_PROGRESS = "In_Progress"
    FINISHED = "Finished"
    CANCELED = "Canceled"

    STATE = (
        (CREATED, "Created"),
        (IN_PROGRESS, "In_Progress"),
        (FINISHED, "Finished"),
        (CANCELED, "Canceled"),
    )

    start_pos_lat = models.FloatField()
    start_pos_long = models.FloatField()
    end_pos_lat = models.FloatField()
    end_pos_long = models.FloatField()
    name = models.CharField(max_length=32, null=True)
    trip_from = models.CharField(max_length=100)
    trip_to = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True)
    driver_id = models.ForeignKey('AppUser', null=False, on_delete=models.CASCADE)
    cost = models.FloatField()
    free_slots = models.IntegerField()
    total_slots = models.IntegerField()
    passengers = JSONField(default=dict, blank=True,)
    status = models.CharField(max_length=50, choices=STATE, null=False, blank=False)

    def passengers_get(self, path, default=None):
        try:
            return dpath.util.get(self.passengers, path)
        except KeyError:
            return default

    def passengers_set(self, path, value):
        dpath.util.new(self.passengers, path, value)
