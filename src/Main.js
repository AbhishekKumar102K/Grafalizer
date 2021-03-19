import React from 'react'
import { render } from 'react-dom'
import "./Main.css"
import Node from './Node'
import Arrow from './Arrow'
import { runAlgo } from './runAlgo'
import Drawer from './Drawer'

const RADIUS = 20
class Main extends React.Component {

    constructor(){
        super()
        this.canvasRef = React.createRef()
    }


    state = { nodes: [{}] , items : [], edges : [{}], sel : 0, arrows: [{}], adj: {}, bundle : []}

    forceRender = () => this.forceUpdate()

    componentDidUpdate(prevProps) {
        if(this.props.mode == 3){
            this.state.bundle = []
            this.formAdj()
            // console.log(this.state.adj)
            const progressBundle = {
                edges : this.state.edges,
                arrows : this.state.arrows,
                removeEdge : this.removeEdge,
                addWeight : this.addWeight
            }
            runAlgo(this.props.algo, this.state.adj, this.state.items, this.state.nodes, this.selectNode, this.forceRender, this.props.drawerHandler, this.state.bundle, progressBundle, this.removeNode)
            this.props.modeHandler(0)
            this.state.adj = {}
        }
        if(this.props.mode == 4 && prevProps!=this.props){
            this.setState({ nodes: [{}] , items : [], edges : [{}], sel : 0, arrows: [{}], adj: {}, bundle : []})
            this.props.modeHandler(0)

        }
        // console.log("Re render main")
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
        // console.log(u)
    }

    removeEdge = (id)=>{
        var array = [...this.state.arrows]; // make a separate copy of the array
        var edgeList = [...this.state.edges];

        array[id] = {}
        delete edgeList[id] 
        this.setState({arrows: array, edges: edgeList});
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
                    console.log(i)
                    arrows[i] = {}
                    delete edgeList[i]
                }
            }
        }

        nodes[id] = {}
        delete this.state.items[id-1]
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
                        />
        this.setState({
            items: itemList
        })
    }


    selectNode = id => {
        if(this.props.mode==0){
            return
        }
        if(this.state.sel == 0){
            // console.log(id)
            this.setState({sel: id})
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
                                                                directed = {true}/>,
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
                                                                forceRender = {this.forceRender}/>,
                                                                id: this.state.edges.length,
                                                                
                                                            }
                                        ] , sel: 0})
            }
    }
    }

    createNode = (e) => {
        const rect = this.canvasRef.current.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        var invalid = false
        const allNodes = this.state.nodes
        const clash = (node) => Math.abs(node.x-x)<=2*(RADIUS) && Math.abs(node.y-y)<=2*(RADIUS);

        invalid = allNodes.some(clash)
        invalid = (invalid || allNodes.length>20)

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
                    />
                ]
            })

        }
    }



    render() {
        
        return (
        <div className = "main-container" >
            <div
            onClick={(e)=> {
                if(this.props.mode==0){
                    this.createNode(e)
            }}} 
            className="canvas" 
            ref={this.canvasRef}
            onContextMenu = {(e)=>{
                e.preventDefault()
            }}>
            </div>
            
            <div className="node-container">
                {this.state.items}
            </div>
            <div className="arrow-container">
                {this.state.arrows.map((arrow)=>arrow.component)}
            </div>
            <div className='drawer-container'>
                <Drawer drawer = {this.props.drawer} drawerHandler = {this.props.drawerHandler} bundle = {this.state.bundle} algo = {this.props.algo}/>
            </div>
        </div>
    )
 }
}   
export default Main
                