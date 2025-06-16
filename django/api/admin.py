from django.contrib import admin
from .models import Bus, Seat


class busadmin(admin.ModelAdmin):
    list_display = ('name','number')
admin.site.register(Bus,busadmin)
admin.site.register(Seat)
