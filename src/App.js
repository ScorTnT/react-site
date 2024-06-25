import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
//
function HEAD(props){
  return (<article>
    <h2>{props.title}</h2>
    {props.body}
  </article>)
}
function Control(props){
  return (<p><a href={`/`+props.name} onClick={function(event){
    props.setType(props.name);
    event.preventDefault();
  }}>{props.name}</a></p>)
}
function Create(props){
  return(
    <form onSubmit={function(event){
      event.preventDefault();
    }}>
    <p>
      <input type="submit" value="Create"></input>
    </p>
    </form>
  )
}
function UserMod(props){
  props.setUser(props.user);
  return ;
}
function App() {
  const [pageType, setType] = useState('WELCOME');
  const [userName, setUser] = useState('root');
  var mainBar='';
  var controlBar='';
  var contents='';
  var body = '';

  if(pageType === 'WELCOME'){
    mainBar = <HEAD title="WELCOME" body="Hello, World"></HEAD>
    controlBar = <><Control setType={setType} name="Create"></Control>
    <Control setType={setType} name="Login"></Control></>
  }
  else if(pageType === 'Login'){
    mainBar = <HEAD title="Login"></HEAD>
    body = <UserMod setUser={setUser} user="guest"></UserMod>
    body += userName;
  }
  else if(pageType === 'Create'){
    mainBar = <><HEAD title="Create Page"></HEAD></>
    controlBar = <><Control setType={setType} name="WELCOME"></Control></>
    contents = <><Create></Create></>
  }
  console.log(userName);
  return (
    <html>
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
    </html>
  );
}

export default App;