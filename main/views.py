from django.db.models import query
from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
# Create your views here.

# Created so the users can view all the available item categories
class ItemTypeView(generics.ListCreateAPIView):
    queryset=ItemType.objects.all()
    serializer_class=ItemTypeSerializer
    permission_classes=[DjangoModelPermissions]

# Created so the users can jump into a category and view the items available in that category
class ItemTypeView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=ItemType.objects.all()
    serializer_class=ItemTypeSerializer
    permission_classes=[DjangoModelPermissions]

# User can view all the available items irrespective of category
class ItemView(generics.ListCreateAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer
    permission_classes=[DjangoModelPermissions]

# User can view the price,name,seller of each item in detail
class ItemView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer
    permission_classes=[DjangoModelPermissions]

# Seller can view the order list and buyer can create the order
class OrderView(generics.ListCreateAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    permission_classes=[DjangoModelPermissions]

# For viewing own order in detail, updating and deleting the order 
class OrderView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    permission_classes=[DjangoModelPermissions]

# For Viewing all the items in cart and adding items in cart
class OrderedItemView(generics.ListCreateAPIView):
    queryset=OrderItem.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=[DjangoModelPermissions]

# For viewing the cart item in detail to see the added quantity and cost
class OrderedItemView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=OrderItem.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=[DjangoModelPermissions]    

# Attempted to provide discount on basis of pincode
class FinalCartView(generics.ListCreateAPIView):
    queryset=Final_Cart.objects.all()
    serializer_class=FinalCartSerializer
    permission_classes=[DjangoModelPermissions]

class FinalCartView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Final_Cart.objects.all()
    serializer_class=FinalCartSerializer
    permission_classes=[DjangoModelPermissions]