from django.db import migrations, models
import uuid
import files.models

class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ('uploaded_by', models.CharField(max_length=255, null=True, blank=True)),
                ('file', models.FileField(storage=files.models.storage, upload_to='')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('size', models.BigIntegerField()),
            ],
        ),
    ]
