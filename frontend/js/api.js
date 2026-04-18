// API Configuration
const API_BASE_URL = 'http://localhost:8081/api';
let authToken = localStorage.getItem('authToken') || null;

// ========== Auth API ==========
async function apiRegister(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) throw data;
        return data;
    } catch (error) {
        throw error.error || error;
    }
}

async function apiLogin(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) throw data;
        return data;
    } catch (error) {
        throw error.error || error;
    }
}

async function apiGetCurrentUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('No autorizado');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// ========== Alumnos API ==========
async function apiGetAlumnos() {
    try {
        const response = await fetch(`${API_BASE_URL}/alumnos`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error fetching alumnos');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiCreateAlumno(nombre, apellido) {
    try {
        const response = await fetch(`${API_BASE_URL}/alumnos`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ nombre, apellido })
        });
        if (!response.ok) throw new Error('Error creating alumno');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiUpdateAlumno(id, nombre, apellido) {
    try {
        const response = await fetch(`${API_BASE_URL}/alumnos/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ nombre, apellido })
        });
        if (!response.ok) throw new Error('Error updating alumno');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiDeleteAlumno(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/alumnos/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error deleting alumno');
        return response.ok;
    } catch (error) {
        throw error;
    }
}

// ========== Profesores API ==========
async function apiGetProfesores() {
    try {
        const response = await fetch(`${API_BASE_URL}/profesores`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error fetching profesores');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiCreateProfesor(nombre) {
    try {
        const response = await fetch(`${API_BASE_URL}/profesores`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ nombre })
        });
        if (!response.ok) throw new Error('Error creating profesor');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiUpdateProfesor(id, nombre) {
    try {
        const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ nombre })
        });
        if (!response.ok) throw new Error('Error updating profesor');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiDeleteProfesor(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error deleting profesor');
        return response.ok;
    } catch (error) {
        throw error;
    }
}

// ========== Materias API ==========
async function apiGetMaterias() {
    try {
        const response = await fetch(`${API_BASE_URL}/materias`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error fetching materias');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiCreateMateria(nombre, idProfesor) {
    try {
        const body = { nombre };
        if (idProfesor) {
            body.profesor = { id: idProfesor };
        }
        const response = await fetch(`${API_BASE_URL}/materias`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error('Error creating materia');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiUpdateMateria(id, nombre, idProfesor) {
    try {
        const body = { nombre };
        if (idProfesor) {
            body.profesor = { id: idProfesor };
        }
        const response = await fetch(`${API_BASE_URL}/materias/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error('Error updating materia');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiDeleteMateria(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/materias/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error deleting materia');
        return response.ok;
    } catch (error) {
        throw error;
    }
}

// ========== Notas (AlumnoMateria) API ==========
async function apiGetNotas() {
    try {
        const response = await fetch(`${API_BASE_URL}/alumno-materia`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error fetching notas');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiCreateNota(idAlumno, idMateria, calificacion = null) {
    try {
        const body = {
            alumno: { id: idAlumno },
            materia: { id: idMateria }
        };
        if (calificacion !== null) {
            body.calificacion = calificacion;
        }
        const response = await fetch(`${API_BASE_URL}/alumno-materia`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error('Error creating nota');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiUpdateNota(idAlumno, idMateria, calificacion) {
    try {
        const response = await fetch(`${API_BASE_URL}/alumno-materia/${idAlumno}/${idMateria}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ calificacion })
        });
        if (!response.ok) throw new Error('Error updating nota');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiDeleteNota(idAlumno, idMateria) {
    try {
        const response = await fetch(`${API_BASE_URL}/alumno-materia/${idAlumno}/${idMateria}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error deleting nota');
        return response.ok;
    } catch (error) {
        throw error;
    }
}

// ========== Helper Functions ==========
function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : ''
    };
}

function setAuthToken(token) {
    authToken = token;
    localStorage.setItem('authToken', token);
}

function clearAuthToken() {
    authToken = null;
    localStorage.removeItem('authToken');
}
