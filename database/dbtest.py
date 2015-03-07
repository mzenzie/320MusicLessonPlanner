import sqlite3

conn = sqlite3.connect("mlp.sqlite")
c = conn.cursor()

a = input("Enter a sql command to execute: ")

c.execute(a)

if("select" in a.lower()):
    print(c.fetchall())
else:
    c.commit()
    print("Done.")
