import requests
from flask import current_app

class CoTerminatorError(Exception):
    pass

def getState(lat, lng):
    url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'
    url = url.format(lat, lng, current_app.config.get('GOOGLE_MAPS_KEY'))

    data = requests.get(url).json()
    if data:
        components = data['results'][0]['address_components']

        # state has a unique type called administrative_area_level_1
        state = [d['long_name'] for d in components if 'administrative_area_level_1' in d['types']]
        return state[0]

    raise CoTerminatorError('Unable to get state name given coordinates')

