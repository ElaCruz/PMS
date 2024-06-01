from django.shortcuts import render
from rest_framework import viewsets

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from rest_framework.decorators import action
import json

from rest_framework.response import Response
from rest_framework import status
from .models import Cell,Prisoner,Guard,Visitor, Gender, Status, Offense
from .serializers import CellSerializer,PrisonerSerializer,GuardSerializer,VisitorSerializer, GenderSerializer, StatusSerializer,OffenseSerializer

# Create your views here.

# The Gender View
class GenderViewSet(viewsets.ModelViewSet):
    queryset = Gender.objects.all()
    serializer_class = GenderSerializer


# The Status View
class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


# The Offense View
class OffenseViewSet(viewsets.ModelViewSet):
    queryset = Offense.objects.all()
    serializer_class = OffenseSerializer


# The Cell View
class CellViewSet(viewsets.ModelViewSet):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer

   
    

# The Prisoner View
class PrisonerViewSet(viewsets.ModelViewSet):
    queryset = Prisoner.objects.all()
    serializer_class = PrisonerSerializer
   

# The Guard View
class GuardViewSet(viewsets.ModelViewSet):
    queryset = Guard.objects.all()
    serializer_class = GuardSerializer


# The Visitor View
class VisitorViewSet(viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer

