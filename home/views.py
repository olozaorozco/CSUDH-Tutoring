from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from .models import CustomUser, TutoringSession, TutoringForm, Course
from rest_framework import viewsets
from .serializers import UserSerializer, TutoringFormSerializer, TutoringSessionSerializer, CourseSerializer
from .forms import CustomUserCreationForm
from django.urls import reverse_lazy

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
class TutoringFormViewSet(viewsets.ModelViewSet):
    queryset = TutoringForm.objects.all()
    serializer_class = TutoringFormSerializer

class TutoringSessionViewSet(viewsets.ModelViewSet):
    queryset = TutoringSession.objects.all()
    serializer_class = TutoringSessionSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class SignupView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'register.html'
    success_url = reverse_lazy('login')

    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('home')
        return super().get(request, *args, **kwargs)
    
class LogoutInterfaceView(LogoutView):
    template_name = 'logout.html'

class LoginInterfaceView(LoginView):
    template_name = 'login.html'

class HomeView(TemplateView):
    template_name = 'welcome.html'
    extra_context = {'today': datetime.today()}

class DashboardView(TemplateView):
    template_name = 'dashboard.html'
