from django.urls import path
from .views import *
from rest_framework.authtoken import views
#Create URL's here
urlpatterns=[
    path('users/', MyUserList.as_view()),
    path('users/<int:pk>/', MyUserDetail.as_view()),
    path('login/',LoginView.as_view(),name='login'),
    path('register/',Registration.as_view(),name='register'),
    path('email-verify/',verifyEmail, name = "verifyEmail"),
]
