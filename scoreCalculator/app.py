import os

import numpy as np
import pandas as pd
from datetime import date
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, desc

from flask import (
    Flask,
    render_template,
    jsonify,
    redirect)

from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/scores.sqlite"

db = SQLAlchemy(app)

class Scores(db.Model):
    __tablename__= 'scores'

    id = db.Column(db.Text, primary_key=True)
    Name = db.Column(db.Text)
    Raw = db.Column(db.Text)
    Handicap = db.Column(db.Text)
    Adjusted = db.Column(db.Text)
    time = db.Column(db.Text)   
    course_id = db.Column(db.Text)

    def __repr__(self):
        return '<scores %r>' % (self.name)

@app.before_first_request
def setup():
    print("set up")
    # db.drop_all()
    db.create_all()
    

@app.route("/")
def home():
    """Render Home Page."""
    return render_template("base.html")

@app.route("/stats")
def stats_data():
    """Return stats"""

    results = db.session.query(Scores.Name, Scores.Raw, Scores.Handicap, Scores.Adjusted,
    Scores.time, Scores.course_id).\
    limit(20000).all()

    print(results)
    
    Name = [result[0] for result in results]
    Raw = [result[1] for result in results]
    Handicap = [result[2] for result in results]
    Adjusted = [result[3] for result in results]
    time = [result[4] for result in results]
    course_id = [result[5] for result in results]

    print(Name)
    return jsonify(results)

@app.route("/weather")
def weather_data():
    """Return weather prediction"""

    API_Key = os.environ['DARKSKY_KEY']
    base_url = 'https://api.darksky.net/forecast/'
    url = base_url + API_Key + '/37.8,-122.2,2019-08-01T08:00:00?exclude=current,flags'
    forecast = requests.get(url).json()
    list_1 = []

    list_1.append(forecast['hourly']['data'][10]['windBearing'])
    list_1.append(forecast['hourly']['data'][10]['windGust'])
    list_1.append(forecast['hourly']['data'][10]['precipIntensity'])
    # return(jsonify(forecast['hourly']['data'][10]['windGust']))
    return(jsonify(list_1))


#Donish needs: 1.wind gust (windGust)
#2. wind direction (windBearing)
#3. precipitation (precipIntensity)

if __name__ == '__main__':
    app.run(debug=True)

