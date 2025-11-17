import { Delete24Regular as DeleteIcon } from '@fluentui/react-icons';
import styles from './SettingsPanel.module.css';

const SettingsPanel = ({ onDeleteAll }) => {

  const handleDeleteClick = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar TODAS las contraseñas? Esta acción no se puede deshacer.')) {
      onDeleteAll();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Ajustes</h1>
      
      <div className={styles.dangerZone}>
        <h2 className={styles.dangerTitle}>Zona de Peligro</h2>
        <p className={styles.dangerText}>
          Estas acciones son destructivas y no se pueden revertir. Úsalas con precaución.
        </p>
        
        <button
          onClick={handleDeleteClick}
          className={styles.deleteAllButton}
        >
          <DeleteIcon />
          Eliminar Todas las Contraseñas
        </button>
      </div>

      <div className={styles.footer}>
        <p>SafeBox Lite v1.0.0</p>
        <p>Una aplicación local simple para gestionar tus contraseñas.</p>
      </div>
    </div>
  );
};

export default SettingsPanel;