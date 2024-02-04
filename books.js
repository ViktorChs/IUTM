const print1 = document.querySelector(".content_books");
const buttonSearch = document.querySelector(".btn-search");
const valueSearch = document.querySelector("#search");
const category = document.querySelector("select");
const buttonsview = document.getElementById("#viewbookall")
const viewmenubook = document.querySelector(".nav_menu-view-book")
const newbooks = document.querySelector(".contenedor_books")

bookArchive.forEach((book) => {
  if (book.id <= 136) {
    const div = document.createElement("div");
    div.classList.add("newbooks");
    div.setAttribute("onclick", `viewBooknew(${book.id})`);
    div.innerHTML = `
    <div class="imgcontent" ><img  src=${book.img} alt=""></div>
    <div class="titlecontent" ><h3>${book.nombre}</h3></div>
    </div>
    `;
    newbooks.appendChild(div);
  }});


/* entrada principal de los libros */

// Obtener los checkboxes de los filtros
let checkboxesFormato = document.querySelectorAll("#checklist-items-formato input[type=checkbox]");
let checkboxesPNF = document.querySelectorAll("#checklist-items-pnf input[type=checkbox]");
let checkboxesMateria = document.querySelectorAll("#checklist-items-materia input[type=checkbox]");

// Función para obtener el valor de los checkboxes marcados
function obtenerValoresCheckboxes() {

  let valoresCheckboxFormato = Array.from(checkboxesFormato).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  let valoresCheckboxPNF = Array.from(checkboxesPNF).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  let valoresCheckboxMateria = Array.from(checkboxesMateria).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

  return {
    formato: valoresCheckboxFormato,
    pnf: valoresCheckboxPNF,
    materia: valoresCheckboxMateria,
  };
}

// Función para filtrar los libros según los valores de los checkboxes marcados

function filtrarLibros() {

  const valoresCheckboxes = obtenerValoresCheckboxes();

  const startIndex = (currentPage - 1) * booksPerPage; // índice del primer libro en la página actual
  const endIndex = startIndex + booksPerPage; // índice del último libro en la página actual
  let librosFiltrados = bookArchive.slice(startIndex, endIndex); // libros a renderizar

  if (valoresCheckboxes.formato.length > 0) {
    librosFiltrados = librosFiltrados.filter((libro) => valoresCheckboxes.formato.includes(libro.formato));
  }

  if (valoresCheckboxes.pnf.length > 0) {
    librosFiltrados = librosFiltrados.filter((libro) => valoresCheckboxes.pnf.includes(libro.pnf));
  }

  if (valoresCheckboxes.materia.length > 0) {
    librosFiltrados = librosFiltrados.filter((libro) => valoresCheckboxes.materia.includes(libro.materia));
  }
  return librosFiltrados;
}

// Función para renderizar los libros filtrados
function renderBooks() {
  const librosFiltrados = filtrarLibros();

  print1.innerHTML = ""; // limpiar el contenedor de libros
  librosFiltrados.forEach((book) => {
    const div = document.createElement("div");
    div.setAttribute("onclick", `viewBook(${book.id})`);
    div.classList.add("newbooks");
    div.innerHTML = `
      <div class="imgcontent"><img src="${book.img}" alt=""></div>
      <div class="titlecontent"><h3>${book.nombre}</h3></div>
    `;
    print1.appendChild(div);
    renderPagination()

  });
}

// Función para renderizar la barra de paginación
// Función para filtrar los libros según los valores de los checkboxes marcados
let currentPage = 1;
const booksPerPage = 136;
const totalPages = Math.ceil(bookArchive.length / booksPerPage);



// Función para renderizar la barra de paginación
function renderPagination(currentPage) {
  pagination.innerHTML = ""; // limpiar la barra de paginación
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      renderBooks(currentPage);
      renderPagination();
    });
    pagination.appendChild(button);
  }
}

// Agregar eventos a los checkboxes
checkboxesFormato.forEach((checkbox) => checkbox.addEventListener("click", () => renderBooks(currentPage)));
checkboxesPNF.forEach((checkbox) => checkbox.addEventListener("click", () => renderBooks(currentPage)));
checkboxesMateria.forEach((checkbox) => checkbox.addEventListener("click", () => renderBooks(currentPage)));

renderBooks(currentPage); // renderizar los libros en la página actual
renderPagination(); // renderizar la barra de paginación

