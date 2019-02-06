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
				<div>
					<form onSubmit={this.handleSubmit}>
						<label>
							Make a new post
							<input type="text" value={this.state.value} onChange={this.handleChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
				</div>
				<div>
					{this.state.posts.map(post => this.getPost(post))}
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