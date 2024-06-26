from django.apps import AppConfig


class BusSystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bus_system'
    
    
class BusSystemConfig(AppConfig):
    name = 'bus_system'

    def ready(self):
        import bus_system.signals
