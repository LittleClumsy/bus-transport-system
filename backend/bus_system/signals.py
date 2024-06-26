from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Applications, BusOne, BusTwo, BusThree

@receiver(post_save, sender=Applications)
def add_to_bus_table(sender, instance, created, **kwargs):
    if created:
        if instance.bus_route == 1:
            BusOne.objects.create(
                learner_id=instance.learner_id,
                bus_route=instance.bus_route,
                pickup_number=instance.pickup_number,
                dropoff_number=instance.dropoff_number,
                pickup_name=instance.pickup_name,
                dropoff_name=instance.dropoff_name,
                pickup_time=instance.pickup_time,
                dropoff_time=instance.dropoff_time
            )
        elif instance.bus_route == 2:
            BusTwo.objects.create(
                learner_id=instance.learner_id,
                bus_route=instance.bus_route,
                pickup_number=instance.pickup_number,
                dropoff_number=instance.dropoff_number,
                pickup_name=instance.pickup_name,
                dropoff_name=instance.dropoff_name,
                pickup_time=instance.pickup_time,
                dropoff_time=instance.dropoff_time
            )
        elif instance.bus_route == 3:
            BusThree.objects.create(
                learner_id=instance.learner_id,
                bus_route=instance.bus_route,
                pickup_number=instance.pickup_number,
                dropoff_number=instance.dropoff_number,
                pickup_name=instance.pickup_name,
                dropoff_name=instance.dropoff_name,
                pickup_time=instance.pickup_time,
                dropoff_time=instance.dropoff_time
            )
