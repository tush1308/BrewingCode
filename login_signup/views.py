from django.http.response import HttpResponse
from rest_framework.response import Response
from django.shortcuts import redirect, render
from rest_framework.views import APIView
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
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
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
            data={}
            if serializer.is_valid():
                my_user = serializer.save()
                token = Token.objects.get(user = my_user).key
                current_site = 'https://rats-hackathon.herokuapp.com'
                relative_link = reverse('verifyEmail')          
                absurl = current_site + relative_link + "?token="+str(token) 
                email_body = 'Hi' + my_user.first_name + 'Use link below to verify your email \n' + absurl  
                data_email = {'email_body': email_body, 'to_email': my_user.email, 'email_subject':'Verify your email'}     
                Util.send_email(data_email)           
            else:
                data=serializer.errors
            return Response(data)


@api_view(['GET'])
@permission_classes(())
def verifyEmail(request): 
    data = {}
    token = request.GET.get('token')
    try:
        user = MyUser.objects.get(auth_token = token)
    except:
        content = {'detail': 'User already activated!'}
        return Response(content, status = status.HTTP_200_OK)
    token = request.GET.get('token')
    data['response'] = "successfully registered a new user"
    data['email'] = user.email
    data['user_id']=user.user_id
    if user.is_active == False:
        user.is_active = True
        user.save()
        Token.objects.get(user = user).delete()
        Token.objects.create(user = user)
        new_token = Token.objects.get(user = user).key
        data['new_token'] = new_token
        return Response(data)
    else:
        data={'status':'Email Not Verified'}
        return Response(data)











class LoginView(generics.CreateAPIView):
    serializer_class=loginSerializer
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