import React, {Component} from 'react';
import './index.css'

function Post(props) {
	return (
		<div className>
			<p>{props.value}</p>
		</div>
	);
}

class AllPosts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: Array(),
			value: ''
		};
		
		fetch('http://localhost:5000/chatter/api/v1.0/posts').then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			var loadedPosts = [];
			var i;
			for (i = 0; i < data['posts'].length; i++) {
				loadedPosts.unshift({id:data['posts'][i]['id'], body:data['posts'][i]['body'], 
									likes:data['posts'][i]['likes'], dislikes:data['posts'][i]['dislikes']});
			}
			console.log(loadedPosts);
			this.setState({posts: loadedPosts});
		}).catch(err => {
			console.log('Got an error');
		});
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	getPost(post) {
		return <Post value={post}/>
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	
	handleSubmit(event) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "http://localhost:5000/chatter/api/v1.0/posts", true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		var input = JSON.stringify({
			"body" : this.state.value
		});
		xhttp.send(input);
		this.state.posts.unshift(this.state.value);
		this.setState({value: ''});
		event.preventDefault();
	}
	
	handleClickLiked(postId) {
		var i;
		for (i = 0; i < this.state.posts.length; i++) {
			if (this.state.posts[i].id === postId) {
				break;
			}
		}
		var nPosts = this.state.posts;
		this.setState({
			isButtonDisabled: true
		});
		nPosts[i].likes++;
		this.setState({nPosts});
		var xhttp = new XMLHttpRequest();
		xhttp.open("PUT", "http://localhost:5000/chatter/api/v1.0/posts/"+postId, true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		var input = JSON.stringify({
			"id" : this.state.posts[i].id,
			"body" : this.state.posts[i].body,
			"likes" : this.state.posts[i].likes,
			"dislikes" : this.state.posts[i].dislikes,
		});
		console.log(input);
		xhttp.send(input);
	}
	
	handleClickDisliked(postId) {
			var i;
		for (i = 0; i < this.state.posts.length; i++) {
			if (this.state.posts[i].id === postId) {
				break;
			}
		}
		var nPosts = this.state.posts;
		this.setState({
			isButtonDisabled: true
		});
		nPosts[i].dislikes++;
		this.setState({nPosts});
		var xhttp = new XMLHttpRequest();
		xhttp.open("PUT", "http://localhost:5000/chatter/api/v1.0/posts/"+postId, true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		var input = JSON.stringify({
			"id" : this.state.posts[i].id,
			"body" : this.state.posts[i].body,
			"likes" : this.state.posts[i].likes,
			"dislikes" : this.state.posts[i].dislikes,
		});
		console.log(input);
		xhttp.send(input);
	}
	
	handleClickComments(postId) {
		
	}
	
	render() {
		return (
			<div>
				<div className='postform'>
					<p>Make a new post:</p>
					<form onSubmit={this.handleSubmit}>
						<label>
							<input type="text" value={this.state.value} onChange={this.handleChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
				</div>
				<div>
					{this.state.posts.map(post => 
					<div className="post">{post.body}
						<div>
							<button className="btn" onClick={()=>this.handleClickLiked(post.id)} disabled={this.state.isButtonDisabled}>Like ({post.likes})</button>
							<button className="btn" onClick={()=>this.handleClickDisliked(post.id)} disabled={this.state.isButtonDisabled}>Dislike ({post.dislikes})</button>
							<button className="btn" onClick={()=>this.handleClick(post.id)}>Comments</button>
						</div>
					</div>)}
				</div>
			</div>
		);
	}
}

class App extends Component {
    render() {
        return (
            <div className="App">
				<div className="header">
					<h1>Welcome to Chatter</h1>
				</div>
				<div>
					<AllPosts />
				</div>
            </div>
        );
    }
}

export default App;