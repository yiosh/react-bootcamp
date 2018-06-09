class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading'
    }
  }

  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = setInterval(() => {
      this.state.text === stopper ? this.setState({text: 'Loading'}) 
      :
      this.setState((currentState) => {
        return {
          text: currentState.text + '.'
        }
      })
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <p>{this.state.text}</p>
  }
}

function ActiveFriendsList (props) {
  return (
    <div>
      <h2>Active Friends</h2>
      <ul>
        {props.list.map((friend) => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
            <button onClick={() => props.onToggleFriend(friend.name)}>Deactivate</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function InactiveFriendsList (props) {
  return (
    <div>
      <h2>Inactive Friends</h2>
      <ul>
        {props.list.map((friend) => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onToggleFriend(friend.name)}>Activate</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      input: '',
      loading: true
    };

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleToggleFriend = this.handleToggleFriend.bind(this);

    console.log('--constructor--');
  }

  componentDidMount() {
    console.log('--componentDidMount--');
    API.fetchFriends()
      .then((friends) => {
        this.setState({
          friends,
          loading: false
        })
        console.log(friends);
      })
  }

  componentDidUpdate() {
    console.log('--componentDidUpdate--');
  }

  componentWillUnmount() {
    console.log('--componentWillUnmount--');
  }

  updateInput(e) {
    const value = e.target.value;
    this.setState({
      input: value
    });
  }

  handleAddFriend() {
    if(this.state.input !== '') {
      this.setState((currentState) => {
        return {
          friends: currentState.friends.concat([{
            name: currentState.input,
            active: true
          }]),
          input: ''
        }
      });
    }
  }

  handleRemoveFriend(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.filter((friend) => friend.name !== name)
      }
    });
  }

  handleToggleFriend(name) {
    this.setState((currentState) => {
      const friend = currentState.friends.find((friend) => friend.name === name);
      return {
        friends: currentState.friends.filter((friend) => friend.name !== name)
        .concat([{
          name,
          active: !friend.active
        }])
      }
    });
  }

  render() {
    console.log('--render--');
    if (this.state.loading === true) {
      return <Loading />
    }

    return (
      <div>
        <input 
        type='text'
        placeholder='new friend'
        value={this.state.input}
        onChange={this.updateInput}
        />
        
        <button onClick={this.handleAddFriend}>Submit</button>
        <button onClick={() => this.setState({friends: []})}>Clear All</button>

        <ActiveFriendsList 
          list={this.state.friends.filter((friend) => friend.active === true)} 
          onRemoveFriend={this.handleRemoveFriend}
          onToggleFriend={this.handleToggleFriend} 
        />

        <InactiveFriendsList 
          list={this.state.friends.filter((friend) => friend.active === false)} 
          onToggleFriend={this.handleToggleFriend} 
        />
      </div>
    );
  };
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
