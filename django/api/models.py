from django.db import models
from django.contrib.auth.models import User

class Bus(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=20, unique=True)
    place = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    start = models.DateTimeField()
    end = models.DateTimeField()
    no_of_seat = models.PositiveBigIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.number})"

class Seat(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)
    booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.bus} {self.seat_number}"
    
class Booking(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_people = models.PositiveIntegerField()
    booking_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
     
     
    def __str__(self):
        return f"{self.user.username} - {self.destination})"