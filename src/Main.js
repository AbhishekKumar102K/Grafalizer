import React from 'react'
import { render } from 'react-dom'
import "./Main.css"
import "./MainDark.css"
import Node from './Node'
import Arrow from './Arrow'
import { runAlgo } from './runAlgo'
import Drawer from './Drawer'

const RADIUS = 20
let nnodes = -1
let notifText = 'Add nodes'
class Main extends React.Component {

    constructor(){
        super()
        this.canvasRef = React.createRef()
    }


    state = { nodes: [{}] , items : [], edges : [{}], sel : 0, arrows: [{}], adj: {}, bundle : [], notif : false, drag : 0}

    forceRender = () => this.forceUpdate()

    dragHandler = (id) => {
        this.setState({drag: id})
    }

    resetColor = () => {
        for(var i = 1;i<=this.state.items.length; i++){
            if(this.state.items[i-1]!==undefined){
                this.state.items[i-1] = <Node x = {this.state.nodes[i].x}
                                            y = {this.state.nodes[i].y}
                                            id = {this.state.nodes[i].id}
                                            selectNode = {this.selectNode}
                                            sel = {0}
                                            removeNode = {this.removeNode}
                                            drag = {this.state.drag}
                                            dragHandler = {this.dragHandler}
                                            moveNode = {this.moveNode}
                                        />
            }
        }   
        this.forceRender()
    }

    resetEdges = async () => {
        for(var i = 1;i<=this.state.edges.length; i++){
            if(this.state.edges[i]===undefined)
                continue
            this.state.arrows[i] = { component: <Arrow
                fromx = {this.state.nodes[this.state.edges[i].from].x}
                fromy = {this.state.nodes[this.state.edges[i].from].y}
                tox = {this.state.nodes[this.state.edges[i].to].x}
                toy = {this.state.nodes[this.state.edges[i].to].y}
                id = {i}
                removeEdge = {this.removeEdge}
                addWeight = {this.addWeight}
                directed = {this.state.edges[i].directed}
                progress = {'100%'}
                progressColor = {'#ffffff'}
                lightMode = {this.props.lightMode}/>,
                id: i
            } 
        }
        this.forceRender()
    }

    componentDidUpdate(prevProps) {
        if(this.props.mode === 'run algo'){
            if(this.state.sel){           //if a node has been selected, start the algo
                let startNode = this.state.sel
                this.state.sel = 0

                this.formAdj()
                const progressBundle = {
                    edges : this.state.edges,
                    arrows : this.state.arrows,
                    removeEdge : this.removeEdge,
                    addWeight : this.addWeight
                }
                runAlgo(this.props.algo, startNode, this.state.adj, this.state.items, 
                    this.state.nodes, this.selectNode, this.forceRender, this.props.drawerHandler, 
                    this.state.bundle, progressBundle, this.removeNode, this.resetColor, this.resetEdges,
                    this.props.lightMode)
                this.state.adj = {}
                this.props.modeHandler(0)
                return
            }
        }

        if(this.props.mode == 3){
            this.state.notif = true
            this.resetColor()
            this.resetEdges()
            this.state.bundle = []
            console.log(nnodes)
            if(nnodes>=0){
                this.props.modeHandler('run algo')
                notifText = 'Select a node'
            }
            else{
                this.props.modeHandler(0)
                // this.state.notif = false
            }
            this.props.drawerHandler(false)   
        }
        if(this.props.mode == 4 && prevProps!=this.props){
            this.setState({ nodes: [{}] , items : [], edges : [{}], sel : 0, arrows: [{}], adj: {}, bundle : []})
            this.props.modeHandler(0)
            this.props.drawerHandler(false)
            this.state.notif = false
        }

    }

    formAdj = ()=> {
        this.state.edges.forEach((edge)=>{
            if(edge===undefined)
                return

            var u = edge.from, v = edge.to, w = edge.weight
            if(this.state.adj[u]===undefined){
                this.state.adj[u] = []
            }
            this.state.adj[u].push({to: v, w: w})

            if(edge.directed===false){
                if(this.state.adj[v]===undefined){
                    this.state.adj[v] = []
                }
                this.state.adj[v].push({to: u, w: w})
            }
        })
    }

    dfsTrav = (u,vis) => {
        vis[u] = true
        
        if(this.state.adj[u]===undefined){
            this.state.adj[u] = []
        }
        
        this.state.adj[u].forEach((node)=>{
            if(!vis[node.to]){
                this.dfsTrav(node.to,vis)
            }
        })
    }

