from django.db import models


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
    application_status = models.Choices(
        'Applied', 'Waiting List', 'Successful')
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


class BusTwo(models.Model):
    learner_id = models.CharField(max_length=5)
    bus_route = models.IntegerField()
    pickup_number = models.CharField(max_length=5)
    dropoff_number = models.CharField(max_length=5)
    pickup_name = models.CharField(max_length=15)
    dropoff_name = models.CharField(max_length=15)
    pickup_time = models.CharField(max_length=10)
    dropoff_time = models.CharField(max_length=10)


class BusThree(models.Model):
    learner_id = models.CharField(max_length=5)
    bus_route = models.IntegerField()
    pickup_number = models.CharField(max_length=5)
    dropoff_number = models.CharField(max_length=5)
    pickup_name = models.CharField(max_length=15)
    dropoff_name = models.CharField(max_length=15)
    pickup_time = models.CharField(max_length=10)
    dropoff_time = models.CharField(max_length=10)
