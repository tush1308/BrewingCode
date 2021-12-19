# Generated by Django 4.0 on 2021-12-19 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_order_ordered_items'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='ordered_items',
        ),
        migrations.AddField(
            model_name='order',
            name='ordered_items',
            field=models.ManyToManyField(to='main.OrderItem'),
        ),
    ]
