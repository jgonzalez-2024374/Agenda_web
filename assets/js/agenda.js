document.addEventListener('DOMContentLoaded', () => {
  const formAgregar = document.getElementById('formAgregar');
  const tablaContactos = document.querySelector('#tablaContactos tbody');
  const btnAgregar = document.getElementById('btnAgregar');

  let editandoFila = null;

  const contactosIniciales = [
    { nombre: "José González", email: "jose@mail.com", telefono: "555-1234" },
    { nombre: "María Pérez", email: "maria@mail.com", telefono: "555-5678" },
    { nombre: "Carlos López", email: "carlos@mail.com", telefono: "555-8765" },
    { nombre: "Ana Martínez", email: "ana@mail.com", telefono: "555-4321" },
    { nombre: "Luis Fernández", email: "luis@mail.com", telefono: "555-6789" },
  ];

  function crearFila(contacto) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${contacto.nombre}</td>
      <td>${contacto.email}</td>
      <td>${contacto.telefono}</td>
      <td>
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
      </td>
    `;

    fila.querySelector('.editar').addEventListener('click', () => {
      editandoFila = fila;
      formAgregar.nombre.value = fila.children[0].textContent;
      formAgregar.email.value = fila.children[1].textContent;
      formAgregar.telefono.value = fila.children[2].textContent;
      btnAgregar.textContent = 'Guardar Cambios';
    });

    fila.querySelector('.eliminar').addEventListener('click', () => {
      if (editandoFila === fila) {
        editandoFila = null;
        formAgregar.reset();
        btnAgregar.textContent = 'Agregar Contacto';
      }
      fila.remove();
    });
    return fila;
  }


  contactosIniciales.forEach(c => tablaContactos.appendChild(crearFila(c)));


  formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = formAgregar.nombre.value.trim();
    const email = formAgregar.email.value.trim();
    const telefono = formAgregar.telefono.value.trim();

    if (!nombre || !email || !telefono) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (editandoFila) {
    
      editandoFila.children[0].textContent = nombre;
      editandoFila.children[1].textContent = email;
      editandoFila.children[2].textContent = telefono;
      editandoFila = null;
      btnAgregar.textContent = 'Agregar Contacto';
    } else {
    
      tablaContactos.appendChild(crearFila({ nombre, email, telefono }));
    }

    formAgregar.reset();
  });
});