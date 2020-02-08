import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


engine = create_engine("sqlite:///filename.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
#Crime = Base.classes.Crime

app = Flask(__name__)
@app.route("/")
def Alldata():
    return (
        f"Available Data:<br/>"
        f"/api/v1.0/occurrencedate<br/>"
       
    )

@app.route("/majorcrimeindicators")
def majorcrimeindicators():
    session = Session(engine)

    """Return a list of all Crime occurrencedate"""
    # Query all passengers
    results = session.query(Crime.occurrencedate).all()

    session.close()

    # Convert list of tuples into normal list
    all_occurrencedate = list(np.ravel(results))

    return jsonify(all_occurrencedate)


@app.route("/crimesbyhouroftheday")
def crimesbyhouroftheday():
    session = Session(engine)

    """Return a list of all Crime occurrencedate"""
    # Query all passengers
    results = session.query(Crime.occurrencedate).all()

    session.close()

    # Convert list of tuples into normal list
    all_occurrencedate = list(np.ravel(results))

    return jsonify(all_occurrencedate)


@app.route("/crimesbymonth")
def crimesbymonth():
    session = Session(engine)

    """Return a list of all Crime occurrencedate"""
    # Query all passengers
    results = session.query(Crime.occurrencedate).all()

    session.close()

    # Convert list of tuples into normal list
    all_occurrencedate = list(np.ravel(results))

    return jsonify(all_occurrencedate)



if __name__ == "__main__":
    app.run()

