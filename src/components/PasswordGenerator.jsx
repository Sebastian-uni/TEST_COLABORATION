import { useState } from 'react';
import { ArrowCounterClockwise24Regular as RefreshIcon } from '@fluentui/react-icons';
import styles from './PasswordGenerator.module.css';

const PasswordGenerator = ({ onPasswordGenerated }) => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = lowerCaseChars;
    if (includeUppercase) charPool += upperCaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }
    
    onPasswordGenerated(password);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor="length" className={styles.lengthLabel}>
          Longitud: {length}
        </label>
        <button 
          onClick={generatePassword}
          className={styles.generateButton}
        >
          <RefreshIcon />
          Generar
        </button>
      </div>
      
      <input
        type="range"
        id="length"
        min="8"
        max="32"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className={styles.slider}
      />

      <div className={styles.options}>
        <div className={styles.option}>
          <input type="checkbox" id="uppercase" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className={styles.checkbox} />
          <label htmlFor="uppercase">Mayúsculas (A-Z)</label>
        </div>
        <div className={styles.option}>
          <input type="checkbox" id="numbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className={styles.checkbox} />
          <label htmlFor="numbers">Números (0-9)</label>
        </div>
        <div className={styles.option}>
          <input type="checkbox" id="symbols" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className={styles.checkbox} />
          <label htmlFor="symbols">Símbolos (!@#$)</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;