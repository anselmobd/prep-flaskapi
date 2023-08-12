from flask import render_template

import config

from models import Person, people_schema


app = config.connex_app
app.add_api(config.basedir / "swagger.yml")


@app.route("/")
def home():
    people = Person.query.all()
    people = people_schema.dump(people)
    return render_template("home.html", people=people)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
