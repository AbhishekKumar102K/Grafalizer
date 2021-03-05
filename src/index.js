import {React,useState} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';


const App = () => {

  const [mode,setMode] = useState(0)
  const [algo,setAlgo] = useState('DFS')

  const modeHandler = (flag) => {
    setMode(flag)
  }
  const algoHandler = (algo) => {
    setAlgo(algo)
  }
  return (
    <div>
      <Header modeHandler = {modeHandler} algoHandler = {algoHandler}/>
      <Main mode = {mode} algo = {algo} modeHandler = {modeHandler}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

