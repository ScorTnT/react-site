import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function HEAD(props){
  return (<article>
    <h2>{props.title}</h2>
    {props.body}
  </article>)
}
function Link(props){
  return (<p><a href={`/`+props.value} onClick={function(event){
    props.setType(props.value);
    event.preventDefault();
  }}>{props.name}</a></p>)
}
function SignUp(props){
  return(
    <><form action="/login" method="POST" onSubmit={function(event){
      event.preventDefault();
    }}>
    <p>
      <input type="submit" value="Create"></input>
    </p>
    </form>
    </>
  )
}
function LoginP(props){
  //props.setUser(props.user);
  return (<form onSubmit={function(event){
    event.preventDefault();
  }}>
  <p>
    <input type="submit" value="Login"></input>
  </p>
  <Link name="SignUp"></Link>
  </form>);
}
function App() {
  const [pageType, setType] = useState('WELCOME');
  const [userName, setUser] = useState('root');
  var mainBar='';
  var controlBar='';
  var contents='';
  var body = '';

  if(pageType === 'WELCOME' || pageType === 'HOME'){
    mainBar = <HEAD title={pageType} body="Hello, World"></HEAD>
    controlBar = <><Link setType={setType} name="Sign Up" value = "SIGNUP"></Link>
    <Link setType={setType} name="LOGIN"></Link></>
  }
  else if(pageType === 'LOGIN'){
    if(userName !== 'guest') setUser('guest');
    mainBar = <HEAD title="LogIn" body="Put your Id & Pass Word"></HEAD>
    controlBar = <><Link setType={setType} name="HOME" value="HOME"></Link></>
    contents = <LoginP setUser={setUser} user="guest"></LoginP>
  }
  else if(pageType === 'SIGNUP'){
    mainBar = <><HEAD title="Create Page"></HEAD></>
    controlBar = <><Link setType={setType} name="HOME" value></Link></>
    contents = <><SignUp></SignUp></>
  }
  console.log(userName,pageType);

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="Nav">
      {controlBar}
    </div>
    <div className="MainDiv">
      {mainBar}
      {contents}
      {body}
    </div>
    </div>
  );
}

export default App;