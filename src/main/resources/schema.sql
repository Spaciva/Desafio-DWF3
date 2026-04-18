-- Tabla Profesor
CREATE TABLE IF NOT EXISTS profesor (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(100) NOT NULL
);

-- Tabla Materia
CREATE TABLE IF NOT EXISTS materia (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         nombre VARCHAR(100) NOT NULL,
                         id_profesor BIGINT,
                         FOREIGN KEY (id_profesor) REFERENCES profesor(id)
);

-- Tabla Alumno
CREATE TABLE IF NOT EXISTS alumno (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(100) NOT NULL,
                        apellido VARCHAR(100) NOT NULL
);

-- Tabla Intermedia (Inscripciones)
CREATE TABLE IF NOT EXISTS alumno_materia (
                                id_alumno BIGINT,
                                id_materia BIGINT,
                                calificacion DOUBLE DEFAULT NULL,
                                PRIMARY KEY (id_alumno, id_materia),
                                FOREIGN KEY (id_alumno) REFERENCES alumno(id),
                                FOREIGN KEY (id_materia) REFERENCES materia(id)
);

CREATE TABLE IF NOT EXISTS app_user (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         username VARCHAR(50) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL,
                         role VARCHAR(30) NOT NULL
);
