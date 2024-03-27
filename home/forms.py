from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'password1', 'password2']