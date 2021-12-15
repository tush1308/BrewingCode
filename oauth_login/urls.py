from django.urls import path, include
from .views import *
from django.views.generic import TemplateView
urlpatterns = [
    path('logout/',logout_view,name='logout'),
    path('home/', TemplateView.as_view(template_name="homepage.html")),
]