from rest_framework.response import Response
from django.shortcuts import redirect, render
from .models import MyUser
from .serializers import *
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes,renderer_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer
# Create your views here.
class MyUserList(generics.ListAPIView):
    queryset=MyUser.objects.all()
    serializer_class=MyUserSerializer
    permission_classes=[IsAuthenticated]

class MyUserDetail(generics.RetrieveAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes=[IsAuthenticated]

@api_view(['POST',])
@permission_classes(())
@renderer_classes([OpenAPIRenderer, SwaggerUIRenderer])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            my_user = serializer.save()
            data['response']="Successfully registered a new user"
            data['email']=my_user.email
            token = Token.objects.get(user = my_user).key
            data['token']=token
        else:
            data=serializer.errors
        return Response(data)

