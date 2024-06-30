from django.db import models
from django.core.exceptions import ValidationError


class Parent(models.Model):
    parent_name = models.CharField(max_length=255)
    parent_surname = models.CharField(max_length=255)
    parent_cell_phone_number = models.CharField(max_length=15)
    parent_email = models.EmailField()
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.parent_name


class Learner(models.Model):
    parent = models.CharField(max_length=5)
    learner_name = models.CharField(max_length=255)
    learner_surname = models.CharField(max_length=255)
    learner_cell_phone_number = models.CharField(max_length=15)
    grade = models.CharField(max_length=10)

    def __str__(self):
        return self.learner_name


class Administrator(models.Model):
    initials = models.CharField(max_length=10)
    surname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return self.initials


class Applications(models.Model):
    learner_id = models.CharField(max_length=5)
    bus_route = models.IntegerField()
    pickup_number = models.CharField(max_length=5)
    dropoff_number = models.CharField(max_length=5)
    pickup_name = models.CharField(max_length=15)
    dropoff_name = models.CharField(max_length=15)
    pickup_time = models.CharField(max_length=10)
    dropoff_time = models.CharField(max_length=10)
    application_status = models.CharField(max_length=20, choices=[
        ('Applied', 'Applied'),
        ('Waiting List', 'Waiting List'),
        ('Successful', 'Successful')
    ], default='Applied')
    waiting_list_number = models.IntegerField(null=True, blank=True)
    application_date = models.DateField(auto_now_add=True)
    parent_id = models.CharField(max_length=5)


class BusOne(models.Model):
    learner_id = models.CharField(max_length=5)
    bus_route = models.IntegerField()
    pickup_number = models.CharField(max_length=5)
    dropoff_number = models.CharField(max_length=5)
    pickup_name = models.CharField(max_length=15)
    dropoff_name = models.CharField(max_length=15)
    pickup_time = models.CharField(max_length=10)
    dropoff_time = models.CharField(max_length=10)
    
    def save(self, *args, **kwargs):
        if BusOne.objects.count() >= 35:
            raise ValidationError('BusOne can only have a maximum of 35 entries.')
        super(BusOne, self).save(*args, **kwargs)


class BusTwo(models.Model):
    learner_id = models.CharField(max_length=5)
    bus_route = models.IntegerField()
    pickup_number = models.CharField(max_length=5)
    dropoff_number = models.CharField(max_length=5)
    pickup_name = models.CharField(max_length=15)
    dropoff_name = models.CharField(max_length=15)
    pickup_time = models.CharField(max_length=10)
    dropoff_time = models.CharField(max_length=10)
    
    def save(self, *args, **kwargs):
        if BusTwo.objects.count() >= 15:
            raise ValidationError('BusTwo can only have a maximum of 15 entries.')
        super(BusTwo, self).save(*args, **kwargs)


class BusThree(models.Model):
    learner_id = models.CharField(max_length=5)
    bus_route = models.IntegerField()
    pickup_number = models.CharField(max_length=5)
    dropoff_number = models.CharField(max_length=5)
    pickup_name = models.CharField(max_length=15)
    dropoff_name = models.CharField(max_length=15)
    pickup_time = models.CharField(max_length=10)
    dropoff_time = models.CharField(max_length=10)
    
    def save(self, *args, **kwargs):
        if BusThree.objects.count() >= 15:
            raise ValidationError('BusThree can only have a maximum of 15 entries.')
        super(BusThree, self).save(*args, **kwargs)
