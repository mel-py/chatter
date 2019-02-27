import React, {Component} from 'react';

function Post(props) {
	return (
		<div>
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
		
		/*var requestURL = 'https://mel-py.github.io/data.json';
		var request = new XMLHttpRequest();
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
		request.onload = function() {
			callback(request.response);
		}*/
	
		fetch('https://mel-py.github.io/data.json').then(response => {
			return response.json();
		}).then(data => {
			this.setState({posts: data['posts']});
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
                <h1>Hello, React!</h1>
				<div className="Post">
					<AllPosts />
				</div>
            </div>
        );
    }
}

export default App;