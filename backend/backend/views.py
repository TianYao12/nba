from backend.models import Team
from backend.serializer import TeamSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def teams(request):
    if request.method == 'GET':
        data = Team.objects.all()
        serializer = TeamSerializer(data, many=True)
        return Response({'teams': serializer.data})

    elif request.method == 'POST':
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'team':serializer.data}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def team(request, id):
    try:
        data = Team.objects.get(pk=id)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TeamSerializer(data)
        return Response({'team': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        return Response(status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        serializer = TeamSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'team':serializer.data})
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)