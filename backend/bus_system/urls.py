from django.urls import path, include
from .views import *
from .signals import add_to_bus_table
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('learner', LearnerViewset, basename='learner')

urlpatterns = router.urls

urlpatterns = [
    path('', include(router.urls)),
    path('apply-bus/', ApplicationView.as_view(), name='apply-bus'),
    path('send-confirmation-email/', send_confirmation_email_view,
         name='send_confrimation_email'),
    path('learner-list/', LearnerListView.as_view(), name='learner-list'),
    path('all-busses/', AllBusesView.as_view(), name='all-busses'),
    path('application-approval/', ApplicationApprovalView.as_view(), name='application-approval'),
     path('move_to_bus_table/<int:bus_route>/', MoveToBusTableView.as_view(), name='move_to_bus_table'),
]
