# Generated by Django 5.0.4 on 2024-04-20 04:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_customuser_tutoringform_alter_tutoringform_tutor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='TutoringForm',
        ),
        migrations.RemoveField(
            model_name='tutoringsession',
            name='Tutoring_Date',
        ),
        migrations.RemoveField(
            model_name='tutoringsession',
            name='date_created',
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user1', models.ManyToManyField(related_name='Chat1', to=settings.AUTH_USER_MODEL)),
                ('user2', models.ManyToManyField(related_name='Chat2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('chat', models.ManyToManyField(related_name='Message2', to=settings.AUTH_USER_MODEL)),
                ('user', models.ManyToManyField(related_name='Message1', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
