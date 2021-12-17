from rest_framework import serializers
from .models import *
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MyUser
        fields = ['user_id','email','first_name','last_name']
        

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MyUser
        fields = ['email','first_name','last_name','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = MyUser(
            email      = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name  = validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user