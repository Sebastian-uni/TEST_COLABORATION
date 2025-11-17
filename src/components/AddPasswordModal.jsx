import { useState, useEffect } from 'react';
import PasswordGenerator from './PasswordGenerator';
import { Eye24Regular as EyeIcon, EyeOff24Regular as EyeOffIcon } from '@fluentui/react-icons';
import styles from './AddPasswordModal.module.css';

const AddPasswordModal = ({ onClose, onSave, existingPassword }) => {
  const [formData, setFormData] = useState({
    site: '',
    user: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (existingPassword) {
      setFormData({
        site: existingPassword.site,
        user: existingPassword.user,
        password: existingPassword.password,
      });
    }
  }, [existingPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordGenerated = (newPassword) => {
    setFormData(prev => ({ ...prev, password: newPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.site && formData.user && formData.password) {
      onSave(formData);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {existingPassword ? 'Editar Contraseña' : 'Agregar Contraseña'}
          </h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="site" className={styles.formLabel}>Sitio o Servicio</label>
              <input
                type="text"
                name="site"
                id="site"
                value={formData.site}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ej: Google, Facebook, etc."
              />
            </div>

            <div>
              <label htmlFor="user" className={styles.formLabel}>Usuario o Email</label>
              <input
                type="text"
                name="user"
                id="user"
                value={formData.user}
                onChange={handleChange}
                className={styles.input}
                placeholder="tu.usuario@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.formLabel}>Contraseña</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.passwordInput}
                  placeholder="Genera o escribe una contraseña segura"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className={styles.toggleButton}
                >
                  {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.saveButton}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordModal;