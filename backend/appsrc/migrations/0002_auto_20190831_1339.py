# Generated by Django 2.2.3 on 2019-08-31 10:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appsrc', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='youyodauser',
            name='role',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='owner', to='appsrc.Roles'),
        ),
    ]
