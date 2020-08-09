import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__name__))
load_dotenv(os.path.join(basedir, '.env'))

class Config():
    GOOGLE_MAPS_KEY = os.environ.get('GOOGLE_APIS_KEY')
    if not GOOGLE_MAPS_KEY:
        raise ValueError('Missing Google maps api key')