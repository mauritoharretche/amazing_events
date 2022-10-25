
const contenedor = document.getElementById("container");
const title = document.getElementById("title");// ID del titulo  
const inputSearch = document.getElementById("inputSearch")
const containerCheckbox = document.getElementById("checkbox_container")//


async function getJsonEvents(){
  try{
    var eventsApiJson = await fetch('https://mh-amazing.herokuapp.com/amazing')
    eventsApiJson = await eventsApiJson.json()
  }catch(error){
    console.log(error)
  }
  const date = eventsApiJson.date
  const card = eventsApiJson.events

  const homeCards = card.filter(() => title.text.includes("HOME"))

  const upcomingCards = card.filter(() => title.text.includes("Upcoming")).filter((card) => card.date > date)

  const pastCards = card.filter(() => title.text.includes("Past")).filter((card) => card.date < date)
  //
  let mergedCards = [...homeCards, ...upcomingCards, ...pastCards]
  mergedCards.forEach(createCard)
  const categories = card.reduce((allCategories, events) => Array.from(new Set([...allCategories, events.category])), [])
  
  categories.forEach(createCheck)

  let categoryCheck = document.querySelectorAll(".categoryCheck")
categoryCheck = Array.from(categoryCheck)
categoryCheck.forEach(checkBox => checkBox.addEventListener("click", checksCross))
inputSearch.addEventListener("input", checksCross)

function checksCross() {
  let filterCheck = checkEvents(mergedCards)
  let filteredSearch = filteringCardsForSearch(filterCheck, inputSearch.value)
  if (filteredSearch.length !== 0) {
    contenedor.innerHTML = ``  
  }
  filteredSearch.forEach(createCard)
}

function checkEvents(array) {
  let checkboxCheckeados = categoryCheck.filter(check => check.checked).map(checkCategory => checkCategory.value)
  if (checkboxCheckeados.length > 0) {
    let filteredCheckBox = array.filter(event => checkboxCheckeados.includes(event.category))
    return filteredCheckBox
  }
  return array 
}
}
getJsonEvents()


// filtering data & mapping







//filtering checkbox

function createCheck(arrayCategories) {
  containerCheckbox.innerHTML += `
  <div class="input-group-text bg-danger">
  <label class="m-2"><input class="form-check-input mt-0 categoryCheck" type="checkbox" value="${arrayCategories}" id="${arrayCategories}" aria-label="Checkbox for following text input">
        ${arrayCategories}</label>
      </div>`
}

function filteringCardsForSearch(array, textoDeBusqueda) {
  let cardsFiltradasPorBusqueda = array.filter(event => event.name.toLowerCase().includes(textoDeBusqueda.toLowerCase()));
  if (cardsFiltradasPorBusqueda.length === 0) {
    searchNull()
    return [] 
  }
  return cardsFiltradasPorBusqueda
}

function searchNull() {
  contenedor.innerHTML = `
  <article class="container-fluid d-flex justify-content-center align-items-center row col-12">
    <h1 class="text-center text-white">Lo sentimos, busqueda invalida</h1>
  </article>
  `;
}
//create cards
function createCard(array) {
  contenedor.innerHTML += `
  <div class="card" style="width: 18rem;">
  <img src="${array.image}" class="card-img-top mx-auto p-3 shadow p-3 mb-3 bg-body rounded"
  style="width: 270px;" alt="music">
  <div class="card-body text-center">
  <h5 class="card-title">${array.name}</h5>
  <p class="card-text">${array.description}</p>
  </div>
  <div class="card-body d-flex justify-content-around ">
  <span href="#" class="card-link">Price $${array.price}</span>
  <a href="../../pages/details.html?id=${array.id}" class="btn btn-danger">View more</a>
  </div>
  </div>
  `;
}

