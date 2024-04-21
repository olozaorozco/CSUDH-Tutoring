from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ChatListView, CreateMessageView, ChatView, CreateChatView, CreateSessionView, FormCreationView, UserViewSet, CourseViewSet, TutoringFormViewSet, TutoringSessionViewSet, CreateUserView, SingleUserView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'tutoringsessions', TutoringSessionViewSet)
router.register(r'tutoringforms', TutoringFormViewSet)


urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('api/', include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
    path('form/creation/', FormCreationView.as_view(), name='Form-Creation'),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('user/', SingleUserView.as_view(), name='single-user-view'),
    path('session/', CreateSessionView.as_view(), name='session'),
    path('chat/create/', CreateChatView.as_view(), name = "chat_create"),
    path('message/create/', CreateMessageView.as_view(), name = 'message_create'),
    path('chat/<int:chat_id>/', ChatView.as_view(), name = 'chat_view'),
    path('chat/list/', ChatListView.as_view(), name = 'chat_List'),

]