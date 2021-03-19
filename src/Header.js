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

const Header = ({modeHandler, algoHandler}) => {
    
    const handleDropdownChange = (event,data) => {
        algoHandler(data.value)
    }
    return (
        <div className="container">

            <div style={{width:'75%', display: 'flex', justifyContent: 'space-around' }}>
                <span className='dropdown'>
                    <div style = {{fontSize : '1.4em', margin : '10px'}}>
                        Algorithms
                    </div>
                    <div style = {{margin : '10px'}}>
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
                    <button onClick={()=>modeHandler(3)} className="header-button run-button">Run</button>
                    <button onClick={()=>modeHandler(4)} className="header-button reset-button">Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Header
