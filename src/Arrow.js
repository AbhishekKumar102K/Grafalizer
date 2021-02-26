import {React, useState} from 'react'
import "./Arrow.css"

function Arrow({fromx,fromy,tox,toy,id,removeEdge,addWeight,directed}) {

    const [visible, setVisibility] = useState('hidden')
    const [value, setValue] = useState('')

    const RADIUS = 20
    const delx = tox - fromx
    const dely = toy - fromy
    const width = Math.sqrt((delx * delx) + (dely * dely)) - (2*RADIUS) - 12
    const height = 10

    const cenx = (tox + fromx) / 2
    const ceny = (toy + fromy) / 2
    
    let angle = Math.atan((fromy - toy) / (tox - fromx))
    let inputOffset = 0, angleOffset = Math.PI/4, negAngle = 1
    if(fromx<tox && fromy<toy){
      angleOffset += Math.PI
      negAngle = -1
    }

    if(angle<0){
      inputOffset = 25
    }


    if((fromy < toy && fromx > tox) || (fromy > toy && fromx > tox))
      angle += Math.PI
  
  
    if (angle < 0) angle += Math.PI

    const arrowStyle = {
      position: 'absolute',
      top: ceny - (height / 2),
      left: cenx - (width / 2),
      display: 'flex',
      alignItems : 'center',
      justifyContent : 'center',
      transform: `rotate(-${angle}rad)`,
      height: height, 
      width: width
    }

    const handleChange = (e) => {
      setValue(e.target.value)
      e.target.style.width = e.target.value.length + 4 + 'ch'
    }

    return (
      <div>
        <div style={arrowStyle} className="arrowSurround" 
            onContextMenu = {(e)=>{
            e.preventDefault()
            removeEdge(id)
          }}
          onClick = {()=>setVisibility('visible')}>
          <div
          className = "arrow"
          onContextMenu = {(e)=>{
            e.preventDefault()
            removeEdge(id)
          }}
          onClick = {()=>setVisibility('visible')}
          >

          </div>

        </div>
        <div className = { directed? "arrow-head" : ""} style={{position: 'absolute',
                                            top: toy + ((RADIUS + 12)*Math.sin(angle))*negAngle - 8,
                                            left: tox - ((RADIUS + 12)*Math.cos(angle))*negAngle - 8,
                                            transform: `rotate(-${angle + angleOffset}rad)`,
                                          }}></div>

        
        <input type="text"
              style = {{
                position: 'absolute',
                top: ceny - inputOffset,
                left: cenx,
                visibility: visible
              }}
              className = "input-weight"
              placeholder = "0"
              autoFocus
              onChange = {handleChange}
              onBlur = {()=>{
                if(value!==''){
                  addWeight(id,value)
                }
              }}
              />
        
        
        
      </div>
    )
}

export default Arrow
