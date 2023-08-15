from backend.models import Team
from backend.serializer import TeamSerializer
from django.http import JsonResponse

def teams(request):
    data = Team.objects.all()
    serializer = TeamSerializer(data,many=True)
    return JsonResponse
