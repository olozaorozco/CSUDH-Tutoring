from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet

from . import views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('home/', views.HomeView.as_view(), name='home'),
    path('login/', views.LoginInterfaceView.as_view(), name='login'),
    path('logout/', views.LogoutInterfaceView.as_view(), name='logout'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('dashboard/', views.DashboardView.as_view(), name="dashboard"),
    
    path('api/', include(router.urls)),

]