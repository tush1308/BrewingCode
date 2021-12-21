from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.

#Customized the Manager by extending the default user manager
class UserManager(BaseUserManager):
    use_in_migrations = True

    #For creating user
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    #For adding perms to created user
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    #For creating superuser and adding perms
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

#Created CustomUser by extending the default User model
class MyUser(AbstractUser):
    user_id           = models.AutoField(primary_key=True)
    first_name        = models.CharField(max_length=50,blank=False)
    last_name         = models.CharField(max_length=50,blank=False)
    email             = models.EmailField(max_length=100,unique=True)
    is_active         = models.BooleanField(default=False)#Kept default=False so it can be changed after E-mail verification
    username          = None
    business_name     = models.CharField(max_length=100)
    business_location = models.CharField(max_length=100)
    business_pincode  = models.CharField(max_length=6)#Added pincode for pincode location based discount
    is_seller         = models.BooleanField(default=False)
    created_at        = models.DateTimeField(auto_now_add=True)
    objects           = UserManager()  # used the above manager here
    #For logging in using email
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    def __str__(self):
        return self.email

#To create a token on creation of a neew user
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

