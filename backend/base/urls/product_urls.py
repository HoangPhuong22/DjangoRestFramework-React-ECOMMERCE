from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts),
    path('create/', views.createProduct, name='create_product'),
    path('upload/', views.uploadImage, name='upload_image'),
    path('<str:pk>/reviews/', views.createProductReview, name='create_review'),
    path('top/', views.getTopProducts, name='top_product'),
    path('<str:pk>/', views.getProduct),
    path('update/<str:pk>/', views.updateProduct, name='update_product'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete_product'),
]