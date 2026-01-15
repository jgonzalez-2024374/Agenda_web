function showForm() {
  const form = document.getElementById("form");

  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

let editandoId = null;


const contactosIniciales = [
    {
        id: 1,
        nombre: "Rodrigo",
        email: "rodr@gmail.com",
        telefono: "5421-5412",
        favorito: false
    }
    
];


if (!localStorage.getItem("contactos")) {
    localStorage.setItem("contactos", JSON.stringify(contactosIniciales));
}


function obtenerContactos() {
    return JSON.parse(localStorage.getItem("contactos")) || [];
}

function guardarContactos(contactos) {
    localStorage.setItem("contactos", JSON.stringify(contactos));
}

function showForm() {
    const form = document.getElementById("form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function agregar() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const btn = document.getElementById("btnAgregar");

    if (!nombre || !email || !telefono) {
        alert("Completa todos los campos");
        return;
    }

    let contactos = obtenerContactos();

    if (editandoId !== null) {
        contactos = contactos.map(c =>
            c.id === editandoId
                ? { ...c, nombre, email, telefono }
                : c
        );
        editandoId = null;
        btn.textContent = "Agregar";
    } else {
        contactos.push({
            id: Date.now(),
            nombre,
            email,
            telefono,
            favorito: false
        });
    }

    guardarContactos(contactos);
    limpiarFormulario();
    renderTabla();
}

function editar(id) {
    const contacto = obtenerContactos().find(c => c.id === id);
    if (!contacto) return;

    document.getElementById("nombre").value = contacto.nombre;
    document.getElementById("email").value = contacto.email;
    document.getElementById("telefono").value = contacto.telefono;

    editandoId = id;

    const btn = document.getElementById("btnAgregar");
    btn.textContent = "Guardar cambios";
    btn.dataset.modo = "editar"; // 👈 CLAVE

    document.getElementById("form").style.display = "block";
}


function eliminar(id) {
    const contactos = obtenerContactos().filter(c => c.id !== id);
    guardarContactos(contactos);
    renderTabla();
}

function toggleFavorito(id) {
    const contactos = obtenerContactos();
    const contacto = contactos.find(c => c.id === id);
    if (!contacto) return;

    contacto.favorito = !contacto.favorito;
    guardarContactos(contactos);


    if (document.body.classList.contains("favoritos")) {
        window.location.href = "agenda.html";
        return;
    }

    renderTabla();
}

function renderTabla() {
    const tbody = document.querySelector("#tablaContactos tbody");
    if (!tbody) return;

    const esFavoritos = document.body.classList.contains("favoritos");

    const contactos = obtenerContactos()
        .filter(c => esFavoritos ? c.favorito : !c.favorito);

    tbody.innerHTML = "";

    contactos.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.email}</td>
                <td>${c.telefono}</td>
                <td>
                    <button onclick="editar(${c.id})">Editar</button>
                    <button onclick="eliminar(${c.id})">Eliminar</button>
                    ${
                        esFavoritos
                            ? `<button onclick="toggleFavorito(${c.id})">Quitar</button>`
                            : `<button onclick="toggleFavorito(${c.id})">⭐</button>`
                    }
                </td>
            </tr>
        `;
    });
}


function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
}

renderTabla();
