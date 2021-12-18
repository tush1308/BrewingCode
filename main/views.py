from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class OrderItemType(generics.ListAPIView):
    queryset=ItemType.objects.all()
    serializer_class=OrderItemTypeSerializer
    permission_classes=IsAuthenticated

class OrderItemType_detail(generics.RetrieveAPIView):
    queryset=ItemType.objects.all()
    serializer_class=OrderItemTypeSerializer
    permission_classes=IsAuthenticated

class OrderItem(generics.ListAPIView):
    queryset=Item.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=IsAuthenticated

class OrderItem_detail(generics.RetrieveAPIView):
    queryset=Item.objects.all()
    serializer_class=OrderItemSerializer
    permission_classes=IsAuthenticated

