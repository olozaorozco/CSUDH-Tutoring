# Generated by Django 5.0.3 on 2024-03-28 20:48

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_customuser_willtutor'),
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=50)),
                ('Description', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='TutoringForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Tutor', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('courses', models.ManyToManyField(to='home.courses')),
                ('student', models.ManyToManyField(related_name='student_forms', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TutoringSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('Tutroing_Date', models.DateTimeField(default=datetime.date.today)),
                ('Location', models.IntegerField(choices=[(1, 'On Campus'), (2, 'Messaging'), (3, 'Zoom')])),
                ('Student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('TutoringForm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.tutoringform')),
            ],
        ),
    ]
