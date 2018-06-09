class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading'
    };
  }
  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: 'Loading' }))
        : this.setState((prevState) => ({ text: prevState.text + '.' }))
    }, 300)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p>
        {this.state.text}
      </p>
    )
  }
}

function ReposGrid (props) {
  let repos = props.activeLanguage !== 'all' ? repos = props.repos.filter((repo) => repo.language === props.activeLanguage) : props.repos;

  return (
    <ul style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'}}>
      {repos.map(({ name, owner, stargazers_count, html_url, language }) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
      ))}
    </ul>
  )
}

function Nav(props) {
  const languages = ['all', 'JavaScript', 'Ruby', 'Python', 'PHP', 'C', 'C++']
  return (
    <nav>
      <ul>
        {languages.map((language) => (
          <li key={language} onClick={() => props.onSelectLanguage(language)} style={{cursor: 'pointer'}}>{language}</li>
        ))}
      </ul>
    </nav>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      activeLanguage: 'all',
      loading: true
    };

    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
  }

  componentDidMount() {
    API.fetchPopularRepos('all')
      .then((repos) => {     
        console.log(repos);
        this.setState({
          repos,
          loading: false
        })
      })
  }

  handleSelectLanguage(language) {
    this.setState({
      activeLanguage: language
    })
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Nav onSelectLanguage={this.handleSelectLanguage} />
        {this.state.loading === true ? <Loading />
        :
        <div>
          <h1 style={{textAlign: 'center'}}>{this.state.activeLanguage}</h1>
          <ReposGrid repos={this.state.repos} activeLanguage={this.state.activeLanguage}/>
        </div>
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)