import {React,useState} from 'react'
import "./Node.css"


const Node = ({x,y,id,selectNode,sel}) => {


    return (
        <div
            className= { (sel===id)? "node-highlighted" : "node"}
            style={{
                left: x-20,
                top: y-20
            }}
            onClick = {()=>selectNode(id)}
        >   
        
        <div>{id}</div>
            
        </div>
    )
}

export default Node
