from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Final_Cart, Order,ItemType,Item, OrderItem
# Create your serializers here
# Created modelserializer for each model
class ItemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=ItemType
        fields=('__all__')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields=('__all__')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=('__all__')

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields=('__all__')

class FinalCartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Final_Cart
        fields=('__all__')