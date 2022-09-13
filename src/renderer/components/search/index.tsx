import { useRef } from 'react';
import styles from './styles.module.scss';

const SearchBar: React.FC = () => {
  const searchBar = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <span className={styles.searchIcon}>􀊫</span>
        <input
          className={styles.searchBar}
          ref={searchBar}
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
