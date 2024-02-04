const newbooks = document.querySelector(".contenedor_books");




/*
bookArchive.forEach((book) => {
    if (book.id <= 20) {
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


/**/
const CountAll = bookArchive.length;
const contenedornum = document.querySelector(".CountAll");
const numlr = document.createElement("div");
numlr.classList.add("AVC");
numlr.innerHTML = `
<div class="countBooksAll">
<p>Cantidad total de articulos</p>
<span>${CountAll}</span>
</div>


`;
contenedornum.appendChild(numlr);



