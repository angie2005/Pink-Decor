document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA 1: INTERACTIVIDAD DEL CARRITO LATERAL ---
    const cartToggle = document.getElementById("cart-toggle");
    const cartClose = document.getElementById("cart-close");
    const sidebarCart = document.getElementById("sidebar-cart");
    const cartCount = document.getElementById("cart-count");
    const emptyMsg = document.getElementById("empty-cart-msg");
    const cartItemsList = document.getElementById("cart-items-list");
    const btnPago = document.getElementById("btn-pago");

    let totalItems = 0;

    // Abrir Carrito
    cartToggle.addEventListener("click", () => {
        sidebarCart.classList.add("open");
    });

    // Cerrar Carrito
    cartClose.addEventListener("click", () => {
        sidebarCart.classList.remove("open");
    });

    // Añadir Productos al Carrito
    const addCartButtons = document.querySelectorAll(".btn-add-cart");
    addCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.parentElement;
            const productName = productCard.querySelector("h3").innerText;
            const productPrice = productCard.querySelector(".price").innerText;

            // Ocultar mensaje vacío si es el primer elemento
            if (totalItems === 0) {
                emptyMsg.style.display = "none";
            }

            // Incrementar contador global
            totalItems++;
            cartCount.innerText = totalItems;

            // Crear el elemento visual en la lista del carrito
            const li = document.createElement("li");
            li.classList.add("cart-item");
            li.innerHTML = `<span>${productName}</span> <strong>${productPrice}</strong>`;
            cartItemsList.appendChild(li);

            // Efecto sutil de confirmación en el botón
            const originalText = e.target.innerText;
            e.target.innerText = "¡Añadido! ✨";
            e.target.style.backgroundColor = "#ffb7c5";
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.backgroundColor = "";
            }, 1000);
        });
    });

    // Simular Acción de Pago
    btnPago.addEventListener("click", () => {
        if(totalItems > 0) {
            alert("Redireccionando al flujo de Pago Seguro...");
        } else {
            alert("Tu carrito está vacío. Elige productos primero.");
        }
    });


    // --- LÓGICA 2: FILTRADO DINÁMICO DE PRODUCTOS (Categorías del Mapa) ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Cambiar clase activa en botones
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const filterValue = e.target.getAttribute("data-filter");

            // Mostrar/Ocultar productos mediante transiciones lógicas
            productCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (filterValue === "todos" || filterValue === cardCategory) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

// ==========================================================================
// LÓGICA DEL INTERACTIVA DEL HERO SLIDER
// ==========================================================================
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("slide-prev");
const nextBtn = document.getElementById("slide-next");

let currentSlide = 0;
let slideInterval;

// Condicional seguro: Solo ejecuta la lógica si el slider existe en la página actual
if (slides.length > 0) {
    function changeSlide(targetIndex) {
        // Apaga el estado activo del slide y puntito actual
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        // Calcula el nuevo índice de forma circular
        currentSlide = (targetIndex + slides.length) % slides.length;

        // Enciende el nuevo slide y puntito activo
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    // Funciones de navegación directa
    function nextSlide() { changeSlide(currentSlide + 1); }
    function prevSlide() { changeSlide(currentSlide - 1); }

    // Control de tiempo automático
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // 5 segundos por imagen
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startAutoSlide(); // Reinicia el contador de tiempo al hacer clic manual
    }

    // Event Listeners: Flechas
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });

    // Event Listeners: Puntitos inferiores
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            changeSlide(index);
            resetTimer();
        });
    });

    // Inicializar el carrusel automatizado
    startAutoSlide();
}
