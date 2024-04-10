from .models import CustomUser, TutoringSession, TutoringForm, Course
from rest_framework import viewsets, status
from .serializers import UserSerializer, TutoringFormSerializer, TutoringSessionSerializer, CourseSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


class FormCreationView(APIView):
    def post(self, request):
        Tutor = request.data.get('Tutor')
        Description = request.data.get('Description')
        courses = request.data.get('courses')
            
            # Check if the required fields are present
        if not (Tutor and Description and courses):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
            
            # Check if the username or email is already taken
        if TutoringForm.objects.filter(Tutor=Tutor).exists():
            return JsonResponse({'error': 'Form Already made'}, status=400)
            
            # Create the user
        try:
            user = TutoringForm.objects.create(Tutor=Tutor, Description=Description)  
            if isinstance(courses, list):
                for course_id in courses:
                    TutoringForm.courses.add(course_id)
            else:
                TutoringForm.courses.add(courses)  
            
            return JsonResponse({'success': 'Form created successfully', 'form_id': TutoringForm.pk})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserRegistrationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        willTutor = request.data.get('willTutor')
            
            # Check if the required fields are present
        if not (username and email and password):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
            
            # Check if the username or email is already taken
        if CustomUser.objects.filter(username=username).exists() or CustomUser.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Username or email already exists'}, status=400)
            
            # Create the user
        user = CustomUser.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password, willTutor = willTutor)     
        return JsonResponse({'message': 'User created successfully'})

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


