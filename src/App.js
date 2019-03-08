import React, {Component} from 'react';

function Post(props) {
	return (
		<div>
			<p>{props.value}</p>
		</div>
	);
}	

function loadData(src) {
		fetch('https://localhost:5000/chatter/api/v1.0/posts').then(response => {
			return response.json();
		}).then(data => {
			this.setState({posts: data['posts']});
		}).catch(err => {
			console.log('Got an error');
		});
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
				<div className='posttable'>
					<table>
						{this.state.posts.map(post => <tr>{post}</tr>)}
					</table>
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
				<div className="Post">
					<AllPosts />
				</div>
            </div>
        );
    }
}

export default App;