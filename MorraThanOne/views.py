from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Vote


@csrf_exempt
def poll_api(request):
    if request.method == "POST":
        data = json.loads(request.body)

        name = data.get("name", "").strip()
        choice = data.get("choice")

        if not name:
            return JsonResponse(
                {"success": False, "error": "Please enter your name first 🤍"},
                status=400,
            )

        if choice not in ["BB", "GG", "BG"]:
            return JsonResponse(
                {"success": False, "error": "Please choose a valid option"},
                status=400,
            )

        Vote.objects.create(name=name, choice=choice)
        return JsonResponse({"success": True})

    votes = Vote.objects.all()
    total_votes = votes.count()

    results = []

    for value, label in Vote.CHOICES:
        count = votes.filter(choice=value).count()
        percentage = round((count / total_votes) * 100) if total_votes else 0

        results.append({
            "value": value,
            "label": label,
            "count": count,
            "percentage": percentage,
        })

    return JsonResponse({
        "results": results,
        "total_votes": total_votes,
    })