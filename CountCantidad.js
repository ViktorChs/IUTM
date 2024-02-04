const cantidadLibros = bookArchive.reduce((contador, objeto) => {
  if (objeto.formato === "libro") {
    contador++;
  }
  return contador;
}, 0);

const cantidadRevistas = bookArchive.reduce((contador, objeto) => {
  if (objeto.formato === "revista") {
    contador++;
  }
  return contador;
}, 0);
const contenedornum = document.querySelector(".cantidadlibros");
const numlr = document.createElement("div");
numlr.classList.add("numberbook");
numlr.innerHTML = `
<div class="Txtlibro">
<div>
<div id="ContenedoriconEtext">
<img src="/icons8-revista-64.png" alt="revista icon">
<i>2023 01 20</i>
</div>
<p>Cantidad agregados de Revistas</p>
<span>${cantidadRevistas}</span>
</div>
<img src="/Lovepik_com-401372690-irregular-round-decorative-line-shading.png" alt="">
</div>

<div class="TxtRevista">
<div>
<div id="ContenedoriconEtext">
<img src="/icons8-libro-64.png" alt="libro">
<i>2023 01 20</i>
</div>
<p>Cantidad agregados de Audio Libros</p>
<span>${cantidadRevistas}</span>
</div>
<img src="/—Pngtree—abstract line wave element_5890802.png" alt="book">

</div>

<div class="TxtRevista">
<div>
<div id="ContenedoriconEtext">
<img src="/icons8-audio-libro-50.png" alt="">
<i>2023 01 20</i>
</div>
<p>Cantidad agregados de Libros</p>
<span>${cantidadRevistas}</span>
</div>
<img src="/5lcO9VtI1GqyaRxburqQ_-transformed.png" alt="">
</div>
`;
contenedornum.appendChild(numlr);
/**/ 

const toggleMenuFilters = document.querySelector('.etc')
const blockmenubooks = document.querySelector('.blockcontentmenuopen')
function toggleMenuf() {
  blockmenubooks.classList.toggle("open")
document.body.classList.toggle("open")
}

