(function(){

    // reference to the recipe container div
    var recipeContainer = document.querySelector('#recipe-container');


    // add the click listener to view the details page.
    function initialize() {

        recipeContainer.addEventListener('click',(event)=>{
            
            event.preventDefault();
            
            if(event.target.className.includes('btn')) {

                window.open("./details.html"+'?id='+event.target.id,"_blank");
            }
        });
    }


    // flow starts here
    initialize();



})();