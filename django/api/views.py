from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, authentication, generics
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .serializers import BusSerializer  # not busserializers
from .models import Booking, Bus, Seat
from .serializers import BookingSerializer, RegisterSerializer, BusSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User created successfully"})
class LoginView(APIView):
    permission_classes = [AllowAny]  # ✅ Make sure this line exists!

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class BusListView(ListAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = []

class BookingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]


class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seat_id = request.data.get('seat')
        try:
            seat = Seat.objects.get(id=seat_id)
            if seat.booked:
                return Response({'error': 'Seat is already booked'}, status=status.HTTP_400_BAD_REQUEST)

            seat.booked = True
            seat.save()

            booking = Booking.objects.create(
                user=request.user,
                bus=seat.bus,
                seat=seat,
            )
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Seat.DoesNotExist:
            return Response({'error': 'Seat not found'}, status=status.HTTP_404_NOT_FOUND)


class UserBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error': 'You are not authorized to view this booking'}, status=status.HTTP_403_FORBIDDEN)
        bookings = Booking.objects.filter(user=user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class BookingListCreateView(ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
class BusDetailView(RetrieveAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [AllowAny]
