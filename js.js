// Obtener los checkboxes de los filtros
let checkboxesFormato = document.querySelectorAll("#checklist-items-formato input[type=checkbox]");
let checkboxesPNF = document.querySelectorAll("#checklist-items-pnf input[type=checkbox]");
let checkboxesMateria = document.querySelectorAll("#checklist-items-materia input[type=checkbox]");

const print1 = document.querySelector(".content_books");

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
let currentPage = 1;
const booksPerPage = 21;
let librosFiltrados = []; // Variable global para almacenar los libros filtrados
let totalPages = Math.ceil(bookArchive.length / booksPerPage); // Valor inicial basado en el tamaño de bookArchive
function filtrarLibros(currentPage) {
  const valoresCheckboxes = obtenerValoresCheckboxes();

   librosFiltrados = bookArchive.slice(); // Copia de todos los libros disponibles

  if (valoresCheckboxes.formato.length > 0) {
    librosFiltrados = librosFiltrados.filter((libro) => valoresCheckboxes.formato.includes(libro.formato));
  }

  if (valoresCheckboxes.pnf.length > 0) {
    librosFiltrados = librosFiltrados.filter((libro) => valoresCheckboxes.pnf.includes(libro.pnf));
  }

  if (valoresCheckboxes.materia.length > 0) {
    librosFiltrados = librosFiltrados.filter((libro) => valoresCheckboxes.materia.includes(libro.materia));
  }
  totalPages = librosFiltrados.length > 0 ? Math.ceil(librosFiltrados.length / booksPerPage) : Math.ceil(bookArchive.length / booksPerPage); 
  
  console.log("Cantidad total de libros encontrados:", librosFiltrados.length); // Imprimir cantidad total de libros encontrados
  const startIndex = (currentPage - 1) * booksPerPage; // índice del primer libro en la página actual
  const endIndex = startIndex + booksPerPage; // índice del último libro en la página actual
  const librosPaginaActual = librosFiltrados.slice(startIndex, endIndex); // libros a renderizar
  renderPagination()
  return librosPaginaActual // Devuelve los libros de la página actual
}

// Función para renderizar los libros filtrados
function renderBooks(currentPage) {
  const librosFiltrados = filtrarLibros(currentPage);

  print1.innerHTML = ""; // limpiar el contenedor de libros
  librosFiltrados.forEach((book) => {
    const div = document.createElement("div");
    div.setAttribute("onclick", `viewBook(${book.id})`);
    div.setAttribute("id", `viewBook(${book.id})`);
    div.classList.add("newbooks");
    div.innerHTML = `
    <a href="${book.link}" target="_blank" class="nav_menu-bts-download">
    Descarga
    <img src="download-rounded.svg" alt="">
    </a>
    <div class="imgcontent"><img src="${book.img}" alt=""></div>
      <div class="titlecontent"><h3>${book.nombre}</h3></div>
    `;
    print1.appendChild(div);
  });
}




// Función para renderizar la barra de paginación
function renderPagination() {
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
    window.scroll({
      top: 100,
      behavior: "smooth",
    });
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
      window.scroll({
        top: 100,
        behavior: "smooth",
      });
      currentPage = i;
      renderBooks(currentPage);
      renderPagination();
    });
    pagination.appendChild(button);
  }

  // Agregar botón de flecha derecha
  const nextButton = document.createElement("button");
  nextButton.innerHTML = '<i  class="fas fa-chevron-right">></i>';
  nextButton.classList.add("pagination-button");
  if (currentPage === totalPages) {
    nextButton.disabled = true;
  }
  nextButton.addEventListener("click", () => {
    window.scroll({
      top: 100,
      behavior: "smooth",
    });
    currentPage++;
    renderBooks(currentPage);
    renderPagination();
  });
  pagination.appendChild(nextButton);
}
function aaa(){
  document.querySelectorAll(".pagination-button")[1].click();
}

const secondmenubt = document.querySelector(".center")
function toggleMenuFilters11(){
secondmenubt.classList.toggle("closefilter")
secondmenubt.style.color= '';

}
function resetAllFilter(){
  document.querySelectorAll('.checklist input[type=checkbox]').forEach(function hardReset(checkElement){
    checkElement.checked = false;
    renderBooks(currentPage)
  })
}