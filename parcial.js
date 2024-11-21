"use strict";

/*
 * SANCHEZ, MARGOTH |
 */

// Array de productos
const productos = [
  {
    id: 1,
    nombre: "I believe in naps",
    descripcion: "Remera blanca para Soñadores de siestas y ovnis, ¡unidos!",
    precio: 15000,
    imagen: "img/remera-1.webp",
    categoria: "Remeras",
  },
  {
    id: 2,
    nombre: "En misión secreta",
    descripcion: "Gorra gris estilo misterioso para agentes intergalácticos.",
    precio: 9000,
    imagen: "img/gorro-1.svg",
    categoria: "Gorras",
  },
  {
    id: 3,
    nombre: "Alien Toes",
    descripcion: "Medias coloridas con estilo interestelar en cada paso.",
    precio: 3500,
    imagen: "img/medias-1.webp",
    categoria: "Calcetines",
  },
  {
    id: 4,
    nombre: "Empacando para Marte",
    descripcion:
      "Mochila con estampado, lista para tu próxima aventura espacial.",
    precio: 20000,
    imagen: "img/mochila-1.webp",
    categoria: "Mochilas",
  },
  {
    id: 5,
    nombre: "Demasiado cool para la Tierra",
    descripcion: "Remera negra porque tu estilo merece su propia órbita.",
    precio: 16000,
    imagen: "img/remera-2.webp",
    categoria: "Remeras",
  },
  {
    id: 6,
    nombre: "Embajador Galáctico",
    descripcion: "Gorra verde: para un look de otro planeta.",
    precio: 9500,
    imagen: "img/gorro-2.webp",
    categoria: "Gorras",
  },
  {
    id: 7,
    nombre: "Martian Steps",
    descripcion: "Medias rosas y celestes para que camines como un marciano.",
    precio: 3800,
    imagen: "img/medias-2.png",
    categoria: "Calcetines",
  },
  {
    id: 8,
    nombre: "CosmoBag",
    descripcion:
      "Mochila negra que será tu compañero ideal para explorar mundos.",
    precio: 2500,
    imagen: "img/mochila-2.png",
    categoria: "Mochilas",
  },
  {
    id: 9,
    nombre: "Nerd de otro planeta",
    descripcion: "Remera negra: para genios que programan el universo.",
    precio: 16000,
    imagen: "img/remera-3.webp",
    categoria: "Remeras",
  },
  {
    id: 10,
    nombre: "AstroCap",
    descripcion:
      "Gorro negro: para exploradores espaciales que necesitan sombra.",
    precio: 7900,
    imagen: "img/gorro-3.png",
    categoria: "Gorras",
  },
  {
    id: 11,
    nombre: "CosmoSocks",
    descripcion:
      "Medias blancas y rosas, suaves y cómodas con un toque de ciencia ficción.",
    precio: 2600,
    imagen: "img/medias-3.png",
    categoria: "Calcetines",
  },
  {
    id: 12,
    nombre: "AstroPack",
    descripcion: "Una mochila monstruo con diseño extraterrestre.",
    precio: 38000,
    imagen: "img/mochila-3.png",
    categoria: "Mochilas",
  },
];
// ------------------------- Funciones para carga de contenido -------------------------
function cargaContenido(
  etiquetaCreada, //etiqueta que se va a crear
  propiedadProducto, //texto que se va a agregar en la etiqueta
  container, //contenedor donde se va a agregar el nuevo elemento
  texto = "" //texto opcional que se agrega antes del contenido
) {
  const tituloProducto = document.createElement(etiquetaCreada);
  const textoTitulo = document.createTextNode(`${texto} ${propiedadProducto}`);
  tituloProducto.appendChild(textoTitulo);
  container.appendChild(tituloProducto);
}

