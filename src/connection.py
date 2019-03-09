#!flask/bin/python

import sqlite3
from flask import Flask, jsonify, abort, make_response, request
from flask_cors import CORS

app = Flask(__name__)
posts = []

def create_connection(db_file):
	try:
		conn = sqlite3.connect(db_file)
		return conn
	except Error as e:
		print(e)

	return None
	
def execute_query_fetch(query):
	conn = create_connection("C:\Programming\chatter\chatter_db.sqlite")
	c = conn.cursor()
	c.execute(query)
		
	row = c.fetchone()
	while row is not None:
		print(row)
		row = c.fetchone()
	conn.commit()
	conn.close()
	
def execute_query(query):
	conn = create_connection("C:\Programming\chatter\chatter_db.sqlite")
	c = conn.cursor()
	c.execute(query)
	conn.commit()
	conn.close()
	
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/chatter/api/v1.0/posts', methods=['GET'])
def get_posts():
	return jsonify({'posts': posts})
	
@app.route('/chatter/api/v1.0/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
	post = [post for post in posts if post['id'] == post_id]
	if len(post) == 0:
		abort(404)
	return jsonify({'post': post[0]})
	
@app.route('/chatter/api/v1.0/posts', methods=['POST'])
def create_post():
	if not request.json or not 'body' in request.json:
		abort(400)
	post={
		"id": posts[-1]['id'] + 1,
		"body": request.json['body']
	}
	posts.append(post)
	#INSERT INTO posts VALUES (id, body);
	query = "INSERT INTO posts VALUES (" + str(post['id']) + ", \"" + post['body'] + "\");"
	execute_query(query)
	return jsonify({'post': post}), 201
	
@app.route('/chatter/api/v1.0/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
	post = [post for post in posts if post['id'] == post_id]
	if len(post) == 0:
		abort(404)
	posts.remove(post[0])
	return jsonify({'result': True})
	
#Load all the data from the database into the API
#TODO: Make table better (needs keys and stuff)
def load_data():
	c = conn.cursor()
	c.execute("SELECT * FROM posts;");
	
	row = c.fetchone()
	while row is not None:
		post = {
			"id": row[0],
			"body": row[1]
		}
		posts.append(post)
		row = c.fetchone()

if __name__ == '__main__':
	conn = create_connection("C:\Programming\chatter\chatter_db.sqlite")
	load_data()
	conn.commit()
	conn.close()
	
	app.run(debug=True)