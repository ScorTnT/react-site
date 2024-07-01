import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
import { waitForElementToBeRemoved } from '@testing-library/react';

function HEAD(props){
  return (<article>
    <h2>{props.title}</h2>
    {props.body}
  </article>)
}
function Link(props){
  return (<p>
    <a
      href={`/`+props.name} 
      onClick={function(event){
        props.set(props.value);
        event.preventDefault(); 
      }}
    >
      {props.name}
    </a>
  </p>)
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
function LogIn(props){
  return (<form onSubmit={function(event){
    //event.preventDefault();
  }}>
  <p>
    <input type="text" placeholder="Id"></input>
    <input type="text" placeholder="Password"></input>
    <input type="submit" value="Login"></input>
  </p>
  <Link set={props.SignUpPage} name="Sign Up" value ="SIGNUP"></Link>
  </form>);
}
function TicTacToeGM(props){
  const [turn,setTurn] = useState();
  const cells = document.querySelectorAll('[data-cell]');
    let isXTurn = true;

    cells.forEach(cell => {
      cell.addEventListener('click', handleClick, { once: true });
    });

    function handleClick(event) {
      const cell = event.target;
      const currentClass = isXTurn ? 'X' : 'O';
      placeMark(cell, currentClass);
      isXTurn = !isXTurn;
    }

    function placeMark(cell, currentClass) {
      cell.textContent = currentClass;
    }
  return(
    <>
    <table className="TTT">
    <tr>
      <td data-cell></td>
      <td data-cell></td>
      <td data-cell></td>
    </tr>
    <tr>
      <td data-cell></td>
      <td data-cell></td>
      <td data-cell></td>
    </tr>
    <tr>
      <td data-cell></td>
      <td data-cell></td>  
      <td data-cell></td>
    </tr>
      </table>
    </>
    )
}
function Game(props){
  const [GUser,setGUser] = useState('')
  var game = props.GameName;
  var playing;
  var gameTable;
  if(GUser === '') {
    gameTable =<>
    <p>select user</p> 
    <p>
      <input type="submit" value="Player 1" 
      onClick={function(event){
        setGUser('P1');
        event.preventDefault();
      }}></input>
      <input type="submit" value="Player 2"
      onClick={function(event){
        setGUser('P2');
        event.preventDefault();
      }}></input>
    </p>
      </>} 
  else{
    if(game === 'TICTACTOE') gameTable = <TicTacToeGM></TicTacToeGM>
  }
  if(game === 'TICTACTOE' && GUser !== '') playing=GUser[0] + "layer " + GUser[1];
  return (<>
    {playing}
    {gameTable}
  </>)
}
function App() {
  const [pageType, setType] = useState('WELCOME');
  const [userName, setUser] = useState('root');
  const [gameName, setGame] = useState('none');
  var MainItem;
  var NavBar='';
  var contents='';

  if(pageType === 'WELCOME' || pageType === 'HOME'){
    MainItem = <HEAD title={pageType} body="Hello, World"></HEAD>
    NavBar = <>
    <Link set={setType} name="Sign Up" value = "SIGNUP"></Link>
    <Link set={setType} name="Login" value="LOGIN"></Link>
    <Link set={setType} name="Game" value ="GAME"></Link></>
    contents = <></>
  }
  else if(pageType === 'SIGNUP'){
    MainItem = <HEAD title="Sign Up Page"></HEAD>
    NavBar = <></>
    contents = <><SignUp></SignUp></>
  }
  else if(pageType === 'LOGIN'){
    if(userName !== 'guest') setUser('guest');
    MainItem = <HEAD title="LogIn"></HEAD>
    NavBar = <></>
    contents = <><LogIn SignUpPage={setType}></LogIn></>
  }
  else if(pageType === 'GAME'){
    var gameBody = "";
    if(gameName === 'none') {gameBody = "Start New Game!" 
      MainItem = <HEAD title={pageType} body = {gameBody}></HEAD>
      NavBar = <></>
      contents = <><Link set={setGame} name="Tic Tac Toe" value = "TICTACTOE"></Link></>
    }
    else {
      MainItem = <HEAD title = {gameName}></HEAD>
      NavBar = <></>
      contents = <><Game GameName={gameName}></Game></>
    }
  }
  console.log(userName,pageType,gameName);
  var box = <>{}{MainItem}{contents}</>
  if(gameName==='none') box = <>{MainItem}{contents}</>
  return (
    <div className="App">
    <header className="App-header">
      <a
        href='/'
        onClick={function(event){
          setType('HOME');
          setUser('root');
          setGame('none');
          event.preventDefault();
        }}
        >
        <img src={logo} className="App-logo" alt="logo"/>
      </a>

    </header>
    <div className="Nav">
      {NavBar}
    </div>
    <div className="MainDiv">
      {box}
    </div>
    </div>
  );
}

export default App;