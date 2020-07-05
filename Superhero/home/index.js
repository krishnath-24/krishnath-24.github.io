(function(){

// getting reference to the dom elements
    var searchElement = document.getElementsByClassName("search")[0];
    var access_token = '1218793861791825'; // token to access the superhero api
    var listGroup = document.getElementsByClassName("list-group")[0];
    var alert = document.getElementById("alert");
    var favourites = [];



    async function searchSuperheroByName(name) {

        try{

            const superhero = await fetch(`https://superheroapi.com/api.php/${access_token}/search/${name}`);

            const data = await superhero.json();

            if(data.response === "success") {

                renderList(data.results);
            }
            else renderList([]);


        } catch(err) {
            console.log(err);
        }

    }


    function renderList(list) {

        if(list.length > 0) {

            listGroup.innerHTML = "";
            list.forEach(displaySuperhero);

        } else {

            var li = document.createElement('li');

            li.innerText = 'No superhero found';
            listGroup.innerHTML = "";
            listGroup.appendChild(li);
        }
    }

    function displaySuperhero(item, index) {

        let li = document.createElement('li');
        
        li.innerHTML = `<div class="card m-2" style="width: 18rem;">
        <img src="${item.image.url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text"></p>
        <a href="#" id="details"  class=" btn btn-primary mt-1">View Details</a>
        <Button id="addFavourites" class="btn btn-success mt-1">Add To Favourites</Button>
        </div>
    </div>`;


        li.setAttribute('data-id',item.id);
        listGroup.appendChild(li);
    }


    function handleClick(event) {

        if(event.target.id === "details") {
            
            let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            
            window.document.location = "../superhero_details/details.html"+'?id='+id;
        }

        if(event.target.id === "addFavourites") {

            let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            addToFavourites(id);
        }

        if(event.target.id === "details") {
            
            let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            
            window.document.location = "../superhero_details/details.html"+'?id='+id;
        }
    }

    function addToFavourites(id) {
        
        if(favourites.indexOf(id) === -1) {
            favourites.push(id);
            showNotification("success","Superhero added to favourites..!");
            localStorage.setItem("favourites",JSON.stringify(favourites));
        }

        else {
            showNotification("error", "Superhero already favourite.");
        }

    }

    function showNotification(type, message) {

        if(type === "success") {

            alert.classList.add("alert-success");
            alert.classList.remove("alert-danger")
        }

        if(type === "error") {
            alert.classList.remove("alert-success");
            alert.classList.add("alert-danger");
        }

        alert.innerText = message;
        alert.style.display="block";

        setTimeout(() => {
            alert.style.display = "none";
        }, 2500);

    }


    searchElement.addEventListener('keyup', (e) => {
        searchSuperheroByName(searchElement.value);
    });

    document.addEventListener('click', (event) => {
        handleClick(event);
    });



})();