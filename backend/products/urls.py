from django.urls import path

from .views import (
    ProductCreate,
    ProductList,
    ProductDetail,
    ProductUpdate,
    ProductDelete
)

urlpatterns = [
    path('products/create/', ProductCreate.as_view(), name='create-product'),
    path('products/', ProductList.as_view(), name='product-list'),  # Fetch all products
    path('products/<str:id>/', ProductDetail.as_view(), name='product-detail'),  # Fetch single product
    path('products/<str:id>/update/', ProductUpdate.as_view(), name='product-update'),  # Update product
    path('products/<str:id>/delete/', ProductDelete.as_view(), name='product-delete'),  # Delete product

]
