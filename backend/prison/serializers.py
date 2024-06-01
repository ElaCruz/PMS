from rest_framework import serializers
from .models import Cell,Prisoner,Guard,Visitor, Gender, Status, Offense


# The Gender Serializer
class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'



# The Cell Serializer
class OffenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offense
        fields = '__all__'





# The Prisoner Serializer
from rest_framework import serializers
from .models import Gender, Status, Cell, Prisoner

class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ['id', 'name']

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['id', 'name']

class CellSerializer(serializers.ModelSerializer):
    prisoner_count = serializers.SerializerMethodField()

    class Meta:
        model = Cell
        fields = ['id', 'name', 'prisoner_count']

    def get_prisoner_count(self, obj):
        return Prisoner.objects.filter(cell=obj).count()


class PrisonerSerializer(serializers.ModelSerializer):
    gender_name = serializers.SerializerMethodField()
    status_name = serializers.SerializerMethodField()
    cell_name = serializers.SerializerMethodField()

    class Meta:
        model = Prisoner
        fields = [
            'id', 'first_name', 'last_name', 'age', 'gender', 'gender_name', 
            'status', 'status_name', 'height', 'weight', 'eye_color', 
            'hair_color', 'crime_committed', 'health_concerns', 'cell', 
            'cell_name', 'photo', 'date_arrested', 'magistrate_first_name', 
            'magistrate_last_name', 'court', 'category_of_offense', 'case_start_date', 
            'case_end_date', 'sentence'
        ]
        read_only_fields = ['gender_name', 'status_name', 'cell_name']

    def get_gender_name(self, obj):
        return obj.gender.name

    def get_status_name(self, obj):
        return obj.status.name

    def get_cell_name(self, obj):
        return obj.cell.name



# The Guard Serializer
class GuardSerializer(serializers.ModelSerializer):
    gender_name = serializers.SerializerMethodField()
    cell_name = serializers.SerializerMethodField()
    class Meta:
        model = Guard
        fields = ['first_name','last_name','gender','gender_name','cell','cell_name','photo','age']
        read_only_fields = ['gender_name','cell_name']

    def get_gender_name(self, obj):
        return obj.gender.name

   

    def get_cell_name(self, obj):
        return obj.cell.name



# The Visitor Serializer
class VisitorSerializer(serializers.ModelSerializer):
    gender_name = serializers.SerializerMethodField()
    prisoner_visited_name = serializers.SerializerMethodField()
    cell_visited_name = serializers.SerializerMethodField()

    class Meta:
        model = Visitor
        fields = [
            'id', 'full_name', 'relation', 'gender', 'gender_name', 
            'phone_number', 'prisoner_visited', 'prisoner_visited_name', 
            'date_visited', 'time_of_arrival', 'time_of_departure', 
            'cell_visited', 'cell_visited_name'
        ]
        read_only_fields = ['gender_name', 'prisoner_visited_name', 'cell_visited_name']

    def get_gender_name(self, obj):
        return obj.gender.name

    def get_prisoner_visited_name(self, obj):
        return f"{obj.prisoner_visited.first_name} {obj.prisoner_visited.last_name}"

    def get_cell_visited_name(self, obj):
        return obj.cell_visited.name