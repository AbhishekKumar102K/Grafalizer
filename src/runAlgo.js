import { render } from 'react-dom'
import Node from './Node'
import Arrow from './Arrow'
import PriorityQueue from './PriorityQueue'

class Queue {
    items = []
    push = (item) => this.items.push(item)
    front = () => this.items[0]
    pop = () => this.items.shift()
    empty = () => this.items.length === 0
    size = () => this.items.length
}

const INF = 100000000000

export const runAlgo = async (algo, adj, items, nodes, selectNode, renderMain, drawerHandler, bundle, progressBundle, removeNode) => {
    const sleep = delay=> new Promise ((resolve)=> setTimeout(resolve,delay))
    var edges = progressBundle.edges, arrows = progressBundle.arrows, removeEdge = progressBundle.removeEdge, addWeight = progressBundle.addWeight

    const resetColor = () => {
        for(var i = 1;i<=items.length; i++){
            if(items[i-1]!==undefined){
                items[i-1] = <Node
                x = {nodes[i].x}
                y = {nodes[i].y}
                id = {nodes[i].id}
                selectNode = {selectNode}
                sel = {0}
                removeNode = {removeNode}
            />
            }
        }   
        renderMain()
    }

    const resetEdges = async () => {
        for(var i = 1;i<=edges.length; i++){
            if(edges[i]===undefined)
                continue
            arrows[i] = { component: <Arrow
                fromx = {nodes[edges[i].from].x}
                fromy = {nodes[edges[i].from].y}
                tox = {nodes[edges[i].to].x}
                toy = {nodes[edges[i].to].y}
                id = {i}
                removeEdge = {removeEdge}
                addWeight = {addWeight}
                directed = {edges[i].directed}
                progress = {'100%'}
                progressColor = {'#ffffff'}/>,
                id: i
            } 
        }
        renderMain()
    }


    const highlightEdge = async (fromId, toId, doneStart, doneEnd, progressColor) => {

        for(var i = 0; i < edges.length; i++){
            if(edges[i]===undefined)
                continue

            var edge = edges[i]
            if(edge.from === fromId && edge.to === toId){
                // console.log('Abeyyy ooo',doneStart,doneEnd)
                for(var done = doneStart; done<=doneEnd; done += (doneStart<=doneEnd)?1:-1){
                    arrows[i] = { component: <Arrow
                        fromx = {nodes[fromId].x}
                        fromy = {nodes[fromId].y}
                        tox = {nodes[toId].x}
                        toy = {nodes[toId].y}
                        id = {i}
                        removeEdge = {removeEdge}
                        addWeight = {addWeight}
                        directed = {edge.directed}
                        progress = {done + '%'}
                        progressColor = {progressColor}/>,
                        id: i
                    }    
                    await sleep(5)
                    renderMain()
                }
                break
            }
            if(!edge.directed && edge.from === toId && edge.to === fromId){
                for(var done = doneStart; done<=doneEnd; done += (doneStart<=doneEnd)?1:-1){
                    arrows[i] = { component: <Arrow
                        fromx = {nodes[fromId].x}
                        fromy = {nodes[fromId].y}
                        tox = {nodes[toId].x}
                        toy = {nodes[toId].y}
                        id = {i}
                        removeEdge = {removeEdge}
                        addWeight = {addWeight}
                        directed = {edge.directed}
                        progress = {done + '%'}
                        progressColor = {progressColor}/>,
                        id: i
                    }    
                    await sleep(5)
                    renderMain()
                }
                break
            } 
        }
    }

    const dfs = async (u,vis) => {
        bundle.push(u)
        vis[u] = true
        if(items[u-1]===undefined)
            return 

        items[u-1] = <Node
                x = {nodes[u].x}
                y = {nodes[u].y}
                id = {nodes[u].id}
                selectNode = {selectNode}
                sel = {nodes[u].id}
                removeNode = {removeNode}
                />
        renderMain()
        await sleep(500)

        if(adj[u]===undefined){
            adj[u] = []
        }
        
        for(var i=0; i<adj[u].length;i++){
            var node = adj[u][i];
            if(!vis[node.to]){
                await dfs(node.to,vis)
            }   
        }
        items[u-1] = <Node
                x = {nodes[u].x}
                y = {nodes[u].y}
                id = {nodes[u].id}
                selectNode = {selectNode}
                sel = {1000+nodes[u].id}
                removeNode = {removeNode}
                />

        renderMain()
        await sleep(500)
    }
    

    const bfs = async (u,vis) => {
        const q = new Queue
        q.push(u)
        vis[u] = true

        if(items[u-1]===undefined)
            return 

        while(!q.empty()){
            var at = q.front()
            bundle.push(at)
            // console.log(at)
            q.pop()
            items[at-1] = <Node
                x = {nodes[at].x}
                y = {nodes[at].y}
                id = {nodes[at].id}
                selectNode = {selectNode}
                sel = {nodes[at].id}
                removeNode = {removeNode}
            />

            renderMain()
            await sleep(500)

            if(adj[at]===undefined){
                adj[at] = []
            }
            
            for(var i=0; i<adj[at].length;i++){
                var node = adj[at][i];
                if(!vis[node.to]){
                    vis[node.to] = true
                    q.push(node.to)
                }   
            }
        }   
    }

    const dijkstra = async () => {
        let pq = new PriorityQueue()
        await sleep(500)
        dist[0] = 0

        pq.insert(1,0)
        dist[1] = 0

        for(var i=1;i<nodes.length;i++){
            bundle.push({node: i, dist: INF})
        }
        bundle[0] = {node: 1, dist: 0}
        renderMain()
        while(!pq.empty()){
            var at = pq.front().element
            pq.pop_front()
            bundle[at-1] = {node: at, dist: dist[at]}

            if(items[at-1]===undefined)
                continue 

            items[at-1] = <Node
                x = {nodes[at].x}
                y = {nodes[at].y}
                id = {nodes[at].id}
                selectNode = {selectNode}
                sel = {1000+nodes[at].id}
                removeNode = {removeNode}
            />

            renderMain()
            await sleep(500)

            if(adj[at]===undefined)
                adj[at] = []

            for(var i = 0; i<adj[at].length; i++){
                var edge = adj[at][i]
                var to = edge.to, w = edge.w
                if(dist[at]+w < dist[to]){

                    if(p[to]!==-1){
                        await highlightEdge(p[to],to,100,100,'#ffffff')
                        await sleep(1000)
                    }
                    console.log(at,to)
                    await highlightEdge(at,to,0,100,'#ffff00')
                    // await sleep(10)
                    pq.remove(to,dist[to])
                    dist[to] = dist[at] + w
                    p[to] = at
                    pq.insert(to,dist[to])
                    bundle[to-1] = {node: to, dist: dist[to]}
                    
                    await highlightEdge(at,to,100,100,'#90ee90')
                }
            }
            await sleep(500)
            renderMain()
            await sleep(1000)
            renderMain()
        }
        
    }
    


    var vis = new Array(nodes.length).fill(false)
    var dist = new Array(nodes.length).fill(INF)
    var p = new Array(nodes.length).fill(-1)

    if(algo == 'DFS'){
        drawerHandler(true)
        for(var i = 1; i<nodes.length; i++){
            if(!vis[i])
                await dfs(i,vis)
        }
        resetColor()
    }   
    else if(algo == 'BFS'){
        drawerHandler(true)
        for(var i = 1; i<nodes.length; i++){
            if(!vis[i])
                await bfs(i,vis)
        }
        resetColor()
    }
    else if(algo == 'Dijkstra'){
        resetColor()
        resetEdges()
        await drawerHandler(true)
        dijkstra()
    }
}