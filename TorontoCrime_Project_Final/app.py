import numpy as np
import sqlalchemy
import pandas as pd
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import Column, Integer, String, Float
from flask import Flask, jsonify, render_template
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy

#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///crime.sqlite"
#crime = SQLAlchemy(app)

df=pd.read_csv('Resources\MCI_2014_to_2018.csv')
new_df = df.drop(columns=['X', 'Y', 'Index_', 'event_unique_id', 'ObjectId'])

Base = declarative_base()
class Crime(Base):
    __tablename__ = 'crime'
    crime_id = Column(Integer, primary_key=True)
    occurrencedate  = Column(String(50))
    reporteddate = Column(String(50))
    premisetype = Column(String(255))
    ucr_code = Column(Integer)
    ucr_ext = Column(Integer)
    offence = Column(String(255))
    reportedyear = Column(Integer)
    reportedmonth = Column(String(25))
    reportedday = Column(Integer)
    reporteddayofyear = Column(Integer)
    reporteddayofweek = Column(String(255))
    reportedhour = Column(Integer)
    occurrenceyear = Column(Integer)
    occurrencemonth = Column(String(255))
    occurrenceday = Column(Integer)
    occurrencedayofyear = Column(Integer)
    occurrencedayofweek = Column(String(255))
    occurrencehour = Column(Integer)
    MCI = Column(String(255))
    Division = Column(String(255))
    Hood_ID = Column(Integer)
    Neighbourhood = Column(String(255))
    Lat = Column(Float)
    Long = Column(Float)


engine = create_engine("sqlite:///Resources/crime.sqlite")
conn = engine.connect()
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

new_df.to_sql('crime', con=engine, if_exists='append', index=False)

conn = engine.connect()

session = Session(bind=engine)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return (
        f"Crime Data:<br/>"
        f"/api/heatmap"
    )
    #return render_template("crimeheatmap.html")

@app.route("/api/heatmap")
def heatmap():
    results = session.query(Crime.Lat,Crime.Long).all()
    coordinates = []
    for result in results:
        latlon = {"coordinates":[result[0], result[1]], "type":"Point"}
        coordinates.append(latlon)
    session.close()
    return jsonify(coordinates)

if __name__ == "__main__":
    app.run(port=5000)

