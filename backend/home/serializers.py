from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import CustomUser, TutoringForm, TutoringSession, Course, Chat, Message
from rest_framework import serializers
import logging
logger = logging.getLogger(__name__)


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

class ChatSerializer(ModelSerializer):
    user1 = UserSerializer()
    user2 = UserSerializer()
    latestMessage = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ['id', 'user1', 'user2', 'latestMessage']

    def get_latestMessage(self, obj):
        # Retrieve the latest message related to the chat
        latest_message = Message.objects.filter(chat=obj).order_by('-time').first()
        if latest_message:
            message_data = {
                'id': latest_message.id,
                'text': latest_message.text,
                'time': latest_message.time
            }
            return message_data
        return None

class MessageSerializer(ModelSerializer):
    user = UserSerializer()
    time = serializers.SerializerMethodField()

    def get_time(self, obj):
        return obj.time.strftime("%Y-%m-%d %H:%M")
    
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
    



