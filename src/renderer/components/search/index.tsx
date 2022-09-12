import styles from './styles.module.scss';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <span>search bar</span>
      </div>
    </div>
  );
};

export default SearchBar;
