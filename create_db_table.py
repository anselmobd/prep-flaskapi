import sqlite3


def get_connection():
    return sqlite3.connect("people.db")


def create_db_table(conn):
    sql = """
        CREATE TABLE person (
        id INTEGER PRIMARY KEY
        , lname VARCHAR UNIQUE
        , fname VARCHAR
        , timestamp DATETIME
        )
    """
    conn.execute(sql)
    conn.commit()


def populate_table(conn):
    people = [
        "1, 'Fairy', 'Tooth', '2022-10-08 09:15:10'",
        "2, 'Ruprecht', 'Knecht', '2022-10-08 09:15:13'",
        "3, 'Bunny', 'Easter', '2022-10-08 09:15:27'",
    ]
    for person_data in people:
        insert_cmd = f"INSERT INTO person VALUES ({person_data})"
        conn.execute(insert_cmd)
    conn.commit()


def read_all(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM person")
    people = cur.fetchall()
    for person in people:
        print(person)


if __name__ == '__main__':
    conn = get_connection()
    create_db_table(conn)
    populate_table(conn)
    read_all(conn)
