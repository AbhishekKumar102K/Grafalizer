import {React, useState, useEffect} from 'react'
import "./Arrow.css"

function Arrow({fromx,fromy,tox,toy,id,removeEdge,addWeight,directed,progress='0%',progressColor=false, lightMode}) {

    // console.log(lightMode)
    const [visible, setVisibility] = useState('hidden')
    const [value, setValue] = useState('')
    
    useEffect(()=>{
      console.log("sdf")
    },[lightMode])

    const RADIUS = 20
    const delx = tox - fromx
    const dely = toy - fromy
    const width = Math.sqrt((delx * delx) + (dely * dely)) - (2*RADIUS) - 12
    const height = 10

    const cenx = (tox + fromx) / 2
    const ceny = (toy + fromy) / 2
    
    let selfLoop
    if(((fromx==tox) && (fromy==toy)))
    {
      selfLoop = true
    }

    // console.log(selfLoop)

    let angle = Math.atan((fromy - toy) / (tox - fromx))
    let inputOffset = 0, angleOffset = Math.PI/4

    if(angle <= 0){
      inputOffset = 25
      if(fromy<=toy && tox >= fromx) // 4th quad
        angle = 2*Math.PI + angle
      else                          // 2nd quad
        angle = Math.PI + angle
    }
    else{
      if(fromy<=toy && tox<fromx)
        angle = Math.PI + angle     // 3rd quad
    }


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

    if(!selfLoop){
      return (
        <div>
          <div style={arrowStyle} className="arrowSurround" 
              onContextMenu = {(e)=>{
              e.preventDefault()
              removeEdge(id)
            }}

            onMouseEnter = {(e)=>{
              if(e.buttons == 2){
                removeEdge(id)
              }
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
            
            <div style={{
              width: progress, 
              backgroundColor: progressColor, 
              zIndex: 7
              }}>

            </div>

            </div>

          </div>

          <div className = { directed? "arrow-head" : ""} style={{position: 'absolute',
                                              top: toy + ((RADIUS + 12)*Math.sin(angle)) - 8,
                                              left: tox - ((RADIUS + 12)*Math.cos(angle)) - 8,
                                              color: progress=='100%'?'yellow':'white',
                                              transform: `rotate(-${angle + angleOffset}rad)`,
                                            }}></div>

          
          <input type="text"
                style = {{
                  position: 'absolute',
                  top: ceny - inputOffset,
                  left: cenx,
                  visibility: visible
                }}
                className = {lightMode==='light'?"input-weight":"input-weight-dark"}
                placeholder = {0}
                autoFocus = "true"
                onSubmit = {()=>addWeight(id,value)}
                onChange = {handleChange}
                onBlur = {()=>{
                  if(value!=='')
                    addWeight(id,value)
                  
                }}
                />
          
        </div>
      )
    }
    else {
      return (

        <div>
          <div style = {{
            position: "absolute",
            top: ceny - 2*RADIUS,
            left: cenx - RADIUS,
            height: 2*RADIUS,
            width: 2*RADIUS,
          }}
          className = "arrowDirected" 
          onClick = {()=>setVisibility('visible')}
          onContextMenu = {(e)=>{
            e.preventDefault()
            removeEdge(id)
          }}
          onMouseEnter = {(e)=>{
            if(e.buttons == 2){
              removeEdge(id)
            }
          }}
          >
          </div>

          <div className = { directed? "arrow-head" : ""} style={{position: 'absolute',
                                              top: toy - RADIUS - 7,
                                              left: tox - RADIUS*2 + 13 ,
                                              transform: `rotate(${20}deg)`,
                                            }}></div>


          <input type="text"
                style = {{
                  position: 'absolute',
                  top: ceny - 3.3*RADIUS,
                  left: cenx - 0.4*RADIUS,
                  visibility: visible,
                }}
                className = {lightMode==='light'?"input-weight":"input-weight-dark"}
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
}

export default Arrow
