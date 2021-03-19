import {React,useState} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';


const App = () => {

  const [mode,setMode] = useState(0)
  const [algo,setAlgo] = useState('DFS')
  const [drawer,setDrawer] = useState(false)

  const modeHandler = (flag) => {
    setMode(flag)
  }
  const algoHandler = (algo) => {
    setAlgo(algo)
  }
  const drawerHandler = (drawer) => {
    setDrawer(drawer)
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection : 'column',
      height : window.innerHeight - 2,
      width: window.width
      }}>
      <Header modeHandler = {modeHandler} algoHandler = {algoHandler} drawerHandler = {drawerHandler} />
      <Main mode = {mode} algo = {algo} modeHandler = {modeHandler} drawer = {drawer} drawerHandler = {drawerHandler}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

