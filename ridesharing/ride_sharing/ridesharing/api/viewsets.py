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
        email = request.data.get('email')
        password = request.get('password')
        first_name = request.get('firstName')
        last_name = request.get('lastName')
        phone = str(request.get('phone'))
        
        try:
            user = AppUser.objects.get(email=email)
        except AppUser.DoesNotExist:
            return response.Response(status=403, data={'error': 'This email is already in use!'})

        try:
            user = AppUser.objects.create(email=email, password=password, first_name=first_name, last_name=last_name, phone=phone)
            return response.Response(status=200, data={'error': 'Success'})
        except:
            return response.Response(status=500, data={'error': 'Coult not create the user'})
            
class RideViewSet(viewsets.GenericViewSet):
    serializer_class = RideSerializer
    queryset = AppUser.objects.all()

    @list_route(methods=['post'])
    def create_ride(self, request, **kwargs):
        start_pos_lat = request.data.get('start_pos_lat')
        start_pos_long = request.data.get('start_pos_long')
        end_pos_lat = request.data.get('end_pos_lat')
        end_pos_long = request.data.get('end_pos_long')
        name = request.data.get('trip_name')
        start_time = request.data.get('trip_time')
        driver_id = request.data.get('driver_id')
        cost = request.data.get('cost')
        free_slots = request.data.get('trip_seats')
        total_slots = request.data.get('trip_seats')
        status = Ride.CREATED
        
        try:
            driver = AppUser.objects.get(pk=driver_id)
        except AppUser.DoesNotExist:
            return response.Response(status=404, data={'error': 'This driver does not exists!'})

        Ride.objects.create(
            start_pos_long=start_pos_long,
            start_pos_lat=start_pos_lat,
            end_pos_long=end_pos_long,
            end_pos_lat=end_pos_lat,
            name=name,
            start_time=start_time,
            end_time=start_time,
            driver_id=driver,
            cost=cost,
            free_slots=free_slots,
            total_slots=total_slots,
            status=status
        )
        
        return response.Response(status=200)
