class Curso {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}

const row = document.querySelector("#lista-cursos")
const carrito = document.querySelector("#lista-carrito tbody")
const buttonDeleteCarrito = document.querySelector("#vaciar-carrito")

console.log()
console.log(row)

row.addEventListener("click", addCarrito)
buttonDeleteCarrito.addEventListener("click", deleteCarrito)

const miStorage = window.localStorage;
miStorage.clear()
function addCarrito(e) {
    if(e.target.classList.contains("agregar-carrito")){
        console.log("test")
        const newElemento = document.createElement("tr")
        
        const newNombre = document.createElement("th")
        const newPrecio = document.createElement("th")
        const newImagen = document.createElement("th")
        const newCantidad = document.createElement("th")
        const newImg = document.createElement("img")

        const nombre = e.target.parentElement.children[0].textContent
        const precio = e.target.parentElement.children[3].children[0].textContent
        const imgSrc = e.target.parentElement.parentElement.children[0].src

        const curso = new Curso(nombre, precio, imgSrc)
        
        if(miStorage.getItem(curso.nombre) == null || miStorage.getItem(curso.nombre) == 0){
            miStorage.setItem(curso.nombre, 1)
            newImg.src = curso.imagen
        newImg.classList.add("u-full-width")
        
        newNombre.textContent = curso.nombre
        newPrecio.textContent = curso.precio
        newCantidad.textContent = miStorage.getItem(curso.nombre)

        newImagen.appendChild(newImg)
        newElemento.appendChild(newImagen)
        newElemento.appendChild(newNombre)
        newElemento.appendChild(newPrecio)
        newElemento.appendChild(newCantidad)
        
        carrito.appendChild(newElemento)
        }else{
            miStorage.setItem(curso.nombre, parseInt(miStorage.getItem(curso.nombre)) + 1)
            const carrito = document.querySelectorAll("#lista-carrito tr")
            console.log(carrito)
            carrito.forEach(element => {
                if(element.children[1].textContent == curso.nombre){
                    element.children[3].textContent = miStorage.getItem(curso.nombre)
                }
            });
        }

        
    }
}

function deleteCarrito() {
    miStorage.clear()
    carrito.innerHTML = ``
}