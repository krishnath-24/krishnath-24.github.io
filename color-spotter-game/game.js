
function Board(el, size) {
    this.el = document.querySelector(el);
    this.size = size;
    this.score = 0;
    this.highScore = 0;
    this.bindEventListener();
    this.init();
}


Board.prototype.init = function(){

    
    this.el.innerText = '';
    let {color, oddColor} = getRandomColors();
    this.color = color;
    this.oddColor = oddColor;

    let n = this.size;

    let fragment = document.createDocumentFragment();

    for(let i = 1; i <= n; i++) {

        let row = document.createElement('div');
        row.className = 'row';

        for(let j = 1; j <= n; j++) {

            let cell = document.createElement('div');
            cell.id = i + "" + j;
            cell.className = 'cell';
            cell.style.backgroundColor = this.color;
            row.appendChild(cell);
        }
        fragment.appendChild(row);
    }
    this.el.appendChild(fragment);

    let i = Math.round(Math.ceil(Math.random() * n));
    let j = Math.round(Math.ceil(Math.random() * n));
    let randomCell = i+''+j;
    this.randomCell = randomCell;
    document.getElementById(this.randomCell+'').style.backgroundColor = this.oddColor;
    
}



Board.prototype.bindEventListener = function(){

    this.el.addEventListener('click',(event)=>{

        let clicked = parseInt(event.target.id);
        let actual = parseInt(this.randomCell);

        if(clicked == actual) {
          this.score++;
        if(this.score > this.highScore) {
            	this.highScore = this.score;
              this.displayHighScore();
            }
            this.size++;
            this.displayScore();
            this.init();
        }

        if(clicked != actual){
        		
            this.score = 0;
            this.size = 4;
            this.displayScore();
            this.el.classList.remove('shake');
            this.el.classList.add('shake');
            setTimeout(()=>{
              	this.init();
                this.el.classList.remove('shake');
            },800);
        }
    });
}


const getRandomColors = function(){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}


Board.prototype.displayScore = function() {
    document.querySelector('#score-span').innerText  = '';
    document.querySelector('#score-span').innerText  = this.score;
}


Board.prototype.displayHighScore = function() {
    document.querySelector('#high-score').innerText  = '';
    document.querySelector('#high-score').innerText  = this.highScore;
}





new Board("#board",4);