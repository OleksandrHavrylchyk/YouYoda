from django.urls import path

from .views.categories import CategoriesList
from .views.change_password import ChangePassword
from .views.check_user import CheckUser
from .views.courses import CourseScheduleView, TopCourses, SearchingCourses
from .views.comment import CourseComments, EventComments
from .views.comment import CourseComments
from .views.edit_profile import EditProfile
from .views.change_avatar import FileUploadView
from .views.orginize_event import OrganizeEvent
from .views.events import SearchingEvents, TopEvents
from .views.user_login_logout import UserLogin, UserLogout, UserSocialLogin
from .views.user_registration import UserRegistration, UserSocialRegistration
from .views.user_to_trainer import UserToTrainer, UserSendRequest, UserGetRequest
from .views.users_administration import UsersGetList, GetUsersStatuses, UpdateUsersStatuses
from .views.user_subscribe_to_event import UserSubscribeToEvent
from .views.user_subscribe_to_course import UserSubscribeToCourse
from .views.pdp import PDP
from .views.view_profile import ViewProfile, ViewCoursesProfile, ViewEventsProfile, ViewAchievementsProfile


urlpatterns = [
    path('categories/list', CategoriesList.as_view(), name='categories-list'),
    path('courses/comments', CourseComments.as_view(), name='comments-courses'),
    path('courses/schedule', CourseScheduleView.as_view(), name='courses-schedule'),
    path('courses/search', SearchingCourses.as_view(), name='search-courses'),
    path('courses/top', TopCourses.as_view(), name='top-courses'),
    path('events/search', SearchingEvents.as_view(), name='search-events'),
    path('events/comments', EventComments.as_view(), name='comments-events'),
    path('courses/schedule', CourseScheduleView.as_view(), name='courses-schedule'),
    path('events/top', TopEvents.as_view(), name='top-events'),
    path('user/totrainer/getrequest', UserGetRequest.as_view()),
    path('user/totrainer/sendrequest', UserSendRequest.as_view(), name='sendrequest'),
    path('user/check', CheckUser.as_view(), name='check'),
    path('user/profile/courses', ViewCoursesProfile.as_view(), name='user_courses'),
    path('user/profile/events', ViewEventsProfile.as_view(), name='user_events'),
    path('user/profile/achievements', ViewAchievementsProfile.as_view(), name='user_achievements'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/profile/change_avatar', FileUploadView.as_view(), name='change_avatar'),
    path('user/profile/change_password', ChangePassword.as_view(), name='change_password'),
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/view', ViewProfile.as_view(), name='view_profile'),
    path('user/profile/event_organize', OrganizeEvent.as_view(), name='organize_event'),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/social/login', UserSocialLogin.as_view(), name='social_login'),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('user/course/add', UserSubscribeToCourse.as_view(), name='subscribe_course'),
    path('user/event/add', UserSubscribeToEvent.as_view(), name='subscribe_event'),
    path('user/pdp', PDP.as_view(), name='pdp'),
    path('users/getlist', UsersGetList.as_view()),
    path('users/getstatuses', GetUsersStatuses.as_view()),
    path('users/updatestatuses', UpdateUsersStatuses.as_view())
]
