(function(){

    


    var recipeContainer = document.querySelector('#recipe-container');

    function initialize() {

        recipeContainer.addEventListener('click',(event)=>{
            event.preventDefault();
            
            if(event.target.className.includes('btn')) {

                window.open("./details.html"+'?id='+event.target.id,"_blank");
            }
        });
    }

    initialize();



})();