# Generated by Django 5.0.3 on 2024-03-28 21:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_course_delete_courses_alter_tutoringform_courses'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tutoringsession',
            old_name='Tutrorng_Date',
            new_name='Tutoring_Date',
        ),
    ]