// Función para mostrar productos en  DOM
function mostrarProductos() {
  const contenedorProductos = document.querySelector("#productos");

  //itero sobre el array de productos y se ven en DOM
  productos.forEach((producto) => {
    // Creo elementos de producto
    const productoItem = document.createElement("li");
    productoItem.classList.add("item-productos");
    const infoContainer = document.createElement("div");

    const imagen = document.createElement("img");
    imagen.setAttribute("src", producto.imagen);
    imagen.setAttribute("alt", producto.nombre);

    // Llamo a la funcion generada arriba, para cargar las etiquetas de nombre, descripcion, precio y categoria
    cargaContenido("h3", producto.nombre, infoContainer);
    cargaContenido("p", producto.descripcion, infoContainer, "Descripcion:");
    cargaContenido("p", producto.precio, infoContainer, "Precio: $");
    cargaContenido("p", producto.categoria, infoContainer, "Categoria:");

    // Botón para agregar el producto al carrito
    const botonAgregar = document.createElement("button");
    const textboton = document.createTextNode("Agregar al carrito");
    botonAgregar.appendChild(textboton);
    botonAgregar.classList.add("active");

    // Evento para agregar los productos al carrotp al hacer click en Agregar Carrito
    botonAgregar.addEventListener("click", () => {
      agregarProducto(producto);
      spanCarrito.textContent = `${cantidadProductos}`;
      window.scrollTo({
        // Esto hace un scroll para arriba cuando se agrega un producto, lo agregue por mejor usabilidad
        top: 0,
        behavior: "smooth",
      });
    });

    // Agrupo todos los appendChilds con variables de las etiquetas generadas anteriormente
    infoContainer.appendChild(botonAgregar);
    productoItem.appendChild(imagen);
    productoItem.appendChild(infoContainer);
    contenedorProductos.appendChild(productoItem);

    //console.log("Producto agregado al DOM:", producto.nombre);
  });
}

//llamo a la funciin para que carguen todos los productos desde el array
mostrarProductos();

// --------------------------- Carrito ---------------------------

//llamo al span que tiene el contador en el icono de carrito
const spanCarrito = document.querySelector(".item-contador-carrito");

// Variables para total y cantidad de productos
let total = 0; // precio total de los productos
let cantidadProductos = 0;
let items = []; // array donde se van a acumular todos los productos que se agreguen al carrito con el boton de agregado

// llamo a las clases del acumulador y del total de precio
const itemAgregado = document.querySelector(".item-agregado");
const itemPrecio = document.querySelector(".item-precio");

// Funcion que acumula la cantidad de productos, el precio total y hace el push a los productos seleccionados
const agregarProducto = (producto) => {
  cantidadProductos++;
  total += producto.precio;
  itemAgregado.textContent = cantidadProductos;
  itemPrecio.textContent = total;
  items.push(producto);
};

// --------------------------- Modal Carrito ---------------------------

//Selecciono el boton del carrito
const botonCarrito = document.querySelector(".boton-carrito");

