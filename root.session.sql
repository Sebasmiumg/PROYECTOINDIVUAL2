-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS sistema_notas;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_notas;

-- Usar la base de datos creada
USE sistema_notas;

-- Crear la tabla de estudiantes
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    student_email VARCHAR(100) UNIQUE NOT NULL
);

-- Crear la tabla de evaluaciones
CREATE TABLE IF NOT EXISTS evaluations (
    evaluation_id INT AUTO_INCREMENT PRIMARY KEY,
    evaluation_name VARCHAR(50) NOT NULL,
    max_score INT NOT NULL
);

-- Crear la tabla de notas (relación entre estudiantes y evaluaciones)
CREATE TABLE IF NOT EXISTS scores (
    score_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    evaluation_id INT,
    score INT CHECK (score >= 0),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (evaluation_id) REFERENCES evaluations(evaluation_id)
);

-- Insertar los tipos de evaluaciones con los puntajes máximos permitidos
INSERT INTO evaluations (evaluation_name, max_score) VALUES
('Actividades', 35),
('Primer Parcial', 15),
('Segundo Parcial', 15),
('Examen Final', 35);

-- Insertar un estudiante de ejemplo
INSERT INTO students (student_name, student_email) VALUES
('Juan Pérez', 'juan.perez@email.com');

-- Insertar una nota de ejemplo para el estudiante
INSERT INTO scores (student_id, evaluation_id, score) VALUES
(1, 1, 30);

-- Verificar si los datos se insertaron correctamente
SELECT * FROM students;

-- Mostrar todas las tablas creadas
SHOW TABLES;
