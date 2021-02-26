import {React,useState} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';


const App = () => {

  const [mode,setMode] = useState(0)
  const modeHandler = flag => setMode(flag)

  return (
    <div>
      <Header modeHandler = {modeHandler}/>
      <Main mode = {mode}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

