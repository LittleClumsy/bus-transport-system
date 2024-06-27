from django.shortcuts import render

from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated


from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .serializers import ApplicationSerializer
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class LearnerViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Learner.objects.all()
    serializer_class = LearnerSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        learner = self.queryset.get(pk=pk)
        serializer = self.serializer_class(learner)
        return Response(serializer.data)

    def update(self, request, pk=None):
        learner = self.queryset.get(pk=pk)
        serializer = self.serializer_class(learner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        learner = self.queryset.get(pk=pk)
        learner.delete()
        return Response(status=204)


class LearnerListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        parent_id = request.user.id
        learners = Learner.objects.filter(parent=parent_id)
        serializer = LearnerSerializer(learners, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplicationView(APIView):
    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Get the user email from the request (assuming the user is authenticated)
            user_email = request.user.email
            # Send confirmation email
            send_confirmation_email(user_email)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def send_confirmation_email(user_email):
    subject = 'Learner Registration Confirmation'
    html_message = render_to_string('ConfirmationEmail.html')
    plain_message = strip_tags(html_message)
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user_email]
    send_mail(subject, plain_message, email_from,
              recipient_list, html_message=html_message)


@csrf_exempt
def send_confirmation_email_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        send_confirmation_email(email)
        return JsonResponse({'message': 'Email sent successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)

class AllBusesView(APIView):
    def get(self, request):
        bus_one_data = BusOne.objects.all()
        bus_two_data = BusTwo.objects.all()
        bus_three_data = BusThree.objects.all()

        bus_one_serializer = BusOneSerializer(bus_one_data, many=True)
        bus_two_serializer = BusTwoSerializer(bus_two_data, many=True)
        bus_three_serializer = BusThreeSerializer(bus_three_data, many=True)

        combined_data = bus_one_serializer.data + bus_two_serializer.data + bus_three_serializer.data

        return Response(combined_data, status=status.HTTP_200_OK)
