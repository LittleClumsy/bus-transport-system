from django.shortcuts import render

from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated

# from django.core.mail import send_mail
# from django.http import JsonResponse
# from django.views import View
# from django.template.loader import render_to_string

# class SendEmailView(View):
#     def post(self, request):
#         data = request.POST
#         recipient_email = data.get('email')
#         learner_name = data.get('learner_name')

#         # Load email template
#         html_message = render_to_string('ConfirmationEmail.html', {'learner_name': learner_name})

#         send_mail(
#             'Learner Registration Confirmation',
#             '',
#             'your-email@example.com',
#             [recipient_email],
#             html_message=html_message,
#             fail_silently=False,
#         )

#         return JsonResponse({'message': 'Email sent successfully'})


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
        learner=self.queryset.get(pk=pk)
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
