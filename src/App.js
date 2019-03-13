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
			var postBodies = [];
			var i;
			for (i = 0; i < data['posts'].length; i++) {
				postBodies.unshift(data['posts'][i]['body']);
			}
			console.log(postBodies);
			this.setState({posts: postBodies});
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
					<div className="post">{post}
						<div>
							<button className="btn" onClick={()=>this.handleClick("Like")}>Like</button>
							<button className="btn" onClick={()=>this.handleClick("Dislike")}>Dislike</button>
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