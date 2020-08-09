from flask import Flask, render_template

app = Flask(__name__)


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


@app.route('/fakenews')
def fnews():
    return render_template('fakenews.html') 


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)