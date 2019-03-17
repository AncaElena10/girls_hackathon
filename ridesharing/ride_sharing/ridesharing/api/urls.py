from .viewsets import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'ridesharing', UserViewSet, base_name='login')
router.register(r'ridesharing', UserViewSet, base_name='ridesharing')
router.register(r'ride', RideViewSet, base_name='ride')
