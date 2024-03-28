from rest_framework.serializers import ModelSerializer
from .models import CustomUser, TutoringForm, TutoringSession, Course

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'willTutor']


class TutoringFormSerializer(ModelSerializer):
    class Meta:
        model = TutoringForm
        fields = ['id', 'Tutor', 'courses', 'Description']

class TutoringSessionSerializer(ModelSerializer):
    class Meta:
        model = TutoringSession
        fields = ['id', 'Location', 'Student', 'TutoringForm', 'date_created', 'Tutoring_Date']


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'CourseNumber', 'Title', 'Description']