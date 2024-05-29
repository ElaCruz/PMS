# Generated by Django 5.0.3 on 2024-03-30 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prison', '0004_alter_prisoner_category_of_offense_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guard',
            name='shift_end_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='guard',
            name='shift_start_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='visitor',
            name='time_of_arrival',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='visitor',
            name='time_of_departure',
            field=models.TimeField(),
        ),
    ]
