from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date

class CustomUser(AbstractUser):
    willTutor = models.BooleanField(default=False)


    def __str__(self):
        return self.username
    
class Course(models.Model):
    CourseNumber = models.CharField(max_length=50)
    Title = models.CharField(max_length=50)
    Description = models.CharField(max_length = 200)

    def __str__(self):
        return self.CourseNumber
    
class TutoringForm(models.Model):
    Tutor = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
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
    date_created =models.DateTimeField(auto_now_add=True)
    Tutoring_Date = models.DateField(default=date.today)
    Location = models.IntegerField(choices=locations)

    def __str__(self):
        return (self.TutoringForm.Tutor.first_name +', ' + self.Student.first_name +', ' + str(self.Tutoring_Date))