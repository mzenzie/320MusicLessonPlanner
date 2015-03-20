import sqlite3

conn = sqlite3.connect("../mlp.sql")
c = conn.cursor()

a = raw_input("Enter a sql command to execute: ")

c.execute(a)

if("select" in a.lower()):
    print(c.fetchall())
else:
    conn.commit()
    print("Done.")
