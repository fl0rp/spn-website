# Generated by Django 2.0.3 on 2018-03-30 20:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0005_remove_snake_selected_version'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='snakeversion',
            options={'get_latest_by': 'created'},
        ),
        migrations.RemoveField(
            model_name='snakegame',
            name='team',
        ),
        migrations.AddField(
            model_name='snakegame',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
