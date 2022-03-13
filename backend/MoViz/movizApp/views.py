from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from movizApp.utils import get_graph
from django.http import HttpResponse
import json

# Create your views here.
def index(request):
    return render(request, 'index.html')

@csrf_exempt
def request_resolver(request):

    print("Request is: " + str(request.POST))
    print(json.loads(request.body))

    request_data = json.loads(request.body)

    graph_id = request_data['graphID']
    graph_data = None

    if 'graphData' in request_data:
        graph_data = request_data['graphData']

    result = get_graph(graph_id, graph_data)

    print(result)

    return HttpResponse(json.dumps(result), content_type='application/json', status=200)
