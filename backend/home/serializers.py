from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import CustomUser, TutoringForm, TutoringSession, Course
from rest_framework import serializers


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'CourseNumber', 'Title', 'Description']

class TutoringFormSerializerNoUser(ModelSerializer):
    courses = CourseSerializer(many=True, required=False)

    class Meta:
        model = TutoringForm
        fields = ['id', 'courses', 'Description']



class TutoringFormSerializer(ModelSerializer):
   
    courses = CourseSerializer(many=True, required=False)
    Tutor = SerializerMethodField()

    class Meta:
        model = TutoringForm
        fields = ['id', 'Tutor', 'courses', 'Description']

    def get_Tutor(self, obj):
        user = obj.Tutor
        return UserSerializer(user, context=self.context).data


class UserSerializer(ModelSerializer):
    TutorForm = TutoringFormSerializerNoUser(read_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'password', "email", 'willTutor', 'TutorForm']
        extra_kwargs = {"password": {"write_only": True}, "TutoringForm": {"read_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user



class TutoringSessionSerializer(ModelSerializer):
    Student = UserSerializer()
    TutoringForm = TutoringFormSerializer()
    class Meta:
        model = TutoringSession
        fields = ['id', 'Location', 'Student', 'TutoringForm', 'date_created', 'Tutoring_Date']


