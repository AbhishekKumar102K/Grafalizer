import React from 'react'
import './Drawer.css'
import 'semantic-ui-react'

const INF = 100000000000

function Drawer({drawer, drawerHandler, bundle, algo, nodes, lightMode}) {


    const analysisContent = ()=> {
        
        if(!drawer)
            return <div></div>

        const travNodesDiv = []
        if(algo==='DFS' || algo==='BFS'){
            bundle.forEach((node)=>{
                if(node!==undefined)
                    travNodesDiv.push(<div style={{fontSize:'20px', margin:'10px', color: lightMode==='light'?'black':'white'}}>{node}</div>)
            })
        }
        else if(algo==='Dijkstra'){

            var maxDist = 0
            bundle.forEach((node)=>{
                if(node.node === -1)
                    return
                if(node.dist !== INF)
                    maxDist = Math.max(maxDist,node.dist)
            })

            bundle.forEach((node)=>{
                if(node.node === -1)
                    return 
                var barwidth
                if(maxDist===0)
                    barwidth = 0
                else
                    barwidth = (node.dist/maxDist)*100

                const barText = ()=> {

                    if(node.dist === INF || node.dist === 0){
                        barwidth = 100
                        return (
                        <span style={{
                            width: `${barwidth*0.75}%`,
                            backgroundColor: 'turqoise',
                            margin: '2px',
                            color: lightMode==='light'?'red':'white',
                            fontWeight: 'bold',
                            transition: '1s',
                            marginRight: '15%'
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
                            backgroundColor: lightMode==='light'?'cyan':'#bb86fc',
                            margin: '2px',
                            color: lightMode==='light'?'black':'#eeeeee',
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
                        paddingLeft: '5%',
                        color: lightMode==='light'?'black':'#eeeeee',
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
        <div className = {(drawer)? (lightMode==='light'?"drawer drawer-open":"drawer-dark drawer-open") : (lightMode==='light'?"drawer":"drawer-dark")}>
            <h1 style={lightMode==='light'?{height:'10%'}:{height:'10%',color:'#dddddd'}}>Analysis</h1>
            <div style={{height: '80%', width: '100%', position:'relative'}}
                    className = "drawer-values">
                {analysisContent()}
            </div>

            <div onClick = {()=>drawerHandler(false)} className='close-drawer'>
                Close
            </div>
        </div>
    )
}

export default Drawer
