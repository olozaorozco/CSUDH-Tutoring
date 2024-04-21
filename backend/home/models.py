from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date
from django.core.exceptions import ValidationError



class CustomUser(AbstractUser):
    willTutor = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
class Chat(models.Model):
    user1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="Chat1")
    user2 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="Chat2")

    def clean(self):
        # Check if a chat already exists between the two users in any order
        if Chat.objects.filter(user1=self.user1, user2=self.user2).exists() or Chat.objects.filter(user1=self.user2, user2=self.user1).exists():
            raise ValidationError("A chat session between these users already exists.")
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class Message(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="Message")
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="Message")
    text = models.CharField(max_length=1000)
    time = models.DateTimeField(auto_now_add=True)
  
    
class Course(models.Model):
    CourseNumber = models.CharField(max_length=50)
    Title = models.CharField(max_length=50)
    Description = models.CharField(max_length = 200)


    def __str__(self):
        return self.CourseNumber
    
class TutoringForm(models.Model):
    Tutor = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="TutorForm")
    courses = models.ManyToManyField(Course)
    Description = models.CharField(max_length = 200, default= '')

    def __str__(self):
        return (self.Tutor.first_name + "Tutoring Form")

class TutoringSession(models.Model):
    locations = (
        (1, 'On Campus'), 
        (2, 'Messaging'),
        (3,'Zoom')
    )

    TutoringForm = models.ForeignKey(TutoringForm, on_delete=models.CASCADE)
    Student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    #date_created =models.DateTimeField(auto_now_add=True)
    #Tutoring_Date = models.DateField(default=date.today)
    Location = models.IntegerField(choices=locations)

    def clean(self):
        if self.Student == self.TutoringForm.Tutor:
            raise ValidationError("Student cannot be the same as the Tutor")

    def __str__(self):
        return (self.TutoringForm.Tutor.first_name +', ' + self.Student.first_name +', ' + str(self.Tutoring_Date))