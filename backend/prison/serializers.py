from rest_framework import serializers
from .models import Cell,Prisoner,Guard,Visitor, Gender, Status, Offense


# The Gender Serializer
class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'

# The Status Serializer
class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

# The Cell Serializer
class OffenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offense
        fields = '__all__'



# The Cell Serializer
class CellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cell
        fields = '__all__'

# The Prisoner Serializer
class PrisonerSerializer(serializers.ModelSerializer):
    # Just Added This
    # cell = CellSerializer()
    # gender = GenderSerializer()

    class Meta:
        model = Prisoner
        fields = '__all__'


# The Guard Serializer
class GuardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guard
        fields = '__all__'


# The Visitor Serializer
class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = '__all__'