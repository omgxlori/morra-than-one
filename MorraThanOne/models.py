from django.db import models

# Create your models here.
class Vote(models.Model):
    name = models.CharField(max_length=100)
    CHOICES = [
        ("BB", "Boy / Boy"),
        ("GG", "Girl / Girl"),
        ("BG", "Boy / Girl"),
    ]

    choice = models.CharField(max_length=2, choices=CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.get_choice_display()