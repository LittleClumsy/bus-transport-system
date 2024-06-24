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
