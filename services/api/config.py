import os

basedir = os.path.abspath(os.path.dirname(__name__))

class Config():
    GOOGLE_MAPS_KEY = os.environ.get('GOOGLE_APIS_KEY')
    if not GOOGLE_MAPS_KEY:
        raise ValueError('Missing Google maps api key')