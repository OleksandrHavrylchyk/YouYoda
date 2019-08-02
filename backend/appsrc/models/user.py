from .roles import Roles

from django.contrib.auth.models import AbstractBaseUser


class User(AbstractBaseUser):
    role_id = models.ForeignKey(Roles, default=lambda: Roles.objects.get(id=1), on_delete=models.CASCADE)
    hide_my_data = models.BooleanField(default=False)
    first_name = models.CharField(max_length=20, null=True)
    last_name = models.CharField(max_length=20, null=True)
    location = models.TextField(blank=True, null=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=40)
    email = models.EmailField(unique=True)
    about_me = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    avatar_url = models.CharField(max_length=80, null=True)
    is_trainer = models.BooleanField(default=False)

    def __str__(self):
        return self.username