(function() {

    var favourites = JSON.parse(localStorage.getItem("favourites"));
    
    var access_token = '1218793861791825';
    var listGroup = document.getElementsByClassName("list-group")[0];
    

    async function searchSuperheroById(id,index) {

        try{

            const superhero = await fetch(`https://superheroapi.com/api.php/${access_token}/${id}`);
            const data = await superhero.json();

            console.log(data);
            renderSuperhero(data);

        }
        catch(err) {
            console.log(err);
        }

    }


    function renderSuperhero(item) {
        
        let li = document.createElement('li');
    
        li.innerHTML = `<div class="card m-2" style="width: 18rem;">
        <img src="${item.image.url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text"></p>
        <a href="#" id="details"  class=" btn btn-primary mt-1">View Details</a>
        <a href="#" id="delete" class="btn btn-danger mt-1">Delete</a>
        </div>
    </div>`;


        li.setAttribute('data-id',item.id);
        listGroup.appendChild(li);
    }



    function renderFavourites() {

        if(favourites.length > 0) {

            favourites.forEach(searchSuperheroById);

        } else {

            let li = document.createElement('li');
            li.innerHTML = `<strong>No Favourites are there...!</strong>`;
            listGroup.innerHTML = "";
            listGroup.appendChild(li);
        }
    }



    function handleClickListener(event){

        if(event.target.id === "delete") {
            var id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
        
            favourites = favourites.filter((item) => item !== id);

            localStorage.setItem("favourites",JSON.stringify(favourites));

            let toDeleteSuperhero = document.querySelectorAll(`[data-id='${id}']`)[0];
            toDeleteSuperhero.remove();

        }

    }






    function init() {
        document.addEventListener('click',handleClickListener);
        renderFavourites();
    }
    

    init();

})();