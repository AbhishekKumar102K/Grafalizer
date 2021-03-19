import {React,useState} from 'react'
import "./Node.css"


const Node = ({x,y,id,selectNode,sel,removeNode}) => {

    return (
        <div
            className= { (sel===id)? "node node-highlighted" : (sel===1000+id)? "node node-visited" : "node"}
            style={{
                left: x-20,
                top: y-20
            }}
            onMouseEnter = {(e)=>{
                if(e.buttons == 2){
                  removeNode(id)
                }
              }}
  
            onContextMenu = {(e)=>{
                e.preventDefault()
                removeNode(id)
              }}
            onClick = {()=>selectNode(id)}
        >   
        
        <div>{id}</div>
            
        </div>
    )
}

export default Node
