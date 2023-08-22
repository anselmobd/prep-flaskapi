from flask import render_template, send_from_directory

import config

from models import Person, people_schema


app = config.connex_app
app.add_api(config.basedir / "swagger.yml")


@app.route("/")
def home():
    people = Person.query.all()
    people = people_schema.dump(people)
    return render_template("home.html", people=people)


@app.route("/vue")
def vue():
    return send_from_directory('static/vue', 'index.html')
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
