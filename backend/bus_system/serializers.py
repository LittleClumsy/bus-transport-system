from rest_framework import serializers
from .models import *


class LearnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learner
        fields = ('id', 'learner_name', 'learner_surname',
                  'learner_cell_phone_number', 'grade', 'parent')


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = '__all__'
        extra_kwargs = {
            'waiting_list_number': {'required': False, 'allow_null': True}
        }

class BusOneSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusOne
        fields = '__all__'

class BusTwoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusTwo
        fields = '__all__'

class BusThreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusThree
        fields = '__all__'
