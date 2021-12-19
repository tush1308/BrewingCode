from rest_framework import serializers
from .models import Order,ItemType,Item, OrderItem

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