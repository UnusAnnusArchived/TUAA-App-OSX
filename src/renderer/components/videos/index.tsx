import Video from '../video';
import styles from './styles.module.scss';
import type { IVideo } from '../../../types';

interface IProps {
  metadata: IVideo[];
}

const Videos: React.FC<IProps> = ({ metadata }) => {
  return (
    <div className={styles.videos}>
      {metadata.map((episode, index) => {
        return <Video video={episode} key={index} />;
      })}
    </div>
  );
};

export default Videos;
