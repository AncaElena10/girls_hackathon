from rest_framework import serializers
from ridesharing.models import AppUser, Ride

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = AppUser
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'rating', 'no_votes')

class RideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ride
        fields = ('start_pos_lat', 'start_pos_long', 
            'end_pos_lat', 'end_pos_long', 'start_time', 'end_time', 
            'driver_id', 'cost', 'free_slots', 'total_slots', 'passengers', 'status')