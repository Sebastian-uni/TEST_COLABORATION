import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook personalizado para gestionar las contraseñas en localStorage.
 * Abstrae toda la lógica de lectura, escritura y actualización.
 */
export const usePasswords = () => {
  // Estado para almacenar las contraseñas. Se inicializa con los datos de localStorage.
  const [passwords, setPasswords] = useState(() => {
    try {
      const storedPasswords = window.localStorage.getItem('safebox_passwords');
      return storedPasswords ? JSON.parse(storedPasswords) : [];
    } catch (error) {
      console.error("Error al leer de localStorage", error);
      return [];
    }
  });

  // Efecto que se ejecuta cada vez que el estado de `passwords` cambia.
  // Guarda la lista actualizada en localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem('safebox_passwords', JSON.stringify(passwords));
    } catch (error) {
      console.error("Error al guardar en localStorage", error);
    }
  }, [passwords]);

  /**
   * Añade una nueva contraseña a la lista.
   * @param {object} passwordData - Datos de la contraseña { site, user, password }.
   */
  const addPassword = (passwordData) => {
    const newPassword = { 
      id: uuidv4(), // Genera un ID único
      ...passwordData 
    };
    setPasswords(prevPasswords => [...prevPasswords, newPassword]);
  };

  /**
   * Actualiza una contraseña existente.
   * @param {string} id - El ID de la contraseña a actualizar.
   * @param {object} updatedData - Los nuevos datos para la contraseña.
   */
  const updatePassword = (id, updatedData) => {
    setPasswords(prevPasswords =>
      prevPasswords.map(p => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  /**
   * Elimina una contraseña de la lista.
   * @param {string} id - El ID de la contraseña a eliminar.
   */
  const deletePassword = (id) => {
    setPasswords(prevPasswords => prevPasswords.filter(p => p.id !== id));
  };
  
  /**
   * Elimina TODAS las contraseñas.
   * Usado en el panel de configuración.
   */
  const deleteAllPasswords = () => {
    setPasswords([]);
  };

  return { passwords, addPassword, updatePassword, deletePassword, deleteAllPasswords };
};
