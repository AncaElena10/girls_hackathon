from rest_framework import viewsets, response
from .serializers import UserSerializer, RideSerializer
from ridesharing.models import AppUser, Ride
from rest_framework.decorators import list_route, detail_route

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
        password = request.data.get('password')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        phone = str(request.data.get('phone'))
        
        try:
            user = AppUser.objects.get(email=email)
            return response.Response(status=403, data={'error': 'This email is already in use!'})
        except AppUser.DoesNotExist:
            pass
        try:
            user = AppUser.objects.create(email=email, password=password, first_name=first_name, last_name=last_name, phone=phone)
            return response.Response(status=200, data={'error': 'Success'})
        except:
            return response.Response(status=500, data={'error': 'Coult not create the user'})

    @detail_route(methods=['post'])
    def vote(self, request, pk, **kwargs):
        vote = request.data.get('vote')

        try:
            user = AppUser.objects.get(pk=pk)
        except AppUser.DoesNotExist:
            return response.Response(status=404, data={'error': 'This user does not exist!'})
        
        user.rating += vote
        user.no_votes += 1

        user.save()
        return response.Response(status=200, data={"message": "OK"})

class RideViewSet(viewsets.GenericViewSet):
    serializer_class = RideSerializer
    queryset = Ride.objects.all()

    @list_route(methods=['post'])
    def create_ride(self, request, **kwargs):
        start_pos_lat = request.data.get('start_pos_lat')
        start_pos_long = request.data.get('start_pos_long')
        end_pos_lat = request.data.get('end_pos_lat')
        end_pos_long = request.data.get('end_pos_long')
        trip_from = request.data.get('trip_from')
        trip_to = request.data.get('trip_to')
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
            trip_from=trip_from,
            trip_to=trip_to,
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

    @detail_route(methods=['post'])
    def add_user_to_ride(self, request, pk, **kwargs):
        try:
            # pk e id-ul ride-ului
            ride = Ride.objects.get(pk=pk)
        except Ride.DoesNotExist:
            return response.Response(status=404, data={'error': 'This ride does not exist'})
        
        try:
            passenger_id = request.data.get('passenger_id')
        except AppUser.DoesNotExist:
            return response.Response(status=404, data={'error': 'This user does not exist'})
        
        if ride.free_slots > 0:
            ride.free_slots -= 1
            passengers = ride.passengers_get('ids', [])

            if passenger_id in passengers:
                return response.Response(status=405, data={'error': 'You have already chosen this ride'})
            passengers.append(passenger_id)
            ride.passengers_set('ids', passengers)
            ride.save()
            return response.Response(status=200, data={'message': "OK"})

        return response.Response(status=404, data={'error': 'No more free seats :('})

    @detail_route(methods=['get'])
    def list_rides_history(self, request, pk, **kwargs):
        try:
            user = AppUser.objects.get(pk=pk)
        except AppUser.DoesNotExist:
            return response.Response(status=404, data={'error': 'This user does not exist!'})

        all_entries = Ride.objects.filter(passengers__ids__icontains=pk)
        serializer = self.get_serializer(all_entries, many=True)
        return response.Response(serializer.data)