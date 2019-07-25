import os
import numpy as np
import pandas as pd

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

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/scores.sqlite"

db = SQLAlchemy(app)

class Score(db.Model):
    __tablename__= 'scores'

    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String)
    Raw = db.Column(db.Integer)
    Handicap = db.Column(db.Float)
    Adjusted = db.Column(db.Float)
    time = db.Column(db.Float)   
    course_id = db.Column(db.Integer)







