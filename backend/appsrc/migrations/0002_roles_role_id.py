# Generated by Django 2.2.3 on 2019-08-09 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appsrc', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='roles',
            name='role_id',
            field=models.CharField(max_length=20, null=True),
        ),
    ]