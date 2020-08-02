(function(){

     // function to find the id appended to the url.
     function getIdFromUrl() {
         let url = location.search;
        return url.substring(url.indexOf("=") + 1);
    }


    // make a api call for the recipe using the id
    async function searchRecipeById(id) {

        const data = await fetch('http://starlord.hackerearth.com/recipe');
        const recipes = await data.json();

        recipes.forEach(recipe=>{
            if(recipe.id == id) {
                renderRecipe(recipe);
            }
        });
        
    }

    // render the recipe details to the dom
    function renderRecipe(recipe) {

        document.querySelector('#recipe-price').innerText += recipe.price;
        document.querySelector('#recipe-img').src = recipe.image;
        document.querySelector('#recipe-name').innerText = recipe.name;
        document.querySelector('#recipe-description').innerText = recipe.description;
        if(recipe.category)
        document.querySelector('#recipe-catagory').innerText = recipe.category;
    }


    function initialize() {
        searchRecipeById(getIdFromUrl());
    }   



    // flow starts from here
    initialize();

})();