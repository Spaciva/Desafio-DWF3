// ========== Global State ==========
let currentUser = null;
let alumnos = [];
let profesores = [];
let materias = [];
let notas = [];
let editingRecord = null;
let editingType = null;

// ========== UI Functions ==========

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showModal(title, formFields, onSubmit) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalForm = document.getElementById('modal-form');

    modalTitle.textContent = title;
    modalBody.innerHTML = '';

    formFields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';

        if (field.type === 'select') {
            group.innerHTML = `
                <label for="${field.id}">${field.label}</label>
                <select id="${field.id}" name="${field.name}">
                    <option value="">Seleccionar...</option>
                    ${field.options.map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('')}
                </select>
            `;
        } else {
            group.innerHTML = `
                <label for="${field.id}">${field.label}</label>
                <input type="${field.type}" id="${field.id}" name="${field.name}" value="${field.value || ''}" ${field.required ? 'required' : ''}>
            `;
        }

        modalBody.appendChild(group);
    });

    modalForm.onsubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    editingRecord = null;
    editingType = null;
}

function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    event.target.classList.add('active');

    // Load data based on section
    if (sectionName === 'alumnos') loadAlumnos();
    else if (sectionName === 'profesores') loadProfesores();
    else if (sectionName === 'materias') loadMaterias();
    else if (sectionName === 'notas') loadNotas();
    else if (sectionName === 'dashboard') loadDashboard();
}

function showAuthContainer() {
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
}

function showAppContainer() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'grid';
    loadDashboard();
}

// ========== Alumnos UI ==========

async function loadAlumnos() {
    try {
        alumnos = await apiGetAlumnos();
        renderAlumnosTable();
    } catch (error) {
        showToast('Error loading alumnos', 'error');
        console.error(error);
    }
}

function renderAlumnosTable() {
    const tbody = document.querySelector('#alumnos-table tbody');
    tbody.innerHTML = '';

    alumnos.forEach(alumno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-warning" onclick="editAlumno(${alumno.id})">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteAlumno(${alumno.id})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editAlumno(id) {
    const alumno = alumnos.find(a => a.id === id);
    editingRecord = alumno;
    editingType = 'alumno';

    showModal('Editar Alumno', [
        { id: 'nombre', name: 'nombre', label: 'Nombre', type: 'text', value: alumno.nombre, required: true },
        { id: 'apellido', name: 'apellido', label: 'Apellido', type: 'text', value: alumno.apellido, required: true }
    ], saveAlumno);
}

function deleteAlumno(id) {
    if (confirm('¿Está seguro de que desea eliminar este alumno?')) {
        apiDeleteAlumno(id)
            .then(() => {
                showToast('Alumno eliminado exitosamente');
                loadAlumnos();
            })
            .catch(error => {
                showToast('Error al eliminar alumno', 'error');
                console.error(error);
            });
    }
}

function saveAlumno() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;

    if (editingRecord) {
        apiUpdateAlumno(editingRecord.id, nombre, apellido)
            .then(() => {
                showToast('Alumno actualizado exitosamente');
                closeModal();
                loadAlumnos();
            })
            .catch(error => {
                showToast('Error al actualizar alumno', 'error');
                console.error(error);
            });
    } else {
        apiCreateAlumno(nombre, apellido)
            .then(() => {
                showToast('Alumno creado exitosamente');
                closeModal();
                loadAlumnos();
            })
            .catch(error => {
                showToast('Error al crear alumno', 'error');
                console.error(error);
            });
    }
}

// ========== Profesores UI ==========

async function loadProfesores() {
    try {
        profesores = await apiGetProfesores();
        renderProfesoresTable();
    } catch (error) {
        showToast('Error loading profesores', 'error');
        console.error(error);
    }
}

function renderProfesoresTable() {
    const tbody = document.querySelector('#profesores-table tbody');
    tbody.innerHTML = '';

    profesores.forEach(profesor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${profesor.id}</td>
            <td>${profesor.nombre}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-warning" onclick="editProfesor(${profesor.id})">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteProfesor(${profesor.id})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editProfesor(id) {
    const profesor = profesores.find(p => p.id === id);
    editingRecord = profesor;
    editingType = 'profesor';

    showModal('Editar Profesor', [
        { id: 'nombre', name: 'nombre', label: 'Nombre', type: 'text', value: profesor.nombre, required: true }
    ], saveProfesor);
}

function deleteProfesor(id) {
    if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
        apiDeleteProfesor(id)
            .then(() => {
                showToast('Profesor eliminado exitosamente');
                loadProfesores();
            })
            .catch(error => {
                showToast('Error al eliminar profesor', 'error');
                console.error(error);
            });
    }
}

function saveProfesor() {
    const nombre = document.getElementById('nombre').value;

    if (editingRecord) {
        apiUpdateProfesor(editingRecord.id, nombre)
            .then(() => {
                showToast('Profesor actualizado exitosamente');
                closeModal();
                loadProfesores();
            })
            .catch(error => {
                showToast('Error al actualizar profesor', 'error');
                console.error(error);
            });
    } else {
        apiCreateProfesor(nombre)
            .then(() => {
                showToast('Profesor creado exitosamente');
                closeModal();
                loadProfesores();
            })
            .catch(error => {
                showToast('Error al crear profesor', 'error');
                console.error(error);
            });
    }
}

// ========== Materias UI ==========

async function loadMaterias() {
    try {
        materias = await apiGetMaterias();
        renderMateriasTable();
    } catch (error) {
        showToast('Error loading materias', 'error');
        console.error(error);
    }
}

