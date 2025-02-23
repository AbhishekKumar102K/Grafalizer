import {React,useState} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Main from './Main';


const App = () => {

  const [mode,setMode] = useState(0)
  const [algo,setAlgo] = useState('DFS')
  const [drawer,setDrawer] = useState(false)
  const [lightMode, setLightMode] = useState('light')

  const modeHandler = (flag) => {
    setMode(flag)
  }
  const algoHandler = (algo) => {
    setAlgo(algo)
  }
  const drawerHandler = (drawer) => {
    setDrawer(drawer)
  }

  const toggleMode = () => {
    if(lightMode === 'light')
        setLightMode('dark')
    else    
        setLightMode('light')
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection : 'column',
      height : window.innerHeight - 2,
      width: window.width
      }}>
      <Header modeHandler = {modeHandler} algoHandler = {algoHandler} drawerHandler = {drawerHandler} toggleMode = {toggleMode} lightMode = {lightMode}/>
      <Main mode = {mode} algo = {algo} modeHandler = {modeHandler} drawer = {drawer} drawerHandler = {drawerHandler} lightMode = {lightMode}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

