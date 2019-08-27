from django.urls import include, path
from django.conf.urls import include, url

from .views.edit_profile import EditProfile
from .views.view_profile import ViewProfile
from .views.user_login_logout import UserLogin, UserLogout, UserSocialLogin
from .views.user_registration import UserRegistration, UserSocialRegistration
from .views.user_to_trainer import UserToTrainer


urlpatterns = [
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/view', ViewProfile.as_view()),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
    path('user/social/login', UserSocialLogin.as_view(), name='social-login')
]
