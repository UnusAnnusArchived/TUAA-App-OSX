import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../menu-item';
import SearchBar from '../search';
import Titlebar from '../titlebar';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('/01');

  return (
    <div className={`${styles.menu} drag`}>
      <Titlebar />
      <SearchBar />
      <Link
        className={`${styles.sidebarLink} ${
          currentPage === '/00' ? styles.selectedSidebar : undefined
        }`}
        to="/00"
        onClick={() => {
          setCurrentPage('/00');
        }}
      >
        <MenuItem isSelected={currentPage === '/00'}>Specials</MenuItem>
      </Link>
      <Link
        to="/01"
        onClick={() => {
          setCurrentPage('/01');
        }}
      >
        <MenuItem isSelected={currentPage === '/01'}>Season 1</MenuItem>
      </Link>
    </div>
  );
};

export default Menu;
