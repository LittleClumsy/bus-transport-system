from django.shortcuts import render

from rest_framework.views import APIView
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
            user_email = request.user.email
            send_confirmation_email(user_email)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationApprovalView(APIView):
    def get(self, request):
        # Get the list of learner_ids already present in bus tables
        bus_one_learners = BusOne.objects.values_list('learner_id', flat=True)
        bus_two_learners = BusTwo.objects.values_list('learner_id', flat=True)
        bus_three_learners = BusThree.objects.values_list(
            'learner_id', flat=True)

        # Combine all learner_ids into a single list
        all_bus_learners = list(bus_one_learners) + \
            list(bus_two_learners) + list(bus_three_learners)

        applications = Applications.objects.filter(
            waiting_list_number__isnull=False).exclude(learner_id__in=all_bus_learners)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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

        combined_data = bus_one_serializer.data + \
            bus_two_serializer.data + bus_three_serializer.data

        return Response(combined_data, status=status.HTTP_200_OK)


class MoveToBusTableView(APIView):
    def post(self, request, bus_route):
        try:
            application = Applications.objects.get(
                id=request.data['application_id'])

            if bus_route == 1:
                if BusOne.objects.count() < 35:
                    BusOne.objects.create(
                        learner_id=application.learner_id,
                        bus_route=application.bus_route,
                        pickup_number=application.pickup_number,
                        dropoff_number=application.dropoff_number,
                        pickup_name=application.pickup_name,
                        dropoff_name=application.dropoff_name,
                        pickup_time=application.pickup_time,
                        dropoff_time=application.dropoff_time
                    )
                else:
                    raise ValidationError(
                        'BusOne can only have a maximum of 35 entries.')
            elif bus_route == 2:
                if BusTwo.objects.count() < 15:
                    BusTwo.objects.create(
                        learner_id=application.learner_id,
                        bus_route=application.bus_route,
                        pickup_number=application.pickup_number,
                        dropoff_number=application.dropoff_number,
                        pickup_name=application.pickup_name,
                        dropoff_name=application.dropoff_name,
                        pickup_time=application.pickup_time,
                        dropoff_time=application.dropoff_time
                    )
                else:
                    raise ValidationError(
                        'BusTwo can only have a maximum of 15 entries.')
            elif bus_route == 3:
                if BusThree.objects.count() < 15:
                    BusThree.objects.create(
                        learner_id=application.learner_id,
                        bus_route=application.bus_route,
                        pickup_number=application.pickup_number,
                        dropoff_number=application.dropoff_number,
                        pickup_name=application.pickup_name,
                        dropoff_name=application.dropoff_name,
                        pickup_time=application.pickup_time,
                        dropoff_time=application.dropoff_time
                    )
                else:
                    raise ValidationError(
                        'BusThree can only have a maximum of 15 entries.')

            application.application_status = 'Successful'
            application.save()

            return Response({'status': 'success'}, status=status.HTTP_201_CREATED)

        except Applications.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
