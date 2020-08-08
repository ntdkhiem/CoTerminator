from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/diagnosis')
def diagnosis():
    return 'Hello from diagnosis!' 


@app.route('/tracker')
def tracker():
    return 'Hello from Tracker!' 


@app.route('/faq')
def faq():
    return 'Hello from FAQ!' 


if __name__ == "__main__":
    app.run(debug=True)