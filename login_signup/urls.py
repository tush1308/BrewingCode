from django.urls import path
from .views import *
from rest_framework.authtoken import views
#Create URL's here
urlpatterns=[
    path('users/', MyUserList.as_view()),
    path('users/<int:pk>/', MyUserDetail.as_view()),
    path('login/', views.obtain_auth_token,name='login'),
    path('register/',registration_view,name='register'),
]
