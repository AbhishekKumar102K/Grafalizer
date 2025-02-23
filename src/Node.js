import {React,useState} from 'react'
import "./Node.css"


const Node = ({x,y,id,selectNode,sel,removeNode,drag = 0,dragHandler = () => {},moveNode = () => {}}) => {

    return (
        <div
            className= { (sel===id)? "node node-highlighted unselectable" : (sel===1000+id)? "node node-visited unselectable" : "node unselectable"}
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
            onMouseDown = {(e)=>{
              if(e.buttons === 1){
                e.preventDefault()
                dragHandler(id)
              }
            }}
            onMouseMove = {(e)=>{
              if(e.buttons === 1){
                moveNode(e,id)
              }
            }}
            onMouseUp = {()=>{dragHandler(0)}}
        >   
        
        <div>{id}</div>
            
        </div>
    )
}

export default Node
