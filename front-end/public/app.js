const ENV = "production";                                  //Changes Env Variable to production
// const ENV = "dev"; //Changes Env Variable to dev
let ApiUrl =
ENV == "dev"
? "http://localhost:5001"
: "https://jream-garage-api.onrender.com"; //ENV == "dev" ? localhost(TRUE) : render URL(FALSE)
startPage();


// ===== HOME PAGE LOAD ENTRIES =====
function startPage() {
  fetch(`${ApiUrl}/api/cars`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((car) => {
        let carSideContainer = document.createElement("div");
        carSideContainer.className = "carCont";
        carSideContainer.onclick = () => {mainDetail(car.id) };

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
// ===== SEARCH BAR  => createEntries()=====
function carQuery(){
    let inputField = document.getElementById('query').value;
    fetch(`${ApiUrl}/api/cars/${inputField}`)
    .then(res => res.json())
    .then(result => {
        createEntries(result);
    })
}
// ===== CREATE ENTRIES =====
function createEntries(result){

    let currentEntries = document.querySelector(".sidebar-cont");
    clearSidebar(currentEntries);

    result.forEach((car) => {
        let carSideContainer = document.createElement("div");
        carSideContainer.className = "carCont";
        carSideContainer.onclick = `mainDetail(${car.make})`;
        carSideContainer.onclick = () => {mainDetail(car.id) };

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
// ===== GRAB CAR DETAILS FROM SIDE BAR =====
function mainDetail(car){
    let id = car;
     fetch(`${ApiUrl}/api/cars/${id}`)
     .then(res => res.json())
     .then(data => {
        createDetailSection(data[0].color, data[0].make, data[0].model, data[0].type, data[0].year);
     })
}
function createDetailSection (f1, f2, f3, f4, f5){
    let info = document.querySelector('.displayDetailsCont');
    clearSidebar(info);
    
    let color = document.createElement('div');
        color.setAttribute("id", "color")
        color.innerText = `Color: ${f1}`;
    let make = document.createElement('div');
        make.innerText = `Make: ${f2}`;
    let model = document.createElement('div');
        model.innerText = `Model: ${f3}`;
    let type = document.createElement('div');
        type.innerText = `Type: ${f4}`;
    let year = document.createElement('div');
        year.innerText = `Year: ${f5}`;
    let carName = document.createElement('div');
        carName.innerText = `${f2} ${f3}`;
    

    info.append(color, make, model, type, year, carName);
}


// ===== CLEAR SIDE BAR SIMILAR TO .CLEAR() =====
function clearSidebar(parentNode){

    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild)
    }
}

// ===== USER UI BUTTON =====
function homeButton(){
    let sideBar = document.querySelector(".sidebar-cont");
    clearSidebar(sideBar);
    startPage();
}
function createButton(){
    let sideBar = document.querySelector(".sidebar-cont");
    clearSidebar(sideBar);
    fetch(`${ApiUrl}/api/cars/id`, {method : `POST`})

}
function deleteButton(){
    let sideBar = document.querySelector(".sidebar-cont");
    clearSidebar(sideBar);
    fetch(`${ApiUrl}/api/cars/id`, {method : `DELETE`})
}
