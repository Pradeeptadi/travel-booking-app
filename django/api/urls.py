from django.urls import path
from .views import (
    BookingListCreateView, 
    UserBookingView,
    BookingDetailView,
    RegisterView,
    LoginView,
    BookingView,
    BusListView,
    BusDetailView,
)
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('buses/', BusListView.as_view(), name='bus-list'),
    path('buses/<int:pk>/', BusDetailView.as_view(), name='bus-detail'),  # <-- Add this line
    
    path('bookings/', BookingListCreateView.as_view(), name='booking-list-create'),
    path('booking/', BookingView.as_view(), name='booking-post'),
    path('booking/<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),
    path('user/<int:user_id>/booking/', UserBookingView.as_view(), name='user-bookings'),
    path('login/', LoginView.as_view(), name='loginview'),
    path('register/', RegisterView.as_view(), name='registerview'),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
]
