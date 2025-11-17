import PasswordItem from './PasswordItem';
import { Add24Regular as AddIcon, Search24Regular as SearchIcon } from '@fluentui/react-icons';
import styles from './PasswordList.module.css';

const PasswordList = ({ passwords, onEdit, onDelete, onAddNew, onSearch }) => {
  return (
    <div className={styles.wrapper}>
      {/* Encabezado con buscador y botón de agregar */}
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Buscar en contraseñas..."
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button
          onClick={onAddNew}
          className={styles.addButton}
        >
          <AddIcon />
          Agregar Contraseña
        </button>
      </div>

      {/* Lista de contraseñas */}
      <div className={styles.listContainer}>
        {passwords.length > 0 ? (
          <div className={styles.list}>
            {passwords.map(item => (
              <PasswordItem
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No hay contraseñas guardadas.</p>
            <p>¡Agrega la primera!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordList;