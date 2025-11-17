import { useState } from 'react';
import { 
  Copy24Regular as CopyIcon, 
  Edit24Regular as EditIcon, 
  Delete24Regular as DeleteIcon,
  Eye24Regular as EyeIcon,
  EyeOff24Regular as EyeOffIcon
} from '@fluentui/react-icons';
import styles from './PasswordItem.module.css';

const PasswordItem = ({ item, onEdit, onDelete }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.password).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const copyButtonClass = `${styles.actionButton} ${styles.copyButton} ${isCopied ? styles.copied : ''}`;

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.site}>{item.site}</h3>
        <p className={styles.user}>{item.user}</p>
        <div className={styles.passwordContainer}>
          <p className={styles.passwordText}>
            {isPasswordVisible ? item.password : '•'.repeat(12)}
          </p>
          <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.toggleVisibilityButton}>
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={handleCopy}
          className={copyButtonClass}
        >
          <CopyIcon /> {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
        <button 
          onClick={() => onEdit(item)}
          className={`${styles.actionButton} ${styles.iconButton}`}
          aria-label="Editar"
        >
          <EditIcon />
        </button>
        <button 
          onClick={() => onDelete(item.id)}
          className={`${styles.actionButton} ${styles.iconButton} ${styles.deleteButton}`}
          aria-label="Eliminar"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default PasswordItem;