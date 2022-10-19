// location, puedo acceder a las priedades de la url del document puedo acceder desde consola
//quiero darle un ID
//quiero obtener el contenedor

const containerDetails = document.getElementById("container_details");


let eventsFull = events.events

//obtengo el Id del location
let locationId = location.search.slice(4)

//filtrado del array events y poder devolver un evento con la coincidencia del id de location
let eventFiltered =  eventsFull.filter(event => locationId == event._id)
eventFiltered = eventFiltered[0]

//voy a llamar a la function
cardsDetails(eventFiltered)




//creacion de la funcion para las cards

function cardsDetails(event) {
  containerDetails.innerHTML = `<div class="card mb-3 size_card_detail justify-content-center align-items-center d-flex flex-wrap bg-danger" style="max-width: 900px; ;">
    <div class="row g-2">
      <div class="col-md-4">
        <img src="${event.image}" class="img-fluid rounded-start ms-3 border border-dark rounded-end" alt="feria_comidas">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title fs-3 fw-bold">${event.name}</h5>
          <p class="card-text ">${event.description}</p>
        </div>
      </div>
    </div>
  </div>`;
}
