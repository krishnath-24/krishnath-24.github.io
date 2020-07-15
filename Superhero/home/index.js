(function(){

    // getting reference to the dom elements
    var searchElement = document.getElementsByClassName("search")[0];
    var access_token = '1218793861791825'; // token to access the superhero api
    var listGroup = document.getElementsByClassName("list-group")[0];
    var alert = document.getElementById("alert");
    var favourites = [];



    // function to make a request to api and fetch data using superhero name.
    async function searchSuperheroByName(name) {

        try{

            // making an api call.
            const superhero = await fetch(`https://superheroapi.com/api.php/${access_token}/search/${name}`);

            const data = await superhero.json();

            if(data.response === "success") {

                renderList(data.results); // render the list of superheros.
            }
            else renderList([]); // render empty list.


        } catch(err) {
            console.log(err);
            showAlert("error","Error fetching the data..!");
        }

    }


    // function to render the superhero list.
    function renderList(list) {

        // if the superhero list is not empty.
        if(list.length > 0) {

            listGroup.innerHTML = "";
            list.forEach(displaySuperhero);

        } 
    }

    // function to append a superhero to the list.
    function displaySuperhero(item, index) {

        let li = document.createElement('li');
        
        // html to display a superhero using card.
        li.innerHTML = `<div class="card m-2" style="width: 18rem;">
        <img src="${item.image.url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text"></p>
        <a href="#" target="_blank" id="details"  class=" btn btn-primary mt-1">View Details</a>
        <Button id="addFavourites" class="btn btn-danger mt-1">Add To Favourites</Button>
        </div>
    </div>`;


        // set the data-id attribute
        li.setAttribute('data-id',item.id);
        listGroup.appendChild(li);
    }


    // click handler for actions like getting details and adding to favourites.
    function clickHandler(event) {

        // When show details button is clicked.
        if(event.target.id === "details") {
            
            let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            window.document.location = "../superhero_details/details.html"+'?id='+id;
        }

        // When add to favourite button is clicked.
        if(event.target.id === "addFavourites") {

            let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            addToFavourites(id);
        }

        if(event.target.id === "submit") {
            let name = searchElement.value;
            if(name && name.length > 1) searchSuperheroByName(name);
    
            else showAlert("error","Name shoule be atleast two chars long!");
        }

    }


    // function to add a superhero to favourites using localstorage
    function addToFavourites(id) {
        
        // if the superhero is not a favourite already.
        if(favourites.indexOf(id) === -1) {
            favourites.push(id);
            showAlert("success","Superhero added to favourites..!");
            localStorage.setItem("favourites",JSON.stringify(favourites));
        }

        else {

            // show alert if the superhero is already a favourite.
            showAlert("error", "Superhero already favourite.");
        }
    }

    function showAlert(type, message) {

        // if the alert type is success.
        if(type === "success") {

            alert.classList.add("alert-success");
            alert.classList.remove("alert-danger")
        }

        // if the alert type is error
        if(type === "error") {
            alert.classList.remove("alert-success");
            alert.classList.add("alert-danger");
        }


        // display the alert.
        alert.innerText = message;
        alert.style.display="block";


        // hide the alert after 2.5s.
        setTimeout(() => {
            alert.style.display = "none";
        }, 1500);

    }


    // function to initialize the flow of the app.
    function initialize() {

        // adding listener on the search bar.
        searchElement.addEventListener('keyup', (e) => {
            
            let name = searchElement.value;

            if(event.keyCode == 13) {

                if(name && name.length > 1) searchSuperheroByName(name);
    
                else showAlert("error","Name shoule be atleast two chars long!");
            }
            else if(name && name.length > 1 ) searchSuperheroByName(name);

        });
    
        // adding click listener for different actions.
        document.addEventListener('click', (event) => {
            clickHandler(event);
        });
    }

    initialize();

})();