// 1. BASE DE DATOS DE PRODUCTOS
const productos = [
    { id: 1, nombre: "Pre Entreno Nitro", precio: 25, cat: "suplementos", imagen: "resources/imagen/preentreno.png" },
    { id: 2, nombre: "Toallas Fit-Neon", precio: 7.95, cat: "ropa", imagen: "resources/imagen/toalla.png" },
    { id: 3, nombre: "Sudadera Compresión Fit-Neon", precio: 35.95, cat: "ropa", imagen: "resources/imagen/sudadera.png" },
    { id: 4, nombre: "Proteína Isolatada", precio: 55.95, cat: "suplementos", imagen: "resources/imagen/proteina.png" },
    { id: 5, nombre: "Batidora Proteína Fit-Neon", precio: 6.95, cat: "suplementos", imagen: "resources/imagen/bote.png" },
    { id: 6, nombre: "Leggings Fit-Neon", precio: 24.95, cat: "ropa", imagen: "resources/imagen/leggins.png" },
    { id: 7, nombre: "Guantes Fit-Neon", precio: 9.95, cat: "complementos", imagen: "resources/imagen/guantes.png" },
    { id: 8, nombre: "Muñequeras Fit-Neon", precio: 12.95, cat: "complementos", imagen: "resources/imagen/muñequera.png" },
    { id: 9, nombre: "Cinturón Lumbar Fit-Neon", precio: 20, cat: "complementos", imagen: "resources/imagen/cinturonlumbar.png" },
    { id: 10, nombre: "Cinturón Lastre Fit-Neon", precio: 20, cat: "complementos", imagen: "resources/imagen/lastre.png" },
    { id: 11, nombre: "Camiseta Tirantes Fit-Neon", precio: 15, cat: "ropa", imagen: "resources/imagen/tirantes.png" },
    { id: 12, nombre: "Barritas Proteína Fit-Neon", precio: 4.95, cat: "suplementos", imagen: "resources/imagen/barritas.png" },
];

let carrito = [];
let productosEnPantalla = [...productos];

// --- A. LOGIN CON CORREO Y CONTRASEÑA ---
const btnLogin = document.getElementById('btn-login');
const loginContainer = document.getElementById('login-container');
const userInfo = document.getElementById('user-info');
const userDisplay = document.getElementById('user-display');

btnLogin?.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (email.includes('@') && pass.length >= 4) {
        const nombreUsuario = email.split('@')[0].toUpperCase();
        userDisplay.innerText = `HOLA, ${nombreUsuario}`;
        loginContainer.style.display = 'none';
        userInfo.style.display = 'flex';
    } else {
        alert("Introduce un email válido y contraseña (mín. 4 caracteres)");
    }
});

document.getElementById('btn-logout')?.addEventListener('click', () => {
    location.reload(); 
});


// --- B. CONTROL DE LA BARRA LATERAL (SIDEBAR) Y OVERLAY ---
const cartSidebar = document.getElementById('cart-sidebar');
const openCartBtn = document.getElementById('open-cart'); 
const closeCartBtn = document.getElementById('close-cart'); 
const overlay = document.getElementById('overlay');

function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

openCartBtn?.addEventListener('click', toggleCart);
closeCartBtn?.addEventListener('click', toggleCart);
overlay?.addEventListener('click', toggleCart); // Cerrar al hacer clic fuera


// --- C. LÓGICA DEL CARRITO ---
function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === id);
    carrito.push(prod);
    
    actualizarContador();
    renderizarCarrito();
    
    // Feedback visual: abrir carrito al añadir
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContador();
    renderizarCarrito();
}

function actualizarContador() {
    const count = document.getElementById('cart-count');
    if (count) count.innerText = carrito.length;
}

function renderizarCarrito() {
    const list = document.getElementById('cart-items-list');
    const totalDiv = document.getElementById('cart-total-display');
    
    list.innerHTML = ""; 
    let subtotal = 0;

    carrito.forEach((p, index) => {
        subtotal += p.precio;
        list.innerHTML += `
            <li class="cart-item">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="cart-item-info">
                    <h4>${p.nombre}</h4>
                    <p>${p.precio}€</p>
                </div>
                <button class="btn-remove" onclick="eliminarDelCarrito(${index})">✕</button>
            </li>
        `;
    });

    const costoEnvio = (subtotal > 150 || subtotal === 0) ? 0 : 15;
    const total = subtotal + costoEnvio;

    totalDiv.innerHTML = `
        <div><span>Subtotal:</span> <span>${subtotal}€</span></div>
        <div><span>Envío:</span> <span>${costoEnvio === 0 ? "GRATIS" : costoEnvio + "€"}</span></div>
        <div class="total-line"><span>TOTAL:</span> <span>${total}€</span></div>
    `;
}


// --- D. FUNCIONES DE LA TIENDA ---
function filtrar(categoria) {
    productosEnPantalla = (categoria === 'todos') 
        ? [...productos] 
        : productos.filter(p => p.cat === categoria);
    mostrarProductos();
}

function ordenar() {
    // Alternar orden si ya está ordenado (opcional) o simple orden ascendente
    productosEnPantalla.sort((a, b) => a.precio - b.precio);
    mostrarProductos();
}

function mostrarProductos() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = "";

    productosEnPantalla.forEach(p => {
        grid.innerHTML += `
            <article class="card">
                <img src="${p.imagen}" alt="${p.nombre}" class="product-img">
                <div style="font-size: 0.7rem; color: #555; margin-top: 10px;">${p.cat.toUpperCase()}</div>
                <h3 style="margin: 10px 0; font-size: 1.1rem;">${p.nombre}</h3>
                <p class="price">${p.precio}€</p>
                <button class="btn-neon" onclick="agregarAlCarrito(${p.id})">AÑADIR AL CARRITO</button>
            </article>
        `;
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
});