# Generated by Django 5.0.6 on 2024-06-05 12:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bus_system', '0002_auto_20240605_1413'),
    ]

    operations = [
        migrations.CreateModel(
            name='Learner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('learner_name', models.CharField(max_length=255)),
                ('learner_surname', models.CharField(max_length=255)),
                ('learner_cell_phone_number', models.CharField(max_length=15)),
                ('grade', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parent_name', models.CharField(max_length=255)),
                ('parent_surname', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('parent_cell_phone_number', models.CharField(max_length=15)),
                ('parent_email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Bus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bus_number', models.CharField(max_length=10)),
                ('pickup_number', models.CharField(max_length=10)),
                ('dropoff_number', models.CharField(max_length=10)),
                ('pickup_time', models.TimeField()),
                ('dropoff_time', models.TimeField()),
                ('bus_limit', models.IntegerField()),
                ('application_status', models.CharField(max_length=100)),
                ('waiting_list_number', models.IntegerField(blank=True, null=True)),
                ('waiting_list_date', models.DateField(blank=True, null=True)),
                ('learner_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bus_system.learner')),
            ],
        ),
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initials', models.CharField(max_length=10)),
                ('surname', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('learner_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bus_system.learner')),
            ],
        ),
        migrations.AddField(
            model_name='learner',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bus_system.parent'),
        ),
    ]
