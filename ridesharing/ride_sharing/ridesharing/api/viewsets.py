from rest_framework import viewsets, response
from .serializers import UserSerializer
from ridesharing.models import AppUser
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
    