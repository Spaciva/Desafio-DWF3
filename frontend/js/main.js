// ========== Initialization ==========

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (authToken) {
        showAppContainer();
        loadCurrentUser();
    } else {
        showAuthContainer();
    }

    // Setup event listeners
    setupAuthEvents();
    setupNavigation();
    setupModalEvents();
    setupCRUDEvents();
});

// ========== Auth Events ==========

function setupAuthEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    // Login form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const result = await apiLogin(username, password);
            setAuthToken(result.token);
            showToast('¡Bienvenido!');
            showAppContainer();
            loadCurrentUser();
        } catch (error) {
            showToast(error || 'Error al iniciar sesión', 'error');
        }
    });

    // Register form
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            const result = await apiRegister(username, password);
            setAuthToken(result.token);
            showToast('¡Registro exitoso!');
            showAppContainer();
            loadCurrentUser();
        } catch (error) {
            showToast(error || 'Error al registrarse', 'error');
        }
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
        clearAuthToken();
        showToast('Sesión cerrada');
        showAuthContainer();
        document.getElementById('login-form').reset();
        document.getElementById('register-form').reset();
    });
}

// ========== Navigation Events ==========

function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionName = e.target.dataset.section;

            // Remove active class from all buttons
            document.querySelectorAll('.nav-btn').forEach(b => {
                b.classList.remove('active');
            });

            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            // Add active class to clicked button
            e.target.classList.add('active');

            // Show selected section
            document.getElementById(sectionName).classList.add('active');

            // Load data based on section
            if (sectionName === 'alumnos') loadAlumnos();
            else if (sectionName === 'profesores') loadProfesores();
            else if (sectionName === 'materias') loadMaterias();
            else if (sectionName === 'notas') loadNotas();
            else if (sectionName === 'dashboard') loadDashboard();
        });
    });
}

// ========== Modal Events ==========

function setupModalEvents() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const closeModalBtn = document.getElementById('close-modal-btn');

    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// ========== CRUD Button Events ==========

function setupCRUDEvents() {
    // Alumnos
    document.getElementById('add-alumno-btn').addEventListener('click', () => {
        editingRecord = null;
        editingType = 'alumno';
        showModal('Nuevo Alumno', [
            { id: 'nombre', name: 'nombre', label: 'Nombre', type: 'text', value: '', required: true },
            { id: 'apellido', name: 'apellido', label: 'Apellido', type: 'text', value: '', required: true }
        ], saveAlumno);
    });

    // Profesores
    document.getElementById('add-profesor-btn').addEventListener('click', () => {
        editingRecord = null;
        editingType = 'profesor';
        showModal('Nuevo Profesor', [
            { id: 'nombre', name: 'nombre', label: 'Nombre', type: 'text', value: '', required: true }
        ], saveProfesor);
    });

    // Materias
    document.getElementById('add-materia-btn').addEventListener('click', async () => {
        try {
            if (profesores.length === 0) {
                profesores = await apiGetProfesores();
            }
        } catch (error) {
            console.error('Error loading profesores:', error);
        }

        editingRecord = null;
        editingType = 'materia';
        showModal('Nueva Materia', [
            { id: 'nombre', name: 'nombre', label: 'Nombre', type: 'text', value: '', required: true },
            {
                id: 'profesor',
                name: 'profesor',
                label: 'Profesor',
                type: 'select',
                options: profesores.map(p => ({ id: p.id, name: p.nombre })),
                value: ''
            }
        ], saveMateria);
    });

    // Notas
    document.getElementById('add-nota-btn').addEventListener('click', async () => {
        try {
            if (alumnos.length === 0) {
                alumnos = await apiGetAlumnos();
            }
            if (materias.length === 0) {
                materias = await apiGetMaterias();
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }

        editingRecord = null;
        editingType = 'nota';
        showModal('Nueva Calificación', [
            {
                id: 'alumno',
                name: 'alumno',
                label: 'Alumno',
                type: 'select',
                options: alumnos.map(a => ({ id: a.id, name: `${a.nombre} ${a.apellido}` })),
                value: ''
            },
            {
                id: 'materia',
                name: 'materia',
                label: 'Materia',
                type: 'select',
                options: materias.map(m => ({ id: m.id, name: m.nombre })),
                value: ''
            },
            { id: 'calificacion', name: 'calificacion', label: 'Calificación', type: 'number', value: '', required: false }
        ], saveNota);
    });
}

// ========== Auto-load data on first app view ==========

// Load initial data
window.addEventListener('load', () => {
    if (authToken) {
        // Preload some data for modals
        Promise.all([
            apiGetAlumnos().then(a => { alumnos = a; }),
            apiGetProfesores().then(p => { profesores = p; }),
            apiGetMaterias().then(m => { materias = m; })
        ]).catch(error => console.error('Error preloading data:', error));
    }
});
