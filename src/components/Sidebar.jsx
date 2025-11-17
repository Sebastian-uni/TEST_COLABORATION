import { 
  Password24Regular as PasswordIcon, 
  Settings24Regular as SettingsIcon,
  Home24Regular as HomeIcon
} from '@fluentui/react-icons';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeView, onNavigate }) => {
  
  const NavItem = ({ icon, label, viewName }) => {
    const isActive = activeView === viewName;
    const itemClass = `${styles.navItem} ${isActive ? styles.active : ''}`;
    
    return (
      <button
        onClick={() => onNavigate(viewName)}
        className={itemClass}
        aria-label={label}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <HomeIcon className={styles.logoIcon} />
      </div>
      <nav className={styles.nav}>
        <NavItem 
          icon={<PasswordIcon />} 
          label="Contraseñas" 
          viewName="passwords" 
        />
        <NavItem 
          icon={<SettingsIcon />} 
          label="Ajustes" 
          viewName="settings" 
        />
      </nav>
    </aside>
  );
};

export default Sidebar;