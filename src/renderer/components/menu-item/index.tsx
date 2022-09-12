import React from 'react';
import styles from './styles.module.scss';

interface IProps {
  isSelected: boolean;
}

const MenuItem: React.FC<IProps> = ({ children, isSelected }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['menu-item']} nodrag ${
          isSelected ? styles.selected : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MenuItem;
