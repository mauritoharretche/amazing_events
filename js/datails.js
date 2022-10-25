

const containerDetails = document.getElementById("container_details");






async function apiGetEvents(){
  try{
    var apiGet = await (await fetch("https://mh-amazing.herokuapp.com/amazing")).json()
  }
  catch (error){ 
    console.log(error);
  }

  let eventsFull = apiGet.events


  let locationId = location.search.slice(4)


  let eventFiltered =  eventsFull.find(apiGet => apiGet.id == locationId)


cardsDetails(eventFiltered)

}
apiGetEvents()


function cardsDetails(event) {
  let difference = []
  if(event.assistance !== undefined){
    assistance =["Assintance", event.assistance ]
  }
  else{
    difference = ["Estimate" , event.estimate]
  }
  date= new Date(event.date).toDateString()
  containerDetails.innerHTML = `<div class="card mb-3 size_card_detail justify-content-center align-items-center d-flex flex-wrap bg-danger" style="max-width: 900px; ;">
    <div class="row g-2">
      <div class="col-md-4">
        <img src="${event.image}" class="img-fluid rounded-start ms-3 border border-dark rounded-end" alt="feria_comidas">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title fs-3 fw-bold">${event.name}</h2>
          <p class="card-text"><strong>Description: </strong>${event.description}</p>
          <p class="card-text "><strong>Category:</strong>${event.category}</p>
          <p class="card-text "><p><strong>Date: </strong>${date}</p>
          <p class="card-text "><strong>Place: </strong>${event.place}</p>
          <p class="card-text "><strong>Capacity: </strong>${event.capacity}</p>
          <p class="card-text "><strong>Price: </strong>${event.price}</p>
        </div>
      </div>
    </div>
  </div>`;
}
