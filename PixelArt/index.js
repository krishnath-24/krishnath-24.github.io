let board;
function Board(el, row, col) {

    board = this; 
    this.el = document.querySelector(el);
    this.row = row;
    this.col = col;
    this.color = 'blue';
    this.moved = false;
    this.init();
    this.bindEventListeners();
}

Board.prototype.init = function() {

    let fragment = document.createDocumentFragment();
    for(let i = 1; i <= this.row; i++) {
        
        let row = document.createElement('div');
        row.className = 'mrow';

        for(let j = 1; j <= this.col; j++) {

            let cell = document.createElement('span')
            cell.className = 'cell';

            if(i == this.row) {
                cell.classList.add('color-cell');
                cell.style.backgroundColor = getRandomColor();
            }
            cell.dataset.id = i +''+j;
            row.appendChild(cell);
        }
        fragment.appendChild(row);
    }
    this.el.appendChild(fragment);
}


Board.prototype.bindEventListeners = function(){

    this.el.addEventListener('mousedown',(event)=>{
        this.fillColor(event);
        this.moved = true;
    });

    this.el.addEventListener('mousemove',(event)=>{
        if(this.moved)  this.fillColor(event);

    });
    this.el.addEventListener('mouseup',(event)=>{
        this.moved = false;
    })
}

Board.prototype.fillColor = function(event) {
        
        let cell = event.target.classList.contains('cell');

        if(cell && event.target.classList.contains('color-cell')) {
            this.color = event.target.style.backgroundColor;
        }
        if(cell && !event.target.classList.contains('color-cell')) {
            event.target.style.backgroundColor = this.color;
        }
}

Board.prototype.reset = function(event) {

    let cells = this.el.querySelectorAll('span');
    
    cells.forEach(  element => {
        if(!element.classList.contains('color-cell')){
            element.style.backgroundColor = 'white';
        }
    });

}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

new Board("#board",10,10);


document.getElementById("reset").addEventListener('click',(event)=>{
    board.reset();
})


