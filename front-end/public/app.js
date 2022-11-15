const ENV = "production";                                  //Changes Env Variable to production
// const ENV = "dev"; //Changes Env Variable to dev
let ApiUrl =
ENV == "dev"
? "http://localhost:5001"
: "https://jream-garage-api.onrender.com"; //ENV == "dev" ? localhost(TRUE) : render URL(FALSE)
startPage();

function startPage() {
  fetch(`${ApiUrl}/api/cars`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((car) => {
        let carSideContainer = document.createElement("div");
        carSideContainer.className = "carCont";

        let carSideEntry = document.createElement("p");
        carSideEntry.className = "carEntry";
        carSideEntry.innerText = `${car.make} ${car.model}`;

        let carSidePic = document.createElement("img");
        carSidePic.className = "carPictures";
        carSidePic.src = "/pic-assets/unavail.jpg";

        let sideBar = document.querySelector(".sidebar-cont");
        sideBar.appendChild(carSideContainer);
        carSideContainer.appendChild(carSidePic);
        carSideContainer.appendChild(carSideEntry);
      });
    });
}

function carQuery(){
    console.log("working");
    let inputField = document.getElementById('query').value;
    fetch(`${ApiUrl}/api/cars/${inputField}`)
    .then(res => res.json())
    .then(result => {
        createEntries(result);
    })
}

function createEntries(result){

    let currentEntries = document.querySelector(".sidebar-cont");
    clearSidebar(currentEntries);

    result.forEach((car) => {
        let carSideContainer = document.createElement("div");
        carSideContainer.className = "carCont";

        let carSideEntry = document.createElement("p");
        carSideEntry.className = "carEntry";
        carSideEntry.innerText = `${car.make} ${car.model}`;

        let carSidePic = document.createElement("img");
        carSidePic.className = "carPictures";
        carSidePic.src = "/pic-assets/unavail.jpg";

        let sideBar = document.querySelector(".sidebar-cont");
        sideBar.appendChild(carSideContainer);
        carSideContainer.appendChild(carSidePic);
        carSideContainer.appendChild(carSideEntry);
    })
}

function clearSidebar(parentNode){

    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild)
    }
}