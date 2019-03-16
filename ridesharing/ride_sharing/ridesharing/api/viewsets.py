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

        print(email, password)
        try:
            user = AppUser.objects.get(email=email, password=password)
        except AppUser.DoesNotExist:
            return response.Response(status=404, data={'error': 'User does not exist'})
        
        serializer = self.serializer_class(user)
        return response.Response(serializer.data)
