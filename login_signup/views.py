from rest_framework.response import Response
from django.shortcuts import redirect, render
from rest_framework_swagger import renderers
from .models import MyUser
from .serializers import *
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes,renderer_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer,JSONRenderer
from django.contrib.auth.models import update_last_login
from rest_framework import status

# Create your views here.
class MyUserList(generics.ListAPIView):
    queryset=MyUser.objects.all()
    serializer_class=MyUserSerializer
    permission_classes=IsAuthenticated


class MyUserDetail(generics.RetrieveUpdateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes=IsAuthenticated
 

class Registration(generics.CreateAPIView):
    serializer_class=RegistrationSerializer
    def post(self,request,*args,**kwargs):
        if request.method == 'POST':
            serializer = RegistrationSerializer(data = request.data)
            data = {}
            if serializer.is_valid():
                my_user = serializer.save()
                data['response']="Successfully registered a new user"
                data['email']=my_user.email
                data['user_id']=my_user.user_id
                token = Token.objects.get(user = my_user).key
                data['token']=token
            else:
                data=serializer.errors
            return Response(data)
class LoginView(generics.CreateAPIView):
    def post(self,request):
        if request.method == 'POST':
            serializer = loginSerializer(data = request.data)
            serializer.is_valid(raise_exception = True)
            user = MyUser.objects.get(email = serializer.data['email'])
            token = Token.objects.get(user = user).key
            update_last_login(None, user) #update last login
            data = {}
            data['email'] = user.email
            data['token'] = token
            data['user_id']=user.user_id
            return Response(data, status = status.HTTP_200_OK)