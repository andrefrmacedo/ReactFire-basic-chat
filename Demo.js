var Demo = React.createClass({
	mixins: [ReactFireMixin],

	componentWillMount: function() {
		var ref = new Firebase("https://reactdemochat.firebaseio.com/messages");
		this.bindAsArray(ref, 'messages');
	},

	getInitialState: function(){
		return({
			name: '',
			text: '',
			messages: []
		})
	},

	handleChange: function(type, e){
		if(type == 'name')
			this.setState({name: e.target.value})
		else
			this.setState({text: e.target.value})
	},

	handleSubmit: function(e) {
  		e.preventDefault();
  		this.firebaseRefs.messages.push({
  			name: this.state.name,
    		text: this.state.text
  		});
  		this.setState({text: ''});
	},


	render: function(){
		return (
				<div className="columns">
					<div className="column is-half is-offset-one-quarter">
						<h1 className="title is-3 has-text-centered">Demo Chat</h1>
						<h2 className="subtitle has-text-centered">Functionality with Firebase</h2>
						<ChatForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
						<div className="content">
							<br/>
							{this.state.messages.map(function(msg) {
								return <ChatLine key={msg['.key']} name={msg.name} text={msg.text} />
							})}
						</div>
					</div>
				</div>
			)
	}
});

var ChatForm = React.createClass({

	handleSubmit: function(e){
		this.props.handleSubmit(e);
	},

	handleChange: function(type, e){
		this.props.handleChange(type,e);
	},

	render: function(){
		return(
			<form onSubmit={this.handleSubmit} >
				<div className="control is-grouped">
					<div className="control-label">
    					<label className="label">From</label>
  					</div>
					<input 
						className="input column is-1" 
						type="text" 
						placeholder="Name" 
						value={this.props.name} 
						onChange={this.handleChange.bind(null, 'name')}
					/>
					<div className="control-label">
    					<label className="label">Message</label>
  					</div>
					<input 
						className="input" 
						type="text" 
						placeholder="Message" 
						value={this.props.text} 
						onChange={this.handleChange.bind(null, 'text')}
					/>
					<p className="control">
  						<button className="button is-primary">Send</button>
					</p>
				</div>
			</form>
		)
	}
});

var ChatLine = React.createClass({
	render: function(){
		return(
			<div className="is-medium">{this.props.name}: {this.props.text}</div>
		)
	}
});

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);