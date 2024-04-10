from django.urls import path, include
from rest_framework import routers
from .views import FormCreationView, UserViewSet, CourseViewSet, TutoringFormViewSet, TutoringSessionViewSet, UserRegistrationView, LoginAPIView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'tutoringsessions', TutoringSessionViewSet)
router.register(r'tutoringforms', TutoringFormViewSet)


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('api/', include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
    path('form-creation/', FormCreationView.as_view(), name='Form-Creation')

]