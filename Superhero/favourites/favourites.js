(function() {

    // commonly used variables
    var favourites = JSON.parse(localStorage.getItem("favourites"));
    var alert = document.getElementById("alert"); 
    var access_token = '1218793861791825'; // access token to fetch data from the api.
    var listGroup = document.getElementsByClassName("list-group")[0];
    

    //  Search a superhero using the id.
    async function searchSuperheroById(id,index) {

        try{

            // making the api call.
            const superhero = await fetch(`https://superheroapi.com/api.php/${access_token}/${id}`);
            const data = await superhero.json();
            renderSuperhero(data);

        }
        catch(err) {
            console.log(err); // logging the error.
            showAlert("error","Error While Fetching the data..!");
        }

    }


    // function to render a single superhero.
    function renderSuperhero(item) {
        
        let li = document.createElement('li');
    
        li.innerHTML = `<div class="card m-2" >
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



    // function to render the favourites list.
    function renderFavourites() {

        if(favourites.length > 0) { //  if favourites list contains superheros

            // for each id in the superhero list, fetch its details and render it.
            favourites.forEach(searchSuperheroById);

        } else {

            // if the superhero list is empty.
            showAlert("error","No Favourites at the moment!"); 
        }
    }




 
    // function to show the alert.
    function showAlert(type, message) {

        if(type === "success") { // if alert is of success type.
    
            alert.classList.add("alert-success");
            alert.classList.remove("alert-danger")
        }
    

        // if the alert is of error type.
        else if(type === "error") {
            alert.classList.remove("alert-success");
            alert.classList.add("alert-danger");
        }
    
        alert.innerText = message;
        alert.style.display="block";
    
        setTimeout(() => {
            alert.style.display = "none";
        }, 2500);
    
    }


       // function to handle the delete superhero or show details action.
       function handleClickListener(event){

        if(event.target.id === "delete") {

            var id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
        
            favourites = favourites.filter((item) => item !== id);

            localStorage.setItem("favourites",JSON.stringify(favourites));

            let toDeleteSuperhero = document.querySelectorAll(`[data-id='${id}']`)[0];
            toDeleteSuperhero.remove();

            // show user that favourite was deleted successfully.
            showAlert("success","Favourite Deleted Successfully");

            // check if the list becomes empty, then show alert if it is.
            setTimeout(() => {
                if(favourites.length == 0) {
                    showAlert("error","No Favourites at the moment!");
                }
            }, 2500);
            
        }

        // if show details button is clicked then render the show details page.
        if(event.target.id === "details") {
        
            let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            window.document.location = "../superhero_details/details.html"+'?id='+id;
        }

    }



    // function to initialize the script.
    function initialize() {
        document.addEventListener('click',handleClickListener);
        renderFavourites();
    }
    
    initialize();

})();