const contenedorProductos = document.getElementById("contenedor-productos")
const contenedorCarrito = document.getElementById("carrito-contenedor")
const visualizarCarrito = document.getElementById("visualizarCarrito")
let carrito = []
let productos = []
let URL_STOCK = "https://62cc71658042b16aa7cf8065.mockapi.io/apiOlimpea/Productos"
let URL_DESCUENTOS = "https://62cc71658042b16aa7cf8065.mockapi.io/apiOlimpea/ProductosConDescuento"

Swal.fire({
    title: `Bienvenidos al Ecommerce de OLIMPEA BEAUTY
        Si posee carnet profesional, idiquelo aqui abajo para acceder a descuentos exclusivos.
        De lo contrario pulse continuar sin carnet`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Poseo carnet profesional',
    denyButtonText: `Continuar sin carnet`,
}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(`Aqui le mostramos todos nuestros productos con descuentos exclusivos para profesionales`)
        productosConDescuentos()
    } else {
        productosSinDescuentos()
        Swal.fire(`Aqui le mostramos todos nuestros productos para consumidores convencionales`)
    }
})

function productosSinDescuentos() {
    fetch(URL_STOCK)
        .then((response) => response.json())
        .then((data1) => {
            data1.forEach(data1 => {
                let div = document.createElement('div')
                div.classList.add("container-fluid")
                div.innerHTML = `
                    <div class="card text-center col">
                    <img src="${data1.img}" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${data1.titulo}</h5>
                    <p class="card-text">${data1.desc}</p>
                    <p class="card-text">Valor:$ ${data1.precio}</p>
                    <button data-id="${data1.id}" id="${data1.id}" class="btn btn-primary">Agregar <i class="fa-solid fa-cart-shopping"></i></button></div>
                    </div>`
                contenedorProductos.appendChild(div)
                boton2(data1.id)
                productos.push(data1)

            })
        }).catch(error => console.log(error))

    // OPERADOR TERNARIO
    document.addEventListener('DOMContentLoaded', () => {
        localStorage.getItem('carrito') &&
        (carrito = JSON.parse(localStorage.getItem('carrito')))
        actualizarCarrito()
    })

    const agregarAlCarrito = (prodId1) => {
        const item1 = productos.find((prod1) => prod1.id === prodId1)
        carrito.push(item1)
        actualizarCarrito()        
    } 

    function boton2(valor1) {
        const boton2 = document.getElementById(valor1)
        boton2.addEventListener('click', () => {
            agregarAlCarrito(boton2.getAttribute("data-id"))
            Swal.fire({
                icon: 'success',
                title: 'Se ha agregado un producto a su carrito',
                position: 'top-end',
                showConfirmButton: false,
                toast: true,
                timer: 2500,
                background: 'darkGreen',
                color: 'white'
            })
        })
    }

    const actualizarCarrito = () => {
        contenedorCarrito.innerHTML = ""
        localStorage.setItem('carrito', JSON.stringify(carrito))
        carrito.forEach((datos1) => {       
            const div1 = document.createElement('div')
            div1.className = ("actualizarCarrito")          
            div1.innerHTML = ` 
                <p class="card">    
                <p> ${datos1.titulo}</p>
                <p> Valor: <span id="cantidad">${datos1.precio}</span></p>
                <p> Cantidad: 1 </p> </p>`
            contenedorCarrito.appendChild(div1)
          
        })
        contenedorCarrito.style.display = "none";
    }

    const botonVaciar = document.getElementById('vaciarCarrito')
    botonVaciar.innerHTML = `<p> Vaciar carrito </p>`

    // OPERADOR TERNARIO
    botonVaciar.addEventListener('click', () => {
        Swal.fire({
            icon: 'error',
            title: `Se han eliminado ${carrito.length} productos del carrito. Su carrito esta vacio`,
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 3500,
            background: 'darkRed',
            color: 'white'            
        })
        carrito.length = 0
        actualizarCarrito()
    })  
}

function productosConDescuentos() {
    fetch(URL_DESCUENTOS)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(data => {
                let div = document.createElement('div')
                div.classList.add("container-fluid")
                div.innerHTML = `
                    <div class="card text-center col">
                    <img src="${data.img}" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${data.titulo}</h5>
                    <p class="card-text">${data.desc}</p>
                    <p class="card-text">Valor:$ ${data.precio}</p>
                    <button data-id="${data.id}" id="${data.id}" class="btn btn-primary">Agregar <i class="fa-solid fa-cart-shopping"></i></button></div>
                    </div>`
                contenedorProductos.appendChild(div)
                boton1(data.id)
                productos.push(data)
            })
        }).catch(error => console.log(error))

    // OPERADOR TERNARIO
    document.addEventListener('DOMContentLoaded', () => {
        localStorage.getItem('carrito') &&
        (carrito = JSON.parse(localStorage.getItem('carrito')))
        actualizarCarrito()
    })

    const agregarAlCarrito = (prodId) => {
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
        actualizarCarrito()
    }

    function boton1(valor) {
        const boton = document.getElementById(valor)
        boton.addEventListener('click', () => {
            agregarAlCarrito(boton.getAttribute("data-id"))
            Swal.fire({
                icon: 'success',
                title: 'Se ha agregado un producto a su carrito',
                position: 'top-end',
                showConfirmButton: false,
                toast: true,
                timer: 2500,
                background: 'darkGreen',
                color: 'white'
            })
        })
    }

    const actualizarCarrito = () => {    
        contenedorCarrito.innerHTML = ""
        localStorage.setItem('carrito', JSON.stringify(carrito))
        carrito.forEach((datos) => {
            const div = document.createElement('div')
            div.className = ("actualizarCarrito")
            div.innerHTML =`
                <p class="card">    
                <p> ${datos.titulo}</p>
                <p> Valor: <span id="cantidad">${datos.precio}</span></p>
                <p> Cantidad: 1 </p> </p>` 
            contenedorCarrito.appendChild(div)
        }) 
        contenedorCarrito.style.display = 'none';
    }  

    const botonVaciar = document.getElementById('vaciarCarrito')
    botonVaciar.innerHTML = `<p> Vaciar carrito </p>`

    // OPERADOR TERNARIO
    botonVaciar.addEventListener('click', () => {        
        Swal.fire({
            icon: 'error',
            title: `Se han eliminado ${carrito.length} productos del carrito. Su carrito esta vacio`,
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 2500,
            background: 'darkRed',
            color: 'white'
        })
        carrito.length = 0
        actualizarCarrito()
    })
}