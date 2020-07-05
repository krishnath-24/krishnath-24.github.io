(function() {

    //frequesntly used variables
    let url = location.search;
    var access_token = '1218793861791825';



    function findId() {

        for(let i = url.length - 1; i >= 0; i--) {
            if(url.charAt(i) == "=") {
                return url.substring(i+1);
            }
        }
    }


    async function searchSuperheroById(id)  {

        try{
            const superhero = await fetch(`https://superheroapi.com/api.php/${access_token}/${id}`);1
            const data = await superhero.json();


            if(data.response === "success") {
                renderSuperhero(data);
                renderPowerStats(data.powerstats);
                renderBio(data.biography);

            } else renderSuperhero([{name:'No Details found...!'}]);

        } catch(err) {
            console.log(err);
        }
    }


    function renderSuperhero(data) {
        
        let container = document.getElementById('container');

        let superhero = document.createElement('span');
        console.log(superhero);


        superhero.innerHTML = `<div class="card mb-3">
        <img src="${data.image.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.connections["group-affiliation"]}</p>
          <a href="../home/index.html" class="btn btn-primary">Go Back</a>
        </div>
      </div>`;


      container.innerHTML = "";
      container.appendChild(superhero);

    }

    function renderPowerStats(powerstats) {

        let listGroup = document.getElementsByClassName('powerstats')[0];

        let li = document.createElement('li');

        li.innerHTML= `<span><strong>Powerstats</strong></span>`;
        li.className = "list-group-item";
        li.style.fontSize = "25px";
        listGroup.appendChild(li);

        for(let [key,value] of Object.entries(powerstats)) {

            li = document.createElement('li');
            li.innerHTML = `<span><strong>${key}</strong> : ${value}</span>`;
            li.className = "list-group-item";

            listGroup.appendChild(li);
        }

    }

    function renderBio(biography) {

        let listGroup = document.getElementsByClassName('biography')[0];
        let li = document.createElement('li');

        li.innerHTML= `<span><strong>Biography</strong></span>`;
        li.className = "list-group-item";
        li.style.fontSize = "25px";
        listGroup.appendChild(li);


        for(let [key,value] of Object.entries(biography)) {

            li = document.createElement('li');
            li.innerHTML = `<span><strong>${key}</strong> : ${value}</span>`;
            li.className = "list-group-item";

            listGroup.appendChild(li);
        }

    }




    function init() {
        searchSuperheroById(findId());
    }

    init();

})();