from django.db.models import query
from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
# Create your views here.
class ItemTypeView(generics.ListCreateAPIView):
    queryset=ItemType.objects.all()
    serializer_class=ItemTypeSerializer
    permission_classes=[DjangoModelPermissions]

class ItemTypeView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=ItemType.objects.all()
    serializer_class=ItemTypeSerializer
    permission_classes=[DjangoModelPermissions]

class ItemView(generics.ListCreateAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer
    permission_classes=[DjangoModelPermissions]

class ItemView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer
    permission_classes=[DjangoModelPermissions]

class OrderView(generics.ListCreateAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    permission_classes=[DjangoModelPermissions]


class OrderView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    permission_classes=[DjangoModelPermissions]

class OrderedItemView(generics.ListCreateAPIView):
    queryset=OrderItem.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=[DjangoModelPermissions]

class OrderedItemView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=OrderItem.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=[DjangoModelPermissions]    

class FinalCartView(generics.ListCreateAPIView):
    queryset=Final_Cart.objects.all()
    serializer_class=FinalCartSerializer
    permission_classes=[DjangoModelPermissions]

class FinalCartView_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Final_Cart.objects.all()
    serializer_class=FinalCartSerializer
    permission_classes=[DjangoModelPermissions]