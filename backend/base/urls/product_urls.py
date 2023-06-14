from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('allcategories', views.getAllCategories, name="all-categories"),
    path('category/<str:pk>', views.getProductByCategory, name="category"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete-product"),
    path('<str:pk>', views.getProduct, name="product"),
]
