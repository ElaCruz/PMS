# Generated by Django 5.0.3 on 2024-05-08 01:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prison', '0018_alter_prisoner_case_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prisoner',
            name='category_of_offense',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='prison.offense'),
        ),
        migrations.AlterField(
            model_name='prisoner',
            name='cell',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prison.cell'),
        ),
        migrations.AlterField(
            model_name='prisoner',
            name='gender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prison.gender'),
        ),
        migrations.AlterField(
            model_name='prisoner',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prison.status'),
        ),
    ]