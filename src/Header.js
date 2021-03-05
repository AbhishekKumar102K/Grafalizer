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
    }
]

const Header = ({modeHandler, algoHandler}) => {
    
    const handleDropdownChange = (event,data) => {
        algoHandler(data.value)
    }
    return (
        <div className="container">

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
                <button onClick={()=>modeHandler(0)} className="ui small circular icon button green">Node</button>
                <button onClick={()=>modeHandler(1)} className="ui small circular icon button blue">Dir</button>
                <button onClick={()=>modeHandler(2)} className="ui small circular icon button red">Undir</button>
                <button onClick={()=>modeHandler(3)} className="ui small circular icon button purple runbutton">Run</button>
            </div>
        </div>
    )
}

export default Header
