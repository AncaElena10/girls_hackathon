from django.db import models

# Create your models here.
class AppUser(models.Model):
    email = models.CharField('Email', max_length=255, null=False, blank=False)
    password = models.CharField('Password', max_length=255, null=False, blank=False)
    first_name = models.CharField('First Name', max_length=255, null=False, blank=False)
    last_name = models.CharField('Last Name', max_length=255, null=False, blank=False)
    rating = models.IntegerField()
    no_votes = models.IntegerField()

class Ride(models.Model):
    PLANNED = "Planned"
    ACTIVE = "Active"
    FINISHED = "Finished"
    CANCELED = "Canceled"

    STATE = (
        (PLANNED, "Planned"),
        (ACTIVE, "Active"),
        (FINISHED, "Finished"),
        (CANCELED, "Canceled"),
    )
    start_pos_lat = models.FloatField()
    start_pos_long = models.FloatField()
    end_pos_lat = models.FloatField()
    end_pos_long = models.FloatField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    driver_id = models.ForeignKey('AppUser', null=False, on_delete=models.CASCADE)
    cost = models.FloatField()
    free_slots = models.IntegerField()
    total_slots = models.IntegerField()
    passengers = models.CharField(max_length=200)
    status = models.CharField(max_length=50, choices=STATE, null=False, blank=False)

    def set_passengers(self, x):
        self.passengers = json.dumps(x)

    def get_passengers(self):
        return json.loads(self.passengers)