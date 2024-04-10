from rest_framework.serializers import ModelSerializer, SerializerMethodField 
from .models import CustomUser, TutoringForm, TutoringSession, Course


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'CourseNumber', 'Title', 'Description']

class TutoringFormSerializerNoUser(ModelSerializer):
    courses = CourseSerializer(many=True)

    class Meta:
        model = TutoringForm
        fields = ['id', 'courses', 'Description']



class TutoringFormSerializer(ModelSerializer):
   
    courses = CourseSerializer(many=True)
    Tutor = SerializerMethodField()

    class Meta:
        model = TutoringForm
        fields = ['id', 'Tutor', 'courses', 'Description']

    def get_Tutor(self, obj):
        user = obj.Tutor
        return UserSerializer(user, context=self.context).data


class UserSerializer(ModelSerializer):
    TutoringForm = TutoringFormSerializerNoUser()
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'willTutor', 'TutoringForm']



class TutoringSessionSerializer(ModelSerializer):
    Student = UserSerializer()
    TutoringForm = TutoringFormSerializer()
    class Meta:
        model = TutoringSession
        fields = ['id', 'Location', 'Student', 'TutoringForm', 'date_created', 'Tutoring_Date']


