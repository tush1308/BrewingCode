from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# Create your views here.
class ItemTypeView(generics.ListAPIView):
    queryset=ItemType.objects.all()
    serializer_class=OrderItemTypeSerializer
    permission_classes=[IsAuthenticated]

class ItemTypeView_detail(generics.RetrieveAPIView):
    queryset=ItemType.objects.all()
    serializer_class=OrderItemTypeSerializer
    permission_classes=[IsAuthenticated]

class ItemView(generics.ListAPIView):
    queryset=Item.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=[IsAuthenticated]

class ItemView_detail(generics.RetrieveAPIView):
    queryset=Item.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=[IsAuthenticated]

class OrderView(generics.ListCreateAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    permission_classes=[IsAuthenticated]
    def create(self, request, *args, **kwargs):
        p=Order
        return super().create(request, *args, **kwargs)

class OrderView_detail(generics.RetrieveAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    permission_classes=[IsAuthenticated]

