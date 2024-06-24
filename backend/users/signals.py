from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser
from bus_system.models import Administrator, Parent

@receiver(post_save, sender=CustomUser)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if instance.is_admin:
        Administrator.objects.get_or_create(
            email=instance.email,
            defaults={
                'initials': instance.first_name,
                'surname': instance.last_name,
                'password': instance.password,
            }
        )
        Parent.objects.filter(parent_email=instance.email).delete()
    else:
        Administrator.objects.filter(email=instance.email).delete()

    if not instance.is_admin:
        Parent.objects.get_or_create(
            parent_email=instance.email,
            defaults={
                'parent_name': instance.first_name,
                'parent_surname': instance.last_name,
                'password': instance.password,
                'parent_cell_phone_number': instance.cell,
            }
        )
    else:
        Parent.objects.filter(parent_email=instance.email).delete()
