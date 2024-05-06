from .models import CustomUser, TutoringSession, TutoringForm, Course, Chat, Message
from rest_framework import viewsets, status
from .serializers import ChatSerializerCreate, MessageSerializerCreate, UserSerializer, TutoringFormSerializer, TutoringSessionSerializer, CourseSerializer, ChatSerializer, MessageSerializer
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import generics
from django.core.serializers import serialize
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Q, Max
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin
from rest_framework.exceptions import ValidationError

class ChatView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes= [IsAuthenticated]

    def get(self, request, chat_id):
        try:
            messages = Message.objects.filter(chat=chat_id).order_by('time')
            serialized = MessageSerializer(messages, many=True)
            return Response(serialized.data)
        except Message.DoesNotExist:
            return Response({'error': 'Messages not found'}, status=404)

class ChatListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes= [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        userChats = Chat.objects.filter(Q(user1=user) | Q(user2=user)).annotate(latest_message_time=Max('Message__time')).order_by('-latest_message_time')
        serializer = ChatSerializer(userChats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FormView(generics.RetrieveAPIView):
    serializer_class = TutoringFormSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return TutoringForm.objects.filter(Tutor=user)

class SingleUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # The request.user object contains the authenticated user
        return self.request.user
    
class CreateChatView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializerCreate
    permission_classes = [AllowAny]

    
    

class CreateMessageView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializerCreate
    permission_classes = [AllowAny]    

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateSessionView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = TutoringSessionSerializer
    permission_classes = [AllowAny]
    


# class CreateSessionView(APIView):
#     def post(self, request):
#         TutorFormID = request.data.get("TutorForm")
#         StudentID = request.data.get("Student")
#         location = request.data.get("location")


#         student = CustomUser.objects.get(id=Student)

#         TutoringSession.objects.create(TutoringForm = TutoringForm, Student=student)

class FormCreationView(APIView):
    def post(self, request):
        Tutor_id = request.data.get('Tutor')
        Description = request.data.get('Description')
        courses = request.data.get('courses')
        days_data = request.data.get('days', {})  # Get days data
            
            # Check if the required fields are present
        if not (Tutor_id and Description and courses):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        tutor = CustomUser.objects.get(id=Tutor_id)
        existing_form = TutoringForm.objects.filter(Tutor=tutor).first()

            # Check if the username or email is already taken
        if TutoringForm.objects.filter(Tutor=tutor).exists():
            return JsonResponse({'existing_form': existing_form.id, 'description': existing_form.Description}, status=200)
            
            # Create the user
        try:
            form = TutoringForm.objects.create(Tutor=tutor, Description=Description, **days_data)  
            for course_id in courses:
                try:
                    course = Course.objects.get(id=course_id)
                    form.courses.add(course)
                except Course.DoesNotExist:
                    return JsonResponse({'error': f'Course with ID {course_id} not found'}, status=400)
                

            return JsonResponse({'success': 'Form created successfully'})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)



class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class TutoringFormViewSet(viewsets.ModelViewSet):
    queryset = TutoringForm.objects.all()
    serializer_class = TutoringFormSerializer
    permission_classes = [AllowAny]


class TutoringSessionViewSet(viewsets.ModelViewSet):
    queryset = TutoringSession.objects.all()
    serializer_class = TutoringSessionSerializer
    permission_classes = [AllowAny]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]


