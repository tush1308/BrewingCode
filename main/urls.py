from django.urls import path
from .views import *

URLPATTERNS = [
    path('item_type_detail/',ItemTypeView.as_view(),name='item_type'),
    path('item_type_detail/<int:pk>/',ItemTypeView_detail.as_view(),name='item_type_detail'),
    path('item/',ItemView,name='item'),
    path('item_detail/<int:pk>/',ItemView_detail,name='item_detail'),
    path('order/',OrderView,name='order'),
    path('order_detail/<int:pk>/',OrderView_detail,name='order_detail'),
]