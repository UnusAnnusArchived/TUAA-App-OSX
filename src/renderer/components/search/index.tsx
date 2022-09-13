import { endpoint } from 'endpoint';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IVideo } from 'types';
import styles from './styles.module.scss';

const SearchBar: React.FC = () => {
  const searchInput = useRef<HTMLInputElement>(null);

  const [fullMetadata, setFullMetadata] = useState<IVideo[]>([]);

  useEffect(() => {
    (async () => {
      const metadata = await fetch(`${endpoint}/v2/metadata/all`).then((res) =>
        res.json()
      );

      const tempFullMetadata = [];

      for (let i = 0; i < metadata[0].length; i++) {
        tempFullMetadata.push(metadata[0][i]);
      }
      for (let i = 0; i < metadata[1].length; i++) {
        tempFullMetadata.push(metadata[1][i]);
      }
      setFullMetadata(tempFullMetadata);
    })();
  }, []);

  const [results, setResults] = useState<IVideo[]>([]);

  const onSearch: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const query = evt.target.value.toLowerCase();

    if (query === '') {
      setResults([]);
      return;
    }

    const tempResults: IVideo[] = [];

    for (let i = 0; i < fullMetadata.length; i++) {
      const video = fullMetadata[i];

      if (
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.season.toString() === query ||
        video.episode.toString() === query ||
        (video.season === parseInt(query.split('.')[0].substring(1), 10) &&
          video.episode === parseInt(query.split('.')[1].substring(1), 10))
      ) {
        tempResults.push(video);
      }
    }

    setResults(tempResults);
  };

  const clearQuery = () => {
    if (searchInput.current) {
      searchInput.current.value = '';
    }
    setResults([]);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchbox}>
          <span className={styles.searchIcon}>􀊫</span>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Search"
            ref={searchInput}
            onChange={onSearch}
          />
        </div>
      </div>
      <div
        className={`${styles.resultsContainer} ${
          results.length === 0 ? styles.hide : ''
        }`}
      >
        <div className={styles.results}>
          {results.map((video) => {
            return (
              <p>
                <Link
                  to={`/watch?v=s${video.season
                    .toString()
                    .padStart(2, '0')}.e${video.episode
                    .toString()
                    .padStart(3, '0')}`}
                  onClick={clearQuery}
                >
                  {video.title}
                </Link>
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