    removeEdge = (id)=>{
        var array = [...this.state.arrows]; // make a separate copy of the array
        var edgeList = [...this.state.edges];

        array[id] = {}
        delete edgeList[id] 
        this.setState({arrows: array, edges: edgeList});
        this.props.drawerHandler(false)
    }

    removeNode = (id)=>{
        this.forceRender()
        var nodes = this.state.nodes // make a separate copy of the array
        var edgeList = this.state.edges;
        var arrows = this.state.arrows

        for(var i = 1; i <= this.state.edges.length; i++){
            var edge = this.state.edges[i]

            if(edge!==undefined){
                if(edge.from === id || edge.to === id){
                    arrows[i] = {}
                    delete edgeList[i]
                }
            }
        }

        delete nodes[id]
        delete this.state.items[id-1]
        this.props.drawerHandler(false)
        this.setState({nodes: nodes, edges: edgeList, arrows: arrows});
    }

    addWeight = (id,weight)=>{
        var edgeList = [...this.state.edges] // make a separate copy of the array
        
        edgeList[id].weight = parseInt(weight)

        this.edges = edgeList
        this.forceRender()
    }

    flipNode = (id,lit) => {
        var itemList = [...this.state.items]
        var nodeList = [...this.state.nodes]

        var x = nodeList[id].x
        var y = nodeList[id].y

        itemList[id-1] = <Node x = {x}
                            y = {y}
                            id = {id}
                            selectNode = {this.selectNode}
                            sel = {lit}
                            removeNode = {this.removeNode}
                            drag = {this.state.drag}
                            dragHandler = {this.dragHandler}
                            moveNode = {this.moveNode}
                        />
        this.setState({
            items: itemList
        })
    }

    moveNode = (e,id) => {
        if(this.props.mode === 0 && id){
            const rect = this.canvasRef.current.getBoundingClientRect()
            let x = e.clientX - rect.left
            let y = e.clientY - rect.top    
            this.state.nodes[id] = {x,y,id}

            this.state.items[id-1] = <Node x = {x}
                y = {y}
                id = {id}
                selectNode = {this.selectNode}
                sel = {0}
                removeNode = {this.removeNode}
                drag = {this.state.drag}
                dragHandler = {this.dragHandler}
                moveNode = {this.moveNode}
            />      

            var nodes = this.state.nodes // make a separate copy of the array
            var edgeList = this.state.edges;
            var arrows = this.state.arrows

            for(var i = 1; i <= edgeList.length; i++){
                var edge = this.state.edges[i]

                if(edge!==undefined){
                    if(edge.from === id || edge.to === id){

                        arrows[i] = { component: <Arrow
                            fromx = {nodes[edge.from].x}
                            fromy = {nodes[edge.from].y}
                            tox = {nodes[edge.to].x}
                            toy = {nodes[edge.to].y}
                            id = {i}
                            removeEdge = {this.removeEdge}
                            addWeight = {this.addWeight}
                            directed = {edge.directed}
                            lightMode = {this.props.lightMode}/>,
                            id: i
                        }   
                    }
                }
            }

        }
        this.forceRender() 
    }

    selectNode = (id) => {
        if(this.props.mode==0){
            return
        }
        if(this.state.sel == 0){
            this.state.sel = id
            if(this.props.mode === 'run algo')
                this.setState({notif: false})
            else
                this.flipNode(id,id)
        }
        else{
            if(this.props.mode==1){

                const from = this.state.nodes[this.state.sel]
                const to = this.state.nodes[id]

                
                this.flipNode(this.state.sel,0)
                if(this.state.edges.some((edge)=>{
                                        if(edge===undefined)
                                            return false
                                            this.setState({sel: 0})
                                        return edge.from == this.state.sel && edge.to == id}))
                {
                    return
                }

                var edgeId = this.state.edges.length 
                this.setState({edges: [...this.state.edges,{from: this.state.sel, to: id, weight: 0, directed: true}], 
                                arrows: [...this.state.arrows,{ component: <Arrow
                                                                fromx = {from.x}
                                                                fromy = {from.y}
                                                                tox = {to.x}
                                                                toy = {to.y}
                                                                id = {edgeId}
                                                                removeEdge = {this.removeEdge}
                                                                addWeight = {this.addWeight}
                                                                directed = {true}
                                                                lightMode = {this.props.lightMode}/>,
                                                                id: edgeId
                                                            }
                                        ] , sel: 0})

            }
            else if(this.props.mode == 2) {

                const from = this.state.nodes[this.state.sel]
                const to = this.state.nodes[id]

                this.flipNode(this.state.sel,0)
                if(this.state.edges.some((edge)=>{
                                    if(edge===undefined)
                                        return false
                                    this.setState({sel: 0})
                                    return (edge.from === this.state.sel && edge.to === id) || (edge.from === id && edge.to === this.state.sel)}))
                {
                    return
                }
            
                this.setState({edges: [...this.state.edges,{from: this.state.sel, to: id, weight: 0, directed: false}], 
                                arrows: [...this.state.arrows,{ component: <Arrow
                                                                fromx = {from.x}
                                                                fromy = {from.y}
                                                                tox = {to.x}
                                                                toy = {to.y}
                                                                id = {this.state.edges.length}
                                                                removeEdge = {this.removeEdge}
                                                                addWeight = {this.addWeight}
                                                                directed = {false}
                                                                forceRender = {this.forceRender}
                                                                lightMode = {this.props.lightMode}/>,
                                                                id: this.state.edges.length,
                                                                
                                                            }
                                        ] , sel: 0})
            }
        }
    }

