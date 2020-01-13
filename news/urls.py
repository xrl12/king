from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('new_detail/<int:id>/',views.news_detail,name='detail'),
    path('new_list/',views.news_list,name='list')
]
