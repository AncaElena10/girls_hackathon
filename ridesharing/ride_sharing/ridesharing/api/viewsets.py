from rest_framework import viewsets, response
from .serializers import UserSerializer, RideSerializer
from ridesharing.models import AppUser, Ride
from rest_framework.decorators import list_route

class UserViewSet(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = AppUser.objects.all()

    @list_route(methods=['post'])
    def login(self, request, **kwargs):
        email = request.data['email']
        password = request.data['password']

        try:
            user = AppUser.objects.get(email=email, password=password)
        except AppUser.DoesNotExist:
            return response.Response(status=404, data={'error': 'User does not exist'})
        
        serializer = self.serializer_class(user)
        return response.Response(serializer.data)

    @list_route(methods=['post'])
    def register(self, request, **kwargs):
        email = request.data['email']
        password = request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        phone = str(request.data['phone'])

        try:
            user = AppUser.objects.create(email=email, password=password, first_name=first_name, last_name=last_name, phone=phone)
            return response.Response(status=200, data={'error': 'Success'})
        except:
            return response.Response(status=500, data={'error': 'Coult not create the user'})
            
class RideViewSet(viewsets.GenericViewSet):
    serializer_class = RideSerializer
    queryset = AppUser.objects.all()

    @list_route(methods=['post'])
    def createRide(self, request, **kwargs):
        start_pos_lat = request.data['start_pos_lat']
        start_pos_long = request.data['start_pos_long']
        end_pos_lat = request.data['end_pos_lat']
        end_pos_long = request.data['end_pos_long']
        start_time = request.data['start_time']
        end_time = request.data['end_time']
        driver_id = request.data['driver_id']
        cost = request.data['cost']
        free_slots = request.data['free_slots']
        total_slots = request.data['total_slots']
        passengers = request.data['passengers']
        status = request.data['status']
        print(driver_id, start_time)
        
        try:
            ride = Ride.objects.create(start_pos_long = start_pos_long,
                start_pos_lat = start_pos_lat,
                end_pos_long = end_pos_long,
                end_pos_lat = end_pos_lat,
                start_time = start_time,
                end_time = end_time,
                driver_id = driver_id,
                cost = cost,
                free_slots = free_slots,
                total_slots = total_slots,
                passengers = passengers,
                status = status)

        except Ride.DoesNotExist:
            return response.Response(status=404, data={'error': 'Ride not created.'})
        
        serializer = self.serializer_class(ride)
        return response.Response(serializer.data)
