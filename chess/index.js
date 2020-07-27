function Board(el,n) {

    this.el = document.querySelector(el);
    this.size = n;
    this.init();
    this.bindEventListener();
}


Board.prototype.init = function() {

    let fragment = document.createDocumentFragment();
    var white = true;

    for(let i = 1; i <= this.size; i++) {

        let row = document.createElement('div');
        row.className = 'row';

        for(let j = 1; j <= this.size; j++) {

            let cell = document.createElement('div');
            cell.className = 'cell';
            
            if(white) {
                cell.style.backgroundColor = 'white';
                cell.dataset.color = 'white';
            }
            else {
                cell.style.backgroundColor = 'black';
                cell.dataset.color = 'black';
            }

            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = i+''+j;
            row.appendChild(cell);
            white = !white;
        }
        fragment.appendChild(row);
        white = !white;
    }

    this.el.appendChild(fragment);
}

Board.prototype.bindEventListener = function() {

    document.addEventListener('click',(event)=>{
        this.reset();
        if(event.target.dataset.row) this.highlightDiagonals(event);
    });
}



Board.prototype.highlightDiagonals = function(event){

    let row = event.target.dataset.row;
    let col = event.target.dataset.col;
    let r = row, c = col;
    while(r >= 1 && c >= 1) {
        document.getElementById(`${r}${c}`).style.backgroundColor = 'red';
        r--;
        c--;
    }
    r = row;
    c = col;
    
    while(r <= this.size && c <= this.size) {
        document.getElementById(`${r}${c}`).style.backgroundColor = 'red';
        r++;
        c++;
    }

    r = row;
    c = col;

    while(r <= this.size && c >= 1){
        document.getElementById(`${r}${c}`).style.backgroundColor = 'red';
        r++;
        c--;
    }

    r = row;
    c = col;

    while(r >= 1 && c <= this.size){
        document.getElementById(`${r}${c}`).style.backgroundColor = 'red';
        r--;
        c++;
    }
 
}

Board.prototype.reset = function(event) {

    let cells = document.querySelectorAll('div');
    
    cells.forEach(element => {
        element.style.backgroundColor = element.dataset.color;
    });

}


new Board("#board",10);