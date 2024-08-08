from django.core.management.base import BaseCommand
from users.models import CustomUser as User


class Command(BaseCommand):
    help = 'Create a dummy user for testing purposes'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username='testuser').exists():
            User.objects.create_superuser(
                username='testuser',
                email='testuser@example.com',
                password='testpassword',
                initials='TU',
            )
            self.stdout.write(self.style.SUCCESS(
                'Successfully created dummy user'))
        else:
            self.stdout.write(self.style.WARNING('Dummy user already exists'))
