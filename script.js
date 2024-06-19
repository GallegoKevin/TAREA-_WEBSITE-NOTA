document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteModal = document.getElementById('noteModal');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteDate = document.getElementById('noteDate');
    const noteTime = document.getElementById('noteTime');
    const charCount = document.getElementById('charCount');
    const notesTable = document.getElementById('notesTable');
    const notesCards = document.getElementById('notesCards');
    const emptyMessageTable = document.getElementById('emptyMessageTable');
    const emptyMessageCards = document.getElementById('emptyMessageCards');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let editingIndex = null;

    addNoteBtn.addEventListener('click', () => {
        openModal();
    });

    saveNoteBtn.addEventListener('click', () => {
        saveNote();
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    noteContent.addEventListener('input', () => {
        charCount.textContent = `${noteContent.value.length} caracteres`;
    });

    function openModal(note = {}, isViewOnly = false, index = null) {
        noteTitle.value = note.title || '';
        noteContent.value = note.content || '';
        const now = new Date();

        // Si se está visualizando una nota existente, mostrar la fecha y la hora
        if (index !== null) {
            noteDate.textContent = note.date || now.toLocaleDateString();
            noteTime.textContent = note.time || now.toLocaleTimeString();
            noteTime.style.display = 'inline'; 
        } else {
            // Ocultar la hora al crear una nueva nota
            noteDate.textContent = now.toLocaleDateString();
            noteTime.textContent = now.toLocaleTimeString();
            noteTime.style.display = 'none';
        }

        charCount.textContent = `${noteContent.value.length} caracteres`;
        editingIndex = index;

        if (isViewOnly) {
            noteTitle.setAttribute('readonly', true);
            noteContent.setAttribute('readonly', true);
            saveNoteBtn.style.display = 'none';
            closeModalBtn.style.display = 'block';
            closeModalBtn.style.margin = 'auto';
            closeModalBtn.style.width = 'fit-content';
        } else {
            noteTitle.removeAttribute('readonly');
            noteContent.removeAttribute('readonly');
            saveNoteBtn.style.display = 'inline-block';
            closeModalBtn.style.display = 'inline-block';
            closeModalBtn.style.margin = '';
            closeModalBtn.style.width = '';
        }

        noteModal.style.display = 'flex';
    }

    function closeModal() {
        noteModal.style.display = 'none';
    }

    function saveNote() {
        const now = new Date();
        const newNote = {
            title: noteTitle.value,
            content: noteContent.value
        };

        if (editingIndex !== null) {
            // Si está editando una nota existente
            const originalNote = notes[editingIndex];
            newNote.date = originalNote.date;
            newNote.time = originalNote.time;
            newNote.modDate = now.toLocaleDateString();
            newNote.modTime = now.toLocaleTimeString();
            notes[editingIndex] = newNote;
            editingIndex = null;
        } else {
            // Si está agregando una nueva nota
            newNote.date = now.toLocaleDateString();
            newNote.time = now.toLocaleTimeString();
            notes.push(newNote);
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        closeModal();
    }

    function renderNotes() {
        notesTable.innerHTML = '';
        notesCards.innerHTML = '';

        if (notes.length === 0) {
            // Mostrar mensaje en la tabla y en las tarjetas
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="8" class="empty-message">No hay ninguna nota creada</td>`;
            notesTable.appendChild(emptyRow);

            const emptyCardsMessage = document.createElement('div');
            emptyCardsMessage.classList.add('empty-message');
            emptyCardsMessage.textContent = 'No hay ninguna nota creada';
            notesCards.appendChild(emptyCardsMessage);
        } else {
            // Renderizar en la tabla
            notes.forEach((note, index) => {
               
                let titleText = note.title || 'Sin Título';
                let contentText = note.content || 'Sin contenido';


            // Truncar el contenido a 50 caracteres para la tabla
            if (contentText.length > 50) {
                contentText = contentText.substring(0, 50) + '...';
            }

                const row = document.createElement('tr');
                row.innerHTML = `
        <td>${index + 1}</td>
        <td >${titleText}</td> <!-- Título o "Sin Título" -->
        <td>${contentText}</td> <!-- Contenido o "Sin contenido" -->
        <td>${note.date || ''}</td>
        <td>${note.time || ''}</td>
        <td>${note.modDate || ''}</td>
        <td>${note.modTime || ''}</td>
        <td>
            <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
            <button class="view-btn" data-index="${index}"><i class="fas fa-eye"></i></button>
        </td>
    `;
                notesTable.appendChild(row);
            });

            // Renderizar en las tarjetas
            notes.forEach((note, index) => {
                let titleText = note.title || 'Sin Título'; 
                let contentText = note.content || ''; 

                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
        <h3>${titleText}</h3> 
          <p>${formatNoteContent(contentText)}</p>
        <div class="card-actions">
            <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
            <button class="view-btn" data-index="${index}"><i class="fas fa-eye"></i></button>
        </div>
    `;
                notesCards.appendChild(card);
            });
        }

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                openModal(notes[index], false, index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                renderNotes();
            });
        });

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                openModal(notes[index], true, index);
            });
        });
    }

    function formatNoteContent(content) {
        return content.replace(/\n/g, '<br>');
    }
    
    renderNotes();
});



// CODIGOS DE CLASE: 

/*

// LocalStorage y Json

// Objeto usuario
let user = {
    name: "Max Alexander",
    age: 20,
    email: "example@gmail.com"
}

let car = {
    color: "rojo",
    matricula: "FG-23D",
    nroPer: "4",
}

let darkMode = true;



//Convertir Objeto a cadena JSON

let userJson = JSON.stringify(user);
let carJson = JSON.stringify(car);

document.getElementById('btn').addEventListener('click', function(){
    console.log("se guardo cadena JSON :D")
    //Guardar cadena JSON en localStorage
    localStorage.setItem('user', userJson);
    localStorage.setItem('automovil', carJson);
    localStorage.setItem('dark', darkMode);
})

//obtener cadena JSON

console.log(localStorage.getItem('user'))
console.log(localStorage.getItem('automovil'))
console.log(localStorage.getItem('dark'))


// Asincronia JS

//GET , POST, PUT , DELETE 

// XmlHttpRequest (Nativo),
// fetch (nativo)
// axios (libreria)

//fetch

const data = fetch ('https://jsonplaceholder.typicode.com/users');
    const list = document.getElementById('list')

    data
    .then(response => {
        return response.json();
    
    })

    .then (data => {
        data.forEach(element => {
            const li = document.createElement('li');
            li.textContent = element.name;
            list.appendChild(li);
        });
       
    })
    .catch(error => {
        console.error("Ha ocurrido un problema con su operacon de recuperación:" + error)
    })

// Libreria Axios


const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/users')
    .then( response => {
        console.log(response);
        let users = response.data;
        users.forEach(element => {
            console.log(element.name)
        });
    })
console.log('hola mundo')
*/