/* add event listeners */
function renderPagination() {
  pagination.innerHTML = ""; // limpiar la barra de paginación
  
  // Agregar botón de flecha izquierda
  const prevButton = document.createElement("button");
  prevButton.innerHTML = '<i class="fas fa-chevron-left"><</i>';
  prevButton.classList.add("pagination-button");
  if (currentPage === 1) {
    prevButton.disabled = true;
  }
  prevButton.addEventListener("click", () => {
    currentPage--;
    renderBooks(currentPage);
    renderPagination();
  });
  pagination.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      renderBooks(currentPage);
      renderPagination();
    });
    pagination.appendChild(button);
  }

  // Agregar botón de flecha derecha
  const nextButton = document.createElement("button");
  nextButton.innerHTML = '<i class="fas fa-chevron-right">></i>';
  nextButton.classList.add("pagination-button");
  if (currentPage === totalPages) {
    nextButton.disabled = true;
  }
  nextButton.addEventListener("click", () => {
    currentPage++;
    renderBooks(currentPage);
    renderPagination();
  });
  pagination.appendChild(nextButton);
}
/*
buttonSearch.addEventListener("click", () => {
  console.log(valueSearch.value.toLowerCase());
});

/* cambio de forma de la plantillas de libros  */
const bookmorf = document.querySelectorAll(".book");
const bookmorfImg = document.querySelectorAll(".book img");
const bookbts = document.querySelectorAll("#viewbookall")

function removeActiveMorfBooks() {
  bookmorf.forEach((x) => x.classList.add("active"));
  bookmorfImg.forEach((x) => x.classList.add("active"));
  bookbts.forEach((x) => x.classList.add("active"));

}

function addActiveMorfBooks() {
  bookmorf.forEach((x) => x.classList.remove("active"));
  bookmorfImg.forEach((x) => x.classList.remove("active"));
  bookbts.forEach((x) => x.classList.remove("active"));
}
/*   */
function viewBooknew(prodId){
  openbiblioteca()
  viewmenubook.style.display = "flex";

  bookArchive.forEach((book) => {
    if (prodId == book.id) {
const div = document.createElement("div");
  div.classList.add("nav_menu-background-active");
  div.innerHTML = `
  <div class="nav_menu-content-info-book">
  <button class="nav_menu-bts-close-menu" >x</button>
   <h2 class="nav_menu-h2-title-book">${book.nombre}</h2>
   <img class="nav_menu-img-book" src="${book.img}" alt="">
   <a class="nav_menu-a-description">${book.desc}description</a>
   <a href="${book.link}" target="_blank" class="nav_menu-bts-download">Descarga<img src="download-rounded.svg" alt=""></a>
   <img class="deco1" src="deco1.png" alt="a">
   <img class="deco2" src="deco3.png" alt="b">
   </div>
    `;
    viewmenubook.appendChild(div);
    }})
  
  
  const prod = bookArchive.map((prod) => {
    if (prod.id == prodId) {
      
    }
  })}
/* */
function viewBook(prodId){
  viewmenubook.style.display = "flex";

  bookArchive.forEach((book) => {
    if (prodId == book.id) {
const div = document.createElement("div");
  div.classList.add("nav_menu-background-active");
  div.innerHTML = `
  <div class="nav_menu-content-info-book" onclick="animarDiv(this)">
  <button class="nav_menu-bts-close-menu" >x</button>
   <h2 class="nav_menu-h2-title-book">${book.nombre}</h2>
   <img class="nav_menu-img-book" src="${book.img}" alt="">
   <a class="nav_menu-a-description">${book.desc}description</a>
   <a href="${book.link}" target="_blank" class="nav_menu-bts-download">Descarga<img src="download-rounded.svg" alt=""></a>
   <img class="deco1" src="deco1.png" alt="a">
   <img class="deco2" src="deco3.png" alt="b">
   </div>
    `;
    viewmenubook.appendChild(div);
    }})
  
  
  const prod = bookArchive.map((prod) => {
    if (prod.id == prodId) {
      
    }
  })
  const btscloseanim = document.querySelector('.nav_menu-background-active')
  const btsCloseMenu = document.querySelector('.nav_menu-bts-close-menu');

function closeMenu() {
  viewmenubook.style.display = "none";
  viewmenubook.innerHTML = "";
}

btsCloseMenu.addEventListener('click', () =>{
  btscloseanim.style.animation = "backgrounviewmenu-title-exit 1.4s ease 0s 1 normal none"

  window.setTimeout(closeMenu, 1000);
 
})

}/*
const navbar = document.querySelector('.nav_bar')
const openbiblio = document.querySelector('.vertodo')
function openbiblioteca() {
   toggleMenuFilters.style.display = "flex";
  twoSection.style.display = "none";
  threSection.style.display = "flex";
  navbar.style.position = "unset";
}
openbiblio.addEventListener('click',() =>  {
  openbiblioteca()
})
*/
