import React from 'react'
import { render } from 'react-dom'
import "./Main.css"
import Node from './Node'
import Arrow from './Arrow'

const RADIUS = 20
class Main extends React.Component {

    constructor(){
        super()
        this.canvasRef = React.createRef()
    }

    state = { nodes: [{}] , items : [], edges : [{}], sel : 0, arrows: [{}]}

    removeEdge = (id)=>{
        var array = [...this.state.arrows]; // make a separate copy of the array
        var edgeList = [...this.state.edges];

        array[id] = {}
        delete edgeList[id]
        this.setState({arrows: array, edges: edgeList});

    }

    addWeight = (id,weight)=>{
        var edgeList = [...this.state.edges] // make a separate copy of the array
        
        edgeList[id].weight = parseInt(weight)

        this.setState({edges: edgeList});
        console.log(id,weight)
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
            console.log(id)
            this.setState({sel: id})
            this.flipNode(id,id)
        }
        else{
            if(this.props.mode==1){
                const from = this.state.nodes[this.state.sel]
                const to = this.state.nodes[id]

                this.flipNode(this.state.sel,0)
                this.setState({edges: [...this.state.edges,{from: this.state.sel, to: id, weight: 0, directed: true}], 
                                arrows: [...this.state.arrows,{ component: <Arrow
                                                                fromx = {from.x}
                                                                fromy = {from.y}
                                                                tox = {to.x}
                                                                toy = {to.y}
                                                                id = {this.state.edges.length}
                                                                removeEdge = {this.removeEdge}
                                                                addWeight = {this.addWeight}
                                                                directed = {true}/>,
                                                                id: this.state.edges.length
                                                            }
                                        ] , sel: 0})

            }
            else {
                const from = this.state.nodes[this.state.sel]
                const to = this.state.nodes[id]

                this.flipNode(this.state.sel,0)
                this.setState({edges: [...this.state.edges,{from: this.state.sel, to: id, weight: 0, directed: false}], 
                                arrows: [...this.state.arrows,{ component: <Arrow
                                                                fromx = {from.x}
                                                                fromy = {from.y}
                                                                tox = {to.x}
                                                                toy = {to.y}
                                                                id = {this.state.edges.length}
                                                                removeEdge = {this.removeEdge}
                                                                addWeight = {this.addWeight}
                                                                directed = {false}/>,
                                                                id: this.state.edges.length
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
                    />
                ]
            })

        }
    }


    render() {
        return (
        <div className = "main-container">
            <canvas
            width= "1700"
            height="600"
            onClick={(e)=> {
                if(this.props.mode==0){
                    this.createNode(e)
            }}} 
            className="canvas" 
            ref={this.canvasRef}
            onContextMenu = {(e)=>{
                e.preventDefault()
            }}>
            </canvas>
            
            <div className="node-container">
                {this.state.items}
            </div>
            <div className="arrow-container">
                {this.state.arrows.map((arrow)=>arrow.component)}
            </div>

        </div>  
    )
 }
}   
export default Main
                