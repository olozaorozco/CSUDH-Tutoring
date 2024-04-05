from django.contrib import admin
from .models import CustomUser, Course, TutoringForm, TutoringSession
admin.site.register(CustomUser)
admin.site.register(Course)
admin.site.register(TutoringForm)
admin.site.register(TutoringSession)
