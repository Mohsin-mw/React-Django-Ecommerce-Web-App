from django.urls import path
from ..views import user_views as views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('register/', views.registerUser, name="register_user"),
    path('login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('', views.getUsers, name="users")
]
