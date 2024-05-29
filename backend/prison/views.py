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

    @csrf_exempt
    def add_gender(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            name = data.get('name')

            # Create a new Cell object
            gender = Gender(name=name)
            gender.save()

            return JsonResponse({'message': 'Cell added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})
        

# The Status View
class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

    @csrf_exempt
    def add_status(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            name = data.get('name')

            # Create a new Cell object
            status = Status(name=name)
            status.save()

            return JsonResponse({'message': 'Cell added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})


# The Offense View
class OffenseViewSet(viewsets.ModelViewSet):
    queryset = Offense.objects.all()
    serializer_class = OffenseSerializer

    @csrf_exempt
    def add_offense(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            name = data.get('name')

            # Create a new Cell object
            offense = Offense(name=name)
            offense.save()

            return JsonResponse({'message': 'Cell added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})


# The Cell View
class CellViewSet(viewsets.ModelViewSet):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    # Just Added
    @csrf_exempt
    def add_cell(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            name = data.get('name')

            # Create a new Cell object
            cell = Cell(name=name)
            cell.save()

            return JsonResponse({'message': 'Cell added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})
   
    

# The Prisoner View
class PrisonerViewSet(viewsets.ModelViewSet):
    queryset = Prisoner.objects.all()
    serializer_class = PrisonerSerializer
    
    # Adding this for that form wahala
    @csrf_exempt
    def add_prisoner(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            gender = data.get('gender')
            age = data.get('age')
            photo = data.get('photo')
            weight = data.get('weight')
            height = data.get('height')
            eye_color = data.get('eye_color')
            hair_color = data.get('hair_color')
            crime_committed = data.get('crime_committed')
            cell = data.get('cell')
            status = data.get('status')
            health_concerns = data.get('health_concerns')
            date_arrested = data.get('date_arrested')

            # Court Details here
            magistrate_first_name = data.get('magistrate_first_name')
            magistrate_last_name = data.get('magistrate_last_name')
            court = data.get('court')
            case_start_date = data.get('case_start_date')
            case_end_date = data.get('case_end_date')
            category_of_offense = data.get('category_of_offense')
            sentence = data.get('sentence')



            # Create a new Prisoner object
            prisoner = Prisoner(
                first_name=first_name,
                last_name=last_name,
                gender=gender,
                age=age,
                photo=photo,
                weight = weight,
                height = height,
                eye_color = eye_color,
                hair_color  = hair_color,
                crime_committed = crime_committed,
                cell  = cell,
                status = status,
                health_concerns = health_concerns,
                date_arrested = date_arrested,

                # Court Details Here
                magistrate_first_name = magistrate_first_name,
                magistrate_last_name = magistrate_last_name,
                court = court,
                case_start_date = case_start_date,
                case_end_date =  case_end_date,
                category_of_offense = category_of_offense,
                sentence = sentence,
            )
            prisoner.save()

            return JsonResponse({'message': 'Prisoner added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})
            


# The Guard View
class GuardViewSet(viewsets.ModelViewSet):
    queryset = Guard.objects.all()
    serializer_class = GuardSerializer

     # Just Added
    @csrf_exempt
    def add_guard(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            first_name = data.get('last_name')
            last_name = data.get('last_name')
            age = data.get('age')
            # status = data.get('status')
            gender = data.get('gender')
            photo = data.get('photo')
            cell= data.get('cell')
            shift_start_time= data.get('shift_start_time')
            shift_end_time= data.get('shift_end_time')

            # Create a new Guard object
            guard = Guard(full_name=first_name)
            guard = Guard(last_name=last_name)
            guard = Guard(gender=gender)
            guard = Guard(age=age)
            guard = Guard(photo=photo)
            guard = Guard(cell=cell)
            guard = Guard(shift_start_time=shift_start_time)
            guard = Guard(shift_end_time=shift_end_time)
            guard.save()

            return JsonResponse({'message': 'Guard added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})


# The Visitor View
class VisitorViewSet(viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer

    # Just Added
    @csrf_exempt
    def add_cell(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            full_name = data.get('full_name')
            relation = data.get('relation')
            gender = data.get('gender')
            phone_number = data.get('phone_number')
            prisoner_visited= data.get('prisoner_visited')
            date_visited= data.get('date_visited')
            cell_visited= data.get('cell_visited')
            time_of_arrival= data.get('time_of_arrival')
            time_of_departure= data.get('time_of_departure')

            # Create a new Visitor object
            visitor = Visitor(full_name=full_name)
            visitor = Visitor(relation=relation)
            visitor = Visitor(gender=gender)
            visitor = Visitor(phone_number=phone_number)
            visitor = Visitor(prisoner_visited=prisoner_visited)
            visitor = Visitor(date_visited=date_visited)
            visitor = Visitor(cell_visited=cell_visited)
            visitor = Visitor(time_of_arrival=time_of_arrival)
            visitor = Visitor(time_of_departure=time_of_departure)
            visitor.save()

            return JsonResponse({'message': 'Visitor added successfully'})
        else:
            return JsonResponse({'message': 'Invalid request method'})
   