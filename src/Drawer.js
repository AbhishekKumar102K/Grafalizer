import React from 'react'
import './Drawer.css'
import { Button } from 'semantic-ui-react'

const INF = 100000000000

function Drawer({drawer, drawerHandler, bundle, algo}) {

    const analysisContent = ()=> {
        
        const travNodesDiv = []
        if(algo==='DFS' || algo==='BFS'){
            bundle.forEach((node)=>{
                travNodesDiv.push(<div style={{fontSize:'20px', margin:'10px'}}>{node.node}</div>)
            })
        }
        else if(algo==='Dijkstra'){

            var maxDist = 0
            bundle.forEach((node)=>{
                if(node.dist !== INF)
                    maxDist = Math.max(maxDist,node.dist)
            })

            bundle.forEach((node)=>{
                var barwidth
                if(maxDist===0)
                    barwidth = 0
                else
                    barwidth = (node.dist/maxDist)*100
                // console.log(barwidth)

                const barText = ()=> {

                    if(node.dist === INF || node.dist === 0){
                        barwidth = 100
                        return (
                        <span style={{
                            width: `${barwidth*0.75}%`,
                            backgroundColor: 'turqoise',
                            margin: '2px',
                            color: 'yellow',
                            transition: '1s'
                            }}
                        >
                            {!node.dist?node.dist:'INF'}
                        </span>
                        )
                    }
                    else {
                        return (
                        <span style={{
                            width: `${barwidth*0.75}%`,
                            backgroundColor: 'cyan',
                            margin: '2px',
                            color: 'black',
                            transition: '1s '
                            }}
                        >
                            {node.dist}
                        </span>
                        )
                    }
                }


                travNodesDiv.push(
                    <div style={{
                        width: '100%',
                        height: '25px',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}>   
                    <span style={{
                        width:'20%', 
                        display: 'flex',
                        alignSelf : 'center',
                        fontWeight: 'bold',
                        paddingLeft: '5%'
                        }}>
                        {node.node}
                    </span>
                    
                    {barText()}
                    
                    </div>
                ) 
            })
        }
        return travNodesDiv
    }

    return (
        <div className = {(drawer)? "drawer drawer-open": "drawer"}>
            <h1 style={{height:'10%',marginLeft: '20px'}}>Analysis</h1>
            <div style={{height: '80%', width: '100%', position:'relative'}}>
                {analysisContent()}
            </div>
            <Button onClick={()=>drawerHandler(false)} className="close-drawer">
                Close
            </Button>
        </div>
    )
}

export default Drawer
