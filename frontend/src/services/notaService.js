import apiClient from './axiosConfig';

// Obtener todas las notas
export const getAllNotas = async () => {
    try {
        const response = await apiClient.get('/notas');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las notas:', error);
        throw error;
    }
};

// Crear una nueva nota
export const createNota = async (nota) => {
    try {
        const response = await apiClient.post('/notas', nota);
        return response.data;
    } catch (error) {
        console.error('Error creando la nota:', error);
        throw error;
    }
};

// Actualizar una nota existente
export const updateNota = async (id, nota) => {
    try {
        const response = await apiClient.put(`/notas/${id}`, nota);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la nota:', error);
        throw error;
    }
};

// Eliminar una nota
export const deleteNota = async (id) => {
    try {
        const response = await apiClient.delete(`/notas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la nota:', error);
        throw error;
    }
};