function renderMateriasTable() {
    const tbody = document.querySelector('#materias-table tbody');
    tbody.innerHTML = '';

    materias.forEach(materia => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${materia.id}</td>
            <td>${materia.nombre}</td>
            <td>${materia.profesor ? materia.profesor.nombre : 'Sin asignar'}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-warning" onclick="editMateria(${materia.id})">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteMateria(${materia.id})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editMateria(id) {
    const materia = materias.find(m => m.id === id);
    editingRecord = materia;
    editingType = 'materia';

    showModal('Editar Materia', [
        { id: 'nombre', name: 'nombre', label: 'Nombre', type: 'text', value: materia.nombre, required: true },
        {
            id: 'profesor',
            name: 'profesor',
            label: 'Profesor',
            type: 'select',
            options: profesores.map(p => ({ id: p.id, name: p.nombre })),
            value: materia.profesor ? materia.profesor.id : ''
        }
    ], saveMateria);
}

function deleteMateria(id) {
    if (confirm('¿Está seguro de que desea eliminar esta materia?')) {
        apiDeleteMateria(id)
            .then(() => {
                showToast('Materia eliminada exitosamente');
                loadMaterias();
            })
            .catch(error => {
                showToast('Error al eliminar materia', 'error');
                console.error(error);
            });
    }
}

function saveMateria() {
    const nombre = document.getElementById('nombre').value;
    const idProfesor = document.getElementById('profesor').value;

    if (editingRecord) {
        apiUpdateMateria(editingRecord.id, nombre, idProfesor)
            .then(() => {
                showToast('Materia actualizada exitosamente');
                closeModal();
                loadMaterias();
            })
            .catch(error => {
                showToast('Error al actualizar materia', 'error');
                console.error(error);
            });
    } else {
        apiCreateMateria(nombre, idProfesor)
            .then(() => {
                showToast('Materia creada exitosamente');
                closeModal();
                loadMaterias();
            })
            .catch(error => {
                showToast('Error al crear materia', 'error');
                console.error(error);
            });
    }
}

// ========== Notas UI ==========

async function loadNotas() {
    try {
        // Load all required data
        alumnos = await apiGetAlumnos();
        materias = await apiGetMaterias();
        notas = await apiGetNotas();
        renderNotasTable();
    } catch (error) {
        showToast('Error loading notas', 'error');
        console.error(error);
    }
}

function renderNotasTable() {
    const tbody = document.querySelector('#notas-table tbody');
    tbody.innerHTML = '';

    notas.forEach(nota => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nota.id.idAlumno}</td>
            <td>${nota.alumno.nombre} ${nota.alumno.apellido}</td>
            <td>${nota.materia.nombre}</td>
            <td>${nota.calificacion !== null ? nota.calificacion.toFixed(2) : 'Sin calificación'}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-warning" onclick="editNota(${nota.id.idAlumno}, ${nota.id.idMateria})">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteNota(${nota.id.idAlumno}, ${nota.id.idMateria})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editNota(idAlumno, idMateria) {
    const nota = notas.find(n => n.id.idAlumno === idAlumno && n.id.idMateria === idMateria);
    editingRecord = nota;
    editingType = 'nota';

    showModal('Editar Calificación', [
        {
            id: 'alumno',
            name: 'alumno',
            label: 'Alumno',
            type: 'select',
            options: alumnos.map(a => ({ id: a.id, name: `${a.nombre} ${a.apellido}` })),
            value: nota.alumno.id
        },
        {
            id: 'materia',
            name: 'materia',
            label: 'Materia',
            type: 'select',
            options: materias.map(m => ({ id: m.id, name: m.nombre })),
            value: nota.materia.id
        },
        { id: 'calificacion', name: 'calificacion', label: 'Calificación', type: 'number', value: nota.calificacion, required: false }
    ], saveNota);
}

function deleteNota(idAlumno, idMateria) {
    if (confirm('¿Está seguro de que desea eliminar esta calificación?')) {
        apiDeleteNota(idAlumno, idMateria)
            .then(() => {
                showToast('Calificación eliminada exitosamente');
                loadNotas();
            })
            .catch(error => {
                showToast('Error al eliminar calificación', 'error');
                console.error(error);
            });
    }
}

function saveNota() {
    const idAlumno = parseInt(document.getElementById('alumno').value);
    const idMateria = parseInt(document.getElementById('materia').value);
    const calificacionValue = document.getElementById('calificacion').value;
    const calificacion = calificacionValue ? parseFloat(calificacionValue) : null;

    if (editingRecord) {
        apiUpdateNota(idAlumno, idMateria, calificacion)
            .then(() => {
                showToast('Calificación actualizada exitosamente');
                closeModal();
                loadNotas();
            })
            .catch(error => {
                showToast('Error al actualizar calificación', 'error');
                console.error(error);
            });
    } else {
        apiCreateNota(idAlumno, idMateria, calificacion)
            .then(() => {
                showToast('Calificación creada exitosamente');
                closeModal();
                loadNotas();
            })
            .catch(error => {
                showToast('Error al crear calificación', 'error');
                console.error(error);
            });
    }
}

// ========== Dashboard UI ==========

async function loadDashboard() {
    try {
        const [alumnosData, profesoresData, materiasData] = await Promise.all([
            apiGetAlumnos(),
            apiGetProfesores(),
            apiGetMaterias()
        ]);

        document.getElementById('total-alumnos').textContent = alumnosData.length;
        document.getElementById('total-profesores').textContent = profesoresData.length;
        document.getElementById('total-materias').textContent = materiasData.length;
    } catch (error) {
        showToast('Error loading dashboard', 'error');
        console.error(error);
    }
}

// ========== Load Current User ==========

async function loadCurrentUser() {
    try {
        currentUser = await apiGetCurrentUser();
        document.getElementById('current-user').textContent = `Bienvenido, ${currentUser.username}`;
    } catch (error) {
        showToast('Error loading user info', 'error');
        console.error(error);
    }
}
