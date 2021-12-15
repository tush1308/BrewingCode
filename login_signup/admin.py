from django.contrib import admin
from django.contrib.admin.options import ModelAdmin
from .models import *
# Register your models here.
@admin.register(MyUser)
class MyUserModelAdmin(admin.ModelAdmin):
    list_display=['first_name','last_name','email']
    search_fields = ['first_name','last_name','email']
 