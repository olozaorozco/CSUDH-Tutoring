from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import CustomUser, TutoringForm, TutoringSession, Course, Chat, Message
from rest_framework import serializers

class DaySerializer(serializers.Serializer):
    Mon = serializers.BooleanField(default=False)
    Tue = serializers.BooleanField(default=False)
    Wed = serializers.BooleanField(default=False)
    Thu = serializers.BooleanField(default=False)
    Fri = serializers.BooleanField(default=False)
    Sat = serializers.BooleanField(default=False)
    Sun = serializers.BooleanField(default=False)

class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'CourseNumber', 'Title', 'Description']

class TutoringFormSerializerNoUser(ModelSerializer):
    courses = CourseSerializer(many=True, required=False)

    class Meta:
        model = TutoringForm
        fields = ['id', 'courses', 'Description', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']



class TutoringFormSerializer(ModelSerializer):
   
    courses = CourseSerializer(many=True, required=False)
    Tutor = SerializerMethodField()

    class Meta:
        model = TutoringForm
        fields = ['id', 'Tutor', 'courses', 'Description', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

class ChatSerializer(ModelSerializer):
    user1 = UserSerializer()
    user2 = UserSerializer()

    class Meta:
        model = Chat
        fields = ['id', 'user1', 'user2']

class MessageSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Message
        fields = ['id', 'user', 'chat', 'text', 'time']
        
class MessageSerializerCreate(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    chat = serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all())

    class Meta:
        model = Message
        fields = ['id', 'user', 'chat', 'text', 'time']
    
    def create(self, validated_data):
        return Message.objects.create(**validated_data)
    
class ChatSerializerCreate(ModelSerializer):
    user1 = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    user2 = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Chat
        fields = ['id', 'user1', 'user2']
    
    def create(self, validated_data):
        return Chat.objects.create(**validated_data)



