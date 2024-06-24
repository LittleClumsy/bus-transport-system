from django.urls import path, include
from .views import *
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
]
