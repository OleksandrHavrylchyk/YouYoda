# Generated by Django 2.2.3 on 2019-08-27 09:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appsrc', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='categories',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='appsrc.Categories'),
        ),
    ]
