#!flask/bin/python

import sqlite3
from flask import Flask, jsonify, abort, make_response

app = Flask(__name__)

posts = [
	{
		"id": 1,
		"body": "Hello world"
	},
	{
		"id": 2,
		"body": "I am glad I didn't sleep in today"
	}
]

'''
def create_connection(db_file):
	try:
		conn = sqlite3.connect(db_file)
		return conn
	except Error as e:
		print(e)

	return None
	'''
	
'''def execute_query(conn, query):
	try:
		c = conn.cursor()
		c.execute(query)
	except Error as e:
		print(e)
'''

@app.route('/chatter/api/v1.0/posts', methods=['GET'])
def get_posts():
	return jsonify({'posts': posts})
	
@app.route('/chatter/api/v1.0/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
	post = [post for post in posts if post['id'] == post_id]
	if len(post) == 0:
		abort(404)
	return jsonify({'post': post[0]})
	


if __name__ == '__main__':
	#conn = create_connection("C:\Programming\chatter\chatter_db.sqlite")
	
	app.run(debug=True)