// Evento carrito: Al hacer click se abre el modal con todos los productos seleccionnados
botonCarrito.addEventListener("click", () => {
  //crea la modal para mostrar el carrito
  const modalProducto = document.createElement("dialog");
  modalProducto.classList.add("modal");
  document.body.prepend(modalProducto);

  //creo el contenido del carrito
  const contenedorCarrito = document.createElement("div");
  contenedorCarrito.classList.add("carrito");

  //titulo del contenedor del carrito
  const tituloContenedorCarrito = document.createElement("p");
  tituloContenedorCarrito.classList.add("titulo-contenedor-carrito");
  tituloContenedorCarrito.textContent = "Carrito de compras";
  contenedorCarrito.appendChild(tituloContenedorCarrito);

  //Header del carrito con la cantidad de productos y el total
  const headerCarrito = document.createElement("header");
  const spanProductos = document.createElement("span");
  spanProductos.classList.add("span-productos");
  spanProductos.textContent = `Productos: ${items.length} `;

  // Creo las etiquetas con el total y precio de los productos del header
  const spanTotal = document.createElement("span");
  spanTotal.classList.add("span-total");
  spanTotal.textContent = `Total: $${total}`;
  headerCarrito.appendChild(spanProductos);
  headerCarrito.appendChild(spanTotal);
  contenedorCarrito.append(headerCarrito);

  //lista de productos en el carrito
  const listaProductosCarrito = document.createElement("ul");
  contenedorCarrito.appendChild(listaProductosCarrito);

  //Recorro los productos en el carrito para poder mostrarlos
  items.forEach((item) => {
    const itemCarrito = document.createElement("li");
    const textoProducto = document.createTextNode(
      `${item.categoria} - ${item.nombre} - Precio:$${item.precio}` // Agregue categoria por usabilidad
    ); // Use textNode para que aparezca la categoria, el nombre y el precio en la misma linea todo junto
    itemCarrito.appendChild(textoProducto);

    //funcion para eliminar un producto del carrito
    const eliminarProducto = (idProducto) => {
      const index = items.findIndex((item) => item.id === idProducto);
      if (index !== -1) {
        // el findIndex devuelve -1 cuando no encuentra el producto, por eso lo elimina solo si no es -1
        total -= items[index].precio; // le resto el precio de ese producto al total
        cantidadProductos--; // le descuento 1 a la cantidad de productos totales
        items.splice(index, 1); // splice elimina un producto del array
        itemAgregado.textContent = cantidadProductos; // ahora el itemagregado tiene la cantidad de productos actualizada
        itemPrecio.textContent = total; // idem precio
      }
    };

    //enlace para eliminar el producto
    const opcionEliminar = document.createElement("a");
    opcionEliminar.setAttribute("href", "a");
    opcionEliminar.classList.add("enlace-carrito");
    opcionEliminar.textContent = " Eliminar";
    opcionEliminar.addEventListener("click", (event) => {
      event.preventDefault();
      eliminarProducto(item.id); //Llamo a la funcion de eliminar para eliminar el producto seleccionado
      opcionEliminar.remove(); //Elimina el enlace
      modalProducto.close(); // cierro el modal para luego volver a abrirlo corregido
      botonCarrito.click(); // Hace click en el carrito para que se abra ahora con los productos eliminados
      spanCarrito.textContent = `${cantidadProductos}`; // actualiza el contador al lado del carrito
    });
    itemCarrito.appendChild(opcionEliminar);
    listaProductosCarrito.appendChild(itemCarrito); //Agrego el producto a la lista
  });

  //Footer del carrito con los botones de cerrar,vaciar y proceder al pago
  const footerCarrito = document.createElement("footer");
  const botonCerrar = document.createElement("button");
  botonCerrar.classList.add("boton-cerrar");
  botonCerrar.textContent = "Cerrar";

  const botonVaciar = document.createElement("button");
  botonVaciar.classList.add("boton-vaciar");
  botonVaciar.textContent = "Vaciar";

  const botonPago = document.createElement("button");
  botonPago.classList.add("boton-pago");
  botonPago.textContent = "Proceder al pago";

  footerCarrito.append(botonCerrar, botonVaciar, botonPago);
  contenedorCarrito.appendChild(footerCarrito);

  modalProducto.appendChild(contenedorCarrito);
  modalProducto.showModal(); //muestra el modal

  //-------------------- Eventos Modal --------------------
  //Cerrar modal
  botonCerrar.addEventListener("click", () => {
    modalProducto.close();
    modalProducto.remove(); //elimina el modal del DOM
  });

  //vaciar el carrito
  botonVaciar.addEventListener("click", () => {
    items = []; //vacia el array de productos
    cantidadProductos = 0; //resetea la cantidad
    total = 0; //resetea el total
    itemAgregado.textContent = cantidadProductos;
    itemPrecio.textContent = total;
    spanProductos.textContent =
      spanTotal.textContent =
      listaProductosCarrito.textContent =
        ""; //limpia el contenido del carrito

    // Le creo un texto con un li para que le avise al usuario que el carrito se vacio
    const mensajeVacio = document.createElement("li");
    mensajeVacio.textContent = "El carrito está vacío";
    mensajeVacio.classList.add("mensaje-vacio");
    listaProductosCarrito.appendChild(mensajeVacio);
    spanCarrito.textContent = `${cantidadProductos}`; // Se actualiza el contador del carrito a 0
  });

  //Proceder al pago (Agregado para solo para que el boton tenga alguna funcionalidad que emule la realidad)
  botonPago.addEventListener("click", () => {
    window.open("https://www.mercadopago.com.ar/", "_blank");
  });
});