    createNode = (e) => {
        const rect = this.canvasRef.current.getBoundingClientRect()
        this.state.notif = false
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        var invalid = false
        this.resetColor()
        this.resetColor()
        const allNodes = this.state.nodes
        const clash = (node) => {
            if(node!==undefined)
                return Math.abs(node.x-x)<=2*(RADIUS) && Math.abs(node.y-y)<=2*(RADIUS)
        }

        invalid = allNodes.some(clash)

        nnodes = 0
        allNodes.forEach((node)=>{
            if(node!==undefined)
                nnodes++
        }) 
        invalid = (invalid || nnodes>19)

        var id = this.state.nodes.length
        if(invalid===false){
            this.setState({
                nodes: [...this.state.nodes,{x,y,id}],
                items: [...this.state.items,
                    <Node
                        x = {x}
                        y = {y}
                        id = {id}
                        selectNode = {this.selectNode}
                        sel = {this.state.sel}
                        removeNode = {this.removeNode}
                        drag = {0}
                        dragHandler = {this.dragHandler}
                        moveNode = {this.moveNode}
                    />
                ]
            })

        }
    }



    render() {
        
        return (
        <div className = {this.props.lightMode==='light'?"main-container":"main-container-dark"}>

            <div
            onClick={(e)=> {
                if(this.props.mode==0){
                {
                    if(e.clientX > 80)
                        this.createNode(e)
                }
            }}} 
            className= {this.props.lightMode==='light'?"canvas":"canvas-dark"} 
            ref={this.canvasRef}
            onContextMenu = {(e)=>{
                e.preventDefault()
            }}
            onMouseUp = {()=>this.dragHandler(0)}
            onMouseMove = {(e)=>{
                if(!(Object.keys(this.state.drag).length === 0 && this.state.drag.constructor === Object))
                {
                    if(this.state.drag)
                        this.moveNode(e,this.state.drag)
                }
            }}
            >
                <div className='canvas-tools'>
                    <button onClick = {()=>this.props.modeHandler(3)} className="run-button unselectable"></button>
                    <button onClick = {()=>this.props.modeHandler(4)} className="reset-button unselectable"></button>
                </div>
            </div>
            
            <div className="node-container">
                {this.state.items}
            </div>


            <div className="instructions-container">
                <div className = "instructions">
                    <div className='instructions-heading'>Instructions</div>
                    <ul style = {{listStyleType: 'none'}}>
                    <li className='instructions-item'>Add nodes by clicking anywhere on the canvas</li>
                    <li className='instructions-item'>For adding edges, click on source node followed by target node.</li>
                    <li className='instructions-item'>For adding weights to edges, click anywhere on the edge and type in the weight value</li>
                    </ul>
                </div>
            </div>


            <div className="arrow-container">
                {this.state.arrows.map((arrow)=>arrow.component)}
            </div>
            <div className='drawer-container'>
                <Drawer drawer = {this.props.drawer} drawerHandler = {this.props.drawerHandler} bundle = {this.state.bundle} algo = {this.props.algo} nodes = {this.state.nodes} lightMode = {this.props.lightMode}/>
            </div>
            <div className = {this.props.lightMode==='light'?"notif-container":"notif-container-dark"} >   
                <div className = {this.props.lightMode==='light'?"notif":"notif-dark"}> 
                    {<div className = {this.props.lightMode==='light'?"notif-text":"notif-text-dark"} style={this.state.notif?{opacity:'1'}:{opacity:'0'}}>{notifText}</div>}
                </div>
            </div>
        </div>
    )
 }
}   
export default Main
                