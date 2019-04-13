import React, {Component} from 'react';
import './index.css'

function Post(props) {
	return (
		<div className>
			<p>{props.value}</p>
		</div>
	);
}	

function PostInfo (body, likes, dislikes) {
	this.body = body;
	this.likes = likes;
	this.dislikes = dislikes;
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
				var newPost = new PostInfo(data['posts'][i]['body'], data['posts'][i]['likes'], data['posts'][i]['dislikes']);
				console.log(newPost);
				loadedPosts.unshift(newPost);
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
	
	handleClick(message) {
		console.log(message);
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
							<button className="btn" onClick={()=>this.handleClick("Like")}>Like ({post.likes})</button>
							<button className="btn" onClick={()=>this.handleClick("Dislike")}>Dislike ({post.dislikes})</button>
							<button className="btn" onClick={()=>this.handleClick("Comments")}>Comments</button>
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
                <h1>Welcome to Chatter</h1>
				<div>
					<AllPosts />
				</div>
            </div>
        );
    }
}

export default App;