import { cdn } from 'endpoint';
import moment from 'moment';
import { Link } from 'react-router-dom';
import type { IVideo } from '../../../types';
import styles from './styles.module.scss';

interface IProps {
  video: IVideo;
}

const Video: React.FC<IProps> = ({ video }) => {
  return (
    <Link
      to={`/watch?v=s${video.season
        .toString()
        .padStart(2, '0')}.e${video.episode.toString().padStart(3, '0')}`}
      className={styles.videoLink}
    >
      <div className={styles.video}>
        <img
          src={`${cdn}${video.thumbnail ?? video.posters?.[0].src}`}
          alt={`Thumbnail for ${video.title}`}
          className={styles.thumbnail}
          width="300"
          height="168.75"
          loading="lazy"
        />
        <span className={styles.title}>{video.title}</span>
        <span className={styles.info}>
          Episode {video.episode} -{' '}
          {moment(video.date ?? video.releasedate).format('DD. MMM YYYY')}
        </span>
      </div>
    </Link>
  );
};
export default Video;
