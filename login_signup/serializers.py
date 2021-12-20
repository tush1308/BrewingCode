from rest_framework import serializers
from .models import *
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MyUser
        fields = ['user_id','email','first_name','last_name','business_name','business_location','is_seller']
        

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MyUser
        fields = ['email','first_name','last_name','password','business_name','business_location','is_seller']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = MyUser(
            email             = validated_data['email'],
            first_name        = validated_data['first_name'],
            last_name         = validated_data['last_name'],
            business_name     = validated_data['business_name'],
            business_location = validated_data['business_location'],
            is_seller         = validated_data['is_seller']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class loginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    class Meta:
        model = MyUser
        fields = ['email', 'password','user_id','is_seller']
    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {'email': user.email}