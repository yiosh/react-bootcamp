function ActiveFriendsList (props) {
  return (
    <div>
      <h1>Active Friends</h1>
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
      <h1>Inactive Friends</h1>
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
      friends: [
        {
          name: 'Jordyn',
          active: true
        },
        {
          name: 'Mikenzi',
          active: true
        },
        {
          name: 'Tiffany',
          active: true
        },
        {
          name: 'Jake',
          active: false
        }
      ],
      input: ''
    };

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleToggleFriend = this.handleToggleFriend.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
  };

  handleClearAll() {
    this.setState((currentState) => {
      return {
        friends: []
      }
    });
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
    console.log(this.state.friends)
    return (
      <div>
        <input 
        type='text'
        placeholder='new friend'
        value={this.state.input}
        onChange={this.updateInput}
        />
        
        <button onClick={this.handleAddFriend}>Submit</button>
        <button onClick={this.handleClearAll}>Clear All</button>

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
)
