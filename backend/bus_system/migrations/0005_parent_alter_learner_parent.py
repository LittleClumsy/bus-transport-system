# Generated by Django 5.0.6 on 2024-06-05 13:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bus_system', '0004_auto_20240605_1458'),
    ]

    operations = [
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
        migrations.AlterField(
            model_name='learner',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bus_system.parent'),
        ),
    ]
