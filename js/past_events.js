const contenedor = document.getElementById("container")

function createCard(element, array){
    for(let event of array.events){
        if (event.date < array.currentDate){
            element.innerHTML += 
            `
            <div class="card" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top mx-auto p-3 shadow p-3 mb-3 bg-body rounded"
              style="width: 270px;" alt="music">
            <div class="card-body text-center">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              </div>
                <div class="card-body d-flex justify-content-around ">
              <span href="#" class="card-link">Price $${event.price}</span>
              <a href="./pages/details.html" class="btn btn-danger">View more</a>
            </div>
          </div>
            `
        }
    }

}

createCard(contenedor, events)