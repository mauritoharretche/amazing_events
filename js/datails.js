

const containerDetails = document.getElementById("container_details");


let eventsFull = events.events


let locationId = location.search.slice(4)


let eventFiltered =  eventsFull.filter(event => locationId == event._id)
eventFiltered = eventFiltered[0]


cardsDetails(eventFiltered)






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
