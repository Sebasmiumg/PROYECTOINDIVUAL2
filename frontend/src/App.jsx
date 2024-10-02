import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importamos los estilos CSS

function App() {
    const [notas, setNotas] = useState([]); // Asegurarse de que notas comience como un array vacío
    const [score, setScore] = useState("");
    const [studentId, setStudentId] = useState("");
    const [evaluationId, setEvaluationId] = useState("");
    const [editMode, setEditMode] = useState(false);  // Para saber si estamos editando
    const [currentNotaId, setCurrentNotaId] = useState(null);  // Guardar el ID de la nota actual
    const [errorMessage, setErrorMessage] = useState("");  // Para mostrar errores
    const [totalScore, setTotalScore] = useState(0); // Variable para almacenar el puntaje total

    // Obtener todas las notas del backend al cargar el componente
    useEffect(() => {
        fetchNotas(); // Extraemos la función para reutilizarla
    }, []);

    // Función para calcular el puntaje total
    const calculateTotalScore = (notas) => {
        const total = notas.reduce((acc, nota) => acc + nota.score, 0);
        setTotalScore(total);
    };

    const fetchNotas = () => {
        axios.get('/api/notas')
            .then(response => {
                const data = response.data;
                const notaList = Array.isArray(data) ? data : [];
                setNotas(notaList); // Verifica si la respuesta es un array, si no lo es, pone un array vacío
                calculateTotalScore(notaList); // Actualizamos el total
            })
            .catch(error => console.error("Error al obtener las notas: ", error));
    };

    // Manejar la creación de una nueva nota o edición
    const addNota = () => {
        // Validaciones para verificar si los campos están llenos
        if (!score || !studentId || !evaluationId) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        if (parseInt(score) > 35) { // Suponiendo que el máximo permitido es 35
            setErrorMessage("El puntaje no puede ser mayor a 35.");
            return;
        }

        setErrorMessage("");  // Limpiar el mensaje de error si todo está bien

        if (editMode) {
            // Si estamos en modo edición, enviar una solicitud PUT
            axios.put(`/api/notas/${currentNotaId}`, {
                score: parseInt(score),
                studentId: parseInt(studentId),
                evaluationId: parseInt(evaluationId),
            })
            .then(() => {
                fetchNotas();  // Volvemos a cargar las notas desde el servidor
                setEditMode(false);  // Salimos del modo edición
                setCurrentNotaId(null);  // Reseteamos el ID de la nota actual
                clearForm();  // Limpiar el formulario
            })
            .catch(error => console.error("Error al editar la nota: ", error));
        } else {
            // Si estamos agregando una nueva nota, enviar una solicitud POST
            axios.post('/api/notas', {
                score: parseInt(score),
                studentId: parseInt(studentId),
                evaluationId: parseInt(evaluationId),
            })
            .then(response => {
                const updatedNotas = [...notas, response.data];
                setNotas(updatedNotas);  // Agregamos la nueva nota a la lista
                calculateTotalScore(updatedNotas); // Recalculamos el puntaje total
                clearForm();
            })
            .catch(error => console.error("Error al agregar la nota: ", error));
        }
    };

    // Función para eliminar nota
    const deleteNota = (id) => {
        axios.delete(`/api/notas/${id}`)
            .then(() => {
                const updatedNotas = notas.filter(nota => nota.scoreId !== id);  // Eliminamos la nota de la lista
                setNotas(updatedNotas);
                calculateTotalScore(updatedNotas); // Recalculamos el puntaje total
            })
            .catch(error => console.error("Error al eliminar la nota: ", error));
    };

    // Función para editar nota (llenar el formulario con los datos existentes)
    const editNota = (nota) => {
        setScore(nota.score);
        setStudentId(nota.studentId);
        setEvaluationId(nota.evaluationId);
        setEditMode(true);
        setCurrentNotaId(nota.scoreId);
    };

    // Función para cancelar la edición
    const cancelEdit = () => {
        clearForm();
        setEditMode(false);
        setCurrentNotaId(null);
    };

    // Limpiar el formulario
    const clearForm = () => {
        setScore("");
        setStudentId("");
        setEvaluationId("");
        setErrorMessage("");
    };

    return (
        <div className="container">
            <h1>{editMode ? "Editar Nota" : "Agregar Nota"}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Puntuación"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ID Estudiante"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ID Evaluación"
                    value={evaluationId}
                    onChange={e => setEvaluationId(e.target.value)}
                />

                <div>
                    <button onClick={addNota}>
                        {editMode ? "Guardar Cambios" : "Agregar Nota"}
                    </button>
                    {editMode && (
                        <button onClick={cancelEdit} style={{ marginLeft: "10px", backgroundColor: "gray" }}>
                            Cancelar
                        </button>
                    )}
                </div>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>

            <ul>
                {notas.map(nota => (
                    <li key={nota.scoreId}>
                        <strong>Nota: {nota.score}</strong><br />
                        Estudiante ID: {nota.studentId}<br />
                        Evaluación ID: {nota.evaluationId}<br />
                        <button onClick={() => editNota(nota)} style={{ marginRight: "10px" }}>Editar</button>
                        <button onClick={() => deleteNota(nota.scoreId)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>Total de Puntaje: {totalScore}</h2> {/* Mostrar el puntaje total */}
        </div>
    );
}

export default App;
