from django.contrib import admin
from django.contrib.admin.options import ModelAdmin
from .models import *
# Register your models here.
@admin.register(MyUser)
class MyUserModelAdmin(admin.ModelAdmin):
    list_display  = ['email','business_name','first_name','last_name']
    search_fields = ['business_name','first_name','last_name','email']
 