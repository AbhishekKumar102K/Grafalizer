import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import "./Header.css"

const algoOptions = [ 
    {
        key: 'DFS',
        text: 'DFS',
        value: 'DFS',
    },
    {
        key: 'BFS',
        text: 'BFS',
        value: 'BFS',
    },
    {
        key: 'Dijkstra',
        text: 'Dijkstra',
        value: 'Dijkstra',
    }
]

const Header = ({modeHandler, algoHandler, drawerHandler, toggleMode, lightMode}) => {
    
    const handleDropdownChange = (event,data) => {
        algoHandler(data.value)
        drawerHandler(false)
    }
    

    return (
        <div className= {lightMode==='light'?"container":"container-dark"}>

            <div style={{width:'75%', display: 'flex', justifyContent: 'space-around', borderBottom:'2px solid #2f3136'}}>
                <span className='dropdown'>
                    <div style = {lightMode==='light'?{fontSize : '1.4em', margin : '10px'}:{fontSize : '1.4em', margin : '10px', color: '#eeeeee'}}>
                        Algorithms
                    </div>
                    <div style = {lightMode==='light'?{margin : '10px'}:{margin : '10px', color: '#eeeeee'}}>
                    <Dropdown
                        inline 
                        options = {algoOptions}
                        defaultValue = 'DFS'
                        onChange={handleDropdownChange}/>
                    </div>
                </span>

            
                <div className="menu-items">
                    <button onClick={()=>modeHandler(0)} className="header-button add-node">Node</button>
                    <button onClick={()=>modeHandler(1)} className="header-button dir-edge">Dir</button>
                    <button onClick={()=>modeHandler(2)} className="header-button undir-edge">Undir</button>
                    
                </div>
            </div>

            <div className='settings-container'>
                
                <div className={lightMode==='light'?'toggle-switch':'toggle-switch-dark'} onClick = {toggleMode}>
                    <div className= {lightMode==='light'?'toggle-ball':'toggle-ball-dark'}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
