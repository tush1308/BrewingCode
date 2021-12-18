from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(ItemType)
class ItemTypeModelAdmin(admin.ModelAdmin):
    list_display=['item_category_id','item_category','created_at']

@admin.register(Item)
class ItemTypeModelAdmin(admin.ModelAdmin):
    list_display=['item_id','item_name','item_brand','item_price','available_quantity','owned_by','created_at']

@admin.register(Order)
class ItemTypeModelAdmin(admin.ModelAdmin):
    list_display=['order_id','user','product','total_bill','payment_method','created_at']
