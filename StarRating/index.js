
function Star(el,count,callback) {

    this.el = document.getElementById(el);
    this.count = count;
    this.rating = 0;
    this.init();
    this.callback = callback;
    this.bindEventListeners();
}


Star.prototype.init = function() {

    let fragment = document.createDocumentFragment();

    for(let i = 1; i <= this.count; i++) {
        let star = document.createElement('i');
        star.className = 'fa fa-star-o';
        star.dataset.val = i;
        fragment.appendChild(star);
    }
    this.el.appendChild(fragment);
}

Star.prototype.bindEventListeners = function() {
    
    this.el.addEventListener('mouseover',(event)=>{
        this.fillStars(event.target.dataset.val);
    });

    this.el.addEventListener('mouseleave',(event)=>{
        this.fillStars(this.rating);
    });

    this.el.addEventListener('click',(event)=>{
        this.rating = event.target.dataset.val;
        this.callback(this.rating);
    });
}


Star.prototype.fillStars = function(value) {

    var stars = this.el.children;

    for(let i = 0; i < value; i++) {
        stars[i].classList.add('fa-star');
        stars[i].classList.remove('fa-star-o');
    }

    for(let i = value; i < stars.length; i++) {
        stars[i].classList.remove('fa-star');
        stars[i].classList.add('fa-star-o');
    }
}


function getStar(value) {
    document.getElementById("span").innerText = value;
}
new Star("container",5,getStar);