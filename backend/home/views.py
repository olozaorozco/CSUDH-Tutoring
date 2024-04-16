from .models import CustomUser, TutoringSession, TutoringForm, Course
from rest_framework import viewsets, status
from .serializers import UserSerializer, TutoringFormSerializer, TutoringSessionSerializer, CourseSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

class SingleUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # The request.user object contains the authenticated user
        return self.request.user

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class FormCreationView(generics.ListCreateAPIView):
    serializer_class = TutoringFormSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return TutoringForm.objects.filter(Tutor = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(Tutor=self.request.user)
        else:
            print(serializer.errors)



# class FormCreationView(APIView):
#     def post(self, request):
#         Tutor_id = request.data.get('Tutor')
#         Description = request.data.get('Description')
#         courses = request.data.get('courses')

            
#             # Check if the required fields are present
#         if not (Tutor_id and Description and courses):
#             return JsonResponse({'error': 'Missing required fields'}, status=400)

#         tutor = CustomUser.objects.get(id=Tutor_id)

#             # Check if the username or email is already taken
#         if TutoringForm.objects.filter(Tutor=tutor).exists():
#             return JsonResponse({'error': 'Form Already made'}, status=400)
            
#             # Create the user
#         try:
#             form = TutoringForm.objects.create(Tutor=tutor, Description=Description)  
#             for course_id in courses:
#                 try:
#                     course = Course.objects.get(id=course_id)
#                     form.courses.add(course)
#                 except Course.DoesNotExist:
#                     return JsonResponse({'error': f'Course with ID {course_id} not found'}, status=400)
                

#             return JsonResponse({'success': 'Form created successfully'})

#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)



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


