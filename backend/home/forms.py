from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import CustomUser, TutoringForm, Days


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)
    willTutor = forms.BooleanField(label='Do you plan on Tutoring?', required=False, widget=forms.CheckboxInput)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'willTutor']


class TutoringFormAdminForm(forms.ModelForm):
    class Meta:
        model = TutoringForm
        fields = '__all__'

    days = forms.ModelMultipleChoiceField(
        queryset=Days.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )