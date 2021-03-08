class Cell {
    constructor(element, priority){
        this.element = element
        this.priority = priority
    }
}

class PriorityQueue {
    constructor(){
        this.items = []
    }

    insert(element,priority){
        const cell = new Cell(element,priority)

        var i = 0;
        for(; i < this.items.length; i++){
            if(this.items[i].priority > cell.priority){
                break
            }
        }
        this.items.splice(i,0,cell)
    }

    remove(element,priority){
        for(var i=0;i<this.items.length;i++){
            if(this.items[i].priority === priority && this.items[i].element === element){
                this.items.splice(i,1)
                break
            }
        }
    }

    pop_front(){
        if(this.items.length){
            this.items.shift()
        }
    }

    front(){
        if(this.items.length)
            return this.items[0]
    }

    empty(){
        return this.items.length==0
    }

}

export default PriorityQueue