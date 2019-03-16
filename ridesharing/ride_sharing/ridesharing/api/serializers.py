from rest_framework import serializers
from ridesharing.models import AppUser

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = AppUser
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'rating', 'no_votes')