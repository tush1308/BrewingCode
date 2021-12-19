from django.shortcuts import redirect, render
from django.contrib.auth import logout
# Create your views here.
def logout_view(request):
    logout(request)
    return redirect('/')