//const generales para obtener elementos
const contenedor = document.getElementById("container");
const title = document.getElementById("title");// ID del titulo para reutilizarlo en funciones siguientes
const inputSearch = document.getElementById("inputSearch")
const containerCheckbox = document.getElementById("checkbox_container")//contenedor para los checkbox, los traigo por ID. 

// filtering data & mapping
const date = events.currentDate//eventos traidos del data.js
const card = [...events.events].map(createCard => createCard)
const homeCards = card.filter(() => title.text.includes("HOME"))//si el titulo de la pag tiene HOME, me va a mostrar todas las cards
const upcomingCards = card.filter(() => title.text.includes("Upcoming")).filter((card) => card.date > date)//filtro igual que arriba, pero ademas la fecha va a ser mayor que el date, comparada con el current
const pastCards = card.filter(() => title.text.includes("Past")).filter((card) => card.date < date)
//
let mergedCards = [...homeCards, ...upcomingCards, ...pastCards]//creo un array(todas las cards, los eventos "elementos" de ese array) con las const ya filtradas, me ahorro el codigo de cada pagina
mergedCards.forEach(createCard)//recorro el array y creo las cards

//filtering checkbox
const categories = card.reduce((allCategories, events) => Array.from(new Set([...allCategories, events.category])), [])//guardo las categorias, recorro el array que tiene los eventos, en el array vacio con reduce voy a pasar los eventos a un array (con newSet hago que no se repitan las categorias), donde la primer vuelta va a estar vacio ese []
//la segunda vuelta ya lo voy a dejar llenandose [] event.food fair allcategories = ["food fair" , "cinema"]
//para poder utilizar los metodos de array, llamo al Array.from, para poder aplicarle los metodos y poder seguir trabajando el code. con el newSET no se van a repetir

categories.forEach(createCheck)//aca los llamo para 

//create function checkbox
function createCheck(arrayCategories) {//creo uno por uno los checkbox, a partir de este parámetro
  containerCheckbox.innerHTML += `
  <div class="input-group-text bg-danger">
  <label class="m-2"><input class="form-check-input mt-0 categoryCheck" type="checkbox" value="${arrayCategories}" id="${arrayCategories}" aria-label="Checkbox for following text input">
        ${arrayCategories}</label>
      </div>`
}

//aca obtengo la data del checkbox, la search data y el filtro
let categoryCheck = document.querySelectorAll(".categoryCheck")//node lists//voy o obtener los selectores de todos los checkB (clases)
categoryCheck = Array.from(categoryCheck)//siendo nodo solo le puedo aplicar forEach// convierto de nodelist a arry con array.from 
categoryCheck.forEach(checkBox => checkBox.addEventListener("click", checks))//a este array le aplique forEach(primero accion, despues la funcion) a cada check le agrego un escuchador, y va a ejecutar la funcion, tanto cuando seleciono o desselecciono
inputSearch.addEventListener("input", checks)//cada vez que ingrese "algo"va a ir a parar a checks

function checks() {
  let filterCheck = checkEvents(mergedCards)//primero filtro por las categorias(mergedCards array)
  let filteredSearch = filteringCardsForSearch(filterCheck, inputSearch.value)//value me esta devolviendo lo mismo que escribe el usuario y lo guardo en value
  if (filteredSearch.length !== 0) {//si es igual a cero no me lo vacia
    contenedor.innerHTML = `` //necesito vaciarlo para rellenarlo luego 
  }//si se cumple, paso al forEach
  filteredSearch.forEach(createCard)
}

function checkEvents(array) {
  let checkboxCheckeados = categoryCheck.filter(check => check.checked).map(checkCategory => checkCategory.value)//con el filtrado del query, los filtro por "checkeados"
  if (checkboxCheckeados.length > 0) {//si alguno checkeado es mayor a 0 va a imprimirlo "TRUE"
    let filteredCheckBox = array.filter(event => checkboxCheckeados.includes(event.category))//los mergedCards ya filtrados los vuelvo a filtrar, en los cuales va a ser por categoria
    return filteredCheckBox
  }
  return array //directamente me va a retornar mergedCards
}

function filteringCardsForSearch(array, textoDeBusqueda) {//el array se lo paso con argumento y el texto que se vaya escribiendo
  let cardsFiltradasPorBusqueda = array.filter(event => event.name.toLowerCase().includes(textoDeBusqueda.toLowerCase()));//cada evento de ese array, me filtra si lo que ingresa el usuario, en minuscula me va a tirar la card y sino, me va a llevar a searchNull
  if (cardsFiltradasPorBusqueda.length === 0) {
    searchNull() //funcion para mensaje de no coincidencia con busqueda
    return [] //me retorna el array vacio(lo necesito para llenarlo con el filtrado)
  }
  return cardsFiltradasPorBusqueda
}
//creo la funcion para el mensaje de contenido inexistente 
function searchNull() {
  contenedor.innerHTML = `
  <article class="container-fluid d-flex justify-content-center align-items-center row col-12">
    <h1 class="text-center text-white">Lo sentimos, busqueda invalida</h1>
  </article>
  `;
}


//aca declaro la funcion para la creacion de las cards//use como nombre de iteracion array
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
  <a href="../pages/details.html?id=${array._id}" class="btn btn-danger">View more</a>
  </div>
  </div>
  `;
}

