from rest_framework import serializers
from ridesharing.models import AppUser, Ride

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = AppUser
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'rating', 'no_votes')

class RideSerializer(serializers.ModelSerializer):
    driver_name = serializers.SerializerMethodField()

    class Meta:
        model = Ride
        fields = ('start_pos_lat', 'start_pos_long', 'trip_from', 'trip_to',
            'end_pos_lat', 'end_pos_long', 'start_time', 'end_time', 
            'driver_id', 'driver_name', 'cost', 'free_slots', 'total_slots', 'passengers', 'status')

        read_only_fields = (
            'driver_name',
        )
    
    def get_driver_name(self, obj):
        return "{} {}".format(obj.driver_id.first_name, obj.driver_id.last_name)