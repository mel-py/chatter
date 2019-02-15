import sqlite3
import json

def create_connection(db_file):
	try:
		conn = sqlite3.connect(db_file)
		return conn
	except Error as e:
		print(e)

	return None
	
def execute_query(conn, query):
	try:
		c = conn.cursor()
		c.execute(query)
	except Error as e:
		print(e)
	
if __name__ == 'main':
	conn = create_connection("C:\Programming\chatter\chatter_db.sqlite")