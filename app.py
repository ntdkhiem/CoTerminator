import requests
from flask import Flask, render_template, request, jsonify

from config import Config
from utils import getState

app = Flask(__name__)
app.config.from_object(Config)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/diagnosis')
def diagnosis():
    return render_template('diagnosis.html') 


@app.route('/tracker')
def tracker():
    return render_template('tracker.html') 


@app.route('/faq')
def faq():
    return render_template('faq.html') 


@app.route('/calculation')
def calculation():
    return render_template('calculation.html') 


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
    app.run(host='0.0.0.0', port='80', debug=True)