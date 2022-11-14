//const ENV = "production";                                  //Changes Env Variable to production
const ENV = "dev";                                           //Changes Env Variable to dev
let ApiUrl = ENV == "dev" ? "http://localhost:5001" : "##";  //ENV == "dev" ? localhost(TRUE) : render URL(FALSE)

fetch(`${ApiUrl}/api/cars`)
    .then(res => res.json())
    .then(data => {
        data.forEach(car => {
            console.log(data)
            var carElement = document.createElement('li');
            carElement.className = "carEntry";
            carElement.innerHTML = `${car.make} ${car.model}`;
            // console.log(studentElement);
            let sideBar = document.querySelector('.sidebar-cont')
            sideBar.appendChild(carElement);
        });
    });