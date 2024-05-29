"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# from django.urls import path
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.urls import include, path
from rest_framework import routers
# Just added this for the image problem
from django.conf import settings
from django.conf.urls.static import static

# import corsheaders
from prison import views

router = routers.DefaultRouter()
router.register(r'gender', views.GenderViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'offense', views.OffenseViewSet)

router.register(r'cells', views.CellViewSet)
router.register(r'prisoners', views.PrisonerViewSet)
router.register(r'guards', views.GuardViewSet)
router.register(r'visitors', views.VisitorViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('cors/', include('corsheaders.urls')),
    path('api/', include(router.urls)),
    path('api/cells/<int:cell_id>/', views.Cell, name='Cell'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

