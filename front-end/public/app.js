// const ENV = "production";                                  //Changes Env Variable to production
const ENV = "dev";                                           //Changes Env Variable to dev
let ApiUrl = ENV == "dev" ? "http://localhost:5001" : "https://jream-garage-api.onrender.com";  //ENV == "dev" ? localhost(TRUE) : render URL(FALSE)

function startPage(){
    
    fetch(`${ApiUrl}/api/cars`)
        .then(res => res.json())
        .then(data => {
            data.forEach(car => {
                let carSideContainer = document.createElement('div');
                    carSideContainer.className = "carCont";
    
                    let carSideEntry = document.createElement('p');
                        carSideEntry.className = "carEntry";
                        carSideEntry.innerText = `${car.make} ${car.model}`;
    
                    let carSidePic = document.createElement('img');
                    carSidePic.className = "carPictures";
                        carSidePic.src = "/pic-assets/unavail.jpg"; 
    
                let sideBar = document.querySelector('.sidebar-cont');
                sideBar.appendChild(carSideContainer);
                carSideContainer.appendChild(carSidePic);
                carSideContainer.appendChild(carSideEntry);
    
            });
        });
}

    function carQuery(){
        let search = document.getElementById('query').value;
        console.log(search)
        fetch(`${ApiUrl}/api/cars/:${search}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);



            });
        carDataLoad();
    }

    startPage();