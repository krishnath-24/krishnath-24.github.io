(function() {

    //frequently used variables
    let url = location.search;
    var access_token = '1218793861791825';



    // function to find the id appended to the url.
    function getIdFromUrl() {
        return url.substring(url.indexOf("=") + 1);
    }

    async function searchSuperheroById(id)  {

        try{
            // make an api call and fetch the data using the id.
            const superhero = await fetch(`https://superheroapi.com/api.php/${access_token}/${id}`);1
            const data = await superhero.json();


            // if the data response is success, render the superhero.
            if(data.response === "success") {
                renderSuperhero(data);
                renderPowerStats(data.powerstats);
                renderBio(data.biography);

            } else renderSuperhero([{name:'No Details found...!'}]);

        } catch(err) {
            console.log(err); // log the error
        }
    }


    // function to render the superhero data in a card.
    function renderSuperhero(data) {
        
        let container = document.getElementById('container');

        let superhero = document.createElement('span');

        superhero.innerHTML = `<div class="card mb-3">
        <img src="${data.image.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.connections["group-affiliation"]}</p>
          <a  href="../home/index.html" class="btn btn-primary">Home</a>
        </div>
      </div>`;


      container.innerHTML = "";
      container.appendChild(superhero);

    }

    // function to render the powerstats of the superhero.
    function renderPowerStats(powerstats) {

        let listGroup = document.getElementsByClassName('powerstats')[0];

        let li = document.createElement('li');

        li.innerHTML= `<span><strong>Powerstats</strong></span>`;
        li.className = "list-group-item";
        li.style.fontSize = "25px";
        listGroup.appendChild(li);

        // iterating over each entry of the powerstats and rendering it.
        for(let [key,value] of Object.entries(powerstats)) {

            li = document.createElement('li');
            li.innerHTML = `<span><strong>${key}</strong> : ${value}</span>`;
            li.className = "list-group-item";

            listGroup.appendChild(li);
        }

    }

    // function to render the biography of the superhero.
    function renderBio(biography) {

        let listGroup = document.getElementsByClassName('biography')[0];
        let li = document.createElement('li');

        li.innerHTML= `<span><strong>Biography</strong></span>`;
        li.className = "list-group-item";
        li.style.fontSize = "25px";
        listGroup.appendChild(li);

        // iterating over each attributes of the bio data and rendering it.
        for(let [key,value] of Object.entries(biography)) {

            li = document.createElement('li');
            li.innerHTML = `<span><strong>${key}</strong> : ${value}</span>`;
            li.className = "list-group-item";
            listGroup.appendChild(li);
        }

    }

    // function to initialize the script.
    function initialize() {
        searchSuperheroById(getIdFromUrl());
    }

    initialize();

})();