import requests
from flask import Flask, jsonify, request

from config import Config
from utils import getState


app = Flask(__name__)
app.config.from_object(Config)


@app.route('/api/diagnosis', methods=['POST'])
def diagnosis():
    '''
    Determine if contracted with Covid-19 based on how many 'yes'
    '''
    score = 0
    for el, val in request.form.items():
        if val == 'yes':
            score += 5

    msg = ''
    if score >= 30 :
        msg = 'Our Short Assessment Module system predicts that you have been contracted with COVID-19'
    elif score >= 20:
        msg = 'Our system predics that you may have coronavirus, and you should get it checked out. Visit our testing center links based on your location'
    else:
        msg = 'Our system does not think you have covid, but please feel free to access our testing site database and information'

    return {'message': msg}, 200


@app.route('/api/covid', methods=['GET'])
def covid():
    if request.args.get('lat') and request.args.get('lng'):
        lat = request.args.get('lat')
        lng = request.args.get('lng')

        state = getState(lat, lng).lower()

        data = requests.get('https://covid19-us-api.herokuapp.com/county').json()

        # filter counties by state
        entries = [d for d in data['message'] if d['state_name'].lower() == state]
        if entries:
            return jsonify(entries), 200
    
    return {'status': 'Unable to retrieve data.'}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)