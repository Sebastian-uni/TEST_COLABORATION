import { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import PasswordList from './PasswordList';
import AddPasswordModal from './AddPasswordModal';
import SettingsPanel from './SettingsPanel';
import { usePasswords } from '../hooks/usePasswords';
import styles from './App.module.css'; // Importa el módulo CSS

function App() {
  const { passwords, addPassword, updatePassword, deletePassword, deleteAllPasswords } = usePasswords();
  const [activeView, setActiveView] = useState('passwords');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    setEditingPassword(null);
    setIsModalOpen(true);
  };

  const handleEdit = (password) => {
    setEditingPassword(password);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPassword(null);
  };

  const handleSavePassword = (passwordData) => {
    if (editingPassword) {
      updatePassword(editingPassword.id, passwordData);
    } else {
      addPassword(passwordData);
    }
    handleCloseModal();
  };

  const filteredPasswords = useMemo(() => {
    if (!searchTerm) {
      return passwords;
    }
    return passwords.filter(p =>
      p.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [passwords, searchTerm]);

  const renderMainContent = () => {
    switch (activeView) {
      case 'settings':
        return <SettingsPanel onDeleteAll={deleteAllPasswords} />;
      case 'passwords':
      default:
        return (
          <PasswordList
            passwords={filteredPasswords}
            onEdit={handleEdit}
            onDelete={deletePassword}
            onAddNew={handleAddNew}
            onSearch={setSearchTerm}
          />
        );
    }
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className={styles.mainContent}>
        {renderMainContent()}
      </main>
      {isModalOpen && (
        <AddPasswordModal
          onClose={handleCloseModal}
          onSave={handleSavePassword}
          existingPassword={editingPassword}
        />
      )}
    </div>
  );
}

export default App;
