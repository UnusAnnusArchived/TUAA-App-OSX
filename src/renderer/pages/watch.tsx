import axios from 'axios';
import { endpoint } from 'endpoint';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IPageProps, IVideo } from 'types';
import loadingVideo from '../../../assets/loading.webm';
import { getErrorDescription } from '../handleError';
import Player from '../components/player';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Watch: React.FC<IPageProps> = ({ setTitlebarStatus }) => {
  setTitlebarStatus({
    pageName: 'The Unus Annus Archive',
    showBackButton: true,
    hideMenu: false,
  });

  const query = useQuery();
  const watchCode = query.get('v');

  const [error, setError] = useState<Error>();
  const [metadata, setMetadata] = useState<IVideo>();

  useEffect(() => {
    axios
      .get(`${endpoint}/v2/metadata/episode/${watchCode}`)
      .then((res) => {
        return setMetadata(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [watchCode]);

  const errorDescription = getErrorDescription(error);

  setTitlebarStatus({
    pageName: metadata?.title ?? 'The Unus Annus Archive',
  });

  return (
    <>
      {metadata ? (
        <div className="video-page">
          <Player video={metadata} />
        </div>
      ) : (
        <div>
          {error ? (
            <>
              <p>Failed to load video: {error.message}</p>
              <p>{errorDescription}</p>
            </>
          ) : (
            <div className="flex-centered">
              <p>Loading&nbsp;</p>
              <video
                src={loadingVideo}
                autoPlay
                loop
                muted
                width="20"
                height="20"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Watch;
