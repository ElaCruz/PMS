# Generated by Django 5.0.3 on 2024-05-08 00:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prison', '0014_auto_20240507_1709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cell',
            name='name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='prisoner',
            name='cell',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prison.cell'),
        ),
    ]
