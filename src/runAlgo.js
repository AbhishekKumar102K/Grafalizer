import Node from './Node'

class Queue {
    items = []
    push = (item) => this.items.push(item)
    front = () => this.items[0]
    pop = () => this.items.shift()
    empty = () => this.items.length === 0
    size = () => this.items.length
}

export const runAlgo = async (algo, adj, items, nodes, selectNode, renderMain) => {
    const sleep = delay=> new Promise ((resolve)=> setTimeout(resolve,delay))

    const dfs = async (u,vis) => {
        vis[u] = true
        items[u-1] = <Node
                x = {nodes[u].x}
                y = {nodes[u].y}
                id = {nodes[u].id}
                selectNode = {selectNode}
                sel = {nodes[u].id}
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
                sel = {0}
                />
        renderMain()
        await sleep(500)
    }
    

    const bfs = async (u,vis) => {

        const q = new Queue
        q.push(u)
        vis[u] = true

        while(!q.empty()){
            var at = q.front()
            console.log(at)
            q.pop()
            items[at-1] = <Node
                x = {nodes[at].x}
                y = {nodes[at].y}
                id = {nodes[at].id}
                selectNode = {selectNode}
                sel = {nodes[at].id}
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

        for(var i = 1;i<=items.length; i++){
            items[i-1] = <Node
            x = {nodes[i].x}
            y = {nodes[i].y}
            id = {nodes[i].id}
            selectNode = {selectNode}
            sel = {0}
        />
        }
        renderMain()
    }

    
    var vis = new Array(nodes.length).fill(false)

    if(algo == 'DFS'){
        for(var i = 1; i<nodes.length; i++){
            if(!vis[i])
                await dfs(i,vis)
        }
    }   
    else if(algo == 'BFS'){
        for(var i = 1; i<nodes.length; i++){
            if(!vis[i])
                await bfs(i,vis)
        }
    }

}