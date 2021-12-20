from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(ItemType)
class ItemTypeModelAdmin(admin.ModelAdmin):
    list_display=['item_category_id','item_category','created_at']

@admin.register(Item)
class ItemTypeModelAdmin(admin.ModelAdmin):
    list_display=['item_id','item_name','item_brand','item_price','owned_by','created_at']

@admin.register(Order)
class ItemTypeModelAdmin(admin.ModelAdmin):
    list_display=['user','total_bill','payment_method','created_at']

@admin.register(OrderItem)
class OrderItemModelAdmin(admin.ModelAdmin):
    list_display=['cart_item','price','quantity','total_price']

@admin.register(Final_Cart)
class FinalCartModelAdmin(admin.ModelAdmin):
    list_display=['final_cart_item','pincode','sold_to']