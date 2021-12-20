from django.urls import path
from .views import *

urlpatterns = [
    path('item_type/',ItemTypeView.as_view(),name='item_type'),
    path('item_type_detail/<int:pk>/',ItemTypeView_detail.as_view(),name='item_type_detail'),
    path('item/',ItemView.as_view(),name='item'),
    path('item_detail/<int:pk>/',ItemView_detail.as_view(),name='item_detail'),
    path('order/',OrderView.as_view(),name='order'),
    path('order_detail/<int:pk>/',OrderView_detail.as_view(),name='order_detail'),
    path('ordered_item/',OrderedItemView.as_view(),name='ordered_item'),
    path('ordered_item_detail/<int:pk>',OrderedItemView_detail.as_view(),name='ordered_item_detail')
]