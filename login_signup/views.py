# from django.http.response import HttpResponse
# from django.shortcuts import redirect, render
# from django.core.mail import send_mail
# from django.contrib.sites.shortcuts import get_current_site
# from django.contrib.auth import logout
from django.contrib.auth.models import Group, update_last_login
from django.urls import reverse



# from rest_framework.views import APIView
# from rest_framework_swagger import renderers
# from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer,JSONRenderer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes,renderer_classes
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import MyUser
from .serializers import *
from .utils import Util

# Create your views here.

# For listing all the users
class MyUserList(generics.ListAPIView):
    queryset=MyUser.objects.all()
    serializer_class=MyUserSerializer
    permission_classes=[IsAuthenticated]

#For retrieving the users #Used to update the user profile
class MyUserDetail(generics.RetrieveUpdateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes=[IsAuthenticated]
 

# For Registering a user
class Registration(generics.CreateAPIView):
    serializer_class=RegistrationSerializer
    def post(self,request,*args,**kwargs):
        if request.method == 'POST':
            serializer = RegistrationSerializer(data = request.data)
            data={}
            if serializer.is_valid():
                my_user = serializer.save()#Saving the serialized data we took from user
                #Checking if the user is buyer or seller
                if my_user.is_seller==True:
                    group=Group.objects.get(name='Seller')
                    my_user.groups.add(group)
                else:
                    group=Group.objects.get(name='Buyer')
                    my_user.groups.add(group)
                # Creating a token which will be changed after E-Mail Verification
                token = Token.objects.get(user = my_user).key
                data['old_token']=token
                # Creating a link to send it to users on E-mail
                current_site = 'https://rats-hackathon.herokuapp.com'
                relative_link = reverse('verifyEmail')          
                absurl = current_site + relative_link + "?token="+str(token) 
                #Creation of E-Mail
                email_body = 'Hi' + my_user.first_name + 'Use link below to verify your email \n' + absurl  
                data_email = {'email_body': email_body, 'to_email': my_user.email, 'email_subject':'Verify your email'}     
                Util.send_email(data_email)           
            else:
                data=serializer.errors
            return Response(data)

#E-Mail Verification
@api_view(['GET'])
@permission_classes(())
def verifyEmail(request): 
    data = {}
    token = request.GET.get('token')#Fetching the token from request
    try:
        user = MyUser.objects.get(auth_token = token)#Fetching the user based on the fetched token
    except:
        content = {'detail': 'User already activated!'}#If user tries to verify the email again
        return Response(content, status = status.HTTP_200_OK)
    token = request.GET.get('token')
    #Passing the data in Response
    data['response'] = "successfully registered a new user"
    data['email'] = user.email
    data['user_id']=user.user_id
    data['is_seller']=str(user.is_seller)
    #Switching the is_active field from false(set as false when user is created) to true after e-mail verification
    if user.is_active == False:
        user.is_active = True
        user.save()
        Token.objects.get(user = user).delete()# Deleting the token created earlier
        Token.objects.create(user = user)#Creaating new token
        new_token = Token.objects.get(user = user).key#Fetching that token
        data['new_token'] = new_token#Passing it in Response
        return Response(data)
    else:
        data={'status':'Email Not Verified'}#If user has not verified the email
        return Response(data)

#View for logging in
class LoginView(generics.CreateAPIView):
    serializer_class=loginSerializer
    def post(self,request):
        if request.method == 'POST':
            serializer = loginSerializer(data = request.data)
            serializer.is_valid(raise_exception = True)#Checking validation of serializer
            user = MyUser.objects.get(email = serializer.data['email'])#Fetching the user from entered email
            token = Token.objects.get(user = user).key#Fetching the token from the fetched user
            update_last_login(None, user) #update last login
            data = {}#Passing the data in Response
            data['email'] = user.email
            data['token'] = token
            data['user_id']=user.user_id
            data['is_seller']=str(user.is_seller)
            data['business_pincode']=user.business_pincode
            return Response(data, status = status.HTTP_200_OK)