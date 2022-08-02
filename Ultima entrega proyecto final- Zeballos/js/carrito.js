const visualizarCarrito = document.getElementById("visualizarCarrito")
const botonPagar = document.getElementById("botonPagar")
let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('carrito') &&
    (carrito = JSON.parse(localStorage.getItem('carrito')))
    popularCarrito()
})

function popularCarrito() {
    carrito.forEach((datos) => {
        let div = document.createElement('div')
        div.classList.add("container-fluid")
        div.innerHTML = `
            <div class="card text-center col">
            <img src="${datos.img}" class="img" alt="">
            <div class="card-body">
            <h5 class="card-title">${datos.titulo}</h5>            
            <p class="card-text">Valor:$ ${datos.precio}</p>
            <p clas="card-text">Cantidad: 1</p>
            </div>`
        visualizarCarrito.appendChild(div)
    })
}

botonPagar.addEventListener("click", () => {
    carrito.length = 0
    Swal.fire({
        title: "Estas seguro que deseas comprar estos productos?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo comprarlos!'
    })
    .then((result) => {
        if (result.isConfirmed){        
        Swal.fire(
            'Productos comprados!',
            'Muchas gracias por comprar en OLIMPEA Ecommerce',
            'success',)            
        carrito.length = 0;
        visualizarCarrito.style.display = 'none';
        botonPagar.style.display = 'none';
    } else{}})
})